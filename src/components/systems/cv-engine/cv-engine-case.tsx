"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/shell/site-header";
import { cvEngineCase } from "@/content/cv-engine";

function evidenceHref(id: string) {
  return id.startsWith("E-CV-") ? `/evidence/${id.toLowerCase()}` : null;
}

function EvidenceRef({ id }: { id: string }) {
  const href = evidenceHref(id);
  return href ? <Link href={href}>{id}</Link> : <span>{id}</span>;
}

export function CvEngineCase() {
  const [activeTruth, setActiveTruth] = useState<string>(cvEngineCase.truthLayers[0].id);
  const selectedTruth =
    cvEngineCase.truthLayers.find((layer) => layer.id === activeTruth) ??
    cvEngineCase.truthLayers[0];

  return (
    <main className="cv-case">
      <section className="cv-cover" id="cover">
        <SiteHeader />

        <div className="cv-cover-main">
          <div className="cv-cover-copy">
            <div className="cv-cover-topline">
              <span>SYSTEM / {cvEngineCase.id}</span>
              <span>{cvEngineCase.label}</span>
              <span>CASE / ACTIVE</span>
            </div>
            <h1>CV<br />ENGINE</h1>
            <p>{cvEngineCase.thesis}</p>
            <div className="cv-cover-meta">
              <span>ROLE / {cvEngineCase.role}</span>
              <span>STATE / {cvEngineCase.state}</span>
              <span>EVIDENCE / {cvEngineCase.evidence.length} RECORDS</span>
            </div>
          </div>

          <div className="cv-truth-stack" aria-label="CV Engine truth layers">
            <p className="cv-mini-label">DECISION STACK / SELECT A LAYER</p>
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

        <div className="cv-cover-equation" aria-label="Truth layers are not interchangeable">
          <span>CAREER FACT</span><b>≠</b><span>MARKET FACT</span><b>≠</b><span>DERIVED ANALYSIS</span><b>≠</b><span>RECOMMENDATION</span>
        </div>
      </section>

      <section className="cv-problem" id="problem">
        <div className="cv-section-index"><span>01</span><p>PROBLEM / BOUNDARY FAILURE</p></div>
        <div className="cv-problem-heading">
          <h2>A job description can tell you what a company wants.</h2>
          <p>It cannot tell you what you can prove.</p>
        </div>
        <div className="cv-problem-grid">
          {cvEngineCase.problemSignals.map((signal, index) => (
            <motion.article
              key={signal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06, duration: 0.32 }}
            >
              <span>{signal.id}</span>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="cv-truth" id="truth">
        <div className="cv-section-index paper"><span>02</span><p>TRUTH CLASSES</p></div>
        <header className="cv-truth-heading">
          <p>Not every statement has the same epistemic status.</p>
          <h2>Truth needs a type.</h2>
        </header>
        <div className="cv-truth-grammar">
          {cvEngineCase.truthClasses.map(([type, rule, meaning], index) => (
            <div key={type}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{type}</strong>
              <p>{meaning}</p>
              <small>{rule}</small>
            </div>
          ))}
        </div>
        <div className="cv-truth-evidence"><EvidenceRef id="E-CV-01" /><EvidenceRef id="E-CV-05" /></div>
      </section>

      <section className="cv-source-graph" id="candidate-truth">
        <div className="cv-section-index"><span>03</span><p>CAREER TRUTH / TRACE</p></div>
        <header>
          <h2>Source material is not the assertion.</h2>
          <p>The candidate-side graph preserves where a statement came from and what class of truth it claims to be.</p>
        </header>
        <div className="cv-source-flow">
          <div className="cv-source-node">
            <span>01 / SOURCE</span><strong>CareerSource</strong><p>Candidate-supplied origin.</p>
          </div>
          <i aria-hidden="true" />
          <div className="cv-source-node cv-source-evidence-node">
            <span>02 / EVIDENCE</span><strong>CareerEvidence</strong>
            <dl>
              <div><dt>excerpt</dt><dd>source fragment</dd></div>
              <div><dt>locator</dt><dd>document / page / field</dd></div>
              <div><dt>reviewState</dt><dd>candidate confirmation state</dd></div>
            </dl>
          </div>
          <i aria-hidden="true" />
          <div className="cv-source-node cv-source-assertion-node">
            <span>03 / ASSERTION</span><strong>CareerAssertion</strong>
            <dl>
              <div><dt>truthClass</dt><dd>typed statement</dd></div>
              <div><dt>evidenceIds</dt><dd>provenance</dd></div>
              <div><dt>sourceIds</dt><dd>origin link</dd></div>
            </dl>
          </div>
        </div>
        <Link className="cv-proof-link" href="/evidence/e-cv-01">E-CV-01 / inspect boundary →</Link>
      </section>

      <section className="cv-job-truth" id="job-truth">
        <div className="cv-section-index paper"><span>04</span><p>JOB TRUTH</p></div>
        <div className="cv-job-truth-title">
          <h2>Job truth lives on the other side.</h2>
          <p>Requirements are extracted from the job source and remain job-side objects until comparison time.</p>
        </div>
        <div className="cv-job-truth-plate">
          <div><span>01</span><strong>JOB DESCRIPTION</strong><p>source-side market text</p></div>
          <i aria-hidden="true" />
          <div className="cv-job-requirement-card">
            <span>02</span><strong>JOB REQUIREMENT</strong>
            <dl>
              <div><dt>kind</dt><dd>SKILL / EXPERIENCE / ...</dd></div>
              <div><dt>necessity</dt><dd>REQUIRED / PREFERRED / UNKNOWN</dd></div>
              <div><dt>minimumYears</dt><dd>optional</dd></div>
            </dl>
          </div>
          <i aria-hidden="true" />
          <div><span>03</span><strong>JOB SNAPSHOT</strong><p>immutable analysis state</p></div>
        </div>
        <div className="cv-job-invariant"><span>INV-004</span><strong>JobRequirement != CandidateSkill</strong><EvidenceRef id="E-CV-02" /></div>
      </section>

      <section className="cv-match" id="match">
        <div className="cv-section-index"><span>05</span><p>REQUIREMENT MATCH</p></div>
        <header className="cv-match-heading">
          <h2>Comparison should preserve the uncomfortable answer.</h2>
          <p>Gaps and unknowns are valid outputs. They should not disappear just to make the score look better.</p>
        </header>
        <div className="cv-match-convergence">
          <span>CareerAssertion</span><i /><strong>RequirementMatch</strong><i /><span>JobRequirement</span>
        </div>
        <div className="cv-match-table">
          <div className="cv-match-table-head"><span>CANDIDATE EVIDENCE</span><span>JOB REQUIREMENT</span><span>RESULT</span></div>
          {cvEngineCase.matchExamples.map(([candidate, requirement, result]) => (
            <div key={`${candidate}-${requirement}`} className={`cv-match-row is-${result.toLowerCase()}`}>
              <span>{candidate}</span><span>{requirement}</span><strong>{result}</strong>
            </div>
          ))}
        </div>
        <Link className="cv-proof-link" href="/evidence/e-cv-03">E-CV-03 / inspect matching evidence →</Link>
      </section>

      <section className="cv-escalation" id="grounding">
        <div className="cv-section-index"><span>06</span><p>GROUNDING / RESPONSIBILITY</p></div>
        <header>
          <p>AI can improve wording without receiving permission to improve history.</p>
          <h2>Stronger verbs need stronger evidence.</h2>
        </header>
        <div className="cv-escalation-ledger">
          <div><span>SOURCE</span><span>GENERATED</span><span>GUARD</span></div>
          {cvEngineCase.escalationExamples.map(([source, generated, state]) => (
            <div key={`${source}-${generated}`}>
              <strong>{source}</strong><b>→</b><strong>{generated}</strong><span>{state}</span>
            </div>
          ))}
        </div>
        <Link className="cv-proof-link" href="/evidence/e-cv-04">E-CV-04 / inspect semantic guard →</Link>
      </section>

      <section className="cv-can-want" id="target">
        <div className="cv-can-side">
          <span>CAREER TRUTH / CAN</span>
          <h2>CAN</h2>
          <p>What the current evidence supports.</p>
          <small>feeds Job Match</small>
        </div>
        <div className="cv-can-want-rule">
          <b>≠</b>
          <p>WANT cannot satisfy a JobRequirement.</p>
          <EvidenceRef id="E-CV-09" />
        </div>
        <div className="cv-want-side">
          <span>CAREER TARGET / WANT</span>
          <h2>WANT</h2>
          <p>Where the candidate wants to compete.</p>
          <small>feeds Target Relevance</small>
        </div>
      </section>

      <section className="cv-assessment" id="assessment">
        <div className="cv-section-index paper"><span>07</span><p>OPPORTUNITY ASSESSMENT</p></div>
        <header>
          <div><p>QUESTION</p><h2>Should I apply?</h2></div>
          <p>The output is a bounded decision object, not a fake probability of being hired.</p>
        </header>
        <div className="cv-assessment-object">
          <aside>
            <span>DERIVED OBJECT</span>
            <strong>OpportunityAssessment</strong>
            <p>policy / market-opportunity-assessment-v1</p>
          </aside>
          <div className="cv-assessment-states">
            {cvEngineCase.assessmentStates.map(([recommendation, decision, action]) => (
              <div key={recommendation}>
                <strong>{recommendation}</strong><span>{decision}</span><small>{action}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="cv-not-probability"><span>NOT</span><strong>HIRING PROBABILITY</strong><strong>RECRUITER DECISION</strong><strong>COMMERCIAL ATS SCORE</strong><EvidenceRef id="E-CV-08" /></div>
      </section>

      <section className="cv-resume" id="resume">
        <div className="cv-section-index"><span>08</span><p>RESUME / PROVENANCE</p></div>
        <header>
          <h2>The resume appears late for a reason.</h2>
          <p>It is a contextual versioned projection of candidate truth, not the database where truth starts.</p>
        </header>
        <div className="cv-resume-chain">
          {[
            ["01", "CareerAssertion", "candidate-side truth"],
            ["02", "ResumeClaim", "traceable wording"],
            ["03", "ClaimLedger", "claim ↔ assertion map"],
            ["04", "ResumeVersion", "content-addressed artifact"],
          ].map(([id, title, detail]) => (
            <div key={title}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>
        <div className="cv-resume-version-specimen">
          <div><span>ResumeVersion / specimen</span><EvidenceRef id="E-CV-06" /></div>
          <code>candidateProfileId</code><code>targetedJobDescriptionId</code><code>targetJobDescriptionSha256</code><code>matchReportId</code><code>claimIds[]</code><code>contentSha256</code><code>generation.provider</code><code>generation.model</code><code>generation.contractVersion</code>
        </div>
        <div className="cv-resume-proof"><EvidenceRef id="E-CV-05" /><EvidenceRef id="E-CV-06" /><EvidenceRef id="E-CV-07" /></div>
      </section>

      <section className="cv-market" id="market">
        <div className="cv-section-index"><span>09</span><p>MARKET INGRESS</p></div>
        <header>
          <p>Career Opportunity Intelligence begins only after the external-source boundary is explicit.</p>
          <h2>Provider access is controlled input, not open browsing.</h2>
        </header>
        <div className="cv-provider-flow">
          <div className="cv-provider-list">
            {cvEngineCase.providers.map(([provider, locator]) => (
              <div key={provider}><strong>{provider}</strong><span>{locator}</span></div>
            ))}
          </div>
          <i aria-hidden="true" />
          <div className="cv-provider-adapter"><span>BOUNDARY</span><strong>CONTROLLED SOURCE ADAPTER</strong><p>provider-specific infrastructure</p></div>
          <i aria-hidden="true" />
          <div className="cv-market-observation"><span>MARKET FACT</span><strong>MarketObservation</strong><p>raw + source-explicit fields</p></div>
        </div>
        <div className="cv-provider-rules">
          {cvEngineCase.providerRules.map((rule) => <span key={rule}>{rule}</span>)}
        </div>
        <div className="cv-market-proof"><EvidenceRef id="E-CV-10" /><EvidenceRef id="E-CV-11" /></div>
      </section>

      <section className="cv-unknown" id="unknown">
        <div className="cv-unknown-statement">
          <span>10 / DERIVED INTERPRETATION</span>
          <h2>UNKNOWN <b>≠</b> FALSE</h2>
          <h3>SOURCE_SILENT <b>≠</b> INFERRED_VALUE</h3>
        </div>
        <div className="cv-derived-objects">
          <article className="cv-known-object">
            <span>DerivedMarketField</span><strong>KNOWN</strong>
            <dl><div><dt>value</dt><dd>REMOTE</dd></div><div><dt>derivation</dt><dd>CONTROLLED_CLASSIFICATION</dd></div><div><dt>sourceField</dt><dd>workModel</dd></div><div><dt>sourceValue</dt><dd>remote</dd></div></dl>
          </article>
          <article className="cv-unknown-object">
            <span>DerivedMarketField</span><strong>UNKNOWN</strong>
            <dl><div><dt>reason</dt><dd>SOURCE_SILENT</dd></div><div><dt>value</dt><dd>—</dd></div></dl>
            <p>Missing structured data remains missing. Adjacent title/description text does not silently fill it.</p>
          </article>
        </div>
        <div className="cv-unknown-reasons">{cvEngineCase.unknownReasons.map((reason) => <span key={reason}>{reason}</span>)}</div>
        <Link className="cv-proof-link" href="/evidence/e-cv-12">E-CV-12 / inspect derived-state boundary →</Link>
      </section>

      <section className="cv-projection" id="projection">
        <div className="cv-section-index paper"><span>11</span><p>MARKET → JOB INTELLIGENCE</p></div>
        <header>
          <h2>Only authorized source text crosses the parser boundary.</h2>
          <p>Role title, seniority, work model and other metadata do not get concatenated into synthetic requirement text.</p>
        </header>
        <div className="cv-projection-flow">
          {[
            ["01", "MarketObservation", "what source said"],
            ["02", "DerivedMarketInterpretation", "controlled normalization"],
            ["03", "MarketJobProjection", "authorized parser text"],
            ["04", "Job Intelligence", "existing deterministic parser"],
            ["05", "JobSnapshot", "immutable job-side state"],
          ].map(([id, title, detail], index) => (
            <div key={title}>
              <span>{id}</span><strong>{title}</strong><p>{detail}</p>
              {index < 4 ? <i aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
        <div className="cv-legal-inputs"><p>LEGAL PARSER INPUT</p><strong>RAW TEXT OBSERVATION</strong><b>OR</b><strong>SOURCE-EXPLICIT JSON DESCRIPTION</strong><EvidenceRef id="E-CV-13" /></div>
      </section>

      <section className="cv-snapshot" id="snapshot">
        <div className="cv-section-index"><span>12</span><p>EXACT SNAPSHOT → DECISION</p></div>
        <header>
          <p>Central invariant</p>
          <h2>THE JOB SNAPSHOT IS CONSUMED, NOT REBUILT.</h2>
        </header>
        <div className="cv-snapshot-flow">
          <div className="cv-snapshot-id"><span>JOB SNAPSHOT ID</span><strong>job-snapshot:…</strong><small>same identity</small></div>
          {[
            ["Job Match", "compare exact requirement set"],
            ["OpportunityAssessment", "derive bounded action"],
            ["OpportunityHistory", "preserve exact snapshot link"],
          ].map(([title, detail]) => (
            <div key={title}><i aria-hidden="true" /><strong>{title}</strong><p>{detail}</p><small>job-snapshot:…</small></div>
          ))}
        </div>
        <Link className="cv-proof-link" href="/evidence/e-cv-14">E-CV-14 / inspect exact-snapshot integration →</Link>
      </section>

      <section className="cv-verification" id="verification">
        <div className="cv-section-index paper"><span>13</span><p>VERIFICATION / CLAIM CEILING</p></div>
        <header><h2>Show what is proven. Show what is next.</h2><p>The final row is intentionally unfinished. Current market identity/lifecycle is the next architecture boundary, not a hidden claim.</p></header>
        <div className="cv-verification-table">
          {cvEngineCase.verification.map(([claim, state, evidence]) => (
            <div key={claim} className={state.includes("NOT CLAIMED") ? "is-next" : undefined}>
              <strong>{claim}</strong><span>{state}</span><EvidenceRef id={evidence} />
            </div>
          ))}
        </div>
      </section>

      <section className="cv-evidence" id="evidence">
        <div className="cv-evidence-copy">
          <p>14 / EVIDENCE DOSSIER</p>
          <h2>Every strong statement has somewhere to go.</h2>
          <span>Source, test artifact, provenance and limitation travel together.</span>
          <Link href="/evidence">Open Evidence Library →</Link>
        </div>
        <div className="cv-evidence-ledger">
          {cvEngineCase.evidence.map(([id, label, state]) => (
            <Link href={`/evidence/${id.toLowerCase()}`} key={id}>
              <span>{id}</span><strong>{label}</strong><small>{state}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="cv-boundary" id="boundary">
        <div className="cv-section-index"><span>15</span><p>CURRENT BOUNDARY / NEXT</p></div>
        <div className="cv-boundary-grid">
          <div className="cv-proven-now">
            <span>CURRENTLY PROVEN</span>
            <h2>Source → JobSnapshot → application decision.</h2>
            <p>With provenance boundaries preserved through the current M4B-06 architecture.</p>
          </div>
          <div className="cv-next-system">
            <span>NEXT / M4B-07</span>
            <h3>Opportunity identity & lifecycle.</h3>
            <ul><li>cross-source logical identity</li><li>deduplication semantics</li><li>OPEN / CLOSED / STALE</li><li>freshness semantics</li></ul>
            <strong>NOT CLAIMED COMPLETE</strong>
          </div>
        </div>
        <div className="cv-case-exit"><Link href="/systems">← All systems</Link><Link href="/evidence">Evidence →</Link></div>
      </section>
    </main>
  );
}
