# Eduardo Merino — THE BUILD ROOM

Public portfolio repository and project knowledge base for **Eduardo Merino**.

> **Software Developer — Systems, Full Stack & Applied AI**  
> **I turn messy operational problems into working software.**

This repository stores both the public portfolio implementation and the reasoning that produced it. The portfolio is treated as a product: identity, evidence, information architecture, visual system, interaction language, publicability rules, build contracts, implementation, verification, release hardening, and deprecated decisions all remain traceable.

## Current state

**Current gate:** `SLICE 08E — Production Deployment & Origin Proof`  
**Release state:** `PRE-PRODUCTION READY`  
**Design thesis:** `THE BUILD ROOM — Engineered, with a mechanical soul.`

The principal public experience is implemented and browser-proven. AutoPulse, CV Engine, Evidence, Notes, About and Contact are live in the application source; mobile/accessibility quality and pre-production release hardening have passed their gates.

The remaining release responsibility is external production authority: deploy the verified release candidate, configure the real HTTPS origin through `NEXT_PUBLIC_SITE_URL`, and run the final production smoke against that origin.

The portfolio is intentionally **not** an automotive-themed website. Mechanical/automotive language is a subtle design undertone; professional trust, systems thinking, evidence, and implementation remain dominant.

## Build state

```text
SLICE 01 — Foundation             ✅ CLOSED
SLICE 02 — Startup → Home         ✅ CLOSED
SLICE 03 — AutoPulse              ✅ CLOSED
SLICE 04 — Evidence System        ✅ CLOSED
SLICE 05 — CV Engine              ✅ CLOSED
SLICE 06 — Notes/About/Contact    ✅ CLOSED
SLICE 07 — Mobile/Accessibility   ✅ CLOSED
SLICE 08 — Performance/Launch     ◉ PRE-PRODUCTION GATE PASSED
  └─ 08E Production Deployment    ⛔ REAL HOST / ORIGIN REQUIRED
```

Pre-production release proof includes:

```text
locked dependency graph          ✅
npm ci reproducibility           ✅
lint / typecheck / build         ✅
60 route-width a11y checks       ✅
6 keyboard interaction checks    ✅
14 browser performance samples   ✅
structural performance budgets   ✅
metadata / OG / Twitter          ✅
robots / sitemap                 ✅
404 / route release smoke        ✅
```

See `PROJECT_STATE.md` and `build/SLICE-08-performance-launch.md` for the current authority.

## Working structure

```text
brainstorm/    discovery, positioning, evidence recovery, unresolved ideas
design/        case-study design, visual system, interaction system
arch/          information architecture, page/system contracts, quality contracts
plan/          build contracts, slices, gates, execution plans
build/         implementation and release records
evidence/      claim support, publicability, render references, inspectable proof
deprecated/    superseded work retained for provenance
mining-site/   external/reference quarries when needed
```

## Preservation rules

1. Do not delete serious project knowledge because a decision changes.
2. Move superseded material to `deprecated/` and explain what replaced it.
3. Distinguish **fact**, **approved positioning**, **design proposal**, and **unverified claim**.
4. Public confidence must never exceed evidence confidence.
5. Professional/company-derived material must be classified before publication: `PUBLIC`, `SANITIZED`, `ABSTRACTED`, or `PRIVATE`.
6. The generated visual concept is a **design reference**, not a source of factual metrics or biographical claims.

## Flagship systems

- **AutoPulse** — real-world telemetry / persistence / recovery / integrity.
- **CV Engine** — application intelligence / evidence / opportunity matching / bounded decision support / controlled market ingress.

Their responsibilities deliberately differ so the portfolio demonstrates range without repeating one case-study template.

## Build principle

The approved experience is not `Navbar → Hero → cards → footer`.

```text
Initialize → Enter → Discover → Inspect → Open → Verify → Meet → Contact
```

The startup sequence transforms into Home, and public claims remain connected to inspectable evidence rather than decorative project cards.

## Release principle

A green local build is not the production gate.

```text
SOURCE
  ↓
LOCKED BUILD
  ↓
QUALITY PROOF
  ↓
PERFORMANCE / RELEASE PROOF
  ↓
REAL HOST + HTTPS ORIGIN
  ↓
DEPLOYED PRODUCTION SMOKE
  ↓
RELEASE
```

No production domain is inferred or fabricated. `NEXT_PUBLIC_SITE_URL` becomes authoritative only when the real public HTTPS origin is known.

## Branch discipline

`main` is the stable public baseline. Implementation and release hardening are performed through `develop` and scoped feature branches, then reviewed before promotion to `main`.
