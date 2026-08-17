# AutoPulse — Evidence Dossier v1

**Portfolio role:** FLAGSHIP  
**Source repository:** `Em3rc0d/autoPulse`  
**Source branch reviewed:** `main`  
**Purpose:** define the maximum public claim strength allowed for the first AutoPulse case before visual implementation.

---

# 1. Claim ceiling

The portfolio may currently present AutoPulse as a real implemented software system with concrete telemetry acquisition, persistence, recovery, codec, and summary logic.

The portfolio must distinguish:

```text
IMPLEMENTED
SOURCE-VERIFIED
TEST-ARTIFACT PRESENT
FIELD-VALIDATED
IN TEST
HISTORICAL / SUPERSEDED
```

A test source file proves that a verification artifact exists. It does **not**, by itself, prove that the complete current repository test suite was independently rerun during this portfolio audit.

No public AutoPulse claim should be stronger than the source and verification evidence below.

---

# 2. System responsibility supported by current source

A defensible public story is:

> AutoPulse treats vehicle telemetry as a stateful acquisition and persistence problem: commands can succeed, return no data, be interrupted, arrive as raw fragments, and leave sessions incomplete. The system therefore records acquisition events, assembles bounded telemetry blocks, validates persisted payloads, models session state explicitly, and can reconcile unfinished sessions after unexpected termination.

This framing is supported by current implementation files rather than only historical README language.

---

# 3. Current implementation architecture recovered

## Acquisition / BLE

Current infrastructure includes:

- `RealObdController`
- `RealObdInitialization`
- `RealTelemetryPoller`
- ELM accumulator/classifier/normalizer pipeline
- OBD frame parsing and decoding
- adapter compatibility probes/profiles

Current source path family:

`mobile-app/src/infrastructure/ble/real/`

## Live-session orchestration

Current application layer includes:

- `RealLiveSessionController`
- `TelemetryCommitQueue`
- `SessionSummaryBuilder`
- live-session use cases / registry

Current source path family:

`mobile-app/src/application/live/`

## Telemetry persistence

Current product database includes:

- `TelemetryBlockRepository`
- `live-session.repository`
- V3 telemetry block migration metadata
- live/session schemas

Current source path family:

`mobile-app/src/infrastructure/database/product/`

## Codec

Current infrastructure includes:

- `BinaryObd2V3Codec`
- `BinaryObd2V3BlockMapper`
- codec contract
- V2/V3 compatibility tests

Current source path family:

`mobile-app/src/infrastructure/telemetry-codecs/`

---

# 4. E-AP-01 — Bounded telemetry blocks

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED  
**Publicability:** PUBLIC

`RealLiveSessionController` creates:

```text
TelemetryBlockAssembler(sessionId, recordingStartedAt, 5000)
```

and converts acquisition results into events that are appended to the assembler. Emitted blocks are encoded and sent through `TelemetryCommitQueue`.

A defensible public statement is:

> Live acquisition is accumulated into bounded telemetry blocks instead of relying on one independent database write per reading.

Do not claim that 5 seconds is a universally benchmark-proven optimal window. Current source uses a 5000 ms window; historical architecture documents contain benchmark plans, not necessarily final device benchmark proof.

Source:

`mobile-app/src/application/live/RealLiveSessionController.ts`

Reviewed source SHA:

`ec051ad379058e6fea67fd762c30fa5794ec7145`

---

# 5. E-AP-02 — BINARY_OBD2_V3 codec

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

Current `BinaryObd2V3Codec` declares:

```text
codecId                      BINARY_OBD2_V3
formatId                     BINARY_OBD2_V3
formatVersion                3
codecImplementationVersion   3.0.0
decoderVersion               3.0.0
```

The codec:

- maps telemetry blocks into a binary representation;
- preserves readings, negative responses, raw fragments and frames through flags;
- computes CRC32 for the encoded payload;
- rejects encoded blocks larger than 262,144 bytes;
- validates magic/version/length during decode;
- can validate CRC when checksum context is available.

Public statement ceiling:

> AutoPulse uses a versioned binary telemetry block codec that preserves richer acquisition outcomes—not only successful numeric readings—and carries integrity metadata for persistence.

Source:

`mobile-app/src/infrastructure/telemetry-codecs/binary-obd2-v3/BinaryObd2V3Codec.ts`

Reviewed source SHA:

`c5cc25ac1b1446f7abe0c0361b84741c752b44e9`

### Test artifact

`BinaryObd2V3Codec.test.ts` contains fixtures covering:

- numeric readings including zero speed;
- negative responses;
- raw fragment preservation;
- `NO_DATA`;
- cancelled acquisition;
- CRC corruption;
- truncated payload rejection;
- V2/V3 format rejection.

