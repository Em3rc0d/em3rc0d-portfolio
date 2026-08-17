# BUILD

This directory stores **implementation knowledge and build evidence**, not the application source itself.

Production source code lives in normal application folders such as `src/`, configuration files, scripts, workflows and tests. `build/` preserves why implementation decisions were made, slice results, verification, incidents, gate outcomes and handoff state.

## Build sequence

```text
SLICE 01 — Foundation                 ✅ CLOSED
SLICE 02 — Startup → Home             ✅ CLOSED
SLICE 03 — AutoPulse                  ✅ CLOSED
SLICE 04 — Evidence System            ✅ CLOSED
SLICE 05 — CV Engine                  ✅ CLOSED
SLICE 06 — Notes / About / Contact    ✅ CLOSED
SLICE 07 — Mobile / Accessibility     ✅ CLOSED
SLICE 08 — Performance / Launch       ◉ PRE-PRODUCTION GATE PASSED
  └─ 08E Production Deployment       ⛔ REAL HOST / ORIGIN REQUIRED
```

## Build records

- `SLICE-01-foundation.md`
- `SLICE-02-startup-to-home.md`
- `SLICE-03-autopulse.md`
- `SLICE-04-evidence-system.md`
- `SLICE-05-cv-engine.md`
- `SLICE-06-notes-about-contact.md`
- `SLICE-07-mobile-accessibility.md`
- `SLICE-08-performance-launch.md`

`PROJECT_STATE.md` at repository root is the current cross-slice authority.

## Critical visual gate

After SLICE 03:

> **If Home + AutoPulse do not already feel exceptional in the browser, stop expanding surface area and iterate the design system.**

That gate passed before the portfolio expanded to its second flagship and reputation surfaces.

Do not build more pages to compensate for a weak core experience.

## Release gate

After SLICE 08 pre-production hardening:

> **A local/CI release candidate is not the same thing as a production release.**

Production closure requires:

```text
REAL HOSTING AUTHORITY
        ↓
REAL HTTPS ORIGIN
        ↓
NEXT_PUBLIC_SITE_URL
        ↓
DEPLOYED BUILD
        ↓
PRODUCTION ROUTE / METADATA / ROBOTS / SITEMAP SMOKE
        ↓
DEPLOYMENT EVIDENCE
        ↓
SLICE 08 CLOSED
```

Do not close the release gate against a fixture origin or localhost.

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
- `develop` — integration branch for active portfolio development.
- feature branches — scoped implementation slices when useful.

No destructive rewriting of project history for convenience.
