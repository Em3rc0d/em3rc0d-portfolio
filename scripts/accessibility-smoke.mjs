const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const CDP_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";

const routes = [
  "/",
  "/systems",
  "/systems/autopulse",
  "/systems/cv-engine",
  "/systems/infrastructure-site-mapper",
  "/systems/gpets",
  "/evidence",
  "/evidence/e-cv-12",
  "/evidence/e-pro-01",
  "/evidence/e-gp-04",
  "/notes",
  "/notes/when-does-a-listing-become-one-opportunity",
  "/about",
  "/contact",
];

const widths = [320, 360, 390, 768, 1024, 1440];
const height = 900;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createSession(pageUrl, width) {
  const response = await fetch(`${CDP_URL}/json/new?${encodeURIComponent(pageUrl)}`, {
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
  await sleep(900);

  return {
    target,
    socket,
    send,
    async close() {
      socket.close();
      await fetch(`${CDP_URL}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);
    },
  };
}

function expectedCurrentHref(route) {
  for (const root of ["/systems", "/notes", "/evidence", "/about", "/contact"]) {
    if (route === root || route.startsWith(`${root}/`)) return root;
  }
  return null;
}

async function audit(route, width) {
  const session = await createSession(`${BASE_URL}${route}`, width);
  try {
    const evaluation = await session.send("Runtime.evaluate", {
      expression: `(() => {
        const visible = (el) => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };

        const accessibleName = (el) => {
          const aria = el.getAttribute('aria-label');
          if (aria?.trim()) return aria.trim();
          const labelledBy = el.getAttribute('aria-labelledby');
          if (labelledBy) {
            const text = labelledBy.split(/\\s+/).map((id) => document.getElementById(id)?.textContent ?? '').join(' ').trim();
            if (text) return text;
          }
          if (el instanceof HTMLImageElement && el.alt.trim()) return el.alt.trim();
          return (el.textContent ?? '').replace(/\\s+/g, ' ').trim();
        };

        const focusables = [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(visible);
        const unnamed = focusables.filter((el) => !accessibleName(el)).map((el) => el.outerHTML.slice(0, 180));
        const unsafeBlank = [...document.querySelectorAll('a[target="_blank"]')].filter((el) => !/(^|\\s)(noopener|noreferrer)(\\s|$)/.test(el.rel)).map((el) => el.href);
        const invalidPressed = [...document.querySelectorAll('[aria-pressed]')].filter((el) => el.tagName !== 'BUTTON' && el.getAttribute('role') !== 'button').map((el) => el.outerHTML.slice(0, 160));
        const imagesMissingAlt = [...document.querySelectorAll('img')].filter((img) => !img.hasAttribute('alt')).map((img) => img.currentSrc || img.src);
        const ids = [...document.querySelectorAll('[id]')].map((el) => el.id).filter(Boolean);
        const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
        const overflow = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
        const overflowing = [...document.querySelectorAll('body *')].filter((el) => {
          if (!visible(el)) return false;
          const rect = el.getBoundingClientRect();
          return rect.right > window.innerWidth + 2 || rect.left < -2;
        }).slice(0, 12).map((el) => ({
          tag: el.tagName,
          className: typeof el.className === 'string' ? el.className : '',
          text: (el.textContent ?? '').replace(/\\s+/g, ' ').trim().slice(0, 90),
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
        }));

        const touchSelectors = 'button, .primary-nav a, .hero-v2-header nav a, .site-identity, .contact-primary-action';
        const smallTouchTargets = window.innerWidth <= 390
          ? [...document.querySelectorAll(touchSelectors)].filter(visible).filter((el) => {
              const rect = el.getBoundingClientRect();
              return rect.width < 24 || rect.height < 24;
            }).map((el) => ({
              name: accessibleName(el),
              width: Math.round(el.getBoundingClientRect().width),
              height: Math.round(el.getBoundingClientRect().height),
              className: typeof el.className === 'string' ? el.className : '',
            }))
          : [];

        return {
          mainCount: document.querySelectorAll('main').length,
          h1Count: document.querySelectorAll('h1').length,
          skipTargetCount: document.querySelectorAll('#main-content').length,
          primaryNavCount: document.querySelectorAll('nav[aria-label="Primary navigation"]').length,
          currentLinks: [...document.querySelectorAll('.primary-nav a[aria-current="page"]')].map((el) => el.getAttribute('href')),
          unnamed,
          unsafeBlank,
          invalidPressed,
          imagesMissingAlt,
          duplicateIds,
          overflow,
          overflowing,
          smallTouchTargets,
        };
      })()`,
      returnByValue: true,
      awaitPromise: true,
    });

    const data = evaluation.result.value;
    const issues = [];
    if (data.mainCount !== 1) issues.push(`expected exactly one <main>, found ${data.mainCount}`);
    if (data.h1Count < 1) issues.push("missing H1");
    if (data.skipTargetCount !== 1) issues.push(`expected one #main-content target, found ${data.skipTargetCount}`);
    if (data.unnamed.length) issues.push(`unnamed interactive elements: ${JSON.stringify(data.unnamed)}`);
    if (data.unsafeBlank.length) issues.push(`target=_blank without rel protection: ${JSON.stringify(data.unsafeBlank)}`);
    if (data.invalidPressed.length) issues.push(`invalid aria-pressed usage: ${JSON.stringify(data.invalidPressed)}`);
    if (data.imagesMissingAlt.length) issues.push(`images without alt: ${JSON.stringify(data.imagesMissingAlt)}`);
    if (data.duplicateIds.length) issues.push(`duplicate ids: ${JSON.stringify(data.duplicateIds)}`);
    if (data.overflow > 2) issues.push(`horizontal overflow ${data.overflow}px: ${JSON.stringify(data.overflowing)}`);
    if (data.smallTouchTargets.length) issues.push(`touch targets below 24px: ${JSON.stringify(data.smallTouchTargets)}`);

    const expectedCurrent = expectedCurrentHref(route);
    const hasSharedPrimaryNav = data.currentLinks.length > 0 || (data.primaryNavCount > 0 && route !== "/");
    if (expectedCurrent && hasSharedPrimaryNav && !data.currentLinks.includes(expectedCurrent)) {
      issues.push(`expected aria-current on ${expectedCurrent}, got ${JSON.stringify(data.currentLinks)}`);
    }

    return { route, width, issues, data };
  } finally {
    await session.close();
  }
}

const failures = [];
for (const route of routes) {
  for (const width of widths) {
    const result = await audit(route, width);
    if (result.issues.length) {
      failures.push(result);
      console.error(`FAIL ${route} @ ${width}px`);
      for (const issue of result.issues) console.error(`  - ${issue}`);
    } else {
      console.log(`PASS ${route} @ ${width}px`);
    }
  }
}

if (failures.length) {
  console.error(`\nAccessibility smoke failed: ${failures.length} route/width combinations.`);
  process.exit(1);
}

console.log(`\nAccessibility smoke passed: ${routes.length * widths.length} route/width combinations.`);
