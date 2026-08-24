const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const CDP_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DESKTOP_VIEWPORTS = [
  { width: 1280, height: 640, label: "short-640" },
  { width: 1366, height: 650, label: "short-650" },
  { width: 1536, height: 720, label: "short-720" },
  { width: 1366, height: 768, label: "laptop" },
  { width: 1792, height: 854, label: "user-like" },
  { width: 1440, height: 900, label: "desktop" },
  { width: 1920, height: 1080, label: "large" },
];

const SPANISH_FRAME_ROUTES = [
  {
    path: "/es",
    strict: [
      ".hero-v2",
      ".client-paths",
      ".system-encounter-record",
      ".operating-model",
      ".paper-stage-v2",
      ".home-conversion",
    ],
  },
  { path: "/es/systems", strict: [".systems-room-frame"] },
  { path: "/es/systems/autopulse", strict: [".autopulse-case > section"] },
  { path: "/es/systems/cv-engine", strict: [".cv-case > section"] },
  { path: "/es/systems/infrastructure-site-mapper", strict: [".supporting-case-shell > section"] },
  { path: "/es/systems/gpets", strict: [".supporting-case-shell > section"] },
  { path: "/es/about", strict: [".about-page > section"] },
  { path: "/es/contact", strict: [".contact-page > section"] },
  { path: "/es/evidence", utility: [".evidence-library-intro"] },
  { path: "/es/notes", utility: [".notes-index-intro"] },
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
  await sleep(300);
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
let frameChecks = 0;

for (const viewport of DESKTOP_VIEWPORTS) {
  for (const route of SPANISH_FRAME_ROUTES) {
    const session = await createSession(route.path, viewport.width, viewport.height);
    try {
      const issues = await session.evaluate(`(() => {
        const strictSelectors = ${JSON.stringify(route.strict ?? [])};
        const utilitySelectors = ${JSON.stringify(route.utility ?? [])};
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const epsilon = 2;
        const issues = [];

        if (document.documentElement.scrollWidth > vw + epsilon) {
          issues.push({ type: 'horizontal-overflow', actual: document.documentElement.scrollWidth, expected: vw });
        }

        for (const selector of strictSelectors) {
          const nodes = [...document.querySelectorAll(selector)];
          if (!nodes.length) {
            issues.push({ type: 'missing-selector', selector });
            continue;
          }

          nodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            if (Math.abs(rect.height - vh) > epsilon) {
              issues.push({ type: 'not-one-viewport', selector, index, actual: Math.round(rect.height), expected: vh });
            }
            if (node.scrollHeight > node.clientHeight + epsilon) {
              issues.push({ type: 'content-overflow', selector, index, overBy: node.scrollHeight - node.clientHeight });
            }

            const majorText = [...node.querySelectorAll('h1, h2, h3, p, a, button, strong')]
              .filter((element) => {
                const style = getComputedStyle(element);
                const itemRect = element.getBoundingClientRect();
                return itemRect.width > 0 && itemRect.height > 0 && style.visibility !== 'hidden';
              });

            for (const element of majorText) {
              const itemRect = element.getBoundingClientRect();
              const fontSize = Number.parseFloat(getComputedStyle(element).fontSize || '0');
              if (fontSize > 0 && fontSize < 7.5) {
                issues.push({ type: 'micro-text', selector, index, tag: element.tagName, fontSize, text: (element.textContent || '').trim().slice(0, 80) });
                break;
              }
              if (itemRect.bottom > rect.bottom + epsilon || itemRect.top < rect.top - epsilon) {
                issues.push({ type: 'major-content-outside-frame', selector, index, tag: element.tagName, text: (element.textContent || '').trim().slice(0, 80) });
                break;
              }
            }
          });
        }

        for (const selector of utilitySelectors) {
          const node = document.querySelector(selector);
          if (!node) {
            issues.push({ type: 'missing-selector', selector });
            continue;
          }
          if (node.scrollHeight > node.clientHeight + epsilon) {
            issues.push({ type: 'utility-content-overflow', selector, overBy: node.scrollHeight - node.clientHeight });
          }
        }

        return issues;
      })()`);

      frameChecks += 1;
      if (issues.length) {
        failures.push({ route: route.path, viewport: viewport.label, issues });
        console.error(`FAIL ${viewport.label.padEnd(10)} ${route.path}`);
        for (const issue of issues) console.error(`  ${JSON.stringify(issue)}`);
      } else {
        console.log(`PASS ${viewport.label.padEnd(10)} ${route.path}`);
      }
    } finally {
      await session.close();
    }
  }
}

const sitemapResponse = await fetch(`${BASE_URL}/sitemap.xml`);
if (!sitemapResponse.ok) {
  failures.push({ route: "/sitemap.xml", viewport: "mobile", issues: [{ type: "sitemap-status", status: sitemapResponse.status }] });
} else {
  const sitemap = await sitemapResponse.text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => {
      try { return new URL(match[1]).pathname.replace(/\/$/, "") || "/"; }
      catch { return null; }
    })
    .filter((path) => path === "/es" || path?.startsWith("/es/"));

  for (const path of paths) {
    const session = await createSession(path, 390, 844);
    try {
      const result = await session.evaluate(`(() => ({
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        lang: document.documentElement.lang,
        subtree: Boolean(document.querySelector('[lang="es"]')),
      }))()`);
      if (result.scrollWidth > result.width + 2 || !result.subtree) {
        failures.push({ route: path, viewport: "mobile-390", issues: [{ type: "mobile-route-contract", ...result }] });
        console.error(`FAIL mobile-390 ${path} ${JSON.stringify(result)}`);
      } else {
        console.log(`PASS mobile-390 ${path}`);
      }
    } finally {
      await session.close();
    }
  }
}

if (failures.length) {
  console.error(`\nSpanish frame safety failed: ${failures.length} route/profile issue(s).`);
  process.exit(1);
}

console.log(`\nSpanish frame safety passed: ${frameChecks} desktop composition checks + all Spanish sitemap routes at 390px.`);
