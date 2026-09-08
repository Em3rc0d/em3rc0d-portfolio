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

Historical slice state is preserved inside each record. A slice whose own file says it was pending at the time of writing may be closed later by a subsequent acceptance/production slice; the current authority is `PROJECT_STATE.md` plus the later proof record, not retroactive rewriting of the historical record.

## Critical visual rule

The original core gate remains valid:

> **If Home + AutoPulse do not already feel exceptional in the browser, stop expanding surface area and iterate the design system.**

The final visual-acceptance pass refined that rule into:

> **One frame = one complete visual thought.**

This does **not** mean every section must be exactly one viewport high. `100dvh` is a composition target; content may grow naturally when readability or responsive constraints require it. Clipping and overlap are never accepted merely to preserve an exact height.

## Evidence rule

The public product is governed by:

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

Professional confidentiality outranks portfolio completeness. Private coordinates may support source verification without becoming public links.

## Release / reputation closure

SLICE 08 closed the original production release gate.

SLICE 12 closes the expanded reputation-completeness gate after:

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

Production authority for STEP 1.1 closure:

```text
main merge commit   136abc0f074c4cb9f01e01dcaab621fd5bea903c
Vercel deployment   dpl_CEBRKioK19pSftfR6x8BRw1icubv
Public origin       https://em3rc0d-portfolio.vercel.app
```

Evidence:

- `../evidence/production-release-proof-v1.md`
- `../evidence/STEP-1.1-reputation-completeness-production-proof-v1.md`

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

## Branch rule

- `main` — stable public baseline.
- `develop` — integration branch when active portfolio development is intentionally reopened.
- feature branches — scoped implementation/documentation slices.

No destructive rewriting of project history for convenience.

## Current handoff

Portfolio construction is frozen after STEP 1.1 closure.

The next operating phase is **distribution / reputation operations**: use Systems, Evidence and Notes as the source material for recurring public engineering communication and route interested readers back to inspectable proof.
