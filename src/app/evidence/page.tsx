import { EvidenceLibrary } from "@/components/evidence/evidence-library";
import { SiteHeader } from "@/components/shell/site-header";
import { publicEvidenceRecords } from "@/content/evidence-index";

export const metadata = {
  title: "Evidence",
  description:
    "Inspectable public evidence for Eduardo Merino's systems: claims, source provenance, verification state, context, and limitations.",
};

export default function EvidencePage() {
  return (
    <main className="evidence-page">
      <div className="evidence-page-header">
        <SiteHeader />
      </div>
      <EvidenceLibrary records={publicEvidenceRecords} />
    </main>
  );
}
