export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const prefixedLocales = ["es", "pt"] as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "es" || first === "pt" ? first : "en";
}

export function stripLocale(pathname: string): string {
  const locale = localeFromPathname(pathname);
  if (locale === "en") return pathname || "/";
  const without = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return without || "/";
}

export function localizedPath(locale: Locale, pathname: string): string {
  const clean = stripLocale(pathname);
  if (locale === "en") return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function languageAlternates(path: string) {
  return {
    en: localePath("en", path),
    es: localePath("es", path),
    pt: localePath("pt", path),
    "x-default": localePath("en", path),
  } as const;
}
