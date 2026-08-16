# THE BUILD ROOM — Notes / About / Contact Contract v1

**Slice:** `SLICE 06`  
**Status:** FROZEN FOR BUILD  
**Purpose:** complete the human/reputation/conversion layer around the browser-proven engineering core.

---

# 1. Why this slice exists now

The portfolio already proves technical depth through:

```text
HOME
  ↓
AUTOPULSE
  ↓
CV ENGINE
  ↓
EVIDENCE LIBRARY / DOSSIERS
```

The remaining public-experience risk is not:

> “Can Eduardo build systems?”

The remaining risk is:

> “Can I understand how he thinks, who he is, and how to start a useful conversation with him?”

Therefore SLICE 06 must improve **reputation continuity and contact conversion** without weakening the evidence-first identity.

---

# 2. Shared public-surface rule

These routes are not independent marketing pages.

They form one chain:

```text
NOTES
shows recurring engineering judgment
        ↓
ABOUT
explains the builder behind that judgment
        ↓
CONTACT
turns trust into a concrete conversation
```

The visitor should never move from an evidence-driven flagship into generic personal-brand content.

---

# 3. NOTES — public engineering notebook

## Responsibility

Notes answers:

> **How does Eduardo think when he is not showing a complete case study?**

It is not:

- a chronological lifestyle blog;
- generic tutorial SEO content;
- “5 React tips”;
- AI thought-leadership filler;
- recycled LinkedIn hype;
- an excuse to publish unsupported claims.

It is:

> **short technical records about boundaries, decisions, failure modes and unresolved questions, connected to real system work.**

---

# 4. Note epistemic state

Every note must visibly declare one of two public states:

```text
BUILT / VERIFIED
```

or:

```text
EXPLORING
```

### BUILT / VERIFIED

Use when the note is grounded in a built system, source artifact, test artifact or frozen evidence boundary already represented in the portfolio.

### EXPLORING

Use when the note discusses a current question, next architectural boundary or active line of investigation.

An EXPLORING note must never visually imply production completion.

This distinction is part of the portfolio's evidence grammar, not decorative metadata.

---

# 5. Initial notebook corpus

The initial notebook should be small and strong.

Approved first records:

```text
N-01  NO_DATA is not zero.                         BUILT / VERIFIED
N-02  Recovery should not rewrite history.        BUILT / VERIFIED
N-03  A job requirement is not candidate evidence.BUILT / VERIFIED
N-04  UNKNOWN is not false.                       BUILT / VERIFIED
N-05  Consume the snapshot; do not rebuild it.    BUILT / VERIFIED
N-06  The resume should not be the truth store.   BUILT / VERIFIED
N-07  Evidence needs a limitation field.          BUILT / VERIFIED
N-08  When does a listing become one opportunity? EXPLORING
```

Grounding:

- N-01 → AutoPulse / `E-AP-07`
- N-02 → AutoPulse / `E-AP-06`
- N-03 → CV Engine / `E-CV-02`
- N-04 → CV Engine / `E-CV-12`
- N-05 → CV Engine / `E-CV-14`
- N-06 → CV Engine / `E-CV-05`, `E-CV-06`
- N-07 → THE BUILD ROOM Evidence System architecture
- N-08 → CV Engine / `M4B-07`, explicitly next/not complete

---

# 6. Notes IA

Routes:

```text
/notes
/notes/[slug]
```

Index responsibilities:

- explain notebook contract;
- filter by `ALL / BUILT-VERIFIED / EXPLORING`;
- expose note ID, territory, state and linked system;
- avoid card-grid blog aesthetics;
- use an editorial ledger/list.

Individual note responsibilities:

```text
NOTE ID
STATE
TERRITORY
SYSTEM CONTEXT
THESIS
SHORT BODY
WHY IT MATTERS
RELATED SYSTEM
RELATED EVIDENCE
CURRENT LIMIT / NEXT QUESTION when relevant
```

Notes should be short enough to read as engineering records, not essays.

---

# 7. Notes visual grammar

Material:

- primarily Paper;
- Carbon used for `EXPLORING` boundary/next-question moments;
- Redline for identifiers/state/links;
- mono only for metadata and factual structures.

No cover illustrations are required.

The object itself — statement + state + provenance — is the visual identity.

---

# 8. ABOUT — builder context

## Responsibility

About answers:

> **Who is the person behind these systems, and how does he approach ambiguous software work?**

It should not become:

- résumé duplication;
- timeline of every job;
- self-awarded senior titles;
- personality-test copy;
- lifestyle gallery;
- car enthusiast page.

---

# 9. About message hierarchy

The page should establish:

### 1. Identity

```text
Eduardo Merino
Software Developer — Systems, Full Stack & Applied AI
```

### 2. Working territory

