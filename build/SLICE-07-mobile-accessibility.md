# BUILD — SLICE 07 · Mobile / Accessibility

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Final Portfolio CI:** run `31965990175` — success  
**Final Accessibility Quality:** run `31965990169` — success  
**Final Accessibility Visual Proof:** run `31965966492` — success  
**Quality report artifact:** `accessibility-quality-reports`  
**Quality artifact ID:** `9268520380`  
**Quality artifact digest:** `sha256:11ec0718a8e5b9eb418d761d898860c8f40736818ae0538f2d877cf8a99f16bc`  
**Visual artifact:** `accessibility-visual-proof`  
**Visual artifact ID:** `9268504022`  
**Visual artifact digest:** `sha256:e87014474cf3dacfd8f37de6c79e35ddcdb1e1089af4ed7fbe15fd58e13aa8e5`

---

# 1. Slice responsibility

SLICE 07 did not redesign THE BUILD ROOM.

The portfolio architecture, visual identity, flagship systems, evidence system and public reputation surfaces were already browser-proven.

This slice hardened the implementation against quality failures that only appear when the experience is used differently:

```text
KEYBOARD INSTEAD OF POINTER
REDUCED MOTION INSTEAD OF DEFAULT MOTION
320PX / 360PX INSTEAD OF 390PX+
TOUCH INSTEAD OF DESKTOP PRECISION
SCREEN-READER STATE ANNOUNCEMENT
CURRENT-ROUTE SEMANTICS
LONG TECHNICAL CONTENT AT NARROW WIDTHS
```

The frozen contract is:

`arch/quality/mobile-accessibility-contract-v1.md`

---

# 2. Quality contract

The contract explicitly prohibited two shortcuts:

```text
1. accessibility changes must not become a visual redesign;
2. overflow failures must be corrected at their source rather than hidden with global overflow-x: hidden.
```

It also preserved native HTML controls already present in the system instead of replacing them with custom interaction abstractions.

Strong pre-existing baseline:

- semantic `<nav>` / `<main>` structure;
- native `<button>` filters and inspectors;
- visible `:focus-visible` treatment;
- text labels accompanying color-coded states;
- Home already bypassing its startup sequence under reduced motion.

---

# 3. Implemented accessibility hardening

## 3.1 Global motion policy

Added a portfolio-wide Motion policy through:

```text
MotionConfig reducedMotion="user"
```

plus reduced-motion CSS behavior that removes unnecessary smooth scrolling / decorative transition duration while preserving state changes and content.

Home continues to bypass the startup sequence when the user requests reduced motion.

The rule is now global rather than page-local.

## 3.2 Skip navigation

Added a global visible-on-focus:

```text
SKIP TO CONTENT
```

The skip behavior resolves the route's real content target and is the first useful keyboard action.

Keyboard proof verifies that Enter moves focus to the content region.

## 3.3 Current route semantics

Shared navigation now exposes the owning route through:

```text
aria-current="page"
```

including nested routes such as systems, evidence dossiers and note dossiers.

The current state remains visually visible and is not communicated only by color.

## 3.4 Dynamic inspector announcements

AutoPulse Architecture Inspector and CV Engine Truth Inspector now expose:

```text
aria-live="polite"
aria-atomic="true"
```

on the changing inspection region.

The browser quality harness verifies both keyboard activation and the live-region semantics after state change.

## 3.5 Light-surface signal contrast

The original bright signal palette remains appropriate on Carbon.

Paper surfaces now use context-specific darker signal treatments where small text requires stronger contrast instead of globally darkening the core Redline identity.

## 3.6 Touch-target hardening

Compact navigation / filter controls receive larger interaction areas in mobile/coarse contexts without visually inflating the desktop system.

---

# 4. Responsive quality matrix

Created:

`scripts/accessibility-smoke.mjs`

and:

`.github/workflows/accessibility-quality.yml`

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

Required widths:

```text
320
360
390
768
1024
1440
```

Total matrix:

```text
10 routes × 6 widths = 60 route/width combinations
```

Final result:

# **60 / 60 PASS**

The smoke gate verifies representative structural conditions including:

- page horizontal overflow;
- main landmarks;
- H1 presence;
- interactive accessible names;
- skip target;
- current navigation state;
- safe external-link `rel` behavior;
- touch-target conditions requiring review.

---

# 5. Defects discovered by the width matrix

The automated width matrix found real defects that previous 390px screenshots did not expose.

Initial narrow-width failures included:

```text
Evidence dossier     320px
Exploring note       320px
About                320px
Contact              320px
Contact              360px
```

These were not hidden.

Corrections were applied to min-content / wrapping / responsive typography behavior.

After the first correction round:

```text
59 / 60 PASS
```

The last residual was:

