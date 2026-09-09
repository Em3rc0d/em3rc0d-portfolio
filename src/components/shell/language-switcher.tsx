"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localeNames, localizedPath, locales } from "@/i18n/config";

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const active = localeFromPathname(pathname);

  return (
    <div className="language-switcher" aria-label="Language">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(locale, pathname)}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === active ? "true" : undefined}
          aria-label={`${localeNames[locale]}${locale === active ? " — current language" : ""}`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
