# BUILD — SLICE 01 · Foundation

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Verification:** GitHub Actions `Portfolio CI` run `31957977713` — success

## 1. Slice objective

Create a production-capable portfolio foundation before implementing the startup animation or deep case-study interactions.

The foundation had to prove that THE BUILD ROOM can exist as a real, typed, statically generated web application while preserving the pre-build contracts:

- semantic navigation;
- Carbon / Paper material system;
- approved positioning only;
- content separated from presentation;
- publicability represented in data;
- responsive layout baseline;
- reduced-motion baseline;
- routable flagship systems;
- lint / type / production build verification.

## 2. Implemented stack

```text
Next.js 16.3.1
React 19.2.8
TypeScript 6.x
Tailwind CSS 4 pipeline
Motion package installed for later motion slices
ESLint 9 + eslint-config-next
Node 22 in CI
```

TypeScript is intentionally pinned to the compatible `6.x` line because the current Next lint chain's `typescript-eslint` integration rejected TypeScript 7 during CI.

## 3. Repository / branch foundation

```text
main      stable documentation baseline
develop   active portfolio implementation
```

Production code is being developed on `develop`; `main` remains the stable baseline until reviewed promotion.

## 4. Core files added

```text
package.json
tsconfig.json
next-env.d.ts
eslint.config.mjs
postcss.config.mjs
.gitignore
.github/workflows/ci.yml
```

Application foundation:

```text
src/app/layout.tsx
src/app/page.tsx
src/app/globals.css
src/app/internal.css
src/app/foundation.css
```

Content/domain foundation:

```text
src/lib/content/types.ts
src/content/systems.ts
```

Shell foundation:

```text
src/components/shell/site-header.tsx
src/components/shell/section-foundation.tsx
```

Routes:

```text
/
/about
/contact
/evidence
/notes
/systems
/systems/autopulse
/systems/cv-engine
```

## 5. Typed content contracts

Created foundational types for:

```text
Publicability
SystemState
PortfolioRole
SystemRecord
EvidenceRecord
```

This is intentional architecture: visual components are not allowed to become the factual source of truth for system state or publicability.

## 6. Initial system data

Flagships:

```text
01 / AUTOPULSE
02 / CV ENGINE
```

Supporting candidates:

```text
Graph
Infra Monitor
prodAgentic
GPets
```

RAG is present internally as:

```text
role: RESERVED
publicability: PRIVATE
```

so it cannot accidentally enter public routing.

## 7. Home foundation

The Home foundation deliberately avoids a generic project-card grid.

Current static composition includes:

- semantic THE BUILD ROOM header;
- approved positioning;
- large editorial Hero;
- engineering process rail;
- a startup-remnant rail prepared for SLICE 02 transformation;
- oversized AutoPulse / CV Engine system records;
- Carbon → Paper Evidence material transition;
- primary routes to Systems, Evidence, and Contact.

Important:

> The current Hero is a foundation state, not the finished motion composition.

SLICE 02 must transform the static startup-remnant concept into the actual startup → Home transition.

## 8. Material / visual foundation

Implemented variables include:

```text
--carbon
--carbon-raised
--graphite
--steel
--alloy
--paper
--paper-soft
--ink
--redline
--pit-amber
--verified
```

The layout also includes:

- subtle technical grid;
- meaningful technical labels;
- responsive system records;
- Paper evidence sheet language;
- visible focus treatment;
- `prefers-reduced-motion` baseline.

## 9. Route strategy

Deep routes that belong to later slices are wired now rather than represented as dead links.

The Evidence / Notes / About / Contact pages intentionally expose a build-status foundation instead of pretending their final designs are complete.

The flagship dynamic route uses `generateStaticParams()` and only emits public, routable systems.

## 10. CI incident record

### INCIDENT 01 — npm cache before lockfile

**Symptom**

`actions/setup-node` failed before dependency installation.

**Cause**

The workflow requested npm cache but the repository had no `package-lock.json` yet.

**Correction**

Removed cache configuration during bootstrap so `npm install` could execute.

**Lesson**

Do not enable lockfile-dependent CI optimizations before a lockfile exists.

### INCIDENT 02 — TypeScript 7 / typescript-eslint incompatibility

**Symptom**

Lint exited with:

```text
typescript-eslint does not support TS 7.0.
```

**Cause**

Initial package selection used TypeScript 7 while the installed Next ESLint chain still depends on a typescript-eslint version using the TypeScript 6 API.

**Correction**

Changed TypeScript dependency to:

```text
^6.0.0
```

**Result**

Lint, typecheck, and build all passed.

## 11. Verification result

Final CI gate:

```text
Setup Node             ✅
Install dependencies   ✅
Lint                    ✅
Typecheck               ✅
Production build        ✅
```

Next production build generated:

```text
○ /
○ /about
○ /contact
○ /evidence
○ /notes
○ /systems
● /systems/autopulse
● /systems/cv-engine
```

`○` = statically prerendered route.  
`●` = SSG route produced from `generateStaticParams()`.

## 12. Known non-blocking gaps

### Dependency lockfile

A `package-lock.json` has not yet been committed because installation occurred inside the ephemeral CI runner. Before deployment hardening, generate and commit the lockfile and then change CI from bootstrap `npm install` to deterministic `npm ci`.

### GitHub Actions runtime warning

The runner reports that the current major versions of `actions/checkout` / `actions/setup-node` target an older Node action runtime and are being forced onto Node 24 by GitHub. This does not fail the current workflow but should be revisited during CI hardening.

### Visual verification

CI proves compilation and route generation, not visual excellence. Browser-level visual review becomes mandatory in SLICE 02 / SLICE 03.

## 13. Gate decision

```text
Foundation architecture      ✅
Typed content                ✅
Semantic routing             ✅
Material tokens              ✅
Responsive baseline          ✅
Reduced-motion baseline      ✅
Lint                         ✅
Typecheck                    ✅
Production build             ✅

SLICE 01                     CLOSED
```

## 14. Next

Proceed to:

# `SLICE 02 — Startup → Home`

Its responsibility is not merely to add an intro animation.

It must prove the central Visual Direction v2 principle:

> **The startup does not disappear and reveal the portfolio. The startup reorganizes into the portfolio.**
