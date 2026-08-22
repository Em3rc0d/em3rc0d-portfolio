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

const selectedProofIds = ["E-CV-01", "E-CV-03", "E-CV-05", "E-CV-08", "E-CV-11", "E-CV-12", "E-CV-14"] as const;

export function CvEngineCase() {
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

      <section className="cv-v2-problem" id="problem">
        <div className="cv-section-index"><span>01</span><p>PROBLEM / TRUTH MODEL</p></div>
        <header className="cv-v2-heading">
          <div>
            <h2>A job description can tell you what a company wants.</h2>
            <p>It cannot tell you what you can prove.</p>
          </div>
          <p>That boundary is the product. Candidate facts, market facts, derived analysis, and recommendations stay different objects.</p>
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
                <span>{signal.id}</span>
                <h3>{signal.title}</h3>
                <p>{signal.detail}</p>
              </motion.article>
            ))}
          </div>

          <div className="cv-v2-truth-board">
            {cvEngineCase.truthClasses.map(([type, rule, meaning], index) => (
              <div key={type}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{type}</strong>
                <p>{meaning}</p>
                <small>{rule}</small>
              </div>
            ))}
            <footer><EvidenceRef id="E-CV-01" /><EvidenceRef id="E-CV-05" /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-boundaries" id="boundaries">
        <div className="cv-section-index paper"><span>02</span><p>CANDIDATE TRUTH ≠ JOB TRUTH</p></div>
        <header className="cv-v2-heading">
          <div><h2>Two truth graphs meet only at comparison time.</h2></div>
          <p>Source provenance remains visible on both sides. A JobRequirement can ask for a capability; it cannot create candidate evidence.</p>
        </header>

        <div className="cv-v2-boundary-board">
          <article>
            <span>CAREER / CANDIDATE SIDE</span>
            <div className="cv-v2-flow">
              <strong>CareerSource</strong><i>→</i><strong>CareerEvidence</strong><i>→</i><strong>CareerAssertion</strong>
            </div>
            <dl>
              <div><dt>origin</dt><dd>candidate-supplied source</dd></div>
              <div><dt>evidence</dt><dd>excerpt + locator + review state</dd></div>
              <div><dt>assertion</dt><dd>typed claim + provenance links</dd></div>
            </dl>
          </article>

          <article>
            <span>MARKET / JOB SIDE</span>
            <div className="cv-v2-flow">
              <strong>Job Description</strong><i>→</i><strong>JobRequirement</strong><i>→</i><strong>JobSnapshot</strong>
            </div>
            <dl>
              <div><dt>source</dt><dd>market-side text</dd></div>
              <div><dt>requirement</dt><dd>kind + necessity + optional minimums</dd></div>
              <div><dt>snapshot</dt><dd>immutable analysis state</dd></div>
            </dl>
          </article>
        </div>

        <div className="cv-v2-invariant"><span>INV-004</span><strong>JobRequirement != CandidateSkill</strong><EvidenceRef id="E-CV-01" /><EvidenceRef id="E-CV-02" /></div>
      </section>

      <section className="cv-v2-match" id="match">
        <div className="cv-section-index"><span>03</span><p>MATCH / UNKNOWN</p></div>
        <header className="cv-v2-heading">
          <div><h2>Comparison should preserve the uncomfortable answer.</h2></div>
          <p>MATCH, GAP, BLOCKER, POTENTIAL_MATCH, and UNKNOWN are legitimate outcomes. Missing information is not silently converted into a negative or a guess.</p>
        </header>

        <div className="cv-v2-match-grid">
          <div className="cv-v2-match-table">
            <div><span>CANDIDATE EVIDENCE</span><span>JOB REQUIREMENT</span><span>RESULT</span></div>
            {cvEngineCase.matchExamples.map(([candidate, requirement, result]) => (
              <div key={`${candidate}-${requirement}`} data-result={result}>
                <span>{candidate}</span><span>{requirement}</span><strong>{result}</strong>
              </div>
            ))}
          </div>

          <div className="cv-v2-unknown-board">
            <span>DERIVED MARKET FIELD</span>
            <h3>UNKNOWN <b>≠</b> FALSE</h3>
            <p>When the source is silent, the value stays absent with an explicit reason.</p>
            <div>{cvEngineCase.unknownReasons.map((reason) => <span key={reason}>{reason}</span>)}</div>
            <footer><EvidenceRef id="E-CV-03" /><EvidenceRef id="E-CV-12" /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-grounding" id="grounding">
        <div className="cv-section-index"><span>04</span><p>GROUNDING / INTENT</p></div>
        <header className="cv-v2-heading">
          <div><h2>AI can improve wording without receiving permission to improve history.</h2></div>
          <p>Capability truth and career intent also stay separate: CAN answers what evidence supports; WANT answers where the candidate wants to compete.</p>
        </header>

        <div className="cv-v2-grounding-grid">
          <div className="cv-v2-escalation-ledger">
            <div><span>SOURCE</span><span>GENERATED</span><span>GUARD</span></div>
            {cvEngineCase.escalationExamples.map(([source, generated, state]) => (
              <div key={`${source}-${generated}`}>
                <strong>{source}</strong><b>→</b><strong>{generated}</strong><span>{state}</span>
              </div>
            ))}
          </div>

          <div className="cv-v2-can-want">
            <article><span>CAREER TRUTH</span><h3>CAN</h3><p>What current evidence supports.</p><small>feeds Job Match</small></article>
            <div><b>≠</b><p>WANT cannot satisfy a JobRequirement.</p><EvidenceRef id="E-CV-09" /></div>
            <article><span>CAREER TARGET</span><h3>WANT</h3><p>Where the candidate wants to compete.</p><small>feeds Target Relevance</small></article>
          </div>
        </div>
        <Link className="cv-proof-link" href="/evidence/e-cv-04">E-CV-04 / inspect responsibility guard →</Link>
      </section>

      <section className="cv-v2-decision" id="decision">
        <div className="cv-section-index paper"><span>05</span><p>ASSESSMENT → RESUME</p></div>
        <header className="cv-v2-heading">
          <div><h2>Should I apply? The resume appears after the decision model.</h2></div>
          <p>The product returns a bounded action recommendation, then generates a traceable resume projection from candidate truth. It does not claim employer probability.</p>
        </header>

        <div className="cv-v2-decision-grid">
          <div className="cv-v2-assessment-board">
            <span>OpportunityAssessment</span>
            {cvEngineCase.assessmentStates.map(([recommendation, decision, action]) => (
              <div key={recommendation}><strong>{recommendation}</strong><span>{decision}</span><small>{action}</small></div>
            ))}
            <footer>NOT: hiring probability · recruiter decision · commercial ATS score</footer>
          </div>

          <div className="cv-v2-resume-board">
            <span>TRACEABLE PROJECTION</span>
            <div className="cv-v2-resume-chain">
              <strong>CareerAssertion</strong><i>→</i><strong>ResumeClaim</strong><i>→</i><strong>ClaimLedger</strong><i>→</i><strong>ResumeVersion</strong>
            </div>
            <div className="cv-v2-version-fields">
              <code>candidateProfileId</code><code>jobSnapshotId</code><code>matchReportId</code><code>claimIds[]</code><code>contentSha256</code><code>generation.contractVersion</code>
            </div>
            <footer><EvidenceRef id="E-CV-05" /><EvidenceRef id="E-CV-06" /><EvidenceRef id="E-CV-07" /><EvidenceRef id="E-CV-08" /></footer>
          </div>
        </div>
      </section>

      <section className="cv-v2-market" id="market">
        <div className="cv-section-index"><span>06</span><p>CONTROLLED MARKET INGRESS</p></div>
        <header className="cv-v2-heading">
          <div><h2>External market data enters through explicit boundaries.</h2></div>
          <p>Provider-specific adapters create source-explicit observations. Only authorized source text crosses into Job Intelligence, and the exact durable JobSnapshot is consumed downstream rather than rebuilt.</p>
        </header>

        <div className="cv-v2-market-grid">
          <div className="cv-v2-provider-board">
            {cvEngineCase.providers.map(([provider, locator]) => (
              <div key={provider}><strong>{provider}</strong><span>{locator}</span></div>
            ))}
            <i>→</i><strong>CONTROLLED SOURCE ADAPTER</strong><i>→</i><strong>MarketObservation</strong>
          </div>

          <div className="cv-v2-projection-board">
            {[
              ["01", "MarketObservation"],
              ["02", "DerivedMarketInterpretation"],
              ["03", "MarketJobProjection"],
              ["04", "Job Intelligence"],
              ["05", "JobSnapshot"],
            ].map(([id, title], index) => (
              <span key={title}><b>{id}</b><strong>{title}</strong>{index < 4 ? <i>→</i> : null}</span>
            ))}
          </div>
        </div>

        <div className="cv-v2-snapshot-invariant">
          <span>EXACT SNAPSHOT INVARIANT</span>
          <strong>JobSnapshot → Job Match → OpportunityAssessment → OpportunityHistory</strong>
          <small>same durable snapshot identity</small>
          <div><EvidenceRef id="E-CV-10" /><EvidenceRef id="E-CV-11" /><EvidenceRef id="E-CV-13" /><EvidenceRef id="E-CV-14" /></div>
        </div>
      </section>

      <section className="cv-v2-proof" id="evidence">
        <div className="cv-section-index paper"><span>07</span><p>VERIFICATION / CURRENT BOUNDARY</p></div>
        <header className="cv-v2-heading">
          <div><h2>Show what is proven. Show what is next.</h2></div>
          <p>The full proof corpus lives in the Evidence Library. This case keeps only the release boundary and the strongest inspection routes in view.</p>
        </header>

        <div className="cv-v2-proof-grid">
          <div className="cv-v2-verification-list">
            {cvEngineCase.verification.map(([claim, state, evidence]) => (
              <div key={claim} data-next={state.includes("NOT CLAIMED") ? "true" : "false"}>
                <strong>{claim}</strong><span>{state}</span><EvidenceRef id={evidence} />
              </div>
            ))}
          </div>

          <aside className="cv-v2-current-boundary">
            <span>CURRENTLY PROVEN</span>
            <h3>Source → JobSnapshot → application decision.</h3>
            <p>With provenance boundaries preserved through the current M4B-06 architecture.</p>
            <div className="cv-v2-proof-links">
              {selectedProofIds.map((id) => <EvidenceRef key={id} id={id} />)}
            </div>
            <div className="cv-v2-next-boundary">
              <span>NEXT / M4B-07</span>
              <strong>Opportunity identity &amp; lifecycle.</strong>
              <p>Cross-source identity, deduplication, OPEN/CLOSED/STALE, and freshness semantics remain explicitly next.</p>
              <b>NOT CLAIMED COMPLETE</b>
            </div>
          </aside>
        </div>

        <div className="cv-case-exit"><Link href="/systems">← All systems</Link><Link href="/evidence">Open full Evidence Library →</Link></div>
      </section>
    </main>
  );
}
