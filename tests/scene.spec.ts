import { test, expect } from '@playwright/test';

test('public homepage stays intentionally simple without a WebGL runtime', async ({ page }, info) => {
  await page.goto('/');
  await expect(page.locator('.scene-runtime')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('I build systems for messy real-world problems.');
  await expect(page.locator('.simple-project-card')).toHaveCount(3);
  await page.screenshot({ path: info.outputPath('simple-home.png'), fullPage: true });
});

test('mobile homepage keeps the simple presentation and primary actions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Explore the work', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV', exact: true }).first()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('reduced motion does not hide content or create alternate scene behavior', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.simple-hero-person')).toBeVisible();
  await expect(page.locator('.simple-project-grid')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('lab performance records the lighter public surface', async ({ page }, info) => {
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
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.waitForTimeout(1800);
  const report = await page.evaluate(() => ({
    ...(window as Window & { __labSamples?: object }).__labSamples,
    resources: performance.getEntriesByType('resource').map(e => {
      const r = e as PerformanceResourceTiming;
      return { name: r.name, transfer: r.transferSize, encoded: r.encodedBodySize };
    }),
    domElements: document.querySelectorAll('*').length,
    canvasCount: document.querySelectorAll('canvas').length,
  }));
  await info.attach('lab-performance', {
    body: JSON.stringify({ conditions: 'Chromium; 390x844; 150ms latency; 1.6Mbps download; 4x CPU slowdown; lab only', ...report }, null, 2),
    contentType: 'application/json'
  });
  expect((report as typeof report & { cls: number }).cls).toBeLessThanOrEqual(.1);
  expect((report as typeof report & { lcp: number }).lcp).toBeGreaterThan(0);
  expect((report as typeof report & { lcp: number }).lcp).toBeLessThanOrEqual(4000);
  expect(report.domElements).toBeLessThan(1400);
  expect(report.canvasCount).toBe(0);
});
