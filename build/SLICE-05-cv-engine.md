# BUILD — SLICE 05 · CV Engine

**Status:** ✅ CLOSED  
**Branch:** `develop`  
**Final Portfolio CI:** run `31963708321` — success  
**Final CV Engine Visual Proof:** run `31963708388` — success  
**Final visual artifact:** `cv-engine-section-visual-proof`  
**Artifact ID:** `9267916055`  
**Artifact digest:** `sha256:518a05d49a0e23e145473c340d6218cd1b73fff74773b5f687f35bb8b13cf542`  
**Evidence corpus regression proof:** run `31963343162` — success  
**Evidence artifact digest:** `sha256:01ab5b369cee1b13bdc1f03f04ba24f5453d695ef7f8ca0ae7cec025f576fc4f`

---

# 1. Slice responsibility

SLICE 05 had to build the second flagship without repeating AutoPulse.

AutoPulse demonstrates:

> reliable state and recovery under messy physical/runtime telemetry.

CV Engine needed to demonstrate:

> disciplined information architecture where candidate truth, market truth, derived analysis and recommendation remain different kinds of objects even while AI and external market data participate.

The final primary claim is:

# **I can build decision systems without collapsing different kinds of truth into one score.**

---

# 2. Source-of-truth correction

Source repository:

`Em3rc0d/harvard-ats-resume`

Portfolio recovery branch:

`develop`

The root README still describes an older “AI Harvard ATS Resume Builder” product.

That description was explicitly demoted as current architecture authority.

Current authority order:

```text
CURRENT DOMAIN / APPLICATION SOURCE
        >
CURRENT TEST ARTIFACTS
        >
CURRENT MARKET / ATS V2 EXECUTION DOCS
        >
HISTORICAL BASELINE DOCS
        >
ROOT README MARKETING LANGUAGE
```

The public case therefore presents the current system as:

```text
Application Intelligence
        ↓
Career Opportunity Intelligence
```

rather than as a resume-generation app.

---

# 3. Recovery / evidence gates

## 05A–05C — ✅ CLOSED

Created:

`evidence/systems/cv-engine-evidence-dossier-v1.md`

The dossier freezes the current claim ceiling before visual implementation.

Public evidence canon:

```text
E-CV-01  Career evidence and assertion truth boundary
E-CV-02  Job requirements remain job-side truth
E-CV-03  Evidence-backed requirement matching
E-CV-04  Semantic responsibility-escalation guardrails
E-CV-05  Claim Ledger / resume claim provenance
E-CV-06  Content-addressed ResumeVersion provenance
E-CV-07  Durable Career Vault graph
E-CV-08  Opportunity assessment before application
E-CV-09  CareerTarget intent separated from capability
E-CV-10  MarketObservation / occurrence truth boundary
E-CV-11  Controlled provider source acquisition
E-CV-12  Derived market interpretation: UNKNOWN is first-class
E-CV-13  Provenance-bound Job Intelligence projection
E-CV-14  Exact market JobSnapshot assessment integration
```

All fourteen records were also added as typed `EvidenceRecord` objects and integrated into the global Evidence Library.

---

# 4. Current architecture boundary

Current Market execution recovered from the source repository:

```text
PLATFORM BASELINE                              COMPLETE
MARKET-01 Application Intelligence            COMPLETE
MARKET-02 Opportunity History                 COMPLETE
MARKET-03 CareerTarget / Relevance            COMPLETE
MARKET-04A OpportunitySpace                   COMPLETE
MARKET-04B-01 Market Observation Canon        COMPLETE
MARKET-04B-02A Canonical Structured Intake    COMPLETE
MARKET-04B-02B Durable Observation History    COMPLETE
MARKET-04B-03 Controlled Source Acquisition   COMPLETE
MARKET-04B-04 Derived Market Interpretation   COMPLETE
MARKET-04B-05 Job Intelligence Projection     COMPLETE
MARKET-04B-06 Market Assessment Integration   COMPLETE
MARKET-04B-07 Opportunity Identity/Lifecycle  NEXT
```

Therefore the case explicitly does **not** claim completed:

- logical cross-source opportunity identity;
- source deduplication semantics;
- OPEN / CLOSED / STALE lifecycle;
- freshness semantics;
- continuous provider polling;
- broad market synchronization;
- outcome learning.

---

# 5. Story contract

## 05D — ✅ CLOSED

Created:

`arch/cases/cv-engine-flagship-story-contract-v1.md`

Opening problem:

> **A job description can tell you what a company wants. It cannot tell you what you can prove.**

Case spine:

