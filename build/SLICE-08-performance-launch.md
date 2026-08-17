# THE BUILD ROOM — SLICE 08 · Performance / Launch

**Project:** Eduardo Merino Portfolio  
**Slice:** `08 — Performance / Launch`  
**State:** `PRE-PRODUCTION GATE PASSED / PRODUCTION DEPLOYMENT PENDING`  
**Branch:** `develop`

---

# 1. Responsibility

SLICE 08 is not a feature slice.

Its responsibility is to convert the browser-proven portfolio into a reproducible, measurable, searchable, shareable and deployment-ready release candidate without weakening the evidence-first product contract.

The release boundary is:

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
```

The final production proof is intentionally not claimed until an actual deployment exists.

---

# 2. 08A — Performance / Launch Contract

Frozen contract:

`arch/quality/performance-launch-contract-v1.md`

The contract separates three classes of work.

## Required before launch

- deterministic dependency graph;
- production-like build proof;
- route / metadata integrity;
- search/share infrastructure;
- performance measurement;
- structural regression budgets;
- final deployed-origin proof.

## Can be proven before a domain exists

- lockfile and `npm ci` reproducibility;
- lint / typecheck / production build;
- browser performance baseline;
- performance regression guard;
- route titles/descriptions;
- Open Graph / Twitter metadata;
- icon generation;
- robots/sitemap behavior through a configured-origin fixture;
- 404 boundary.

## Requires real deployment authority

- actual hosting target;
- actual HTTPS production origin;
- `NEXT_PUBLIC_SITE_URL` set to that origin;
- final canonical/robots/sitemap values at the real origin;
- deployed production smoke.

No domain or host is inferred by the source tree.

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

The lock was generated under the same Node 22 line used by project CI and immediately validated through:

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

All persistent build/browser gates were then migrated from `npm install` to `npm ci`.

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

The baseline is useful for architecture comparison and regression detection, not for claiming production Core Web Vitals before a production origin exists.

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

Budgets are route-specific and were frozen from the measured release candidate with deliberate operating margin rather than arbitrary industry-score chasing.

The performance workflow executes:

```text
Capture production browser baseline
        ↓
Enforce structural performance budget
        ↓
Persist performance artifact
```

Current release candidate remains inside the frozen budget.

---

# 6. Runtime Optimization Audit

A global `MutationObserver` used by the accessibility semantic repair layer was reviewed because the performance baseline revealed a shared runtime floor.

The optimization was **not authorized for this release**.

Reason:

- current runtime measurements are healthy;
- the observer protects two Motion-replaced live-region inspectors;
- AutoPulse/CV Engine keyboard and live-region behavior is already browser-proven;
- removing it requires flagship component refactoring with little measured release benefit.

Decision:

```text
KEEP PROVEN ACCESSIBILITY BEHAVIOR
DEFER OBSERVER REMOVAL TO POST-LAUNCH OPTIMIZATION
```

This prevents release hardening from becoming speculative refactor churn.

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

Final release smoke result:

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

The release candidate is therefore:

# `PRE-PRODUCTION READY`

This does **not** mean `PRODUCTION RELEASED`.

---

# 10. External Production Dependency

GitHub repository audit found:

```text
DEPLOYMENTS       0
ENVIRONMENTS      0
PRODUCTION ORIGIN NONE RECOVERED
```

Therefore the source repository cannot truthfully close the final production gate by itself.

Remaining responsibility:

# `08E — Production Deployment & Origin Proof`

Required inputs/actions:

1. select/connect hosting authority;
2. deploy the verified release candidate;
3. obtain the actual HTTPS production origin;
4. set `NEXT_PUBLIC_SITE_URL` to that origin;
5. rebuild/redeploy with that authority;
6. execute production smoke against the real URL;
7. verify real robots/sitemap/social metadata;
8. record deployment evidence;
9. only then declare `SLICE 08 CLOSED` / `THE BUILD ROOM v1.0 RELEASED`.

---

# 11. Gate

```text
SLICE 08A — Release Contract             ✅ CLOSED
SLICE 08B — Build Determinism             ✅ CLOSED
SLICE 08C — Performance Baseline/Budget   ✅ CLOSED
SLICE 08D — Search / Share / Route Gate   ✅ CLOSED
SLICE 08E — Production Deployment Proof   ⛔ EXTERNAL DEPENDENCY
```

## Final slice state

# `PRE-PRODUCTION GATE PASSED / DEPLOYMENT PENDING`

Do not close SLICE 08 until a real production origin has been deployed and inspected.
