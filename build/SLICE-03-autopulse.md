# BUILD — SLICE 03 · AutoPulse

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Core CI:** GitHub Actions `Portfolio CI` run `31959994942` — success  
**Visual proof:** GitHub Actions `AutoPulse Visual Proof` run `31959994949` — success  
**Visual artifact:** `autopulse-section-visual-proof`  
**Artifact digest:** `sha256:e956c8855b5026b2f96f45d77374482f7b2cd232455bd601f07d604d47693037`

---

# 1. Slice responsibility

SLICE 03 had to prove that THE BUILD ROOM could move from an impressive entry experience into a **deep engineering case** without collapsing into:

- a screenshot gallery;
- an automotive dashboard;
- a long marketing landing page;
- architecture-shaped decoration;
- unsupported claims.

The required case dimensions were:

```text
Problem
System Model
Engineering Decisions
Architecture
Build
Failure / Recovery
Verification
Evidence
```

---

# 2. Evidence recovery before UI

AutoPulse content was not written from the historical README or from portfolio memory.

Current source was recovered from:

`Em3rc0d/autoPulse` → `main`

and frozen first in:

`evidence/systems/autopulse-evidence-dossier-v1.md`

The dossier established the case's public claim ceiling.

Core rule:

```text
CURRENT SOURCE
    >
CURRENT TEST ARTIFACT
    >
CURRENT SCHEMA / MIGRATION
    >
HISTORICAL PLAN / README
```

when deciding what may be described as implemented.

---

# 3. Claim-state discipline

The AutoPulse case distinguishes:

```text
IMPLEMENTED
SOURCE-VERIFIED
TEST-ARTIFACT PRESENT
FIELD-VALIDATED
IN TEST
HISTORICAL / SUPERSEDED
```

A source test file proves the test artifact exists. It does not automatically prove that the portfolio audit reran the whole current AutoPulse test suite.

No general `FIELD-VALIDATED` badge is used in this slice.

---

# 4. Approved public story

AutoPulse is deliberately **not** introduced as:

> “An app that displays RPM and speed.”

The implemented case uses the stronger evidence-backed framing:

> **Real telemetry is messy. AutoPulse makes acquisition, persistence, interruption, recovery, and integrity explicit instead of pretending every session is a clean stream.**

The case therefore follows:

```text
Acquire
  ↓
Assemble
  ↓
Persist
  ↓
Recover
  ↓
Interpret
```

---

# 5. Evidence identifiers mapped

```text
E-AP-01  Bounded telemetry blocks
E-AP-02  BINARY_OBD2_V3 codec
E-AP-03  Persistence integrity + sequence
E-AP-04  Ordered commit / bounded retry
E-AP-05  Explicit session lifecycle
E-AP-06  Orphan recovery
E-AP-07  NO_DATA behavior
E-AP-08  Session summary / integrity
E-AP-09  Product UI surfaces
```

These IDs are now present in case content and form the basis for SLICE 04's first real EvidenceRecord set.

---

# 6. Implemented case files

Content:

`src/content/autopulse.ts`

Case composition:

`src/components/systems/autopulse/autopulse-case.tsx`

Visual system:

`src/app/autopulse.css`

Browser-audit corrections:

`src/app/autopulse-fixes.css`

Dynamic route integration:

`src/app/systems/[slug]/page.tsx`

---

# 7. Cover

The AutoPulse cover establishes stronger domain-earned mechanical character without using a literal vehicle image or fake gauge.

Implemented elements:

- oversized `AutoPulse` identity;
- `SYSTEM / 01` metadata;
- real role/state/evidence count;
- geometric calibration/orbit object;
- system path `Acquire → Assemble → Persist → Recover → Interpret`;
- case chapter rail;
- Redline used for signal/selection;
- low-intensity grid and registration language.

### Browser audit

Desktop: **PASS**

Mobile initially failed because the AutoPulse wordmark created a min-content width larger than the viewport. This was corrected before gate closure.

Mobile final: **PASS**

---

# 8. Problem chapter

The Problem chapter establishes three system-level realities:

```text
P-01  A command can return no data.
P-02  The app can disappear mid-session.
P-03  Persistence can be wrong without being empty.
```

This avoids starting the case with frameworks or screenshots.

Browser audit: **PASS**

---

# 9. System Model

The conceptual model is rendered on Paper material:

