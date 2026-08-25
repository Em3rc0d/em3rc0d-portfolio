import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {EvidenceRecordView} from "@/components/evidence/evidence-record";
import {LanguageToggle} from "@/components/i18n/language-toggle";
import {
  findLocalizedEvidenceBySlug,
  getLocalizedEvidenceRecords,
  getLocalizedSystems,
} from "@/content/localized";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";

interface EvidencePageProps {
  params: Promise<{locale: string; slug: string}>;
}

export function generateStaticParams({params}: {params: {locale: string}}) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return getLocalizedEvidenceRecords(params.locale).map((record) => ({slug: record.slug}));
}

export async function generateMetadata({params}: EvidencePageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const record = findLocalizedEvidenceBySlug(slug, locale);
  if (!record) return {};
  return {
    title: record.id,
    description: record.claim,
    alternates: bilingualAlternates(`/evidence/${record.slug}`, locale),
  };
}

export default async function EvidenceRecordPage({params}: EvidencePageProps) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const record = findLocalizedEvidenceBySlug(slug, locale);
  if (!record) notFound();

  const relatedSystem = getLocalizedSystems(locale).find(
    (system) => system.id === record.systemId && system.href,
  );
  const pathname = `/evidence/${record.slug}`;

  return (
    <>
      <LanguageToggle locale={locale} pathname={pathname} className="dossier-language-switch" />
      <EvidenceRecordView
        record={record}
        systemHref={relatedSystem?.href ?? "/systems"}
        locale={locale}
      />
    </>
  );
}
