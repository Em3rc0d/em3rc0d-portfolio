# SLICE 11 — Material Reality Pass

**State:** IMPLEMENTED / PENDING BROWSER VISUAL ACCEPTANCE  
**Branch:** `agent/material-reality-pass`  
**Trigger:** agnostic browser review of Home + AutoPulse  
**Date:** 2026-08-18

## Why this slice exists

The Visual Material v2 foundation was visually coherent but two important surfaces remained too abstract:

1. the Home signature assembly looked like five floating dark plates whose meaning required explanation;
2. the AutoPulse case opened with a second conceptual diagram, so entering a real flagship system did not increase the visitor's contact with real implementation material.

The correction is not another redesign. It preserves the existing Carbon/Paper language, typography, red activation, mechanical behavior, navigation, system story and evidence architecture.

The responsibility of this slice is narrower:

> **Make the engineering visible by increasing semantic clarity on Home and material reality inside AutoPulse.**

## Home — signature assembly v2

The five existing plates are preserved, but each plate now communicates a concrete responsibility:

| Layer | Public semantic trace |
| --- | --- |
| INTERFACE | `INPUT → UI → OUTPUT` |
| LOGIC | `CAPTURE → VALIDATE → PERSIST` |
| DATA | `SESSION_ID · TIME · STATE` |
| INFRASTRUCTURE | `CLIENT → API → SERVICE → STORE` |
| EVIDENCE | `CLAIM → SOURCE → LIMIT` |

The visual patterns are implemented with CSS rather than new decorative elements so Home does not spend additional DOM budget on ornament.

The Evidence plate deliberately shifts toward the Paper material while the other responsibilities remain Carbon/Graphite. This previews the larger Carbon → Paper trust transition already used by THE BUILD ROOM.

The core state now reads:

`SYSTEM / 05 RESPONSIBILITIES / 01 WHOLE`

The intended mechanical meaning is explicit:

`SEPARATE → ALIGN → ENGAGE → LOCK`

The metaphor is no longer "five mysterious layers." It is that a working system contains different responsibilities that must align without becoming the same responsibility.

## AutoPulse — public product specimen

### Source inspection

The current `Em3rc0d/autoPulse` repository was inspected for public screenshot/image assets. No current PNG/JPG/WebP product capture or field-test image was found in the repository.

THE BUILD ROOM must not manufacture a screenshot merely to make a case look more complete.

Instead, the current implementation source was inspected at:

`mobile-app/src/screens/live/LiveSessionScreen.tsx`

The current source exposes these real UI surfaces and labels:

- `Live Telemetry`
- `ECU Direct · Session ...`
- session timer
- `LIVE · ECU DATA`
- `Engine RPM` / `rpm`
- `Vehicle Speed` / `km/h`
- `Engine Coolant` / `°C`
- `Control Voltage` / `V`
- `RPM History`
- `Waiting for RPM data...`
- `Stop Session`

It also defines the current interface material around `#0e1417`, `#1a2227`, `#1f2937`, `#374151`, live green `#10b981`, chart green `#4ade80`, and red `#ef4444`.

### Public representation rule

The AutoPulse cover now uses a **source-true public UI specimen**, not a claimed screenshot.

It is explicitly labeled:

`CURRENT IMPLEMENTATION / PUBLIC SPECIMEN`

and states that it was reconstructed from the current React Native `LiveSessionScreen` source.

The specimen deliberately uses `—` for runtime metric values and includes:

`REAL UI STATE / VALUES OMITTED`

because no captured physical field session is being represented.

This protects the evidence contract:

- interface structure may be shown when current source supports it;
- runtime data must not be invented;
- a reconstruction must not be presented as a screenshot;
- future genuine field photography/screenshots may replace or augment the specimen when captured.

The previous AP concentric-orbit visualization has been removed from the cover. The AutoPulse system path remains, but as secondary context beneath the product surface.

## Abstraction gradient

This slice freezes a new public-experience rule:

```text
HOME        → concept / engineering identity
SYSTEMS     → real system selection
CASE        → implementation material
EVIDENCE    → proof / limitation / provenance
```

Entering a case study must increase concreteness. A flagship case should not simply replace one metaphor with another metaphor.

## Performance boundary

The existing structural budgets were not relaxed.

PR performance gate after implementation:

- Home: `311 / 320` DOM elements
- AutoPulse: `505 / 560` DOM elements
- Home transfer: `348410 / 390000` bytes
- AutoPulse transfer: `367335 / 410000` bytes

This is intentional. Home's semantic improvement is primarily CSS/data-attribute driven because its DOM budget is already tight.

## Verification before visual acceptance

PR #9 pre-merge gates:

- Portfolio CI — PASS
- Release Quality — PASS
- Performance Baseline — PASS
- Vercel preview — READY

## Acceptance gate

The slice is not visually frozen until the `develop` visual-proof workflows produce and we inspect at minimum:

- Home desktop settled state
- Home mobile settled state
- AutoPulse cover desktop
- AutoPulse cover mobile

Acceptance questions:

1. Can a new visitor understand what the five Home responsibilities are without Jett explaining them?
2. Does the Home assembly still feel like one coherent engineered object rather than five cards?
3. Does AutoPulse now feel materially more real than Home?
4. Is it obvious that the AutoPulse specimen is a current-source reconstruction, not a field screenshot?
5. Is the real product UI allowed to have its own material language without visually breaking THE BUILD ROOM?
6. Does mobile preserve comprehension without shrinking technical text into decoration?

## Future evidence opportunity

The strongest future AutoPulse visual remains a genuine field artifact:

- real AutoPulse live-session screenshot/capture;
- OBD device in use;
- Eduardo performing an actual field session;
- captured telemetry/recovery sequence tied to a verification record.

Those assets should be added only when they exist.

## Slice boundary

**Home signature semantics:** IMPLEMENTED  
**AutoPulse source-true product specimen:** IMPLEMENTED  
**Fake screenshot generation:** REJECTED  
**Performance budget relaxation:** REJECTED  
**Desktop/mobile browser visual acceptance:** PENDING  
**Production promotion:** NOT AUTHORIZED BY THIS SLICE
