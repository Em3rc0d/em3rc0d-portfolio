# Publicability & Claim Matrix v1

**Purpose:** prevent visual polish from turning assumptions into public facts.

## 1. Publicability states

```text
PUBLIC      direct publication allowed
SANITIZED   publish after removing sensitive identifiers/data
ABSTRACTED  publish only the generalized story/pattern
PRIVATE     internal evidence only
```

## 2. Claim states

```text
VERIFIED
SUPPORTED
CONDITIONAL
UNVERIFIED
REJECTED
```

These are internal editorial states, not necessarily public labels.

## 3. Current public positioning

| Item | Claim state | Publicability | Decision |
|---|---|---|---|
| Eduardo Merino | VERIFIED identity | PUBLIC | use |
| Software Developer — Systems, Full Stack & Applied AI | SUPPORTED positioning | PUBLIC | use |
| I turn messy operational problems into working software. | SUPPORTED positioning | PUBLIC | use |
| Systems Design | SUPPORTED capability | PUBLIC | use contextually |
| Full-Stack Product Building | SUPPORTED capability | PUBLIC | use contextually |
| Applied AI | SUPPORTED capability | PUBLIC | use contextually |
| System Recovery | SUPPORTED capability | PUBLIC | use contextually |
| Infrastructure & Delivery | SUPPORTED capability | PUBLIC | use contextually |

## 4. Current system matrix

| System | Portfolio role | Current publicability | Public rule |
|---|---|---|---|
| AutoPulse | FLAGSHIP | PUBLIC / artifact-by-artifact review | build full case |
| CV Engine | FLAGSHIP | PUBLIC / artifact-by-artifact review | build full case |
| Graph | SUPPORT candidate | conditional | concise record after evidence review |
| Infra Monitor | SUPPORT candidate | conditional | concise record after evidence review |
| prodAgentic | SUPPORT candidate | conditional | concise record after evidence review |
| GPets | SUPPORT candidate | PUBLIC repository evidence exists | concise record |
| RAG | RESERVED / conditional | not cleared | do not route publicly yet |
| site mapper professional work | evidence only | PRIVATE / ABSTRACTED | do not directly publish |
| bookCars professional-derived work | evidence only | SANITIZED / ABSTRACTED decision required | do not directly publish by default |

## 5. AutoPulse evidence territories

Known evidence territories to validate artifact-by-artifact:

- TelemetryBlockRepository V3;
- LiveSessionRegistry;
- `recoverOrphanedSessions` behavior;
- interrupted app/session lifecycle;
- binary OBD2 codec work;
- CRC32/integrity handling;
- NO_DATA/NRC/raw response handling;
- bounded block persistence;
- unit tests;
- integration tests;
- physical Renault Logan field tests when actually completed and documented;
- future Session Summary metrics only after implemented/verified.

### AutoPulse editorial constraint

Do not describe field behavior as verified until the relevant field test exists.

Do not imply AutoPulse is a production fleet platform unless evidence supports that state.

## 6. CV Engine evidence territories

Known domain/evidence territories:

- Career Vault;
- JobPostingSnapshot;
- MatchReport;
- Apply / Prepare / Skip decision flow;
- ResumeVersion;
- Application;
- durable observation/history architecture;
- controlled source acquisition where implemented;
- evidence-based opportunity reasoning.

### CV Engine editorial constraint

Do not reduce the public story to “ATS résumé checker.”

The intended positioning is **Application Intelligence**: using evidence to decide where/how to compete.

Claims about live market acquisition, integrations, or source coverage must follow implementation status.

## 7. Generated visual concept — factual audit

The concept render is stored as a visual reference. Its copy is not authoritative.

| Render item | Status | Decision |
|---|---|---|
| dark engineered visual direction | DESIGN REFERENCE | keep conceptually |
| red accent | DESIGN REFERENCE | keep, controlled |
| mechanical imagery | DESIGN REFERENCE | use selectively |
| AutoPulse as major system moment | SUPPORTED DIRECTION | keep |
| 50K+ lines of code | UNVERIFIED | remove |
| 15+ projects delivered | UNVERIFIED / undefined | remove |
| 5+ systems in production | UNSUPPORTED | remove |
| 3000+ hours of deep focus | UNSUPPORTED | remove |
| generated portrait | NOT IDENTITY EVIDENCE | remove/replace |
| base/location shown in render | UNSUPPORTED | remove |
| open-to-work state | CONDITIONAL | only publish if intentionally approved |
| generic “real impact” production metrics | UNVERIFIED | replace with evidence-backed outcomes |

## 8. Evidence object contract

Every EvidenceRecord should be able to answer:

```text
ID
TYPE
SYSTEM
CLAIM SUPPORTED
STATE
SOURCE
PUBLICABILITY
CONTEXT
LIMITATIONS
RELATED DECISIONS
RELATED ARCHITECTURE
```

The `LIMITATIONS` field is mandatory for evidence where readers could overgeneralize what it proves.

## 9. Ownership contract

Before publication, each case must distinguish:

```text
WHAT EDUARDO DESIGNED
WHAT EDUARDO IMPLEMENTED
WHAT ALREADY EXISTED
WHAT COLLABORATORS / COMPANY OWNED
WHAT REMAINS CONCEPTUAL
```

Possible labels:

- Primary Builder
- Contributor
- Architecture / Design
- Implementation
- System Recovery
- R&D

## 10. Publication gate

An artifact is publishable only when:

```text
claim defined
    +
evidence source known
    +
ownership clear
    +
publicability classified
    +
redaction/sanitization complete if required
```

If one is unknown, the artifact remains out of the public build.
