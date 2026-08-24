# THE BUILD ROOM — Distribution Visual System v1

**State:** FOUNDATION  
**Purpose:** reusable LinkedIn graphics that extend THE BUILD ROOM without becoming a second brand

---

# 1. Canvas

Primary single-image canvas:

```text
1080 × 1350 px
4:5
```

Safe content area:

```text
80 px left/right
90 px top/bottom
```

Do not place critical text in the last 60 px of any edge.

---

# 2. Materials

Use the existing THE BUILD ROOM material logic:

```text
CARBON      system / implementation / runtime
GRAPHITE    secondary technical structure
PAPER       evidence / public abstraction / explanation
RED         active decision / rejected merge / warning / state transition
```

The graphics should feel like engineering sheets, not social-media templates.

---

# 3. Typography behavior

Use the portfolio language:

- large direct statement;
- small mono technical label;
- restrained body copy;
- state names / IDs in monospace;
- no decorative script or creator-style headline font.

A graphic should remain understandable at feed width without zooming.

Do not place paragraphs of post copy inside the image.

---

# 4. Reusable templates

## T-A — State Distinction

Use when the idea is about two values/states that must not be merged.

Structure:

```text
[TECHNICAL LABEL]

LARGE DISTINCTION
A ≠ B

STATE CELLS / SMALL FLOW

[ONE-LINE RULE]
```

Launch use: D-001 `NO_DATA ≠ 0`.

## T-B — State Transition / Recovery

Use for lifecycle and failure paths.

```text
START STATE
   ↓
BRANCH
 ↙   ↘
A     B
      ↓
 RECOVERY
```

A rejected/false transition is drawn in red and crossed once.

Launch use: D-002.

## T-C — Evidence Contract

Use for proof / provenance / limitation content.

```text
CLAIM
  ↓
PROOF
  ↓
LIMIT
```

Paper-first visual with Carbon labels.

Launch use: D-003.

## T-D — Dual Truth Domains

Use when two authorities converge but must remain separate.

```text
LEFT AUTHORITY      RIGHT AUTHORITY
      \               /
       \             /
        CONVERGENCE OBJECT
```

The forbidden backward copy is marked in red.

Launch use: D-004.

## T-E — Full-Stack Path

Use to explain an end-to-end implementation boundary.

```text
CLIENT
 ↓
LOCAL STATE
 ↓
API
 ↓
SERVICE
 ↓
DATA / DELIVERY
```

Use small limitation label at the bottom when the flow could be mistaken for a stronger guarantee.

Launch use: D-005.

## T-F — Publicability Boundary

Use for professional/private evidence.

```text
REAL WORK
   ↓
RECOVER ENGINEERING
   ↓
PUBLIC ABSTRACTION
   ├─ problem
   ├─ role
   ├─ model
   └─ limitation

WITHHELD → private coordinates / screenshots / ops identifiers
```

Do not use blurred copies of real confidential material. The withheld area is a conceptual locked region only.

Launch use: D-006.

---

# 5. Footer system

Every graphic receives a small footer:

```text
EM / BUILD ROOM
D-00X
TERRITORY
```

Optional right-side footer:

```text
SYSTEM NAME
```

Do not add the full portfolio URL as a large banner. The post text provides the bridge.

---

# 6. Source / reconstruction labeling

When a visual represents a system model rather than a literal screenshot, label it accurately:

```text
SYSTEM MODEL
PUBLIC ABSTRACTION
SOURCE-TRUE RECONSTRUCTION
STATE MODEL
```

Never label a reconstructed graphic as:

```text
SCREENSHOT
PRODUCTION CAPTURE
FIELD RESULT
```

unless that evidence actually exists.

---

# 7. Visual quality gate

Before a graphic becomes `VISUAL_READY`:

1. can the technical thought be understood without reading the post?
2. is there only one primary idea?
3. is any limitation necessary to prevent overclaiming visible?
4. does the graphic preserve publicability/confidentiality?
5. is the type readable at mobile feed width?
6. does it look like THE BUILD ROOM rather than a generic carousel template?
7. does the visual explain something that text alone would make slower to understand?

If #7 is NO, publish the post without a graphic rather than adding decoration.