```text
messy operational reality
        ↓
boundaries
        ↓
models
        ↓
decisions
        ↓
build
        ↓
verification
```

### 3. Working principle

> Understand the system first.

Before building, recover what exists, identify ownership/boundaries, separate source truth from desired state, then implement in verifiable slices.

### 4. Breadth without title inflation

The page may describe work across:

- system/domain modeling;
- full-stack product implementation;
- persistence/state/recovery;
- applied AI and grounding/provenance;
- technical recovery;
- evidence-driven iteration.

It should not translate those capabilities into unsupported titles.

### 5. Mechanical/personal signal

One restrained paragraph may explain that cars/machines are a personal interest because they make interacting components, constraints, failure modes, diagnostics and maintenance physically visible.

The copy must explicitly keep this as **personal curiosity / design undertone**, not professional automotive specialization.

AutoPulse is the one project where that interest naturally overlaps the software domain.

---

# 10. About visual composition

The page should feel more human than Evidence but remain part of THE BUILD ROOM.

Recommended moments:

```text
A / identity statement
B / operating sequence
C / capability territories
D / working rules
E / mechanical curiosity — small personal note
F / routes back into Systems / Notes / Contact
```

No portrait is required for this slice.

A real portrait may be added later only from an actual user-provided public artifact.

Do not generate a fake portrait and present it as identity evidence.

---

# 11. CONTACT — trust-first intake surface

## Responsibility

Contact answers:

> **What should a potential client tell Eduardo so the first conversation is useful?**

The page should not use:

- “Let’s build something amazing!”;
- fake urgency;
- fake availability badges;
- fake calendar slots;
- unsupported response-time promises;
- a form that silently goes nowhere.

---

# 12. Contact prompt

Primary line:

# **Have a system worth understanding?**

Supporting framing:

> Start with the situation, not a polished brief.

The visitor should be prompted to explain:

```text
WHAT EXISTS NOW
WHAT IS FAILING / MISSING / MESSY
WHO USES OR OPERATES IT
WHAT CONSTRAINTS MATTER
WHAT “WORKING” SHOULD MEAN
```

This mirrors Eduardo's engineering process and makes the first conversation better.

---

# 13. Contact entry paths

Approved problem categories:

```text
BUILD
I need a working software system from an operational problem.

RECOVER
I have an existing product/codebase and need to understand what is really there.

IMPROVE
A workflow/system works, but it is fragmented, brittle or difficult to operate.

APPLIED AI
I need AI in a product without losing grounding, provenance or control.
```

These are conversation framing devices, not service-package claims.

---

# 14. Contact channels / publicability

Current safe public channels:

```text
LinkedIn  https://www.linkedin.com/in/emerinoc
GitHub    https://github.com/Em3rc0d
```

Do not publish a work/company email inferred from Git metadata.

Do not invent a contact email.

Do not implement a contact form until a real delivery destination/handler exists.

The page may explicitly use LinkedIn as the primary conversation route for the current build.

Email/form can be added at launch only after publicability/configuration is confirmed.

---

# 15. Contact visual composition

Contact should be the quietest major page.

```text
Carbon environment
large concise question
four problem-entry records
Paper intake checklist
two real public channel links
```

No animation beyond restrained state feedback.

The visitor should feel:

> “I know what to send him.”

not:

> “I am being sold to.”

---

# 16. Shared responsive rule

These pages must not simply stack desktop grids.

### Notes mobile

- note list remains scan-friendly;
- state visible before opening;
- no hover dependency.

### About mobile

- identity before process;
- process becomes vertical sequence;
- mechanical/personal note stays small.

### Contact mobile

- primary LinkedIn route visible without excessive scrolling;
- problem categories become vertical;
- intake checklist remains readable.

Full accessibility scrutiny still belongs to SLICE 07.

---

# 17. Browser proof gate

SLICE 06 cannot close from CI alone.

Required proof:

```text
Notes index desktop
Built/Verified note desktop
Exploring note desktop
Notes mobile
About desktop
About mobile
Contact desktop
Contact mobile
```

CI:

```text
lint
 typecheck
 production build
```

---

# 18. Slice gate

```text
NOTES CONTRACT               ✅
NOTE STATE MODEL             ✅
INITIAL NOTE CORPUS          ✅
NOTE ROUTING CONTRACT        ✅
ABOUT MESSAGE CONTRACT       ✅
TITLE-INFLATION BOUNDARY     ✅
MECHANICAL SOUL BOUNDARY     ✅
CONTACT INTAKE CONTRACT      ✅
CONTACT PUBLICABILITY        ✅
RESPONSIVE PRINCIPLES        ✅
BROWSER PROOF CONTRACT       ✅
```

# `SLICE 06A — PUBLIC SURFACE CONTRACT` ✅ CLOSED

Next:

# `SLICE 06B — Notes Implementation`
