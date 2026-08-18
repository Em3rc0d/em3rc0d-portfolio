# THE BUILD ROOM — SLICE 08 · Performance / Launch

**Project:** Eduardo Merino Portfolio  
**Slice:** `08 — Performance / Launch`  
**State:** `CLOSED / PRODUCTION-PROVEN`  
**Branch:** `develop`

---

# 1. Responsibility

SLICE 08 is not a feature slice.

Its responsibility is to convert the browser-proven portfolio into a reproducible, measurable, searchable, shareable and deployment-proven release without weakening the evidence-first product contract.

The release boundary is now fully closed:

```text
PROVEN PRODUCT
      ↓
DETERMINISTIC BUILD
      ↓
PERFORMANCE BASELINE + REGRESSION BUDGET
      ↓
SEARCH / SHARE / ROUTE INTEGRITY
      ↓
PRE-PRODUCTION RELEASE GATE
      ↓
REAL HOST + REAL ORIGIN
      ↓
PRODUCTION PROOF
      ↓
THE BUILD ROOM v1.0 RELEASED
```

---

# 2. 08A — Performance / Launch Contract

Frozen contract:

`arch/quality/performance-launch-contract-v1.md`

The contract separated three classes of work.

## Required before launch

- deterministic dependency graph;
- production-like build proof;
- route / metadata integrity;
- search/share infrastructure;
- performance measurement;
- structural regression budgets;
- final deployed-origin proof.

## Proven before a domain existed

- lockfile and `npm ci` reproducibility;
- lint / typecheck / production build;
- browser performance baseline;
- performance regression guard;
- route titles/descriptions;
- Open Graph / Twitter metadata;
- icon generation;
- robots/sitemap behavior through a configured-origin fixture;
- 404 boundary.

## Proven at real production authority

- actual hosting target;
- actual HTTPS production origin;
- `NEXT_PUBLIC_SITE_URL` set to that origin;
- final robots/sitemap values at the real origin;
- deployed production smoke;
- Node 22 production parity.

No domain or host was inferred by the source tree.

---

# 3. 08B — Dependency Determinism

## Discovered defect

The initial release audit found no `package-lock.json` and persistent workflows used `npm install`.

That meant the same source commit could resolve a different transitive dependency graph in a later build.

This was treated as a release defect rather than a cosmetic CI improvement.

## Correction

Added:

```text
package-lock.json
.github/workflows/dependency-reproducibility.yml
```

The lock was generated under Node 22 and immediately validated through:

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

Result:

```text
LOCKFILE VERSION       3
DEPENDENCY GRAPH       COMMITTED
CLEAN INSTALL          PASS
LINT                   PASS
TYPECHECK              PASS
PRODUCTION BUILD       PASS
```

All persistent build/browser gates were migrated from `npm install` to `npm ci`.

The portfolio therefore no longer relies on unconstrained dependency re-resolution during proof runs.

---

# 4. 08C — Production Browser Performance Baseline

Added:

```text
scripts/performance-baseline.mjs
.github/workflows/performance-baseline.yml
```

Method:

```text
npm ci
   ↓
next build
   ↓
next start
   ↓
Chrome DevTools Protocol
   ↓
7 routes × 2 profiles
```

Profiles:

```text
DESKTOP
MOBILE
```

Measured routes:

```text
/
/systems/autopulse
/systems/cv-engine
/evidence
/notes
/about
/contact
```

Total measurements:

```text
14 / 14 PASS
runtime failures: 0
```

First measured desktop baseline:

| Route | FCP | Load | Transfer | Resources | DOM elements | JS listeners |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 312 ms | 251.6 ms | 323,446 B | 30 | 261 | 346 |
| `/systems/autopulse` | 288 ms | 309.6 ms | 336,195 B | 30 | 455 | 345 |
| `/systems/cv-engine` | 192 ms | 204.5 ms | 337,716 B | 30 | 691 | 357 |
| `/evidence` | 136 ms | 150.3 ms | 347,189 B | 38 | 330 | 337 |
| `/notes` | 116 ms | 135.5 ms | 342,860 B | 38 | 156 | 318 |
| `/about` | 128 ms | 149.4 ms | 323,278 B | 29 | 167 | 310 |
| `/contact` | 144 ms | 164.0 ms | 322,880 B | 29 | 136 | 309 |

These timings are laboratory observations from a GitHub runner, **not public user-performance claims**.

The baseline is useful for architecture comparison and regression detection, not for claiming production Core Web Vitals without real-user monitoring.

---

# 5. Structural Performance Budget

Added:

```text
scripts/performance-budget.json
scripts/performance-budget-check.mjs
```

The permanent gate intentionally avoids hard thresholds on FCP/load/task duration because runner timing is noisy.

It enforces the more deterministic structural costs:

```text
network.transferBytes
network.resources
runtime.domElements
runtime.jsEventListeners
```

Budgets are route-specific and were frozen from the measured release candidate with deliberate operating margin rather than arbitrary score chasing.

The performance workflow executes:

```text
Capture production browser baseline
        ↓
Enforce structural performance budget
        ↓
Persist performance artifact
```

The released v1 implementation remains inside the frozen budget at the release gate.

---

# 6. Runtime Optimization Audit

A global `MutationObserver` used by the accessibility semantic repair layer was reviewed because the performance baseline revealed a shared runtime floor.

The optimization was **not authorized for v1**.

Reason:

- current runtime measurements were healthy;
- the observer protects two Motion-replaced live-region inspectors;
- AutoPulse/CV Engine keyboard and live-region behavior was already browser-proven;
- removing it required flagship component refactoring with little measured release benefit.

Decision:

