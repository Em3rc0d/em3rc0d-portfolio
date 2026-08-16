import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { flagshipSystems } from "@/content/systems";

export default function Home() {
  return (
    <main className="build-room-shell">
      <div className="calibration-rail" aria-hidden="true">
        <span>00</span>
        <i />
        <span>100</span>
      </div>

      <section className="carbon-stage hero-stage" aria-labelledby="hero-title">
        <SiteHeader />

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="technical-label">SYSTEM / PORTFOLIO / 001</p>
            <h1 id="hero-title">
              I turn messy
              <span>operational problems</span>
              into working software.
            </h1>
            <p className="hero-role">
              Software Developer — Systems, Full Stack &amp; Applied AI
            </p>

            <div className="hero-actions">
              <Link className="action action-primary" href="/systems">
                Explore systems <span aria-hidden="true">↗</span>
              </Link>
              <Link className="action action-secondary" href="/contact">
                Start a conversation
              </Link>
            </div>
          </div>

          <div className="hero-system-map" aria-label="Engineering process">
            <p className="technical-label">PROCESS / HOW I BUILD</p>
            <ol>
              {[
                ["01", "Understand", "Find the actual problem."],
                ["02", "Model", "Make boundaries and state visible."],
                ["03", "Build", "Turn decisions into working software."],
                ["04", "Verify", "Make claims inspectable."],
              ].map(([id, title, copy]) => (
                <li key={id}>
                  <span className="process-id">{id}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="startup-remnant" aria-hidden="true">
          <span>IDENTITY</span>
          <span>SYSTEMS</span>
          <span>EVIDENCE</span>
          <span>INTERFACE</span>
          <div className="startup-line" />
          <span className="startup-state">SYSTEM READY</span>
        </div>
      </section>

      <section className="systems-runway" aria-labelledby="systems-heading">
        <div className="section-heading-row">
          <div>
            <p className="technical-label">SELECTED SYSTEMS / 02</p>
            <h2 id="systems-heading">Systems you can inspect.</h2>
          </div>
          <p>
            Not a gallery of screenshots. Each flagship opens into problem,
            architecture, implementation, verification, and evidence.
          </p>
        </div>

        <div className="system-records">
          {flagshipSystems.map((system) => (
            <article className="system-record" key={system.id}>
              <div className="system-record-index">
                <span>{system.id}</span>
                <span>{system.label}</span>
              </div>

              <div className="system-record-main">
                <h3>{system.name}</h3>
                <p>{system.summary}</p>

                <div className="system-path" aria-label={`${system.name} system path`}>
                  {system.path.map((step, index) => (
                    <span key={step}>
                      {step}
                      {index < system.path.length - 1 ? (
                        <i aria-hidden="true" />
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>

              <div className="system-record-meta">
                <dl>
                  <div>
                    <dt>ROLE</dt>
                    <dd>{system.ownership}</dd>
                  </div>
                  <div>
                    <dt>STATE</dt>
                    <dd>{system.state.replace("_", " ")}</dd>
                  </div>
                </dl>

                {system.href ? (
                  <Link href={system.href} className="inspect-link">
                    Inspect system <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="paper-stage" aria-labelledby="evidence-heading">
        <div className="paper-registration" aria-hidden="true">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
        <div className="paper-copy">
          <p className="technical-label ink-label">INSPECTION / EVIDENCE</p>
          <h2 id="evidence-heading">Claims should be inspectable.</h2>
          <p>
            Decisions, architecture, tests, product artifacts, and field evidence
            are treated as first-class portfolio objects — with their limits made
            explicit.
          </p>
          <Link href="/evidence" className="paper-link">
            Open evidence library <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="evidence-sample" aria-label="Example evidence record">
          <span className="evidence-id">E-08</span>
          <dl>
            <div>
              <dt>TYPE</dt>
              <dd>Verification artifact</dd>
            </div>
            <div>
              <dt>STATE</dt>
              <dd>Evidence-gated</dd>
            </div>
            <div>
              <dt>RULE</dt>
              <dd>Confidence never exceeds proof.</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
