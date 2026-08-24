# THE BUILD ROOM — Launch Distribution Queue v1

**Cycle:** first six LinkedIn posts  
**State:** SOURCE_LOCKED / DRAFTED  
**Cadence:** 3 posts per week  
**Language:** English  
**Platform:** LinkedIn personal profile  
**Primary goal:** qualified inspection / conversation, not raw reach

---

# Queue overview

| ID | Territory | Source | Reputation role | Proposed slot |
| --- | --- | --- | --- | --- |
| D-001 | SYSTEM THINKING | AutoPulse / N-01 / E-AP-07 | Personal building | 2026-08-25 09:15 PET |
| D-002 | RECOVERY | AutoPulse / N-02 / E-AP-05/06/08 | Personal building | 2026-08-27 09:15 PET |
| D-003 | EVIDENCE | THE BUILD ROOM / N-07 | Evidence discipline | 2026-08-31 09:15 PET |
| D-004 | SYSTEM THINKING / APPLIED AI | CV Engine / N-03 | Current R&D / AI | 2026-09-02 09:15 PET |
| D-005 | BUILD / IMPLEMENT | GPets / E-GP-04 | Full-stack proof | 2026-09-04 09:15 PET |
| D-006 | PROFESSIONAL PRACTICE | Infrastructure Site Mapper / E-PRO-01/02/03 | Professional depth | 2026-09-08 09:15 PET |

The slots are an initial operating proposal so Eduardo can be available after publishing. They are not algorithmic claims and can move before publication.

---

# D-001 — NO_DATA is not zero

**Status:** DRAFTED  
**Territory:** SYSTEM THINKING  
**Source objects:** `N-01`, `E-AP-07`, AutoPulse  
**Portfolio route:** `/notes/no-data-is-not-zero`  
**Supported claim:** absence must remain distinct from a valid zero-value measurement when the system needs to reason about telemetry state.  
**Claim ceiling:** the current AutoPulse evidence supports its explicit NO_DATA path and PID-retirement behavior; this post must not generalize a project-specific threshold into an OBD standard.

## Publish-ready draft

**NO_DATA is not zero.**

That sounds obvious until a telemetry UI has to render both of them.

Imagine an OBD request returns one of these outcomes:

- a valid value of `0`
- `NO_DATA`
- timeout
- adapter error
- disconnect

Flattening them all into `0` makes the UI easier to draw.

It also destroys information.

In AutoPulse I keep successful acquisition, NO_DATA, transport failure and disconnection as different states. Repeated NO_DATA can affect whether a PID remains in the active polling set, while a timeout or adapter failure follows a different path.

Why does that matter?

Because downstream logic should still be able to answer:

> Was the value actually zero, was the PID unsupported, or did acquisition fail?

If absence becomes a measurement too early, later summaries can no longer recover that distinction.

This is a small modeling decision, but I keep finding the same rule in different systems:

**missing information is often a state of its own.**

The cleaner-looking model is not always the more truthful one.

## Bridge

First-comment or end-of-post option:

> I documented the AutoPulse boundary and its evidence here: https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero

## Visual brief

**Canvas:** 1080×1350  
**Type:** technical state card  
**Headline:** `NO_DATA ≠ 0`

Diagram:

```text
OBD REQUEST
   ↓
┌──────────┬─────────┬─────────┬─────────┐
│ VALID 0  │ NO_DATA │ TIMEOUT │ ERROR   │
└──────────┴─────────┴─────────┴─────────┘
     ↓          ↓         ↓         ↓
 MEASURE     ABSENCE   TRANSPORT   ADAPTER
```

Footer label:

`ABSENCE IS A STATE / AUTOPULSE`

Use Carbon background, Paper state cells, red only to mark the false merge `NO_DATA → 0` as rejected.

---

# D-002 — Recovery should not rewrite history

