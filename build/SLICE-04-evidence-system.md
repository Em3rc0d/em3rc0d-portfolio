# BUILD — SLICE 04 · Evidence System

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Evidence Visual Proof:** run `31960461622` — success  
**Evidence artifact:** `evidence-section-visual-proof`  
**Artifact digest:** `sha256:004ba48ba42e74025f113665184e99d8670e08035424e619ba73548405cd517b`  
**Final integration CI:** run `31962452856` — success  
**Final AutoPulse Visual Proof after evidence-link integration:** run `31962452921` — success

---

# 1. Responsibility

SLICE 04 had one architectural responsibility:

> Turn evidence identifiers from visual labels into first-class, typed, routable and inspectable portfolio objects.

Before this slice, AutoPulse already displayed identifiers such as:

```text
E-AP-03
E-AP-06
E-AP-08
```

but the evidence layer was still mostly narrative.

After this slice, each public AutoPulse evidence record carries:

```text
identity
system
claim
artifact type
verification state
publicability
source provenance
reviewed source path
reviewed blob SHA when available
context
limitations / claim ceiling
related decisions
related architecture components
```

---

# 2. Evidence domain contract

`src/lib/content/types.ts` now defines:

```text
EvidenceState
EvidenceType
EvidenceSource
EvidenceRecord
```

Supported evidence confidence states currently include:

```text
IMPLEMENTED
SOURCE_VERIFIED
TEST_ARTIFACT
FIELD_VALIDATED
IN_TEST
NOT_CLAIMED
```

This is intentionally more expressive than a boolean `verified` flag.

---

# 3. AutoPulse evidence canon

`src/content/evidence.ts` contains the first public evidence corpus:

```text
E-AP-01  Bounded telemetry blocks
E-AP-02  BINARY_OBD2_V3 codec
E-AP-03  Persistence integrity and sequence contract
E-AP-04  Ordered commit and bounded retry
E-AP-05  Explicit live-session lifecycle
E-AP-06  Orphaned-session recovery
E-AP-07  NO_DATA behavior
E-AP-08  Session summary and integrity
E-AP-09  Live product surfaces
```

The records were derived from the already-frozen AutoPulse Evidence Dossier rather than rewritten as marketing copy.

---

# 4. Evidence Library

Route:

`/evidence`

Implementation:

`src/components/evidence/evidence-library.tsx`

The Library provides:

- public evidence listing;
- evidence type filtering;
- visible record count;
- system identity;
- state/publicability display;
- claim summary;
- direct inspection route.

Current filters:

```text
ALL
ARCHITECTURE
IMPLEMENTATION
RECOVERY
MODEL
PRODUCT
TEST
```

The Library uses Paper material because this surface represents inspected knowledge, not Build Room environment.

---

# 5. Evidence inspection dossier

Route contract:

`/evidence/[slug]`

Example:

`/evidence/e-ap-06`

The dossier presents:

```text
ID
TYPE
STATE
SYSTEM
PUBLICABILITY
CLAIM SUPPORTED
CONTEXT
LIMITATIONS / CLAIM CEILING
SOURCE PROVENANCE
REPOSITORY
SOURCE PATH
REVIEWED BLOB SHA
RELATED DECISIONS
ARCHITECTURE REFERENCES
```

Source paths link to the exact repository/ref location.

The inspected source SHA is displayed when the evidence recovery captured it.

---

# 6. Claim-ceiling principle made visible

An evidence page does not only explain what an artifact proves.

It must also explain:

> **what it does not prove.**

This is why `limitations` is a required EvidenceRecord field rather than optional supporting prose.

Example:

`E-AP-06` supports orphan reconciliation and explicit unexpected termination state.

It does not imply:

- that the interrupted session completed normally;
- that every hardware failure is recoverable;
- that current `main` is fully end-to-end physical-field validated.

---

# 7. AutoPulse integration

Evidence is no longer isolated from the case.

AutoPulse now routes into dossiers from:

- Engineering Decision evidence references;
- Architecture Inspector evidence identifier;
- Architecture Inspector `Inspect evidence` action;
- Build specimen `E-AP-03`;
- Recovery claim `E-AP-06`;
- Verification matrix evidence IDs;
- the complete Evidence Ledger.

Therefore the relationship is now:

```text
CASE CLAIM
    ↓
DECISION / COMPONENT / VERIFICATION
    ↓
EVIDENCE ID
    ↓
EVIDENCE DOSSIER
    ↓
SOURCE PROVENANCE + LIMITATIONS
```

rather than:

```text
CASE CLAIM → decorative badge
```

---

# 8. Browser proof

Dedicated workflow:

`.github/workflows/evidence-visual-proof.yml`

Run:

`31960461622`

Artifact:

`evidence-section-visual-proof`

Artifact ID:

`9267099308`

Digest:

`sha256:004ba48ba42e74025f113665184e99d8670e08035424e619ba73548405cd517b`

Captured views:

```text
evidence-intro-desktop.png
evidence-records-desktop.png
evidence-dossier-desktop.png
evidence-records-mobile.png
evidence-dossier-mobile.png
```

---

# 9. Jett visual audit

## Evidence intro — PASS

The Library reads as a technical archive rather than a portfolio gallery.

The statement:

> Evidence, with its limits attached.

correctly communicates the epistemic contract of the system.

## Record list desktop — PASS

The records remain scan-friendly despite containing technical state and provenance language.

The grid/reference-paper language is coherent with AutoPulse's Paper sections without simply copying the case layout.

## Evidence dossier desktop — PASS

`E-AP-06` creates a strong inspection-object identity. The large identifier is useful because the evidence record itself is now the object being inspected.

The supported claim has clear priority over metadata.

## Record list mobile — PASS

The list changes hierarchy rather than attempting to preserve desktop columns.

## Evidence dossier mobile — PASS

Claim typography remains readable and the metadata collapses into a clean single-column dossier.

---

# 10. Final integration verification

After the Evidence Library passed its dedicated proof, the AutoPulse case was updated so every relevant `E-AP-*` reference routes to the dossier system.

Final integration commit passed:

```text
Portfolio CI               31962452856  ✅
AutoPulse Visual Proof     31962452921  ✅
```

This verifies that the new evidence links did not regress the flagship case composition.

---

# 11. SLICE 04 gate

```text
Typed evidence domain             ✅
Public evidence canon             ✅
Evidence Library                  ✅
Evidence filtering                ✅
Evidence dossier route            ✅
Source provenance                 ✅
Claim limitations                 ✅
Decision relations                ✅
Architecture relations            ✅
AutoPulse direct evidence links   ✅
Desktop browser proof             ✅
Mobile browser proof              ✅
CI                                ✅
```

# SLICE 04 — ✅ CLOSED

---

# 12. Next

Proceed to:

# `SLICE 05 — CV Engine`

The first task is **not visual implementation**.

AutoPulse established the permanent flagship workflow:

```text
RECOVER CURRENT SOURCE
        ↓
FREEZE CLAIM CEILING
        ↓
BUILD EVIDENCE DOSSIER
        ↓
DEFINE CASE STORY
        ↓
IMPLEMENT VISUAL CASE
        ↓
CI + BROWSER PROOF
```

CV Engine must follow the same sequence.
