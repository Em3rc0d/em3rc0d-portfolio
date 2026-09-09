import type { Publicability } from "@/lib/content/types";

export type Placement = "FLAGSHIP" | "SUPPORT" | "PROFESSIONAL" | "R&D" | "ARCHIVED";
export type ArtifactKind = "signal" | "territory" | "workflow" | "ledger" | "evidence" | "structure";
export type SystemMedia = {
  kind: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
  label: "live" | "report" | "product";
  poster?: string;
};
export interface SystemCase {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  built: string;
  placement: Placement;
  publicability: Publicability;
  ownership: string;
  state: { label: string; detail: string; boundary: string };
  problem: string;
  importance: string;
  capabilities: readonly string[];
  path: readonly string[];
  artifact: ArtifactKind;
  accent: "copper" | "blue" | "green";
  architecture: readonly { title: string; body: string }[];
  decisions: readonly { title: string; body: string }[];
  limitations: readonly string[];
  evidence: readonly string[];
  media?: readonly SystemMedia[];
  source?: { label: string; href: string };
  sourceBoundary?: string;
}