```text
00 COVER
01 PROBLEM
02 TRUTH CLASSES
03 CAREER EVIDENCE → ASSERTION
04 JOB TRUTH
05 REQUIREMENT MATCH
06 GROUNDING / RESPONSIBILITY
07 CAN ≠ WANT
08 OPPORTUNITY ASSESSMENT
09 CLAIM / RESUME PROVENANCE
10 MARKET INGRESS
11 UNKNOWN ≠ FALSE
12 PROVENANCE-BOUND JOB INTELLIGENCE
13 EXACT SNAPSHOT → DECISION
14 VERIFICATION
15 EVIDENCE
16 CURRENT BOUNDARY / NEXT
```

The visual composition is intentionally more editorial / information-control oriented than AutoPulse.

---

# 6. Core truth grammar

The case visually separates:

```text
CAREER FACT
    ≠
MARKET FACT
    ≠
DERIVED ANALYSIS
    ≠
RECOMMENDATION
```

This is the central system identity.

Candidate truth classes shown:

```text
CANDIDATE_ASSERTED
VERIFIED_FACT
DERIVED_FACT
REWRITE
SUGGESTION
```

with real current constraints:

```text
VERIFIED_FACT → evidence/source required
DERIVED_FACT  → derivation rule required
REWRITE       → source assertion required
SUGGESTION    → cannot become ResumeClaim directly
```

---

# 7. Candidate truth vs job truth

Candidate-side graph:

```text
CareerSource
    ↓
CareerEvidence
    ↓
CareerAssertion
```

Job-side graph:

```text
JobDescription
    ↓
JobRequirement
    ↓
JobSnapshot
```

Invariant exposed in the interface:

# `JobRequirement != CandidateSkill`

This prevents job requirements from silently becoming candidate capability evidence.

---

# 8. Requirement matching

The case uses real behavior examples from current benchmark artifacts:

```text
JavaScript            vs Java                    → GAP
Azure                 vs AWS                     → GAP
2 documented years    vs 5 required years        → GAP
collaborated           vs lead engineering teams → GAP
missing authorization vs authorization required  → UNKNOWN
TypeScript evidence   vs TypeScript required     → MATCH
```

Match states remain:

```text
MATCH
POTENTIAL_MATCH
GAP
UNKNOWN
BLOCKER
```

The visual objective is to make it obvious that uncomfortable states survive comparison.

---

# 9. Semantic grounding / responsibility escalation

The case includes the current guardrail examples:

```text
participated → led         NEEDS CONFIRMATION
implemented  → designed    NEEDS CONFIRMATION
designed     → architected NEEDS CONFIRMATION
built        → owned       NEEDS CONFIRMATION
built APIs   → developed APIs APPROVED EXAMPLE
```

The portfolio deliberately does **not** use language such as:

> hallucination-proof

or:

> universal semantic entailment.

The public claim remains bounded:

> High-risk responsibility escalation is explicitly checked.

---

# 10. CAN ≠ WANT

One of the flagship’s primary visual moments separates:

```text
CAREER TRUTH / CAN
what current evidence supports
```

from:

```text
CAREER TARGET / WANT
where the candidate wants to compete
```

Invariant:

> **WANT cannot satisfy a JobRequirement.**

Therefore:

```text
Job + CareerTruth  → JobMatch
Job + CareerTarget → TargetRelevance
```

This section passed the final desktop and separate mobile CAN/WANT browser proof.

---

# 11. Opportunity assessment

The case does not display a fake “ATS score 92%”.

The real derived object carries bounded recommendation state:

```text
READY_NOW       → APPLY
STRONG_STRETCH  → APPLY_WITH_CAUTION
BUILDABLE       → BUILD_FIRST
ASPIRATIONAL    → PLAN_PATH
LOW_ALIGNMENT   → DEPRIORITIZE
```

The interface explicitly states:

```text
NOT HIRING PROBABILITY
NOT RECRUITER DECISION
NOT COMMERCIAL ATS SCORE
```

---

# 12. Resume provenance

The resume intentionally appears late in the case.

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

ResumeVersion specimen exposes provenance concepts such as:

```text
candidateProfileId
targetedJobDescriptionId
targetJobDescriptionSha256
matchReportId
claimIds[]
contentSha256
generation.provider
generation.model
generation.contractVersion
```

Core statement:

> **The resume is a versioned projection of truth, not the truth store.**

---

# 13. Controlled market ingress

The market expansion does not use provider logos as a generic integrations wall.

It shows:

