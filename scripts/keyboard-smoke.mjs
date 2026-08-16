const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const CDP_URL = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createSession(path, width = 390, height = 844) {
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
    async key(key, code, virtualKeyCode) {
      await send("Input.dispatchKeyEvent", {
        type: "rawKeyDown",
        key,
        code,
        windowsVirtualKeyCode: virtualKeyCode,
        nativeVirtualKeyCode: virtualKeyCode,
      });
      await send("Input.dispatchKeyEvent", {
        type: "keyUp",
        key,
        code,
        windowsVirtualKeyCode: virtualKeyCode,
        nativeVirtualKeyCode: virtualKeyCode,
      });
      await sleep(180);
    },
    async close() {
      socket.close();
      await fetch(`${CDP_URL}/json/close/${target.id}`, { method: "PUT" }).catch(() => undefined);
    },
  };
}

const failures = [];

async function test(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, error: error instanceof Error ? error.message : String(error) });
    console.error(`FAIL ${name}`);
    console.error(`  - ${error instanceof Error ? error.message : String(error)}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await test("Skip link is first keyboard target and moves Home to main content", async () => {
  const session = await createSession("/");
  try {
    await session.key("Tab", "Tab", 9);
    const first = await session.evaluate(`(() => {
      const el = document.activeElement;
      const style = getComputedStyle(el);
      return {
        className: el?.className ?? '',
        text: el?.textContent?.trim() ?? '',
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
      };
    })()`);
    assert(String(first.className).includes("skip-link"), `first focus was not skip link: ${JSON.stringify(first)}`);
    assert(first.outlineStyle !== "none" && first.outlineWidth !== "0px", `skip-link focus ring not visible: ${JSON.stringify(first)}`);

    await session.key("Enter", "Enter", 13);
    const after = await session.evaluate(`(() => ({ id: document.activeElement?.id ?? '', tag: document.activeElement?.tagName ?? '' }))()`);
    assert(after.id === "main-content", `skip link did not focus #main-content: ${JSON.stringify(after)}`);
  } finally {
    await session.close();
  }
});

await test("Shared navigation exposes current route and keyboard focus", async () => {
  const session = await createSession("/contact");
  try {
    const current = await session.evaluate(`(() => [...document.querySelectorAll('.primary-nav a[aria-current="page"]')].map((el) => el.getAttribute('href')))()`);
    assert(current.includes("/contact"), `Contact is not marked current: ${JSON.stringify(current)}`);

    await session.key("Tab", "Tab", 9);
    const first = await session.evaluate(`document.activeElement?.className ?? ''`);
    assert(String(first).includes("skip-link"), `Contact first keyboard focus was not skip link: ${first}`);
  } finally {
    await session.close();
  }
});

await test("Evidence filter activates from keyboard", async () => {
  const session = await createSession("/evidence");
  try {
    const found = await session.evaluate(`(() => {
      const button = [...document.querySelectorAll('.evidence-filters button')].find((el) => el.textContent?.trim() === 'IMPLEMENTATION');
      if (!button) return false;
      button.focus();
      return true;
    })()`);
    assert(found, "IMPLEMENTATION filter not found");
    await session.key("Enter", "Enter", 13);
    const state = await session.evaluate(`(() => {
      const button = [...document.querySelectorAll('.evidence-filters button')].find((el) => el.textContent?.trim() === 'IMPLEMENTATION');
      return { pressed: button?.getAttribute('aria-pressed'), rows: document.querySelectorAll('.evidence-record-row').length };
    })()`);
    assert(state.pressed === "true", `Evidence filter did not become pressed: ${JSON.stringify(state)}`);
    assert(state.rows > 0, `Evidence implementation filter produced no rows: ${JSON.stringify(state)}`);
  } finally {
    await session.close();
  }
});

