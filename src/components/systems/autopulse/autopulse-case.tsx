"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { SiteHeader } from "@/components/shell/site-header";
import { autopulseCase } from "@/content/autopulse";

export function AutoPulseCase() {
  const [activeNode, setActiveNode] = useState<string>(autopulseCase.architecture[0].id);
  const selectedNode =
    autopulseCase.architecture.find((node) => node.id === activeNode) ??
    autopulseCase.architecture[0];

  return (
    <main className="autopulse-case">
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
              <div>
                <span>ROLE</span>
                <strong>{autopulseCase.role}</strong>
              </div>
              <div>
                <span>STATE</span>
                <strong>{autopulseCase.state}</strong>
              </div>
              <div>
                <span>EVIDENCE</span>
                <strong>{autopulseCase.evidence.length} mapped artifacts</strong>
              </div>
            </div>
          </div>

          <div className="ap-machine" aria-label="AutoPulse system path visualization">
            <div className="ap-machine-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>AP</span>
            </div>
            <div className="ap-machine-path">
              {autopulseCase.path.map((step, index) => (
                <div key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {index < autopulseCase.path.length - 1 ? <i aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
            <div className="ap-machine-caption">
              <span>INPUT / UNRELIABLE</span>
              <span>OUTPUT / INSPECTABLE STATE</span>
            </div>
          </div>
        </div>

        <nav className="ap-case-nav" aria-label="AutoPulse case chapters">
          {[
            ["01", "Problem", "#problem"],
            ["02", "Model", "#model"],
            ["03", "Decisions", "#decisions"],
            ["04", "Architecture", "#architecture"],
            ["05", "Failure", "#failure"],
            ["06", "Verification", "#verification"],
            ["07", "Evidence", "#evidence"],
          ].map(([id, label, href]) => (
            <a key={href} href={href}>
              <span>{id}</span>
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section className="ap-problem" id="problem">
        <div className="ap-section-label">
          <span>01</span>
          <p>PROBLEM / SIGNAL</p>
        </div>

        <div className="ap-problem-main">
          <h2>Telemetry is not a clean stream.</h2>
          <p>
            Reading vehicle data is the easy description. The engineering problem
            begins when the signal, transport, process and persistence lifecycles do
            not fail together.
          </p>
        </div>

        <div className="ap-problem-signals">
          {autopulseCase.problemSignals.map((signal, index) => (
            <motion.article
              key={signal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <span>{signal.id}</span>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="ap-model" id="model">
        <div className="ap-section-label light">
          <span>02</span>
          <p>SYSTEM MODEL</p>
        </div>

        <div className="ap-model-title">
          <p>Before architecture, define what has to survive.</p>
          <h2>Signal → event → block → session.</h2>
        </div>

        <div className="ap-model-line" aria-label="AutoPulse conceptual system model">
          {[
            ["VEHICLE", "physical source"],
            ["COMMAND RESULT", "success / no-data / failure"],
            ["ACQUISITION EVENT", "preserved outcome"],
            ["TELEMETRY BLOCK", "bounded durable unit"],
            ["LIVE SESSION", "explicit lifecycle"],
            ["SUMMARY", "integrity-aware interpretation"],
          ].map(([title, description], index) => (
            <div key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ap-decisions" id="decisions">
        <div className="ap-section-label">
          <span>03</span>
          <p>ENGINEERING DECISIONS</p>
        </div>

        <div className="ap-decisions-heading">
          <h2>The case is in the decisions, not the gauges.</h2>
          <p>
            The visible telemetry is only the surface. These decisions define what
            can still be trusted after the happy path breaks.
          </p>
        </div>

        <div className="ap-decision-list">
          {autopulseCase.decisions.map((decision) => (
            <article key={decision.id}>
              <div className="ap-decision-title">
                <span>{decision.id}</span>
                <h3>{decision.title}</h3>
              </div>
              <dl>
                <div>
                  <dt>WHY</dt>
                  <dd>{decision.why}</dd>
                </div>
                <div>
                  <dt>TRADEOFF</dt>
                  <dd>{decision.tradeoff}</dd>
                </div>
                <div>
                  <dt>EVIDENCE</dt>
                  <dd>{decision.evidence.join(" · ")}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="ap-architecture" id="architecture">
        <div className="ap-section-label">
          <span>04</span>
          <p>ARCHITECTURE / INSPECT</p>
        </div>

        <div className="ap-architecture-heading">
          <h2>Follow one acquisition into durable state.</h2>
          <p>Choose a component. The inspector exposes the responsibility, not a decorative box.</p>
        </div>

        <div className="ap-architecture-workbench">
          <div className="ap-architecture-flow" aria-label="AutoPulse architecture components">
            {autopulseCase.architecture.map((node, index) => {
              const isActive = node.id === activeNode;
              return (
                <button
                  type="button"
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={isActive ? "is-active" : undefined}
                  aria-pressed={isActive}
                >
                  <span>{node.number}</span>
                  <small>{node.label}</small>
                  <strong>{node.title}</strong>
                  {index < autopulseCase.architecture.length - 1 ? <i aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          <motion.aside
            key={selectedNode.id}
            className="ap-component-inspector"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div>
              <span>COMPONENT / {selectedNode.number}</span>
              <span>{selectedNode.evidence}</span>
            </div>
            <p>{selectedNode.label}</p>
            <h3>{selectedNode.title}</h3>
            <p>{selectedNode.detail}</p>
            <a href="#evidence">Inspect evidence →</a>
          </motion.aside>
        </div>
      </section>

      <section className="ap-build" id="build">
        <div className="ap-section-label light">
          <span>05</span>
          <p>BUILD / SOURCE SPECIMENS</p>
        </div>

        <div className="ap-build-grid">
          <div className="ap-code-specimen">
            <div className="ap-code-title">
              <span>TelemetryBlockRepository.ts</span>
              <span>E-AP-03</span>
            </div>
            <pre aria-label="Simplified persistence contract excerpt"><code>{`if (calculatedCrc !== encodedBlock.payloadCrc)
  return INVALID_BLOCK_CRC

if (targetSequence > expectedSeq)
  return BLOCK_SEQUENCE_GAP

if (targetSequence < expectedSeq)
  return REGRESSIVE_BLOCK_SEQUENCE

identical retry → ALREADY_COMMITTED
same sequence / different payload → CONFLICT`}</code></pre>
          </div>

          <div className="ap-build-notes">
            <p className="technical-label">WHAT THIS PROVES</p>
            <h3>Persistence has a contract.</h3>
            <p>
              The repository differentiates idempotent retry, conflicting payload,
              sequence gaps, regressions, truncation and corruption instead of
              collapsing every persistence problem into “write failed.”
            </p>
            <div className="ap-build-tags">
              <span>BINARY_OBD2_V3</span>
              <span>CRC32</span>
              <span>ORDERED SEQUENCE</span>
              <span>IDEMPOTENT COMMIT</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ap-failure" id="failure">
        <div className="ap-failure-stage">
          <p className="technical-label">FAILURE MODE / UNEXPECTED TERMINATION</p>
          <div className="ap-failure-event">
            <span>ACTIVE SESSION</span>
            <i aria-hidden="true" />
            <strong>PROCESS ENDS</strong>
            <b aria-hidden="true">×</b>
          </div>
          <h2>The process can die. The data does not have to.</h2>
        </div>

        <div className="ap-recovery-stage">
          <div className="ap-recovery-path">
            {[
              ["01", "Persisted blocks", "Durable telemetry already exists."],
              ["02", "Find orphan", "Non-terminal session remains after startup."],
              ["03", "Reconcile", "Counters are rebuilt from persisted blocks."],
              ["04", "Mark interrupted", "History stays honest about the termination."],
            ].map(([id, title, detail]) => (
              <div key={id}>
                <span>{id}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <div className="ap-recovery-claim">
            <span>E-AP-06</span>
            <p>
              `recoverOrphanedSessions()` reconciles durable counters and records
              `UNEXPECTED_APP_TERMINATION` instead of fabricating a clean completion.
            </p>
          </div>
        </div>
      </section>

      <section className="ap-verification" id="verification">
        <div className="ap-section-label light">
          <span>06</span>
          <p>VERIFICATION / CLAIM CEILING</p>
        </div>

        <div className="ap-verification-heading">
          <h2>Built is not the same as field-proven.</h2>
          <p>
            The portfolio deliberately exposes the verification state instead of
            converting source code into a stronger claim than the evidence supports.
          </p>
        </div>

        <div className="ap-verification-table" role="table" aria-label="AutoPulse verification matrix">
          {autopulseCase.verification.map((item) => (
            <div role="row" key={item.claim}>
              <div role="cell">
                <span>CLAIM</span>
                <strong>{item.claim}</strong>
              </div>
              <div role="cell" className={item.state === "NOT CLAIMED" ? "is-unclaimed" : undefined}>
                <span>STATE</span>
                <strong>{item.state}</strong>
              </div>
              <div role="cell">
                <span>{item.evidence}</span>
                <p>{item.proof}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ap-evidence" id="evidence">
        <div className="ap-paper-marks" aria-hidden="true">
          <span>+</span><span>+</span><span>+</span><span>+</span>
        </div>

        <div className="ap-evidence-copy">
          <p className="technical-label">07 / EVIDENCE DOSSIER</p>
          <h2>Inspect what each claim rests on.</h2>
          <p>
            Current-source evidence is separated from test artifacts and from the
            physical field gate that remains intentionally unclaimed here.
          </p>
          <Link href="/evidence">Open evidence library →</Link>
        </div>

        <div className="ap-evidence-ledger">
          {autopulseCase.evidence.map(([id, label, state]) => (
            <div key={id}>
              <span>{id}</span>
              <strong>{label}</strong>
              <small>{state}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="ap-next">
        <p className="technical-label">CASE / NEXT</p>
        <h2>A reliable session is only useful if the evidence stays honest.</h2>
        <div>
          <Link href="/systems">← All systems</Link>
          <Link href="/evidence">Evidence →</Link>
        </div>
      </section>
    </main>
  );
}