# CV Engine — Evidence Dossier v1

**Portfolio role:** FLAGSHIP  
**Source repository:** `Em3rc0d/harvard-ats-resume`  
**Source branch reviewed:** `develop`  
**Purpose:** freeze the public claim ceiling for the second THE BUILD ROOM flagship before visual implementation.

---

# 1. Authority order

The root README remains useful historical provenance, but it describes an older product framing: AI resume builder + ATS keyword matching + PDF generation.

The current portfolio case must use this authority order:

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

The current Market Architecture explicitly states that CV Engine is no longer evolved primarily as an AI Resume Builder or generic ATS score tool.

Current product direction:

```text
BEACHHEAD  Application Intelligence for individuals
QUESTION   Should I apply to this opportunity?
HARBOR     Career Opportunity Intelligence
```

Resume generation is a contextual projection of career truth for an application, not the system source of truth.

---

# 2. Current public story ceiling

A defensible flagship story is:

> **CV Engine is an application-intelligence system that keeps career truth, job truth, derived analysis and recommendation separate. It can trace candidate evidence into assertions, compare those assertions against job requirements, preserve the provenance of generated resume claims, assess whether an opportunity is worth pursuing, and ingest controlled external opportunity sources without allowing market data to manufacture candidate truth.**

Do not reduce the public case to:

> “AI writes a better resume.”

Do not claim:

- hiring probability;
- recruiter acceptance probability;
- interview probability;
- simulation of a specific commercial ATS;
- universal semantic entailment;
- autonomous web crawling;
- provider synchronization;
- cross-source opportunity deduplication;
- opportunity OPEN/CLOSED/STALE lifecycle;
- outcome learning;
- production-scale provider polling.

Those are either explicitly rejected semantics or later/non-goal boundaries in current source documentation.

---

# 3. Truth model

Current system truth classes include:

```text
CANDIDATE_ASSERTED
VERIFIED_FACT
DERIVED_FACT
REWRITE
SUGGESTION
```

`CareerAssertion` validation requires evidence/source support for `VERIFIED_FACT`, an explicit derivation rule for `DERIVED_FACT`, and source assertions for `REWRITE`.

A `SUGGESTION` cannot be emitted directly as a `ResumeClaim`.

Public claim ceiling:

> Candidate truth is represented as typed assertions with provenance rules rather than as one mutable resume document.

Sources:

- `lib/domain/shared/truth.ts` — reviewed blob `1e68cc211fb90ef5f138068874a5d73e8dd4faaf`
- `lib/domain/candidate/CareerAssertion.ts` — reviewed blob `422d0b25c8c508abef0be25f8538376583aa2351`
- `lib/domain/resume/ResumeClaim.ts` — reviewed blob `83dc74f9f1b3548a786af09d1cc90f27b8a78eb9`

---

# 4. Evidence canon proposed for the portfolio

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

These identifiers are authorized by the recovered source state below.

---

# 5. E-CV-01 — Career evidence and assertion truth boundary

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC

`CareerEvidence` carries:

- source identity;
- excerpt;
- observation time;
- locator scope/granularity;
- optional confidence;
- review state.

Review states include:

```text
UNREVIEWED_EXTRACTION
CANDIDATE_CONFIRMED
CANDIDATE_EDITED
CANDIDATE_ADDED
```

`CareerAssertion` then points to evidence/source identifiers and has an explicit truth class.

Public statement ceiling:

> CV Engine separates source evidence from the assertions it is allowed to make about a candidate.

Sources:

- `lib/domain/candidate/CareerEvidence.ts` — `01d802ef9cdaa2234b484a6d3f6588fb614676e5`
- `lib/domain/candidate/CareerAssertion.ts` — `422d0b25c8c508abef0be25f8538376583aa2351`

---

# 6. E-CV-02 — Job requirements remain job-side truth

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC

`JobRequirement` is bound to `JobDescriptionId` and carries requirement kind, necessity, canonical concept/aliases, optional minimum years and confidence.

Current validation explicitly states:

```text
JobRequirement derives from JobDescription, never CandidateProfile.
```

`JobSnapshot` preserves the JobDescription, extracted requirements, language, analyzer version and optional market provenance.

Market provenance scope is explicit:

```text
JOB_SNAPSHOT_MARKET_PROVENANCE_NOT_CANDIDATE_TRUTH
```

Public statement ceiling:

> A job requirement can be compared with candidate evidence; it cannot create candidate evidence.

Sources:

