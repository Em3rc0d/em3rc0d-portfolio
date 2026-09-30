import type { SystemCase } from "./types";

export const talos: SystemCase = {
  id: "11",
  slug: "talos",
  name: "TALOS",
  category: "Process intelligence · Durable execution",
  summary: "Translate messy business-process descriptions into reviewable, executable workflows without erasing where the meaning came from.",
  built: "A source-aware process-intelligence system that preserves source evidence, builds a canonical process model, supports human correction and produces governed execution plans for durable runtime execution.",
  placement: "SUPPORT",
  publicability: "ABSTRACTED",
  ownership: "Core product and engineering contributor · semantics, product path, runtime and validation",
  state: {
    label: "Full product path implemented · field trials required",
    detail: "The implemented path reaches source preservation, semantic review, explicit automation approval, Temporal execution and a real external effect. Final Talos 1.0 certification remains blocked on qualifying external field trials.",
    boundary: "Internal tests and reference verticals do not substitute for field trials, commercial repeatability or product-market fit. The repository is private and this portfolio presents only a bounded public description."
  },
  problem: "Business processes arrive as diagrams, documents and human descriptions with different vocabularies and hidden assumptions. Converting them directly into automation can silently change their meaning.",
  importance: "Automation becomes dangerous when execution authority outruns semantic understanding. The system needs a visible chain from source truth to review, approval and durable execution.",
  capabilities: [
    "Preserve the original source and provenance before canonicalization.",
    "Build a reviewable process model with uncertainty and human correction.",
    "Separate business confirmation, automation design, execution-plan approval and runtime authority.",
    "Map approved execution into Temporal and retain durable execution evidence across restart/recovery."
  ],
  path: ["Source", "Review", "Approve", "Execute"],
  artifact: "workflow",
  accent: "copper",
  architecture: [
    { title: "Source-aware canonicalization", body: "Inputs remain versioned and attributable. Canonical semantics are derived with provenance and validation rather than replacing the source." },
    { title: "Human authority chain", body: "Correction, business confirmation, automation design, capability binding, ExecutionPlan approval and runtime approval are distinct gates." },
    { title: "Durable execution", body: "Approved plans map to Temporal runtime primitives while deployment, attempts, observations and workflow executions remain separate durable records." }
  ],
  decisions: [
    { title: "Runtime never becomes source truth", body: "Observed execution can add evidence about what happened, but it cannot silently rewrite the business intent that authorized the run." },
    { title: "Approval is staged", body: "Understanding a process does not authorize automation, and designing automation does not authorize deployment or execution." },
    { title: "Recovery restores evidence, not consumed authority", body: "Restart recovery reconstructs durable state without reviving approvals or authority that should have been single-use." }
  ],
  limitations: [
    "Talos 1.0 is not certified until qualifying external field trials close.",
    "Commercial repeatability, product-market fit and broad enterprise readiness are not proven.",
    "The source repository is private; this page does not offer independent source inspection.",
    "One reference vertical and one external effect do not prove every process, provider or integration."
  ],
  evidence: [],
  sourceBoundary: "Private source · bounded public case. The implementation path is described from repository evidence available to the portfolio owner; external source inspection is not available."
};
