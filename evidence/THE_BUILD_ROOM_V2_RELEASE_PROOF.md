# THE BUILD ROOM V2 — Release proof

Status: **RELEASE CANDIDATE VERIFIED FOR INTEGRATION**. This is not yet a production-release claim.

## Candidate authority

- Runtime candidate revision: `0dc983661fc1e7862dc8d8162d6549621c1c0657` on `feat/the-build-room-v2`.
- Pull request: `#21` → `develop`.
- Portfolio CI: run `#320` (`34281253466`) — **PASS**.
- V2 Experience Quality: run `#6` (`34281253458`) — **PASS**.
- Vercel preview status for the candidate revision — **success**.
- Exact quality artifact: `build-room-v2-quality`, artifact ID `10077734336`, SHA-256 `3ecbf8c06c74626e7066b393660b404f1e95d8386009aa61034d081352b86103`.

Documentation-only commits after this runtime candidate must pass the same hosted gates before integration. They do not silently expand the runtime evidence below.

## What the candidate proves

### Clean build and dependency state

Hosted Node `22.23.2` / npm `10.9.8` executed a clean `npm ci` with a stable lockfile and reported `0` dependency vulnerabilities at that run. Next.js `16.3.1` production build compiled successfully and generated the complete V2 route graph used by the release checks.

### Visitor, responsive and accessibility contracts

Playwright completed **22/22 tests** successfully. The run covered:

- identity → systems → optional engineering depth → contact visitor path;
- catalog search/count/empty-state recovery;
- responsive composition at `320`, `390`, `430`, `768`, `1024`, `1280`, `1440`, and `1920` px;
- short desktop heights `600`, `700`, and `800` px;
- automated WCAG 2.2 AA-tagged Axe scans at `390` and `1440` px;
- keyboard skip navigation, mobile menu and disclosures;
- `200%` text enlargement and `400%` equivalent reflow coverage;
- meaningful no-JavaScript content and navigation;
- reduced motion as a static first-class state;
- WebGL-unavailable fallback and WebGL context-loss recovery;
- one renderer, offscreen pause and adaptive mobile DPR.

These are automated checks within the tested browser/runtime. They do not substitute for every assistive-technology combination.

### Three.js and payload budget

Measured compiled output:

- Three.js scene chunk: `131,502` bytes gzip against the `180,000` byte candidate limit;
- model download payload: `0` bytes;
- texture download payload: `0` bytes;
- scene geometry: `27 procedural cuboids; shared geometry; 3 opaque materials`;
- total compiled JS observed by the budget script: `316,730` bytes gzip;
- representative renderer evidence: `324` triangles, `27` draw calls and DPR `1` in the captured run.

The scene remains decorative. A source-equivalent SVG composition exists underneath and meaningful portfolio content remains HTML.

### Lab performance observation

The deliberately constrained lab profile was:

`Chromium software renderer · 390×844 · 150 ms latency · 1.6 Mbps download · 4× CPU slowdown`

Observed in the successful run:

- lab LCP: `652 ms`;
- lab CLS: `0.04398438643988014`;
- DOM elements: `587`.

The earlier candidate exposed a real mobile layout instability (`CLS 0.13854355700281026`). The gate was **not relaxed**. The mobile Hero was given deterministic line geometry and reserved copy space; the succeeding candidate reduced the measured CLS below the `0.1` contract.

Long-task samples were also retained in the artifact. These measurements are laboratory observations, **not field Core Web Vitals**, and no field INP or real-device performance claim is made.

### Route, link, SEO and share-image release smoke

The previously skipped release step executed after the browser gate became green:

`PASS 55 routes, 206 internal targets, metadata, JSON-LD, robots, 404s and 4 PNG share images`

The four checked share images are `1200×630` PNGs for the portfolio plus AutoPulse, VIGIA and prodAgentic. External links were inventoried; the smoke does not pretend that LinkedIn or every external service is automatable/reachable from CI.

### Visual acceptance

The exact successful run retained screenshots across the responsive matrix. Manual inspection of the same artifact confirmed:

- the desktop Home first frame keeps identity, proposition, both CTA paths and the Build Core as one coherent thought;
- the `1440×600` short-height frame preserves both Hero actions without clipping;
- the `390` mobile Home uses the deliberate four-line Hero composition and maintains a continuous readable hierarchy through systems, professional proof, notes, human context and conversion;
- VIGIA remains understandable in both `390` and `1440` captures without exposing private source or requiring its engineering disclosures to understand the case;
- the human section loads the authentic portfolio portrait rather than a placeholder;
- the Three.js visual has a designed static representation and does not carry exclusive meaning.

This is a release-candidate visual baseline, not a permanent aesthetic certificate. Future changes require renewed proof.

## Truth and scope boundaries

- Repository authority and the eight-project reputation inventory were recovered; placement/publicability are frozen in `design/THE_BUILD_ROOM_V2_DESIGN.md`.
- AutoPulse, VIGIA and prodAgentic are selected flagships for breadth, not as a claim that every underlying project is production-complete.
- VIGIA remains `ABSTRACTED`; private source, data, topology and receipts are not published.
- FinanceSensor remains bounded by its unresolved physical/release gates; no financial records are exposed.
- CV Engine historical portfolio evidence is distinguished from its current rebuild.
- Prompt Machine packaging/product work does not become a certification or sales claim.
- External project suites were not rerun by this portfolio release. Published project receipts remain attributed to their source revisions.
- No analytics platform was introduced, so no conversion-rate or visitor-behavior claim is made.

## Gate migration

Retired workflow/source files are preserved at `deprecated/runtime-v1/verification`. Their selectors described the replaced V1 DOM.

| Earlier gate | V2 successor |
|---|---|
| Accessibility quality / visual / keyboard | Axe WCAG 2.2 AA scans at 390 and 1440; keyboard, menu, disclosures and no-JS navigation |
| Frame discipline / frame and material visual proof | Eight-width route matrix, three short desktop heights, text enlargement/reflow and retained visual captures |
| AutoPulse / CV / evidence / reputation / public surfaces | Generic system template, all sitemap routes and explicit representative browser paths |
| Performance baseline / budget | Compiled payload gate, live draw/triangle/DPR counters, offscreen pause, context loss and constrained lab resource/CLS capture |
| Release quality / structured data | All sitemap routes, internal link/anchor crawl, canonical/social/JSON-LD/robots/404 and PNG dimensions |
| Dependency reproducibility | Node 22 `npm ci` plus lockfile diff check; no automated lockfile mutation |

## Promotion rule

The candidate may proceed to `develop` only while the current documentation-inclusive PR head remains green. Production remains `main`; successful integration does not by itself constitute production verification. After integration, the release PR to `main` must pass the same gates, and production state is recorded only after the deployed main revision is independently observed.
