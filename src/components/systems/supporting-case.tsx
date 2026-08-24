"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedEvidenceRecords } from "@/content/localized";
import type { SupportingCaseRecord } from "@/content/supporting-cases";
import type { SystemRecord } from "@/lib/content/types";
import {
  localeFromPathname,
  localizedHref,
  publicabilityLabel,
  systemStateLabel,
} from "@/lib/i18n";

interface SupportingCaseProps {
  system: SystemRecord;
  record: SupportingCaseRecord;
}

const ui = {
  en: {
    summaryAria: "case summary",
    context: "CONTEXT",
    role: "ROLE",
    state: "STATE",
    publicability: "PUBLICABILITY",
    pathAria: "system path",
    operating: "OPERATING REALITY / MODEL",
    operatingTitle: "Understand the system before showing the implementation.",
    responsibility: "RESPONSIBILITY",
    implementation: "IMPLEMENTATION",
    implementationTitle: "What was actually built or contributed.",
    evidence: "EVIDENCE / INSPECT",
    evidenceTitle: "Claims stay connected to proof.",
    inspectEvidence: "Inspect evidence ↗",
    constraints: "CONSTRAINTS / CLAIM CEILING",
    constraintsTitle: "What this case proves — and what it does not.",
    browse: "Browse systems →",
    conversation: "Start a conversation →",
  },
  es: {
    summaryAria: "resumen del caso",
    context: "CONTEXTO",
    role: "ROL",
    state: "ESTADO",
    publicability: "PUBLICABILIDAD",
    pathAria: "ruta del sistema",
    operating: "REALIDAD OPERATIVA / MODELO",
    operatingTitle: "Comprender el sistema antes de mostrar la implementación.",
    responsibility: "RESPONSABILIDAD",
    implementation: "IMPLEMENTACIÓN",
    implementationTitle: "Lo que realmente se construyó o contribuyó.",
    evidence: "EVIDENCIA / INSPECCIONAR",
    evidenceTitle: "Las afirmaciones permanecen conectadas a evidencia.",
    inspectEvidence: "Inspeccionar evidencia ↗",
    constraints: "RESTRICCIONES / TECHO DE AFIRMACIÓN",
    constraintsTitle: "Lo que este caso demuestra — y lo que no.",
    browse: "Ver sistemas →",
    conversation: "Iniciar una conversación →",
  },
} as const;

export function SupportingCase({ system, record }: SupportingCaseProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const text = ui[locale];
  const publicEvidenceRecords = getLocalizedEvidenceRecords(locale);
  const evidence = record.evidenceIds
    .map((id) => publicEvidenceRecords.find((candidate) => candidate.id === id))
    .filter((candidate) => candidate !== undefined);

  return (
    <main className={`build-room-shell supporting-case-shell supporting-case-${system.slug}`}>
      <section className="supporting-cover supporting-frame carbon-stage" aria-labelledby="supporting-title">
        <SiteHeader />
        <div className="supporting-cover-grid">
          <div className="supporting-cover-copy">
            <p className="technical-label">{record.reputationLabel} / SYSTEM {system.id}</p>
            <h1 id="supporting-title">{system.name}</h1>
            <p className="supporting-lede">{system.summary}</p>
          </div>

          <dl className="supporting-meta" aria-label={`${system.name} ${text.summaryAria}`}>
            <div><dt>{text.context}</dt><dd>{record.reputationLabel}</dd></div>
            <div><dt>{text.role}</dt><dd>{system.ownership}</dd></div>
            <div><dt>{text.state}</dt><dd>{systemStateLabel(system.state, locale)}</dd></div>
            <div><dt>{text.publicability}</dt><dd>{publicabilityLabel(system.publicability, locale)}</dd></div>
          </dl>
        </div>

        <div className="supporting-path" data-count={system.path.length} aria-label={`${system.name} ${text.pathAria}`}>
          {system.path.map((step, index) => (
            <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-operating" aria-labelledby="supporting-operating-title">
        <div className="supporting-operating-copy">
          <p className="technical-label">{text.operating}</p>
          <h2 id="supporting-operating-title">{text.operatingTitle}</h2>
          <p>{record.context}</p>
          <p>{record.problem}</p>
          <div className="supporting-responsibility-note"><span>{text.responsibility}</span><strong>{record.responsibility}</strong></div>
        </div>

        <div className="supporting-model-board" data-count={record.architecture.length}>
          {record.architecture.map((item, index) => (
            <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-build-proof carbon-stage" aria-labelledby="supporting-build-title">
        <div className="supporting-build-column">
          <header><p className="technical-label">{text.implementation}</p><h2 id="supporting-build-title">{text.implementationTitle}</h2></header>
          <div className="supporting-implementation-list supporting-implementation-list-v2">
            {record.implementation.map((item, index) => (
              <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>
            ))}
          </div>
        </div>

        <div className="supporting-proof-column">
          <header><p className="technical-label">{text.evidence}</p><h2>{text.evidenceTitle}</h2></header>
          <div className="supporting-evidence-grid supporting-evidence-grid-v2">
            {evidence.map((item) => (
              <Link key={item.id} href={localizedHref(`/evidence/${item.slug}`, locale)}>
                <span>{item.id} · {item.state.replaceAll("_", " ")}</span><strong>{item.title}</strong><em>{text.inspectEvidence}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="supporting-frame supporting-limit supporting-limit-v2" aria-labelledby="supporting-limit-title">
        <div className="supporting-limit-copy">
          <p className="technical-label">{text.constraints}</p>
          <h2 id="supporting-limit-title">{text.constraintsTitle}</h2>
          <p>{record.limitation}</p>
        </div>

        <ol className="supporting-constraint-ledger">
          {record.constraints.map((constraint, index) => (
            <li key={constraint}><span>{String(index + 1).padStart(2, "0")}</span><p>{constraint}</p></li>
          ))}
        </ol>

        <div className="supporting-next-actions supporting-next-actions-v2">
          {record.sourceLink ? <a href={record.sourceLink.href} target="_blank" rel="noreferrer">{record.sourceLink.label} ↗</a> : null}
          <Link href={localizedHref("/systems", locale)}>{text.browse}</Link>
          <Link href={localizedHref("/contact", locale)}>{text.conversation}</Link>
        </div>
      </section>
    </main>
  );
}
