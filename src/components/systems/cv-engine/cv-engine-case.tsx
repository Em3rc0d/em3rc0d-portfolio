"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedCvEngineCase } from "@/content/localized";
import { localeFromPathname, localizedHref, type Locale } from "@/lib/i18n";

function evidenceHref(id: string, locale: Locale) {
  return id.startsWith("E-CV-")
    ? localizedHref(`/evidence/${id.toLowerCase()}`, locale)
    : null;
}

function EvidenceRef({ id, locale }: { id: string; locale: Locale }) {
  const href = evidenceHref(id, locale);
  return href ? <Link href={href}>{id}</Link> : <span>{id}</span>;
}

const selectedProofIds = ["E-CV-01", "E-CV-03", "E-CV-05", "E-CV-08", "E-CV-11", "E-CV-12", "E-CV-14"] as const;

const ui = {
  en: {
    caseActive: "CASE / ACTIVE",
    role: "ROLE",
    state: "STATE",
    evidence: "EVIDENCE",
    records: "RECORDS",
    truthAria: "CV Engine truth layers",
    selectLayer: "DECISION STACK / SELECT A LAYER",
    equationAria: "Truth layers are not interchangeable",
    equation: ["CAREER FACT", "MARKET FACT", "DERIVED ANALYSIS", "RECOMMENDATION"],
    problemLabel: "PROBLEM / TRUTH MODEL",
    problemTitle: "A job description can tell you what a company wants.",
    problemSubtitle: "It cannot tell you what you can prove.",
    problemBody: "That boundary is the product. Candidate facts, market facts, derived analysis, and recommendations stay different objects.",
    boundariesLabel: "CANDIDATE TRUTH ≠ JOB TRUTH",
    boundariesTitle: "Two truth graphs meet only at comparison time.",
    boundariesBody: "Source provenance remains visible on both sides. A JobRequirement can ask for a capability; it cannot create candidate evidence.",
    careerSide: "CAREER / CANDIDATE SIDE",
    careerOrigin: "candidate-supplied source",
    careerEvidence: "excerpt + locator + review state",
    careerAssertion: "typed claim + provenance links",
    marketSide: "MARKET / JOB SIDE",
    marketSource: "market-side text",
    marketRequirement: "kind + necessity + optional minimums",
    marketSnapshot: "immutable analysis state",
    matchLabel: "MATCH / UNKNOWN",
    matchTitle: "Comparison should preserve the uncomfortable answer.",
    matchBody: "MATCH, GAP, BLOCKER, POTENTIAL_MATCH, and UNKNOWN are legitimate outcomes. Missing information is not silently converted into a negative or a guess.",
    candidateEvidence: "CANDIDATE EVIDENCE",
    jobRequirement: "JOB REQUIREMENT",
    result: "RESULT",
    derivedMarket: "DERIVED MARKET FIELD",
    unknownFalse: "UNKNOWN ≠ FALSE",
    unknownBody: "When the source is silent, the value stays absent with an explicit reason.",
    groundingLabel: "GROUNDING / INTENT",
    groundingTitle: "AI can improve wording without receiving permission to improve history.",
    groundingBody: "Capability truth and career intent also stay separate: CAN answers what evidence supports; WANT answers where the candidate wants to compete.",
    source: "SOURCE",
    generated: "GENERATED",
    guard: "GUARD",
    careerTruth: "CAREER TRUTH",
    canBody: "What current evidence supports.",
    feedsMatch: "feeds Job Match",
    wantLimit: "WANT cannot satisfy a JobRequirement.",
    careerTarget: "CAREER TARGET",
    wantBody: "Where the candidate wants to compete.",
    feedsTarget: "feeds Target Relevance",
    inspectGuard: "E-CV-04 / inspect responsibility guard →",
    decisionLabel: "ASSESSMENT → RESUME",
    decisionTitle: "Should I apply? The resume appears after the decision model.",
    decisionBody: "The product returns a bounded action recommendation, then generates a traceable resume projection from candidate truth. It does not claim employer probability.",
    notProbability: "NOT: hiring probability · recruiter decision · commercial ATS score",
    traceable: "TRACEABLE PROJECTION",
    marketLabel: "CONTROLLED MARKET INGRESS",
    marketTitle: "External market data enters through explicit boundaries.",
    marketBody: "Provider-specific adapters create source-explicit observations. Only authorized source text crosses into Job Intelligence, and the exact durable JobSnapshot is consumed downstream rather than rebuilt.",
    adapter: "CONTROLLED SOURCE ADAPTER",
    exactInvariant: "EXACT SNAPSHOT INVARIANT",
    sameSnapshot: "same durable snapshot identity",
    proofLabel: "VERIFICATION / CURRENT BOUNDARY",
    proofTitle: "Show what is proven. Show what is next.",
    proofBody: "The full proof corpus lives in the Evidence Library. This case keeps only the release boundary and the strongest inspection routes in view.",
    proven: "CURRENTLY PROVEN",
    provenTitle: "Source → JobSnapshot → application decision.",
    provenBody: "With provenance boundaries preserved through the current M4B-06 architecture.",
    next: "NEXT / M4B-07",
    nextTitle: "Opportunity identity & lifecycle.",
    nextBody: "Cross-source identity, deduplication, OPEN/CLOSED/STALE, and freshness semantics remain explicitly next.",
    nextWarning: "NOT CLAIMED COMPLETE",
    allSystems: "← All systems",
    openEvidence: "Open full Evidence Library →",
  },
  es: {
    caseActive: "CASO / ACTIVO",
    role: "ROL",
    state: "ESTADO",
    evidence: "EVIDENCIA",
    records: "REGISTROS",
    truthAria: "Capas de verdad de CV Engine",
    selectLayer: "STACK DE DECISIÓN / SELECCIONA UNA CAPA",
    equationAria: "Las capas de verdad no son intercambiables",
    equation: ["HECHO PROFESIONAL", "HECHO DE MERCADO", "ANÁLISIS DERIVADO", "RECOMENDACIÓN"],
    problemLabel: "PROBLEMA / MODELO DE VERDAD",
    problemTitle: "Una descripción de puesto puede decirte lo que una empresa quiere.",
    problemSubtitle: "No puede decirte lo que puedes demostrar.",
    problemBody: "Ese límite es el producto. Hechos del candidato, hechos de mercado, análisis derivado y recomendaciones permanecen como objetos diferentes.",
    boundariesLabel: "VERDAD DEL CANDIDATO ≠ VERDAD DEL PUESTO",
    boundariesTitle: "Dos grafos de verdad se encuentran únicamente al comparar.",
    boundariesBody: "La procedencia de fuente permanece visible en ambos lados. Un JobRequirement puede pedir una capacidad; no puede crear evidencia del candidato.",
    careerSide: "PROFESIONAL / LADO DEL CANDIDATO",
    careerOrigin: "fuente proporcionada por el candidato",
    careerEvidence: "extracto + locator + estado de revisión",
    careerAssertion: "afirmación tipada + vínculos de procedencia",
    marketSide: "MERCADO / LADO DEL PUESTO",
    marketSource: "texto del lado del mercado",
    marketRequirement: "tipo + necesidad + mínimos opcionales",
    marketSnapshot: "estado de análisis inmutable",
    matchLabel: "MATCH / UNKNOWN",
    matchTitle: "La comparación debería preservar la respuesta incómoda.",
    matchBody: "MATCH, GAP, BLOCKER, POTENTIAL_MATCH y UNKNOWN son resultados legítimos. La información ausente no se convierte silenciosamente en un negativo o una suposición.",
    candidateEvidence: "EVIDENCIA DEL CANDIDATO",
    jobRequirement: "REQUISITO DEL PUESTO",
    result: "RESULTADO",
    derivedMarket: "CAMPO DERIVADO DE MERCADO",
    unknownFalse: "UNKNOWN ≠ FALSE",
    unknownBody: "Cuando la fuente guarda silencio, el valor permanece ausente con una razón explícita.",
    groundingLabel: "GROUNDING / INTENCIÓN",
    groundingTitle: "La IA puede mejorar la redacción sin recibir permiso para mejorar la historia.",
    groundingBody: "La verdad de capacidad y la intención profesional también permanecen separadas: CAN responde qué respalda la evidencia; WANT responde dónde quiere competir el candidato.",
    source: "FUENTE",
    generated: "GENERADO",
    guard: "GUARD",
    careerTruth: "VERDAD PROFESIONAL",
    canBody: "Lo que respalda la evidencia actual.",
    feedsMatch: "alimenta Job Match",
    wantLimit: "WANT no puede satisfacer un JobRequirement.",
    careerTarget: "OBJETIVO PROFESIONAL",
    wantBody: "Dónde quiere competir el candidato.",
    feedsTarget: "alimenta Target Relevance",
    inspectGuard: "E-CV-04 / inspeccionar guard de responsabilidad →",
    decisionLabel: "EVALUACIÓN → CV",
    decisionTitle: "¿Debería aplicar? El CV aparece después del modelo de decisión.",
    decisionBody: "El producto devuelve una recomendación de acción acotada y luego genera una proyección trazable de CV desde la verdad del candidato. No afirma probabilidad del empleador.",
    notProbability: "NO ES: probabilidad de contratación · decisión del recruiter · score de ATS comercial",
    traceable: "PROYECCIÓN TRAZABLE",
    marketLabel: "INGRESO CONTROLADO DE MERCADO",
    marketTitle: "Los datos externos de mercado entran mediante límites explícitos.",
    marketBody: "Adaptadores específicos de proveedor crean observaciones explícitas de fuente. Solo texto autorizado cruza hacia Job Intelligence, y aguas abajo se consume el JobSnapshot durable exacto en lugar de reconstruirlo.",
    adapter: "ADAPTADOR CONTROLADO DE FUENTE",
    exactInvariant: "INVARIANTE DEL SNAPSHOT EXACTO",
    sameSnapshot: "misma identidad durable de snapshot",
    proofLabel: "VERIFICACIÓN / LÍMITE ACTUAL",
    proofTitle: "Mostrar lo demostrado. Mostrar lo siguiente.",
    proofBody: "El corpus completo de evidencia vive en Evidence Library. Este caso mantiene a la vista solo el límite actual y las rutas de inspección más fuertes.",
    proven: "DEMOSTRADO ACTUALMENTE",
    provenTitle: "Fuente → JobSnapshot → decisión de aplicación.",
    provenBody: "Con los límites de procedencia preservados a través de la arquitectura M4B-06 actual.",
    next: "SIGUIENTE / M4B-07",
    nextTitle: "Identidad y ciclo de vida de oportunidad.",
    nextBody: "Identidad entre fuentes, deduplicación, OPEN/CLOSED/STALE y semántica de freshness permanecen explícitamente como siguiente paso.",
    nextWarning: "NO DECLARADO COMPLETO",
    allSystems: "← Todos los sistemas",
    openEvidence: "Abrir Evidence Library completa →",
  },
} as const;

