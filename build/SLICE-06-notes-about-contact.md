# BUILD — SLICE 06 · Notes / About / Contact

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Final Portfolio CI:** run `31964534742` — success  
**Final Public Surfaces Visual Proof:** run `31964534774` — success  
**Final visual artifact:** `public-surfaces-visual-proof`  
**Artifact ID:** `9268135676`  
**Artifact digest:** `sha256:d5484f3ec99d77b20270fb2a2058ace925c46e83557101add12f5244ad7a938d`

---

# 1. Slice responsibility

SLICE 06 completed the human/reputation/conversion layer around the already browser-proven engineering core.

Before this slice, THE BUILD ROOM could prove technical depth through:

```text
HOME
  ↓
AUTOPULSE
  ↓
CV ENGINE
  ↓
EVIDENCE
```

The missing questions were:

```text
How does Eduardo think between complete case studies?
Who is the builder behind the systems?
How should a potential client start a useful conversation?
```

The implemented chain is now:

```text
NOTES
recurring engineering judgment
        ↓
ABOUT
builder context + working method
        ↓
CONTACT
trust-first controlled intake
```

---

# 2. Public-surface architecture contract

Created:

`arch/public-surfaces/notes-about-contact-contract-v1.md`

The contract froze:

- Notes epistemic states;
- initial notebook corpus;
- About message hierarchy;
- title-inflation boundary;
- subtle mechanical-personal boundary;
- Contact intake model;
- safe public contact channels;
- browser-proof requirements.

---

# 3. Notes — Public Engineering Notebook

Notes is intentionally **not a generic blog**.

Every record declares one of:

```text
BUILT / VERIFIED
EXPLORING
```

This state is visible before opening the note and inside the note dossier.

Initial corpus:

```text
N-01  NO_DATA is not zero.                          BUILT / VERIFIED
N-02  Recovery should not rewrite history.         BUILT / VERIFIED
N-03  A job requirement is not candidate evidence. BUILT / VERIFIED
N-04  UNKNOWN is not false.                        BUILT / VERIFIED
N-05  Consume the snapshot; do not rebuild it.     BUILT / VERIFIED
N-06  The resume should not be the truth store.    BUILT / VERIFIED
N-07  Evidence needs a limitation field.           BUILT / VERIFIED
N-08  When does a listing become one opportunity?  EXPLORING
```

The records route back to real systems/evidence rather than existing as detached thought-leadership content.

Examples:

```text
N-01 → AutoPulse / E-AP-07
N-02 → AutoPulse / E-AP-05, E-AP-06, E-AP-08
N-03 → CV Engine / E-CV-01, E-CV-02, E-CV-03
N-04 → CV Engine / E-CV-12
N-05 → CV Engine / E-CV-13, E-CV-14
N-06 → CV Engine / E-CV-05, E-CV-06, E-CV-07
N-08 → CV Engine M4B-07 / explicitly exploring
```

Implemented files:

- `src/content/notes.ts`
- `src/components/notes/notes-index.tsx`
- `src/app/notes/page.tsx`
- `src/app/notes/[slug]/page.tsx`

The type system now also includes:

```text
NoteState
NoteTerritory
NoteSection
NoteRecord
```

---

# 4. About — Builder Context

The About page does not duplicate a résumé or assign unsupported titles.

Primary identity remains:

```text
Eduardo Merino
Software Developer — Systems, Full Stack & Applied AI
```

Primary operating principle:

# **Understand the system first.**

Implemented working sequence:

```text
UNDERSTAND
    ↓
BOUND
    ↓
MODEL
    ↓
DECIDE
    ↓
BUILD
    ↓
VERIFY
```

Capability territories are described as work, not titles:

```text
SYSTEMS
FULL STACK
STATE & RECOVERY
APPLIED AI
RECOVERY
EVIDENCE
```

The page also includes explicit working rules such as:

- recover before redesigning;
- do not let desired state rewrite current state;
- keep different kinds of truth as different objects;
- build in slices with visible gates;
- successful build ≠ automatically validated outcome;
- expose unfinished boundaries when they matter.

---

# 5. Mechanical / automotive personal signal

The About page contains one deliberately restrained personal note:

> Machines make systems visible.

Cars/mechanical systems are explained as a personal curiosity because interacting components, constraints, failure modes, diagnostics and maintenance are physically visible.

The copy explicitly states that this is:

> a small undertone in THE BUILD ROOM — not the theme of the portfolio.

AutoPulse is linked as the project where that interest naturally overlaps the software domain.

No fake portrait was generated or presented as identity evidence.

---

# 6. Contact — Trust-first Controlled Intake

Primary question:

# **Have a system worth understanding?**

Supporting rule:

> Start with the situation, not a polished brief.

Conversation framing categories:

```text
BUILD
RECOVER
IMPROVE
APPLIED AI
```

These are not represented as fixed service packages.

The intake checklist asks for:

```text
WHAT EXISTS NOW
WHAT IS MESSY
WHO IS INVOLVED
WHAT CONSTRAINS IT
WHAT WORKING MEANS
```

This mirrors the engineering process instead of using a generic lead form.

---

# 7. Contact publicability

Only real public routes are currently exposed:

```text
LinkedIn  https://www.linkedin.com/in/emerinoc
GitHub    https://github.com/Em3rc0d
```

The portfolio does **not** publish:

- an inferred company/work email from Git metadata;
- an invented contact email;
- a contact form with no real delivery handler;
- fake availability;
- fake response-time promises.

