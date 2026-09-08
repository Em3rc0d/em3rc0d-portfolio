# THE BUILD ROOM V2 — Runtime authority

Status: IMPLEMENTATION CONTRACT · 2026-09-08

## Structure

Keep Next.js 16 / React 19 / TypeScript and npm lockfile. Server components render content. Client boundaries: navigation menu, contact brief helper, filtering, scene adapter. No database, CMS, new state library or analytics vendor. Existing motion dependency remains installed but is no longer needed in the V2 route graph.

Split profile/capabilities/navigation/professional records and one file per system. Typed case data separates identity, problem, build, current state, ownership, publicability, architecture, decisions, limitations, evidence, media and links. Existing evidence and notes registries retain their URLs. Source access is explicit; private source never generates an outbound URL. Historical evidence remains scoped to its reviewed blobs.

Root layout owns one header, footer and optional persistent PortfolioScene host. A lightweight adapter finds the active scene slot after navigation and imports Three.js only when visible and motion preferences allow it. At most one canvas exists. Per-system conceptual graphics remain lightweight SVG/HTML and are labeled conceptual, never runtime screenshots. A procedural modular geometry is used instead of downloading a GLB: zero model/texture requests, no asset decoder, shared geometry/materials, explicit disposal. GLB/glTF remains the delivery format if externally authored assets become necessary.

Scene responsibilities: controller, camera, Build Core, motion policy and quality governor. Start BALANCED; mobile caps DPR at 1.25 and desktop at 1.5. No post-processing, textures, realtime shadows or continuous idle spin. Render on interaction/assembly; pause when offscreen/hidden. Reduce quality on sustained expensive frames, ultimately use STATIC. Context loss uses the already-visible static fallback. Destroy listeners, observers, RAF, geometry, materials and renderer on disposal. Reduced-motion changes are observed live.

## Budgets

Three.js incremental gzip target <180KB; total initial 3D <1.2MB desktop / <700KB mobile; geometry <70k triangles mobile and <150k desktop; <80 calls; no shadow lights. Initial model and texture payload: 0. If JS exceeds target, inspect tree-shaking and simplify before any budget exception. LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 are goals requiring representative measurements. Existing structural performance gates must be reconciled with measured V2 costs; never broaden merely to turn a failing check green.

## Release and scope

V2 branch derives from develop with current main integrated. PR targets develop. Preserve production origin configuration (`NEXT_PUBLIC_SITE_URL`) and Vercel hosting. A separate replacement hosted Site is unnecessary. Publication/integration only after applicable CI and visual gates pass. Report release candidate separately from production release.

Old global CSS and replaced component implementations move to `deprecated/runtime-v1/`; they are excluded from TypeScript/ESLint and never imported. V2 CSS has one ordered entrypoint with tokens/reset/typography/layout/motion/components. Tests targeting superseded DOM are migrated to equivalent visitor behaviors, not disabled to avoid failure. Existing content/route/source invariants remain.

Reference implementation guidance: [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading), [Three.js rendering on demand](https://threejs.org/manual/en/rendering-on-demand.html), [Three.js cleanup](https://threejs.org/manual/en/cleanup.html). These justify lifecycle behavior, not portfolio product claims.
