# PROJECT STATE — THE BUILD ROOM V2

Status: **RELEASE CANDIDATE VERIFIED / INTEGRATION PENDING**. This is not yet a production-release claim.

- Stable production: `main`; integration: `develop`.
- Execution branch: `feat/the-build-room-v2`, recovered from develop with current main merged into its ancestry.
- Pull request: `#21` → `develop`.
- Complete V2 Home, systems directory, eight system pages, Notes, About, Contact and Evidence surfaces implemented.
- Flagships: AutoPulse, VIGIA, prodAgentic. Other placements and evidence boundaries are frozen in the single design inventory.
- Direct lazy Three.js Build Core with designed static fallback, reduced-motion behavior, adaptive DPR, offscreen pause, context-loss handling and disposal. No downloaded model/texture assets.
- Runtime cascade consolidated; historical authority remains in `deprecated/runtime-v1` and existing evidence.
- Runtime candidate `0dc983661fc1e7862dc8d8162d6549621c1c0657` passed Portfolio CI `#320`, V2 Experience Quality `#6` (`22/22` Playwright), the payload gate, complete release smoke and Vercel preview build.
- Successful constrained lab observation: CLS `0.04398438643988014`, LCP `652 ms`, DOM `587` at 390×844 / 150 ms latency / 1.6 Mbps / 4× CPU slowdown. These are lab observations, not field Core Web Vitals.
- Release smoke verified `55` sitemap routes, `206` internal targets, metadata, JSON-LD, robots, 404 behavior and four 1200×630 PNG share images.
- Manual review of retained green-run desktop, mobile, short-height, VIGIA and human-section screenshots found no material release-blocking visual defect.

Current authorities: `design/THE_BUILD_ROOM_V2_DESIGN.md`, `arch/THE_BUILD_ROOM_V2_ARCHITECTURE.md`, `evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md`, `build/THE_BUILD_ROOM_V2_CLOSEOUT.md`.

Next authority transition: the documentation-inclusive PR head must remain green, then PR #21 may merge to `develop`. A separate green release PR must promote `develop` to `main`. Production is only closed after the deployed `main` revision is independently observed.

The former state file is preserved at `deprecated/runtime-v1/PROJECT_STATE.md` for its historical scope.
