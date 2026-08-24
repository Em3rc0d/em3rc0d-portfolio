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
  return getLocalizedEvidenceRecords("es").map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: EvidencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findLocalizedEvidenceBySlug(slug, "es");
  if (!record) return {};
  return {
    title: record.id,
    description: record.claim,
    alternates: bilingualAlternates(`/evidence/${record.slug}`, "es"),
  };
}

export default async function SpanishEvidenceRecordPage({ params }: EvidencePageProps) {
  const { slug } = await params;
  const record = findLocalizedEvidenceBySlug(slug, "es");
  if (!record) notFound();

  const relatedSystem = getLocalizedSystems("es").find(
    (system) => system.id === record.systemId && system.href,
  );
  const pathname = `/es/evidence/${record.slug}`;

  return (
    <>
      <LanguageToggle locale="es" pathname={pathname} className="dossier-language-switch" />
      <EvidenceRecordView
        record={record}
        systemHref={relatedSystem?.href ?? "/es/systems"}
        locale="es"
      />
    </>
  );
}
