# PROJECT STATE — THE BUILD ROOM V2

Status: **PRODUCTION RELEASED / REPUTATION OPERATIONS**.

THE BUILD ROOM V2 is live at `https://em3rc0d-portfolio.vercel.app` and the portfolio-construction phase is closed. Reopen the product surface only for a verified defect, new evidence that changes a claim, or a scoped product/reputation requirement.

## Production authority

- Stable branch: `main`.
- Integration branch: `develop`.
- V2 integration PR: `#21` → `develop`.
- V2 production release PR: `#22` → `main`.
- Runtime production merge: `bed2449a4829be5f44dabed2c6a6b8dbaf0638a4`.
- Vercel production deployment: `dpl_8NkJDjsqYe6gfS1z9PCefiJH4iSZ` — `READY`, target `production`, Git ref `main`, Git SHA exactly `bed2449a4829be5f44dabed2c6a6b8dbaf0638a4`.
- Production origin observation after deployment: HTTP `200`, V2 title/canonical/JSON-LD/navigation/Hero present.
- Vercel grouped runtime-error query after release: no runtime errors found in the observed one-hour window. This is a bounded observation, not a permanent zero-error claim.

## Verification chain

Runtime candidate `0dc983661fc1e7862dc8d8162d6549621c1c0657` closed the hardening defect and passed the full candidate matrix. The documentation-inclusive feature head, the integration merge, the release PR and the production merge were then rechecked rather than inheriting confidence silently.

- Candidate: Portfolio CI `#320` — PASS; V2 Experience Quality `#6` — PASS (`22/22` Playwright); Vercel preview — PASS.
- Documentation-inclusive PR #21 head: Portfolio CI `#323` — PASS; V2 Experience Quality `#9` — PASS; Vercel — PASS.
- Post-integration `develop` merge `d1ba2aac37cdf354dbecaf9d84899b6e33643103`: Portfolio CI `#324` — PASS; V2 Experience Quality `#10` — PASS; Vercel — PASS.
- Release PR #22 exact head: Portfolio CI `#325` — PASS; V2 Experience Quality `#11` — PASS; Vercel preview — PASS.
- Post-merge `main` runtime release `bed2449a4829be5f44dabed2c6a6b8dbaf0638a4`: V2 Experience Quality `#12` — PASS; Vercel production — `READY`.

The V2 quality workflow covers clean install/build, payload budget, responsive/browser/accessibility/scene contracts and route/link/metadata/structured-data/share-image smoke. Exact candidate measurements and limitations live in `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`.

## Public reputation model

Selected flagships:

1. **AutoPulse** — connected systems / public with bounded field evidence.
2. **VIGIA** — geospatial decision support / abstracted; private source and data remain private.
3. **prodAgentic** — AI & workflow automation / public within its frozen evidence scope.

Supporting placements remain evidence-bounded: FinanceSensor and Prompt Machine are R&D signals, CV Engine preserves historical lineage, Infrastructure Site Mapper remains an abstracted professional contribution record, and GPets remains archived supporting work.

## Runtime model

- Next.js App Router + React + TypeScript.
- One lazy direct Three.js Build Core; no downloaded model or texture payload.
- Designed SVG fallback, reduced-motion state, adaptive DPR, offscreen pause, context-loss handling and disposal.
- Consolidated V2 style authority under `src/styles`; V1 runtime history preserved in `deprecated/runtime-v1`.
- Meaningful content remains HTML and works without JavaScript/WebGL.

## Frozen measured candidate signals

Under the deliberately constrained lab profile `390×844 / 150 ms latency / 1.6 Mbps / 4× CPU slowdown / Chromium software renderer`:

- CLS: `0.04398438643988014`.
- LCP: `652 ms`.
- DOM elements: `587`.
- Three.js scene chunk: `131,502` bytes gzip against the `180,000` byte gate.
- Model payload: `0` bytes.
- Texture payload: `0` bytes.

These are laboratory observations, not field Core Web Vitals or universal device claims.

## Current phase

```text
SYSTEM / EVIDENCE / NOTE
        ↓
DISTRIBUTION
        ↓
TARGETED PORTFOLIO ROUTE
        ↓
INSPECTION / TRUST
        ↓
CONTACT / COLLABORATION
```

The next work is reputation distribution and evidence evolution, not adding pages or visual effects for their own sake.

Current authorities: `design/THE_BUILD_ROOM_V2_DESIGN.md`, `arch/THE_BUILD_ROOM_V2_ARCHITECTURE.md`, `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`, and `build/THE_BUILD_ROOM_V2_CLOSEOUT.md`.

The former V1 state remains preserved at `deprecated/runtime-v1/PROJECT_STATE.md` for its historical scope. Production success does not strengthen any underlying system claim beyond its source evidence. `UNKNOWN != PASS` remains permanent.