Test source SHA:

`c24ee9b9f8344e0e63c0950aa765ff85f22bb4fb`

Do not publish a numeric “all tests passing” count until independently rerun against the current repo state.

---

# 6. E-AP-03 — Persistence integrity and sequence contract

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`TelemetryBlockRepository.commitBlock()` currently enforces:

- session identity alignment;
- V3 format requirement;
- BLOB storage metadata;
- payload byte-length consistency;
- CRC32 equality before commit;
- workspace ownership;
- recordable session states;
- byte-identical idempotent re-commit;
- conflict detection for same sequence with different payload;
- rejection of sequence gaps;
- rejection of regressive sequence;
- atomic session counter advancement plus block insert.

Read path can classify stored data as:

```text
VALID
TRUNCATED
CORRUPTED
UNSUPPORTED_FORMAT
NOT_FOUND
```

Public statement ceiling:

> Telemetry persistence is not a blind insert path. Blocks are checked for identity, sequence, payload length and CRC integrity, with explicit handling for idempotency, gaps, regressions and corruption.

Source:

`mobile-app/src/infrastructure/database/product/repositories/TelemetryBlockRepository.ts`

Reviewed source SHA:

`7323e293245209d235f4bb6bde98d8626da5bc88`

### Test artifact

`TelemetryBlockRepository.test.ts` includes repository-level tests for:

- first block commit + counters;
- workspace mismatch;
- identical duplicate idempotency;
- sequence conflict;
- sequence gap;
- byte-perfect payload readback;
- CRC corruption classification.

Test source SHA:

`05815d01841624ad6cc564c44442cc0392e8be27`

---

# 7. E-AP-04 — Ordered commit queue and bounded retry

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED  
**Publicability:** PUBLIC

`TelemetryCommitQueue` serializes commits, retries exactly once for the explicit transient reasons:

```text
DATABASE_WRITE_FAILED
CONCURRENT_SESSION_UPDATE
```

and stops accepting additional blocks after a terminal commit failure.

Public statement ceiling:

> AutoPulse serializes telemetry block commits and uses a deliberately narrow retry policy rather than retrying every persistence failure blindly.

Source:

`mobile-app/src/application/live/TelemetryCommitQueue.ts`

Reviewed source SHA:

`c285700922b635c021a1b8af8a2086c57e05f528`

---

# 8. E-AP-05 — Explicit live-session lifecycle

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED  
**Publicability:** PUBLIC

`live-session.repository.ts` models explicit session transitions and events including:

```text
CREATED
PREPARING
ACTIVE
STOPPING
COMPLETED
INTERRUPTED
RECOVERABLE
```

The repository also appends lifecycle events and requires capability/protocol context before activation.

Public statement ceiling:

> A live session has an explicit lifecycle rather than being inferred from whether a screen happens to be open.

Source:

`mobile-app/src/infrastructure/database/product/repositories/live-session.repository.ts`

Reviewed source SHA:

`0c6c887b3f8b189199fdd3f2a7bb48f14fb97c68`

---

# 9. E-AP-06 — Orphaned-session reconciliation

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`recoverOrphanedSessions(workspaceId)` finds sessions left in non-terminal lifecycle states:

```text
CREATED
PREPARING
ACTIVE
STOPPING
```

It then reconciles block/event/reading counters from persisted telemetry blocks and marks the session:

```text
status      INTERRUPTED
stopReason  UNEXPECTED_APP_TERMINATION
```

It also records a `SESSION_RECOVERED_AS_INTERRUPTED` event.

This is an important nuance:

> Recovery does not pretend an unexpectedly terminated session completed normally. It reconstructs durable state and makes the interruption explicit.

### Test artifact

`OrphanRecovery.integration.test.ts` checks reconciliation of persisted counters and `INTERRUPTED / UNEXPECTED_APP_TERMINATION` state.

Test source SHA:

`e1b64d4eb702a67e3c6c84bd22e8363ed847ba05`

---

# 10. E-AP-07 — NO_DATA is a first-class acquisition outcome

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`RealTelemetryPoller` differentiates success from `NO_DATA` and does not apply the same retirement behavior to every failure.

Current behavior:

- successful decoded/raw result resets the NO_DATA counter;
- a PID is retired after 3 consecutive `NO_DATA` results;
- a `PID_RETIRED_NO_DATA` diagnostic event is emitted;
- TIMEOUT / ELM_ERROR / DISCONNECTED do not trigger that retirement path.

Public statement ceiling:

> Missing data is modeled as a domain outcome rather than silently becoming zero or a generic error, and repeated NO_DATA can change the active polling set without treating every transport failure as unsupported capability.

