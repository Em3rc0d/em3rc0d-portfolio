import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { absoluteSiteUrl } from "@/lib/site-config";
import "../visual-acceptance-v2b.css";

const description =
  "Start a conversation with Eduardo Merino about building custom software, recovering an existing product, improving a workflow, or adding applied AI.";
const canonicalUrl = absoluteSiteUrl("/contact");
const socialImage = absoluteSiteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "Contact — Build, Recover or Improve Software",
  description,
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Start a software conversation with Eduardo Merino",
    description,
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: "Eduardo Merino — THE BUILD ROOM",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a software conversation with Eduardo Merino",
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

const entryPaths = [
  ["01", "BUILD", "Turn an operational problem or product idea into a working software path."],
  ["02", "RECOVER", "Understand an existing product or codebase before deciding what should change."],
  ["03", "IMPROVE", "Make a fragmented or brittle workflow easier to operate, verify, and evolve."],
  ["04", "APPLIED AI", "Add AI without losing grounding, provenance, failure behavior, or human control."],
] as const;

const intakeQuestions = [
  ["01", "WHAT EXISTS NOW", "Product, codebase, manual workflow, prototype, documents, or nothing yet."],
  ["02", "WHAT IS MESSY", "What is failing, missing, duplicated, slow, uncertain, or difficult to operate?"],
  ["03", "WHO IS INVOLVED", "Who uses it, operates it, owns decisions, or receives the result?"],
  ["04", "WHAT CONSTRAINS IT", "Current systems, data, integrations, privacy, time, business rules, or technical limits."],
  ["05", "WHAT WORKING MEANS", "What should become possible, reliable, understandable, or easier afterward?"],
] as const;

export default function ContactPage() {
  return (
    <main className="contact-page contact-page-v2">
      <section className="contact-hero contact-hero-v2">
        <SiteHeader />
        <div className="contact-hero-grid">
          <div>
            <p className="public-kicker">CONTACT / START WITH THE PROBLEM</p>
            <h1>Have a system worth building, understanding, or improving?</h1>
          </div>
          <div className="contact-hero-copy">
            <p>Start with the situation, not a polished brief.</p>
            <span>
              A useful first conversation is usually about what exists, what is unclear,
              who depends on it, and what “working” should mean.
            </span>
            <a
              className="contact-primary-action"
              href="https://www.linkedin.com/in/emerinoc"
              target="_blank"
              rel="noreferrer"
            >
              Start a conversation on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      <section className="contact-briefing" aria-labelledby="contact-briefing-title">
        <header className="contact-briefing-heading">
          <div>
            <p className="public-kicker">FIRST CONVERSATION / BRIEFING</p>
            <h2 id="contact-briefing-title">You do not need to choose a service package.</h2>
          </div>
          <p>
            Pick the closest problem shape, then send whatever context you already have.
            Partial information is enough to begin understanding the operating reality.
          </p>
        </header>

        <div className="contact-briefing-grid">
          <div className="contact-problem-board" aria-label="Common problem shapes">
            {entryPaths.map(([id, title, detail]) => (
              <article key={id}>
                <span>{id}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>

          <div className="contact-context-ledger" aria-label="Useful first-message context">
            {intakeQuestions.map(([id, title, detail]) => (
              <div key={id}>
                <span>{id}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-channels contact-channels-v2" aria-labelledby="contact-channels-title">
        <div className="contact-channels-heading">
          <p className="public-kicker">TALK / INSPECT</p>
          <h2 id="contact-channels-title">Talk first. Inspect the work whenever you need to.</h2>
          <p>
            LinkedIn is the direct conversation route. GitHub is the public work route.
            The portfolio remains available when you want the system and evidence context first.
          </p>
        </div>

        <div className="contact-channel-board">
          <a href="https://www.linkedin.com/in/emerinoc" target="_blank" rel="noreferrer">
            <span>01 / CONVERSATION</span>
            <strong>LinkedIn</strong>
            <p>Share the situation and the context you already have.</p>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="https://github.com/Em3rc0d" target="_blank" rel="noreferrer">
            <span>02 / PUBLIC WORK</span>
            <strong>GitHub</strong>
            <p>Inspect repositories and public engineering artifacts.</p>
            <b aria-hidden="true">↗</b>
          </a>
        </div>

        <nav className="contact-secondary-routes" aria-label="Inspect more before contacting">
          <span>NEED MORE CONTEXT FIRST?</span>
          <div>
            <Link href="/systems">Systems →</Link>
            <Link href="/evidence">Evidence →</Link>
            <Link href="/about">About →</Link>
          </div>
        </nav>
      </section>
    </main>
  );
}