await test("Notes EXPLORING filter activates from keyboard", async () => {
  const session = await createSession("/notes");
  try {
    const found = await session.evaluate(`(() => {
      const button = [...document.querySelectorAll('.notes-filter button')].find((el) => el.textContent?.trim() === 'EXPLORING');
      if (!button) return false;
      button.focus();
      return true;
    })()`);
    assert(found, "EXPLORING filter not found");
    await session.key("Enter", "Enter", 13);
    const state = await session.evaluate(`(() => {
      const button = [...document.querySelectorAll('.notes-filter button')].find((el) => el.textContent?.trim() === 'EXPLORING');
      return {
        pressed: button?.getAttribute('aria-pressed'),
        rows: document.querySelectorAll('.note-row').length,
        exploringRows: document.querySelectorAll('.note-row.is-exploring').length,
      };
    })()`);
    assert(state.pressed === "true", `Notes filter did not become pressed: ${JSON.stringify(state)}`);
    assert(state.rows === state.exploringRows && state.rows > 0, `Notes filter did not isolate exploring rows: ${JSON.stringify(state)}`);
  } finally {
    await session.close();
  }
});

await test("AutoPulse architecture inspector is keyboard operable and announced", async () => {
  const session = await createSession("/systems/autopulse");
  try {
    const setup = await session.evaluate(`(() => {
      const buttons = [...document.querySelectorAll('.ap-architecture-flow button')];
      if (buttons.length < 2) return { ok: false };
      buttons[1].focus();
      return { ok: true, before: buttons.map((button) => button.getAttribute('aria-pressed')) };
    })()`);
    assert(setup.ok, "AutoPulse architecture buttons not found");
    await session.key("Enter", "Enter", 13);
    await sleep(250);
    const state = await session.evaluate(`(() => {
      const buttons = [...document.querySelectorAll('.ap-architecture-flow button')];
      const inspector = document.querySelector('.ap-component-inspector');
      return {
        secondPressed: buttons[1]?.getAttribute('aria-pressed'),
        title: inspector?.querySelector('h3')?.textContent?.trim() ?? '',
        live: inspector?.getAttribute('aria-live'),
        atomic: inspector?.getAttribute('aria-atomic'),
      };
    })()`);
    assert(state.secondPressed === "true", `AutoPulse second architecture button was not activated: ${JSON.stringify(state)}`);
    assert(state.title.includes("ObdAcquisitionMapper"), `AutoPulse inspector did not update: ${JSON.stringify(state)}`);
    assert(state.live === "polite" && state.atomic === "true", `AutoPulse inspector missing live semantics: ${JSON.stringify(state)}`);
  } finally {
    await session.close();
  }
});

await test("CV Engine truth inspector is keyboard operable and announced", async () => {
  const session = await createSession("/systems/cv-engine");
  try {
    const setup = await session.evaluate(`(() => {
      const buttons = [...document.querySelectorAll('.cv-truth-stack-controls button')];
      if (buttons.length < 2) return false;
      buttons[1].focus();
      return true;
    })()`);
    assert(setup, "CV Engine truth buttons not found");
    await session.key("Enter", "Enter", 13);
    await sleep(250);
    const state = await session.evaluate(`(() => {
      const buttons = [...document.querySelectorAll('.cv-truth-stack-controls button')];
      const inspector = document.querySelector('.cv-truth-inspector');
      return {
        secondPressed: buttons[1]?.getAttribute('aria-pressed'),
        title: inspector?.querySelector('h2')?.textContent?.trim() ?? '',
        live: inspector?.getAttribute('aria-live'),
        atomic: inspector?.getAttribute('aria-atomic'),
      };
    })()`);
    assert(state.secondPressed === "true", `CV Engine second truth button was not activated: ${JSON.stringify(state)}`);
    assert(state.title.includes("WHAT THE SOURCE SAID"), `CV Engine truth inspector did not update: ${JSON.stringify(state)}`);
    assert(state.live === "polite" && state.atomic === "true", `CV Engine inspector missing live semantics: ${JSON.stringify(state)}`);
  } finally {
    await session.close();
  }
});

if (failures.length) {
  console.error(`\nKeyboard smoke failed: ${failures.length} checks.`);
  process.exit(1);
}

console.log("\nKeyboard smoke passed: 6 interaction checks.");
