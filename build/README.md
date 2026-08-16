# BUILD

This directory stores **implementation knowledge and build evidence**, not the application source itself.

Production source code will live in normal application folders such as `src/`, `public/`, configuration files, and tests. `build/` preserves why implementation decisions were made, slice results, verification, and handoff state.

## Build sequence

```text
SLICE 01 — Foundation
SLICE 02 — Startup → Home
SLICE 03 — AutoPulse
SLICE 04 — Evidence System
SLICE 05 — CV Engine
SLICE 06 — Notes / About / Contact
SLICE 07 — Mobile / Accessibility
SLICE 08 — Performance / Polish / Launch
```

## Critical visual gate

After SLICE 03:

> **If Home + AutoPulse do not already feel exceptional in the browser, stop expanding surface area and iterate the design system.**

Do not build more pages to compensate for a weak core experience.

## Build record template

Each meaningful slice should eventually record:

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
- `develop` — integration branch for active portfolio development.
- feature branches — scoped implementation slices when useful.

No destructive rewriting of project history for convenience.