- `lib/domain/job/JobRequirement.ts` — `c5e1b88533558a3f8fa9ecca194583abcb1f5b69`
- `lib/domain/job/JobSnapshot.ts` — `ea5bc1732a3516bc4b663b518aa72f7e97be3a86`

---

# 7. E-CV-03 — Evidence-backed requirement matching

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`RequirementMatch` states are:

```text
MATCH
POTENTIAL_MATCH
GAP
UNKNOWN
BLOCKER
```

`MATCH` and `POTENTIAL_MATCH` must reference one or more existing `CareerAssertion` identifiers.

The matching engine does not treat every lexical overlap equally. Current implementation includes explicit treatment for skills, tenure, responsibility intent, education, location, language, certification, work authorization and other requirements.

Important public examples supported by benchmark fixtures:

- JavaScript does not satisfy Java;
- Azure does not satisfy AWS;
- a documented two-year period does not satisfy a five-year requirement;
- unparseable tenure becomes `POTENTIAL_MATCH`, not fabricated tenure;
- collaboration does not satisfy leadership;
- maintenance does not satisfy architecture responsibility;
- missing work authorization can remain `UNKNOWN`.

Public statement ceiling:

> Matching is a requirement-by-requirement comparison that preserves gaps, uncertainty and evidence references instead of turning every overlap into a positive match.

Sources:

- `lib/domain/matching/RequirementMatch.ts` — `ad1a7fae2b3ea7b50a0fae7531f5fbd69ed31712`
- `lib/domain/matching/MatchReport.ts` — `73d230ce867e766177fab69ce14b0287d43400fe`
- `lib/application/matching/JobMatchEngine.ts`
- `tests/ats2/match-benchmark.test.ts` — `a90ac88e4bc908d41ce79d74b2fa8218508a610a`

The existence of the benchmark test artifact does not mean this portfolio recovery independently reran every CV Engine test.

---

# 8. E-CV-04 — Semantic responsibility-escalation guardrails

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

The grounding layer distinguishes unsupported candidate facts and job-description leakage. Violation classes include unsupported numbers, companies, roles, projects, certifications, skills, education, languages, narrative claims and `JD_REQUIREMENT_LEAKAGE`.

Semantic-entailment tests explicitly reject rewrites such as:

```text
participated  -> led
implemented   -> designed
designed      -> architected
built         -> owned
```

when the stronger responsibility is not supported by candidate evidence.

Equivalent wording can remain approved when evidence supports the semantics.

Public statement ceiling:

> AI-assisted rewriting is not allowed to silently upgrade participation into leadership, implementation into design, or design into architecture ownership.

Sources:

- `lib/application/grounding/GroundingValidator.ts` — `d3a0d46d120f293df88383d57409e76c00101518`
- `tests/ats2/semantic-entailment.test.ts` — `41b4a1986ecb2ecd642a9e2f780286b66305b139`

Do not claim universal semantic entailment correctness. The test artifact itself records evaluated coverage rather than universal entailment.

---

# 9. E-CV-05 — Claim Ledger / resume claim provenance

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC

`ClaimLedger` maps candidate assertions separately from emitted resume claims.

A canonical resume claim uses the exact assertion wording. A later rewrite may replace it only through the grounding path.

`ResumeClaim` must reference at least one known `CareerAssertion`, and `SUGGESTION` assertions are rejected as resume claims.

Public statement ceiling:

> The generated resume is not the truth store. Each emitted claim must remain connected to candidate assertions.

Sources:

- `lib/domain/resume/ClaimLedger.ts` — `1d013d88a9199dcd100f1e65c047d4a6bc681cd2`
- `lib/domain/resume/ResumeClaim.ts` — `83dc74f9f1b3548a786af09d1cc90f27b8a78eb9`

---

# 10. E-CV-06 — Content-addressed ResumeVersion provenance

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`ResumeVersion` carries:

- candidate identity;
- optional targeted job identity + job hash;
- optional MatchReport identity;
- exact ResumeClaim identities;
- resume content SHA-256;
- generation provider/model/contract version;
- creation time.

Current versioning tests show:

- same approved content + same target keeps deterministic version identity across runtime timestamps;
- changing the target changes version identity even with identical rendered resume content;
- generated skill lines retain supporting assertion provenance;
- materially untraceable wording is rejected.

Public statement ceiling:

> Resume versions are provenance-bearing application artifacts, not mutable copies detached from the candidate/job state that produced them.

Sources:

