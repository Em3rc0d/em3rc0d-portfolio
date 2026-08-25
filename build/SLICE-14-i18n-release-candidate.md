# SLICE 14 — Bilingual Portfolio Release Candidate

State: **RELEASE CANDIDATE / EXACT-HEAD GATES REQUIRED**

## Scope

The public portfolio now uses `next-intl` as the locale-routing and shared UI-message layer.

Public URL contract:

```text
/…      English (default locale, no /en prefix)
/es/…   Spanish
```

The application uses one shared `[locale]` App Router tree. Systems, Evidence, Notes, About and Contact are not maintained as separate English and Spanish page implementations.

## Truth boundary

Locale routing does not own engineering truth. System IDs, evidence IDs, note IDs, slugs, provenance, source coordinates and technical state identifiers remain canonical. Localized public explanations preserve the same claim ceiling.

## Release corrections

The release-candidate pass:

- restored explicit Open Graph image metadata;
- removed locale prefixes from canonical content records so `next-intl` alone owns public locale routing;
- moved AutoPulse, CV Engine and supporting-case localized data resolution to the server boundary to avoid shipping both-language corpora in client bundles;
- preserved interactive flagship behavior while passing only the active locale record to client components;
- made supporting cases server-rendered with only their required evidence records;
- added Spanish-only density corrections for measured AutoPulse and GPets desktop-frame overflow without hiding content or widening the frame contract;
- removed the temporary migration scripts/workflows after their verified commit.

## Gate

Do not merge PR #20 until the exact final head passes:

```text
Portfolio CI
Accessibility Quality
Dependency Reproducibility
Release Quality
Performance Baseline
Frame Discipline
Frame Visual Proof
Reputation Visual Proof
```

Vercel preview deployment is currently subject to the account's daily Hobby deployment quota. That platform quota must not be represented as an application-quality failure, but production promotion still waits for the repository release gates and a deployable production revision.
