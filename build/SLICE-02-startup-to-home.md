# BUILD — SLICE 02 · Startup → Home

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Core CI:** GitHub Actions `Portfolio CI` run `31958313205` — success  
**Visual proof:** GitHub Actions `Visual Proof` run `31958437914` — success

## 1. Slice responsibility

SLICE 02 had one critical responsibility:

> **The startup must not disappear before a conventional landing page. The startup must reorganize into the Home.**

This is the first implementation proof of Visual Direction v2.

## 2. Implemented behavior

The Home now contains a client-side startup/hero system built with Motion shared-layout primitives.

Primary sequence:

```text
BUILD ROOM shell
    ↓
CHARGING SYSTEM PARAMETERS
    ↓
IDENTITY / SYSTEMS / EVIDENCE / INTERFACE
    ↓
segmented pit-style rail engages
    ↓
SYSTEM READY
    ↓
shared parameter rail transfers into final Home
    ↓
Hero / navigation / process structure resolves
```

No fake RPM, speed, temperature, or vehicle telemetry is used.

## 3. Motion implementation

Implemented in:

`src/components/home/startup-hero.tsx`

Core Motion concepts:

- `LayoutGroup` for the full entry system;
- shared `layoutId="parameter-rail"` between startup and settled Home;
- shared `layoutId="system-ready-state"` for state continuity;
- `AnimatePresence` for startup environment release;
- staggered parameter locks;
- segmented rail activation;
- Hero/nav/process reveal after system readiness;
- spring/damped transfer for the retained rail.

The transition therefore retains a piece of the startup as permanent Home instrumentation instead of creating a hard scene cut.

## 4. Content shown during startup

Startup vocabulary:

```text
ENTRY / 00
BUILD ROOM INITIALIZATION
REV / 01

CHARGING SYSTEM PARAMETERS

01 IDENTITY  / LOCK
02 SYSTEMS   / LOCK
03 EVIDENCE  / LOCK
04 INTERFACE / LOCK

SYSTEM READY
```

These are abstract portfolio/system states.

They are not claims about a vehicle or production environment.

## 5. Settled Home structure

The final Hero exposes:

```text
EM / BUILD ROOM
semantic navigation
PORTFOLIO / 001
SOFTWARE SYSTEMS
READY

I turn messy
operational problems
into working software.

Software Developer — Systems, Full Stack & Applied AI
```

Primary routes:

- Explore Systems;
- Start a Conversation.

The right-side process is not a capability-card stack. It exposes a systems-making sequence:

```text
01 Understand
02 Model
03 Build
04 Verify
```

## 6. Visual language implemented

New startup-specific styling lives in:

`src/app/startup.css`

Implemented visual decisions:

- Carbon environment;
- oversized editorial typography;
- Redline only on meaningful signal/identity points;
- Pit Amber restricted to transient initialization state;
- green `READY` state separated from brand accent;
- calibration spine / crosshair;
- fine engineering grid;
- low-noise technical metadata;
- retained parameter rail across startup and Home;
- deliberate asymmetry;
- mobile re-composition rather than simple desktop shrink.

## 7. Reduced-motion and no-script behavior

### Reduced motion

`useReducedMotion()` is respected.

The startup timing resolves immediately for reduced-motion users and CSS explicitly removes the startup overlay under:

```css
@media (prefers-reduced-motion: reduce)
```

The final hierarchy remains available without transformational choreography.

### JavaScript unavailable

A `noscript` fallback removes the startup overlay and ensures the underlying Hero remains readable.

This preserves the progressive-enhancement contract from STEP 0.7.

## 8. Implementation incident

### INCIDENT 01 — React effect state lint

**Symptom**

React/ESLint rejected a synchronous `setMounted(true)` call inside `useEffect()`:

```text
react-hooks/set-state-in-effect
```

**Cause**

The initial implementation used an extra mounted state only to gate the intro.

**Correction**

Removed the redundant mounted state.

The sole state transition now occurs from the timer callback; reduced-motion visibility is also protected through CSS.