- `lib/domain/resume/ResumeVersion.ts` — `68a8a92d8b250a7aef1e9b7a308444dfe543e75d`
- `tests/ats2/resume-versioning.test.ts` — `f402107f1ae7d90a561c4c2c7ec436d806a60a25`

---

# 11. E-CV-07 — Durable Career Vault graph

**Claim state:** TEST-ARTIFACT PRESENT / SOURCE-VERIFIED  
**Publicability:** PUBLIC

The Career Vault test fixture composes:

```text
candidate truth
    +
job intelligence
    +
job match
    +
resume composition
    ↓
durable CareerVault snapshot
```

The test artifact verifies examples including:

- durable reload with candidate → job → resume provenance;
- no candidate assertion created from a missing target skill such as Kubernetes;
- exact replay without duplicate immutable history;
- separate history when target job changes;
- invalid partial manifest rejected before save;
- tampered rendered resume rejected by content-hash validation;
- failed durable save preserving the previously committed snapshot;
- missing durable storage configuration failing closed rather than pretending in-memory persistence is durable.

Public statement ceiling:

> CV Engine preserves a durable candidate/job/match/resume graph and validates that the stored resume artifact still belongs to the provenance graph that authorized it.

Source:

- `tests/ats2/career-vault.test.ts` — `80721b95f44ecf9872eda9a193c0acf01a7e752f`

---

# 12. E-CV-08 — Opportunity assessment before application

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

Current `OpportunityAssessment` recommendation classes:

```text
READY_NOW
STRONG_STRETCH
BUILDABLE
ASPIRATIONAL
LOW_ALIGNMENT
```

Action layer:

```text
APPLY
APPLY_WITH_CAUTION
BUILD_FIRST
PLAN_PATH
DEPRIORITIZE
```

The assessment preserves required/preferred coverage, strong/transferable evidence, gaps, uncertainties, eligibility and evidence strength.

Its source scope boundary explicitly says it is:

```text
Evidence-based application guidance only.
This is not a hiring probability, recruiter decision,
or score from a commercial ATS.
```

Public statement ceiling:

> CV Engine converts an evidence-backed job match into an application decision without pretending to predict an employer's decision.

Sources:

- `lib/application/opportunity/OpportunityAssessment.ts` — `4bc5641d17997750b34507ff06789792b84b41f5`
- `docs/market-v0.1/README.md` — `0a3fa1eca27fd0c49f9537b636cdb2f8f7903120`

---

# 13. E-CV-09 — CareerTarget intent separated from capability

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC

`CareerTarget` is explicitly candidate-owned strategic intent.

Current source comment:

```text
This is preference/intent, not evidence of capability.
It can rank or filter opportunities but can never satisfy a JobRequirement
or create CareerEvidence.
```

This supports the conceptual model:

```text
Career Truth  = CAN
CareerTarget  = WANT
Job + Target  = TARGET RELEVANCE
```

Public statement ceiling:

> What a candidate wants to become can affect prioritization, but it cannot rewrite what the candidate can currently prove.

Source:

- `lib/domain/candidate/CareerTarget.ts` — `7627f208e31aba7accf4333aa4069b39fdc77230`

---

# 14. E-CV-10 — MarketObservation / ObservationOccurrence truth boundary

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

`MarketObservation` is the immutable semantic record of what was observed from one market source at the raw/source-explicit layer.

Its boundary is:

```text
OBSERVED_MARKET_FACT_NOT_CANDIDATE_EVIDENCE_OR_DERIVED_INTERPRETATION
```

`ObservationOccurrence` records the temporal fact that this semantic observation was seen at a particular instant and explicitly states:

```text
OBSERVATION_EVENT_NOT_SEMANTIC_MARKET_STATE
```

Current behavior contract:

```text
same semantic source content observed again
=> same MarketObservation
=> new ObservationOccurrence

changed source content
=> new MarketObservation
=> prior observation preserved
```

Public statement ceiling:

> CV Engine separates what a source said from when that same semantic state was observed.

Sources:

- `lib/domain/market/MarketObservation.ts` — `dd4202850bc97a2e1f79cb553d4352ddc90182d6`
- `lib/domain/market/ObservationOccurrence.ts` — `a245f0dbdd52bd99fd44e80f75799f96a5f39be9`
- Market v0.1 execution docs

---

# 15. E-CV-11 — Controlled provider source acquisition

**Claim state:** SOURCE-VERIFIED / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

Current controlled adapters support public job interfaces from:

```text
Greenhouse
Lever
Ashby
```

The acquisition boundary:

- constructs fixed provider API endpoints from provider-native identifiers;
- requires HTTPS;
- rejects redirects;
- accepts JSON only;
- applies an abortable timeout;
- enforces a 2 MiB response ceiling;
- validates provider response identity;
- maps only provider-explicit fields;
- does not expose arbitrary URL fetching.

Current provider acquisition is intentionally one listing at a time and manually triggered. It is not a crawler, poller or synchronization worker.

The controlled-source test artifact verifies, among other cases:

- official endpoint construction;
- explicit field mapping;
- invalid locators failing before network access;
- redirect/no-store/timeout request policy;
- response size ceiling;
- JSON/identity validation;
- repeated source content preserving the same MarketObservation while adding a new occurrence;
- changed provider content preserving prior observation state.

Public statement ceiling:

> CV Engine can ingest selected Greenhouse, Lever and Ashby listings through provider-specific bounded adapters without opening an arbitrary web-fetch surface.

Sources:

- `lib/infrastructure/market/ControlledProviderSourceAdapters.ts` — `267bd6f8201871183164007274f9d8c7508de5b4`
- `tests/ats2/controlled-source-acquisition.test.ts` — `1c4f2a9f5088bbc1acace663203ea752e33430f3`

---

# 16. E-CV-12 — Derived interpretation: UNKNOWN is first-class

**Claim state:** SOURCE-VERIFIED  
**Publicability:** PUBLIC

`DerivedMarketInterpretation` keeps every derived market field either:

```text
KNOWN
```

or:

```text
UNKNOWN
```

UNKNOWN reasons are explicit:

```text
SOURCE_SILENT
UNRECOGNIZED_SOURCE_VALUE
INVALID_SOURCE_VALUE
```

Known values preserve source field/value/path/excerpt evidence and one controlled derivation kind:

```text
NORMALIZED_EXPLICIT
CONTROLLED_CLASSIFICATION
ISO_DATE_NORMALIZATION
```

Current architecture forbids cross-field inference. A title containing “Senior” or “Remote” does not fill silent seniority/work-model fields.

Public statement ceiling:

> Missing market information remains unknown instead of being silently inferred from adjacent text.

Source:

- `lib/domain/market/DerivedMarketInterpretation.ts` — `b1b928cd353f5eb89b9650f3faacdc09cb8d053c`

This is one of the strongest case-study trust signals.

---

# 17. E-CV-13 — Provenance-bound Job Intelligence projection

**Claim state:** DOCUMENTED COMPLETE / SOURCE-BOUNDARY VERIFIED  
**Publicability:** PUBLIC

M4B-05 establishes:

```text
MarketObservation
    ↓
DerivedMarketInterpretation
    ↓
MarketJobProjection
    ↓
Job Intelligence
    ↓
JobDescription + JobRequirements
    ↓
JobSnapshot
```

The central safety rule is that metadata is not requirement text.

Only two parser-input paths are legal:

1. exact raw TEXT observation payload;
2. exact source-explicit description evidence from a JSON/provider observation.

A JSON observation with no explicit description fails closed.

Role title, company, seniority, work model, compensation, etc. are not concatenated into synthetic parser input.

Public statement ceiling:

> CV Engine records exactly what market text was authorized to become executable Job Intelligence instead of letting metadata silently manufacture requirements.

Source:

- `docs/market-v0.1/MARKET-04B-05-JOB-INTELLIGENCE-PROJECTION.md` — `a7fd937eef97d4aeb366aed0d8faafafee2fb4a8`

---

# 18. E-CV-14 — Exact market JobSnapshot assessment integration

**Claim state:** DOCUMENTED COMPLETE / TEST-ARTIFACT PRESENT  
**Publicability:** PUBLIC

M4B-06 makes the exact durable market-provenanced `JobSnapshot` the job-side authority for Application Intelligence.

Central invariant:

```text
THE JOB SNAPSHOT IS CONSUMED, NOT REBUILT.
```

The public market assessment route selects a `jobSnapshotId`; it does not accept a free job-description override or caller-supplied requirements.

Current integration tests cover:

- exact prebuilt JobSnapshot consumption;
- no requirement regeneration;
- no candidate-truth mutation;
- exact JobSnapshot identity through OpportunityHistory;
- history idempotency across runtime timestamps;
- requirement mismatch rejection;
- unknown snapshot rejection;
- tampered history rejection before persistence;
- no `analyzeJobDescription()` call in the M4B-06 assessment service/runtime;
- public route omission of job-description override.

Public statement ceiling:

> Once a market opportunity has become a provenance-bound JobSnapshot, assessment consumes that exact snapshot rather than reparsing or reconstructing job truth at decision time.

Sources:

- `docs/market-v0.1/MARKET-04B-06-MARKET-ASSESSMENT-INTEGRATION.md` — `e5900b757fccbb807d715650c6535d5319364c6a`
- `tests/ats2/market-opportunity-assessment-integration.test.ts` — `68431d3b209bba0e6478bba4bf223b88db9ce07a`

---

# 19. Current execution boundary

Current Market Architecture execution record states:

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

Therefore the portfolio may describe the evidence-preserving path:

```text
EXTERNAL SOURCE
      ↓
MARKET OBSERVATION
      ↓
OBSERVATION HISTORY
      ↓
DERIVED INTERPRETATION
      ↓
JOB INTELLIGENCE PROJECTION
      ↓
JOB SNAPSHOT
      ↓
MATCH
      ↓
OPPORTUNITY ASSESSMENT
```

but must not imply that CV Engine already has completed logical opportunity deduplication/lifecycle/freshness semantics.

---

# 20. Explicit non-goals / forbidden portfolio claims

Do not claim that CV Engine currently provides:

```text
commercial ATS simulation
hiring probability
recruiter probability
interview probability
fully autonomous job crawling
continuous provider polling
cross-source opportunity identity
OPEN/CLOSED/STALE lifecycle
automatic freshness semantics
outcome learning
universal semantic entailment
all-provider job aggregation
production-scale market synchronization
```

Do not display a fabricated “95% chance of interview” or similar metric as visual decoration.

Do not label a recommendation score as an ATS vendor score.

Do not imply a job requirement proves a candidate capability.

---

# 21. Approved flagship narrative

The second flagship should open with the problem:

> **A job description can tell you what a company wants. It cannot tell you what you can prove.**

The case then demonstrates the separation:

```text
CAREER FACT
     ≠
MARKET FACT
     ≠
DERIVED ANALYSIS
     ≠
RECOMMENDATION
```

and the operating path:

```text
Career Evidence
      ↓
Career Assertions
      ↓
Job Requirements
      ↓
Requirement Matches
      ↓
Opportunity Assessment
      ↓
Decision
      ↓
Resume Version
```

The market expansion can then show:

```text
Provider Source
      ↓
MarketObservation
      ↓
Derived Interpretation
      ↓
JobSnapshot
      ↓
Same Application Intelligence kernel
```

The key insight is not “AI generates text.”

It is:

> **The system tries to make better career decisions without allowing inference, recommendations or job-market data to rewrite candidate truth.**

---

# 22. Visual claim constraints

The CV Engine case should not use AutoPulse's mechanical intensity.

Its strongest visual materials should be:

- truth-class separation;
- evidence-to-assertion graph;
- requirement comparison matrix;
- `CAN` vs `WANT` split;
- `KNOWN` vs `UNKNOWN` interpretation object;
- snapshot/provenance graph;
- recommendation as a derived object, visibly downstream from evidence;
- controlled provider ingress;
- version/history objects.

Avoid:

- generic AI gradients;
- chatbot motifs;
- magic sparkle imagery;
- fake recruiter score gauges;
- “ATS 98%” hero numbers;
- résumé-before/after marketing cliché;
- fabricated market statistics.

---

# 23. Gate result

```text
CURRENT SOURCE RECOVERED             ✅
HISTORICAL README DEMOTED            ✅
TRUTH MODEL RECOVERED                ✅
MATCHING BOUNDARY RECOVERED           ✅
GROUNDING BOUNDARY RECOVERED          ✅
RESUME PROVENANCE RECOVERED           ✅
OPPORTUNITY DECISION RECOVERED        ✅
CAREER TARGET BOUNDARY RECOVERED      ✅
MARKET SOURCE BOUNDARY RECOVERED      ✅
CONTROLLED ACQUISITION RECOVERED      ✅
DERIVED UNKNOWN DISCIPLINE RECOVERED  ✅
M4B-05 PROJECTION RECOVERED           ✅
M4B-06 ASSESSMENT RECOVERED           ✅
M4B-07 LIMIT RECORDED                 ✅
PUBLIC CLAIM CEILING                  ✅ FROZEN
```

# `SLICE 05A–05C — RECOVERY / CLAIM CEILING / EVIDENCE DOSSIER` ✅ CLOSED

Next:

# `SLICE 05D — CV Engine Flagship Story & Visual Composition Contract`
