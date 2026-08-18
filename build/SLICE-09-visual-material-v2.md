# SLICE 09 — Visual Material v2

**Status:** IMPLEMENTED ON REVIEW BRANCH  
**Branch:** `agent/visual-material-v2`  
**Target:** `develop`  
**Production:** not promoted

## Why this slice exists

The v1 production portfolio is structurally strong and professional, but the visual audit exposed four material weaknesses:

1. the Hero relied more on dark-tech language than on a signature system object;
2. systems were still introduced primarily through text rather than real inspectable artifacts;
3. Evidence was conceptually strong but needed a more explicit Carbon → Paper handoff from Home;
4. the portfolio needed an authentic human presence without turning Eduardo into another technical HUD panel.

The goal of this slice is not to restart the portfolio or replace its information architecture. It is to make the engineering visible while preserving the existing trust, evidence, accessibility and performance contracts.

## Implemented changes

### 1. Startup → Hero signature assembly

The right side of the Hero no longer presents a generic process ledger. It now contains a layered engineered assembly representing five real software-system responsibilities:

- Interface
- Logic
- Data
- Infrastructure
- Evidence

The object uses CSS 3D transforms plus the existing Motion dependency. No Three.js/WebGL dependency was added in this slice. This is deliberate: the first signature object should prove the spatial grammar before a heavier rendering runtime is justified.

The startup language now resolves into that same responsibility model rather than decorative vehicle telemetry.

### 2. Operating model instead of generic capability cards

Home now exposes the working sequence:

`RECOVER → BOUND → MODEL → BUILD → VERIFY → EVOLVE`

This communicates how Eduardo approaches ambiguous systems rather than listing generic categories such as code, automation or AI integration.

### 3. Artifact-led flagship encounters

AutoPulse and CV Engine remain the flagship systems, but their Home presentation now exposes:

- their real system path;
- selected evidence records sourced from the existing evidence model;
- evidence state;
- ownership;
- publicability;
- a direct route into the complete case.

AutoPulse and CV Engine receive different spatial behavior rather than one repeated project-card template.

Selected Home evidence currently includes:

**AutoPulse**
- `E-AP-03` — Persistence integrity and sequence contract
- `E-AP-06` — Orphaned-session recovery
- `E-AP-08` — Session summary and integrity

**CV Engine**
- `E-CV-01` — Career evidence and assertion truth boundary
- `E-CV-03` — Evidence-backed requirement matching
- `E-CV-05` — Claim Ledger and resume claim provenance

No new capability claim was invented for this visual pass.

### 4. Carbon → Paper evidence handoff

Home now introduces Evidence with a real evidence object rather than a generic sample or vanity metric.

The current record is `E-AP-06 — Orphaned-session recovery`, including its verification state and limitation. The interface materially changes from Carbon to Paper to communicate the transition from system environment into engineering record.

### 5. Authentic builder presence

About now includes an authentic Eduardo photograph supplied for the portfolio rather than an AI-generated executive portrait.

The visual treatment deliberately becomes quieter around the human image:

- less HUD language;
- less decorative telemetry;
- more negative space;
- identity and working philosophy remain primary.

The Hero remains system-led; Eduardo's portrait belongs to About rather than becoming a large personal-brand Hero image.

## Preserved contracts

This slice preserves:

- Carbon / Paper material system;
- restrained Redline activation language;
- Instrument Sans + IBM Plex Mono roles;
- existing information architecture;
- flagship hierarchy;
- current Evidence model and publicability rules;
- reduced-motion behavior;
- responsive composition;
- production `main` as untouched stable authority.

## Explicit non-goals

This slice does **not**:

- add decorative 3D cars or engines;
- add fake gauges or fictional telemetry;
- add a technology-logo wall;
- add vanity counters as evidence;
- add Three.js merely to claim the site uses 3D;
- replace AutoPulse/CV Engine case-study evidence;
- promote anything directly to production.

## Review gate

Before merge to `develop`, the branch must pass:

1. lint;
2. TypeScript typecheck;
3. production build;
4. existing accessibility/reduced-motion contracts;
5. browser/visual review of Home and About;
6. confirmation that the new image and evidence treatment do not weaken performance budgets.

Only after those checks should this slice be merged into `develop`. Production promotion remains a separate gate.
