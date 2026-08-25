"use client";

import {Link} from "@/i18n/navigation";
import { useState } from "react";
import { SiteHeader } from "@/components/shell/site-header";
import { AutoPulseProductSpecimen } from "@/components/systems/autopulse/autopulse-product-specimen";
import type { getLocalizedAutoPulseCase } from "@/content/localized";
import type {AppLocale} from "@/i18n/routing";

function evidenceHref(id: string) {
  return id.startsWith("E-AP-")
    ? `/evidence/${id.toLowerCase()}`
    : null;
}

function EvidenceReference({ id }: { id: string }) {
  const href = evidenceHref(id);
  if (!href) return <span>{id}</span>;
  return <Link href={href}>{id}</Link>;
}

const selectedProofIds = ["E-AP-01", "E-AP-03", "E-AP-05", "E-AP-06", "E-AP-07", "E-AP-08"] as const;

const ui = {
  en: {
    caseActive: "CASE / ACTIVE",
    role: "ROLE",
    state: "STATE",
    evidence: "EVIDENCE",
    mappedArtifacts: "mapped artifacts",
    chaptersAria: "AutoPulse case chapters",
    chapters: ["Reality", "Decisions", "Build", "Recovery", "Verification", "Boundary"],
    realityLabel: "PROBLEM / SYSTEM MODEL",
    realityTitle: "Telemetry is not a clean stream.",
    realityBody:
      "Reading vehicle data is the easy description. The system has to survive partial, delayed, missing, interrupted, and corrupt outcomes without rewriting them into a clean fiction.",
    modelAria: "AutoPulse conceptual system model",
    model: [
      ["01", "VEHICLE", "physical source"],
      ["02", "COMMAND RESULT", "success / no-data / failure"],
      ["03", "ACQUISITION EVENT", "preserved outcome"],
      ["04", "TELEMETRY BLOCK", "bounded durable unit"],
      ["05", "LIVE SESSION", "explicit lifecycle"],
      ["06", "SUMMARY", "integrity-aware interpretation"],
    ],
    decisionsLabel: "DECISIONS / ARCHITECTURE",
    decisionsTitle: "The case is in the decisions, not the gauges.",
    decisionsBody:
      "The visible telemetry is only the surface. These decisions define what remains trustworthy when the happy path breaks.",
    decisionsHint: "Select an architecture component to inspect its responsibility and evidence route.",
    architectureAria: "AutoPulse architecture components",
    component: "COMPONENT",
    inspectEvidence: "Inspect evidence →",
    buildLabel: "BUILD / PERSISTENCE CONTRACT",
    buildTitle: "Persistence has a contract.",
    buildBody:
      "Retry, conflict, sequence gaps, regressions, truncation, and corruption are not the same failure. The repository preserves those differences explicitly.",
    codeAria: "Simplified persistence contract excerpt",
    buildContract: [
      ["01", "Integrity", "CRC metadata detects corrupted encoded blocks before they enter trusted state."],
      ["02", "Sequence", "Expected ordering distinguishes a real gap from a regressive write."],
      ["03", "Retry", "An identical retry is idempotent; a different payload on the same sequence is a conflict."],
      ["04", "Durability", "The persistence boundary records enough truth for later recovery and summary integrity."],
    ],
    recoveryLabel: "FAILURE / RECOVERY",
    recoveryTitle: "The process can die. The data does not have to.",
    recoveryBody:
      "An interrupted application should not manufacture a clean completion or throw away durable telemetry that already exists.",
    activeSession: "ACTIVE SESSION",
    processEnds: "PROCESS ENDS",
    recoveryPath: [
      ["01", "Persisted blocks", "Durable telemetry already exists."],
      ["02", "Find orphan", "A non-terminal session remains after startup."],
      ["03", "Reconcile", "Counters are rebuilt from persisted blocks."],
      ["04", "Mark interrupted", "History records unexpected termination honestly."],
    ],
    recoveryClaim:
      "`recoverOrphanedSessions()` reconciles durable counters and records `UNEXPECTED_APP_TERMINATION` instead of fabricating a clean completion.",
    verificationLabel: "VERIFICATION / EVIDENCE",
    verificationTitle: "Built is not the same as field-proven.",
    verificationBody:
      "The case keeps the claim ceiling visible. Source and test artifacts prove software behavior; they do not automatically prove every vehicle, adapter, or physical environment.",
    openEvidence: "Open full Evidence Library →",
    selectedProof: "SELECTED PROOF ROUTES",
    selectedProofBody:
      "Detailed provenance, source coordinates, test state, and limitation remain inside each evidence dossier.",
    boundaryLabel: "CURRENT BOUNDARY / NEXT",
    proven: "CURRENTLY PROVEN",
    provenTitle:
      "Telemetry can move from imperfect acquisition into durable, recoverable, integrity-aware session state.",
    provenBody:
      "The portfolio proof is strongest around software lifecycle, persistence, recovery, and interpretation boundaries.",
    field: "FIELD REALITY",
    fieldTitle: "Compatibility remains a physical-system problem.",
    fieldBody:
      "Vehicle coverage, adapter behavior, and field variability must continue to be earned with real-device evidence rather than inferred from implementation.",
    fieldWarning: "DO NOT OVERCLAIM THE FIELD GATE",
    allSystems: "← All systems",
    evidenceExit: "Evidence →",
  },
  es: {
    caseActive: "CASO / ACTIVO",
    role: "ROL",
    state: "ESTADO",
    evidence: "EVIDENCIA",
    mappedArtifacts: "artefactos mapeados",
    chaptersAria: "Capítulos del caso AutoPulse",
    chapters: ["Realidad", "Decisiones", "Construcción", "Recuperación", "Verificación", "Límite"],
    realityLabel: "PROBLEMA / MODELO DEL SISTEMA",
    realityTitle: "La telemetría no es un flujo limpio.",
    realityBody:
      "Leer datos del vehículo es la descripción fácil. El sistema tiene que sobrevivir resultados parciales, tardíos, ausentes, interrumpidos y corruptos sin reescribirlos como una ficción limpia.",
    modelAria: "Modelo conceptual del sistema AutoPulse",
    model: [
      ["01", "VEHÍCULO", "fuente física"],
      ["02", "RESULTADO DEL COMANDO", "éxito / no-data / falla"],
      ["03", "EVENTO DE ADQUISICIÓN", "resultado preservado"],
      ["04", "BLOQUE DE TELEMETRÍA", "unidad durable acotada"],
      ["05", "SESIÓN LIVE", "ciclo de vida explícito"],
      ["06", "RESUMEN", "interpretación consciente de integridad"],
    ],
    decisionsLabel: "DECISIONES / ARQUITECTURA",
    decisionsTitle: "El caso está en las decisiones, no en los indicadores.",
    decisionsBody:
      "La telemetría visible es solo la superficie. Estas decisiones definen qué sigue siendo confiable cuando se rompe el happy path.",
    decisionsHint: "Selecciona un componente de arquitectura para inspeccionar su responsabilidad y ruta de evidencia.",
    architectureAria: "Componentes de arquitectura de AutoPulse",
    component: "COMPONENTE",
    inspectEvidence: "Inspeccionar evidencia →",
    buildLabel: "CONSTRUCCIÓN / CONTRATO DE PERSISTENCIA",
    buildTitle: "La persistencia tiene un contrato.",
    buildBody:
      "Reintento, conflicto, saltos de secuencia, regresiones, truncamiento y corrupción no son la misma falla. El repositorio preserva esas diferencias explícitamente.",
    codeAria: "Extracto simplificado del contrato de persistencia",
    buildContract: [
      ["01", "Integridad", "La metadata CRC detecta bloques codificados corruptos antes de que entren al estado confiable."],
      ["02", "Secuencia", "El orden esperado distingue un gap real de una escritura regresiva."],
      ["03", "Reintento", "Un reintento idéntico es idempotente; un payload diferente en la misma secuencia es un conflicto."],
      ["04", "Durabilidad", "El límite de persistencia registra suficiente verdad para recuperación posterior e integridad del resumen."],
    ],
    recoveryLabel: "FALLA / RECUPERACIÓN",
    recoveryTitle: "El proceso puede morir. Los datos no tienen por qué hacerlo.",
    recoveryBody:
      "Una aplicación interrumpida no debería fabricar una finalización limpia ni descartar telemetría durable que ya existe.",
    activeSession: "SESIÓN ACTIVA",
    processEnds: "EL PROCESO TERMINA",
    recoveryPath: [
      ["01", "Bloques persistidos", "La telemetría durable ya existe."],
      ["02", "Encontrar huérfana", "Una sesión no terminal permanece después del arranque."],
      ["03", "Reconciliar", "Los contadores se reconstruyen desde bloques persistidos."],
      ["04", "Marcar interrumpida", "La historia registra honestamente la terminación inesperada."],
    ],
    recoveryClaim:
      "`recoverOrphanedSessions()` reconcilia contadores durables y registra `UNEXPECTED_APP_TERMINATION` en lugar de fabricar una finalización limpia.",
    verificationLabel: "VERIFICACIÓN / EVIDENCIA",
    verificationTitle: "Construido no significa validado en campo.",
    verificationBody:
      "El caso mantiene visible el techo de la afirmación. Código y artefactos de prueba demuestran comportamiento del software; no demuestran automáticamente cada vehículo, adaptador o entorno físico.",
    openEvidence: "Abrir Evidence Library completa →",
    selectedProof: "RUTAS DE EVIDENCIA SELECCIONADAS",
    selectedProofBody:
      "Procedencia detallada, coordenadas de fuente, estado de prueba y limitación permanecen dentro de cada dossier de evidencia.",
    boundaryLabel: "LÍMITE ACTUAL / SIGUIENTE",
    proven: "DEMOSTRADO ACTUALMENTE",
    provenTitle:
      "La telemetría puede pasar de una adquisición imperfecta a un estado de sesión durable, recuperable y consciente de integridad.",
    provenBody:
      "La evidencia del portfolio es más fuerte alrededor del ciclo de vida del software, persistencia, recuperación y límites de interpretación.",
    field: "REALIDAD DE CAMPO",
    fieldTitle: "La compatibilidad sigue siendo un problema del sistema físico.",
    fieldBody:
      "La cobertura de vehículos, comportamiento de adaptadores y variabilidad de campo deben seguir ganándose con evidencia de dispositivos reales, no inferirse desde la implementación.",
    fieldWarning: "NO SOBREAFIRMAR EL FIELD GATE",
    allSystems: "← Todos los sistemas",
    evidenceExit: "Evidencia →",
  },
} as const;