Source:

`mobile-app/src/infrastructure/ble/real/RealTelemetryPoller.ts`

Reviewed source SHA:

`ffad6947b9e6db1377ff63a3cecc5dc62ca3bcbd`

### Test artifact

`RealTelemetryPoller.test.ts` covers:

- retirement after three consecutive `NO_DATA` results;
- reset of the counter after successful acquisition.

Test source SHA:

`45b89fa8e9ade6ae7ec2e46398e0c67727754872`

---

# 11. E-AP-08 — Session summary and integrity classification

**Claim state:** IMPLEMENTED / SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`SessionSummaryBuilder` reads persisted blocks and computes session-level integrity plus signal summaries.

Current summary concerns include:

- expected / found / complete / partial blocks;
- corrupted and unsupported blocks;
- sequence/window gaps;
- total events/readings;
- per-signal valid count;
- min / max / average;
- first / last valid timestamps;
- acquisition mode;
- interruption/termination information.

Current integrity states include logic for:

```text
COMPLETE
DEGRADED
PARTIAL
CORRUPTED
UNAVAILABLE
```

Public statement ceiling:

> AutoPulse can build a session summary from persisted telemetry while preserving whether the underlying session is complete, partial, degraded, corrupted or unavailable.

Source:

`mobile-app/src/application/live/SessionSummaryBuilder.ts`

Reviewed source SHA:

`fe369a7a8f70330b1cea4beca1ff35dceec983f7`

### Test artifact

`SessionSummaryBuilder.test.ts` covers examples including:

- empty/unavailable session;
- min/max/average aggregation;
- zero-speed preservation;
- degraded integrity from corruption/gaps;
- partial integrity for interrupted sessions;
- abort behavior;
- sequence gaps/regressions;
- unsupported vs corrupted block distinction.

Test source SHA:

`78a475d0f7136ba7c8df8463033ec74f3ef3eed7`

---

# 12. E-AP-09 — Product UI surfaces exist

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC source; visual artifact review still required

Current source tree includes dedicated Live surfaces such as:

```text
ConnectObdScreen
InitializationScreen
LiveSessionScreen
SessionSummaryScreen
DiagnosticsLogScreen
```

This supports saying AutoPulse is not only persistence/domain code; product UI exists around connection, initialization, live session, diagnostics and summary workflows.

Do not manufacture screenshots from those files and present them as real captured device evidence. If screenshots are shown, they must come from an actual render/capture artifact.

---

# 13. Field-validation ceiling

Historical project context includes Renault Logan / physical OBD testing.

However, this dossier did **not** independently recover and execute a current physical field-validation artifact that proves every public runtime claim end-to-end against the current `main` source state.

Therefore public status is:

```text
CODE / SOURCE IMPLEMENTATION       YES
TEST ARTIFACTS PRESENT             YES
PORTFOLIO AUDIT RERUN OF TESTS     NOT YET
CURRENT PHYSICAL FIELD GATE        NOT CLAIMED HERE
```

The case may say the project is built around real vehicle telemetry and that physical testing is part of the work only when accompanied by a specific safe artifact.

It must not present synthetic replay as physical validation.

---

# 14. Historical architecture vs current implementation

Documents such as `ARCHITECTURE.md`, root `README.md`, and APC implementation plans are useful provenance but may contain:

- future architecture;
- benchmark plans;
- old backend assumptions;
- commercial direction;
- names/statuses superseded by current mobile implementation.

For the portfolio case:

```text
CURRENT SOURCE > TEST ARTIFACT > CURRENT MIGRATION/SCHEMA > HISTORICAL PLAN/README
```

when determining factual implementation claims.

---

# 15. Public case story approved from this dossier

AutoPulse should not be introduced as:

> “An app that displays RPM and speed.”

The stronger evidence-backed story is:

> **Real telemetry is messy. A mobile process can disappear, a PID can return NO_DATA, payloads can corrupt, and a session can stop without a clean ending. AutoPulse is the system I built to make those states explicit—from acquisition, to bounded persistence, to recovery, integrity and session-level interpretation.**

This is the story SLICE 03 is authorized to visualize.

---

# 16. Evidence identifiers authorized for portfolio UI

```text
E-AP-01  Bounded telemetry blocks
E-AP-02  BINARY_OBD2_V3 codec
E-AP-03  Persistence integrity + sequence contract
E-AP-04  Ordered commit queue / bounded retry
E-AP-05  Explicit session lifecycle
E-AP-06  Orphan recovery
E-AP-07  NO_DATA behavior
E-AP-08  Session summary / integrity
E-AP-09  Product UI source surfaces
```

No `FIELD-VALIDATED` badge is authorized by this dossier alone.
