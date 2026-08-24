import type { Metadata } from "next";
import { EvidenceLibrary } from "@/components/evidence/evidence-library";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedEvidenceRecords } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../visual-acceptance-v2.css";

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "Inspectable public evidence for Eduardo Merino's systems: claims, source provenance, verification state, context, and limitations.",
  alternates: bilingualAlternates("/evidence", "en"),
};

export default function EvidencePage() {
  return (
    <main className="evidence-page">
      <div className="evidence-page-header"><SiteHeader /></div>
      <EvidenceLibrary records={getLocalizedEvidenceRecords("en")} />
    </main>
  );
}
