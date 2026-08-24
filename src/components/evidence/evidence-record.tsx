import Link from "next/link";
import type { EvidenceRecord, EvidenceState } from "@/lib/content/types";
import {
  evidenceStateLabel,
  evidenceTypeLabel,
  localizedHref,
  type Locale,
} from "@/lib/i18n";

const stateExplanation: Record<Locale, Record<EvidenceState, string>> = {
  en: {
    IMPLEMENTED: "The behavior exists in the implementation. This state does not automatically mean it has been independently or field verified.",
    SOURCE_VERIFIED: "The claim was checked against the cited source material. Public source coordinates are shown when publication is safe; professional coordinates may be intentionally withheld.",
    TEST_ARTIFACT: "A test artifact supports the claim. The limitation below defines how far that evidence can be generalized.",
    FIELD_VALIDATED: "The behavior has supporting evidence from a real-world or field validation context.",
    IN_TEST: "The behavior is currently being tested. It should not be read as a completed verification claim.",
    NOT_CLAIMED: "This record is contextual material and is not presented as proof of a completed engineering claim.",
  },
  es: {
    IMPLEMENTED: "El comportamiento existe en la implementación. Este estado no significa automáticamente que haya sido verificado de forma independiente o en campo.",
    SOURCE_VERIFIED: "La afirmación fue contrastada con el material fuente citado. Las coordenadas públicas se muestran cuando publicarlas es seguro; las profesionales pueden ocultarse intencionalmente.",
    TEST_ARTIFACT: "Un artefacto de prueba respalda la afirmación. La limitación inferior define hasta dónde puede generalizarse esa evidencia.",
    FIELD_VALIDATED: "El comportamiento cuenta con evidencia de un contexto real o de validación en campo.",
    IN_TEST: "El comportamiento se encuentra actualmente en prueba. No debe interpretarse como una afirmación de verificación completada.",
    NOT_CLAIMED: "Este registro aporta contexto y no se presenta como prueba de una afirmación de ingeniería completada.",
  },
};

const copy = {
  en: {
    back: "← Evidence library",
    kicker: "EVIDENCE RECORD",
    intro: "One inspectable record supporting a specific claim about",
    summaryAria: "Evidence summary",
    system: "System",
    type: "Type",
    status: "Status",
    proves: "WHAT THIS PROVES",
    statusMeaning: "What does",
    mean: "mean?",
    why: "WHY THIS RECORD EXISTS",
    limit: "WHAT THIS DOES NOT PROVE",
    sources: "SOURCES USED",
    sourcesTitle: "Inspect deeper where publication is safe.",
    source: "source",
    sourcesPlural: "sources",
    privateSource: "PRIVATE PROFESSIONAL SOURCE",
    withheldFallback: "Source coordinates withheld to preserve professional confidentiality.",
    whyWithheld: "Why are source coordinates withheld?",
    withheldBody: "Professional confidentiality outranks portfolio completeness. The public claim is therefore bounded by this record's context and limitation instead of exposing a private repository, operational path, client artifact, or security-sensitive revision.",
    openGithub: "Open source on GitHub",
    provenance: "Technical provenance",
    path: "Path",
    reviewedRef: "Reviewed ref",
    reviewedRevision: "Reviewed revision",
    directorySource: "Directory-level source",
    provenanceBody: "The revision identifier exists so the evidence record can point to the exact source version reviewed. It is provenance metadata, not something a casual visitor needs in order to understand the claim.",
    related: "Related engineering references",
    decisions: "DECISIONS",
    architecture: "ARCHITECTURE",
    noneMapped: "None mapped",
    returnTo: "Return to",
    browse: "Browse all evidence",
  },
  es: {
    back: "← Biblioteca de evidencia",
    kicker: "REGISTRO DE EVIDENCIA",
    intro: "Un registro inspeccionable que respalda una afirmación específica sobre",
    summaryAria: "Resumen de evidencia",
    system: "Sistema",
    type: "Tipo",
    status: "Estado",
    proves: "LO QUE ESTO DEMUESTRA",
    statusMeaning: "¿Qué significa",
    mean: "?",
    why: "POR QUÉ EXISTE ESTE REGISTRO",
    limit: "LO QUE ESTO NO DEMUESTRA",
    sources: "FUENTES UTILIZADAS",
    sourcesTitle: "Inspecciona más a fondo donde publicar sea seguro.",
    source: "fuente",
    sourcesPlural: "fuentes",
    privateSource: "FUENTE PROFESIONAL PRIVADA",
    withheldFallback: "Las coordenadas de la fuente se ocultan para preservar la confidencialidad profesional.",
    whyWithheld: "¿Por qué se ocultan las coordenadas de la fuente?",
    withheldBody: "La confidencialidad profesional tiene prioridad sobre la completitud del portfolio. Por eso la afirmación pública queda limitada por el contexto y la limitación de este registro, en lugar de exponer un repositorio privado, una ruta operativa, un artefacto del cliente o una revisión sensible para la seguridad.",
    openGithub: "Abrir fuente en GitHub",
    provenance: "Procedencia técnica",
    path: "Ruta",
    reviewedRef: "Ref revisada",
    reviewedRevision: "Revisión inspeccionada",
    directorySource: "Fuente a nivel de directorio",
    provenanceBody: "El identificador de revisión permite que el registro apunte a la versión exacta de la fuente revisada. Es metadata de procedencia, no algo que un visitante casual necesite para comprender la afirmación.",
    related: "Referencias de ingeniería relacionadas",
    decisions: "DECISIONES",
    architecture: "ARQUITECTURA",
    noneMapped: "Ninguna asignada",
    returnTo: "Volver a",
    browse: "Ver toda la evidencia",
  },
} as const;

