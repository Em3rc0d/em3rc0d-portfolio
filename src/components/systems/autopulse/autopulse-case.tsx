"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/shell/site-header";
import { AutoPulseProductSpecimen } from "@/components/systems/autopulse/autopulse-product-specimen";
import { autopulseCase } from "@/content/autopulse";

function evidenceHref(id: string) {
  return id.startsWith("E-AP-") ? `/evidence/${id.toLowerCase()}` : null;
}

function EvidenceReference({ id }: { id: string }) {
  const href = evidenceHref(id);
  if (!href) return <span>{id}</span>;
  return <Link href={href}>{id}</Link>;
}

const selectedProofIds = ["E-AP-01", "E-AP-03", "E-AP-05", "E-AP-06", "E-AP-07", "E-AP-08"] as const;

export function AutoPulseCase() {
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
              <span>CASE / ACTIVE</span>
            </div>

            <h1>{autopulseCase.name}</h1>
            <p className="ap-thesis">{autopulseCase.thesis}</p>

            <div className="ap-cover-meta">
              <div><span>ROLE</span><strong>{autopulseCase.role}</strong></div>
              <div><span>STATE</span><strong>{autopulseCase.state}</strong></div>
              <div><span>EVIDENCE</span><strong>{autopulseCase.evidence.length} mapped artifacts</strong></div>
            </div>
          </div>

          <AutoPulseProductSpecimen />
        </div>

        <nav className="ap-case-nav" aria-label="AutoPulse case chapters">
          {[
            ["01", "Reality", "#reality"],
            ["02", "Decisions", "#decisions"],
            ["03", "Build", "#build"],
            ["04", "Recovery", "#recovery"],
            ["05", "Verification", "#verification"],
            ["06", "Boundary", "#boundary"],
          ].map(([id, label, href]) => (
            <a key={href} href={href}><span>{id}</span>{label}</a>
          ))}
        </nav>
      </section>

      <section className="ap-v2-reality" id="reality">
        <div className="ap-section-label"><span>01</span><p>PROBLEM / SYSTEM MODEL</p></div>
        <header className="ap-v2-heading">
          <div><h2>Telemetry is not a clean stream.</h2><p>Reading vehicle data is the easy description. The system has to survive partial, delayed, missing, interrupted, and corrupt outcomes without rewriting them into a clean fiction.</p></div>
          <strong>SIGNAL → EVENT → BLOCK → SESSION → SUMMARY</strong>
        </header>

        <div className="ap-v2-reality-grid">
          <div className="ap-v2-signal-board">
            {autopulseCase.problemSignals.map((signal, index) => (
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

          <div className="ap-v2-model-board" aria-label="AutoPulse conceptual system model">
            {[
              ["01", "VEHICLE", "physical source"],
              ["02", "COMMAND RESULT", "success / no-data / failure"],
              ["03", "ACQUISITION EVENT", "preserved outcome"],
              ["04", "TELEMETRY BLOCK", "bounded durable unit"],
              ["05", "LIVE SESSION", "explicit lifecycle"],
              ["06", "SUMMARY", "integrity-aware interpretation"],
            ].map(([id, title, detail]) => (
              <div key={title}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-v2-decisions" id="decisions">
        <div className="ap-section-label"><span>02</span><p>DECISIONS / ARCHITECTURE</p></div>
        <header className="ap-v2-heading">
          <div><h2>The case is in the decisions, not the gauges.</h2><p>The visible telemetry is only the surface. These decisions define what remains trustworthy when the happy path breaks.</p></div>
          <p>Select an architecture component to inspect its responsibility and evidence route.</p>
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
            <div className="ap-v2-architecture-flow" aria-label="AutoPulse architecture components">
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

            <motion.aside
              key={selectedNode.id}
              className="ap-v2-component-inspector"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div><span>COMPONENT / {selectedNode.number}</span><EvidenceReference id={selectedNode.evidence} /></div>
              <h3>{selectedNode.title}</h3>
              <p>{selectedNode.detail}</p>
              <Link href={`/evidence/${selectedNode.evidence.toLowerCase()}`}>Inspect evidence →</Link>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="ap-v2-build" id="build">
        <div className="ap-section-label light"><span>03</span><p>BUILD / PERSISTENCE CONTRACT</p></div>
        <header className="ap-v2-heading">
          <div><h2>Persistence has a contract.</h2><p>Retry, conflict, sequence gaps, regressions, truncation, and corruption are not the same failure. The repository preserves those differences explicitly.</p></div>
          <div className="ap-v2-build-tags"><span>BINARY_OBD2_V3</span><span>CRC32</span><span>ORDERED SEQUENCE</span><span>IDEMPOTENT COMMIT</span></div>
        </header>

        <div className="ap-v2-build-grid">
          <div className="ap-code-specimen ap-code-specimen-v2">
            <div className="ap-code-title"><span>TelemetryBlockRepository.ts</span><Link href="/evidence/e-ap-03">E-AP-03</Link></div>
            <pre aria-label="Simplified persistence contract excerpt"><code>{`if (calculatedCrc !== encodedBlock.payloadCrc)
  return INVALID_BLOCK_CRC

if (targetSequence > expectedSeq)
  return BLOCK_SEQUENCE_GAP

if (targetSequence < expectedSeq)
  return REGRESSIVE_BLOCK_SEQUENCE

identical retry → ALREADY_COMMITTED
same sequence / different payload → CONFLICT`}</code></pre>
          </div>

          <div className="ap-v2-build-contract">
            {[
              ["01", "Integrity", "CRC metadata detects corrupted encoded blocks before they enter trusted state."],
              ["02", "Sequence", "Expected ordering distinguishes a real gap from a regressive write."],
              ["03", "Retry", "An identical retry is idempotent; a different payload on the same sequence is a conflict."],
              ["04", "Durability", "The persistence boundary records enough truth for later recovery and summary integrity."],
            ].map(([id, title, detail]) => (
              <article key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-v2-recovery" id="recovery">
        <div className="ap-section-label"><span>04</span><p>FAILURE / RECOVERY</p></div>
        <header className="ap-v2-heading">
          <div><h2>The process can die. The data does not have to.</h2><p>An interrupted application should not manufacture a clean completion or throw away durable telemetry that already exists.</p></div>
          <div className="ap-v2-failure-mark"><span>ACTIVE SESSION</span><b>×</b><strong>PROCESS ENDS</strong></div>
        </header>

        <div className="ap-v2-recovery-path">
          {[
            ["01", "Persisted blocks", "Durable telemetry already exists."],
            ["02", "Find orphan", "A non-terminal session remains after startup."],
            ["03", "Reconcile", "Counters are rebuilt from persisted blocks."],
            ["04", "Mark interrupted", "History records unexpected termination honestly."],
          ].map(([id, title, detail]) => (
            <div key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>

        <div className="ap-v2-recovery-claim">
          <Link href="/evidence/e-ap-06">E-AP-06</Link>
          <p>`recoverOrphanedSessions()` reconciles durable counters and records `UNEXPECTED_APP_TERMINATION` instead of fabricating a clean completion.</p>
        </div>
      </section>

      <section className="ap-v2-verification" id="verification">
        <div className="ap-section-label light"><span>05</span><p>VERIFICATION / EVIDENCE</p></div>
        <header className="ap-v2-heading">
          <div><h2>Built is not the same as field-proven.</h2><p>The case keeps the claim ceiling visible. Source and test artifacts prove software behavior; they do not automatically prove every vehicle, adapter, or physical environment.</p></div>
          <Link href="/evidence">Open full Evidence Library →</Link>
        </header>

        <div className="ap-v2-verification-grid">
          <div className="ap-v2-verification-list">
            {autopulseCase.verification.map((item) => (
              <div key={item.claim} data-unclaimed={item.state === "NOT CLAIMED" ? "true" : "false"}>
                <strong>{item.claim}</strong><span>{item.state}</span><EvidenceReference id={item.evidence} />
              </div>
            ))}
          </div>

          <aside className="ap-v2-proof-board">
            <span>SELECTED PROOF ROUTES</span>
            <div>{selectedProofIds.map((id) => <EvidenceReference key={id} id={id} />)}</div>
            <p>Detailed provenance, source coordinates, test state, and limitation remain inside each evidence dossier.</p>
          </aside>
        </div>
      </section>

      <section className="ap-v2-boundary" id="boundary">
        <div className="ap-section-label"><span>06</span><p>CURRENT BOUNDARY / NEXT</p></div>
        <div className="ap-v2-boundary-grid">
          <div>
            <span>CURRENTLY PROVEN</span>
            <h2>Telemetry can move from imperfect acquisition into durable, recoverable, integrity-aware session state.</h2>
            <p>The portfolio proof is strongest around software lifecycle, persistence, recovery, and interpretation boundaries.</p>
          </div>
          <div>
            <span>FIELD REALITY</span>
            <h3>Compatibility remains a physical-system problem.</h3>
            <p>Vehicle coverage, adapter behavior, and field variability must continue to be earned with real-device evidence rather than inferred from implementation.</p>
            <strong>DO NOT OVERCLAIM THE FIELD GATE</strong>
          </div>
        </div>
        <div className="ap-v2-case-exit"><Link href="/systems">← All systems</Link><Link href="/evidence">Evidence →</Link></div>
      </section>
    </main>
  );
}
