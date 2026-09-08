# THE BUILD ROOM V2 — Release proof

Status: verification in progress. UNKNOWN is not PASS.

## Verified before candidate submission

- Repository authority and eight-project inventory recovered; publicability scoped in the design authority.
- Local production build succeeded with self-hosted fonts; remote Google font dependency removed.
- First desktop browser review: identity, value proposition, both CTA paths and AutoPulse depth rendered coherently. Static fallback displayed when WebGL was unavailable.
- Compiled incremental Three.js chunk: 131,502 bytes gzip; procedural geometry; model and texture download payload 0.

## Candidate gates

Hosted CI must verify Node 22 clean install, lock stability, lint, TypeScript, production build, payload budget, Playwright interaction/responsive/accessibility/scene checks, complete sitemap route/link/SEO/OG smoke. Detailed results and exact revision will be added after execution.

Measurements are lab observations, not real-user Core Web Vitals. No field INP or mobile hardware claim is made. External project suites were not rerun by the portfolio task. Published project test receipts remain attributed to their source.

## Gate migration

Retired workflow/source files are preserved at `deprecated/runtime-v1/verification`. Their selectors described the replaced V1 DOM.

| Earlier gate | V2 successor |
|---|---|
| Accessibility quality / visual / keyboard | Axe WCAG 2.2 AA scans at 390 and 1440; keyboard, menu, disclosures and no-JS navigation |
| Frame discipline / frame and material visual proof | Eight-width route matrix, three short desktop heights, text enlargement/reflow and attached visual captures |
| AutoPulse / CV / evidence / reputation / public surfaces | Generic system template, all sitemap routes and explicit representative browser paths |
| Performance baseline / budget | Compiled payload gate, live draw/triangle/DPR counters, offscreen pause, context-loss and lab resource/CLS capture |
| Release quality / structured data | All sitemap routes, internal link/anchor crawl, canonical/social/JSON-LD/robots/404 and PNG dimensions |
| Dependency reproducibility | Node 22 npm ci plus lockfile diff check; no automated lockfile mutation |

No legacy evidence artifact is deleted. Screenshots are review artifacts, not an automatic aesthetic certificate; V2 has a new visual baseline.
