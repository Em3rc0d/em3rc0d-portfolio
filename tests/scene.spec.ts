import { test, expect } from '@playwright/test';

test('one renderer assembles, respects budgets, stops offscreen, and survives context loss', async ({ page }, info) => {
  await page.goto('/');
  const host = page.locator('.scene-runtime');
  await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'true');
  await expect(host.locator('canvas')).toHaveCount(1);
  const stats = await host.evaluate(el => ({ ...((el as HTMLElement).dataset) }));
  expect(Number(stats.triangles)).toBeLessThan(70_000); expect(Number(stats.drawCalls)).toBeLessThan(80);
  expect(Number(stats.dpr)).toBeLessThanOrEqual(1.5);
  await page.screenshot({ path: info.outputPath('build-core-webgl.png') });
  await info.attach('scene-stats', { body: JSON.stringify(stats), contentType: 'application/json' });
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  // Allow the IntersectionObserver to settle, then prove the render counter is stationary.
  await page.waitForTimeout(500); const before = await host.getAttribute('data-frames');
  await page.waitForTimeout(500); expect(await host.getAttribute('data-frames')).toBe(before);
  await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded();
  await host.locator('canvas').evaluate(el => { (el as HTMLCanvasElement).getContext('webgl2')!.getExtension('WEBGL_lose_context')!.loseContext(); });
  await expect(host).toHaveAttribute('data-quality', 'STATIC');
  await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'false');
  await expect(page.locator('.core-fallback')).toBeVisible();
  await page.getByRole('link', { name: 'Explore systems', exact: true }).click();
  await expect(page).toHaveURL(/\/systems$/); await expect(host.locator('canvas')).toHaveCount(1);
});

test('mobile renderer limits pixel ratio', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await page.locator('[data-scene-slot]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'true');
  expect(Number(await page.locator('.scene-runtime').getAttribute('data-dpr'))).toBeLessThanOrEqual(1.25);
});

test('reduced motion stays static and can change during a visit', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
  await expect(page.locator('.core-fallback')).toBeVisible(); await expect(page.locator('canvas')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'false');
});

test('WebGL unavailable keeps the designed fallback and functional CTAs', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith('webgl')) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto('/'); await expect(page.locator('.scene-runtime')).toHaveAttribute('data-reason', 'WEBGL_UNAVAILABLE');
  await expect(page.locator('.core-fallback')).toBeVisible(); await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('link', { name: 'Start a conversation', exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
});

test('lab performance records resource and rendering cost without claiming field CWV', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 93_750 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    const samples = { lcp: 0, cls: 0, longTasks: [] as number[] };
    Object.assign(window, { __labSamples: samples });
    new PerformanceObserver(list => { for (const e of list.getEntries()) samples.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const e of list.getEntries()) { const shift = e as PerformanceEntry & { hadRecentInput: boolean; value: number }; if (!shift.hadRecentInput) samples.cls += shift.value; } }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => { for (const e of list.getEntries()) samples.longTasks.push(e.duration); }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto('/'); await expect(page.locator('[data-scene-slot]')).toHaveAttribute('data-scene-ready', 'true');
  await page.waitForTimeout(1800);
  const report = await page.evaluate(() => ({
    ...(window as Window & { __labSamples?: object }).__labSamples,
    resources: performance.getEntriesByType('resource').map(e => { const r = e as PerformanceResourceTiming; return { name: r.name, transfer: r.transferSize, encoded: r.encodedBodySize }; }),
    domElements: document.querySelectorAll('*').length,
  }));
  await info.attach('lab-performance', { body: JSON.stringify({ conditions: 'Chromium software renderer; 390x844; 150ms latency; 1.6Mbps download; 4x CPU slowdown; lab only', ...report }, null, 2), contentType: 'application/json' });
  expect((report as typeof report & { cls: number }).cls).toBeLessThanOrEqual(.1);
  expect((report as typeof report & { lcp: number }).lcp).toBeLessThanOrEqual(2500);
  expect(report.domElements).toBeLessThan(1800);
});
