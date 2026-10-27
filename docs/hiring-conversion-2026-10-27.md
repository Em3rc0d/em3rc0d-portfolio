# Em3rc0d — hiring conversion, 2026-10-27

## Desired outcomes
1. A recruiter can identify **Em3rc0d = Eduardo Merino**, inspect relevant public engineering evidence, view a CV and contact the developer about an engineering role.
2. A prospective client can identify the same person, inspect product/system evidence and contact him about a well-scoped project.
3. Attribution and trust remain bounded: no invented testimonials, revenue, customer counts, hiring availability, experience claims or production metrics.

## Changes
- Put the public handle + professional name in the **visible** home hero eyebrow for EN / ES / PT, instead of relying on search snippets and metadata.
- Replace the generic third hero call to action with a role-oriented contact path, retaining `Explore the work` and `Download CV`.
- Segment the existing Contact page into **engineering role** and **software project** inquiry intents. Both open the user's configured email client with distinct subject lines; no backend, tracking, storage or automated outreach is added.
- Keep direct email, GitHub, LinkedIn and CV links as accessible fallbacks.
- Preserve current flagship placements and their evidence boundaries.
- Add multilingual hiring-conversion browser tests and update the prior visitor-path expectation.

## Readiness and boundaries
- The identity SEO changes live in separate draft PR #43; this PR adds **conversion intent** independently and targets production `main`. Both are needed for a consistent public identity.
- This PR does **not** assert immediate availability for any engagement.
- Do not create client endorsements, screenshots or metrics without evidence.
- No changes to existing Vercel deployment protection.
- No promise of search indexation, search placement, AI assistant recognition or paid engagement.

## Release acceptance
- Exact-head lint, TypeScript, build, budget and E2E test gate pass; route/link and accessibility regression remain green.
- At desktop and mobile widths, visitors can find a job inquiry CTA and two clearly separated email destinations on `/contact`, `/es/contact`, `/pt/contact`.
- No new form, server endpoint, unnecessary data collection, analytics or paid dependencies.

## Measurement after public release
- Track qualified recruiter or company messages and meetings (weekly manual ledger initially). Distinguish contacts from interviews, proposals and paid conversions.
- Track public search discoveries of `Em3rc0d` and associated name in Search Console after verifying ownership (no assumptions based solely on `site:` operator).
- 30-day review: if visibility grows without qualified contacts, review audience distribution and targeting first, not another homepage redesign.
