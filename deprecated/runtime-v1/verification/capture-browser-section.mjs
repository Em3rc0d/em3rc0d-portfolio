import { writeFile } from "node:fs/promises";

const [pageUrl, selector, outputPath, widthArg = "1440", heightArg = "1000"] = process.argv.slice(2);

if (!pageUrl || !selector || !outputPath) {
  throw new Error(
    "Usage: node scripts/capture-browser-section.mjs <url> <selector> <output.png> [width] [height]",
  );
}

const width = Number(widthArg);
const height = Number(heightArg);
const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";

const targetResponse = await fetch(
  `${cdpBase}/json/new?${encodeURIComponent(pageUrl)}`,
  { method: "PUT" },
);

if (!targetResponse.ok) {
  throw new Error(`Could not create Chrome target: ${targetResponse.status}`);
}

const target = await targetResponse.json();
const socket = new WebSocket(target.webSocketDebuggerUrl);

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const eventWaiters = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  if (message.id) {
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result ?? {});
    return;
  }

  const waiters = eventWaiters.get(message.method);
  if (!waiters?.length) return;
  const waiter = waiters.shift();
  waiter(message.params ?? {});
});

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    commandId += 1;
    pending.set(commandId, { resolve, reject });
    socket.send(JSON.stringify({ id: commandId, method, params }));
  });
}

function waitForEvent(method, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const list = eventWaiters.get(method) ?? [];
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs);
    list.push((params) => {
      clearTimeout(timer);
      resolve(params);
    });
    eventWaiters.set(method, list);
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width <= 500,
  screenWidth: width,
  screenHeight: height,
});
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});

const loaded = waitForEvent("Page.loadEventFired");
await send("Page.navigate", { url: pageUrl });
await loaded;
await sleep(900);

const selectorExpression = JSON.stringify(selector);
const scrollResult = await send("Runtime.evaluate", {
  expression: `(() => {
    const target = document.querySelector(${selectorExpression});
    if (!target) return { found: false };
    target.scrollIntoView({ block: "start", inline: "nearest" });
    return { found: true, top: target.getBoundingClientRect().top, y: window.scrollY };
  })()`,
  returnByValue: true,
  awaitPromise: true,
});

if (!scrollResult.result?.value?.found) {
  throw new Error(`Selector not found: ${selector}`);
}

await sleep(450);

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});

await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));

socket.close();
await fetch(`${cdpBase}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);

console.log(
  JSON.stringify({
    outputPath,
    selector,
    width,
    height,
    scroll: scrollResult.result.value,
  }),
);
