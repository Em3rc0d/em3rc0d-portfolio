import type { SystemCase } from "./types";
export const autopulse: SystemCase = {
  id: "01", slug: "autopulse", name: "AutoPulse", category: "Connected systems",
  summary: "Understand what a vehicle is telling you — and keep the story when the connection breaks.",
  built: "An Android product that captures live vehicle signals, records sessions locally and reconstructs history from durable data.",
  placement: "FLAGSHIP", publicability: "PUBLIC", ownership: "Primary builder · mobile product, data path and recovery",
  state: { label: "Field-tested foundation · active R&D", detail: "Live readings and persisted sessions have been observed on selected vehicle/adapter combinations. The product continues through bounded implementation and physical tests.", boundary: "Selected field observations do not establish universal vehicle compatibility or a certified public release." },
  problem: "A live dashboard only tells part of the story. Signals can be missing, the adapter can disconnect, and the phone can stop recording. The useful product must explain what actually happened.",
  importance: "A missing reading should never look like a real zero. An interrupted session should not look complete. People need a history they can understand and trust.",
  capabilities: ["Read available vehicle signals through a supported OBD adapter.", "Keep durable local sessions and reconstruct summaries.", "Distinguish missing, interrupted and corrupted data.", "Expose capability boundaries instead of pretending every vehicle is the same."],
  path: ["Capture", "Persist", "Recover", "Understand"], artifact: "signal", accent: "copper",
  architecture: [
    { title: "Acquisition and event model", body: "Serial command polling preserves readings, NO_DATA and transport failures as distinct outcomes. Events enter bounded telemetry windows." },
    { title: "Durable local history", body: "A versioned binary codec, CRC metadata and ordered commits support SQLite persistence. Identity, sequence and retry rules are part of the storage boundary." },
    { title: "Recovery and interpretation", body: "Session recovery reconciles persisted blocks while preserving interruption. Summary construction keeps complete, partial, degraded, corrupted and unavailable states distinct." },
  ],
  decisions: [
    { title: "Save bounded blocks", body: "Blocks make replay and integrity checks explicit. The trade-off is that block boundaries and sequence rules become part of the domain." },
    { title: "Missing is a state", body: "NO_DATA cannot become zero. The acquisition layer needs a richer result model, but downstream interpretation retains the meaning of the observation." },
    { title: "Recover without rewriting history", body: "Reconciliation repairs consistency; it does not turn unexpected termination into a successful stop." },
  ],
  limitations: ["The supported envelope grows through physical tests; no every-car/every-reader promise.", "Foreground recording and Android lifecycle constraints remain explicit.", "Automated recovery tests do not prove all physical interruption scenarios.", "Phone-origin sensors and adapter voltage are not interchangeable with ECU observations."],
  evidence: ["E-AP-02", "E-AP-03", "E-AP-06", "E-AP-07", "E-AP-08"],
  source: { label: "AutoPulse source & field-test boundaries", href: "https://github.com/Em3rc0d/autoPulse" },
};
