# THE BUILD ROOM — Mobile / Accessibility Quality Contract v1

**Slice:** `SLICE 07`  
**Status:** FROZEN FOR HARDENING  
**Scope:** cross-portfolio implementation quality; no visual redesign.

---

# 1. Purpose

THE BUILD ROOM is now feature-complete enough for a dedicated quality gate.

Current browser-proven surfaces include:

```text
Home
Systems
AutoPulse
CV Engine
Evidence Library
Evidence dossiers
Engineering Notebook
Note dossiers
About
Contact
```

SLICE 07 is responsible for ensuring the existing design remains usable when:

- navigation happens by keyboard rather than pointer;
- motion is reduced by user preference;
- the viewport is narrower than the current 390 px proof baseline;
- a touchscreen needs reliable target sizes;
- color is not available as the only state signal;
- an interactive inspector changes content without page navigation;
- a screen reader needs current-route/state semantics;
- the user wants to bypass repeated navigation.

Visual changes are authorized only as corrections to quality/accessibility failures.

---

# 2. Initial audit — already good

## 2.1 Global focus indicator exists

`src/app/globals.css` already contains:

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--redline);
  outline-offset: 4px;
}
```

Therefore SLICE 07 does not need to invent a new focus system.

It must verify that the indicator remains visible on both Carbon and Paper surfaces.

## 2.2 Semantic navigation exists

`SiteHeader` currently uses:

```text
<header>
<nav aria-label="Primary navigation">
<ul>
<li>
<Link>
```

Home's custom header also has a labelled navigation landmark.

## 2.3 Interactive selectors use native controls

Current examples:

- Evidence filters → `<button aria-pressed>`
- Notes filters → `<button aria-pressed>`
- AutoPulse architecture inspector → native buttons + `aria-pressed`
- CV Engine truth-layer selector → native buttons + `aria-pressed`

This is a strong baseline. Hardening should preserve native semantics rather than replacing them with clickable `div`s.

## 2.4 Home already respects reduced-motion preference

`StartupHero` already uses Motion's `useReducedMotion()` and bypasses the 1850 ms startup sequence when reduced motion is requested.

This behavior should remain.

## 2.5 Color-coded states are generally accompanied by text

Examples:

```text
MATCH / GAP / UNKNOWN
BUILT / VERIFIED / EXPLORING
SOURCE / TEST / NOT CLAIMED
READY / NEXT
```

Color therefore supports state but is not normally the sole carrier.

---

# 3. Initial audit — gaps requiring correction

## GAP A — signal colors on Paper

Current tokens:

```text
Carbon      #0A0D0F
Paper       #F1EFE8
Redline     #EF513D
Pit Amber   #D39D36
Alloy       #ADB2B7
Ink         #111315
```

Calculated contrast ratios from the current palette:

```text
Paper / Carbon       16.94 : 1
Alloy / Carbon        9.12 : 1
Redline / Carbon      5.49 : 1
Pit Amber / Carbon    8.02 : 1
Verified / Carbon     6.67 : 1
Ink / Paper          16.18 : 1

