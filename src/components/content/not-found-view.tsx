import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getReputationPolish } from "@/i18n/polish";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getReputationPolish(locale).notFound;
  const [first, second] = t.title.split("\n");
  return <main id="main-content" lang={locale} className="container section" tabIndex={-1}>
    <p className="eyebrow accent">{t.eyebrow}</p>
    <h1 className="not-found-title">{first}<br/>{second}</h1>
    <p className="lead">{t.lead}</p>
    <div className="actions not-found-actions">
      <Link href={localePath(locale, "/systems")} className="button primary">{t.systems} ↗</Link>
      <Link href={localePath(locale, "/contact")} className="text-link">{t.contact} ↗</Link>
    </div>
  </main>;
}
