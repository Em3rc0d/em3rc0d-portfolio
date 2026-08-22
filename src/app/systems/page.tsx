import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { systems } from "@/content/systems";
import "../visual-acceptance-v2.css";

export const metadata = {
  title: "Systems",
  description:
    "Inspectable software systems built by Eduardo Merino across personal building, professional infrastructure work, full-stack delivery, and current R&D.",
};

export default function SystemsPage() {
  const publicSystems = systems.filter(
    (system) =>
      system.publicability !== "PRIVATE" &&
      system.role !== "RESERVED" &&
      Boolean(system.href),
  );

  return (
    <main className="build-room-shell systems-room-page">
      <section className="carbon-stage systems-room-frame narrative-frame" aria-labelledby="systems-room-title">
        <SiteHeader />

        <div className="systems-room-shell">
          <header className="systems-room-intro">
            <div>
              <p className="technical-label">BUILD ROOM / SYSTEMS</p>
              <h1 id="systems-room-title">Systems, not project tiles.</h1>
            </div>
            <div className="systems-room-intro-copy">
              <p>
                Four records. Four different engineering contexts. Inspect the system model,
                the responsibility I owned, and the evidence boundary behind each claim.
              </p>
              <div className="systems-room-legend" aria-label="System record roles">
                <span><i /> FLAGSHIP / PERSONAL + R&amp;D</span>
                <span><i /> PROFESSIONAL / ABSTRACTED</span>
                <span><i /> FULL-STACK / SUPPORT</span>
              </div>
            </div>
          </header>

          <div className="systems-room-grid">
            {publicSystems.map((system) => (
              <Link
                key={system.id}
                href={system.href!}
                className={`systems-room-card systems-room-card-${system.slug}`}
                aria-label={`Inspect ${system.name}`}
              >
                <div className="systems-room-card-topline">
                  <span>{system.id}</span>
                  <span>{system.label}</span>
                  <span>{system.role}</span>
                </div>

                <div className="systems-room-card-main">
                  <h2>{system.name}</h2>
                  <p>{system.summary}</p>
                </div>

                <div className="systems-room-path" aria-label={`${system.name} system path`}>
                  {system.path.map((step, index) => (
                    <span key={step} data-id={String(index + 1).padStart(2, "0")}>{step}</span>
                  ))}
                </div>

                <footer>
                  <span>{system.state.replaceAll("_", " ")}</span>
                  <span>{system.publicability}</span>
                  <strong>Inspect system ↗</strong>
                </footer>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
