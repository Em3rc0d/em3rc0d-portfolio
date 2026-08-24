export type Locale = "en" | "es";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES = ["en", "es"] as const;

export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

function splitPathSuffix(href: string) {
  const match = href.match(/^([^?#]*)(.*)$/);
  return {
    pathname: match?.[1] || "/",
    suffix: match?.[2] || "",
  };
}

export function localizedHref(href: string, locale: Locale): string {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const { pathname, suffix } = splitPathSuffix(href);
  const basePath = stripLocalePrefix(pathname || "/");

  if (locale === "es") {
    const localizedPath = basePath === "/" ? "/es" : `/es${basePath}`;
    return `${localizedPath}${suffix}`;
  }

  return `${basePath}${suffix}`;
}

export const navigationLabels = {
  en: {
    systems: "Systems",
    notes: "Notes",
    evidence: "Evidence",
    about: "About",
    contact: "Contact",
    primaryNavigation: "Primary navigation",
    home: "Eduardo Merino — Home",
    switchLanguage: "Language",
    switchToEnglish: "Switch to English",
    switchToSpanish: "Cambiar a español",
  },
  es: {
    systems: "Sistemas",
    notes: "Notas",
    evidence: "Evidencia",
    about: "Acerca de",
    contact: "Contacto",
    primaryNavigation: "Navegación principal",
    home: "Eduardo Merino — Inicio",
    switchLanguage: "Idioma",
    switchToEnglish: "Cambiar a inglés",
    switchToSpanish: "Cambiar a español",
  },
} as const;

const evidenceTypeLabels: Record<string, Record<Locale, string>> = {
  ARCHITECTURE: { en: "Architecture", es: "Arquitectura" },
  IMPLEMENTATION: { en: "Implementation", es: "Implementación" },
  RECOVERY: { en: "Recovery", es: "Recuperación" },
  MODEL: { en: "Model", es: "Modelo" },
  PRODUCT: { en: "Product", es: "Producto" },
  TEST: { en: "Test", es: "Prueba" },
};

const evidenceStateLabels: Record<string, Record<Locale, string>> = {
  IMPLEMENTED: { en: "IMPLEMENTED", es: "IMPLEMENTADO" },
  SOURCE_VERIFIED: { en: "SOURCE VERIFIED", es: "FUENTE VERIFICADA" },
  TEST_ARTIFACT: { en: "TEST ARTIFACT", es: "ARTEFACTO DE PRUEBA" },
  FIELD_VALIDATED: { en: "FIELD VALIDATED", es: "VALIDADO EN CAMPO" },
  IN_TEST: { en: "IN TEST", es: "EN PRUEBA" },
  NOT_CLAIMED: { en: "NOT CLAIMED", es: "NO DECLARADO" },
};

const publicabilityLabels: Record<string, Record<Locale, string>> = {
  PUBLIC: { en: "PUBLIC", es: "PÚBLICO" },
  SANITIZED: { en: "SANITIZED", es: "SANITIZADO" },
  ABSTRACTED: { en: "ABSTRACTED", es: "ABSTRAÍDO" },
  PRIVATE: { en: "PRIVATE", es: "PRIVADO" },
};

const systemStateLabels: Record<string, Record<Locale, string>> = {
  ACTIVE: { en: "ACTIVE", es: "ACTIVO" },
  ACTIVE_RND: { en: "ACTIVE R&D", es: "I+D ACTIVO" },
  VERIFIED: { en: "VERIFIED", es: "VERIFICADO" },
  EXPERIMENTAL: { en: "EXPERIMENTAL", es: "EXPERIMENTAL" },
  ARCHIVED: { en: "ARCHIVED", es: "ARCHIVADO" },
};

const noteStateLabels: Record<string, Record<Locale, string>> = {
  BUILT_VERIFIED: { en: "BUILT / VERIFIED", es: "CONSTRUIDO / VERIFICADO" },
  EXPLORING: { en: "EXPLORING", es: "EXPLORANDO" },
};

const noteTerritoryLabels: Record<string, Record<Locale, string>> = {
  "SYSTEM THINKING": { en: "SYSTEM THINKING", es: "PENSAMIENTO DE SISTEMAS" },
  BUILDING: { en: "BUILDING", es: "CONSTRUCCIÓN" },
  RECOVERY: { en: "RECOVERY", es: "RECUPERACIÓN" },
  "APPLIED AI": { en: "APPLIED AI", es: "IA APLICADA" },
  EVIDENCE: { en: "EVIDENCE", es: "EVIDENCIA" },
  "FIELD NOTE": { en: "FIELD NOTE", es: "NOTA DE CAMPO" },
};

export function evidenceTypeLabel(value: string, locale: Locale) {
  return evidenceTypeLabels[value]?.[locale] ?? value.replaceAll("_", " ");
}

export function evidenceStateLabel(value: string, locale: Locale) {
  return evidenceStateLabels[value]?.[locale] ?? value.replaceAll("_", " ");
}

export function publicabilityLabel(value: string, locale: Locale) {
  return publicabilityLabels[value]?.[locale] ?? value.replaceAll("_", " ");
}

export function systemStateLabel(value: string, locale: Locale) {
  return systemStateLabels[value]?.[locale] ?? value.replaceAll("_", " ");
}

export function noteStateLabel(value: string, locale: Locale) {
  return noteStateLabels[value]?.[locale] ?? value.replaceAll("_", " ");
}

export function noteTerritoryLabel(value: string, locale: Locale) {
  return noteTerritoryLabels[value]?.[locale] ?? value;
}
