"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";
import { localeFromPathname, localizedPath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getReputationPolish } from "@/i18n/polish";

const footerCopy: Record<Locale, { projects: string; about: string; cv: string; contact: string }> = {
  en: { projects: "Projects", about: "About", cv: "Download CV", contact: "Contact" },
  es: { projects: "Proyectos", about: "Sobre mí", cv: "Descargar CV", contact: "Contacto" },
  pt: { projects: "Projetos", about: "Sobre mim", cv: "Baixar CV", contact: "Contato" },
};

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getMessages(locale);
  const polish = getReputationPolish(locale);
  const copy = footerCopy[locale];
  return <footer className="site-footer"><div className="container footer-inner"><div><Link href={localizedPath(locale, "/")} className="footer-name">Eduardo Merino</Link><p>{profile.role} · Full Stack · {profile.location}</p></div><nav aria-label={polish.shell.footerNavigation}><Link href={localizedPath(locale, "/systems")}>{copy.projects}</Link><Link href={localizedPath(locale, "/about")}>{copy.about}</Link><a href={profile.cvDownload}>{copy.cv} ↓</a><Link href={localizedPath(locale, "/contact")}>{copy.contact} ↗</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></nav><a href="#top" className="back-top">{t.footer.top}</a></div></footer>;
}
