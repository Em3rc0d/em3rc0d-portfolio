import type { SystemCase } from "./types";

export const echo: SystemCase = {
  id: "10",
  slug: "echo",
  name: "ECHO",
  category: "Applied AI · Acoustic intelligence",
  summary: "Turn environmental audio into classified acoustic events with provenance, timing and a reproducible path from source to delivery.",
  built: "A governed acoustic-event engineering system with certified research/data tooling, deterministic corpus controls, versioned event contracts and a frozen MK1 architecture for later inference, Event Engine and MQTT execution.",
  placement: "FLAGSHIP",
  publicability: "PUBLIC",
  ownership: "Primary builder · research system, data governance, runtime architecture and validation",
  state: {
    label: "MK0 certified · MK1 corpus closure active",
    detail: "MK1 specification, design and architecture are closed for build, and the Data Foundry/toolchain has scoped certificates. The current corpus readiness is fail-closed: coverage still has 16 empirical gaps, CERT-MK1-DF-CORPUS-001 remains open and modeling_allowed=false. Benchmark A/B/C, replay progression and real-camera progression remain locked until that gate closes.",
    boundary: "ECHO does not claim an active MVP runtime, production acoustic accuracy, field-camera performance, calibrated thresholds or a final model winner while the corpus certificate and downstream empirical gates remain open."
  },
  problem: "A neural-network score on an audio clip is not yet a dependable event. A useful system must preserve source identity, timing, confidence, temporal confirmation and the path that produced the observation.",
  importance: "Environmental audio is noisy and ambiguous. The system needs to distinguish observable acoustic evidence from conclusions about what happened in the world.",
  capabilities: [
    "Govern release-safe acoustic data with provenance, rights, fingerprints, grouping, deduplication and deterministic split controls.",
    "Preserve source identity and timing through the frozen audio/window/inference/event contracts.",
    "Keep raw inference, candidate-event and confirmed-event semantics separate before downstream delivery.",
    "Gate model benchmarking, replay and real-camera progression on corpus certification instead of bypassing weak data."
  ],
  path: ["Audio", "Inference", "Event", "Publish"],
  artifact: "signal",
  accent: "green",
  architecture: [
    { title: "Audio-to-event pipeline", body: "Source registry, decoding, mono PCM normalization, bounded buffers, window production and inference all preserve source_id and timing before the Event Engine applies temporal confirmation." },
    { title: "Governed data path", body: "Dataset admission requires provenance, rights, canonical fingerprints, grouping and split integrity. Model work is gated when the corpus does not meet the frozen evidence contract." },
    { title: "Frozen delivery contract", body: "MK1 defines Event Engine and MQTT delivery semantics, including QoS 1 duplicate tolerance and event_id idempotency. Executed replay progression remains gated until the corpus certificate authorizes modeling." }
  ],
  decisions: [
    { title: "Detect sounds, not stories", body: "ECHO may classify a siren or glass shatter; it does not infer that a robbery, crash or emergency occurred from the sound alone." },
    { title: "Fail closed on weak data", body: "Coverage and corpus gaps block modeling rather than being patched with label coercion, split shopping or a lower quality floor." },
    { title: "Events are temporal objects", body: "Window scores become useful only after confirmation, hysteresis, deduplication, cooldown and closure semantics are applied." }
  ],
  limitations: [
    "No final production model or calibrated field-performance claim is made while corpus/model gates remain open.",
    "Replay, model benchmarking and real-camera progression remain locked while corpus readiness is fail-closed.",
    "MQTT QoS 1 permits duplicate delivery; downstream consumers require idempotency.",
    "ECHO intentionally avoids speaker identification, voice profiling and continuous raw-audio retention by default."
  ],
  evidence: [],
  source: { label: "ECHO source and current-state records", href: "https://github.com/Em3rc0d/ECHO" }
};
