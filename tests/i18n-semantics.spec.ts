import { test, expect } from "@playwright/test";

const cases = [
  { path: "/es", locale: "es", skip: "Saltar al contenido", nav: "Navegación principal", footer: "Navegación del pie de página", cta: "Ver proyectos", title: "Construyo software útil." },
  { path: "/pt", locale: "pt", skip: "Ir para o conteúdo", nav: "Navegação principal", footer: "Navegação do rodapé", cta: "Ver projetos", title: "Eu construo software útil." },
] as const;

for (const item of cases) {
  test(`${item.locale} server semantics and simple surface copy survive without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(item.path);
    await expect(page.locator("html")).toHaveAttribute("lang", item.locale);
    await expect(page.getByRole("link", { name: item.skip })).toBeVisible();
    await expect(page.getByRole("navigation", { name: item.nav })).toBeVisible();
    await expect(page.getByRole("navigation", { name: item.footer })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(item.title);
    await expect(page.getByRole("link", { name: item.cta, exact: true }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /CV/, exact: false }).first()).toBeVisible();
    await expect(page.locator(".simple-project-card")).toHaveCount(3);
    await context.close();
  });
}

test("language switch preserves the current system route", async ({ page }) => {
  await page.goto("/es/systems/vigia");
  const portuguese = page.getByRole("group", { name: "Idioma" }).getByRole("link", { name: "Português" });
  await expect(portuguese).toHaveAttribute("href", "/pt/systems/vigia");
  await portuguese.click();
  await expect(page).toHaveURL(/\/pt\/systems\/vigia$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt");
});

test("localized project and evidence pages do not leak internal enum labels", async ({ page }) => {
  await page.goto("/es/systems");
  await expect(page.locator(".simple-system-card")).toHaveCount(8);
  await expect(page.locator("main")).not.toContainText("PROFESSIONAL");
  await expect(page.locator("main")).not.toContainText("FLAGSHIP");
  await page.goto("/es/evidence/e-pa-01");
  await expect(page.locator(".evidence-facts")).not.toContainText("SOURCE_VERIFIED");
  await expect(page.locator(".evidence-facts")).not.toContainText("source verified");
});
