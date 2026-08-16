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

export interface EvidenceRecord {
  id: string;
  systemId: string;
  type: string;
  claim: string;
  state: "VERIFIED" | "PARTIAL" | "IN_TEST" | "UNVERIFIED";
  source: string;
  publicability: Publicability;
  context: string;
  limitations: string;
}
