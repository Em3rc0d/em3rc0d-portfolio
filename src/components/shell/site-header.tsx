"use client";

import {useLocale, useTranslations} from "next-intl";
import {LanguageToggle} from "@/components/i18n/language-toggle";
import {Link, usePathname} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

const navItems = [
  ["systems", "/systems"],
  ["notes", "/notes"],
  ["evidence", "/evidence"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Navigation");

  return (
    <>
      <header className="site-header">
        <Link className="site-identity" href="/" aria-label={t("home")}>
          <span>EM</span>
          <span aria-hidden="true">/</span>
          <span>BUILD ROOM</span>
          <span className="signal-dot" aria-hidden="true" />
        </Link>

        <nav aria-label={t("primary")}>
          <ul className="primary-nav">
            {navItems.map(([key, href], index) => {
              const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                    <span className="nav-index" aria-hidden="true">
                      0{index + 1}
                    </span>
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            <li className="language-switch" aria-label={t("language")}>
              <LanguageToggle locale={locale} pathname={pathname} />
            </li>
          </ul>
        </nav>
      </header>
      <span id="main-content" className="skip-target" tabIndex={-1} />
    </>
  );
}