**Result**

```text
Lint       ✅
Typecheck  ✅
Build      ✅
```

## 9. Browser Visual Proof infrastructure

A dedicated workflow now renders the actual production build in headless Chrome:

`.github/workflows/visual-proof.yml`

It captures:

```text
startup-desktop.png
startup-mobile.png
home-desktop.png
home-mobile.png
```

The workflow verifies both:

1. startup state;
2. settled/reduced-motion Home state.

This avoids treating source code or Figma intent as visual proof.

## 10. Visual Proof incident

### INCIDENT 02 — first screenshot captured startup instead of settled Home

**Symptom**

The first Chrome capture used virtual-time budget and returned the startup state even though the segmented rail had largely completed.

**Correction**

Separated the visual proof into explicit states:

- normal startup screenshots;
- `prefers-reduced-motion=reduce` screenshots for deterministic settled Home capture.

This is better testing anyway: startup and final composition are now separately inspectable.

## 11. Visual Proof result

Final run:

`31958437914`

Artifact:

`build-room-home-visual-proof`

Artifact digest:

`sha256:f8edcede4bb8135d7e35f8db2d667a06748c73e1dab0661b7b15d463cd919722`

Captured viewport sizes:

```text
Desktop  1440 × 1000
Mobile    390 × 844
```

## 12. Jett visual audit

### Startup desktop — PASS

The startup reads as a deliberate engineering initialization environment rather than an automotive dashboard.

Strongest elements:

- large `CHARGING SYSTEM PARAMETERS` editorial moment;
- parameter cells;
- low-intensity crosshair/calibration geometry;
- segmented amber rail;
- restrained color usage;
- absence of fake telemetry.

### Settled Home desktop — PASS

The final Home no longer reads like the rejected four-card startup composition.

Strongest elements:

- high-confidence asymmetric headline;
- Redline applied to the actual value/problem territory;
- process inspector occupying its own structural rail;
- actions integrated into the lower geometry rather than floating CTA buttons;
- retained parameter rail keeping continuity with startup;
- plenty of negative space despite technical notation.

### Mobile startup — PASS

The startup retains identity without turning into compressed desktop UI.

### Mobile settled Home — PASS WITH CONTINUATION

The first viewport prioritizes identity and value proposition correctly.

The process/actions continue below the fold rather than competing with the main statement.

The mobile design still requires deeper testing when SLICE 07 performs the dedicated accessibility/mobile audit.

## 13. Identity test

The current Home passes the intended identity condition:

```text
not “car website”
not “generic SaaS feature landing”
not “developer terminal gimmick”
```

Current interpretation:

> **A systems-oriented software portfolio with engineered precision and a quiet mechanical undertone.**

## 14. Known gaps

- visual proof currently captures endpoint states rather than a video of the entire transition;
- returning-user/session bypass behavior is not yet optimized;
- final Home below the Evidence teaser is not yet complete;
- mechanical imagery is intentionally absent from the Home foundation and will be tested where domain-earned, starting with AutoPulse;
- dedicated keyboard/focus walkthrough remains part of later accessibility slice.

None blocks SLICE 03.

## 15. Gate decision

```text
Startup identity                 ✅
No fake telemetry                ✅
Startup → Home continuity        ✅ implemented via shared layout
Settled Home visual proof        ✅
Desktop composition              ✅
Mobile first-viewport proof      ✅
Reduced motion                   ✅ baseline
No-script fallback               ✅
Lint                             ✅
Typecheck                        ✅
Production build                 ✅

SLICE 02                         CLOSED
```

## 16. Next

Proceed to:

# `SLICE 03 — AutoPulse`

This is the decisive core design test.

AutoPulse must prove that THE BUILD ROOM can move from impressive entry identity into a deep engineering case with:

```text
Problem
System Model
Decisions
Architecture
Build
Failure / Recovery
Verification
Evidence
```

After Home + AutoPulse, the project reaches the **CORE VISUAL GATE**.
