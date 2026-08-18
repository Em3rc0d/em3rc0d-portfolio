import Link from "next/link";
import { StartupHero } from "@/components/home/startup-hero";
import { flagshipSystems } from "@/content/systems";
import { evidenceRecords } from "@/content/evidence";
import { cvEngineEvidenceRecords } from "@/content/cv-engine-evidence";

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

      <section className="operating-model" aria-labelledby="operating-model-heading">
        <div className="operating-model-intro">
          <p className="technical-label">WORKING MODEL / 01</p>
          <h2 id="operating-model-heading">From messy reality to inspectable software.</h2>
          <p>
            The portfolio is not organized around a wall of technologies. It shows
            the engineering path I use to make ambiguous operational problems small
            enough to model, build and verify deliberately.
          </p>
        </div>

        <ol className="operating-model-sequence">
          {operatingSequence.map(([id, title, detail]) => (
            <li key={id}>
              <span>{id}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="systems-runway systems-runway-v2" aria-labelledby="systems-heading">
        <div className="section-heading-row">
          <div>
            <p className="technical-label">SELECTED SYSTEMS / 02</p>
            <h2 id="systems-heading">Encounter the system before the case study.</h2>
          </div>
          <p>
            Each flagship has its own behavior. The shared language is traceability:
            a visible system path, real engineering artifacts and a direct route into
            the proof behind the story.
          </p>
        </div>

        <div className="system-records system-records-v2">
          {flagshipSystems.map((system) => {
            const evidence = homeEvidence[system.slug as keyof typeof homeEvidence] ?? [];

            return (
              <article className={`system-record system-encounter-record is-${system.slug}`} key={system.id}>
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

                  <div className={`system-artifact-stage artifact-${system.slug}`} aria-label={`${system.name} engineering artifact preview`}>
                    <div className="artifact-system-path">
                      {system.path.map((step, index) => (
                        <div key={step}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <strong>{step}</strong>
                          {index < system.path.length - 1 ? <i aria-hidden="true" /> : null}
                        </div>
                      ))}
                    </div>

                    <div className="artifact-evidence-ledger">
                      <p>INSPECTABLE ARTIFACTS</p>
                      {evidence.map((item) => (
                        <Link href={`/evidence/${item.slug}`} key={item.id}>
                          <span>{item.id}</span>
                          <strong>{item.title}</strong>
                          <small>{item.state.replace("_", " ")}</small>
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

      <section className="builder-bridge" aria-labelledby="builder-bridge-heading">
        <div>
          <p className="technical-label">BUILDER / HUMAN CONTEXT</p>
          <h2 id="builder-bridge-heading">The system has a builder behind it.</h2>
        </div>
        <div>
          <p>
            THE BUILD ROOM is intentionally technical, but not anonymous. The About
            surface steps away from HUD-like treatment and shows the person, working
            method and mechanical curiosity behind the systems.
          </p>
          <Link href="/about">Meet Eduardo <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="paper-stage paper-stage-v2" aria-labelledby="evidence-heading">
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
            Evidence is not a vanity counter. Decisions, source artifacts, tests,
            recovery behavior and limitations are first-class portfolio objects. The
            material changes from Carbon to Paper when the visitor opens the record.
          </p>
          <Link href="/evidence" className="paper-link">
            Open evidence library <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link href="/evidence/e-ap-06" className="evidence-sample evidence-sample-v2" aria-label="Open AutoPulse orphaned-session recovery evidence">
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
    </main>
  );
}
