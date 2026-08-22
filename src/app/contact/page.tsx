import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";

const description =
  "Start a conversation with Eduardo Merino about building custom software, recovering an existing product, improving a workflow, or adding applied AI.";

export const metadata: Metadata = {
  title: "Contact — Build, Recover or Improve Software",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Start a software conversation with Eduardo Merino",
    description,
    url: "/contact",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Eduardo Merino — THE BUILD ROOM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a software conversation with Eduardo Merino",
    description,
    images: ["/opengraph-image"],
  },
};

const entryPaths = [
  ["01", "BUILD", "I need a working software system from an operational problem."],
  ["02", "RECOVER", "I have an existing product or codebase and need to understand what is really there."],
  ["03", "IMPROVE", "A workflow works, but it is fragmented, brittle, difficult to operate, or hard to evolve."],
  ["04", "APPLIED AI", "I need AI inside a product without losing grounding, provenance, or control."],
] as const;

const intakeQuestions = [
  ["01", "WHAT EXISTS NOW", "Product, codebase, manual workflow, prototype, documents, or nothing yet."],
  ["02", "WHAT IS MESSY", "What is failing, missing, duplicated, slow, uncertain, or difficult to operate?"],
  ["03", "WHO IS INVOLVED", "Who uses it, operates it, owns decisions, or receives the result?"],
  ["04", "WHAT CONSTRAINS IT", "Time, current systems, data, integrations, privacy, business rules, or technical limits."],
  ["05", "WHAT WORKING MEANS", "What should become possible, reliable, understandable, or easier after the work?"],
] as const;

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <SiteHeader />
        <div className="contact-hero-grid">
          <div>
            <p className="public-kicker">CONTACT / START WITH THE PROBLEM</p>
            <h1>Have a system worth building, understanding, or improving?</h1>
          </div>
          <div className="contact-hero-copy">
            <p>Start with the situation, not a polished brief.</p>
            <span>
              A useful first conversation is usually about what exists, what is
              unclear, who depends on it, and what “working” should mean.
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

      <section className="contact-entry-paths">
        <header>
          <p className="public-kicker">WHAT KIND OF PROBLEM IS IT?</p>
          <h2>You do not need to choose a service package.</h2>
          <p>These are useful ways to frame the system before we talk.</p>
        </header>
        <div className="contact-path-grid">
          {entryPaths.map(([id, title, detail]) => (
            <article key={id}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-intake">
        <div className="contact-intake-copy">
          <p className="public-kicker">FIRST MESSAGE / USEFUL CONTEXT</p>
          <h2>Five things that help me understand the problem quickly.</h2>
          <p>
            Partial answers are fine. The goal is to expose the operating reality
            before deciding what the software should become.
          </p>
        </div>
        <div className="contact-intake-ledger">
          {intakeQuestions.map(([id, title, detail]) => (
            <div key={id}>
              <span>{id}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-channels">
        <div>
          <p className="public-kicker">PUBLIC CHANNELS</p>
          <h2>Talk first. Inspect the work whenever you need to.</h2>
          <p>
            LinkedIn is the direct conversation route. GitHub is the public work
            route when you want to inspect repositories and engineering artifacts.
          </p>
        </div>
        <div className="contact-channel-list">
          <a href="https://www.linkedin.com/in/emerinoc" target="_blank" rel="noreferrer">
            <span>01 / CONVERSATION</span>
            <strong>LinkedIn</strong>
            <p>Share the situation and useful context.</p>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="https://github.com/Em3rc0d" target="_blank" rel="noreferrer">
            <span>02 / PUBLIC WORK</span>
            <strong>GitHub</strong>
            <p>Inspect repositories and public artifacts.</p>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section className="contact-exit">
        <p className="public-kicker">NEED MORE CONTEXT FIRST?</p>
        <div>
          <Link href="/systems">Inspect systems →</Link>
          <Link href="/evidence">Inspect evidence →</Link>
          <Link href="/about">About the builder →</Link>
        </div>
      </section>
    </main>
  );
}
