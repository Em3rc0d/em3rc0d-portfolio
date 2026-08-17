import type { EvidenceRecord } from "@/lib/content/types";

const repo = "Em3rc0d/autoPulse";
const ref = "main";

export const evidenceRecords: readonly EvidenceRecord[] = [
  {
    id: "E-AP-01",
    slug: "e-ap-01",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Bounded telemetry blocks",
    type: "ARCHITECTURE",
    claim:
      "Live acquisition is accumulated into bounded telemetry blocks before entering the durable persistence path.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "RealLiveSessionController",
        repository: repo,
        path: "mobile-app/src/application/live/RealLiveSessionController.ts",
        ref,
        reviewedBlobSha: "ec051ad379058e6fea67fd762c30fa5794ec7145",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The live controller creates a TelemetryBlockAssembler with a 5000 ms window and sends emitted encoded blocks through the ordered commit queue.",
    limitations:
      "The source proves the 5000 ms implementation choice. It does not establish that this duration is universally optimal or benchmark-proven on every device.",
    relatedDecisionIds: ["D-01"],
    relatedArchitectureIds: ["blocks"],
  },
  {
    id: "E-AP-02",
    slug: "e-ap-02",
    systemId: "01",
    systemName: "AutoPulse",
    title: "BINARY_OBD2_V3 codec",
    type: "IMPLEMENTATION",
    claim:
      "A versioned binary telemetry format preserves richer acquisition outcomes and carries CRC integrity metadata.",
    state: "TEST_ARTIFACT",
    sources: [
      {
        label: "BinaryObd2V3Codec",
        repository: repo,
        path: "mobile-app/src/infrastructure/telemetry-codecs/binary-obd2-v3/BinaryObd2V3Codec.ts",
        ref,
        reviewedBlobSha: "c5cc25ac1b1446f7abe0c0361b84741c752b44e9",
      },
      {
        label: "BinaryObd2V3Codec tests",
        repository: repo,
        path: "mobile-app/src/infrastructure/telemetry-codecs/__tests__/BinaryObd2V3Codec.test.ts",
        ref,
        reviewedBlobSha: "c24ee9b9f8344e0e63c0950aa765ff85f22bb4fb",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The codec identifies itself as BINARY_OBD2_V3 / version 3, encodes readings plus negative responses/raw fragments/frames, computes CRC32, and validates magic/version/length on decode.",
    limitations:
      "The portfolio audit verified current source and test artifacts but did not independently rerun the complete AutoPulse test suite during this evidence recovery.",
    relatedDecisionIds: ["D-02"],
    relatedArchitectureIds: ["codec", "events"],
  },
  {
    id: "E-AP-03",
    slug: "e-ap-03",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Persistence integrity and sequence contract",
    type: "IMPLEMENTATION",
    claim:
      "Telemetry persistence distinguishes valid retry, conflict, sequence gaps, regressions, truncation and CRC corruption.",
    state: "TEST_ARTIFACT",
    sources: [
      {
        label: "TelemetryBlockRepository",
        repository: repo,
        path: "mobile-app/src/infrastructure/database/product/repositories/TelemetryBlockRepository.ts",
        ref,
        reviewedBlobSha: "7323e293245209d235f4bb6bde98d8626da5bc88",
      },
      {
        label: "TelemetryBlockRepository tests",
        repository: repo,
        path: "mobile-app/src/infrastructure/database/product/repositories/__tests__/TelemetryBlockRepository.test.ts",
        ref,
        reviewedBlobSha: "05815d01841624ad6cc564c44442cc0392e8be27",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The repository validates workspace/session identity, V3 format, byte length, CRC and sequence before atomically advancing session counters with the block insert.",
    limitations:
      "This record supports repository-level persistence semantics. It does not by itself prove end-to-end physical acquisition reliability.",
    relatedDecisionIds: ["D-01"],
    relatedArchitectureIds: ["storage"],
  },
  {
    id: "E-AP-04",
    slug: "e-ap-04",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Ordered commit and bounded retry",
    type: "IMPLEMENTATION",
    claim:
      "Telemetry block commits are serialized and only explicitly transient persistence failures receive one retry.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "TelemetryCommitQueue",
        repository: repo,
        path: "mobile-app/src/application/live/TelemetryCommitQueue.ts",
        ref,
        reviewedBlobSha: "c285700922b635c021a1b8af8a2086c57e05f528",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The queue retries DATABASE_WRITE_FAILED and CONCURRENT_SESSION_UPDATE once, and stops accepting additional blocks after terminal commit failure.",
    limitations:
      "This is a deliberately narrow retry policy, not a general guarantee that every database failure can be recovered automatically.",
    relatedDecisionIds: ["D-01"],
    relatedArchitectureIds: ["queue"],
  },
  {
    id: "E-AP-05",
    slug: "e-ap-05",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Explicit live-session lifecycle",
    type: "MODEL",
    claim:
      "A live telemetry session has explicit lifecycle states rather than being inferred from whether a UI screen is open.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Live session repository",
        repository: repo,
        path: "mobile-app/src/infrastructure/database/product/repositories/live-session.repository.ts",
        ref,
        reviewedBlobSha: "0c6c887b3f8b189199fdd3f2a7bb48f14fb97c68",
      },
    ],
    publicability: "PUBLIC",
    context:
      "Current source models CREATED, PREPARING, ACTIVE, STOPPING, COMPLETED, INTERRUPTED and RECOVERABLE states and records lifecycle events.",
    limitations:
      "The evidence supports the repository lifecycle contract, not every possible operating-system lifecycle scenario on every device.",
    relatedDecisionIds: ["D-03"],
    relatedArchitectureIds: ["recovery"],
  },
  {
    id: "E-AP-06",
    slug: "e-ap-06",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Orphaned-session recovery",
    type: "RECOVERY",
    claim:
      "Persisted telemetry can be used to reconcile a non-terminal orphaned session and record unexpected application termination explicitly.",
    state: "TEST_ARTIFACT",
    sources: [
      {
        label: "Live session repository",
        repository: repo,
        path: "mobile-app/src/infrastructure/database/product/repositories/live-session.repository.ts",
        ref,
        reviewedBlobSha: "0c6c887b3f8b189199fdd3f2a7bb48f14fb97c68",
      },
      {
        label: "Orphan recovery integration test",
        repository: repo,
        path: "mobile-app/src/infrastructure/database/product/repositories/__tests__/OrphanRecovery.integration.test.ts",
        ref,
        reviewedBlobSha: "e1b64d4eb702a67e3c6c84bd22e8363ed847ba05",
      },
    ],
    publicability: "PUBLIC",
    context:
      "recoverOrphanedSessions() finds CREATED/PREPARING/ACTIVE/STOPPING sessions, reconciles persisted counters, marks the session INTERRUPTED, and records UNEXPECTED_APP_TERMINATION.",
    limitations:
      "Recovery makes the interruption explicit; it does not claim the orphaned session completed normally or that every external hardware failure is recoverable.",
    relatedDecisionIds: ["D-03"],
    relatedArchitectureIds: ["recovery", "storage"],
  },
  {
    id: "E-AP-07",
    slug: "e-ap-07",
    systemId: "01",
    systemName: "AutoPulse",
    title: "NO_DATA behavior",
    type: "IMPLEMENTATION",
    claim:
      "NO_DATA is preserved as a distinct acquisition outcome and repeated NO_DATA can change the active polling set without conflating transport failures.",
    state: "TEST_ARTIFACT",
    sources: [
      {
        label: "RealTelemetryPoller",
        repository: repo,
        path: "mobile-app/src/infrastructure/ble/real/RealTelemetryPoller.ts",
        ref,
        reviewedBlobSha: "ffad6947b9e6db1377ff63a3cecc5dc62ca3bcbd",
      },
      {
        label: "RealTelemetryPoller tests",
        repository: repo,
        path: "mobile-app/src/infrastructure/ble/real/__tests__/RealTelemetryPoller.test.ts",
        ref,
        reviewedBlobSha: "45b89fa8e9ade6ae7ec2e46398e0c67727754872",
      },
    ],
    publicability: "PUBLIC",
    context:
      "Successful acquisition resets the counter; three consecutive NO_DATA results retire the PID and emit PID_RETIRED_NO_DATA. TIMEOUT, ELM_ERROR and DISCONNECTED do not use the same retirement path.",
    limitations:
      "The retirement threshold is current implementation behavior and should not be generalized as an OBD standard requirement.",
    relatedDecisionIds: ["D-02"],
    relatedArchitectureIds: ["acquisition"],
  },
  {
    id: "E-AP-08",
    slug: "e-ap-08",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Session summary and integrity",
    type: "MODEL",
    claim:
      "Session-level interpretation preserves whether underlying telemetry is complete, partial, degraded, corrupted or unavailable.",
    state: "TEST_ARTIFACT",
    sources: [
      {
        label: "SessionSummaryBuilder",
        repository: repo,
        path: "mobile-app/src/application/live/SessionSummaryBuilder.ts",
        ref,
        reviewedBlobSha: "fe369a7a8f70330b1cea4beca1ff35dceec983f7",
      },
      {
        label: "SessionSummaryBuilder tests",
        repository: repo,
        path: "mobile-app/src/application/live/__tests__/SessionSummaryBuilder.test.ts",
        ref,
        reviewedBlobSha: "78a475d0f7136ba7c8df8463033ec74f3ef3eed7",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The builder summarizes block completeness, corruption/unsupported counts, gaps, event/reading totals and signal min/max/average/timestamps while retaining integrity classification.",
    limitations:
      "A summary is only as complete as the persisted telemetry it can read; unavailable/corrupted state remains visible rather than being synthesized away.",
    relatedDecisionIds: ["D-03"],
    relatedArchitectureIds: ["summary"],
  },
  {
    id: "E-AP-09",
    slug: "e-ap-09",
    systemId: "01",
    systemName: "AutoPulse",
    title: "Live product surfaces",
    type: "PRODUCT",
    claim:
      "Current source includes dedicated product surfaces for connection, initialization, live session, diagnostics and session summary workflows.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Live screens source directory",
        repository: repo,
        path: "mobile-app/src/screens/live",
        ref,
      },
    ],
    publicability: "PUBLIC",
    context:
      "The source tree includes ConnectObdScreen, InitializationScreen, LiveSessionScreen, SessionSummaryScreen and DiagnosticsLogScreen.",
    limitations:
      "Source existence is not a screenshot artifact. Visual product evidence must come from an actual render/device capture before being presented as such.",
    relatedDecisionIds: [],
    relatedArchitectureIds: [],
  },
] as const;

export const publicEvidenceRecords = evidenceRecords.filter(
  (record) => record.publicability !== "PRIVATE",
);

export function findEvidenceBySlug(slug: string) {
  return publicEvidenceRecords.find((record) => record.slug === slug);
}
