# CV Engine — Flagship Story & Visual Composition Contract v1

**Slice:** `SLICE 05D`  
**Status:** FROZEN FOR BUILD  
**Evidence authority:** `evidence/systems/cv-engine-evidence-dossier-v1.md`

---

# 1. Portfolio responsibility

AutoPulse proves:

> Eduardo can make unreliable runtime/physical telemetry explicit and durable.

CV Engine must prove something different:

> Eduardo can design an information system where evidence, inference, intent and recommendation remain separate even while AI and external market data participate.

Therefore the second flagship is not a visual clone of AutoPulse.

Its primary claim is:

# **I can build decision systems without collapsing different kinds of truth into one score.**

---

# 2. Opening problem

The case opens with:

> **A job description can tell you what a company wants. It cannot tell you what you can prove.**

Supporting statement:

> The difficult part is not generating a resume. It is preserving the boundary between candidate evidence, market requirements, derived analysis and the recommendation that comes after comparing them.

This immediately prevents the case from being interpreted as a resume-template product.

---

# 3. Case spine

```text
00  COVER
01  PROBLEM
02  TRUTH CLASSES
03  CAREER EVIDENCE → ASSERTION
04  JOB TRUTH
05  REQUIREMENT MATCH
06  CAN ≠ WANT
07  OPPORTUNITY ASSESSMENT
08  CLAIM / RESUME PROVENANCE
09  MARKET INGRESS
10  UNKNOWN ≠ FALSE
11  SNAPSHOT PROVENANCE
12  EXACT SNAPSHOT → DECISION
13  VERIFICATION
14  EVIDENCE
15  CURRENT BOUNDARY / NEXT
```

The case is intentionally longer than a normal portfolio case because its value is architectural differentiation, not screenshot volume.

---

# 4. Cover composition

## Message

```text
CV ENGINE
APPLICATION INTELLIGENCE

Career truth
≠ market truth
≠ analysis
≠ recommendation
```

## Visual object

Do not use a résumé image, AI brain, sparkle, bot, or score gauge.

Use a **four-layer decision stack**:

```text
CAREER FACT        stable source layer
MARKET FACT        external source layer
DERIVED ANALYSIS   computed layer
RECOMMENDATION     downstream decision layer
```

Each layer is visually separated by a narrow physical gap and a different registration mark.

The user should understand that the layers interact but are not interchangeable.

Mechanical character: **very low**.

This page should feel like an information-control instrument, not an automotive interface.

---

# 5. Problem chapter

Three failure modes:

```text
P-CV-01
THE JOB DESCRIPTION BECOMES CANDIDATE TRUTH

P-CV-02
A REWRITE UPGRADES RESPONSIBILITY
participated → led
implemented → designed

P-CV-03
ONE SCORE HIDES WHY THE DECISION WAS MADE
```

The visual treatment should resemble a logic fault record, not red marketing cards.

---

# 6. Truth Classes chapter

Central statement:

# **Not every statement has the same epistemic status.**

Render the five candidate truth classes as a typed grammar:

```text
CANDIDATE_ASSERTED
VERIFIED_FACT
DERIVED_FACT
REWRITE
SUGGESTION
```

Show constraints beneath them:

```text
VERIFIED_FACT → evidence/source required
DERIVED_FACT  → derivation rule required
REWRITE       → source assertion required
SUGGESTION    → cannot become ResumeClaim directly
```

Evidence:

`E-CV-01 · E-CV-05`

This is a **model plate**, not an interactive card grid.

---

# 7. Career Evidence → Assertion chapter

Visual graph:

```text
CareerSource
    ↓
CareerEvidence
    ↓
CareerAssertion
```

Inspect one example object showing:

```text
excerpt
locator
reviewState
truthClass
evidenceIds
sourceIds
```

The key visual distinction:

- source/evidence object = Paper specimen;
- assertion = interpreted but candidate-side object;
- no JobRequirement appears in this graph.

Evidence:

`E-CV-01`

---

# 8. Job Truth chapter

Visual split:

```text
JOB DESCRIPTION
      ↓
JOB REQUIREMENT
      ↓
JOB SNAPSHOT
```

State visibly:

# `JobRequirement != CandidateSkill`

The right side should show requirement kind / necessity / minimum years / confidence.

The candidate side remains absent.

Evidence:

`E-CV-02`

---

# 9. Requirement Match chapter

