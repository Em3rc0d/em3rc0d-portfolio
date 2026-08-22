# THE BUILD ROOM — STEP 1.1 · Reputation & Frame Completeness

**Project:** Eduardo Merino Portfolio  
**Step:** `1.1 — Reputation Completeness`  
**State:** `CLOSED / PRODUCTION-PROVEN`  
**Release PR:** `#14`  
**Production merge:** `aa068771e32ea1f995dbc2d375c30d67be0b9be4`

---

## 1. Responsibility

STEP 1.1 had two responsibilities by the time it closed.

The planned responsibility was reputation completeness:

```text
PERSONAL BUILDING
        +
PROFESSIONAL DEPTH
        +
CONCURRENT R&D
```

The final browser audit exposed a second product-level responsibility that had to be closed before release:

```text
ONE FRAME = ONE SECTION
```

The earlier CSS used `min-height: 100dvh`. That only guaranteed that a narrative section was at least one viewport tall. It did not guarantee that the section was exactly one frame or that its contents fit inside the viewport.

A wide/short desktop screenshot made the defect visible: the Home Hero extended beyond the first viewport and the final line of the headline was cut by the fold. A full browser audit showed the same class of defect across multiple public pages.

The correction therefore became a release gate, not a one-off Hero patch.

---

## 2. Reputation completeness result

### Professional depth

A public-safe professional supporting case now exists:

`/systems/infrastructure-site-mapper`

Publication mode:

```text
ABSTRACTED
```

The public record preserves:

- operational problem;
- hierarchy/spatial model;
- implementation responsibility;
- persistence and operational-view work;
- role-aware/security hardening responsibility;
- explicit claim ceiling.

It intentionally withholds:

- employer/client identity;
- private repository coordinates;
- private source paths;
- screenshots containing operational material;
- site/device identifiers;
- sensitive security detail.

Three professional evidence records provide bounded proof while preserving that confidentiality boundary:

```text
E-PRO-01
E-PRO-02
E-PRO-03
```

### Full-stack proof

GPets is now a completed supporting record:

`/systems/gpets`

It provides an inspectable end-to-end path across browser/product surface, authenticated API behavior, persistence, realtime communication and offline-safe synchronization.

Four GPets evidence records use public GitHub source provenance:

```text
E-GP-01
E-GP-02
E-GP-03
E-GP-04
```

GPets remains classified as archived technical-challenge evidence. It is not represented as production-scale or commercial-adoption proof.

### Supporting-system triage

The public Systems index no longer exposes permanent `Record pending` placeholders.

Current public systems:

```text
01  AutoPulse                    FLAGSHIP
02  CV Engine                    FLAGSHIP
03  Infrastructure Site Mapper  SUPPORT / ABSTRACTED PROFESSIONAL
04  GPets                        SUPPORT / ARCHIVED FULL STACK
```

Graph, Infra Monitor and prodAgentic remain hidden until their public evidence contracts are strong enough. Weak mini-cases were not manufactured merely to fill the index.

### Evidence corpus

The public evidence corpus grew from 23 to 30 records:

```text
AutoPulse       9
CV Engine      14
Professional    3
GPets           4
TOTAL          30
```

---

## 3. Frame defect characterization

The first site-wide frame audit tested:

```text
1366 × 768
1792 × 854
1440 × 900
1920 × 1080
```

The 1792×854 profile intentionally represents the wide/short desktop shape that exposed the Home defect.

Routes included:

- Home;
- Systems index;
- AutoPulse;
- CV Engine;
- Infrastructure Site Mapper;
- GPets;
- About;
- Contact;
- Evidence utility intro;
- Notes utility intro.

The first audit result was:

```text
32 / 40 route × viewport combinations FAIL
```

This proved the defect was architectural rather than Hero-specific.

Major causes included:

- `min-height: 100dvh` instead of an exact frame contract;
- large vertical editorial gutters;
- width-only responsive design on wide/short desktops;
- dense case-study material stacked vertically instead of composed horizontally;
- one semantic section containing multiple visual stages;
- shared Hero height math using an inaccurate header-height assumption.

---

## 4. Permanent desktop frame contract

Added:

```text
src/app/frame-discipline.css
src/app/frame-discipline-fixes.css
scripts/frame-discipline-smoke.mjs
.github/workflows/frame-discipline.yml
```

Desktop narrative surfaces now follow:

```text
SECTION HEIGHT = 100dvh
        +
CONTENT MUST FIT INSIDE THAT SECTION
        +
NO HORIZONTAL OVERFLOW
```

The test explicitly checks both element height and internal `scrollHeight` versus `clientHeight`.

That means `overflow: clip` cannot be used to hide a failed composition.

