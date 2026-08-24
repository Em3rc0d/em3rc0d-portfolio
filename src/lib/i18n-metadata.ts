import type {Metadata} from "next";
import {getPathname} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";
import {absoluteSiteUrl} from "@/lib/site-config";

export function bilingualAlternates(
  pathname: string,
  locale: AppLocale,
): Metadata["alternates"] {
  const englishPath = getPathname({locale: "en", href: pathname});
  const spanishPath = getPathname({locale: "es", href: pathname});
  const canonicalPath = getPathname({locale, href: pathname});

  const canonical = absoluteSiteUrl(canonicalPath);
  const english = absoluteSiteUrl(englishPath);
  const spanish = absoluteSiteUrl(spanishPath);

  return {
    ...(canonical ? {canonical} : {}),
    languages: {
      ...(english ? {en: english, "x-default": english} : {}),
      ...(spanish ? {es: spanish} : {}),
    },
  };
}
