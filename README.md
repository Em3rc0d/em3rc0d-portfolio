# THE BUILD ROOM V2

Eduardo Merino’s portfolio: a clear introduction to the problems he solves, three selected systems, and optional engineering depth with inspectable evidence.

**Stack:** Next.js App Router, React, TypeScript, direct Three.js. Node **22.x**, npm lockfile. Server-rendered content, locally served Instrument Sans and IBM Plex Mono, one lazy decorative renderer and a complete static fallback.

## Run

```sh
npm ci
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL=https://em3rc0d-portfolio.vercel.app` for release builds. Without an origin, canonical URLs and sitemap entries are intentionally omitted.

```sh
npm run lint
npm run typecheck
npm run build
npm run test:budget
npx playwright install chromium
npm test
# With the production server running:
npm run test:release
```

## Current authority

- [Project state](PROJECT_STATE.md)
- [Design, scored inventory and publicability](design/THE_BUILD_ROOM_V2_DESIGN.md)
- [Architecture and performance contracts](arch/THE_BUILD_ROOM_V2_ARCHITECTURE.md)
- [Release proof](evidence/THE_BUILD_ROOM_V2_RELEASE_PROOF.md)
- [Closeout](build/THE_BUILD_ROOM_V2_CLOSEOUT.md)

Runtime content lives in `src/content`; styling has a single ordered entry at `src/styles/index.css`. Historical CSS, components and retired DOM-specific verification remain in `deprecated/runtime-v1`, excluded from the production graph. Earlier evidence is preserved with its original revision and scope.

## Release policy

`feat/the-build-room-v2` → reviewed green PR → `develop` → green release PR → `main`. Preserve the existing Vercel Git integration and production origin. Unknown checks never count as passes.

No invented metrics, simulated runtime screenshots, private source disclosure, fabricated testimonials or unverified production claims. Conceptual graphics are labelled. Source inspection and published test receipts are distinguished from fresh execution.
