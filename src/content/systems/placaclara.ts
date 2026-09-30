import type { SystemCase } from "./types";

export const placaclara: SystemCase = {
  id: "09",
  slug: "placaclara",
  name: "PlacaClara",
  category: "Vehicle intelligence · Web product",
  summary: "Check a used car before paying — with one report that shows the available facts, their source and what is still unknown.",
  built: "A production web product for Peru that consolidates vehicle evidence, sells reports, delivers private/shareable views and PDF/email output, and keeps payment and provider failures explicit.",
  placement: "FLAGSHIP",
  publicability: "PUBLIC",
  ownership: "Primary builder · product, payments, data integrations, reporting and growth",
  state: {
    label: "Live product · placaclara.com",
    detail: "The public product includes vehicle lookup, provider adapters, report generation, Mercado Pago integration, private/shareable report surfaces, PDF/email delivery, SEO and first-party acquisition analytics.",
    boundary: "Coverage depends on the underlying providers and public/authorized sources. PlacaClara is not a mechanical inspection, legal certification or guarantee that every source will be available for every vehicle."
  },
  problem: "Buying a used car often means checking several disconnected sources, interpreting incomplete records and noticing important gaps only after money has changed hands.",
  importance: "The useful product is not a bigger pile of data. It is a clear pre-purchase view of what was found, where it came from, when it was observed and what still needs manual verification.",
  capabilities: [
    "Consolidate supported vehicle identity, registry and circulation evidence into one report.",
    "Keep source, date, coverage and unavailable sections visible instead of inventing completeness.",
    "Separate payment approval from report-generation state so failures after checkout remain recoverable.",
    "Deliver the same canonical report through web, private/shareable views, PDF and email."
  ],
  path: ["Plate", "Evidence", "Report", "Decision"],
  artifact: "evidence",
  accent: "blue",
  architecture: [
    { title: "Provider boundary", body: "Server-side adapters isolate external vehicle-data providers and preserve source-specific availability. Provider calls and costs are tracked instead of being hidden behind one opaque response." },
    { title: "Canonical report model", body: "A shared report structure feeds web and PDF output so the customer does not receive different truths depending on delivery channel." },
    { title: "Payments and delivery", body: "Checkout, payment verification, order state, report generation and redelivery are separate steps. Idempotency and provider re-checks keep the browser from becoming payment authority." }
  ],
  decisions: [
    { title: "Show gaps, not fake certainty", body: "Unavailable CITV, fines or registry evidence stays visibly unavailable. The product does not fill missing source data with inference." },
    { title: "Separate paid from generated", body: "A successful charge does not imply the report was generated. Keeping those states distinct makes retries and support safer." },
    { title: "Private and shareable are different products", body: "Private views may contain masked order-linked information; shareable views use a sanitized DTO and exclude owner/order identity." }
  ],
  limitations: [
    "Provider availability and coverage vary by vehicle and source.",
    "The report does not replace a mechanical inspection or legal/registry certification.",
    "Yape and other payment methods remain subject to their own provider and release gates.",
    "A successful report confirms the evidence returned at that time, not future vehicle condition."
  ],
  media: [
    {
      kind: "image",
      src: "https://raw.githubusercontent.com/Em3rc0d/plate/main/public/placaclara-hero-master.webp",
      href: "https://www.placaclara.com",
      alt: "PlacaClara used-car report product visual with vehicle, Peruvian plate and report document",
      width: 1600,
      height: 900,
      label: "product"
    }
  ],
  evidence: [],
  source: { label: "PlacaClara source", href: "https://github.com/Em3rc0d/plate" }
};
