export type Publicability = "PUBLIC" | "SANITIZED" | "ABSTRACTED" | "PRIVATE";

export type SystemState =
  | "ACTIVE"
  | "ACTIVE_RND"
  | "VERIFIED"
  | "EXPERIMENTAL"
  | "ARCHIVED";

export type PortfolioRole = "FLAGSHIP" | "SUPPORT" | "NOTE" | "RESERVED";

export interface SystemRecord {
  id: string;
  slug: string;
  name: string;
  label: string;
  summary: string;
  path: readonly string[];
  role: PortfolioRole;
  ownership: string;
  state: SystemState;
  publicability: Publicability;
  href?: string;
}

export type EvidenceState =
  | "IMPLEMENTED"
  | "SOURCE_VERIFIED"
  | "TEST_ARTIFACT"
  | "FIELD_VALIDATED"
  | "IN_TEST"
  | "NOT_CLAIMED";

export type EvidenceType =
  | "ARCHITECTURE"
  | "IMPLEMENTATION"
  | "TEST"
  | "RECOVERY"
  | "PRODUCT"
  | "MODEL";

export interface EvidenceSource {
  label: string;
  repository: string;
  path: string;
  ref: string;
  reviewedBlobSha?: string;
}

export interface EvidenceRecord {
  id: string;
  slug: string;
  systemId: string;
  systemName: string;
  title: string;
  type: EvidenceType;
  claim: string;
  state: EvidenceState;
  sources: readonly EvidenceSource[];
  publicability: Publicability;
  context: string;
  limitations: string;
  relatedDecisionIds: readonly string[];
  relatedArchitectureIds: readonly string[];
}

export type NoteState = "BUILT_VERIFIED" | "EXPLORING";

export type NoteTerritory =
  | "SYSTEM THINKING"
  | "BUILDING"
  | "RECOVERY"
  | "APPLIED AI"
  | "EVIDENCE"
  | "FIELD NOTE";

export interface NoteSection {
  heading: string;
  body: string;
}

export interface NoteRecord {
  id: string;
  slug: string;
  title: string;
  thesis: string;
  state: NoteState;
  territory: NoteTerritory;
  systemName?: string;
  systemHref?: string;
  relatedEvidenceIds: readonly string[];
  sections: readonly NoteSection[];
  currentBoundary?: string;
  publicability: Publicability;
}