```text
GREENHOUSE ─┐
LEVER ──────┼─→ CONTROLLED SOURCE ADAPTER
ASHBY ──────┘              ↓
                     MarketObservation
```

Current source constraints displayed:

```text
fixed provider hosts
HTTPS only
redirect reject
JSON only
abortable timeout
2 MiB response ceiling
provider identity validation
no arbitrary URL fetch
```

The final visual proof includes a dedicated provider-flow capture, not only the chapter headline.

---

# 14. UNKNOWN ≠ FALSE

A second primary identity moment states:

# **UNKNOWN ≠ FALSE**

and:

# **SOURCE_SILENT ≠ INFERRED_VALUE**

The chapter compares:

```text
KNOWN
value = REMOTE
derivation = CONTROLLED_CLASSIFICATION
sourceField = workModel
sourceValue = remote
```

against:

```text
UNKNOWN
reason = SOURCE_SILENT
value = —
```

This exposes one of the strongest current system boundaries:

> missing structured market information stays missing instead of being silently inferred from adjacent text.

---

# 15. Market → Job Intelligence projection

Visual flow:

```text
MarketObservation
      ↓
DerivedMarketInterpretation
      ↓
MarketJobProjection
      ↓
Job Intelligence
      ↓
JobSnapshot
```

Only two parser-text origins are presented as legal:

```text
RAW TEXT OBSERVATION
SOURCE-EXPLICIT JSON DESCRIPTION
```

Metadata is not concatenated into synthetic requirement text.

---

# 16. Exact JobSnapshot decision invariant

Central statement:

# **THE JOB SNAPSHOT IS CONSUMED, NOT REBUILT.**

Visual flow:

```text
JobSnapshot identity
      ↓
Job Match
      ↓
OpportunityAssessment
      ↓
OpportunityHistory
```

The same snapshot identity remains visible through the flow.

The final corrected desktop capture proves both headline containment and flow layout.

---

# 17. Verification / unfinished boundary

The verification matrix exposes current evidence and an explicit unfinished row:

```text
Opportunity identity / OPEN-CLOSED-STALE lifecycle
STATE  NEXT / NOT CLAIMED
REF    M4B-07
```

This row is mandatory to the current public case because the architecture must expose where evidence stops.

The final browser workflow captures the matrix directly so this row is visible in proof.

---

# 18. Evidence integration

Typed evidence records:

`src/content/cv-engine-evidence.ts`

Combined evidence corpus:

`src/content/evidence-index.ts`

The Evidence Library now contains both:

```text
AutoPulse   E-AP-01 → E-AP-09
CV Engine   E-CV-01 → E-CV-14
```

CV Engine Evidence Visual Proof includes the `E-CV-12` dossier on desktop and mobile.

Evidence regression run:

`31963343162` ✅

Artifact digest:

`sha256:01ab5b369cee1b13bdc1f03f04ba24f5453d695ef7f8ca0ae7cec025f576fc4f`

---

# 19. Implemented files

Evidence recovery:

- `evidence/systems/cv-engine-evidence-dossier-v1.md`

Architecture/story:

- `arch/cases/cv-engine-flagship-story-contract-v1.md`

Typed case content:

- `src/content/cv-engine.ts`

Typed evidence:

- `src/content/cv-engine-evidence.ts`
- `src/content/evidence-index.ts`

Case composition:

- `src/components/systems/cv-engine/cv-engine-case.tsx`

Visual system:

- `src/app/cv-engine.css`
- `src/app/cv-engine-fixes.css`

Route integration:

- `src/app/systems/[slug]/page.tsx`

Browser proof:

- `.github/workflows/cv-engine-visual-proof.yml`

---

# 20. Final CI

Final CI run:

`31963708321`

Result:

```text
Install dependencies   ✅
Lint                    ✅
Typecheck               ✅
Production build        ✅
```

---

# 21. First visual audit — defects found

The first CV Engine Visual Proof run completed technically, but visual review found two real defects.

## INCIDENT 01 — WANT overflow

The original `CAN ≠ WANT` desktop composition used an oversized heading formula that allowed the four-letter `WANT` wordmark to escape its Paper panel.

This was a visual failure even though CI and screenshot capture were green.

Correction:

- lower responsive heading ceiling;
- explicit min-width containment;
- mobile heading ceiling reduced separately.

Final desktop and dedicated mobile WANT capture: **PASS**.

## INCIDENT 02 — snapshot invariant clipped

The original snapshot header placed the long invariant in a narrow second grid column.

Result:

`THE JOB SNAPSHOT IS CONSUMED, NOT REBUILT.`

was clipped at the viewport edge.