**Status:** DRAFTED  
**Territory:** RECOVERY / FAILURE  
**Source objects:** `N-02`, `E-AP-05`, `E-AP-06`, `E-AP-08`, AutoPulse  
**Portfolio route:** `/notes/recovery-should-not-rewrite-history`  
**Supported claim:** a system can restore consistent derived state after interruption while keeping the interruption explicit in history.  
**Claim ceiling:** this is an AutoPulse recovery contract; do not imply universal crash recovery guarantees.

## Publish-ready draft

**Recovery is not retroactive success.**

Suppose a mobile app dies halfway through a recording session.

When it starts again, durable telemetry is still there. You can reconstruct counters. You can reconcile state. You can make the database internally consistent again.

The tempting final step is:

> mark the session complete.

I think that is the wrong story.

In AutoPulse, recovery can rebuild the durable session summary from persisted blocks, but the terminal state remains explicit:

`INTERRUPTED`

with the failure reason recorded as `UNEXPECTED_APP_TERMINATION` and a recovery event preserved.

The data can be repaired without pretending the interruption never happened.

That distinction matters later when a user or diagnostic path asks:

- Was this a normal stop?
- Was the session reconstructed after failure?
- Can I trust this summary in the same way as an uninterrupted run?

A perfectly clean database can still tell a false history.

My preferred recovery rule is therefore:

**restore consistency, preserve the failure.**

That gives the system a truthful past and a usable present.

## Bridge

> The full recovery note and supporting evidence are here: https://em3rc0d-portfolio.vercel.app/notes/recovery-should-not-rewrite-history

## Visual brief

**Type:** state transition

```text
RECORDING
   │
   ├── normal stop ─────────────→ COMPLETE
   │
   └── app termination ─────────→ INTERRUPTED
                                      │
                                      ↓
                              RECONCILE DURABLE DATA
                                      │
                                      ↓
                               INTERRUPTED + RECOVERED
```

Cross out the false transition:

`INTERRUPTED → COMPLETE`

Headline:

`RECOVERY SHOULD NOT REWRITE HISTORY`

---

# D-003 — Evidence needs a limitation field

**Status:** DRAFTED  
**Territory:** EVIDENCE / PRACTICE  
**Source objects:** `N-07`, THE BUILD ROOM Evidence Library  
**Portfolio route:** `/notes/evidence-needs-a-limitation-field`  
**Supported claim:** evidence is safer when what it cannot establish is recorded beside what it supports.  
**Claim ceiling:** this is an engineering/reputation practice derived from THE BUILD ROOM; do not present it as a formal industry standard.

## Publish-ready draft

**An evidence record without a limitation is a confidence leak.**

A source file can prove that an implementation path exists.

A test file can prove that a verification artifact exists.

Neither automatically proves:

- the entire current suite was rerun,
- a physical field test happened,
- production traffic exercised the path,
- or a business outcome was achieved.

Those are different claims.

While building THE BUILD ROOM, I ended up making `limitations` a required part of every public evidence record.

The structure is intentionally simple:

`CLAIM → PROOF → LIMIT`

For example:

> This source proves the persistence/recovery path exists.

is different from:

> This proves the product is production-ready under every failure condition.

The first may be supported. The second may not be.

The limitation field keeps visual polish, confidence, or enthusiasm from silently upgrading the strength of the evidence.

I like this beyond portfolios too.

When a system reports a result, test, benchmark, AI answer or operational status, it is often useful to ask two questions together:

**What does this support?**

**What does this not establish?**

Evidence should reduce ambiguity, not just accumulate artifacts.

## Bridge

> I kept the full note and evidence model here: https://em3rc0d-portfolio.vercel.app/notes/evidence-needs-a-limitation-field

## Visual brief

**Type:** proof contract

Large horizontal chain:

```text
CLAIM
  ↓
PROOF
  ↓
LIMIT
```

Under `PROOF`:

`SOURCE / TEST / BROWSER / FIELD`

