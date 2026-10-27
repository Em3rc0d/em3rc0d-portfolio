import { expect, test } from "@playwright/test";

const journeys = [
  { home: "/", contact: "/contact", heroCta: "Discuss a role", roleCta: "Discuss an engineering role", projectCta: "Discuss a software project", roleSubject: "Engineering opportunity", projectSubject: "Software project inquiry" },
  { home: "/es", contact: "/es/contact", heroCta: "Hablar de un puesto", roleCta: "Proponer una oportunidad laboral", projectCta: "Consultar por un proyecto de software", roleSubject: "Oportunidad laboral", projectSubject: "Consulta de proyecto de software" },
  { home: "/pt", contact: "/pt/contact", heroCta: "Falar sobre uma vaga", roleCta: "Conversar sobre uma vaga", projectCta: "Conversar sobre um projeto de software", roleSubject: "Oportunidade de engenharia", projectSubject: "Consulta de projeto de software" },
] as const;

for (const journey of journeys) {
  test(`recruiter and client contact journeys exist at ${journey.home}`, async ({ page }) => {
    await page.goto(journey.home);
    await expect(page.locator(".cinema-hero-copy")).toContainText("Em3rc0d / Eduardo Merino");
    const heroContact = page.getByRole("link", { name: journey.heroCta, exact: true });
    await expect(heroContact).toHaveAttribute("href", journey.contact);
    await heroContact.click();
    await expect(page).toHaveURL(new RegExp(`${journey.contact.replaceAll("/", "\\/")}$`));
    await expect(page.locator("[data-testid=engagement-paths] > section")).toHaveCount(2);
    const role = page.getByRole("link", { name: journey.roleCta, exact: true });
    const project = page.getByRole("link", { name: journey.projectCta, exact: true });
    const roleHref = await role.getAttribute("href");
    const projectHref = await project.getAttribute("href");
    expect(roleHref).toContain("mailto:");
    expect(projectHref).toContain("mailto:");
    expect(decodeURIComponent(roleHref ?? "")).toContain(journey.roleSubject);
    expect(decodeURIComponent(projectHref ?? "")).toContain(journey.projectSubject);
    expect(roleHref).not.toEqual(projectHref);
    await expect(page.getByRole("link", { name: /GitHub/, exact: false }).last()).toBeVisible();
    await expect(page.getByRole("link", { name: /LinkedIn/, exact: false }).last()).toBeVisible();
  });
}
