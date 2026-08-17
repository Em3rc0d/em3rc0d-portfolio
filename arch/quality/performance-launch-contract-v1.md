# THE BUILD ROOM — Performance / Launch Contract v1

**Slice:** `SLICE 08`  
**Status:** FROZEN FOR RELEASE HARDENING  
**Scope:** release readiness, performance proof, metadata/SEO, production configuration and final launch gate.

---

# 1. Purpose

THE BUILD ROOM has completed its principal implementation and accessibility quality gates.

The remaining question is no longer:

> Does the portfolio look or behave correctly?

It is:

> Can this exact build be reproduced, measured, crawled, shared, deployed and released without weakening the evidence/trust contract?

SLICE 08 is therefore a release-hardening slice, not a feature-expansion slice.

---

# 2. Current proven baseline entering SLICE 08

```text
SLICE 01 — Foundation             ✅
SLICE 02 — Startup → Home         ✅
SLICE 03 — AutoPulse              ✅
SLICE 04 — Evidence System        ✅
SLICE 05 — CV Engine              ✅
SLICE 06 — Notes/About/Contact    ✅
SLICE 07 — Mobile/Accessibility   ✅

Responsive / semantic matrix      60 / 60 PASS
Keyboard interaction smoke         6 / 6 PASS
Accessibility browser proof        PASS
Portfolio CI                       PASS
```

The release slice must preserve those gates.

---

# 3. Release principles

## 3.1 Measure before optimizing

No performance budget may be invented because it sounds respectable.

First establish a repeatable production-like baseline for representative routes.

Only then define regression budgets with explicit margin.

## 3.2 Deterministic before fast

A fast build that resolves a different dependency graph tomorrow is not release-ready.

Dependency reproducibility precedes bundle tuning.

## 3.3 Production URL is configuration, not an assumption

The repository currently does not establish a verified public production origin.

Do not invent one for:

- canonical URLs;
- metadataBase;
- sitemap entries;
- robots sitemap references;
- production smoke tests.

## 3.4 Search/share metadata must not overclaim

SEO text and social previews are part of the public claim surface.

They must use the same approved positioning and evidence ceiling as the visible portfolio.

## 3.5 Launch gate is stricter than build success

```text
next build PASS
```

is necessary but not sufficient.

Launch additionally requires route integrity, metadata integrity, accessibility regression safety, performance proof and production configuration.

---

# 4. Baseline audit — current release gaps

## GAP A — no committed dependency lock

Current repository contains `package.json` but no:

```text
package-lock.json
npm-shrinkwrap.json
yarn.lock
pnpm-lock.yaml
```

Current CI installs through:

```text
npm install
```

This means transitive resolution can drift across future runs.

### Required correction

- generate and commit `package-lock.json` from the current supported Node/npm environment;
- switch CI / browser-proof workflows to `npm ci`;
- add a reproducibility gate that fails when `package.json` and the lockfile disagree.

---

# 5. GAP B — performance has visual proof but no runtime baseline

The portfolio has extensive browser screenshots and behavior smoke tests, but there is no persistent performance record for representative production routes.

### Required baseline routes

```text
/
/systems/autopulse
/systems/cv-engine
/evidence
/notes
/about
/contact
```

### Required observations

At minimum record:

```text
navigation timing
first contentful paint when exposed by the browser
DOM node count
resource count
script resource count
stylesheet resource count
transferred resource bytes when exposed
JS heap used after route settle
long-task count / duration when exposed
```

Measurements are laboratory evidence, not field Core Web Vitals.

No invented performance claim should be published from them.

---

# 6. GAP C — global client-side semantic observer

The current root layout mounts a client-side `DynamicSemantics` component that observes DOM mutations to re-apply live-region semantics to AutoPulse / CV Engine inspectors.

This solved an accessibility gate, but release hardening should verify whether those semantics can live directly on the changing components instead of keeping a global MutationObserver active across every route.

### Correction rule

Prefer direct component semantics if they survive Motion replacement and continue passing the 6/6 keyboard quality gate.

Do not remove the observer merely for theoretical cleanliness.

---

# 7. GAP D — metadata is currently global/minimal

The root layout currently defines approved identity and description, but route-level title/description metadata is not yet established as a release contract.

### Required metadata families

```text
Home
Systems
AutoPulse
CV Engine
Evidence
Evidence dossier
Notes
Note dossier
About
Contact
```

Metadata may be generated from existing typed content for dynamic routes.

No new marketing claims are authorized.

---

# 8. GAP E — search metadata files are absent

Current app state does not contain:

```text
robots.ts / robots.txt
sitemap.ts / sitemap.xml
```

