import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {EvidenceLibrary} from "@/components/evidence/evidence-library";
import {SiteHeader} from "@/components/shell/site-header";
import {getLocalizedEvidenceRecords} from "@/content/localized";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2.css";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    title: t("evidenceTitle"),
    description: t("evidenceDescription"),
    alternates: bilingualAlternates("/evidence", locale),
  };
}

export default async function EvidencePage({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="evidence-page">
      <div className="evidence-page-header"><SiteHeader /></div>
      <EvidenceLibrary records={getLocalizedEvidenceRecords(locale)} />
    </main>
  );
}
