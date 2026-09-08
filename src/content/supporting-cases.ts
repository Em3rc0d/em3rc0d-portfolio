export interface SupportingCaseSection {
  title: string;
  body: string;
}

export interface SupportingCaseRecord {
  slug: "infrastructure-site-mapper" | "gpets";
  reputationLabel: "PROFESSIONAL DEPTH" | "FULL-STACK PROOF";
  context: string;
  problem: string;
  responsibility: string;
  architecture: readonly SupportingCaseSection[];
  implementation: readonly SupportingCaseSection[];
  constraints: readonly string[];
  evidenceIds: readonly string[];
  limitation: string;
  sourceLink?: {
    label: string;
    href: string;
  };
}

export const supportingCases: readonly SupportingCaseRecord[] = [
  {
    slug: "infrastructure-site-mapper",
    reputationLabel: "PROFESSIONAL DEPTH",
    context:
      "A real professional infrastructure-operations application. The public record is deliberately abstracted: it preserves the engineering problem, responsibility boundary, architecture, and proof while withholding employer/client assets and operational identifiers.",
    problem:
      "Physical infrastructure data is only useful operationally when location, hierarchy, dimensions, equipment relationships, and device context remain connected. Flattening that reality into isolated screens makes navigation easier to draw but harder to trust and operate.",
    responsibility:
      "Eduardo contributed as a software developer across implementation and hardening. Reviewed work includes persistence-backed data flows, provisioning behavior, device and telemetry views, role-aware behavior, and security QA. This record does not claim sole ownership of the professional system.",
    architecture: [
      {
        title: "Preserve hierarchy",
        body:
          "Navigation keeps site, structure, level, room, position, and equipment context explicit so a deep device view still belongs to a physical operating model.",
      },
      {
        title: "Derive space from data",
        body:
          "Spatial rendering is driven by grid rules and physical dimensions rather than fixed pixel placement, allowing equipment layout to reflect data instead of becoming a screenshot-specific composition.",
      },
      {
        title: "Carry device context forward",
        body:
          "Provisioning, equipment representation, telemetry context, and operational views remain connected to the same recovered infrastructure hierarchy.",
      },
    ],
    implementation: [
      {
        title: "Data and persistence",
        body:
          "Implementation work included persistence-backed infrastructure data and the application paths that consume it rather than leaving the experience dependent on static mock coordinates.",
      },
      {
        title: "Operational views",
        body:
          "Device, equipment, provisioning, and telemetry-related views were evolved so operators could move from facility context toward specific infrastructure state.",
      },
      {
        title: "Hardening",
        body:
          "Role-aware behavior, non-disruptive security containment, and security QA were explicit engineering workstreams in the reviewed professional history.",
      },
    ],
    constraints: [
      "Physical hierarchy and dimensions could not be treated as decorative UI metadata.",
      "Rendering and navigation had to stay data-driven as equipment and locations changed.",
      "Professional confidentiality places a harder boundary on public proof than visual completeness does.",
    ],
    evidenceIds: ["E-PRO-01", "E-PRO-02", "E-PRO-03"],
    limitation:
      "Client/company identity, private repository coordinates, screenshots, site data, security details, and operational identifiers are intentionally withheld. The case proves a bounded implementation responsibility and architecture pattern; it does not claim whole-system authorship, production metrics, or outcomes that cannot be published safely.",
  },
  {
    slug: "gpets",
    reputationLabel: "FULL-STACK PROOF",
    context:
      "An archived technical-challenge system that is useful here for one reason: the public repository exposes a complete application path from browser behavior through authenticated backend services to persistence, realtime delivery, and offline replay handling.",
    problem:
      "A geospatial incident workflow has to keep a user-facing map, identity, API writes, durable records, realtime updates, and intermittent connectivity coherent. Solving only one layer would not make the product behavior work end to end.",
    responsibility:
      "Eduardo built the challenge implementation across the browser surface and Spring backend integration represented by the public repository. The portfolio uses the current source as authority and does not infer production usage from the challenge context.",
    architecture: [
      {
        title: "Browser → authenticated API",
        body:
          "The browser initializes product configuration and maps, authenticates through Firebase, obtains an ID token, and calls protected Spring REST endpoints with bearer authorization.",
      },
      {
        title: "API → service → persistence",
        body:
          "Controllers hand incident and owner operations to application services that persist state in Firebase Realtime Database, with Redis used for bounded cache/idempotency responsibilities.",
      },
      {
        title: "Persistence → realtime clients",
        body:
          "Successful incident writes are broadcast through STOMP; browser subscribers reconcile incoming events into the current collection, map, feed, and related UI state.",
      },
      {
        title: "Offline → replay boundary",
        body:
          "IndexedDB stores pending browser mutations and assigns idempotency keys before replay, while the backend retains processed keys for a bounded time to reduce duplicate effects.",
      },
    ],
    implementation: [
      {
        title: "Product surface",
        body:
          "Vanilla browser code coordinates Google Maps, filters, geolocation, authentication state, realtime notifications, and optimistic incident interactions.",
      },
      {
        title: "Backend boundary",
        body:
          "Spring controllers, services, and an authentication filter make HTTP responsibilities, identity verification, persistence, and realtime publishing explicit server-side concerns.",
      },
      {
        title: "Failure-aware delivery",
        body:
          "The offline queue, reconnect behavior, idempotency keys, and backend idempotency cache show that network interruption and replay were modeled as product behavior rather than ignored happy-path details.",
      },
    ],
    constraints: [
      "External Firebase and Google Maps configuration must remain environment-bound rather than embedded as private credentials.",
      "Realtime delivery and offline replay introduce duplicate, reconnect, and stale-token boundaries that a static CRUD demo would not expose.",
      "The system is archived challenge evidence; source proof must not be promoted into production-scale or commercial adoption claims.",
    ],
    evidenceIds: ["E-GP-01", "E-GP-02", "E-GP-03", "E-GP-04"],
    limitation:
      "The public repository proves the implementation path represented here. It does not prove current deployment availability, production traffic, SLA, commercial adoption, multi-region scale, or that every distributed-systems failure mode is solved.",
    sourceLink: {
      label: "Inspect public GPets source on GitHub",
      href: "https://github.com/Em3rc0d/challenge-cineplanet",
    },
  },
] as const;

export function findSupportingCase(slug: string) {
  return supportingCases.find((record) => record.slug === slug);
}
