import type { NoteRecord } from "@/lib/content/types";

export const notes: readonly NoteRecord[] = [
  {
    id: "N-01",
    slug: "no-data-is-not-zero",
    title: "NO_DATA is not zero.",
    thesis:
      "Absence is a state. Converting it into a numeric value changes the meaning of the system.",
    state: "BUILT_VERIFIED",
    territory: "SYSTEM THINKING",
    systemName: "AutoPulse",
    systemHref: "/systems/autopulse#problem",
    relatedEvidenceIds: ["E-AP-07"],
    sections: [
      {
        heading: "The shortcut",
        body:
          "Telemetry UIs make zero feel convenient because zero is easy to render and aggregate. But an OBD command returning NO_DATA is not the same event as a valid reading whose value happens to be zero.",
      },
      {
        heading: "The boundary",
        body:
          "In AutoPulse, successful acquisition, NO_DATA, timeout, adapter error and disconnection remain different outcomes. Repeated NO_DATA can retire a PID from the active polling set, while transport failures do not use that same rule.",
      },
      {
        heading: "Why it matters",
        body:
          "Once absence becomes a measurement, downstream summaries can no longer tell whether the vehicle was stationary, the PID was unsupported, or the acquisition simply failed to return a value. Modeling the missing state early preserves the option to reason correctly later.",
      },
    ],
    currentBoundary:
      "The current portfolio evidence supports the explicit NO_DATA path and retirement behavior. It does not generalize the current retirement threshold into an OBD standard requirement.",
    publicability: "PUBLIC",
  },
  {
    id: "N-02",
    slug: "recovery-should-not-rewrite-history",
    title: "Recovery should not rewrite history.",
    thesis:
      "A recovered system can become consistent again without pretending the failure never happened.",
    state: "BUILT_VERIFIED",
    territory: "RECOVERY",
    systemName: "AutoPulse",
    systemHref: "/systems/autopulse#failure",
    relatedEvidenceIds: ["E-AP-05", "E-AP-06", "E-AP-08"],
    sections: [
      {
        heading: "The tempting repair",
        body:
          "When a mobile process disappears during a recording session, it is tempting to reopen the app, reconcile whatever data exists and mark the session complete. That produces a cleaner database and a less truthful history.",
      },
      {
        heading: "The recovery contract",
        body:
          "AutoPulse reconciles durable block-derived counters for orphaned sessions, but the terminal story stays explicit: the session becomes INTERRUPTED with UNEXPECTED_APP_TERMINATION and a recovery event is recorded.",
      },
      {
        heading: "Why it matters",
        body:
          "Recovery is not retroactive success. Keeping the interruption visible lets later summaries, diagnostics and users distinguish a normal stop from a reconstructed state after failure.",
      },
    ],
    publicability: "PUBLIC",
  },
  {
    id: "N-03",
    slug: "job-requirement-is-not-candidate-evidence",
    title: "A job requirement is not candidate evidence.",
    thesis:
      "The thing an employer wants and the thing a candidate can prove belong to different truth domains.",
    state: "BUILT_VERIFIED",
    territory: "SYSTEM THINKING",
    systemName: "CV Engine",
    systemHref: "/systems/cv-engine#job-truth",
    relatedEvidenceIds: ["E-CV-01", "E-CV-02", "E-CV-03"],
    sections: [
      {
        heading: "The dangerous merge",
        body:
          "Resume tooling often starts from a job description and asks how to make the candidate look more aligned. That becomes dangerous when the target requirement leaks into the candidate model itself.",
      },
      {
        heading: "The separation",
        body:
          "CV Engine keeps CareerEvidence and CareerAssertions candidate-side, while JobRequirements derive from the job description. RequirementMatch is the convergence object; it can say MATCH, POTENTIAL_MATCH, GAP, UNKNOWN or BLOCKER without creating new candidate truth.",
      },
      {
        heading: "Why it matters",
        body:
          "A target can guide what to emphasize, what to prepare and whether to apply. It cannot be used as evidence that the candidate already owns a missing skill, responsibility or eligibility condition.",
      },
    ],
    publicability: "PUBLIC",
  },
  {
    id: "N-04",
    slug: "unknown-is-not-false",
    title: "UNKNOWN is not false.",
    thesis:
      "When the source is silent, the system should preserve that silence instead of inventing certainty.",
    state: "BUILT_VERIFIED",
    territory: "APPLIED AI",
    systemName: "CV Engine",
    systemHref: "/systems/cv-engine#unknown",
    relatedEvidenceIds: ["E-CV-12"],
    sections: [
      {
        heading: "Three different states",
        body:
          "A field may be known, explicitly negative, or simply absent from the source. Treating the last two as equivalent makes downstream decisions look more confident than the available information allows.",
      },
      {
        heading: "The market example",
        body:
          "CV Engine models derived market fields as KNOWN or UNKNOWN. UNKNOWN keeps reasons such as SOURCE_SILENT, UNRECOGNIZED_SOURCE_VALUE or INVALID_SOURCE_VALUE. A nearby title containing words like Senior or Remote does not authorize filling a missing structured field.",
      },
      {
        heading: "Why it matters",
        body:
          "This is less visually impressive than an inference engine that fills every blank. It is more useful for a decision system because the user can still see which conclusions came from source material and which questions remain unresolved.",
      },
    ],
    publicability: "PUBLIC",
  },
  {
    id: "N-05",
    slug: "consume-the-snapshot-do-not-rebuild-it",
    title: "Consume the snapshot; do not rebuild it.",
    thesis:
      "If a decision is supposed to use a frozen input, reparsing that input at decision time silently creates a different system state.",
    state: "BUILT_VERIFIED",
    territory: "SYSTEM THINKING",
    systemName: "CV Engine",
    systemHref: "/systems/cv-engine#snapshot",
    relatedEvidenceIds: ["E-CV-13", "E-CV-14"],
    sections: [
      {
        heading: "The hidden rebuild",
        body:
          "A market listing can be observed, interpreted and projected into a durable JobSnapshot. If the assessment route later accepts another free-form description and rebuilds requirements, provenance no longer tells us which job state produced the decision.",
      },
      {
        heading: "The invariant",
        body:
          "The current CV Engine market assessment path selects a JobSnapshot identity. Matching reads the stored requirement set and OpportunityHistory preserves the same snapshot link. The job-side truth is consumed, not regenerated in the decision path.",
      },
      {
        heading: "Why it matters",
        body:
          "Deterministic decision systems need stable inputs. Versioning only helps when the application path actually respects the versioned object instead of reconstructing an equivalent-looking object later.",
      },
    ],
    publicability: "PUBLIC",
  },
  {
    id: "N-06",
    slug: "resume-should-not-be-the-truth-store",
    title: "The resume should not be the truth store.",
    thesis:
      "A resume is one contextual projection of a career record, not the canonical database of who the candidate is.",
    state: "BUILT_VERIFIED",
    territory: "APPLIED AI",
    systemName: "CV Engine",
    systemHref: "/systems/cv-engine#resume",
    relatedEvidenceIds: ["E-CV-05", "E-CV-06", "E-CV-07"],
    sections: [
      {
        heading: "Why documents drift",
        body:
          "A candidate may maintain many targeted resumes. If each document becomes an independent source of truth, wording, dates, responsibilities and skills can diverge without a stable origin to reconcile against.",
      },
      {
        heading: "The projection model",
        body:
          "CV Engine keeps CareerAssertions upstream, maps them into ResumeClaims through a ClaimLedger and records approved ResumeVersions with target, claim and content provenance. The generated document is downstream from the truth graph.",
      },
      {
        heading: "Why it matters",
        body:
          "Targeting a role should change emphasis and wording, not history. Treating the resume as a projection makes it possible to create application-specific artifacts while still asking where every material claim came from.",
      },
    ],
    publicability: "PUBLIC",
  },
  {
    id: "N-07",
    slug: "evidence-needs-a-limitation-field",
    title: "Evidence needs a limitation field.",
    thesis:
      "Knowing what an artifact supports is incomplete unless the system also records what the artifact cannot establish.",
    state: "BUILT_VERIFIED",
    territory: "EVIDENCE",
    systemName: "THE BUILD ROOM",
    systemHref: "/evidence",
    relatedEvidenceIds: [],
    sections: [
      {
        heading: "The confidence leak",
        body:
          "A repository source file may prove that an implementation path exists. A test file may prove a verification artifact exists. Neither automatically proves that the complete current suite was rerun, that physical field validation occurred, or that a business outcome was achieved.",
      },
      {
        heading: "The portfolio contract",
        body:
          "THE BUILD ROOM makes `limitations` a required field on EvidenceRecord. The inspection dossier places the limitation beside the supported claim so visual polish cannot silently upgrade the confidence level.",
      },
      {
        heading: "Why it matters",
        body:
          "Evidence systems should reduce ambiguity, not merely accumulate artifacts. A limitation turns evidence from a confidence badge into a boundary around the claim that can safely be made.",
      },
    ],
    currentBoundary:
      "The current public Evidence Library begins with AutoPulse and CV Engine. Additional systems only enter the corpus after their own publicability and claim ceilings are recovered.",
    publicability: "PUBLIC",
  },
  {
    id: "N-08",
    slug: "when-does-a-listing-become-one-opportunity",
    title: "When does a listing become one opportunity?",
    thesis:
      "Observation history is not the same problem as logical opportunity identity across sources and time.",
    state: "EXPLORING",
    territory: "FIELD NOTE",
    systemName: "CV Engine",
    systemHref: "/systems/cv-engine#boundary",
    relatedEvidenceIds: ["E-CV-10", "E-CV-11", "E-CV-14"],
    sections: [
      {
        heading: "What exists now",
        body:
          "The current market architecture can preserve a semantic MarketObservation separately from each ObservationOccurrence, ingest controlled provider listings, project source-authorized job text and assess the resulting durable JobSnapshot.",
      },
      {
        heading: "The next boundary",
        body:
          "A different question begins when Greenhouse, Lever, Ashby or later sources may describe what is logically the same opportunity—or when one source changes, disappears and returns. Observation identity alone does not answer cross-source deduplication or lifecycle.",
      },
      {
        heading: "The question I am keeping open",
        body:
          "What evidence should authorize two source records to become one logical Opportunity, and how should OPEN, CLOSED, STALE and freshness state evolve without erasing source history? That is the current M4B-07 architecture problem.",
      },
    ],
    currentBoundary:
      "EXPLORING — M4B-07 is next. Cross-source logical opportunity identity, deduplication, OPEN/CLOSED/STALE lifecycle and freshness semantics are not claimed complete.",
    publicability: "PUBLIC",
  },
] as const;

export const publicNotes = notes.filter((note) => note.publicability !== "PRIVATE");

export function findNoteBySlug(slug: string) {
  return publicNotes.find((note) => note.slug === slug);
}
