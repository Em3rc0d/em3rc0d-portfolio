import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { systems } from "@/content/systems";

export const metadata = {
  title: "Systems",
};

export default function SystemsPage() {
  const publicSystems = systems.filter(
    (system) => system.publicability !== "PRIVATE" && system.role !== "RESERVED",
  );

  return (
    <main className="build-room-shell internal-page">
      <section className="carbon-stage internal-stage">
        <SiteHeader />
        <header className="internal-hero">
          <p className="technical-label">BUILD ROOM / SYSTEMS</p>
          <h1>Systems, not project tiles.</h1>
          <p>
            Work is organized by what each system proves: problem understanding,
            modeling, implementation, constraints, verification, and evidence.
          </p>
        </header>

        <div className="internal-system-list">
          {publicSystems.map((system) => (
            <article key={system.id}>
              <span className="internal-system-id">{system.id}</span>
              <div>
                <p className="technical-label">{system.label}</p>
                <h2>{system.name}</h2>
                <p>{system.summary}</p>
              </div>
              <div className="internal-system-status">
                <span>{system.role}</span>
                <span>{system.state.replace("_", " ")}</span>
                {system.href ? (
                  <Link href={system.href}>Inspect →</Link>
                ) : (
                  <span>Record pending</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
