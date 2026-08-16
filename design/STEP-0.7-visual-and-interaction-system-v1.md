# STEP 0.7 — THE BUILD ROOM · Visual & Interaction System v1

**Status:** system-definition baseline frozen  
**Important:** this document defines the visual language. It does **not** freeze the first Figma composition, which was later rejected as too generic.

## 1. Design thesis

> **Engineered, with a mechanical soul.**

THE BUILD ROOM is a serious software-engineering portfolio first. Automotive/mechanical influence is a subtle undertone.

Target weighting:

```text
~90% professional engineering / trust
~10% mechanical / automotive character
```

The car is not the subject. It is an invisible analogy for complex systems.

## 2. Desired visitor perception

Sequence:

1. This looks serious.
2. He understands systems.
3. Everything feels deliberate.
4. There is a subtle mechanical precision here.
5. I would trust him to build something for me.

A perceptive visitor may notice the mechanical sensibility, but the portfolio must never require automotive interest to work.

## 3. Rejected literal automotive language

Do not use:

- giant speedometers;
- steering wheels;
- racing typography;
- tire tracks;
- carbon-fiber wallpaper;
- fake dashboards;
- rotating engines;
- 3D cars as decoration;
- neon garage/cyberpunk treatment;
- meaningless telemetry.

AutoPulse may carry stronger automotive language because its domain genuinely justifies it.

## 4. Visual material model

THE BUILD ROOM uses two principal materials.

### Carbon / Environment

Used for system framing, entry, architecture, building, personal atmosphere.

Representative palette:

```text
CARBON      #0A0D0F
GRAPHITE    #15191C
STEEL       #252B30
ALLOY       #ADB2B7
```

### Paper / Dossier

Used for evidence, technical records, inspection, and editorial material.

```text
PAPER       #F1EFE8
SOFT PAPER  #E5E1D8
INK         #111315
```

The dark-to-paper transition is semantic:

```text
SYSTEM / ENVIRONMENT → RECORD / EVIDENCE
```

## 5. Accent system

Primary expressive accent:

```text
REDLINE #EF513D
```

Redline is reserved for activation, critical relationships, selection, and technical emphasis. It should occupy a very small portion of the composition at once.

Optional transient startup/status accent:

```text
PIT AMBER #D39D36
```

Pit Amber is not a general brand color. It belongs to initialization/transient state.

Semantic states such as VERIFIED, WARNING, ERROR must remain distinct from branding.

## 6. Typography

Primary editorial/interface family:

**Instrument Sans**

Technical metadata family:

**IBM Plex Mono**

Mono is limited to identifiers, states, revisions, evidence labels, and technical metadata.

The portfolio must not look like a terminal.

## 7. Grid and composition

Desktop foundation:

- 12-column grid;
- controlled asymmetry;
- strong editorial hierarchy;
- generous negative space;
- system artifacts allowed to cross conventional section boundaries;
- avoid repetitive centered blocks and card grids.

Tablet/mobile use reduced column systems while preserving hierarchy rather than merely stacking desktop.

## 8. Surface families

### Environment

Dark Build Room shell, navigation, transitions, system framing.

### Plates

Architecture, domain models, flows, timelines, comparisons, system maps.

### Dossiers

Decision records, reasoning, verification, provenance, claims.

### Specimens

UI, code, logs, tests, repositories, physical tests, datasets, documents.

Each surface family exists because it represents a different epistemic job.

## 9. Instrumentation language

Mechanical character can appear through meaningful measurement/notation:

- registration marks;
- alignment points;
- revision IDs;
- evidence IDs;
- coordinates where useful;
- system indices;
- progress marks;
- technical annotations.

Examples:

```text
AP-ARCH-03 / REV.02
E-07 / VERIFICATION ARTIFACT
D-03 / BOUNDARY DECISION
```

Notation must map to real traceability. Decorative pseudo-engineering labels are forbidden.

## 10. Interaction metaphor

Primary metaphor:

> **Inspect the system.**

Core actions:

- enter;
- trace;
- inspect;
- open;
- compare;
- verify;
- return.

Inspectable elements should expose useful relationships rather than create game-like novelty.

## 11. Motion grammar

Motion is structural, not decorative.

Canonical verbs:

