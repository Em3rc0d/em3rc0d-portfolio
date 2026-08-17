export const autopulseCase = {
  id: "01",
  name: "AutoPulse",
  label: "REAL-WORLD TELEMETRY",
  role: "Primary Builder",
  state: "ACTIVE R&D",
  thesis:
    "Real telemetry is messy. AutoPulse makes acquisition, persistence, interruption, recovery, and integrity explicit instead of pretending every session is a clean stream.",
  path: ["Acquire", "Assemble", "Persist", "Recover", "Interpret"],
  problemSignals: [
    {
      id: "P-01",
      title: "A command can return no data.",
      detail:
        "NO_DATA is different from zero, a timeout, a disconnect, or a negative response.",
    },
    {
      id: "P-02",
      title: "The app can disappear mid-session.",
      detail:
        "The process lifecycle can end while already-persisted telemetry still exists.",
    },
    {
      id: "P-03",
      title: "Persistence can be wrong without being empty.",
      detail:
        "Sequence gaps, conflicting retries, truncated payloads, and CRC mismatches need different outcomes.",
    },
  ],
  architecture: [
    {
      id: "acquisition",
      number: "01",
      label: "ACQUISITION",
      title: "RealTelemetryPoller",
      detail:
        "Serializes live OBD command polling and keeps NO_DATA behavior separate from transport failures.",
      evidence: "E-AP-07",
    },
    {
      id: "events",
      number: "02",
      label: "EVENT MODEL",
      title: "ObdAcquisitionMapper",
      detail:
        "Turns command outcomes into acquisition events that preserve status and diagnostic context.",
      evidence: "E-AP-02",
    },
    {
      id: "blocks",
      number: "03",
      label: "BOUNDED STATE",
      title: "TelemetryBlockAssembler",
      detail:
        "Collects acquisition events into bounded windows before they enter the persistence path.",
      evidence: "E-AP-01",
    },
    {
      id: "codec",
      number: "04",
      label: "BINARY FORMAT",
      title: "BinaryObd2V3Codec",
      detail:
        "Encodes readings, negative responses, raw fragments and frames into a versioned binary payload with CRC metadata.",
      evidence: "E-AP-02",
    },
    {
      id: "queue",
      number: "05",
      label: "COMMIT ORDER",
      title: "TelemetryCommitQueue",
      detail:
        "Serializes commits and retries only the explicitly transient persistence failures.",
      evidence: "E-AP-04",
    },
    {
      id: "storage",
      number: "06",
      label: "DURABLE STORAGE",
      title: "TelemetryBlockRepository",
      detail:
        "Checks session/workspace identity, block sequence, idempotency, byte length and CRC before a block is considered durable.",
      evidence: "E-AP-03",
    },
    {
      id: "recovery",
      number: "07",
      label: "RECOVERY",
      title: "LiveSessionRepository",
      detail:
        "Reconciles orphaned sessions from persisted blocks and records unexpected termination explicitly.",
      evidence: "E-AP-06",
    },
    {
      id: "summary",
      number: "08",
      label: "INTERPRETATION",
      title: "SessionSummaryBuilder",
      detail:
        "Builds signal summaries and classifies session integrity without erasing partial, corrupted, or unavailable state.",
      evidence: "E-AP-08",
    },
  ],
  decisions: [
    {
      id: "D-01",
      title: "Persist bounded blocks, not a stream of isolated readings.",
      why:
        "A session needs durable replayable units with sequence and integrity metadata, not only the latest values visible in the UI.",
      tradeoff:
        "Recovery works at block granularity, so block boundaries and sequence rules become part of the domain contract.",
      evidence: ["E-AP-01", "E-AP-03"],
    },
    {
      id: "D-02",
      title: "Treat NO_DATA as an acquisition result, not zero.",
      why:
        "A missing response says something different from a valid numeric zero and should not silently corrupt meaning.",
      tradeoff:
        "The polling layer has to preserve more outcome states and manage repeated NO_DATA explicitly.",
      evidence: ["E-AP-02", "E-AP-07"],
    },
    {
      id: "D-03",
      title: "Recover interruption as interruption.",
      why:
        "Unexpected termination should reconcile durable counters without rewriting history as a clean completion.",
      tradeoff:
        "The session lifecycle needs terminal/intermediate states and recovery events rather than a boolean running flag.",
      evidence: ["E-AP-05", "E-AP-06", "E-AP-08"],
    },
  ],
  verification: [
    {
      claim: "V3 payload preserves richer acquisition outcomes.",
      state: "TEST ARTIFACT",
      evidence: "E-AP-02",
      proof:
        "Codec fixtures cover readings, zero speed, negative responses, raw fragments, NO_DATA, cancellation, corruption and version rejection.",
    },
    {
      claim: "Persistence rejects invalid sequence/integrity state.",
      state: "TEST ARTIFACT",
      evidence: "E-AP-03",
      proof:
        "Repository tests cover idempotency, conflict, sequence gap, byte-perfect readback and CRC corruption classification.",
    },
    {
      claim: "Orphaned sessions can be reconciled as interrupted.",
      state: "TEST ARTIFACT",
      evidence: "E-AP-06",
      proof:
        "Integration test inspects reconciled counters and UNEXPECTED_APP_TERMINATION state.",
    },
    {
      claim: "Session integrity can remain incomplete or degraded.",
      state: "TEST ARTIFACT",
      evidence: "E-AP-08",
      proof:
        "Summary tests cover partial, degraded, unavailable, corrupted/unsupported, gap and regression cases.",
    },
    {
      claim: "Current code path is physically field-validated end-to-end.",
      state: "NOT CLAIMED",
      evidence: "FIELD GATE",
      proof:
        "Historical physical testing context exists, but this portfolio audit has not independently closed a current end-to-end field-validation gate for main.",
    },
  ],
  evidence: [
    ["E-AP-01", "Bounded telemetry blocks", "IMPLEMENTED"],
    ["E-AP-02", "BINARY_OBD2_V3 codec", "SOURCE + TEST ARTIFACT"],
    ["E-AP-03", "Persistence integrity + sequence", "SOURCE + TEST ARTIFACT"],
    ["E-AP-04", "Ordered commit / bounded retry", "IMPLEMENTED"],
    ["E-AP-05", "Explicit session lifecycle", "IMPLEMENTED"],
    ["E-AP-06", "Orphan recovery", "SOURCE + TEST ARTIFACT"],
    ["E-AP-07", "NO_DATA behavior", "SOURCE + TEST ARTIFACT"],
    ["E-AP-08", "Session summary / integrity", "SOURCE + TEST ARTIFACT"],
    ["E-AP-09", "Product UI surfaces", "SOURCE VERIFIED"],
  ] as const,
} as const;
