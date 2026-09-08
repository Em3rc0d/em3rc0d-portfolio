import type { SystemCase } from "./types";
export const cvEngine: SystemCase = {
  id: "02", slug: "cv-engine", name: "CV Engine", category: "Application intelligence",
  summary: "Compare an opportunity with what a person can actually prove.",
  built: "An evidence model for career facts, opportunity requirements, bounded assessment and traceable resume projections.",
  placement: "SUPPORT", publicability: "PUBLIC", ownership: "Primary builder · career model and evidence boundaries",
  state: { label: "Current rebuild · historical proof retained", detail: "The current repository describes a zero-based rebuild with an application and Career Evidence foundation. The dossiers here preserve the previously reviewed model and test artifacts.", boundary: "Historical source verification does not certify the new runtime. Earlier matching and resume behaviors remain scoped to their reviewed lineage." },
  problem: "A job description says what an employer wants. It cannot prove that a candidate already has those skills, responsibilities or experience.",
  importance: "Application software should help someone make a stronger, more defensible case without manufacturing a different professional history.",
  capabilities: ["Keep career evidence separate from job requirements.", "Represent missing evidence and unknown eligibility explicitly.", "Trace resume wording to supporting assertions in the reviewed model.", "Preserve a distinction between fact, analysis and recommendation."],
  path: ["Evidence", "Opportunity", "Assessment", "Application"], artifact: "evidence", accent: "blue",
  architecture: [{ title: "Separate truth domains", body: "CareerEvidence and CareerAssertions represent the candidate side. JobRequirements derive from job snapshots. A requirement match does not create a new candidate fact." }, { title: "Versioned projections", body: "The historical implementation models content-addressed resume versions, provenance and controlled provider acquisition. These remain historical evidence while the new application is rebuilt." }],
  decisions: [{ title: "Do not upgrade responsibility through wording", body: "A rewrite cannot silently turn participation into leadership or implementation into architecture ownership." }, { title: "Unknown is meaningful", body: "A silent source is not a negative result. Keeping UNKNOWN explicit prevents a recommendation from appearing more certain than its inputs." }],
  limitations: ["No hiring probability, ATS ranking or guaranteed employment outcome is claimed.", "The evidence dossiers refer to reviewed historical artifacts; the new rebuild has separate gates."],
  evidence: ["E-CV-01", "E-CV-03", "E-CV-04", "E-CV-06", "E-CV-12"], source: { label: "Current CV Engine rebuild", href: "https://github.com/Em3rc0d/harvard-ats-resume" },
};
