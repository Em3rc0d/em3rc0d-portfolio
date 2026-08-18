# Production Portrait Delivery Hotfix

**State:** VERIFIED IN PRODUCTION  
**Surface:** `/about`  
**Production commit:** `cde84a5a087871d0bea796d92850eeb405b3c938`  
**Incident date:** 2026-08-18

## Defect

The public About portrait failed to render through the Next.js image optimizer.

Observed production request:

`/_next/image?url=%2Fmedia%2Feduardo-authentic.webp&w=1920&q=75`

returned:

`400 Bad Request`

## Root cause

The deployed file at:

`public/media/eduardo-authentic.webp`

was labeled and served as `image/webp`, but its bytes were malformed and did not contain the required WebP `RIFF....WEBP` signature.

This means the optimizer failure was not caused by Android, Chromium, Vercel routing, or the display dimensions. Next.js was receiving an invalid source image and correctly refused to optimize it.

## Repair

The production hotfix:

1. removed the malformed repository asset;
2. reconstructed a valid WebP derivative from Eduardo's supplied authentic photograph;
3. exposed it at the stable route `/portrait/eduardo.webp`;
4. wired `/about` directly to that route with `unoptimized` delivery;
5. added release-smoke assertions for status, content type, WebP magic bytes, non-trivial payload size, and About wiring.

The repaired derivative preserves the supplied source dimensions:

`651 × 806`

and is currently delivered as a `37,472` byte WebP.

## Automated verification before merge

PR #7 passed:

- Portfolio CI — PASS
- Release Quality — PASS
- Performance Baseline — PASS
- Vercel preview — READY

The extended release smoke explicitly reported:

- `PASS portrait asset status`
- `PASS portrait asset content type`
- `PASS portrait asset WebP signature`
- `PASS portrait asset payload`
- `PASS About portrait wiring`

## Production verification

After PR #7 merged to `main`, Vercel promoted commit:

`cde84a5a087871d0bea796d92850eeb405b3c938`

to the canonical production alias:

`https://em3rc0d-portfolio.vercel.app`

The canonical route:

`/portrait/eduardo.webp`

was then fetched directly and returned:

- HTTP `200`
- `Content-Type: image/webp`
- `Content-Length: 37472`
- valid `RIFF....WEBP` signature

The canonical `/about` HTML was also fetched and verified to preload/reference:

`/portrait/eduardo.webp`

rather than the previous `/_next/image?url=/media/eduardo-authentic.webp...` path.

## What this proves

This record supports that the specific production failure reported on the About portrait was traced to malformed source bytes, repaired, regression-tested, deployed, and verified on the canonical production domain.

## What this does not prove

This record does not claim that the current photograph or compression level is the final photographic direction for THE BUILD ROOM.

The current route-based base64 reconstruction is also a connector-safe production repair, not the preferred long-term media-storage architecture. When a binary-safe repository upload path is available, the route can be replaced by a normal validated static image asset without changing the public visual contract.

## Current boundary

**Runtime defect:** CLOSED  
**Portrait delivery:** VERIFIED  
**Final photography/art direction:** OPEN TO FUTURE REFINEMENT  
**Long-term binary asset cleanup:** TECHNICAL DEBT, NON-BLOCKING
