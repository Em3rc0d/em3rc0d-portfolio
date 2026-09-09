"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";
import { localeFromPathname, localizedPath } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getReputationPolish } from "@/i18n/polish";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = getMessages(locale);
  const polish = getReputationPolish(locale);
  return <footer className="site-footer"><div className="container footer-inner"><div><Link href={localizedPath(locale, "/")} className="footer-name">Eduardo Merino</Link><p>{t.footer.tagline}</p><span className="footer-product">{t.footer.product}</span></div><nav aria-label={polish.shell.footerNavigation}><Link href={localizedPath(locale, "/evidence")}>{t.footer.evidence}</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></nav><a href="#top" className="back-top">{t.footer.top}</a></div></footer>;
}
