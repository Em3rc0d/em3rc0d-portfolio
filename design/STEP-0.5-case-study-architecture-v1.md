# STEP 0.5 — Case Study Architecture v1

**Status:** architecture baseline frozen  
**Purpose:** define what a portfolio system/case is responsible for proving before visual production.

## 1. Case taxonomy

Projects are not presented as a flat gallery.

### Flagship System

A system with enough evidence and narrative depth to support a full engineering case.

A flagship should prove multiple dimensions:

- problem understanding;
- system modeling;
- engineering judgment;
- implementation;
- constraints/failure handling;
- verification;
- ownership;
- inspectable evidence.

### Supporting System

A real project that proves a useful capability but does not need flagship-length treatment.

### Note / Experimental System

Exploratory or narrow work that is valuable to expose but must not visually imply stronger maturity than the evidence supports.

## 2. Case Selection & Story Contract

Every candidate system must eventually resolve the following contract:

```text
USE / DON'T USE
ROLE: FLAGSHIP / SUPPORT / NOTE
PRIMARY CLAIM
PUBLIC STORY
REQUIRED VISUAL EVIDENCE
PUBLICABILITY
OWNERSHIP
```

A project is not selected because it looks impressive. It is selected because it is responsible for proving something distinct.

## 3. Canonical flagship case structure

```text
00 / COVER
01 / SIGNAL
02 / PROBLEM
03 / SYSTEM MODEL
04 / ENGINEERING DECISIONS
05 / ARCHITECTURE
06 / BUILD
07 / CONSTRAINTS & FAILURE
08 / VERIFICATION
09 / OUTCOME
10 / OWNERSHIP
11 / EVIDENCE
12 / NEXT
```

The sequence is stable, but the visual composition is not a repeated template.

## 4. Epistemic visual roles

Different information types must look different.

### Claim

What the portfolio says is true.

### Model

How Eduardo represents the system or problem.

### Evidence

What independently supports the claim.

The interface must never make these three categories visually indistinguishable.

## 5. Cover contract

A cover can include:

- system identifier;
- name;
- concise system responsibility;
- role;
- state;
- domain;
- primary system path;
- evidence availability;
- one justified dominant artifact.

It should not begin with a technology stack.

## 6. Signal

Signal answers:

> What caused this system to need to exist?

Signal may originate from an operational problem, repeated failure, personal need, research question, or missing system capability.

## 7. Problem

Problem states the difficult reality before the implementation solution.

The intended effect is:

> The visitor understands why the subsequent decisions matter.

## 8. System Model

The model can expose:

- actors;
- entities;
- states;
- boundaries;
- inputs/outputs;
- relationships;
- lifecycle.

It proves understanding before implementation.

## 9. Engineering Decision Records

Important decisions receive IDs such as `D-03`.

Canonical anatomy:

```text
DECISION ID
CONTEXT
DECISION
WHY
TRADEOFF
RESULT
RELATED EVIDENCE
```

Decision records exist to demonstrate judgment, not just implementation output.

## 10. Architecture Plate

Architecture should be inspectable.

Possible component inspector fields:

- Purpose
- Inputs
- Outputs
- Dependencies
- Responsibilities
- Related decisions
- Related evidence

Architecture artifacts may receive identifiers such as:

`AP-ARCH-04 / REV.03`

Technical labels are meaningful traceability, not decoration.

## 11. Build Specimens

The Build chapter can expose:

- UI/product behavior;
- code excerpts;
- API behavior;
- schemas;
- datasets;
- tests;
- logs;
- mobile workflows;
- physical hardware;
- deployment artifacts.

Every specimen must answer:

> **What does this prove?**

## 12. Failure / Constraint Records

Real engineering includes failure and constraints.

Canonical anatomy:

```text
FAILURE ID
EXPECTED
REALITY
CONSEQUENCE
RESPONSE
VERIFICATION
```

Failure is not used theatrically. It exists to show how design changed under real conditions.

## 13. Verification

Verification distinguishes `BUILT` from `PROVEN`.

Suggested states:

```text
VERIFIED
PARTIALLY VERIFIED
IN TEST
NOT YET VERIFIED
```

## 14. Ownership

Every flagship must state what Eduardo actually owned.

Possible ownership language:

- Primary Builder
- Contributor
- System Recovery
- Architecture / Design
- Implementation
- R&D

Claims must distinguish Eduardo's work from existing systems, collaborators, company assets, and conceptual proposals.

## 15. Evidence integration

Evidence is referenced inline throughout the case rather than dumped only at the end.

A decision can reference `E-04`; an architecture component can reference `E-07`; a verification claim can reference `E-08`.

This creates a traceable graph:

```text
CLAIM ↔ DECISION ↔ MODEL ↔ IMPLEMENTATION ↔ VERIFICATION ↔ EVIDENCE
```

## 16. Current flagship direction

Current strongest flagship pair:

1. **AutoPulse**
2. **CV Engine**

A third flagship is conditional and must be earned through evidence/publicability rather than selected to fill a visual slot.
