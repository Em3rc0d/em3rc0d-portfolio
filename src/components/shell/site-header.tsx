"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localeFromPathname, localizedPath, locales, localeNames } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const navPaths = [
  ["systems", "/systems"],
  ["notes", "/notes"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <header className="site-header">
    <div className="container header-inner">
      <Link href={localizedPath(locale, "/")} className="brand" aria-label={`Eduardo Merino — ${t.identity.role} home`} onClick={() => setOpen(false)}>
        <svg width="27" height="30" viewBox="0 0 27 30" aria-hidden="true"><path d="M2 7 13.5 1 25 7v16l-11.5 6L2 23Z M2 7l11.5 6L25 7M13.5 13v16M2 15l11.5 6L25 15" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <span className="brand-copy"><strong>EDUARDO MERINO</strong><span className="brand-role">{t.identity.role} · Applied AI</span></span>
      </Link>
      <button className="menu-toggle" type="button" ref={toggle} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? t.nav.close : t.nav.menu}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
        {navPaths.map(([key, href]) => {
          const target = localizedPath(locale, href);
          const activePath = localizedPath(locale, href);
          const label = t.nav[key];
          return <Link key={href} href={target} className={href === "/contact" ? "nav-contact" : undefined} aria-current={pathname === activePath || pathname.startsWith(`${activePath}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{label}{href === "/contact" && <span aria-hidden="true">↗</span>}</Link>;
        })}
        <div className="language-switcher" role="group" aria-label={t.language}>
          {locales.map((item) => <Link key={item} href={localizedPath(item, pathname)} lang={item} hrefLang={item} aria-current={item === locale ? "true" : undefined} aria-label={localeNames[item]} onClick={() => setOpen(false)}>{item.toUpperCase()}</Link>)}
        </div>
      </nav>
    </div>
  </header>;
}
