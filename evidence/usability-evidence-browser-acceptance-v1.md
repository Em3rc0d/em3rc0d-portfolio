# Usability & Evidence Browser Acceptance v1

**State:** CONDITIONAL
**Target branch:** `develop`
**Production promotion:** NOT AUTHORIZED BY THIS RECORD

## Trigger

Browser review of Visual Material v2 identified two observable defects:

- the About portrait looked visibly low-resolution at desktop display size;
- individual evidence records made repository path and reviewed blob SHA too prominent for a public portfolio surface.

The same review also requested more meaningful interaction and easier public comprehension.

## Implemented correction

### Portrait

`/about` now points to:

`public/media/eduardo-authentic.webp`

The source is a substantially higher-quality WebP derived from the supplied real photograph and is delivered through the existing responsive Next.js image path.

### Evidence comprehension

Evidence records now expose this hierarchy by default:

`TITLE → WHAT THIS PROVES → STATUS → WHY THIS RECORD EXISTS → WHAT THIS DOES NOT PROVE → SOURCES`

Forensic metadata is retained under:

`TECHNICAL PROVENANCE`

and only opens when the visitor requests it.

This means the reviewed blob SHA remains available for reproducibility without forcing a casual visitor to understand Git object identity.

### Meaningful interaction

Native progressive disclosures were added for:

- evidence-state explanation;
- technical provenance;
- related engineering references;
- evidence-library reading guidance.

These interactions use native semantic elements and therefore retain keyboard behavior without introducing a custom modal or interaction framework.

## Pre-merge automated evidence

PR #5 / head `bbade0ee1915b0982da2e4a6eea6806eba41c182` passed:

- Portfolio CI — PASS
- Release Quality — PASS
- Performance Baseline — PASS
- Vercel preview — READY

The release gate initially detected a changed evidence page-title contract. The page's visible H1 remained human-readable, while metadata was corrected back to stable evidence-ID identity. The rerun then passed.

## Performance observations

Frozen performance budgets passed across all 14 route/profile measurements.

Notable DOM-budget observations from the correction preview:

- Home: `311 / 320`
- Evidence Library: `367 / 410`
- About: `199 / 215`

This creates an explicit constraint for the next interaction pass: Home is too close to its DOM ceiling for additive decorative interaction. Future interaction should reuse, replace or transform existing elements.

## What this record proves

This record supports that the browser-feedback correction was implemented without breaking the pre-merge CI, release-quality, Vercel or frozen performance gates.

## What this record does not prove

It does not yet prove:

- that the new portrait crop is subjectively final at every viewport;
- that a human visitor now understands every Evidence record without friction;
- that the complete site's interaction density is optimal;
- the post-merge Accessibility Quality result;
- production readiness.

Those remain browser/user acceptance gates.

## Current decision

The correction is appropriate for `develop`, not yet a reason to promote `develop → main`.

**Next acceptance question:**

> Does the new hierarchy let a visitor understand the proof before choosing whether to inspect technical provenance?