The production origin is not yet verified, so absolute sitemap/canonical URLs are blocked by configuration rather than guessed.

### Allowed before production URL is known

- implement a typed site-origin configuration boundary;
- make robots/sitemap generation depend on the verified production origin;
- test the missing-config and configured-config paths;
- keep CI builds valid without pretending a public origin exists.

### Required before public launch

A verified production origin must be supplied and the generated files must be inspected in the deployed environment.

---

# 9. GAP F — social preview / app icon are not frozen

There is no current app-root favicon / Open Graph / Twitter preview asset in the release baseline.

### Required correction

Create a restrained portfolio identity asset using the existing Build Room design language.

The asset must communicate:

```text
Eduardo Merino
THE BUILD ROOM
Software Developer — Systems, Full Stack & Applied AI
```

It must not introduce a literal automotive theme or unsupported achievements.

---

# 10. GAP G — production route integrity

Static generation currently produces the public route corpus, but SLICE 08 needs an explicit route smoke rather than relying on build output text.

### Required route checks

Representative route requests must return expected success / content in a production server.

Also verify:

```text
unknown route → 404
robots endpoint
sitemap endpoint when production origin is configured
metadata title/description presence
no accidental noindex on public routes
```

---

# 11. Dependency / CI contract

After lockfile closure:

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

becomes the canonical verification sequence.

All browser-proof workflows should use the same deterministic install path.

---

# 12. Performance gate design

SLICE 08 uses two stages.

## Stage 1 — baseline

Measure current production-like build and store machine-readable + human-readable artifacts.

No threshold failure except catastrophic route/runtime failure.

## Stage 2 — regression budget

After baseline review, establish route-level/global ceilings derived from the actual implementation with deliberate margin.

The budget protects the portfolio against future accidental cost growth; it is not a public speed claim.

---

# 13. Production configuration contract

Minimum launch configuration:

```text
NEXT_PUBLIC_SITE_URL=<verified https origin>
```

Rules:

- must parse as an absolute `https:` URL for public production;
- should not contain a trailing path;
- is the authority for canonical / sitemap / robots host references;
- must never be inferred from GitHub username, Vercel preview hostname or local development state.

Preview deployments may intentionally omit it or use a preview-specific origin without becoming canonical production evidence.

---

# 14. Security / external-boundary review

Release audit must verify:

- `target="_blank"` links carry safe `rel` behavior;
- no private/company URL or artifact was accidentally exposed during build;
- no secret is embedded in client code;
- production headers/configuration are reviewed before launch;
- CSP is considered based on the final hosting environment and actual external resource needs rather than copied blindly.

---

# 15. SEO / route truth boundary

Search-facing copy must remain inside the approved public claim ceiling.

Examples:

```text
ALLOWED
Software Developer — Systems, Full Stack & Applied AI
I turn messy operational problems into working software.
AutoPulse — telemetry / durable state / recovery / integrity
CV Engine — application intelligence / evidence / market assessment

NOT AUTHORIZED WITHOUT NEW EVIDENCE
Senior Software Architect
AI Expert
production-scale claims
invented user counts / performance numbers / business outcomes
```

---

# 16. Required SLICE 08 evidence

```text
arch/quality/performance-launch-contract-v1.md
build/SLICE-08-performance-launch.md
package-lock.json
performance baseline script/report
release smoke script/report
updated deterministic workflows
metadata/search-share implementation
final launch checklist
```

---

# 17. Gate

SLICE 08 closes only when:

```text
RELEASE CONTRACT                       ✅
DEPENDENCY LOCK                        REQUIRED
DETERMINISTIC CI                       REQUIRED
PERFORMANCE BASELINE                   REQUIRED
PERFORMANCE REGRESSION GATE            REQUIRED
GLOBAL RUNTIME COST REVIEW             REQUIRED
METADATA FAMILY                        REQUIRED
SOCIAL PREVIEW / ICON                  REQUIRED
ROBOTS                                 REQUIRED
SITEMAP                                REQUIRED
ROUTE / 404 SMOKE                      REQUIRED
ACCESSIBILITY REGRESSION               REQUIRED
PRODUCTION ORIGIN                      REQUIRED FOR PUBLIC LAUNCH
PRODUCTION DEPLOYMENT PROOF            REQUIRED FOR PUBLIC LAUNCH
FINAL RELEASE RECORD                   REQUIRED
```

# `SLICE 08A — PERFORMANCE / LAUNCH BASELINE & RELEASE CONTRACT` ✅ CLOSED

Next:

# `SLICE 08B — Dependency Determinism & Production Baseline`
