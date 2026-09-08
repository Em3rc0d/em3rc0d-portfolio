import { evidenceRecords as autoPulseEvidenceRecords } from "@/content/evidence";
import { cvEngineEvidenceRecords } from "@/content/cv-engine-evidence";
import { reputationEvidenceRecords } from "@/content/reputation-evidence";
import { currentEvidence } from "@/content/current-evidence";

export const evidenceRecords = [
  ...autoPulseEvidenceRecords,
  ...cvEngineEvidenceRecords,
  ...reputationEvidenceRecords,
  ...currentEvidence,
] as const;

export const publicEvidenceRecords = evidenceRecords.filter(
  (record) => record.publicability !== "PRIVATE",
);

export function findEvidenceBySlug(slug: string) {
  return publicEvidenceRecords.find((record) => record.slug === slug);
}
