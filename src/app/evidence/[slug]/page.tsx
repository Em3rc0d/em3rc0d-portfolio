import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EvidenceRecordView } from "@/components/evidence/evidence-record";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import {
  findLocalizedEvidenceBySlug,
  getLocalizedEvidenceRecords,
  getLocalizedSystems,
} from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";

interface EvidencePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLocalizedEvidenceRecords("en").map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: EvidencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findLocalizedEvidenceBySlug(slug, "en");
  if (!record) return {};
  return {
    title: record.id,
    description: record.claim,
    alternates: bilingualAlternates(`/evidence/${record.slug}`, "en"),
  };
}

export default async function EvidenceRecordPage({ params }: EvidencePageProps) {
  const { slug } = await params;
  const record = findLocalizedEvidenceBySlug(slug, "en");
  if (!record) notFound();

  const relatedSystem = getLocalizedSystems("en").find(
    (system) => system.id === record.systemId && system.href,
  );
  const pathname = `/evidence/${record.slug}`;

  return (
    <>
      <LanguageToggle locale="en" pathname={pathname} className="dossier-language-switch" />
      <EvidenceRecordView
        record={record}
        systemHref={relatedSystem?.href ?? "/systems"}
        locale="en"
      />
    </>
  );
}