### Responsive exception

The frame contract is intentionally desktop-only.

Mobile/tablet continue to use natural content height where required for readability and accessibility. The rule is therefore:

```text
DESKTOP NARRATIVE PAGE
    → exact one-frame / one-section composition

MOBILE / TABLET
    → content-safe natural height when needed

EVIDENCE / NOTES UTILITY DOCUMENTS
    → natural document flow
    → index introduction must remain above fold
```

This prevents visual rigidity from overriding accessibility.

---

## 5. Composition corrections

The fix preserved technical information rather than deleting it to hit a viewport target.

Examples:

### Home

- Hero typography and assembly scale respond to viewport height as well as width;
- startup/hero composition remains fully visible in the first frame;
- client paths, individual system encounters, working model, evidence and conversion each occupy one desktop frame.

### Systems index

The four public systems are composed inside one viewport rather than becoming a multi-screen list.

### AutoPulse

- product specimen gained short-desktop height behavior;
- decision material became a horizontal decision board;
- failure and recovery became one coherent split-frame sequence;
- architecture, verification and evidence workbenches were compacted without removing claims or proof.

### CV Engine

Dense truth, source, assessment, resume, market, snapshot, verification and evidence sections were re-composed as horizontal workbenches instead of tall editorial stacks.

### Supporting cases

Professional and GPets records use content-count-aware grids and complete one-frame compositions without artificial empty tracks.

### About / Contact

Shared Hero viewport math was corrected and shorter closing surfaces became intentional full frames instead of partial-screen remnants.

---

## 6. Final frame verification

Final browser gate:

```text
40 / 40 route × viewport combinations PASS
```

Profiles:

```text
1366 × 768   PASS
1792 × 854   PASS
1440 × 900   PASS
1920 × 1080  PASS
```

The gate checks:

- exact viewport frame height;
- content fit;
- horizontal overflow;
- utility-intro fold position.

---

## 7. Visual proof

Added:

`.github/workflows/frame-visual-proof.yml`

The workflow captures the full 1792×854 narrative-frame matrix.

Artifact from the final release candidate:

```text
Workflow run      32585741993
Artifact ID       9479014349
Artifact name     frame-visual-proof-1792x854
SHA-256           b43c5272c8ee0f7a1ae70f03216f1af54ddf82ae39bd56fda703dcaee78c5660
Screenshots       62
```

Coverage includes:

```text
Home                         7 frames
Systems index                1 frame
AutoPulse                   10 frames
CV Engine                   17 frames
Infrastructure Site Mapper   7 frames
GPets                         7 frames
About                         6 frames
Contact                       5 frames
Evidence utility intro        1
Notes utility intro           1
```

The artifact was manually inspected after the numeric frame gate passed. This manual review was necessary because exact dimensions alone cannot detect weak balance, unreadably small typography or incorrect visual material.

---

## 8. Cross-quality proof

The final release candidate also passed:

```text
Portfolio CI                ✅
Release Quality             ✅
Performance Baseline        ✅
Accessibility Quality       ✅
Reputation Visual Proof     ✅
Frame Discipline            ✅
Frame Visual Proof          ✅
```

Accessibility result:

```text
84 / 84 route-width checks  ✅
6 / 6 keyboard checks       ✅
```

The desktop frame correction therefore did not regress narrow-width layout, keyboard behavior, Evidence filtering, Notes filtering, AutoPulse interaction or CV Engine interaction.

---

## 9. Production authority

PR #14 merged to `main` as:

```text
aa068771e32ea1f995dbc2d375c30d67be0b9be4
```

Vercel production deployment:

```text
dpl_CUxUiwhcnoXnsUDKrLMLbhQgFdii
```

State:

```text
READY
```

Public alias:

`https://em3rc0d-portfolio.vercel.app`

Production Home returned HTTP 200 after the alias moved to the deployment.

Production runtime audit for `error` and `fatal` log levels found no entries in the audited release window.

---

## 10. Final STEP 1.1 gate

```text
PERSONAL BUILDING       ✅
PROFESSIONAL DEPTH      ✅
CONCURRENT R&D          ✅
FULL-STACK PROOF        ✅
SUPPORTING TRIAGE       ✅
PUBLIC CLAIM CEILINGS   ✅
CONFIDENTIALITY         ✅
ONE FRAME / ONE SECTION ✅
RESPONSIVE ACCESS       ✅
PRODUCTION PROOF        ✅
```

# `STEP 1.1 — CLOSED / PRODUCTION-PROVEN`

The portfolio is now representation-complete for the current positioning. Future public-presence work should move into distribution/reputation operations rather than reopening portfolio construction without a concrete defect or new scoped requirement.