```text
VEHICLE
  ↓
COMMAND RESULT
  ↓
ACQUISITION EVENT
  ↓
TELEMETRY BLOCK
  ↓
LIVE SESSION
  ↓
SUMMARY
```

The Paper transition communicates a move from environment/problem into explicit modeling.

---

# 10. Engineering Decisions

Implemented decision records:

### D-01

**Persist bounded blocks, not a stream of isolated readings.**

Evidence:

`E-AP-01 · E-AP-03`

### D-02

**Treat NO_DATA as an acquisition result, not zero.**

Evidence:

`E-AP-02 · E-AP-07`

### D-03

**Recover interruption as interruption.**

Evidence:

`E-AP-05 · E-AP-06 · E-AP-08`

The purpose is to demonstrate judgment and tradeoffs rather than only code existence.

---

# 11. Architecture Inspector

The architecture workbench uses current source names:

```text
01 RealTelemetryPoller
02 ObdAcquisitionMapper
03 TelemetryBlockAssembler
04 BinaryObd2V3Codec
05 TelemetryCommitQueue
06 TelemetryBlockRepository
07 LiveSessionRepository
08 SessionSummaryBuilder
```

Each component is an actual button with `aria-pressed` state.

Selecting a component updates the Paper inspector with:

- component number;
- evidence reference;
- architecture role;
- real implementation name;
- responsibility;
- evidence route.

Browser audit desktop/mobile: **PASS after correction**.

---

# 12. Build specimen

The Build chapter uses a simplified source-contract specimen based on real repository behavior rather than decorative fake code.

It demonstrates:

```text
CRC rejection
sequence gap rejection
regressive sequence rejection
idempotent identical retry
same sequence / different payload conflict
```

The specimen explicitly says what it proves: persistence has a contract.

---

# 13. Failure / Recovery

The strongest case transition is:

```text
ACTIVE SESSION
      ↓
PROCESS ENDS ×
      ↓
PERSISTED BLOCKS STILL EXIST
      ↓
FIND ORPHAN
      ↓
RECONCILE COUNTERS
      ↓
MARK INTERRUPTED
```

Public claim:

> `recoverOrphanedSessions()` reconciles durable counters and records `UNEXPECTED_APP_TERMINATION` instead of fabricating a clean completion.

Evidence:

`E-AP-06`

This is a deliberate trust moment: failure is shown as part of the system model rather than hidden.

---

# 14. Verification chapter

Verification moves back to Paper material and explicitly states:

> **Built is not the same as field-proven.**

The matrix differentiates test artifacts from an unclaimed field gate.

Examples:

```text
V3 richer acquisition outcomes          TEST ARTIFACT
Persistence sequence/integrity contract TEST ARTIFACT
Orphan reconciliation                   TEST ARTIFACT
Session integrity states                TEST ARTIFACT
Current end-to-end physical field gate  NOT CLAIMED
```

This prevents visual polish from silently upgrading source evidence into a physical validation claim.

Browser audit: **PASS**

---

# 15. Evidence dossier chapter

The case closes its proof layer with a Paper ledger of `E-AP-01` through `E-AP-09`.

States distinguish:

```text
IMPLEMENTED
SOURCE VERIFIED
SOURCE + TEST ARTIFACT
```

and route into the future Evidence Library.

Browser audit: **PASS**

---

# 16. Implementation / CI incidents

## INCIDENT 01 — literal state inference

Initial inspector state:

```ts
useState(autopulseCase.architecture[0].id)
```

was inferred as literal type `"acquisition"` because the content object is `as const`.

Result:

other architecture IDs could not be passed to `setActiveNode()`.

Correction:

```ts
useState<string>(...)
```

## INCIDENT 02 — invalid ARIA role override

The architecture container/button implementation initially assigned:

```text
role=list
role=listitem
```

to interactive buttons while also using `aria-pressed`.

This replaced the button semantic role and made `aria-pressed` invalid.

Correction:

- retain native button semantics;
- remove the artificial list/listitem roles;
- keep `aria-pressed` on the actual button.

## INCIDENT 03 — mobile cover overflow

The first mobile browser capture showed `AutoPulse` forcing the cover wider than the 390 px viewport.

Correction:

- explicit `min-width: 0` on grid/content children;
- mobile wordmark size reduced;
- thesis wrapping hardened;
- cover metadata reflowed.

Final mobile capture: **PASS**.

