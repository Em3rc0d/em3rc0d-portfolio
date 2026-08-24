# BUILD

This directory stores **implementation knowledge and build evidence**, not the application source itself.

Production source code lives in normal application folders such as `src/`, configuration files, scripts, workflows and tests. `build/` preserves why implementation decisions were made, slice results, verification, incidents, gate outcomes and handoff state.

## Build sequence

```text
SLICE 01 — Foundation                         ✅ CLOSED
SLICE 02 — Startup → Home                     ✅ CLOSED
SLICE 03 — AutoPulse                          ✅ CLOSED
SLICE 04 — Evidence System                    ✅ CLOSED
SLICE 05 — CV Engine                          ✅ CLOSED
SLICE 06 — Notes / About / Contact            ✅ CLOSED
SLICE 07 — Mobile / Accessibility             ✅ CLOSED
SLICE 08 — Performance / Launch               ✅ CLOSED / production proven
SLICE 09 — Visual Material v2                 ✅ CLOSED / superseded by later acceptance
SLICE 10 — Usability / Evidence / Photo       ✅ CLOSED
SLICE 11 — Material Reality                   ✅ CLOSED through final visual acceptance
SLICE 12 — Reputation Completeness Closeout   ✅ CLOSED / production verified
SLICE 13 — Distribution Foundation            ◉ FOUNDATION BUILT / OWNER ACCEPTANCE NEXT
```

`PROJECT_STATE.md` at repository root is the current cross-slice authority.

## Build records

- `SLICE-01-foundation.md`
- `SLICE-02-startup-to-home.md`
- `SLICE-03-autopulse.md`
- `SLICE-04-evidence-system.md`
- `SLICE-05-cv-engine.md`
- `SLICE-06-notes-about-contact.md`
- `SLICE-07-mobile-accessibility.md`
- `SLICE-08-performance-launch.md`
- `SLICE-09-visual-material-v2.md`
- `SLICE-10-usability-evidence-photo.md`
- `SLICE-11-material-reality.md`
- `SLICE-12-reputation-completeness-closeout.md`
- `SLICE-13-distribution-foundation.md`

Historical slice state is preserved inside each record. A slice whose own file says it was pending at the time of writing may be closed later by a subsequent acceptance/production slice; the current authority is `PROJECT_STATE.md` plus the later proof record, not retroactive rewriting of the historical record.

## Portfolio construction rule

Portfolio construction is frozen after STEP 1.1 closure.

Distribution work is **not** permission to add new portfolio pages or redesign existing surfaces. Reopen the product only for:

```text
VERIFIED DEFECT
NEW EVIDENCE
SCOPED PRODUCT REQUIREMENT
```

## Critical visual rule

> **One frame = one complete visual thought.**

This does **not** mean every web section must be exactly one viewport high. `100dvh` is a composition target; content may grow naturally when readability or responsive constraints require it. Clipping and overlap are never accepted merely to preserve an exact height.

Distribution inherits the equivalent rule:

> **One graphic = one technical thought.**

A social asset should explain a state, model, proof boundary or implementation path. Decoration alone is not a reason to create a graphic.

## Evidence rule

The public product and its downstream distribution are governed by:

```text
CLAIM
  ↓
EVIDENCE
  ↓
PROVENANCE
  ↓
PUBLICABILITY
  ↓
LIMITATION
```

Professional confidentiality outranks portfolio or distribution completeness. Private coordinates may support source verification without becoming public links, screenshots or social assets.

## Release / reputation closure

SLICE 08 closed the original production release gate.

SLICE 12 closed the expanded reputation-completeness gate after:

```text
PERSONAL BUILDING
        +
PROFESSIONAL DEPTH
        +
CONCURRENT R&D
        +
FULL-STACK SUPPORTING PROOF
        ↓
FINAL VISUAL ACCEPTANCE
        ↓
ACCESSIBILITY + PERFORMANCE + RELEASE GATES
        ↓
REAL PRODUCTION DEPLOYMENT
        ↓
PUBLIC ROUTE / PROVENANCE / SITEMAP / RUNTIME PROOF
```

Final repository authority before distribution work:

```text
main merge commit   a784fd074658863bce06360fe6a63db56c4bcdc5
Vercel deployment   dpl_3RAffRraNfPZGeeJYfbdgTocpDjr
Public origin       https://em3rc0d-portfolio.vercel.app
```

Evidence:

- `../evidence/production-release-proof-v1.md`
- `../evidence/STEP-1.1-reputation-completeness-production-proof-v1.md`

## Distribution handoff

SLICE 13 begins STEP 1.2 without modifying application source.

Distribution authority:

- `../plan/STEP-1.2-distribution-reputation-operations-v1.md`
- `../distribution/README.md`
- `../distribution/launch-queue-v1.md`
- `../distribution/visual-system-v1.md`
- `../distribution/metrics-ledger-template.md`

Editable visual workspace:

`https://www.figma.com/design/3UGAtVONTzNphfIusCUDVN`

First launch cycle:

```text
6 source-locked drafts       ✅
6 claim ceilings             ✅
6 portfolio/source bridges   ✅
6 visual briefs              ✅
6 editable Figma frames      ✅
metrics ledger               ✅
owner visual/voice approval  ◉ NEXT
real LinkedIn publish        ⛔
measurement loop             ⛔
```

No distribution object becomes `PUBLISHED` without its real platform URL.

## Build record template

Each meaningful slice should record:

```text
SCOPE
ISSUE / BUILD CONTRACT
IMPLEMENTATION DECISIONS
FILES / COMPONENTS
VISUAL RESULT
MOTION RESULT
ACCESSIBILITY RESULT
PERFORMANCE RESULT
TESTS
EVIDENCE CREATED
KNOWN GAPS
GATE STATUS
NEXT
```

Distribution slices may replace irrelevant product-only fields with:

```text
SOURCE OBJECTS
SUPPORTED CLAIMS
CLAIM CEILINGS
PUBLICABILITY
DRAFTS
VISUAL ASSETS
PUBLISHING STATE
MEASUREMENT
LEARNING
```

## Branch rule

- `main` — stable public/reputation authority.
- `develop` — integration branch when active portfolio development is intentionally reopened.
- feature branches — scoped implementation/documentation/distribution slices.

No destructive rewriting of project history for convenience.