This is the first convergence point.

```text
CareerAssertion ──┐
                  ├── RequirementMatch
JobRequirement ───┘
```

Allowed outcomes:

```text
MATCH
POTENTIAL_MATCH
GAP
UNKNOWN
BLOCKER
```

Use real behavior examples rather than fictional score graphs:

```text
JavaScript ≠ Java
Azure ≠ AWS
2 documented years ≠ 5 required years
collaboration ≠ leadership
missing work authorization → UNKNOWN
```

The goal is to show that uncertainty/gaps survive the matcher.

Evidence:

`E-CV-03`

---

# 10. Responsibility Escalation chapter

A focused trust moment:

```text
SOURCE                    GENERATED

participated          →   led              REJECT / CONFIRM
implemented           →   designed         REJECT / CONFIRM
designed              →   architected      REJECT / CONFIRM
built                 →   owned             REJECT / CONFIRM
built APIs            →   developed APIs    ACCEPTABLE EQUIVALENCE
```

Do not label the whole system “hallucination-proof.”

Use:

> **High-risk responsibility escalation is explicitly checked.**

Evidence:

`E-CV-04`

---

# 11. CAN ≠ WANT chapter

One of the most memorable visual moments.

Left:

```text
CAREER TRUTH
CAN
what current evidence supports
```

Right:

```text
CAREER TARGET
WANT
where the candidate wants to compete
```

Middle rule:

```text
WANT cannot satisfy a JobRequirement.
```

Below:

```text
Job + CareerTarget → TargetRelevance
Job + CareerTruth  → JobMatch
```

Evidence:

`E-CV-09`

This chapter should be visually very clean and almost poster-like.

---

# 12. Opportunity Assessment chapter

The output is not “ATS score 92%.”

It is a decision object:

```text
recommendation
to apply?
next action
eligibility
evidence strength
required coverage
preferred coverage
strong evidence
transferable evidence
critical gaps
uncertainties
```

Recommendation states:

```text
READY_NOW
STRONG_STRETCH
BUILDABLE
ASPIRATIONAL
LOW_ALIGNMENT
```

Explicit footer:

```text
NOT HIRING PROBABILITY
NOT RECRUITER DECISION
NOT COMMERCIAL ATS SCORE
```

Evidence:

`E-CV-08`

---

# 13. Resume Provenance chapter

The résumé appears late in the case on purpose.

Visual chain:

```text
CareerAssertion
      ↓
ResumeClaim
      ↓
ClaimLedger
      ↓
ResumeVersion
```

ResumeVersion specimen exposes:

```text
candidateProfileId
targetedJobDescriptionId
targetJobDescriptionSha256
matchReportId
claimIds
contentSha256
generation.provider
generation.model
generation.contractVersion
```

Core line:

> **The resume is a versioned projection of truth, not the truth store.**

Evidence:

`E-CV-05 · E-CV-06 · E-CV-07`

---

# 14. Market Ingress chapter

This begins the Career Opportunity Intelligence expansion.

Do not present provider logos as integrations wall.

Render the boundary:

```text
GREENHOUSE ─┐
LEVER ──────┼─→ CONTROLLED SOURCE ADAPTER
ASHBY ──────┘              ↓
                     MARKET OBSERVATION
                           ↓
                 OBSERVATION OCCURRENCE
```

Show constraints as actual system limits:

```text
fixed provider hosts
HTTPS only
redirect reject
JSON only
abortable timeout
2 MiB ceiling
provider identity validation
no arbitrary URL fetch
```

Evidence:

`E-CV-10 · E-CV-11`

---

# 15. UNKNOWN ≠ FALSE chapter

The strongest Applied AI / inference-discipline moment.

Oversized statement:

# **UNKNOWN ≠ FALSE**

Secondary:

# **SOURCE_SILENT ≠ INFERRED_VALUE**

Render one `DerivedMarketField` object:

```text
status = UNKNOWN
reason = SOURCE_SILENT
```

beside a known field:

```text
status = KNOWN
value = REMOTE
derivation = CONTROLLED_CLASSIFICATION
sourceField = workModel
sourceValue = remote
```

Explain visually that a title containing “Senior” or “Remote” does not authorize filling absent structured fields.

Evidence:

`E-CV-12`

---

# 16. Provenance-bound Job Intelligence chapter

Visual chain:

