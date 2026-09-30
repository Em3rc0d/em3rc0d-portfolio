"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { localeFromPathname, localizedPath, locales, localeNames, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getReputationPolish } from "@/i18n/polish";

const navCopy: Record<Locale, { projects: string; about: string; cv: string; contact: string }> = {
  en: { projects: "Projects", about: "About", cv: "CV", contact: "Contact" },
  es: { projects: "Proyectos", about: "Sobre mí", cv: "CV", contact: "Contacto" },
  pt: { projects: "Projetos", about: "Sobre mim", cv: "CV", contact: "Contato" },
};

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getMessages(locale);
  const polish = getReputationPolish(locale);
  const nav = navCopy[locale];
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

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

  const projectsHref = localizedPath(locale, "/systems");
  const aboutHref = localizedPath(locale, "/about");
  const contactHref = localizedPath(locale, "/contact");

  return <header className="site-header">
    <div className="container header-inner">
      <Link href={localizedPath(locale, "/")} className="brand" aria-label={polish.shell.brandHome} onClick={() => setOpen(false)}>
        <svg width="27" height="30" viewBox="0 0 27 30" aria-hidden="true"><path d="M2 7 13.5 1 25 7v16l-11.5 6L2 23Z M2 7l11.5 6L25 7M13.5 13v16M2 15l11.5 6L25 15" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <span className="brand-copy"><strong>EDUARDO MERINO</strong><span className="brand-role">{profile.role} · Full Stack</span></span>
      </Link>
      <button className="menu-toggle" type="button" ref={toggle} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? t.nav.close : t.nav.menu}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label={polish.shell.primaryNavigation}>
        <Link href={projectsHref} aria-current={pathname === projectsHref || pathname.startsWith(`${projectsHref}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{nav.projects}</Link>
        <Link href={aboutHref} aria-current={pathname === aboutHref ? "page" : undefined} onClick={() => setOpen(false)}>{nav.about}</Link>
        <a href={profile.cvDownload} onClick={() => setOpen(false)}>{nav.cv}<span aria-hidden="true"> ↓</span></a>
        <Link href={contactHref} className="nav-contact" aria-current={pathname === contactHref ? "page" : undefined} onClick={() => setOpen(false)}>{nav.contact}<span aria-hidden="true">↗</span></Link>
        <div className="language-switcher" role="group" aria-label={t.language}>
          {locales.map((item) => <Link key={item} href={localizedPath(item, pathname)} lang={item} hrefLang={item} aria-current={item === locale ? "true" : undefined} aria-label={localeNames[item]} onClick={() => setOpen(false)}>{item.toUpperCase()}</Link>)}
        </div>
      </nav>
    </div>
  </header>;
}