Under `LIMIT`:

`WHAT THIS DOES NOT ESTABLISH`

Paper background with Carbon typography; red registration mark between PROOF and LIMIT.

---

# D-004 — A job requirement is not candidate evidence

**Status:** DRAFTED  
**Territory:** SYSTEM THINKING / APPLIED AI  
**Source objects:** `N-03`, `E-CV-01`, `E-CV-02`, `E-CV-03`, CV Engine  
**Portfolio route:** `/notes/job-requirement-is-not-candidate-evidence`  
**Supported claim:** employer requirements and candidate evidence should remain separate truth domains and converge in a match/assessment object.  
**Claim ceiling:** do not imply CV Engine can universally infer candidate capability or hiring outcomes.

## Publish-ready draft

**A job requirement is not candidate evidence.**

This sounds simple, but it is one of the easiest boundaries to blur in AI resume tooling.

A job description says:

> We need Kubernetes experience.

The candidate record says nothing about Kubernetes.

The system is allowed to conclude:

`GAP`

or maybe `UNKNOWN`, depending on the evidence model.

What it is **not** allowed to do is let the target requirement leak backward and become a candidate fact.

In CV Engine I keep the two sides separate:

```text
CareerEvidence / CareerAssertions
              ↓
        RequirementMatch
              ↑
        JobRequirements
```

The comparison object can describe `MATCH`, `POTENTIAL_MATCH`, `GAP`, `UNKNOWN` or `BLOCKER` without creating new candidate truth.

That lets the job influence decisions such as:

- what to emphasize,
- what to prepare,
- whether to apply,
- what is genuinely missing.

But the target cannot rewrite history.

For me, this is one of the core rules for useful applied AI:

**the model may help compare two truth domains; it should not merge them just to produce a more convenient answer.**

## Bridge

> I documented this truth boundary in CV Engine here: https://em3rc0d-portfolio.vercel.app/notes/job-requirement-is-not-candidate-evidence

## Visual brief

**Type:** dual-truth convergence diagram

```text
CANDIDATE TRUTH              MARKET TRUTH
CareerEvidence               JobRequirements
CareerAssertions                  │
       │                           │
       └──────────┐     ┌──────────┘
                  ↓     ↓
              RequirementMatch
        MATCH / GAP / UNKNOWN / BLOCKER
```

Red warning label between domains:

`DO NOT COPY TARGET → CANDIDATE TRUTH`

---

# D-005 — Offline sync becomes real at replay

**Status:** DRAFTED  
**Territory:** BUILD / IMPLEMENT  
**Source objects:** GPets, `E-GP-04`, public `challenge-cineplanet` repository  
**Portfolio route:** `/systems/gpets` and `/evidence/e-gp-04`  
**Supported claim:** the archived GPets implementation queues browser writes for later synchronization and uses idempotency keys with a backend cache to reduce duplicate effects during replay.  
**Claim ceiling:** this does not prove exactly-once delivery, complete distributed-systems correctness, production scale, SLA or current deployment.

## Publish-ready draft

**Offline sync becomes interesting at the replay boundary.**

Saving a request locally is the easy half.

The harder question is:

> What happens when the browser reconnects and sends it again?

In an archived full-stack challenge I built, GPets, the browser keeps pending mutations in IndexedDB when connectivity is unavailable.

When the request is replayed, it carries an idempotency key.

The backend keeps processed keys in Redis for a bounded period so a repeated key can return the known result instead of blindly applying the same effect again.

The path is roughly:

```text
Browser action
   ↓
IndexedDB queue
   ↓ reconnect
Idempotency-Key
   ↓
Spring API
   ↓
Redis processed-key boundary
   ↓
Apply / reuse known result
```

That is **not** an exactly-once guarantee.

It is a bounded attempt to make replay safer.

The lesson I kept from the project is less about Redis or IndexedDB and more about product design:

**network interruption is a product state.**

