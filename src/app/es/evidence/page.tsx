import type { Metadata } from "next";
import { EvidenceLibrary } from "@/components/evidence/evidence-library";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedEvidenceRecords } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2.css";

export const metadata: Metadata = {
  title: "Evidencia",
  description:
    "Evidencia pública inspeccionable de los sistemas de Eduardo Merino: afirmaciones, procedencia, estado de verificación, contexto y limitaciones.",
  alternates: bilingualAlternates("/evidence", "es"),
};

export default function SpanishEvidencePage() {
  return (
    <main className="evidence-page">
      <div className="evidence-page-header"><SiteHeader /></div>
      <EvidenceLibrary records={getLocalizedEvidenceRecords("es")} />
    </main>
  );
}