export function CvEngineCase() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const cvEngineCase = getLocalizedCvEngineCase(locale);
  const text = ui[locale];
  const [activeTruth, setActiveTruth] = useState<string>(cvEngineCase.truthLayers[0].id);
  const selectedTruth =
    cvEngineCase.truthLayers.find((layer) => layer.id === activeTruth) ??
    cvEngineCase.truthLayers[0];

  return (
    <main className="cv-case cv-case-v2">
      <section className="cv-cover" id="cover">
        <SiteHeader />

        <div className="cv-cover-main">
          <div className="cv-cover-copy">
            <div className="cv-cover-topline">
              <span>SYSTEM / {cvEngineCase.id}</span>
              <span>{cvEngineCase.label}</span>
              <span>{text.caseActive}</span>
            </div>
            <h1>CV<br />ENGINE</h1>
            <p>{cvEngineCase.thesis}</p>
            <div className="cv-cover-meta">
              <span>{text.role} / {cvEngineCase.role}</span>
              <span>{text.state} / {cvEngineCase.state}</span>
              <span>{text.evidence} / {cvEngineCase.evidence.length} {text.records}</span>
            </div>
          </div>

          <div className="cv-truth-stack" aria-label={text.truthAria}>
            <p className="cv-mini-label">{text.selectLayer}</p>
            <div className="cv-truth-stack-controls">
              {cvEngineCase.truthLayers.map((layer) => {
                const active = layer.id === activeTruth;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveTruth(layer.id)}
                  >
                    <span>{layer.index}</span>
                    <strong>{layer.title}</strong>
                    <small>{layer.boundary}</small>
                  </button>
                );
              })}
            </div>
            <motion.aside
              key={selectedTruth.id}
              className="cv-truth-inspector"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              <span>{selectedTruth.index} / {selectedTruth.title}</span>
              <h2>{selectedTruth.boundary}</h2>
              <p>{selectedTruth.detail}</p>
            </motion.aside>
          </div>
        </div>

        <div className="cv-cover-equation" aria-label={text.equationAria}>
          <span>{text.equation[0]}</span><b>≠</b><span>{text.equation[1]}</span><b>≠</b><span>{text.equation[2]}</span><b>≠</b><span>{text.equation[3]}</span>
        </div>
      </section>

      <section className="cv-v2-problem" id="problem">
        <div className="cv-section-index"><span>01</span><p>{text.problemLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.problemTitle}</h2><p>{text.problemSubtitle}</p></div>
          <p>{text.problemBody}</p>
        </header>

        <div className="cv-v2-problem-grid">
          <div className="cv-v2-signal-board">
            {cvEngineCase.problemSignals.map((signal, index) => (
              <motion.article
                key={signal.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.05, duration: 0.28 }}
              >
                <span>{signal.id}</span><h3>{signal.title}</h3><p>{signal.detail}</p>
              </motion.article>
            ))}
          </div>

          <div className="cv-v2-truth-board">
            {cvEngineCase.truthClasses.map(([type, rule, meaning], index) => (
              <div key={type}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{type}</strong><p>{meaning}</p><small>{rule}</small>
              </div>
            ))}
            <footer><EvidenceRef id="E-CV-01" locale={locale} /><EvidenceRef id="E-CV-05" locale={locale} /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-boundaries" id="boundaries">
        <div className="cv-section-index paper"><span>02</span><p>{text.boundariesLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.boundariesTitle}</h2></div><p>{text.boundariesBody}</p>
        </header>

        <div className="cv-v2-boundary-board">
          <article>
            <span>{text.careerSide}</span>
            <div className="cv-v2-flow"><strong>CareerSource</strong><i>→</i><strong>CareerEvidence</strong><i>→</i><strong>CareerAssertion</strong></div>
            <dl>
              <div><dt>origin</dt><dd>{text.careerOrigin}</dd></div>
              <div><dt>evidence</dt><dd>{text.careerEvidence}</dd></div>
              <div><dt>assertion</dt><dd>{text.careerAssertion}</dd></div>
            </dl>
          </article>

          <article>
            <span>{text.marketSide}</span>
            <div className="cv-v2-flow"><strong>Job Description</strong><i>→</i><strong>JobRequirement</strong><i>→</i><strong>JobSnapshot</strong></div>
            <dl>
              <div><dt>source</dt><dd>{text.marketSource}</dd></div>
              <div><dt>requirement</dt><dd>{text.marketRequirement}</dd></div>
              <div><dt>snapshot</dt><dd>{text.marketSnapshot}</dd></div>
            </dl>
          </article>
        </div>

        <div className="cv-v2-invariant"><span>INV-004</span><strong>JobRequirement != CandidateSkill</strong><EvidenceRef id="E-CV-01" locale={locale} /><EvidenceRef id="E-CV-02" locale={locale} /></div>
      </section>

      <section className="cv-v2-match" id="match">
        <div className="cv-section-index"><span>03</span><p>{text.matchLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.matchTitle}</h2></div><p>{text.matchBody}</p>
        </header>

        <div className="cv-v2-match-grid">
          <div className="cv-v2-match-table">
            <div><span>{text.candidateEvidence}</span><span>{text.jobRequirement}</span><span>{text.result}</span></div>
            {cvEngineCase.matchExamples.map(([candidate, requirement, result]) => (
              <div key={`${candidate}-${requirement}`} data-result={result}>
                <span>{candidate}</span><span>{requirement}</span><strong>{result}</strong>
              </div>
            ))}
          </div>

          <div className="cv-v2-unknown-board">
            <span>{text.derivedMarket}</span>
            <h3>{text.unknownFalse}</h3>
            <p>{text.unknownBody}</p>
            <div>{cvEngineCase.unknownReasons.map((reason) => <span key={reason}>{reason}</span>)}</div>
            <footer><EvidenceRef id="E-CV-03" locale={locale} /><EvidenceRef id="E-CV-12" locale={locale} /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-grounding" id="grounding">
        <div className="cv-section-index"><span>04</span><p>{text.groundingLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.groundingTitle}</h2></div><p>{text.groundingBody}</p>
        </header>

        <div className="cv-v2-grounding-grid">
          <div className="cv-v2-escalation-ledger">
            <div><span>{text.source}</span><span>{text.generated}</span><span>{text.guard}</span></div>
            {cvEngineCase.escalationExamples.map(([source, generated, state]) => (
              <div key={`${source}-${generated}`}><strong>{source}</strong><b>→</b><strong>{generated}</strong><span>{state}</span></div>
            ))}
          </div>

          <div className="cv-v2-can-want">
            <article><span>{text.careerTruth}</span><h3>CAN</h3><p>{text.canBody}</p><small>{text.feedsMatch}</small></article>
            <div><b>≠</b><p>{text.wantLimit}</p><EvidenceRef id="E-CV-09" locale={locale} /></div>
            <article><span>{text.careerTarget}</span><h3>WANT</h3><p>{text.wantBody}</p><small>{text.feedsTarget}</small></article>
          </div>
        </div>
        <Link className="cv-proof-link" href={localizedHref("/evidence/e-cv-04", locale)}>{text.inspectGuard}</Link>
      </section>

      <section className="cv-v2-decision" id="decision">
        <div className="cv-section-index paper"><span>05</span><p>{text.decisionLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.decisionTitle}</h2></div><p>{text.decisionBody}</p>
        </header>

        <div className="cv-v2-decision-grid">
          <div className="cv-v2-assessment-board">
            <span>OpportunityAssessment</span>
            {cvEngineCase.assessmentStates.map(([recommendation, decision, action]) => (
              <div key={recommendation}><strong>{recommendation}</strong><span>{decision}</span><small>{action}</small></div>
            ))}
            <footer>{text.notProbability}</footer>
          </div>

          <div className="cv-v2-resume-board">
            <span>{text.traceable}</span>
            <div className="cv-v2-resume-chain"><strong>CareerAssertion</strong><i>→</i><strong>ResumeClaim</strong><i>→</i><strong>ClaimLedger</strong><i>→</i><strong>ResumeVersion</strong></div>
            <div className="cv-v2-version-fields"><code>candidateProfileId</code><code>jobSnapshotId</code><code>matchReportId</code><code>claimIds[]</code><code>contentSha256</code><code>generation.contractVersion</code></div>
            <footer><EvidenceRef id="E-CV-05" locale={locale} /><EvidenceRef id="E-CV-06" locale={locale} /><EvidenceRef id="E-CV-07" locale={locale} /><EvidenceRef id="E-CV-08" locale={locale} /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-market" id="market">
        <div className="cv-section-index"><span>06</span><p>{text.marketLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.marketTitle}</h2></div><p>{text.marketBody}</p>
        </header>

        <div className="cv-v2-market-grid">
          <div className="cv-v2-provider-board">
            {cvEngineCase.providers.map(([provider, locator]) => <div key={provider}><strong>{provider}</strong><span>{locator}</span></div>)}
            <i>→</i><strong>{text.adapter}</strong><i>→</i><strong>MarketObservation</strong>
          </div>

          <div className="cv-v2-projection-board">
            {[["01", "MarketObservation"], ["02", "DerivedMarketInterpretation"], ["03", "MarketJobProjection"], ["04", "Job Intelligence"], ["05", "JobSnapshot"]].map(([id, title], index) => (
              <span key={title}><b>{id}</b><strong>{title}</strong>{index < 4 ? <i>→</i> : null}</span>
            ))}
          </div>
        </div>

        <div className="cv-v2-snapshot-invariant">
          <span>{text.exactInvariant}</span>
          <strong>JobSnapshot → Job Match → OpportunityAssessment → OpportunityHistory</strong>
          <small>{text.sameSnapshot}</small>
          <div><EvidenceRef id="E-CV-10" locale={locale} /><EvidenceRef id="E-CV-11" locale={locale} /><EvidenceRef id="E-CV-13" locale={locale} /><EvidenceRef id="E-CV-14" locale={locale} /></div>
        </div>
      </section>

      <section className="cv-v2-proof" id="evidence">
        <div className="cv-section-index paper"><span>07</span><p>{text.proofLabel}</p></div>
        <header className="cv-v2-heading">
          <div><h2>{text.proofTitle}</h2></div><p>{text.proofBody}</p>
        </header>

        <div className="cv-v2-proof-grid">
          <div className="cv-v2-verification-list">
            {cvEngineCase.verification.map(([claim, state, evidence]) => (
              <div key={claim} data-next={state.includes("NOT CLAIMED") || state.includes("NO DECLARADO") ? "true" : "false"}>
                <strong>{claim}</strong><span>{state}</span><EvidenceRef id={evidence} locale={locale} />
              </div>
            ))}
          </div>

          <aside className="cv-v2-current-boundary">
            <span>{text.proven}</span>
            <h3>{text.provenTitle}</h3>
            <p>{text.provenBody}</p>
            <div className="cv-v2-proof-links">{selectedProofIds.map((id) => <EvidenceRef key={id} id={id} locale={locale} />)}</div>
            <div className="cv-v2-next-boundary">
              <span>{text.next}</span><strong>{text.nextTitle}</strong><p>{text.nextBody}</p><b>{text.nextWarning}</b>
            </div>
          </aside>
        </div>

        <div className="cv-case-exit"><Link href={localizedHref("/systems", locale)}>{text.allSystems}</Link><Link href={localizedHref("/evidence", locale)}>{text.openEvidence}</Link></div>
      </section>
    </main>
  );
}
