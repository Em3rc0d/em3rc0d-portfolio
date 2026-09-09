import type { SystemCase } from "./types";
export const prodagentic: SystemCase = {
  id: "06", slug: "prodagentic", name: "prodAgentic", category: "AI & workflow automation",
  summary: "Plan content that remembers what came before — while the person stays in control.",
  built: "A full-stack content workflow with versioned editorial profiles, batch planning, editorial memory and explainable novelty checks.",
  placement: "FLAGSHIP", publicability: "PUBLIC", ownership: "Primary builder · product, backend, frontend and verification",
  state: { label: "Verified planning foundation · product evolving", detail: "Published evidence on this portfolio certifies the MK1 S0–S2 planning baseline. The current product interface has evolved beyond that inspected scope and is shown here as product reality, without extending those earlier certificates.", boundary: "The detailed evidence below covers planning. Later product surfaces are visible, but they are not retroactively certified by the S0–S2 receipts. External publishing and commercial outcomes are not claimed." },
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
  limitations: ["The published evidence on this portfolio proves its specified S0–S2 planning scope; current product surfaces have separate verification lineage.", "The inspected batch surface does not imply a complete batch-history browser.", "Published CI proves the tested revision and scope, not commercial readiness or observed customer outcomes."],
  media: [
    { kind: "image", src: "https://drive.google.com/thumbnail?id=1JWZiXUXIjq_16JpbC5ftfW8gjUqMLZ8S&sz=w1600", href: "https://drive.google.com/file/d/1JWZiXUXIjq_16JpbC5ftfW8gjUqMLZ8S/view", alt: "prodAgentic Content Studio showing a governed content workflow, visual stage, preview and workflow health", width: 1400, height: 686, label: "product" },
  ],
  evidence: ["E-PA-01", "E-PA-02"], source: { label: "prodAgentic source & implementation ledger", href: "https://github.com/Em3rc0d/prodAgentic" },
};