```text
ENGAGE
TRACE
ALIGN
LOCK
OPEN
TRANSFER
```

Meaning:

### Engage

An element or system becomes active.

### Trace

A relationship/path becomes visible.

### Align

Elements reorganize into a shared structure.

### Lock

A component settles into its intended state.

### Open

An artifact becomes inspectable.

### Transfer

Context moves between system/evidence/page states.

Avoid:

- bounce;
- floating forever;
- wobble;
- ornamental spin;
- mandatory cinematic intros;
- scroll hijacking;
- mouse-following spotlights.

Motion should feel mechanically damped: move, settle, stop.

## 12. Timing envelope

Representative motion timing:

```text
120–180 ms   state feedback
180–260 ms   component transition
260–420 ms   meaningful reveal
~500 ms max  major system entrance
```

The startup can be longer as a composed transition but must remain brief and skippable/ignorable for returning users.

## 13. Startup identity

The startup concept is:

```text
BOOT
  ↓
CHARGING PARAMETERS
  ↓
SYSTEM READY
```

Parameters are abstract system/professional checks, not fake vehicle values.

Possible parameter semantics:

```text
IDENTITY
SYSTEMS
EVIDENCE
INTERFACE
```

A segmented rail can evoke a pit/startup sequence very lightly.

Critical later correction:

> The startup must **transform into the Home**, not disappear before a conventional Hero appears.

## 14. Home visual responsibility

Home must communicate identity and value in roughly ten seconds.

Do not include:

- giant skills cloud;
- fake CLI;
- typing animation;
- GitHub contribution chart as hero proof;
- technology-logo wall;
- generic startup feature-card grid.

## 15. Case-study visual grammar

Different chapters need different visual jobs:

```text
PROBLEM        editorial / situational
SYSTEM MODEL   plate / relationships
DECISIONS      decision ledger
ARCHITECTURE   inspectable technical artifact
BUILD          specimens
FAILURE        constraint/failure record
VERIFICATION   matrix / evidence-backed claims
OUTCOME        restrained synthesis
OWNERSHIP      explicit attribution
EVIDENCE       technical inspection
```

## 16. Evidence visual contract

Canonical evidence object:

```text
E-06
TYPE          Integration test
SYSTEM        AutoPulse
CLAIM         ...
STATE         VERIFIED
SOURCE        Repository artifact
SCOPE         Public / Sanitized
[INSPECT ARTIFACT]
```

Permanent principle:

> **Visual confidence must never exceed evidentiary confidence.**

## 17. Notes visual contract

Notes are lighter and more editorial than Systems.

The UI should clearly distinguish:

```text
I BUILT / VERIFIED THIS
```

from:

```text
I'M EXPLORING THIS
```

## 18. Responsive contract

Mobile is intentionally redesigned.

- hover → tap/focus;
- evidence viewer can become full-screen;
- diagrams get a readable simplified state before full inspection;
- contextual case navigation compresses rather than disappears;
- touch target and readable type size take priority over dense notation.

## 19. Accessibility and performance

Required:

- reduced-motion mode;
- keyboard/focus equivalents;
- contrast on Carbon and Paper;
- state not conveyed by color alone;
- diagram alternatives;
- progressive enhancement;
- core content usable before advanced motion loads.

Principle:

> **The impressive version is the enhanced version, not the required version.**

## 20. Anti-pattern boundary

Explicitly reject:

- fake terminal;
- GitHub stats as hero evidence;
- animated skill percentages;
- rotating 3D car;
- carbon fiber textures;
- neon cyberpunk;
- giant gauge navigation;
- “loading Eduardo.exe”;
- excessive glassmorphism;
- glow everywhere;
- dashboard UI for content that is not a dashboard;
- meaningless telemetry;
- generic SaaS feature cards.

## 21. STEP 0.7 closure

At system-definition level:

```text
Visual thesis              ✅
Mechanical soul abstracted ✅
Color/material system      ✅
Typography                 ✅
Grid                        ✅
Surface model              ✅
Instrumentation language   ✅
Interaction grammar        ✅
Motion grammar             ✅
Case visual grammar        ✅
Evidence visual model      ✅
Responsive principles      ✅
Accessibility              ✅
Performance                ✅
Anti-pattern boundary      ✅
```

Actual high-fidelity compositions and production implementation remain later gates.