## INCIDENT 04 — inspector title overflow

The first architecture desktop capture showed `RealTelemetryPoller` escaping the Paper inspector.

Correction:

- inspector children receive `min-width: 0`;
- inspector heading receives a lower responsive size ceiling;
- `overflow-wrap: anywhere` used for implementation identifiers.

Final architecture capture: **PASS**.

---

# 17. Visual-proof infrastructure incident

## INCIDENT 05 — hash screenshots rendered blank

The generic Chrome CLI screenshots targeting:

```text
#architecture
#verification
```

returned dark/empty frames and could not be accepted as visual evidence.

## INCIDENT 06 — 9000 px “full page” viewport distorted `svh`

A temporary full-page proof used:

```text
--window-size=1440,9000
```

Because the design intentionally uses `svh`, this changed the layout itself and expanded the cover to the artificial viewport height.

That artifact was explicitly rejected as evidence.

### Final correction — reusable CDP harness

Added:

`scripts/capture-browser-section.mjs`

The harness uses Chrome DevTools Protocol to:

1. open the real page;
2. preserve a normal browser viewport;
3. emulate reduced motion deterministically;
4. find an exact CSS selector;
5. call `scrollIntoView()`;
6. capture only the actual viewport.

This is now reusable for future Systems, Evidence, Notes, and responsive audits.

---

# 18. Final visual proof

Workflow:

`.github/workflows/autopulse-visual-proof.yml`

Run:

`31959994949`

Artifact:

`autopulse-section-visual-proof`

Artifact ID:

`9266987323`

Digest:

`sha256:e956c8855b5026b2f96f45d77374482f7b2cd232455bd601f07d604d47693037`

Captured at real viewports:

```text
Desktop  1440 × 1000
Mobile    390 × 844
```

Final captures:

```text
autopulse-cover-desktop.png
autopulse-problem-desktop.png
autopulse-architecture-desktop.png
autopulse-verification-desktop.png
autopulse-evidence-desktop.png
autopulse-cover-mobile.png
autopulse-architecture-mobile.png
```

---

# 19. Final Jett visual audit

## Cover desktop — PASS

The cover has stronger AutoPulse-specific identity than the Home while remaining an engineering composition rather than a literal dashboard.

The AP calibration object provides a domain-appropriate mechanical undertone without decorative gauges.

## Problem — PASS

Strong editorial hierarchy. The three problem states are immediately understandable and visibly different from generic feature cards because they are framed as failure realities.

## Architecture — PASS

The architecture section is one of the strongest visual moments of the case:

- large editorial claim;
- dark inspectable component field;
- Paper inspector;
- real source component names;
- visible evidence relationship.

The first overflow found by browser proof was corrected.

## Verification — PASS

The Paper verification matrix creates a deliberate semantic/material shift and makes evidence confidence visible.

It does not look like a generic “results” section.

## Evidence — PASS

The evidence ledger successfully closes the case into THE BUILD ROOM's proof system rather than into a marketing conclusion.

## Mobile cover — PASS

After correction, hierarchy and text are contained and legible.

## Mobile architecture — PASS WITH LATER ACCESSIBILITY AUDIT

The architecture becomes a vertical inspection sequence rather than shrinking the desktop grid.

Dedicated keyboard/touch-depth testing remains part of SLICE 07, but the composition passes the current gate.

---

# 20. CORE VISUAL GATE

The Build Contract required a stop after Home + AutoPulse to ask whether the visual system actually works in-browser.

Current evidence:

```text
HOME startup identity             ✅
HOME settled desktop              ✅
HOME mobile first viewport        ✅
AUTOPULSE cover                    ✅
AUTOPULSE problem                  ✅
AUTOPULSE architecture             ✅
AUTOPULSE verification             ✅
AUTOPULSE evidence                 ✅
AUTOPULSE mobile                   ✅
Carbon / Paper semantic contrast  ✅
No generic SaaS card dependency   ✅
No automotive cosplay             ✅
Claims remain evidence-bounded    ✅
CI                                 ✅
Browser proof                      ✅
```

# CORE VISUAL GATE — ✅ PASS

The portfolio can now expand without redesigning its core identity.

---

# 21. Next

Proceed to:

# `SLICE 04 — Evidence System`

Its purpose is to turn the evidence IDs already visible in AutoPulse into real typed, routable, inspectable objects rather than static labels.
