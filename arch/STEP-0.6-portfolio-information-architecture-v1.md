# STEP 0.6 — Portfolio Information Architecture v1

**Status:** architecture baseline frozen  
**Experience name:** `THE BUILD ROOM`

## 1. Core rule

**THE BUILD ROOM is the experiential layer, not the navigation nomenclature.**

The site may feel like an engineering room, inspection environment, technical dossier, or controlled system space, but navigation remains clear and semantic.

Primary navigation:

```text
Systems
Notes
Evidence
About
Contact
```

Do not replace these with metaphorical labels such as `Garage`, `Dyno`, `Telemetry Bay`, or `Exit`.

## 2. Product map

```text
/
HOME
│
├── /systems
│   SYSTEMS INDEX
│   ├── /systems/autopulse
│   └── /systems/cv-engine
│
├── /evidence
│   EVIDENCE LIBRARY
│
├── /notes
│   ENGINEERING NOTEBOOK
│   └── /notes/[slug]
│
├── /about
│   ABOUT THE BUILDER
│
└── /contact
    CONTACT / CONVERSION
```

Supporting systems can initially live inside `/systems` without requiring a dedicated long-form route.

## 3. Home responsibility

Home is a **trust router**, not an artistic splash page and not a complete résumé.

Within the initial experience the visitor should understand:

```text
WHO
Eduardo Merino

WHAT
Software Developer — Systems, Full Stack & Applied AI

VALUE
I turn messy operational problems into working software.

PROOF
Flagship systems + inspectable evidence

DEPTH
Systems / Evidence / Engineering Notes
```

Primary Home jobs:

1. establish identity;
2. explain capability;
3. surface strongest systems;
4. introduce evidence as a first-class concept;
5. route deeper technical interest;
6. offer contact.

## 4. Systems Index responsibility

`/systems` acts as the complete public work index.

It distinguishes:

```text
FLAGSHIP
SUPPORTING
EXPERIMENTAL / R&D
```

Flagships receive narrative space.
Supporting systems receive concise records.
Experimental work must be visibly less certain than verified work.

## 5. System record model

Every public system may expose:

```text
SYSTEM ID
NAME
DOMAIN
PRIMARY PROBLEM
ROLE
STATE
SYSTEM PATH
EVIDENCE AVAILABILITY
PUBLICABILITY
CASE AVAILABILITY
```

## 6. Case navigation

Flagship cases require contextual navigation so technical visitors can jump directly to Architecture, Verification, or Evidence without reading the complete narrative.

Desktop can use a persistent contextual rail.
Mobile should use a compact chapter selector.

## 7. Evidence Library responsibility

`/evidence` exists for deeper inspection.

It can support filters such as:

```text
ALL
ARCHITECTURE
CODE
TEST
PRODUCT
FIELD
MODEL
```

and system-level filtering.

Evidence Library is not the primary recruiter route. It is a trust surface for serious technical/client inspection.

## 8. Evidence Viewer responsibility

Evidence opens without destroying narrative context.

It must explain:

- what the artifact is;
- which claim it supports;
- its state;
- provenance/source;
- publicability;
- limitations;
- related system/decision/architecture.

It is an inspection surface, not a generic image lightbox.

## 9. Notes responsibility

`/notes` is Eduardo's **Public Engineering Notebook**.

Editorial territories:

- System Thinking
- Building
- Recovery
- Applied AI
- Field Notes

Notes connect public writing with portfolio evidence:

```text
LinkedIn → Note → System → Evidence → Contact
```

## 10. About responsibility

About introduces the builder after competence has already been demonstrated.

It should explain:

- how Eduardo thinks;
- what types of ambiguous problems interest him;
- how professional depth and personal R&D connect;
- current building direction;
- a subtle personal connection to machines/automotive systems.

It should not become a generic “passionate developer” biography.

## 11. Contact responsibility

Contact is a clean conversion point.

Core idea:

> **Have a system that needs to be understood, built or improved?**

Suggested minimal inputs:

```text
Name
Email
What are you trying to build, understand or improve?
```

Alternative direct channels may include Email, LinkedIn, and GitHub.

## 12. Primary visitor route

```text
HOME
 ↓
FEATURED SYSTEM
 ↓
PROBLEM
 ↓
SYSTEM MODEL
 ↓
DECISIONS
 ↓
ARCHITECTURE
 ↓
BUILD
 ↓
FAILURE / CONSTRAINTS
 ↓
VERIFICATION
 ↓
EVIDENCE
 ↓
ABOUT / NOTES
 ↓
CONTACT
```

The visitor is never forced to follow the complete route.

## 13. Mobile architecture

Mobile is a dedicated composition, not desktop stacked narrowly.

Rules:

- hover becomes tap/focus;
- complex architecture receives a readable simplified state first;
- deep architecture can open separately;
- evidence can become a full-screen inspector;
- navigation remains semantic;
- motion must have reduced-motion equivalents.

## 14. Publicability architecture

Every publishable artifact carries an internal classification:

```text
PUBLIC
SANITIZED
ABSTRACTED
PRIVATE
```

Privacy rules are architectural constraints, not final-content cleanup.

## 15. Conversion architecture

The portfolio's public trust path is:

```text
Identity
  ↓
System competence
  ↓
Inspectable reasoning
  ↓
Verification
  ↓
Evidence
  ↓
Human connection
  ↓
Conversation
```

That path is the information architecture's real purpose.