If the product can be used while connectivity changes, reconnect and duplicate behavior belong in the application model—not as an afterthought hidden under "retry."

## Bridge

> The full-stack path and exact public source coordinates are inspectable here: https://em3rc0d-portfolio.vercel.app/evidence/e-gp-04

## Visual brief

**Type:** full-stack replay path

```text
BROWSER
  ↓
INDEXEDDB / PENDING
  ↓ reconnect
IDEMPOTENCY KEY
  ↓
SPRING API
  ↓
REDIS KEY CACHE
  ↓
EFFECT / KNOWN RESULT
```

Small footer:

`BOUNDED DUPLICATE DEFENSE ≠ EXACTLY ONCE`

This limitation must be visually present.

---

# D-006 — Proving professional depth without leaking client work

**Status:** DRAFTED  
**Territory:** PROFESSIONAL PRACTICE / SYSTEM THINKING  
**Source objects:** Infrastructure Site Mapper, `E-PRO-01`, `E-PRO-02`, `E-PRO-03`  
**Portfolio route:** `/systems/infrastructure-site-mapper`  
**Supported claim:** a public professional record can expose a bounded engineering problem, architecture pattern and actual contribution while withholding private employer/client artifacts and identifiers.  
**Claim ceiling:** no client/company identity, repository coordinates, screenshots, site data, production metrics, security details or sole-system ownership claims.

## Publish-ready draft

**Private professional work creates a strange portfolio problem.**

You want to prove that you have worked inside real operational constraints.

But the strongest evidence may be exactly the material you should **not** publish.

I ran into this while documenting an infrastructure-mapping system I contributed to professionally.

The public version does **not** include:

- the client/company identity,
- private repository paths,
- operational screenshots,
- facility data,
- security details,
- or production metrics I cannot safely substantiate.

Instead, I preserved the engineering boundary:

- physical hierarchy had to remain explicit,
- spatial views were derived from data rather than fixed screen coordinates,
- provisioning/device context had to stay connected to the hierarchy,
- and my contribution was bounded to implementation and hardening—not whole-system authorship.

That gives the reader something real to inspect without turning confidentiality into a portfolio casualty.

The rule I am keeping is:

**professional confidentiality outranks portfolio completeness.**

A weaker-looking proof that is accurate is better than an impressive proof that exposes material you were trusted to protect.

You can still explain the problem, the model, the responsibility and the limitation.

Sometimes the missing screenshot is part of the evidence discipline.

## Bridge

> I published the abstracted professional record here: https://em3rc0d-portfolio.vercel.app/systems/infrastructure-site-mapper

## Visual brief

**Type:** publicability boundary diagram

```text
REAL PROFESSIONAL WORK
        ↓
RECOVER THE ENGINEERING
        ↓
┌──────────────────────────────┐
│ PUBLIC                       │
│ problem / model / role       │
│ architecture / limitation    │
└──────────────────────────────┘
        │
        └──── WITHHOLD ───→ client / repo / screenshots / ops data
```

Headline:

`PROVE THE ENGINEERING. PROTECT THE SOURCE.`

Use Paper for the public abstraction and Carbon/blurred locked region for withheld material. Do not simulate a real private screenshot.

---

# Cycle acceptance before publication

Each post currently satisfies:

```text
SOURCE OBJECT                  ✅
SUPPORTED CLAIM                ✅
CLAIM CEILING                  ✅
NATIVE VALUE                   ✅
PORTFOLIO / SOURCE BRIDGE      ✅
VISUAL BRIEF                   ✅
PUBLICABILITY CHECK            ✅
```

Remaining before each individual publish action:

```text
FINAL VOICE READ               ◉
VISUAL ASSET RENDER            ◉
OWNER APPROVAL                  ◉
PUBLISH                         ⛔
MEASURE                         ⛔
LEARN                           ⛔
```

Do not mark a post published without its real LinkedIn URL.
