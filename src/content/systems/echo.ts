import type { SystemCase } from "./types";

export const echo: SystemCase = {
  id: "10",
  slug: "echo",
  name: "ECHO",
  category: "Applied AI · Acoustic intelligence",
  summary: "Turn environmental audio into classified acoustic events with provenance, timing and a reproducible path from source to delivery.",
  built: "An AI acoustic-event system with governed datasets, deterministic preprocessing, containerized replay/runtime infrastructure, temporal event semantics and MQTT delivery.",
  placement: "FLAGSHIP",
  publicability: "PUBLIC",
  ownership: "Primary builder · research system, data governance, runtime architecture and validation",
  state: {
    label: "MVP runtime active · model evidence still gated",
    detail: "MK0 is certified and the first runtime path is being exercised with Docker/Mosquitto replay and MQTT round-trip verification. Corpus/model promotion remains fail-closed until the project-specific data and benchmark gates pass.",
    boundary: "ECHO does not claim production acoustic accuracy, field-camera performance or a final model winner before the corpus, benchmark and field-evidence gates close."
  },
  problem: "A neural-network score on an audio clip is not yet a dependable event. A useful system must preserve source identity, timing, confidence, temporal confirmation and the path that produced the observation.",
  importance: "Environmental audio is noisy and ambiguous. The system needs to distinguish observable acoustic evidence from conclusions about what happened in the world.",
  capabilities: [
    "Ingest deterministic replay and prepare a path toward real audio sources without changing event semantics.",
    "Normalize audio into bounded windows and preserve source identity through inference and event processing.",
    "Separate raw inference, candidate events and confirmed events with temporal rules and deduplication.",
    "Publish confirmed events through MQTT with explicit QoS/idempotency expectations."
  ],
  path: ["Audio", "Inference", "Event", "Publish"],
  artifact: "signal",
  accent: "green",
  architecture: [
    { title: "Audio-to-event pipeline", body: "Source registry, decoding, mono PCM normalization, bounded buffers, window production and inference all preserve source_id and timing before the Event Engine applies temporal confirmation." },
    { title: "Governed data path", body: "Dataset admission requires provenance, rights, canonical fingerprints, grouping and split integrity. Model work is gated when the corpus does not meet the frozen evidence contract." },
    { title: "Runtime delivery", body: "The MVP path uses Docker and Mosquitto to exercise replay-to-MQTT delivery. QoS 1 means consumers must tolerate duplicate delivery and use event_id for idempotency." }
  ],
  decisions: [
    { title: "Detect sounds, not stories", body: "ECHO may classify a siren or glass shatter; it does not infer that a robbery, crash or emergency occurred from the sound alone." },
    { title: "Fail closed on weak data", body: "Coverage and corpus gaps block modeling rather than being patched with label coercion, split shopping or a lower quality floor." },
    { title: "Events are temporal objects", body: "Window scores become useful only after confirmation, hysteresis, deduplication, cooldown and closure semantics are applied." }
  ],
  limitations: [
    "No final production model or calibrated field-performance claim is made while corpus/model gates remain open.",
    "The current MVP/replay path does not prove real-camera distance, SNR or multi-source capacity.",
    "MQTT QoS 1 permits duplicate delivery; downstream consumers require idempotency.",
    "ECHO intentionally avoids speaker identification, voice profiling and continuous raw-audio retention by default."
  ],
  evidence: [],
  source: { label: "ECHO source and current-state records", href: "https://github.com/Em3rc0d/ECHO" }
};
