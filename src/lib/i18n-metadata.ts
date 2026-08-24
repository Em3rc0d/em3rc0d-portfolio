import type { Metadata } from "next";
import { absoluteSiteUrl } from "@/lib/site-config";
import { localizedHref, stripLocalePrefix, type Locale } from "@/lib/i18n";

export function bilingualAlternates(pathname: string, locale: Locale): Metadata["alternates"] {
  const englishPath = stripLocalePrefix(pathname);
  const spanishPath = localizedHref(englishPath, "es");
  const canonicalPath = locale === "es" ? spanishPath : englishPath;

  const canonical = absoluteSiteUrl(canonicalPath);
  const english = absoluteSiteUrl(englishPath);
  const spanish = absoluteSiteUrl(spanishPath);

  return {
    ...(canonical ? { canonical } : {}),
    languages: {
      ...(english ? { en: english, "x-default": english } : {}),
      ...(spanish ? { es: spanish } : {}),
    },
  };
}
