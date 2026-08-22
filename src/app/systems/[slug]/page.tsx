import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoPulseCase } from "@/components/systems/autopulse/autopulse-case";
import { CvEngineCase } from "@/components/systems/cv-engine/cv-engine-case";
import { SiteHeader } from "@/components/shell/site-header";
import { systems } from "@/content/systems";
import { absoluteSiteUrl } from "@/lib/site-config";

interface SystemPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return systems
    .filter((system) => system.href && system.publicability !== "PRIVATE")
    .map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find(
    (candidate) => candidate.slug === slug && candidate.publicability !== "PRIVATE",
  );

  if (!system) return {};

  const title = `${system.name} — ${system.label}`;
  const imageAlt = `${system.name} — Eduardo Merino software system case study`;
  const socialImage = absoluteSiteUrl("/opengraph-image");

  return {
    title,
    description: system.summary,
    alternates: {
      canonical: `/systems/${system.slug}`,
    },
    openGraph: {
      type: "article",
      siteName: "THE BUILD ROOM",
      title,
      description: system.summary,
      url: `/systems/${system.slug}`,
      ...(socialImage
        ? {
            images: [
              {
                url: socialImage,
                width: 1200,
                height: 630,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: system.summary,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { slug } = await params;
  const system = systems.find(
    (candidate) => candidate.slug === slug && candidate.publicability !== "PRIVATE",
  );

  if (!system || !system.href) {
    notFound();
  }

  if (system.slug === "autopulse") {
    return <AutoPulseCase />;
  }

  if (system.slug === "cv-engine") {
    return <CvEngineCase />;
  }

  return (
    <main className="build-room-shell internal-page">
      <section className="carbon-stage internal-stage case-foundation">
        <SiteHeader />
        <header className="case-foundation-cover">
          <div>
            <p className="technical-label">
              SYSTEM {system.id} / {system.label}
            </p>
            <h1>{system.name}</h1>
            <p className="case-summary">{system.summary}</p>
          </div>

          <dl>
            <div>
              <dt>ROLE</dt>
              <dd>{system.ownership}</dd>
            </div>
            <div>
              <dt>STATE</dt>
              <dd>{system.state.replace("_", " ")}</dd>
            </div>
            <div>
              <dt>PUBLICABILITY</dt>
              <dd>{system.publicability}</dd>
            </div>
          </dl>
        </header>

        <div className="case-path" aria-label={`${system.name} system path`}>
          {system.path.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>

        <section className="case-build-notice">
          <p className="technical-label">BUILD STATUS / CASE FOUNDATION</p>
          <p>
            This route is intentionally present before its full case composition is
            built. A dedicated system slice will replace this foundation when its
            evidence and public story contract are frozen.
          </p>
        </section>
      </section>
    </main>
  );
}
