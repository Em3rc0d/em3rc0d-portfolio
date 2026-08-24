"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import {
  localeFromPathname,
  localizedHref,
  navigationLabels,
} from "@/lib/i18n";

const navItems = [
  ["systems", "/systems"],
  ["notes", "/notes"],
  ["evidence", "/evidence"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const labels = navigationLabels[locale];

  return (
    <>
      <header className="site-header">
        <Link
          className="site-identity"
          href={localizedHref("/", locale)}
          aria-label={labels.home}
        >
          <span>EM</span>
          <span aria-hidden="true">/</span>
          <span>BUILD ROOM</span>
          <span className="signal-dot" aria-hidden="true" />
        </Link>

        <nav aria-label={labels.primaryNavigation}>
          <ul className="primary-nav">
            {navItems.map(([key, baseHref], index) => {
              const href = localizedHref(baseHref, locale);
              const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={baseHref}>
                  <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                    <span className="nav-index" aria-hidden="true">
                      0{index + 1}
                    </span>
                    {labels[key]}
                  </Link>
                </li>
              );
            })}
            <li className="language-switch" aria-label={labels.switchLanguage}>
              <LanguageToggle locale={locale} pathname={pathname} />
            </li>
          </ul>
        </nav>
      </header>
      <span id="main-content" className="skip-target" tabIndex={-1} />
    </>
  );
}
