import { SiteHeader } from "@/components/shell/site-header";

interface SectionFoundationProps {
  id: string;
  title: string;
  description: string;
  status: string;
  children?: React.ReactNode;
}

export function SectionFoundation({
  id,
  title,
  description,
  status,
  children,
}: SectionFoundationProps) {
  return (
    <main className="build-room-shell internal-page">
      <section className="carbon-stage internal-stage">
        <SiteHeader />
        <header className="internal-hero">
          <p className="technical-label">BUILD ROOM / {id}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <section className="foundation-status" aria-label="Build status">
          <span>{status}</span>
          <p>
            This route is intentionally wired during Foundation so navigation and
            information architecture are real before final visual composition.
          </p>
        </section>
        {children}
      </section>
    </main>
  );
}