```text
KEEP PROVEN ACCESSIBILITY BEHAVIOR
DEFER OBSERVER REMOVAL TO POST-LAUNCH OPTIMIZATION
```

This prevented release hardening from becoming speculative refactor churn.

---

# 7. 08D — Metadata / Search / Share Boundary

The deeper audit found that most route metadata already existed:

- Evidence;
- Notes;
- About;
- Contact;
- dynamic System pages;
- dynamic Evidence dossiers;
- dynamic Note records.

The missing release envelope was implemented rather than rewriting existing metadata.

Added / hardened:

```text
src/lib/site-config.ts
src/app/robots.ts
src/app/sitemap.ts
src/app/opengraph-image.tsx
src/app/icon.tsx
src/app/layout.tsx
src/app/systems/page.tsx
```

Production-origin contract:

```text
NEXT_PUBLIC_SITE_URL present + valid HTTPS origin
        ↓
metadataBase
robots host / sitemap
absolute sitemap URLs

NEXT_PUBLIC_SITE_URL absent
        ↓
build remains valid
no fabricated canonical production origin
```

The application refuses malformed/non-HTTPS public origins rather than silently publishing them.

The Open Graph image follows THE BUILD ROOM visual thesis and does not introduce automotive decoration as identity evidence.

---

# 8. Release Quality Gate

Added:

```text
scripts/release-smoke.mjs
.github/workflows/release-quality.yml
```

CI uses a reserved `.invalid` origin only as a fixture to execute the configured-origin path.

That fixture is test infrastructure and is never production identity.

The release smoke proves:

```text
10 PUBLIC ROUTES
  ├─ title
  ├─ description
  └─ indexability

HOME
  ├─ Open Graph title
  ├─ Open Graph description
  ├─ Open Graph image
  ├─ Twitter summary_large_image
  └─ icon metadata

ROBOTS
  ├─ 200
  ├─ public rule
  └─ sitemap pointer

SITEMAP
  ├─ 200
  └─ representative absolute public entries

UNKNOWN ROUTE
  └─ 404
```

Pre-production release-smoke result:

```text
PASS — 10 public routes + metadata/search/404 boundary
```

---

# 9. Pre-Production Gate Result

Verified before the production boundary:

```text
DEPENDENCY REPRODUCIBILITY        ✅ PASS
PORTFOLIO CI                      ✅ PASS
ACCESSIBILITY QUALITY             ✅ PASS
ACCESSIBILITY VISUAL PROOF        ✅ PASS
PERFORMANCE BASELINE              ✅ PASS
STRUCTURAL PERFORMANCE BUDGET     ✅ PASS
RELEASE QUALITY                   ✅ PASS
```

The release candidate was therefore correctly classified as `PRE-PRODUCTION READY` until a real production host existed.

---

# 10. 08E — Production Deployment & Origin Proof

The previously external dependency is now closed.

## Production authority

```text
Host                       Vercel
Team                       faridmerinos-projects
Project                    em3rc0d-portfolio
Production branch          main
Production merge commit    3f92fdcb3adb423e2b4b04474e17bb2f51e3caf6
Production deployment      dpl_3JCdaqsDSRMJn4Rnqq2n91XAqD5K
Production state           READY
Public origin              https://em3rc0d-portfolio.vercel.app
```

PR #2 (`release: close THE BUILD ROOM v1 production parity`) was merged into `main` before the final deployment.

## Node runtime parity

A real deployment audit discovered that the first Vercel production build used Node 24 while the repository quality contract used Node 22.

Correction:

```json
"engines": {
  "node": "22.x"
}
```

The final Vercel build explicitly reports:

```text
Skipping build cache since Node.js version changed from 24.x to 22.x
engines.node = 22.x overrides Vercel Project Settings 24.x
Node 22.x used
```

This closes build/runtime authority divergence.

## Final production build

```text
Next.js                    16.3.1
Compile                    PASS
TypeScript                 PASS
Static generation          45 / 45
Deployment                 PASS
Production state           READY
```

## Real origin

`NEXT_PUBLIC_SITE_URL` is configured as:

```text
https://em3rc0d-portfolio.vercel.app
```

Final deployed `robots.txt`:

```text
User-Agent: *
Allow: /
Host: https://em3rc0d-portfolio.vercel.app
Sitemap: https://em3rc0d-portfolio.vercel.app/sitemap.xml
```

Final deployed `sitemap.xml`:

```text
HTTP 200
real production origin
Home / Systems / AutoPulse / CV Engine
23 Evidence dossiers
8 Notebook records
About / Contact
```

## Runtime audit

The final production deployment was queried for `error` and `fatal` runtime logs.

Result:

```text
ERROR / FATAL LOGS FOUND: 0
```

This is evidence for the audited release window, not a perpetual SLA claim.

Full evidence record:

`evidence/production-release-proof-v1.md`

---

# 11. Final Gate

```text
SLICE 08A — Release Contract             ✅ CLOSED
SLICE 08B — Build Determinism             ✅ CLOSED
SLICE 08C — Performance Baseline/Budget   ✅ CLOSED
SLICE 08D — Search / Share / Route Gate   ✅ CLOSED
SLICE 08E — Production Deployment Proof   ✅ CLOSED
```

## Final slice state

# `SLICE 08 — CLOSED / PRODUCTION-PROVEN`

Therefore:

```text
STEP 1.0 — BUILD                        ✅ CLOSED
THE BUILD ROOM v1.0                     ✅ PRODUCTION RELEASED
```

The next authority is:

`plan/STEP-1.1-reputation-completeness-plan-v1.md`

Future work is reputation/content completeness unless a concrete product defect justifies reopening BUILD.
