# Em3rc0d identity discoverability — 2026-10-27

## Scope and goal

Make the already public identity of Eduardo Merino / Em3rc0d easier for crawlers and humans to associate. This is an identity and discoverability change, **not** a claim of reputation, Google indexing, AI recognition, or verified search ranking.

### Inspected baseline

- GitHub profile: https://github.com/Em3rc0d and existing profile README already connect the legal display name and handle.
- Portfolio: https://em3rc0d-portfolio.vercel.app, backed by this repository.
- Profile Page markup already exposes a Schema.org `Person`, `sameAs` for GitHub/LinkedIn, canonical/hreflang, `robots.ts` and `sitemap.ts`.
- The home metadata and Person schema did not explicitly identify the handle as an alternate name.
- Vercel's latest inspected production deployment was `READY` on `main` at `772ddffb74e43cb8588cab6a71c6c1132bac3218`; that is **not** proof of anonymous HTTP 200 or crawling.
- The Vercel project reports authentication protection for non-custom URLs. This alone does not prove the stable production alias is gated: check the production domain anonymously before changing any security settings.
- Search engine results were not reliably available in the initial external lookup. There is no verified Google index count yet.

## Implementation

1. Represent the same name/handle in structured data, with `name: Eduardo Merino` and `alternateName: [Em3rc0d, Emercod]`; preserve `sameAs` to already known official accounts.
2. Include the handle and display name in home page titles and descriptions in EN/ES/PT.
3. Mention the handle in visible About-page copy across the three locales without changing layout or adding claims.
4. Add test coverage for identity metadata, JSON-LD and visible semantic text.

## Production release / Google Search Console handoff

1. Review and merge only after checks pass and the diffs meet publication criteria.
2. In an unauthenticated browser or verified HTTP client, test `/`, `/robots.txt`, `/sitemap.xml` and `/about` at the stable production alias. Capture final HTTP code, any redirects/login and the resulting source. The site must return public `200` HTML; do **not** turn off preview security reflexively.
3. Inspect `NEXT_PUBLIC_SITE_URL` in Vercel production (expected `https://em3rc0d-portfolio.vercel.app`). Without this variable, the sitemap intentionally returns an empty list and canonical URLs are omitted.
4. Confirm `robots.txt` is not blocking crawlers, sitemap has the correct absolute URLs, canonicals match and there is no `noindex` on intended public pages.
5. In Google Search Console, verify ownership of the URL-prefix property `https://em3rc0d-portfolio.vercel.app/` using the verification method offered by Google. Submit `https://em3rc0d-portfolio.vercel.app/sitemap.xml`, inspect the home and About URLs, and request indexing if eligible. **Do not add a Google verification token to source until one is actually issued to the owner.**
6. Validate discovery over time using Search Console indexing status, impressions and actual search queries (Em3rc0d, Emercod, Eduardo Merino Em3rc0d). Check results independently in multiple search engines/AI systems without supplying the answer in the prompt.

## Gate

- Pass: metadata and HTML identity contract tests, correct and publicly reachable production URL, inspected sitemap and bot access, verified Search Console ownership/submission.
- Unknown: current bot HTTP access, production environment variable, indexing status, Search Console ownership, external mentions. **UNKNOWN != PASS**.
- Never interpret publication, a `200`, schema markup, or sitemap submission as guaranteed indexing, AI recognition, fame, or third-party endorsement.
