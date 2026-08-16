import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const CDP_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const OUTPUT_DIR = process.env.PERF_OUTPUT_DIR ?? "artifacts/performance";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const routes = [
  "/",
  "/systems/autopulse",
  "/systems/cv-engine",
  "/evidence",
  "/notes",
  "/about",
  "/contact",
];

const profiles = [
  { name: "desktop", width: 1440, height: 1000, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

async function createSession(pageUrl, profile) {
  const response = await fetch(`${CDP_URL}/json/new?${encodeURIComponent("about:blank")}`, {
    method: "PUT",
  });
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

  function waitForEvent(method, timeoutMs = 15000) {
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
  await send("Performance.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Emulation.setDeviceMetricsOverride", {
    width: profile.width,
    height: profile.height,
    deviceScaleFactor: 1,
    mobile: profile.mobile,
    screenWidth: profile.width,
    screenHeight: profile.height,
  });

  const loaded = waitForEvent("Page.loadEventFired");
  await send("Page.navigate", { url: pageUrl });
  await loaded;
  await sleep(2200);

  return {
    send,
    async evaluate(expression) {
      const response = await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return response.result.value;
    },
    async close() {
      socket.close();
      await fetch(`${CDP_URL}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);
    },
  };
}

function metricMap(metrics = []) {
  return Object.fromEntries(metrics.map(({ name, value }) => [name, value]));
}

function round(value, digits = 2) {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function bytes(value) {
  return typeof value === "number" ? Math.round(value) : null;
}

async function measure(route, profile) {
  const pageUrl = `${BASE_URL}${route}`;
  const session = await createSession(pageUrl, profile);

  try {
    const browser = await session.evaluate(`(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const paints = Object.fromEntries(
        performance.getEntriesByType('paint').map((entry) => [entry.name, entry.startTime])
      );

      const byType = resources.reduce((acc, entry) => {
        const type = entry.initiatorType || 'other';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const resourceTransfer = resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0);
      const resourceEncoded = resources.reduce((sum, entry) => sum + (entry.encodedBodySize || 0), 0);
      const resourceDecoded = resources.reduce((sum, entry) => sum + (entry.decodedBodySize || 0), 0);

      return {
        title: document.title,
        href: location.href,
        readyState: document.readyState,
        nav: nav ? {
          responseStart: nav.responseStart,
          domInteractive: nav.domInteractive,
          domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd,
          transferSize: nav.transferSize,
          encodedBodySize: nav.encodedBodySize,
          decodedBodySize: nav.decodedBodySize,
        } : null,
        firstContentfulPaint: paints['first-contentful-paint'] ?? null,
        resourceCount: resources.length,
        byType,
        resourceTransfer,
        resourceEncoded,
        resourceDecoded,
        domElements: document.getElementsByTagName('*').length,
      };
    })()`);

    const performanceResult = await session.send("Performance.getMetrics");
    const cdp = metricMap(performanceResult.metrics);

    return {
      route,
      profile: profile.name,
      viewport: `${profile.width}x${profile.height}`,
      title: browser.title,
      readyState: browser.readyState,
      timingMs: {
        ttfb: round(browser.nav?.responseStart ?? null),
        firstContentfulPaint: round(browser.firstContentfulPaint),
        domInteractive: round(browser.nav?.domInteractive ?? null),
        domContentLoaded: round(browser.nav?.domContentLoadedEventEnd ?? null),
        load: round(browser.nav?.loadEventEnd ?? null),
      },
      network: {
        resources: browser.resourceCount,
        byInitiatorType: browser.byType,
        transferBytes: bytes((browser.nav?.transferSize ?? 0) + browser.resourceTransfer),
        encodedBytes: bytes((browser.nav?.encodedBodySize ?? 0) + browser.resourceEncoded),
        decodedBytes: bytes((browser.nav?.decodedBodySize ?? 0) + browser.resourceDecoded),
      },
      runtime: {
        domElements: browser.domElements,
        nodes: round(cdp.Nodes, 0),
        documents: round(cdp.Documents, 0),
        frames: round(cdp.Frames, 0),
        jsEventListeners: round(cdp.JSEventListeners, 0),
        layoutCount: round(cdp.LayoutCount, 0),
        recalcStyleCount: round(cdp.RecalcStyleCount, 0),
        scriptDurationMs: round((cdp.ScriptDuration ?? 0) * 1000),
        layoutDurationMs: round((cdp.LayoutDuration ?? 0) * 1000),
        recalcStyleDurationMs: round((cdp.RecalcStyleDuration ?? 0) * 1000),
        taskDurationMs: round((cdp.TaskDuration ?? 0) * 1000),
        jsHeapUsedBytes: bytes(cdp.JSHeapUsedSize),
        jsHeapTotalBytes: bytes(cdp.JSHeapTotalSize),
      },
    };
  } finally {
    await session.close();
  }
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const measurements = [];
const failures = [];

for (const profile of profiles) {
  for (const route of routes) {
    try {
      const result = await measure(route, profile);
      measurements.push(result);
      console.log(
        `PASS ${profile.name.padEnd(7)} ${route.padEnd(24)} ` +
          `FCP=${String(result.timingMs.firstContentfulPaint ?? 'n/a').padStart(7)}ms ` +
          `transfer=${String(result.network.transferBytes).padStart(8)}B ` +
          `nodes=${String(result.runtime.nodes).padStart(5)}`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ route, profile: profile.name, message });
      console.error(`FAIL ${profile.name} ${route}: ${message}`);
    }
  }
}

const report = {
  schemaVersion: 1,
  capturedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  methodology: {
    server: "next build + next start",
    cache: "disabled for each measured navigation",
    settleMs: 2200,
    profiles,
    note: "Laboratory browser baseline. Not field Core Web Vitals and not a public performance claim.",
  },
  measurements,
  failures,
};

const jsonPath = path.join(OUTPUT_DIR, "performance-baseline.json");
const textPath = path.join(OUTPUT_DIR, "performance-baseline.txt");

await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

const lines = [
  "THE BUILD ROOM — PERFORMANCE BASELINE",
  `Captured: ${report.capturedAt}`,
  `Measurements: ${measurements.length}`,
  `Failures: ${failures.length}`,
  "",
  ...measurements.map(
    (item) =>
      `${item.profile.padEnd(7)} ${item.route.padEnd(24)} ` +
      `FCP=${String(item.timingMs.firstContentfulPaint ?? "n/a").padStart(7)}ms ` +
      `LOAD=${String(item.timingMs.load ?? "n/a").padStart(7)}ms ` +
      `TRANSFER=${String(item.network.transferBytes).padStart(9)}B ` +
      `RES=${String(item.network.resources).padStart(3)} ` +
      `NODES=${String(item.runtime.nodes).padStart(5)} ` +
      `HEAP=${String(item.runtime.jsHeapUsedBytes).padStart(10)}B`
  ),
];

if (failures.length) {
  lines.push("", "FAILURES", ...failures.map((failure) => JSON.stringify(failure)));
}

await fs.writeFile(textPath, `${lines.join("\n")}\n`, "utf8");

if (failures.length) process.exit(1);

console.log(`\nPerformance baseline captured: ${measurements.length} route/profile measurements.`);