```text
MarketObservation
      ↓
DerivedMarketInterpretation
      ↓
MarketJobProjection
      ↓
AUTHORIZED SOURCE TEXT
      ↓
Job Intelligence
      ↓
JobSnapshot
```

The system has exactly two legal parser-text origins:

```text
RAW TEXT OBSERVATION
SOURCE-EXPLICIT JSON DESCRIPTION
```

Metadata does not become synthetic requirement text.

Evidence:

`E-CV-13`

---

# 17. Exact Snapshot → Decision chapter

Central statement:

# **THE JOB SNAPSHOT IS CONSUMED, NOT REBUILT.**

Visualize immutable object identity flowing into:

```text
JobSnapshot
    ↓
Job Match
    ↓
OpportunityAssessment
    ↓
OpportunityHistory
```

The JobSnapshot ID should remain visually unchanged across the flow.

The assessment route accepts the snapshot identity, not a caller-provided replacement job description.

Evidence:

`E-CV-14`

---

# 18. Verification chapter

Use a Paper verification matrix distinct from AutoPulse but within the same evidence language.

Rows:

```text
Candidate truth requires provenance                      SOURCE / TEST
Requirement matches preserve GAP/UNKNOWN                 SOURCE / TEST
Responsibility escalation guard examples                 TEST ARTIFACT
Resume wording must trace to assertions                  TEST ARTIFACT
Durable Career Vault rejects tampered content            TEST ARTIFACT
Opportunity recommendation is bounded                    SOURCE
Provider ingress is bounded                              SOURCE / TEST
Market UNKNOWN is first-class                            SOURCE
Exact market JobSnapshot is consumed                     SOURCE / TEST
Opportunity identity/lifecycle                           NOT YET / NEXT
```

The last row is mandatory.

It proves the case is willing to expose what remains unfinished.

---

# 19. Evidence chapter

Evidence Library records to create:

```text
E-CV-01 ... E-CV-14
```

Each visible identifier in the case must route to the Evidence System, following the AutoPulse pattern.

---

# 20. Current boundary / ending

The case does not end with:

> “And now AI helps you get hired.”

It ends with the current architectural boundary:

```text
CURRENTLY PROVEN
external source
→ provenance-preserving market truth
→ JobSnapshot
→ application decision

NEXT SYSTEM PROBLEM
logical opportunity identity
→ source deduplication
→ OPEN / CLOSED / STALE lifecycle
→ freshness semantics
```

This makes active R&D a strength without pretending it is already complete.

---

# 21. Visual intensity rules

```text
AUTOMOTIVE LITERALISM       0%
MECHANICAL UNDERTONE        3–5%
EDITORIAL ENGINEERING       VERY HIGH
INFORMATION ARCHITECTURE    VERY HIGH
PAPER / DOSSIER             VERY HIGH
REDLINE ACCENT              CONTROLLED
AI VISUAL CLICHÉ            0%
```

Motion verbs:

```text
SEPARATE
BIND
TRACE
COMPARE
CLASSIFY
PRESERVE
PROJECT
```

Avoid animation that implies magic generation.

---

# 22. 10-second test

A client should understand:

1. Eduardo built a serious career/application system, not just a resume form.
2. The system is designed around evidence and traceability.
3. AI/recommendations are downstream from truth boundaries.
4. The project contains real architecture beyond UI.

If the first impression is “AI resume builder,” the composition fails.

---

# 23. Conversion test

The case must answer a potential client’s unstated question:

> **Can Eduardo design software where business decisions depend on multiple kinds of imperfect data without letting the system blur them together?**

Desired answer:

> **Yes.**

---

# 24. Gate

```text
PRIMARY CLAIM                    ✅
OPENING PROBLEM                  ✅
CASE SPINE                       ✅
TRUTH VISUAL GRAMMAR             ✅
MATCH VISUAL GRAMMAR             ✅
CAN / WANT MOMENT                ✅
DECISION OBJECT                  ✅
RESUME PROVENANCE                ✅
MARKET INGRESS                   ✅
UNKNOWN DISCIPLINE               ✅
SNAPSHOT PROVENANCE              ✅
CURRENT LIMIT / M4B-07           ✅
EVIDENCE ROUTING CONTRACT        ✅
ANTI-AI-CLICHÉ BOUNDARY          ✅
```

# `SLICE 05D — ✅ CLOSED`

Next:

# `SLICE 05E — CV Engine Case Implementation`