```text
/notes/when-does-a-listing-become-one-opportunity
320px
+27px horizontal overflow
```

The note dossier was then hardened so its sheet, heading, relations and long technical text can shrink/wrap safely.

Final:

```text
60 / 60 PASS
```

---

# 6. Keyboard interaction harness

Created:

`scripts/keyboard-smoke.mjs`

The final gate executes real browser interactions for:

```text
1. Skip link is first keyboard target and moves Home to main content
2. Shared navigation exposes current route and keyboard focus
3. Evidence filter activates from keyboard
4. Notes EXPLORING filter activates from keyboard
5. AutoPulse architecture inspector is keyboard operable and announced
6. CV Engine truth inspector is keyboard operable and announced
```

Final result:

# **6 / 6 PASS**

---

# 7. Important test-harness incident

The first keyboard harness reported simultaneous failures for:

```text
Evidence filter
Notes filter
AutoPulse inspector
CV Engine inspector
```

The pattern was suspicious because all four interactions used native HTML buttons and focus was already reaching the controls.

Audit result:

> the product controls were not the shared failure; the CDP keyboard driver was generating Enter as a raw key event that did not reproduce Chrome's native activation path correctly.

The correction was made in the test driver rather than adding redundant keyboard handlers to otherwise-correct native buttons.

The driver now sends native Enter text through Chrome DevTools Protocol before judging the application.

After correcting the test harness:

```text
Evidence filter          PASS
Notes filter             PASS
AutoPulse inspector      PASS
CV Engine inspector      PASS
```

Permanent engineering lesson:

> **A failing test is evidence of a discrepancy, not automatic proof that the product is wrong. Diagnose the test system and the product system separately.**

---

# 8. Persistent quality evidence

The Accessibility Quality workflow now stores reports on every gate run, including failing runs.

Artifact:

```text
accessibility-quality-reports
  ├─ accessibility-route-smoke.log
  └─ accessibility-keyboard-smoke.log
```

This prevents future regressions from becoming opaque GitHub Action failures with no durable inspection artifact.

Final report contents:

```text
Accessibility smoke passed: 60 route/width combinations.
Keyboard smoke passed: 6 interaction checks.
```

---

# 9. Accessibility Visual Proof

Created:

`.github/workflows/accessibility-visual-proof.yml`

Final browser artifact includes:

```text
a11y-home-focus-390.png
a11y-contact-focus-390.png
a11y-home-reduced-motion-390.png
a11y-note-320.png
a11y-evidence-320.png
a11y-about-320.png
a11y-contact-320.png
a11y-autopulse-inspector-320.png
a11y-cv-truth-320.png
```

Manual visual audit result:

```text
HOME 320 / 390              ✅
FOCUS VISIBILITY             ✅
SKIP LINK VISIBILITY         ✅
REDUCED-MOTION COMPOSITION   ✅
AUTOPULSE INSPECTOR 320      ✅
CV ENGINE TRUTH 320          ✅
EVIDENCE DOSSIER 320         ✅
EXPLORING NOTE 320           ✅
ABOUT 320                    ✅
CONTACT 320                  ✅
```

No global horizontal masking was introduced.

---

# 10. Files introduced / hardened

Representative implementation surface:

```text
src/components/accessibility/motion-policy.tsx
src/components/accessibility/skip-link.tsx
src/app/accessibility.css
src/app/accessibility-fixes.css
src/app/layout.tsx
scripts/accessibility-smoke.mjs
scripts/keyboard-smoke.mjs
.github/workflows/accessibility-quality.yml
.github/workflows/accessibility-visual-proof.yml
```

Additional existing components/styles were corrected where the quality gate discovered concrete failures.

---

# 11. Gate closure

```text
QUALITY CONTRACT                     ✅
LIGHT-SURFACE SIGNAL CONTRAST        ✅
GLOBAL REDUCED-MOTION POLICY         ✅
SKIP NAVIGATION                      ✅
ARIA-CURRENT                         ✅
INSPECTOR LIVE-REGION SEMANTICS      ✅
TOUCH-TARGET HARDENING               ✅
320 / 360 / 390 WIDTH AUDIT          ✅ 60/60
KEYBOARD INTERACTION SMOKE            ✅ 6/6
AUTOMATED SEMANTIC SMOKE              ✅
QUALITY REPORT ARTIFACTS              ✅
ACCESSIBILITY VISUAL PROOF            ✅
PORTFOLIO CI                          ✅
```

# `SLICE 07 — MOBILE / ACCESSIBILITY` ✅ CLOSED

---

# 12. Next

The portfolio's primary surfaces are now built and quality-hardened.

The remaining responsibility is release readiness rather than new product surface area.

Next:

# `SLICE 08 — Performance / Polish / Launch`

The next slice must establish a launch contract before optimizing or deploying.