export function EvidenceRecordView({
  record,
  systemHref,
  locale,
}: {
  record: EvidenceRecord;
  systemHref: string;
  locale: Locale;
}) {
  const text = copy[locale];
  const stateLabel = evidenceStateLabel(record.state, locale);

  return (
    <main className="evidence-inspector">
      <header className="evidence-inspector-topbar">
        <Link href={localizedHref("/evidence", locale)}>{text.back}</Link>
        <span>{record.systemName} / {record.id}</span>
      </header>

      <article className="evidence-inspector-sheet evidence-inspector-readable">
        <div className="evidence-inspector-register" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>

        <header className="evidence-readable-heading">
          <div>
            <p className="evidence-kicker">{text.kicker} / {record.id}</p>
            <h1>{record.title}</h1>
            <p className="evidence-readable-intro">{text.intro} {record.systemName}.</p>
          </div>
          <div className="evidence-readable-meta" aria-label={text.summaryAria}>
            <div><span>{text.system}</span><strong>{record.systemName}</strong></div>
            <div><span>{text.type}</span><strong>{evidenceTypeLabel(record.type, locale)}</strong></div>
            <div><span>{text.status}</span><strong>{stateLabel}</strong></div>
          </div>
        </header>

        <section className="evidence-proof-summary" aria-labelledby="proof-heading">
          <p className="evidence-inspector-label">{text.proves}</p>
          <h2 id="proof-heading">{record.claim}</h2>
          <details className="evidence-status-explainer">
            <summary>{text.statusMeaning} “{stateLabel}” {text.mean}</summary>
            <p>{stateExplanation[locale][record.state]}</p>
          </details>
        </section>

        <div className="evidence-readable-context">
          <section><p className="evidence-inspector-label">{text.why}</p><p>{record.context}</p></section>
          <section className="evidence-limitations-readable"><p className="evidence-inspector-label">{text.limit}</p><p>{record.limitations}</p></section>
        </div>

        <section className="evidence-sources evidence-sources-readable">
          <header>
            <div><p className="evidence-inspector-label">{text.sources}</p><h2>{text.sourcesTitle}</h2></div>
            <span>{record.sources.length} {record.sources.length === 1 ? text.source : text.sourcesPlural}</span>
          </header>

          <div className="evidence-source-list">
            {record.sources.map((source) => {
              const isPublicGithub = source.access !== "PRIVATE_WITHHELD" && Boolean(source.repository && source.path && source.ref);

              if (!isPublicGithub) {
                return (
                  <article className="evidence-source-card evidence-source-withheld" key={source.label}>
                    <div className="evidence-source-card-main"><span>{text.privateSource}</span><strong>{source.label}</strong><p>{source.note ?? text.withheldFallback}</p></div>
                    <details className="evidence-provenance-detail"><summary>{text.whyWithheld}</summary><p>{text.withheldBody}</p></details>
                  </article>
                );
              }

              const sourceHref = `https://github.com/${source.repository}/blob/${source.ref}/${source.path}`;
              return (
                <article className="evidence-source-card" key={`${source.path}-${source.label}`}>
                  <div className="evidence-source-card-main"><span>{source.repository}</span><strong>{source.label}</strong><a href={sourceHref} target="_blank" rel="noreferrer">{text.openGithub} <span aria-hidden="true">↗</span></a></div>
                  <details className="evidence-provenance-detail">
                    <summary>{text.provenance}</summary>
                    <dl>
                      <div><dt>{text.path}</dt><dd><code>{source.path}</code></dd></div>
                      <div><dt>{text.reviewedRef}</dt><dd><code>{source.ref}</code></dd></div>
                      <div><dt>{text.reviewedRevision}</dt><dd><code>{source.reviewedBlobSha ?? text.directorySource}</code></dd></div>
                    </dl>
                    <p>{text.provenanceBody}</p>
                  </details>
                </article>
              );
            })}
          </div>
        </section>

        {(record.relatedDecisionIds.length > 0 || record.relatedArchitectureIds.length > 0) ? (
          <details className="evidence-related-detail">
            <summary>{text.related}</summary>
            <div>
              <section><p className="evidence-inspector-label">{text.decisions}</p><strong>{record.relatedDecisionIds.length ? record.relatedDecisionIds.join(" · ") : text.noneMapped}</strong></section>
              <section><p className="evidence-inspector-label">{text.architecture}</p><strong>{record.relatedArchitectureIds.length ? record.relatedArchitectureIds.join(" · ") : text.noneMapped}</strong></section>
            </div>
          </details>
        ) : null}

        <footer className="evidence-readable-footer">
          <Link href={systemHref}>{text.returnTo} {record.systemName} →</Link>
          <Link href={localizedHref("/evidence", locale)}>{text.browse}</Link>
        </footer>
      </article>
    </main>
  );
}