LinkedIn is the current direct conversation path.

---

# 8. Visual grammar

Shared visual system:

`src/app/public-surfaces.css`

Browser-audit corrections:

`src/app/public-surfaces-fixes.css`

The three surfaces remain connected but deliberately distinct:

```text
NOTES
Paper ledger / note dossier
state + provenance visible

ABOUT
Carbon identity environment
Paper operating maps
one restrained mechanical note

CONTACT
quiet Carbon hero
Paper intake checklist
real channel routes
```

This prevents the public surfaces from becoming copies of the flagship case template.

---

# 9. Initial browser proof

First Public Surfaces Visual Proof run:

`31964255862` ✅ technically complete

Artifact digest:

`sha256:138b681b7142c7e049cab1751468fdf5c89ff60fa636329a454225d833ab0060`

Visual audit passed:

```text
Notes desktop                ✅
Built note desktop           ✅
Exploring note desktop       ✅
Notes mobile                 ✅
Exploring note mobile        ✅
About desktop                ✅
About operating sequence     ✅
About mechanical note        ✅
About mobile                 ✅
Contact desktop              ✅
Contact intake desktop       ✅
Contact channels desktop     ✅
```

One real defect remained.

---

# 10. Browser audit incident — Contact mobile overflow

## INCIDENT 01

The first `390 × 844` Contact capture showed the long hero word:

```text
understanding
```

forcing the layout wider than the viewport.

Because the hero grid expanded, the supporting copy/CTA panel was also displaced horizontally.

CI did not detect the problem; visual browser inspection did.

### Correction

Added:

`src/app/public-surfaces-fixes.css`

Corrections:

- `min-width: 0` on Contact grid/copy boundaries;
- lower mobile hero-size ceiling;
- hardened text wrapping for supporting copy.

The Visual Proof path trigger was also widened from:

```text
src/app/public-surfaces.css
```

to:

```text
src/app/public-surfaces*.css
```

so future browser-audit fixes cannot silently bypass regression proof.

---

# 11. Strengthened final browser proof

Final workflow:

`.github/workflows/public-surfaces-visual-proof.yml`

Final run:

`31964534774`

Artifact:

`public-surfaces-visual-proof`

Artifact ID:

`9268135676`

Digest:

`sha256:d5484f3ec99d77b20270fb2a2058ace925c46e83557101add12f5244ad7a938d`

Final captures:

```text
notes-index-desktop.png
notes-ledger-desktop.png
note-built-desktop.png
note-exploring-desktop.png
about-hero-desktop.png
about-sequence-desktop.png
about-mechanical-desktop.png
contact-hero-desktop.png
contact-intake-desktop.png
contact-channels-desktop.png
notes-mobile.png
note-exploring-mobile.png
about-mobile.png
contact-mobile.png
contact-intake-mobile.png
```

The final proof explicitly adds the Contact intake at mobile size instead of validating only the hero.

---

# 12. Final visual audit

## Notes index — PASS

The surface reads as an engineering notebook/ledger rather than a blog-card grid.

The state model is understandable before opening a note.

## Built / Verified note — PASS

The note reads as a compact technical dossier with evidence/system relations.

## Exploring note — PASS

`EXPLORING` has a visibly different amber/Carbon boundary and explicitly exposes the unresolved M4B-07 question.

It does not visually impersonate a completed case.

## About — PASS

The page is more human than Evidence while staying part of THE BUILD ROOM.

The operating sequence and working rules communicate method without self-awarded title inflation.

## Mechanical note — PASS

The calibration object is restrained; the copy explicitly limits the automotive/machine influence to personal curiosity / design undertone.

It does not read as a car portfolio.

## Contact desktop — PASS

The page is commercially useful but quiet.

The visitor is told what information would make the first conversation productive.

## Contact mobile — PASS AFTER CORRECTION

The complete hero headline now remains inside the viewport and the LinkedIn action is fully visible.

## Contact intake mobile — PASS

The operational checklist remains readable as a vertical sequence and preserves the information hierarchy at `390 × 844`.

---

# 13. Final CI

Final Portfolio CI:

`31964534742`

Result:

```text
Install dependencies   ✅
Lint                    ✅
Typecheck               ✅
Production build        ✅
```

---

# 14. SLICE 06 gate

```text
Public-surface contract           ✅
Typed note state model            ✅
Initial note corpus               ✅
Notes index                       ✅
Note detail routes                ✅
Built / Verified distinction      ✅
Exploring distinction             ✅
About builder context             ✅
No title inflation                ✅
Mechanical soul remains subtle    ✅
Contact intake                    ✅
Real public channels only         ✅
No dead form / invented email     ✅
Desktop browser proof             ✅
Mobile browser proof              ✅
Contact mobile defect corrected   ✅
Final CI                          ✅
```

# `SLICE 06 — ✅ CLOSED`

---

# 15. Next

Proceed to:

# `SLICE 07 — Mobile / Accessibility`

This is **not a redesign slice**.

It is a cross-portfolio quality gate over the implementation that already exists.

Responsibilities:

```text
keyboard navigation
focus visibility
interactive semantics
hover-equivalent behavior
reduced motion
color-independent state communication
contrast
responsive overflow across multiple widths
readable diagrams / alternate representations
touch target quality
mobile evidence/navigation behavior
route-by-route accessibility smoke checks
```

Visual changes are allowed only when they correct a quality/accessibility failure.
