const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const CDP_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const VIEWPORTS = [
  { width: 1366, height: 768, label: "laptop" },
  { width: 1792, height: 854, label: "user-like" },
  { width: 1440, height: 900, label: "desktop" },
  { width: 1920, height: 1080, label: "large" },
];

const ROUTES = [
  {
    path: "/",
    strict: [
      ".hero-v2",
      ".client-paths",
      ".system-encounter-record",
      ".operating-model",
      ".paper-stage-v2",
      ".home-conversion",
    ],
  },
  { path: "/systems", strict: [".internal-stage"] },
  { path: "/systems/autopulse", strict: [".autopulse-case > section"] },
  { path: "/systems/cv-engine", strict: [".cv-case > section"] },
  { path: "/systems/infrastructure-site-mapper", strict: [".supporting-case-shell > section"] },
  { path: "/systems/gpets", strict: [".supporting-case-shell > section"] },
  { path: "/about", strict: [".about-page > section"] },
  { path: "/contact", strict: [".contact-page > section"] },
  { path: "/evidence", utility: [".evidence-library-intro"] },
  { path: "/notes", utility: [".notes-index-intro"] },
];

async function createSession(path, width, height) {
  const pageUrl = `${BASE_URL}${path}`;
  const response = await fetch(`${CDP_URL}/json/new?${encodeURIComponent(pageUrl)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);

  const target = await response.json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
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
      id += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
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
    mobile: false,
    screenWidth: width,
    screenHeight: height,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });

  const loaded = waitForEvent("Page.loadEventFired");
  await send("Page.navigate", { url: pageUrl });
  await loaded;
  await sleep(550);
  await send("Runtime.evaluate", {
    expression: "document.fonts?.ready ? document.fonts.ready.then(() => true) : true",
    awaitPromise: true,
    returnByValue: true,
  });

  return {
    async evaluate(expression) {
      const result = await send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      return result.result.value;
    },
    async close() {
      socket.close();
      await fetch(`${CDP_URL}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);
    },
  };
}

const failures = [];
const measurements = [];

for (const viewport of VIEWPORTS) {
  for (const route of ROUTES) {
    const session = await createSession(route.path, viewport.width, viewport.height);
    try {
      const result = await session.evaluate(`(() => {
        const strictSelectors = ${JSON.stringify(route.strict ?? [])};
        const utilitySelectors = ${JSON.stringify(route.utility ?? [])};
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const epsilon = 2;
        const issues = [];
        const frames = [];

        if (document.documentElement.scrollWidth > vw + epsilon) {
          issues.push({
            type: 'horizontal-overflow',
            actual: document.documentElement.scrollWidth,
            expected: vw,
          });
        }

        for (const selector of strictSelectors) {
          const nodes = [...document.querySelectorAll(selector)];
          if (!nodes.length) {
            issues.push({ type: 'missing-selector', selector });
            continue;
          }

          nodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            const frame = {
              selector,
              index,
              className: node.className,
              rectHeight: Math.round(rect.height),
              clientHeight: node.clientHeight,
              scrollHeight: node.scrollHeight,
              overflowY: style.overflowY,
            };
            frames.push(frame);

            if (Math.abs(rect.height - vh) > epsilon) {
              issues.push({ type: 'not-one-viewport', ...frame, expected: vh });
            }
            if (node.scrollHeight > node.clientHeight + epsilon) {
              issues.push({ type: 'content-overflow', ...frame, overBy: node.scrollHeight - node.clientHeight });
            }
          });
        }

        for (const selector of utilitySelectors) {
          const node = document.querySelector(selector);
          if (!node) {
            issues.push({ type: 'missing-utility-selector', selector });
            continue;
          }
          const rect = node.getBoundingClientRect();
          if (rect.bottom > vh + epsilon) {
            issues.push({
              type: 'utility-intro-below-fold',
              selector,
              bottom: Math.round(rect.bottom),
              viewport: vh,
            });
          }
        }

        return { issues, frames, bodyHeight: document.body.scrollHeight, vh, vw };
      })()`);

      measurements.push({ route: route.path, viewport: viewport.label, ...result });
      if (result.issues.length) {
        failures.push({ route: route.path, viewport, issues: result.issues });
        console.error(`FAIL ${viewport.label.padEnd(9)} ${route.path}`);
        for (const issue of result.issues) console.error(`  ${JSON.stringify(issue)}`);
      } else {
        console.log(`PASS ${viewport.label.padEnd(9)} ${route.path}`);
      }
    } finally {
      await session.close();
    }
  }
}

console.log(`\nFrame discipline checked: ${measurements.length} route/viewport combinations.`);

if (failures.length) {
  console.error(`Frame discipline failed: ${failures.length} route/viewport combinations.`);
  process.exit(1);
}

console.log("One-frame / one-section desktop contract passed.");