type AutoPulseCaseRecord = ReturnType<typeof getLocalizedAutoPulseCase>;

export function AutoPulseCase({locale, autopulseCase}: {locale: AppLocale; autopulseCase: AutoPulseCaseRecord}) {
  const text = ui[locale];
  const [activeNode, setActiveNode] = useState<string>(autopulseCase.architecture[0].id);
  const selectedNode =
    autopulseCase.architecture.find((node) => node.id === activeNode) ??
    autopulseCase.architecture[0];

  return (
    <main className="autopulse-case autopulse-case-v2">
      <section className="ap-cover" id="cover">
        <SiteHeader />

        <div className="ap-cover-grid">
          <div className="ap-cover-copy">
            <div className="ap-cover-topline">
              <span>SYSTEM / {autopulseCase.id}</span>
              <span>{autopulseCase.label}</span>
              <span>{text.caseActive}</span>
            </div>

            <h1>{autopulseCase.name}</h1>
            <p className="ap-thesis">{autopulseCase.thesis}</p>

            <div className="ap-cover-meta">
              <div><span>{text.role}</span><strong>{autopulseCase.role}</strong></div>
              <div><span>{text.state}</span><strong>{autopulseCase.state}</strong></div>
              <div><span>{text.evidence}</span><strong>{autopulseCase.evidence.length} {text.mappedArtifacts}</strong></div>
            </div>
          </div>

          <AutoPulseProductSpecimen path={autopulseCase.path} />
        </div>

        <nav className="ap-case-nav" aria-label={text.chaptersAria}>
          {[
            ["01", text.chapters[0], "#reality"],
            ["02", text.chapters[1], "#decisions"],
            ["03", text.chapters[2], "#build"],
            ["04", text.chapters[3], "#recovery"],
            ["05", text.chapters[4], "#verification"],
            ["06", text.chapters[5], "#boundary"],
          ].map(([id, label, href]) => (
            <a key={href} href={href}><span>{id}</span>{label}</a>
          ))}
        </nav>
      </section>

      <section className="ap-v2-reality" id="reality">
        <div className="ap-section-label"><span>01</span><p>{text.realityLabel}</p></div>
        <header className="ap-v2-heading">
          <div><h2>{text.realityTitle}</h2><p>{text.realityBody}</p></div>
          <strong>SIGNAL → EVENT → BLOCK → SESSION → SUMMARY</strong>
        </header>

        <div className="ap-v2-reality-grid">
          <div className="ap-v2-signal-board">
            {autopulseCase.problemSignals.map((signal) => (
              <article key={signal.id}>
                <span>{signal.id}</span><h3>{signal.title}</h3><p>{signal.detail}</p>
              </article>
            ))}
          </div>

          <div className="ap-v2-model-board" aria-label={text.modelAria}>
            {text.model.map(([id, title, detail]) => (
              <div key={title}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-v2-decisions" id="decisions">
        <div className="ap-section-label"><span>02</span><p>{text.decisionsLabel}</p></div>
        <header className="ap-v2-heading">
          <div><h2>{text.decisionsTitle}</h2><p>{text.decisionsBody}</p></div>
          <p>{text.decisionsHint}</p>
        </header>

        <div className="ap-v2-decision-architecture-grid">
          <div className="ap-v2-decision-board">
            {autopulseCase.decisions.map((decision) => (
              <article key={decision.id}>
                <span>{decision.id}</span>
                <h3>{decision.title}</h3>
                <p>{decision.why}</p>
                <footer>{decision.evidence.map((id) => <EvidenceReference key={id} id={id} />)}</footer>
              </article>
            ))}
          </div>

          <div className="ap-v2-architecture-board">
            <div className="ap-v2-architecture-flow" aria-label={text.architectureAria}>
              {autopulseCase.architecture.map((node) => {
                const isActive = node.id === activeNode;
                return (
                  <button
                    type="button"
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={isActive ? "is-active" : undefined}
                    aria-pressed={isActive}
                  >
                    <span>{node.number}</span><small>{node.label}</small><strong>{node.title}</strong>
                  </button>
                );
              })}
            </div>

            <aside
              key={selectedNode.id}
              className="ap-v2-component-inspector"
              aria-live="polite"
              aria-atomic="true"
            >
              <div><span>{text.component} / {selectedNode.number}</span><EvidenceReference id={selectedNode.evidence} /></div>
              <h3>{selectedNode.title}</h3>
              <p>{selectedNode.detail}</p>
              <Link href={`/evidence/${selectedNode.evidence.toLowerCase()}`}>{text.inspectEvidence}</Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="ap-v2-build" id="build">
        <div className="ap-section-label light"><span>03</span><p>{text.buildLabel}</p></div>
        <header className="ap-v2-heading">
          <div><h2>{text.buildTitle}</h2><p>{text.buildBody}</p></div>
          <div className="ap-v2-build-tags"><span>BINARY_OBD2_V3</span><span>CRC32</span><span>ORDERED SEQUENCE</span><span>IDEMPOTENT COMMIT</span></div>
        </header>

        <div className="ap-v2-build-grid">
          <div className="ap-code-specimen ap-code-specimen-v2">
            <div className="ap-code-title"><span>TelemetryBlockRepository.ts</span><Link href={"/evidence/e-ap-03"}>E-AP-03</Link></div>
            <pre aria-label={text.codeAria}><code>{`if (calculatedCrc !== encodedBlock.payloadCrc)
  return INVALID_BLOCK_CRC

if (targetSequence > expectedSeq)
  return BLOCK_SEQUENCE_GAP

if (targetSequence < expectedSeq)
  return REGRESSIVE_BLOCK_SEQUENCE

identical retry → ALREADY_COMMITTED
same sequence / different payload → CONFLICT`}</code></pre>
          </div>

          <div className="ap-v2-build-contract">
            {text.buildContract.map(([id, title, detail]) => (
              <article key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-v2-recovery" id="recovery">
        <div className="ap-section-label"><span>04</span><p>{text.recoveryLabel}</p></div>
        <header className="ap-v2-heading">
          <div><h2>{text.recoveryTitle}</h2><p>{text.recoveryBody}</p></div>
          <div className="ap-v2-failure-mark"><span>{text.activeSession}</span><b>×</b><strong>{text.processEnds}</strong></div>
        </header>

        <div className="ap-v2-recovery-path">
          {text.recoveryPath.map(([id, title, detail]) => (
            <div key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>

        <div className="ap-v2-recovery-claim">
          <Link href={"/evidence/e-ap-06"}>E-AP-06</Link>
          <p>{text.recoveryClaim}</p>
        </div>
      </section>

      <section className="ap-v2-verification" id="verification">
        <div className="ap-section-label light"><span>05</span><p>{text.verificationLabel}</p></div>
        <header className="ap-v2-heading">
          <div><h2>{text.verificationTitle}</h2><p>{text.verificationBody}</p></div>
          <Link href={"/evidence"}>{text.openEvidence}</Link>
        </header>

        <div className="ap-v2-verification-grid">
          <div className="ap-v2-verification-list">
            {autopulseCase.verification.map((item) => (
              <div key={item.claim} data-unclaimed={item.state === "NOT CLAIMED" || item.state === "NO DECLARADO" ? "true" : "false"}>
                <strong>{item.claim}</strong><span>{item.state}</span><EvidenceReference id={item.evidence} />
              </div>
            ))}
          </div>

          <aside className="ap-v2-proof-board">
            <span>{text.selectedProof}</span>
            <div>{selectedProofIds.map((id) => <EvidenceReference key={id} id={id} />)}</div>
            <p>{text.selectedProofBody}</p>
          </aside>
        </div>
      </section>

      <section className="ap-v2-boundary" id="boundary">
        <div className="ap-section-label"><span>06</span><p>{text.boundaryLabel}</p></div>
        <div className="ap-v2-boundary-grid">
          <div>
            <span>{text.proven}</span>
            <h2>{text.provenTitle}</h2>
            <p>{text.provenBody}</p>
          </div>
          <div>
            <span>{text.field}</span>
            <h3>{text.fieldTitle}</h3>
            <p>{text.fieldBody}</p>
            <strong>{text.fieldWarning}</strong>
          </div>
        </div>
        <div className="ap-v2-case-exit"><Link href={"/systems"}>{text.allSystems}</Link><Link href={"/evidence"}>{text.evidenceExit}</Link></div>
      </section>
    </main>
  );
}
