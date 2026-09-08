import type { SystemCase } from "./types";
export const vigia: SystemCase = {
  id: "05", slug: "vigia", name: "VIGIA", category: "Geospatial decision support",
  summary: "See how limited resources can cover a territory — and what changes when the plan changes.",
  built: "A planning and simulation system for comparing territorial coverage under explicit resource and operating constraints.",
  placement: "FLAGSHIP", publicability: "ABSTRACTED", ownership: "Primary builder · problem model, software and comparison experience",
  state: { label: "Planning prototype · active R&D", detail: "The system separates equal-budget comparisons, full-service planning and evaluated capacity scenarios.", boundary: "This public case is an abstracted explanation. The source and internal validation records are private; this page is not an independent public certification." },
  problem: "When resources are limited, a map is not enough. A planner needs to understand what can be covered, what remains outside the plan and which constraints shape the answer.",
  importance: "Two plans are only meaningfully comparable when the comparison is fair. A plan that uses more time or resources should not quietly appear better than one with less.",
  capabilities: ["Compare coverage scenarios under the same declared budget.", "Keep resource limits and required coverage visible.", "Separate a fixed-budget comparison from a full-service planning question.", "Explain gaps, feasibility and the limits of the simulation."],
  path: ["Territory", "Constraints", "Scenarios", "Compare"], artifact: "territory", accent: "blue",
  architecture: [
    { title: "Represent the territory", body: "A road-network model provides the traversable structure for planning. Source context and assumptions remain separate from measured outcomes." },
    { title: "Freeze the comparison", body: "Comparable scenarios use the same resource budget, operating horizon and metric definitions. Different planning questions retain separate contracts." },
    { title: "Explain the result", body: "The interface exposes coverage, uncovered obligations and feasibility. The model can return no measured improvement; optimization is not a guaranteed win." },
  ],
  decisions: [
    { title: "Separate the planning questions", body: "Covering more within one budget and estimating the time needed for full service are different problems. Keeping them separate prevents misleading comparisons." },
    { title: "Preserve infeasibility", body: "Required obligations cannot disappear just to improve the presentation of a result. An impossible plan must remain visibly impossible." },
  ],
  limitations: ["Planning and simulation only; no live dispatch or observed response-time claim.", "Territorial context is not a prediction of individual events or a probability of crime.", "Conceptual graphics here are not an actual map, coverage result or runtime screenshot.", "Private source and internal proof are not exposed through this portfolio."],
  evidence: [], sourceBoundary: "Private source · abstracted case. The public explanation establishes the problem and design boundaries; independent source inspection is unavailable here.",
};
