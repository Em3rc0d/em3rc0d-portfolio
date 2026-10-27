import { test, expect } from "@playwright/test";

const locales = [
  { home: "/", about: "/about" },
  { home: "/es", about: "/es/about" },
  { home: "/pt", about: "/pt/about" },
] as const;

for (const { home, about } of locales) {
  test(`identity is consistent in HTML and structured data at ${home}`, async ({ page }) => {
    await page.goto(home);
    await expect(page).toHaveTitle(/Em3rc0d.*Eduardo Merino/);
    const jsonLd = page.locator('script[type="application/ld+json"]').first();
    const person = JSON.parse((await jsonLd.textContent()) ?? "{}");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Eduardo Merino");
    expect(person.alternateName).toEqual(["Em3rc0d", "Emercod"]);
    expect(person.sameAs).toContain("https://github.com/Em3rc0d");
    expect(person.sameAs).toContain("https://www.linkedin.com/in/emerinoc");

    await page.goto(about);
    await expect(page.getByRole("main")).toContainText("Em3rc0d");
  });
}
