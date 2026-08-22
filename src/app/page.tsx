import Link from "next/link";
import { StartupHero } from "@/components/home/startup-hero";
import { flagshipSystems } from "@/content/systems";
import { evidenceRecords } from "@/content/evidence";
import { cvEngineEvidenceRecords } from "@/content/cv-engine-evidence";

const clientPaths = [
  [
    "01",
    "BUILD",
    "Custom software systems",
    "Turn an operational problem, manual workflow, or product idea into working software with clear boundaries and ownership.",
  ],
  [
    "02",
    "RECOVER",
    "Existing products and codebases",
    "Understand what is really there before changing it: behavior, architecture, dependencies, risks, and missing evidence.",
  ],
  [
    "03",
    "IMPROVE",
    "Workflows and integrations",
    "Make fragmented or brittle software easier to operate, integrate, verify, and evolve without rewriting reality.",
  ],
  [
    "04",
    "APPLIED AI",
    "AI inside real products",
    "Add useful AI capabilities while keeping product truth, provenance, failure behavior, and human control explicit.",
  ],
] as const;

const operatingSequence = [
  ["01", "RECOVER", "Understand what actually exists before proposing what should exist."],
  ["02", "BOUND", "Separate actors, ownership, state, source truth and responsibility."],
  ["03", "MODEL", "Turn operational reality into explicit system objects and relationships."],
  ["04", "BUILD", "Implement the smallest coherent path with one visible responsibility."],
  ["05", "VERIFY", "Use source, tests, browser proof or field evidence appropriate to the claim."],
  ["06", "EVOLVE", "Keep the system honest as new evidence changes what should happen next."],
] as const;

const homeEvidence = {
  autopulse: evidenceRecords.filter((item) =>
    ["E-AP-03", "E-AP-06", "E-AP-08"].includes(item.id),
  ),
  "cv-engine": cvEngineEvidenceRecords.filter((item) =>
    ["E-CV-01", "E-CV-03", "E-CV-05"].includes(item.id),
  ),
} as const;

