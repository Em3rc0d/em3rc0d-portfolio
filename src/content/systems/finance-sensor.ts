import type { SystemCase } from "./types";
export const financeSensor: SystemCase = {
  id: "07", slug: "finance-sensor", name: "FinanceSensor", category: "Financial data systems",
  summary: "Turn scattered financial evidence into a clearer picture without counting the same event twice.",
  built: "An evolving mobile sensing system with source normalization, canonical transaction resolution and explicit privacy boundaries.",
  placement: "R&D", publicability: "SANITIZED", ownership: "Primary builder · financial model, mobile integration and validation",
  state: { label: "Alpha implementation · validation ongoing", detail: "The inspected Alpha.2 source includes a Dart canonical runtime and a native/mobile responsibility contract. Older root documentation does not describe the full implementation lineage.", boundary: "Runtime code exists; this case does not claim full physical product validation, global build readiness or a public release." },
  problem: "An email and a bank statement may describe the same financial event. Treating every source record as a new transaction produces an unreliable financial picture.",
  importance: "Every explanation depends on the underlying events being correct. Duplicate, conflicting and incomplete evidence must stay visible before the product derives a financial state.",
  capabilities: ["Normalize evidence while retaining source identity.", "Reconcile compatible observations into canonical transactions.", "Keep proposed, conflicting and review-required matches explicit.", "Separate sensitive financial processing from minimized public projections."],
  path: ["Observe", "Normalize", "Reconcile", "Explain"], artifact: "ledger", accent: "blue",
  architecture: [{ title: "Evidence before transactions", body: "The Dart runtime normalizes and orders evidence, rejects duplicate identities and preserves unresolved matches instead of materializing false certainty." }, { title: "Explicit mobile responsibilities", body: "The inspected contract assigns native credential/storage boundaries to Kotlin and financial semantics to Dart. Node serves as a reference oracle, not the shipped product runtime." }],
  decisions: [{ title: "One event can have several observations", body: "A source record is evidence, not automatically a new financial transaction. Reconciliation adds complexity but prevents duplicate truth." }, { title: "Keep sensitive input out of public proof", body: "Public records must be minimized. Real financial documents, passwords and OAuth credentials do not belong in repository or CI evidence." }],
  limitations: ["Parser coverage and physical mobile validation remain bounded by their specific receipts.", "No financial records, balances, identifiers or private documents are reproduced here.", "Privacy architecture is not presented as an independent security certification."],
  evidence: ["E-FS-01"], source: { label: "Inspected Alpha.2 source", href: "https://github.com/Em3rc0d/FinanceSensor/tree/3640244fb12aabf818b002399f3b7cc28fbde14c" },
};