Redline / Paper       3.09 : 1
Pit Amber / Paper     2.11 : 1
```

Therefore Redline and Pit Amber are strong signal colors on Carbon but are not suitable as small normal text on Paper.

### Correction contract

Keep the existing bright signal palette on Carbon.

Add context-specific light-surface signal tokens with at least normal-text contrast:

```text
SIGNAL ON PAPER  target >= 4.5 : 1
AMBER ON PAPER   target >= 4.5 : 1
```

Do not globally darken Redline, because that would weaken the dark-surface signal.

---

# 4. GAP B — reduced motion is local, not global

Home explicitly checks reduced motion, but other Motion-based components still contain:

- while-in-view transforms;
- inspector enter transforms;
- layout/state transitions.

CSS also uses `scroll-behavior: smooth` globally.

### Correction contract

Add one portfolio-wide motion policy:

```text
MotionConfig reducedMotion="user"
```

plus CSS reduced-motion rules that:

- disable smooth scrolling;
- collapse decorative CSS transition/animation duration;
- preserve content/state changes without requiring motion.

The reduced-motion experience must show content immediately and remain fully functional.

---

# 5. GAP C — repeated navigation cannot currently be skipped

The portfolio uses prominent navigation on nearly every route.

A keyboard/screen-reader user should be able to bypass it and move directly to route content.

### Correction contract

Add a global visible-on-focus:

```text
Skip to content
```

link.

Every public route must provide exactly one target:

```text
#main-content
```

placed immediately after the repeated route header/navigation and made programmatically focusable.

---

# 6. GAP D — current route is not explicit in shared navigation

The shared `SiteHeader` is semantic but currently does not expose which route is active.

### Correction contract

Use:

```text
aria-current="page"
```

for the owning semantic section.

Examples:

```text
/systems/autopulse  → Systems current
/evidence/e-cv-12   → Evidence current
/notes/...          → Notes current
/about              → About current
/contact            → Contact current
```

Visual current state must not rely on color alone.

---

# 7. GAP E — inspector updates need announcement semantics

AutoPulse Architecture Inspector and CV Engine truth-layer selector update visible content in-place.

A screen-reader user should receive the updated object/state without having to rediscover the region.

### Correction contract

Use a restrained live-region policy:

```text
aria-live="polite"
aria-atomic="true"
```

on the changing inspection/result region.

Do not announce decorative animation.

---

# 8. GAP F — touch-target hardening

Several desktop-oriented nav/filter controls are visually compact.

The current visual system should preserve density on desktop while improving coarse-pointer/mobile targets.

### Correction contract

At mobile/coarse-pointer contexts:

- primary navigation targets must receive a reliable minimum interactive height;
- filter buttons must remain comfortably tappable;
- compact evidence/note links must not require precision tapping;
- inspector buttons must retain native full-cell targets.

No control should become visually oversized merely to satisfy this gate.

---

# 9. Responsive-width gate

Existing visual proof focuses primarily on:

```text
390 × 844 mobile
1440 × 1000 desktop
```

SLICE 07 expands the width matrix.

Required widths:

```text
320
360
390
768
1024
1440
```

Representative routes:

```text
/
/systems
/systems/autopulse
/systems/cv-engine
/evidence
/evidence/e-cv-12
/notes
/notes/when-does-a-listing-become-one-opportunity
/about
/contact
```

Gate:

```text
document.scrollWidth <= viewport width + tolerance
```

Any horizontal overflow must be identified by route/width and corrected rather than hidden globally with `overflow-x: hidden`.

---

# 10. Keyboard gate

Representative keyboard traversal must verify:

- Skip to content is first useful route action;
- shared navigation links receive visible focus;
- filter buttons receive visible focus and activate with keyboard;
- AutoPulse architecture selector remains keyboard-operable;
- CV Engine truth selector remains keyboard-operable;
- external/contact links receive visible focus;
- focus does not become trapped;
- content is not dependent on hover.

A generic `outline: none` is forbidden.

---

# 11. Semantic smoke checks

Automated browser checks should report at minimum:

```text
exactly one main landmark per route
at least one H1 per route
interactive element accessible names
buttons are native/valid controls
aria-pressed only on compatible controls
external target=_blank links include rel protection
current navigation state where applicable
single #main-content target
horizontal overflow by viewport
undersized mobile controls requiring review
```

These checks do not replace manual accessibility review; they create a repeatable quality baseline.

---

# 12. Reduced-motion proof

Representative proof must cover:

```text
Home startup bypass
AutoPulse
CV Engine
```

With reduced motion enabled:

- content must not wait for cinematic entry;
- inspectors still change state;
- scrolling is not forced smooth;
- no important relationship disappears because it was only communicated by motion.

---

# 13. Diagram / dense-data rule

The portfolio uses architectural flows, verification matrices and technical ledgers.

At mobile widths:

- diagrams may become vertical sequences;
- tables may become labelled row records;
- implementation identifiers may wrap;
- horizontal scrolling may be used only when preserving a real spatial relationship is more understandable than reflow.

Never shrink text below useful reading size simply to preserve a desktop diagram.

---

# 14. Quality evidence

SLICE 07 must produce:

```text
arch/quality/mobile-accessibility-contract-v1.md
build/SLICE-07-mobile-accessibility.md
scripts/accessibility-smoke.mjs
.github/workflows/accessibility-quality.yml
```

Browser artifacts should contain representative:

- focus states;
- 320 px / 360 px proof;
- reduced-motion Home;
- mobile flagship inspector states;
- Evidence/Notes mobile inspection.

---

# 15. Gate

SLICE 07 closes only when:

```text
BASELINE INVENTORY                    ✅
LIGHT-SURFACE SIGNAL CONTRAST         REQUIRED
GLOBAL REDUCED-MOTION POLICY          REQUIRED
SKIP LINK                             REQUIRED
ARIA-CURRENT                          REQUIRED
INSPECTOR LIVE-REGION SEMANTICS       REQUIRED
TOUCH-TARGET HARDENING                REQUIRED
320/360/390 WIDTH AUDIT               REQUIRED
KEYBOARD SMOKE                        REQUIRED
AUTOMATED SEMANTIC SMOKE              REQUIRED
CI                                    REQUIRED
BROWSER PROOF                         REQUIRED
```

# `SLICE 07A — QUALITY CONTRACT` ✅ CLOSED

Next:

# `SLICE 07B — Cross-Portfolio Accessibility Hardening`
