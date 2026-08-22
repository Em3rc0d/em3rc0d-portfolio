import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { systems } from "@/content/systems";

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
    <main className="build-room-shell internal-page">
      <section className="carbon-stage internal-stage">
        <SiteHeader />
        <header className="internal-hero">
          <p className="technical-label">BUILD ROOM / SYSTEMS</p>
          <h1>Systems, not project tiles.</h1>
          <p>
            Flagships prove personal building and current R&amp;D. Supporting records add
            professional depth and end-to-end full-stack proof. A record is routed here
            only after its public claim and evidence boundary are ready.
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
                <Link href={system.href!}>Inspect →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
