import type { EvidenceRecord } from "@/lib/content/types";

const gpetsRepo = "Em3rc0d/challenge-cineplanet";
const gpetsRef = "main";

const withheldProfessionalSource = (label: string) => ({
  label,
  access: "PRIVATE_WITHHELD" as const,
  note:
    "Reviewed against private professional source material. Repository, path, revision coordinates, client identity, and operational identifiers are intentionally withheld from the public portfolio.",
});

export const reputationEvidenceRecords: readonly EvidenceRecord[] = [
  {
    id: "E-PRO-01",
    slug: "e-pro-01",
    systemId: "03",
    systemName: "Infrastructure Site Mapper",
    title: "Hierarchy-preserving spatial model",
    type: "ARCHITECTURE",
    claim:
      "A professional infrastructure-mapping system preserves physical hierarchy while deriving navigable spatial views from data rather than fixed screen coordinates.",
    state: "SOURCE_VERIFIED",
    sources: [withheldProfessionalSource("Private professional architecture source")],
    publicability: "ABSTRACTED",
    context:
      "The reviewed implementation models infrastructure through explicit site, structure, level, room, position, and equipment relationships. Spatial placement is derived from physical dimensions and grid rules so navigation can retain operational context instead of flattening the facility into disconnected screens.",
    limitations:
      "This record intentionally abstracts the employer/client, repository, facility names, source paths, screenshots, and operational data. It proves the reviewed architecture pattern, not ownership of the entire professional system or any performance outcome.",
    relatedDecisionIds: ["PRO-D01"],
    relatedArchitectureIds: ["professional-hierarchy", "professional-spatial-model"],
  },
  {
    id: "E-PRO-02",
    slug: "e-pro-02",
    systemId: "03",
    systemName: "Infrastructure Site Mapper",
    title: "Implementation across operational views",
    type: "IMPLEMENTATION",
    claim:
      "Eduardo contributed implementation across persistence-backed equipment context, provisioning behavior, device and telemetry views, and operational navigation in a real professional system.",
    state: "SOURCE_VERIFIED",
    sources: [withheldProfessionalSource("Private professional implementation history")],
    publicability: "ABSTRACTED",
    context:
      "The private professional history reviewed for this portfolio contains authored implementation changes across data persistence, provisioning logic, device presentation, telemetry/power-path context, and related infrastructure views. The public record keeps the responsibility boundary explicit without exposing employer assets.",
    limitations:
      "The evidence supports contributed implementation responsibility. It does not claim sole authorship, product ownership, client outcomes, deployment scale, or metrics that are not public-safe and independently supported.",
    relatedDecisionIds: ["PRO-D02"],
    relatedArchitectureIds: ["professional-data-path", "professional-device-context"],
  },
  {
    id: "E-PRO-03",
    slug: "e-pro-03",
    systemId: "03",
    systemName: "Infrastructure Site Mapper",
    title: "Role-aware security hardening and QA",
    type: "TEST",
    claim:
      "Role-aware behavior, security containment, and security QA were explicit parts of Eduardo's professional implementation work rather than decorative portfolio claims.",
    state: "SOURCE_VERIFIED",
    sources: [withheldProfessionalSource("Private professional security and QA history")],
    publicability: "ABSTRACTED",
    context:
      "The reviewed professional change history includes authored role-related implementation, non-disruptive security containment work, and a security QA report. That establishes security hardening as part of the engineering responsibility represented here.",
    limitations:
      "The public portfolio does not expose the private security report, vulnerabilities, remediation details, repository coordinates, or client topology. This record is not a certification or a claim of exhaustive security coverage.",
    relatedDecisionIds: ["PRO-D03"],
    relatedArchitectureIds: ["professional-access-boundary"],
  },
  {
    id: "E-GP-01",
    slug: "e-gp-01",
    systemId: "04",
    systemName: "GPets",
    title: "Browser-to-data full-stack path",
    type: "PRODUCT",
    claim:
      "GPets contains an inspectable browser-to-API-to-service-to-persistence path rather than a frontend-only or backend-only challenge artifact.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Browser application",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/resources/static/js/app.js",
        ref: gpetsRef,
        reviewedBlobSha: "414ba5c95c86f24ebcbe595eadc4576e208ecb79",
      },
      {
        label: "Incident REST controller",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/controller/IncidentController.java",
        ref: gpetsRef,
        reviewedBlobSha: "770752f511a0568458879d966804382292119a84",
      },
      {
        label: "Incident service and persistence",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/service/IncidentService.java",
        ref: gpetsRef,
        reviewedBlobSha: "77a141e6a59bec63a6b60177275a4f523cda63e0",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The browser initializes product configuration and map interaction, calls authenticated incident APIs, and receives domain data that the Spring service persists in Firebase Realtime Database. The same repository therefore exposes the product surface, HTTP boundary, application service, and data path together.",
    limitations:
      "This is source-level proof of an archived technical-challenge implementation. It does not claim production traffic, operational SLA, current deployment availability, or commercial adoption.",
    relatedDecisionIds: ["GP-D01"],
    relatedArchitectureIds: ["gp-browser", "gp-api", "gp-service", "gp-data"],
  },
  {
    id: "E-GP-02",
    slug: "e-gp-02",
    systemId: "04",
    systemName: "GPets",
    title: "Authenticated API boundary",
    type: "IMPLEMENTATION",
    claim:
      "Protected GPets API requests are checked server-side against Firebase bearer tokens before application handlers receive authenticated identity context.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Firebase authentication filter",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/security/FirebaseAuthenticationFilter.java",
        ref: gpetsRef,
        reviewedBlobSha: "9c5d3104d6156752b065583718b769202e86b8bb",
      },
      {
        label: "Browser authentication flow",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/resources/static/js/app.js",
        ref: gpetsRef,
        reviewedBlobSha: "414ba5c95c86f24ebcbe595eadc4576e208ecb79",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The browser obtains a Firebase ID token after Google sign-in. The Spring OncePerRequestFilter verifies bearer tokens and rejects missing or invalid authorization for protected API routes while passing decoded identity attributes into the request.",
    limitations:
      "This record proves the implemented authentication boundary visible in source. It is not an independent penetration test, formal threat model, or claim that every authorization concern is exhaustively solved.",
    relatedDecisionIds: ["GP-D02"],
    relatedArchitectureIds: ["gp-auth-boundary"],
  },
  {
    id: "E-GP-03",
    slug: "e-gp-03",
    systemId: "04",
    systemName: "GPets",
    title: "Persist-and-broadcast realtime loop",
    type: "IMPLEMENTATION",
    claim:
      "A saved incident is persisted through the backend and then broadcast on a STOMP topic that connected browser clients subscribe to and reconcile into their current view.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Incident service and realtime publisher",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/service/IncidentService.java",
        ref: gpetsRef,
        reviewedBlobSha: "77a141e6a59bec63a6b60177275a4f523cda63e0",
      },
      {
        label: "Browser STOMP subscriber",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/resources/static/js/app.js",
        ref: gpetsRef,
        reviewedBlobSha: "414ba5c95c86f24ebcbe595eadc4576e208ecb79",
      },
    ],
    publicability: "PUBLIC",
    context:
      "After Firebase persistence completes successfully, the service publishes the incident to /topic/incidents. The browser connects through SockJS/STOMP, subscribes to that topic, updates its incident collection, and re-renders the relevant map/feed state.",
    limitations:
      "The source proves the realtime application path and reconnect strategy present in the repository. It does not establish multi-region scale, guaranteed delivery semantics, or benchmarked latency.",
    relatedDecisionIds: ["GP-D03"],
    relatedArchitectureIds: ["gp-realtime-loop"],
  },
  {
    id: "E-GP-04",
    slug: "e-gp-04",
    systemId: "04",
    systemName: "GPets",
    title: "Offline queue with idempotent replay boundary",
    type: "RECOVERY",
    claim:
      "GPets queues browser writes in IndexedDB for later synchronization and pairs replayed writes with idempotency keys that the backend caches to reduce duplicate application effects.",
    state: "SOURCE_VERIFIED",
    sources: [
      {
        label: "Browser offline synchronization manager",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/resources/static/js/syncManager.js",
        ref: gpetsRef,
        reviewedBlobSha: "b23a0343cd125fb45b623ab5c30331c1f367b650",
      },
      {
        label: "Backend idempotency service",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/service/IdempotencyService.java",
        ref: gpetsRef,
        reviewedBlobSha: "013f3f4022fa1984a442951cd9df579b7f046686",
      },
      {
        label: "Idempotent incident write boundary",
        access: "PUBLIC_GITHUB",
        repository: gpetsRepo,
        path: "src/main/java/com/cineplanet/challenge/controller/IncidentController.java",
        ref: gpetsRef,
        reviewedBlobSha: "770752f511a0568458879d966804382292119a84",
      },
    ],
    publicability: "PUBLIC",
    context:
      "The browser stores pending mutations in an IndexedDB sync queue, assigns an Idempotency-Key, and retries queued requests after connectivity returns. The backend stores processed keys in Redis with a bounded TTL and can return the cached result for a repeated key.",
    limitations:
      "The mechanism reduces duplicate effects for the implemented request boundary; it is not a general exactly-once guarantee and does not prove every failure mode of an offline distributed system.",
    relatedDecisionIds: ["GP-D04"],
    relatedArchitectureIds: ["gp-offline-queue", "gp-idempotency"],
  },
];
