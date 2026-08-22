import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import "./visual-acceptance.css";

export const metadata = {
  title: "About",
  description:
    "About Eduardo Merino — Software Developer working across systems, full stack products, and applied AI with an evidence-first engineering process.",
};

const operatingSequence = [
  ["01", "UNDERSTAND", "What actually exists? Who uses it? Where does truth come from?"],
  ["02", "BOUND", "Separate responsibilities, ownership, source truth and desired state."],
  ["03", "MODEL", "Turn the operational situation into explicit domain and system objects."],
  ["04", "DECIDE", "Choose invariants, tradeoffs and what the next slice is responsible for proving."],
  ["05", "BUILD", "Implement the smallest coherent path that can be verified."],
  ["06", "VERIFY", "Use tests, browser proof, field evidence or provenance appropriate to the claim."],
] as const;

const territories = [
  ["SYSTEMS", "Domain models, boundaries, state, ownership and integration paths."],
  ["FULL STACK", "Working product surfaces connected to real application/domain behavior."],
  ["STATE & RECOVERY", "Persistence, lifecycle, interruption, reconciliation and integrity."],
  ["APPLIED AI", "Grounding, provenance, controlled inference and decision-support workflows."],
  ["RECOVERY", "Understanding an existing system before deciding what should change."],
  ["EVIDENCE", "Making the proof and the limitation of a claim inspectable."],
] as const;

const workingRules = [
  "Recover before redesigning.",
  "Do not let desired state rewrite current state.",
  "Different kinds of truth should remain different objects.",
  "Build in slices with one responsibility and a visible gate.",
  "A successful build is not automatically a validated outcome.",
  "Expose what is unfinished when the boundary matters to the story.",
] as const;

export default function AboutPage() {
  return (
    <main className="about-page about-page-v2">
      <section className="about-hero">
        <SiteHeader />
        <div className="about-hero-grid about-hero-grid-v2">
          <div className="about-builder-copy">
            <div>
              <p className="public-kicker">ABOUT / BUILDER</p>
              <h1>Understand the system first.</h1>
            </div>

            <div className="about-identity">
              <p>Eduardo Merino</p>
              <strong>Software Developer — Systems, Full Stack &amp; Applied AI</strong>
              <span>
                I turn messy operational problems into working software by moving from
                reality, to boundaries, to models, to buildable decisions and evidence.
              </span>
            </div>
          </div>

          <figure className="about-builder-portrait">
            <Image
              src="/portrait/eduardo.webp"
              alt="Eduardo Merino, the builder behind THE BUILD ROOM"
              width={480}
              height={594}
              sizes="(max-width: 680px) 84vw, (max-width: 1100px) 70vw, 38vw"
              quality={65}
              priority
            />
            <figcaption>
              <span>BUILDER / HUMAN CONTEXT</span>
              <strong>One person behind the systems.</strong>
              <p>
                This is the human side of THE BUILD ROOM: the person responsible for
                understanding the problem, making the decisions and building the system.
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="about-method" id="method">
        <header>
          <p className="public-kicker">OPERATING SEQUENCE</p>
          <h2>Ambiguity becomes manageable when the next boundary is explicit.</h2>
        </header>
        <div className="about-sequence">
          {operatingSequence.map(([id, title, detail]) => (
            <div key={id}>
              <span>{id}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-territory">
        <div className="about-territory-intro">
          <p className="public-kicker">WORKING TERRITORY</p>
          <h2>I care about the path from operational reality to verifiable behavior.</h2>
          <p>
            That usually crosses several layers at once. I do not need every project
            to be the same kind of product; I need the system boundaries to become
            understandable enough to build deliberately.
          </p>
        </div>
        <div className="about-territory-ledger">
          {territories.map(([title, detail], index) => (
            <div key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-rules">
        <div>
          <p className="public-kicker">WORKING RULES</p>
          <h2>Things I would rather keep true than make look impressive.</h2>
        </div>
        <ol>
          {workingRules.map((rule, index) => (
            <li key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></li>
          ))}
        </ol>
      </section>

      <section className="about-mechanical-note about-mechanical-note-v2">
        <div className="about-mechanical-mark" aria-hidden="true">
          <i /><i /><span>EM</span>
        </div>
        <div className="about-mechanical-copy">
          <p className="public-kicker">PERSONAL NOTE / MECHANICAL CURIOSITY</p>
          <h2>Machines make systems visible.</h2>
          <p>
            I like cars and mechanical systems for a simple reason: interacting
            components, constraints, failure modes, diagnostics and maintenance are
            physical. That curiosity is a small undertone in THE BUILD ROOM—not the
            theme of the portfolio. AutoPulse is where the two worlds naturally meet.
          </p>
          <Link href="/systems/autopulse">Inspect AutoPulse →</Link>
        </div>

        <nav className="about-routes about-routes-inline" aria-label="Keep inspecting">
          <span>KEEP INSPECTING</span>
          <div>
            <Link href="/systems">Systems →</Link>
            <Link href="/notes">Notebook →</Link>
            <Link href="/contact">Contact →</Link>
          </div>
        </nav>
      </section>
    </main>
  );
}
