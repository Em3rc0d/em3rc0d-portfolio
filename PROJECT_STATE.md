# PROJECT STATE — THE BUILD ROOM V2

Status: **PRODUCTION RELEASED / REPUTATION OPERATIONS**.

THE BUILD ROOM V2 is live at `https://em3rc0d-portfolio.vercel.app` and the portfolio-construction phase is closed. Reopen the product surface only for a verified defect, new evidence that changes a claim, or a scoped product/reputation requirement.

## Production authority

- Stable branch: `main`.
- Integration branch: `develop`.
- Original V2 integration PR: `#21` → `develop`.
- Original V2 production release PR: `#22` → `main`.
- Original V2 production merge: `bed2449a4829be5f44dabed2c6a6b8dbaf0638a4` — historical release authority for the first V2 production closeout.
- **Current source authority is resolved from the actual GitHub `main` head.**
- **Current deployment authority is resolved from the latest Vercel deployment with `target=production` and Git ref `main`.**
- This file does **not** permanently pin either value as “current”; merging a documentation update changes `main` and may trigger a new production deployment.
- Exact SHAs, deployment IDs and quality-run IDs below are therefore **observed snapshots**, not perpetual aliases for current state.

### Latest observed production snapshot

Observed on 2026-10-07 after DOGFOOD-002 promotion:

- GitHub source: `main@5a0da2dd633d47530e8d88150428e717584480d6`.
- Vercel production: `dpl_GLF9anbhs8uKatu92iBMdoyYFdbs` — `READY`, target `production`, Git ref `main`, Git SHA `5a0da2dd633d47530e8d88150428e717584480d6`.
- Promotion inputs were exact-head green before merge:
  - PR #39 final head `f7deb278377ba7e57eb23bd425e787262ad44ccb`: Portfolio CI + V2 Experience Quality PASS.
  - PR #40 rebased final head `82d52ae1a5eaead9f80cfb739bd7164ac1131bef`: Portfolio CI + V2 Experience Quality PASS.
- Production origin had already been observed returning HTTP `200` during the baseline audit.
- Earlier release proofs and snapshots remain historical exact-state evidence for their recorded revisions. They must not be silently reinterpreted as proof for later production commits.

## Verification chain

Runtime candidate `0dc983661fc1e7862dc8d8162d6549621c1c0657` closed the hardening defect and passed the full candidate matrix. The documentation-inclusive feature head, the integration merge, the release PR and the production merge were then rechecked rather than inheriting confidence silently.

- Candidate: Portfolio CI `#320` — PASS; V2 Experience Quality `#6` — PASS (`22/22` Playwright); Vercel preview — PASS.
- Documentation-inclusive PR #21 head: Portfolio CI `#323` — PASS; V2 Experience Quality `#9` — PASS; Vercel — PASS.
- Post-integration `develop` merge `d1ba2aac37cdf354dbecaf9d84899b6e33643103`: Portfolio CI `#324` — PASS; V2 Experience Quality `#10` — PASS; Vercel — PASS.
- Release PR #22 exact head: Portfolio CI `#325` — PASS; V2 Experience Quality `#11` — PASS; Vercel preview — PASS.
- Post-merge `main` runtime release `bed2449a4829be5f44dabed2c6a6b8dbaf0638a4`: V2 Experience Quality `#12` — PASS; Vercel production — `READY`.

The V2 quality workflow covers clean install/build, payload budget, responsive/browser/accessibility/scene contracts and route/link/metadata/structured-data/share-image smoke. Exact candidate measurements and limitations live in `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`.

## Public reputation model

Current runtime flagship selection is derived from `systemCases.filter(system => system.placement === "FLAGSHIP")`.

Runtime flagship selection is derived from code, not from a pinned documentation SHA. The DOGFOOD-002 audit observed the following current set, and the selector remains `systemCases.filter(system => system.placement === "FLAGSHIP")`:

1. **PlacaClara** — vehicle intelligence / live public product with bounded provider and report-coverage claims.
2. **AutoPulse** — connected systems / public with bounded physical field evidence.
3. **ECHO** — applied AI / acoustic-event system with certified MK0 scope and fail-closed model/data gates.

Current supporting placements include TALOS, CV Engine, VIGIA and prodAgentic. FinanceSensor and Prompt Machine remain R&D signals; Infrastructure Site Mapper remains an abstracted professional contribution record; GPets remains archived supporting work.

This supersedes the original V2 flagship set (AutoPulse, VIGIA, prodAgentic) as **current portfolio routing** only. Historical release proof that names the earlier set remains valid for its recorded revision and must not be rewritten as if the later selection existed then.

## Runtime model

- Next.js App Router + React + TypeScript.
- One lazy direct Three.js Build Core; no downloaded model or texture payload.
- Designed SVG fallback, reduced-motion state, adaptive DPR, offscreen pause, context-loss handling and disposal.
- Consolidated V2 style authority under `src/styles`; V1 runtime history preserved in `deprecated/runtime-v1`.
- Meaningful content remains HTML and works without JavaScript/WebGL.

## Frozen measured candidate signals

The measurements below belong to the original verified V2 candidate/release lineage documented in `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`. They are preserved as historical exact-state evidence and are **not automatically re-attributed to current production `514e9ac...`**.

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

Current product/runtime authority starts with the actual `main` revision and live deployment identity; this file records routing rules and bounded observations rather than pretending its own embedded SHA can remain permanently current. Historical V2 design/release evidence remains in `design/THE_BUILD_ROOM_V2_DESIGN.md`, `arch/THE_BUILD_ROOM_V2_ARCHITECTURE.md`, `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`, and `build/THE_BUILD_ROOM_V2_CLOSEOUT.md`, each bounded to its recorded revision.

The former V1 state remains preserved at `deprecated/runtime-v1/PROJECT_STATE.md` for its historical scope. Production success does not strengthen any underlying system claim beyond its source evidence. `UNKNOWN != PASS` remains permanent.
