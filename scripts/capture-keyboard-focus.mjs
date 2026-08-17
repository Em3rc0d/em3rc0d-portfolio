import { writeFile } from "node:fs/promises";

const [pageUrl, outputPath, widthArg = "390", heightArg = "844"] = process.argv.slice(2);
if (!pageUrl || !outputPath) {
  throw new Error("Usage: node scripts/capture-keyboard-focus.mjs <url> <output.png> [width] [height]");
}

const width = Number(widthArg);
const height = Number(heightArg);
const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const targetResponse = await fetch(`${cdpBase}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" });
if (!targetResponse.ok) throw new Error(`Could not create Chrome target: ${targetResponse.status}`);

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
  waiters.shift()(message.params ?? {});
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
await sleep(1000);

await send("Input.dispatchKeyEvent", {
  type: "rawKeyDown",
  key: "Tab",
  code: "Tab",
  windowsVirtualKeyCode: 9,
  nativeVirtualKeyCode: 9,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Tab",
  code: "Tab",
  windowsVirtualKeyCode: 9,
  nativeVirtualKeyCode: 9,
});
await sleep(250);

const focus = await send("Runtime.evaluate", {
  expression: `(() => ({
    tag: document.activeElement?.tagName ?? '',
    className: document.activeElement?.className ?? '',
    text: document.activeElement?.textContent?.trim() ?? ''
  }))()`,
  returnByValue: true,
});

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});

await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
console.log(JSON.stringify({ outputPath, focus: focus.result.value, width, height }));

socket.close();
await fetch(`${cdpBase}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);