Correction:

- dedicated snapshot header grid with a larger invariant column;
- reduced responsive heading ceiling;
- explicit min-width containment.

Final chapter and snapshot-flow captures: **PASS**.

---

# 22. Strengthened final browser proof

Workflow:

`.github/workflows/cv-engine-visual-proof.yml`

Final run:

`31963708388`

Artifact:

`cv-engine-section-visual-proof`

Artifact ID:

`9267916055`

Digest:

`sha256:518a05d49a0e23e145473c340d6218cd1b73fff74773b5f687f35bb8b13cf542`

Final captured views:

```text
cv-cover-desktop.png
cv-truth-desktop.png
cv-match-desktop.png
cv-can-want-desktop.png
cv-market-desktop.png
cv-provider-flow-desktop.png
cv-unknown-desktop.png
cv-snapshot-desktop.png
cv-snapshot-flow-desktop.png
cv-verification-desktop.png
cv-verification-table-desktop.png
cv-evidence-desktop.png
cv-cover-mobile.png
cv-can-mobile.png
cv-want-mobile.png
cv-unknown-mobile.png
```

---

# 23. Final Jett visual audit

## Cover — PASS

The second flagship is immediately distinct from AutoPulse.

The four-layer interactive decision stack communicates architecture before feature marketing.

It reads as an information-control system, not an AI résumé landing page.

## Truth Classes — PASS

Paper/grid material is appropriate because the chapter is modeling epistemic status rather than runtime behavior.

The five truth classes remain readable and traceable.

## Requirement Match — PASS

The case shows concrete `MATCH / GAP / UNKNOWN` behavior and avoids a decorative aggregate score as the primary visual.

## CAN ≠ WANT — PASS AFTER CORRECTION

The split now has a strong poster-like identity while both words remain fully contained.

Mobile CAN and WANT were captured separately to verify both sides of the stacked layout.

## Market Ingress — PASS

The chapter headline remains editorial, while dedicated provider-flow proof verifies the actual Greenhouse/Lever/Ashby → controlled adapter → MarketObservation composition.

## UNKNOWN ≠ FALSE — PASS

This is one of the strongest visual and architectural identity moments in the portfolio.

It communicates inference discipline without AI visual cliché.

## Exact Snapshot → Decision — PASS AFTER CORRECTION

The invariant is now fully contained and the flow keeps the same JobSnapshot identity visible through match, assessment and history.

## Verification — PASS

Dedicated matrix proof confirms the final `M4B-07 — NEXT / NOT CLAIMED` row is visible.

## Evidence — PASS

The fourteen evidence records remain usable as inspection routes and do not reduce the case ending to marketing copy.

## Mobile — PASS AT CURRENT GATE

Cover, CAN, WANT and UNKNOWN are contained at `390 × 844`.

Full keyboard/touch/focus/accessibility scrutiny remains intentionally reserved for SLICE 07.

---

# 24. Flagship differentiation gate

The two flagship cases now prove different engineering capabilities:

```text
AUTOPULSE
messy physical/runtime signal
→ durable state
→ recovery
→ integrity

CV ENGINE
multiple truth classes
→ provenance
→ comparison
→ bounded recommendation
→ controlled external market ingress
```

They share THE BUILD ROOM design system but do not look like duplicate templates.

# FLAGSHIP DIFFERENTIATION — ✅ PASS

---

# 25. SLICE 05 gate

```text
Current source recovered              ✅
Historical README demoted             ✅
Claim ceiling frozen                  ✅
Evidence dossier                      ✅
14 typed EvidenceRecords              ✅
Story / composition contract          ✅
Dedicated flagship implementation     ✅
Evidence System integration           ✅
CI                                    ✅
Initial browser proof                 ✅
Visual defects audited                ✅
Defects corrected                     ✅
Strengthened browser proof            ✅
Desktop                               ✅
Mobile current-gate proof             ✅
M4B-07 limit visible                  ✅
Flagship differentiation              ✅
```

# `SLICE 05 — ✅ CLOSED`

---

# 26. Next

Proceed to:

# `SLICE 06 — Notes / About / Contact`

Responsibility:

- complete the human/reputation layer around the flagship engineering evidence;
- make Notes a real public engineering notebook, not a blog placeholder;
- distinguish `BUILT / VERIFIED` from `EXPLORING` in note content;
- make About explain the builder behind the systems without title inflation;
- include the automotive/mechanical passion as a subtle personal signal, not portfolio theme;
- make Contact trust-first, short and commercially useful;
- preserve the existing semantic navigation and Build Room visual language.
