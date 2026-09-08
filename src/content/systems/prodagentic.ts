import type { SystemCase } from "./types";
export const prodagentic: SystemCase = {
  id: "06", slug: "prodagentic", name: "prodAgentic", category: "AI & workflow automation",
  summary: "Plan content that remembers what came before — while the person stays in control.",
  built: "A full-stack content workflow with versioned editorial profiles, batch planning, editorial memory and explainable novelty checks.",
  placement: "FLAGSHIP", publicability: "PUBLIC", ownership: "Primary builder · product, backend, frontend and verification",
  state: { label: "Verified planning foundation", detail: "This case study inspects the MK1 S0–S2 planning baseline, with published backend, frontend and browser receipts. The latest inspected ledger also records certified S3 structured content and S4 visual specifications; S5 rendering has not started.", boundary: "The detailed evidence here covers planning. Later slices are documented in the source ledger and were not rerun for this portfolio. External publishing is not claimed." },
  problem: "A content workflow can produce more material and still repeat the same ideas. Editorial identity, previous topics and human approval need to survive from one batch to the next.",
  importance: "The useful outcome is a plan someone can review, explain and continue working from — with fewer repeated ideas and a clear record of the decisions.",
  capabilities: ["Propose an editorial profile and require explicit acceptance.", "Freeze the profile version used by each plan.", "Plan batches using editorial memory, novelty and diversity rules.", "Keep planning evidence available without filling the main interface with it."],
  path: ["Profile", "Memory", "Plan", "Review"], artifact: "workflow", accent: "green",
  architecture: [
    { title: "Versioned editorial context", body: "Profile proposals become immutable ProfileVersions only after acceptance. The server owns the tenant boundary; records remain scoped to that tenant." },
    { title: "Planning and memory", body: "Batch planning reads rebuildable Editorial Memory, evaluates novelty and diversity, and freezes ContentPlan evidence with the chosen profile version." },
    { title: "Product-to-data path", body: "A Next.js cockpit connects to FastAPI application services and MongoDB persistence. The certified S2 novelty path is deterministic and provider-free." },
  ],
  decisions: [
    { title: "Return fewer ideas when necessary", body: "A batch may contain fewer items than requested when novelty is insufficient. The planner does not silently lower its standards to fill a counter." },
    { title: "Keep approvals bound to a version", body: "A later profile edit should not change the meaning of an earlier plan. Immutable versions add bookkeeping but make the plan reproducible." },
    { title: "Disclose planning evidence on demand", body: "Operators see a useful plan first. Engineers and reviewers can open the rationale when they need to assess it." },
  ],
  limitations: ["This case study proves only its specified S0–S2 planning scope; later S3/S4 certificates have separate boundaries.", "The inspected batch surface does not imply a complete batch-history browser.", "Published CI proves the tested revision and scope, not commercial readiness or observed customer outcomes."],
  evidence: ["E-PA-01", "E-PA-02"], source: { label: "prodAgentic source & implementation ledger", href: "https://github.com/Em3rc0d/prodAgentic" },
};