export default function Home() {
  return (
    <main className="build-room-shell">
      <div className="calibration-rail" aria-hidden="true">
        <span>00</span>
        <i />
        <span>100</span>
      </div>

      <StartupHero />

      <section className="client-paths narrative-frame" aria-labelledby="client-paths-heading">
        <header className="client-paths-heading">
          <div>
            <p className="technical-label">CLIENT PROBLEMS / 01</p>
            <h2 id="client-paths-heading">What can I help you make work?</h2>
          </div>
          <div>
            <p>
              You do not need a perfect brief or a service package. Start with the
              operational problem, the product that already exists, or the outcome
              that needs to become reliable.
            </p>
            <Link href="/contact">Start with your situation <span aria-hidden="true">↗</span></Link>
          </div>
        </header>

        <div className="client-path-grid">
          {clientPaths.map(([id, title, label, detail]) => (
            <article key={id}>
              <span>{id}</span>
              <p>{label}</p>
              <h3>{title}</h3>
              <strong>{detail}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="systems-runway systems-runway-v2" aria-labelledby="systems-heading">
        <div className="section-heading-row systems-commercial-heading">
          <div>
            <p className="technical-label">SELECTED SYSTEMS / 02</p>
            <h2 id="systems-heading">See the engineering in working systems.</h2>
          </div>
          <p>
            These are not technology lists. Each system exposes the problem, the
            operating model, engineering decisions, failure behavior, and evidence
            behind what I claim.
          </p>
        </div>

        <div className="system-records system-records-v2">
          {flagshipSystems.map((system) => {
            const evidence = homeEvidence[system.slug as keyof typeof homeEvidence] ?? [];

            return (
              <article
                className={`system-record system-encounter-record narrative-frame is-${system.slug}`}
                key={system.id}
              >
                <div className="system-record-index">
                  <span>{system.id}</span>
                  <span>{system.label}</span>
                </div>

                <div className="system-record-main">
                  <div className="system-title-row">
                    <div>
                      <p className="system-encounter-kicker">SYSTEM / {system.id}</p>
                      <h3>{system.name}</h3>
                    </div>
                    <span className="system-role-state">{system.state.replace("_", " ")}</span>
                  </div>

                  <p>{system.summary}</p>

                  <div
                    className={`system-artifact-stage artifact-${system.slug}`}
                    aria-label={`${system.name} engineering artifact preview`}
                  >
                    <div className="artifact-system-path">
                      {system.path.map((step, index) => (
                        <span
                          className="artifact-path-step"
                          key={step}
                          data-id={String(index + 1).padStart(2, "0")}
                          data-label={step}
                          data-terminal={index === system.path.length - 1 ? "true" : "false"}
                          aria-label={`${String(index + 1).padStart(2, "0")} ${step}`}
                        />
                      ))}
                    </div>

                    <div className="artifact-evidence-ledger">
                      <p>INSPECTABLE ARTIFACTS</p>
                      {evidence.map((item) => (
                        <Link
                          href={`/evidence/${item.slug}`}
                          key={item.id}
                          data-id={item.id}
                          data-state={item.state.replace("_", " ")}
                          aria-label={`${item.id}: ${item.title}. ${item.state.replace("_", " ")}`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="system-record-meta">
                  <dl>
                    <div>
                      <dt>ROLE</dt>
                      <dd>{system.ownership}</dd>
                    </div>
                    <div>
                      <dt>PUBLICABILITY</dt>
                      <dd>{system.publicability}</dd>
                    </div>
                    <div>
                      <dt>PROOF ROUTE</dt>
                      <dd>{evidence.length} selected records</dd>
                    </div>
                  </dl>

                  {system.href ? (
                    <Link href={system.href} className="inspect-link">
                      Inspect system <span aria-hidden="true">↗</span>
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="operating-model narrative-frame" aria-labelledby="operating-model-heading">
        <div className="operating-model-intro">
          <p className="technical-label">WORKING MODEL / 03</p>
          <h2 id="operating-model-heading">From messy reality to inspectable software.</h2>
          <p>
            Once the problem is clear, the method becomes useful. I recover what is
            real, define boundaries, model the system, build the smallest coherent
            path, verify the claims, and evolve from new evidence.
          </p>
        </div>

        <ol className="operating-model-sequence">
          {operatingSequence.map(([id, title, detail]) => (
            <li
              key={id}
              data-id={id}
              data-title={title}
              aria-label={`${id} ${title}. ${detail}`}
            >
              {detail}
            </li>
          ))}
        </ol>
      </section>

      <section
        className="paper-stage paper-stage-v2 narrative-frame"
        aria-labelledby="evidence-heading"
      >
        <div className="paper-registration" aria-hidden="true">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
        <div className="paper-copy">
          <p className="technical-label ink-label">CARBON → PAPER / EVIDENCE</p>
          <h2 id="evidence-heading">Claims should be inspectable.</h2>
          <p>
            Decisions, source artifacts, tests, recovery behavior and limitations are
            first-class portfolio objects. If I say a system behaves a certain way,
            you can follow the route to the proof behind that statement.
          </p>
          <Link href="/evidence" className="paper-link">
            Open evidence library <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link
          href="/evidence/e-ap-06"
          className="evidence-sample evidence-sample-v2"
          aria-label="Open AutoPulse orphaned-session recovery evidence"
        >
          <span className="evidence-id">E-AP-06</span>
          <strong>Orphaned-session recovery</strong>
          <p>
            Persisted telemetry can reconcile a non-terminal orphaned session while
            preserving the interruption honestly.
          </p>
          <dl>
            <div>
              <dt>TYPE</dt>
              <dd>Recovery / test artifact</dd>
            </div>
            <div>
              <dt>STATE</dt>
              <dd>TEST ARTIFACT</dd>
            </div>
            <div>
              <dt>LIMIT</dt>
              <dd>Recovery does not imply every external hardware failure is recoverable.</dd>
            </div>
          </dl>
          <span className="evidence-open">OPEN RECORD ↗</span>
        </Link>
      </section>

      <section className="builder-bridge narrative-frame" aria-labelledby="builder-bridge-heading">
        <div>
          <p className="technical-label">BUILDER / HUMAN CONTEXT</p>
          <h2 id="builder-bridge-heading">The system has a builder behind it.</h2>
        </div>
        <div>
          <p>
            THE BUILD ROOM is technical because the work is technical, but the goal
            is practical: understand difficult systems, make deliberate decisions,
            and ship software that can be operated and explained.
          </p>
          <Link href="/about">Meet Eduardo <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-conversion narrative-frame" aria-labelledby="home-conversion-heading">
        <div className="home-conversion-copy">
          <p className="technical-label">START / 07</p>
          <h2 id="home-conversion-heading">
            Have a system that is difficult to understand, build, or improve?
          </h2>
          <p>
            Start with the situation. I can help turn the operating reality into a
            software path we can inspect, build, and verify deliberately.
          </p>
        </div>
        <div className="home-conversion-actions">
          <Link href="/contact" className="home-conversion-primary">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
          <a href="https://www.linkedin.com/in/emerinoc" target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/Em3rc0d" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
