import type { SystemCase } from "./types";
export const promptMachine: SystemCase = {
  id: "08", slug: "prompt-machine", name: "Prompt Machine", category: "Reusable AI workflows",
  summary: "Find a reusable way to get useful work done with AI.",
  built: "A product direction organized around workflow outcomes and collections, backed by an internal engineering and evidence pipeline.",
  placement: "R&D", publicability: "PUBLIC", ownership: "Primary builder · workflow product and engineering pipeline",
  state: { label: "Product branch · certification in progress", detail: "The product branch separates the customer-facing workflow library from Prompt Quarry, the internal source, engineering and validation pipeline.", boundary: "A packaged workflow is not automatically behaviorally tested, certified, portable or commercially validated." },
  problem: "A large collection of prompt files still leaves people deciding what to use, how to adapt it and whether the result is dependable.",
  importance: "The useful unit is a workflow for a real task: clear inputs, a process, an output, boundaries and a way to check the result.",
  capabilities: ["Organize workflows around user goals and related collections.", "Keep generated, tested and certified states distinct.", "Preserve provenance through source characterization and engineering.", "Separate product delivery evidence from behavioral and commercial evidence."],
  path: ["Goal", "Workflow", "Verify", "Reuse"], artifact: "workflow", accent: "green",
  architecture: [{ title: "Customer-facing product", body: "Prompt Machine starts from what someone needs to get done. Collections group related workflows around outcomes rather than a raw file count." }, { title: "Internal factory", body: "Prompt Quarry handles knowledge, candidate construction and evidence. Its internal stages do not become customer-facing navigation or automatic quality claims." }],
  decisions: [{ title: "Outcomes before inventory", body: "A workflow library should help a person complete a task. More files are not by themselves more customer value." }, { title: "Certification requires execution", body: "Structural validity and packaging integrity cannot substitute for real behavioral receipts and repeatable evaluation." }],
  limitations: ["This case describes the product branch, not a claim that all of its capabilities are deployed.", "No paid customers, revenue, empirical improvement or workflow certification is claimed."],
  evidence: [], source: { label: "Prompt Machine product branch", href: "https://github.com/Em3rc0d/prompts/tree/feat/workflow-kits-product-model-20260902" }, sourceBoundary: "Product and pipeline source are inspectable. Certification and deployment claims require their own execution receipts.",
};
