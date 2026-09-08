import { supportingCases } from "@/content/supporting-cases";
import type { SystemCase } from "./types";
const mapper = supportingCases[0];
const gpetsRecord = supportingCases[1];
export const infrastructure: SystemCase = {
  id: "03", slug: "infrastructure-site-mapper", name: "Infrastructure Site Mapper", category: "Professional · operational software",
  summary: "Make physical infrastructure easier to navigate, understand and operate.", built: "Implementation across spatial infrastructure views, equipment context, provisioning and security hardening within a professional system.",
  placement: "PROFESSIONAL", publicability: "ABSTRACTED", ownership: "Contributing software developer · implementation & hardening",
  state: { label: "Professional contribution record", detail: mapper.responsibility, boundary: "This preserves the portfolio's approved abstracted record. It does not claim sole authorship, deployment scale or independently published client outcomes." },
  problem: mapper.problem, importance: "Operational software has to preserve the relationships between places, equipment and the people using those views.",
  capabilities: ["Represent infrastructure hierarchy in navigable spatial views.", "Connect equipment context with persistence-backed operational behavior.", "Contribute role-aware behavior and security QA."],
  path: ["Hierarchy", "Space", "Equipment", "Operations"], artifact: "structure", accent: "copper", architecture: mapper.architecture,
  decisions: mapper.constraints.map((body, i) => ({ title: ["Preserve operational context", "Respect the contribution boundary", "Protect confidential material"][i] ?? "Keep the boundary explicit", body })),
  limitations: [mapper.limitation], evidence: mapper.evidenceIds, sourceBoundary: "Private professional source. Client identity, source coordinates, topology and security details remain withheld.",
};
export const gpets: SystemCase = {
  id: "04", slug: "gpets", name: "GPets", category: "Full-stack · realtime product", summary: "Keep a map, its incident records and connected users in sync.",
  built: "An archived challenge connecting browser interaction, authenticated APIs, persistence, realtime updates and offline replay.", placement: "ARCHIVED", publicability: "PUBLIC", ownership: "Builder · browser and Spring backend integration",
  state: { label: "Archived technical challenge", detail: gpetsRecord.context, boundary: "Source-level implementation evidence; no current deployment, production traffic or commercial adoption claim." },
  problem: gpetsRecord.problem, importance: "A useful application must keep working coherently across the interface, identity, backend and data — including when connectivity changes.",
  capabilities: ["Authenticate browser requests at the server boundary.", "Persist incident changes and broadcast realtime updates.", "Queue offline writes and use idempotency keys during replay."], path: ["Browser", "API", "Persistence", "Realtime"], artifact: "structure", accent: "green", architecture: gpetsRecord.architecture,
  decisions: [{ title: "Model offline behavior", body: "IndexedDB queues pending mutations. Backend idempotency keys reduce repeated effects within a bounded retention window; this is not a universal exactly-once guarantee." }], limitations: [gpetsRecord.limitation], evidence: gpetsRecord.evidenceIds,
  source: { label: "Inspect the challenge implementation", href: "https://github.com/Em3rc0d/challenge-cineplanet" },
};
