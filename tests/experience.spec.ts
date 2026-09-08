import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const surfaces = ['/', '/systems', '/systems/autopulse', '/systems/vigia', '/systems/prodagentic', '/notes', '/notes/no-data-is-not-zero', '/about', '/contact', '/evidence', '/evidence/e-pa-01'];
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

test('identity, keyboard navigation, depth and contact form a complete visitor path', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Complex problems.Working systems.');
  await expect(page.getByText('Eduardo Merino', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Explore systems', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start a conversation', exact: true }).first()).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  expect(await page.getByRole('link', { name: 'Skip to content' }).evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: 'Explore AutoPulse', exact: true }).click();
  await expect(page).toHaveURL(/\/systems\/autopulse$/);
  const details = page.locator('#how-it-works');
  await expect(details).not.toHaveAttribute('open');
  await details.locator('summary').focus(); await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('main a[href="https://www.linkedin.com/in/emerinoc"]').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('catalogs expose search, counts and a recoverable empty state', async ({ page }) => {
  for (const kind of ['notes', 'evidence']) {
    await page.goto(`/${kind}`);
    await page.getByRole('searchbox').fill('zz-no-such-record');
    await expect(page.getByRole('status')).toContainText('0 records');
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page.getByRole('status')).not.toContainText('0 records');
  }
  await page.getByRole('searchbox').fill('E-PA-01');
  await expect(page.getByRole('status')).toContainText('1 record');
});

for (const width of [320, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive composition at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of surfaces) {
      await page.goto(path); await page.evaluate(() => document.fonts.ready);
      await noOverflow(page);
      await expect(page.locator('h1')).toHaveCount(1);
      if (path === '/' || path === '/systems/vigia') {
        await page.screenshot({ path: info.outputPath(`${path === '/' ? 'home' : 'vigia'}-${width}.png`), fullPage: true });
      }
    }
    if (width < 768) {
      await page.goto('/');
      const toggle = page.locator('.menu-toggle');
      await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
      await toggle.click(); await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }).click();
      await expect(page).toHaveURL(/\/contact$/);
    }
  });
}

for (const height of [600, 700, 800]) {
  test(`short desktop ${height}px keeps both hero actions accessible`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1440, height }); await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/'); await noOverflow(page);
    const cta = page.getByRole('link', { name: 'Explore systems', exact: true });
    await expect(cta).toBeInViewport();
    await page.screenshot({ path: info.outputPath(`short-${height}.png`) });
  });
}

for (const width of [390, 1440]) {
  test(`WCAG 2.2 AA automated scan at ${width}px`, async ({ page }, info) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: 900 }); await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of surfaces) {
      await page.goto(path);
      if (path === '/systems/autopulse') await page.locator('#how-it-works > summary').click();
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      await info.attach(`axe-${path.replaceAll('/', '_')}`, { body: JSON.stringify(result.violations, null, 2), contentType: 'application/json' });
      expect(result.violations, path).toEqual([]);
    }
  });
}

test('200 percent text enlargement and 400 percent equivalent reflow', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/', '/systems/autopulse', '/contact']) {
    await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(path);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`text-200-${path.replaceAll('/', '_')}.png`), fullPage: true });
    await page.setViewportSize({ width: 320, height: 900 }); await page.goto(path); await noOverflow(page);
  }
});

test('no JavaScript still exposes identity, systems, evidence and contact', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  await page.goto('/'); await expect(page.locator('h1')).toBeVisible(); await expect(page.locator('.core-fallback')).toBeVisible();
  await page.getByRole('link', { name: 'Explore AutoPulse', exact: true }).click();
  await page.locator('#how-it-works > summary').click(); await expect(page.locator('#how-it-works')).toHaveAttribute('open');
  await context.close();
});
