import Image from "next/image";
import {SiteHeader} from "@/components/shell/site-header";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

const copy = {
  en: {
    kicker: "ABOUT / BUILDER",
    hero: "Understand the system first.",
    role: "Software Developer — Systems, Full Stack & Applied AI",
    identity: "I turn messy operational problems into working software by moving from reality, to boundaries, to models, to buildable decisions and evidence.",
    portraitAlt: "Eduardo Merino, the builder behind THE BUILD ROOM",
    portraitKicker: "BUILDER / HUMAN CONTEXT",
    portraitTitle: "One person behind the systems.",
    portraitBody: "This is the human side of THE BUILD ROOM: the person responsible for understanding the problem, making the decisions and building the system.",
    methodKicker: "OPERATING SEQUENCE",
    methodTitle: "Ambiguity becomes manageable when the next boundary is explicit.",
    operating: [
      ["01", "UNDERSTAND", "What actually exists? Who uses it? Where does truth come from?"],
      ["02", "BOUND", "Separate responsibilities, ownership, source truth and desired state."],
      ["03", "MODEL", "Turn the operational situation into explicit domain and system objects."],
      ["04", "DECIDE", "Choose invariants, tradeoffs and what the next slice is responsible for proving."],
      ["05", "BUILD", "Implement the smallest coherent path that can be verified."],
      ["06", "VERIFY", "Use tests, browser proof, field evidence or provenance appropriate to the claim."],
    ],
    territoryKicker: "WORKING TERRITORY",
    territoryTitle: "I care about the path from operational reality to verifiable behavior.",
    territoryBody: "That usually crosses several layers at once. I do not need every project to be the same kind of product; I need the system boundaries to become understandable enough to build deliberately.",
    territories: [
      ["SYSTEMS", "Domain models, boundaries, state, ownership and integration paths."],
      ["FULL STACK", "Working product surfaces connected to real application/domain behavior."],
      ["STATE & RECOVERY", "Persistence, lifecycle, interruption, reconciliation and integrity."],
      ["APPLIED AI", "Grounding, provenance, controlled inference and decision-support workflows."],
      ["RECOVERY", "Understanding an existing system before deciding what should change."],
      ["EVIDENCE", "Making the proof and the limitation of a claim inspectable."],
    ],
    rulesKicker: "WORKING RULES",
    rulesTitle: "Things I would rather keep true than make look impressive.",
    rules: [
      "Recover before redesigning.",
      "Do not let desired state rewrite current state.",
      "Different kinds of truth should remain different objects.",
      "Build in slices with one responsibility and a visible gate.",
      "A successful build is not automatically a validated outcome.",
      "Expose what is unfinished when the boundary matters to the story.",
    ],
    mechanicalKicker: "PERSONAL NOTE / MECHANICAL CURIOSITY",
    mechanicalTitle: "Machines make systems visible.",
    mechanicalBody: "I like cars and mechanical systems for a simple reason: interacting components, constraints, failure modes, diagnostics and maintenance are physical. That curiosity is a small undertone in THE BUILD ROOM—not the theme of the portfolio. AutoPulse is where the two worlds naturally meet.",
    inspectAutoPulse: "Inspect AutoPulse →",
    routesAria: "Keep inspecting",
    routesTitle: "KEEP INSPECTING",
    systems: "Systems →",
    notebook: "Notebook →",
    contact: "Contact →",
  },
  es: {
    kicker: "ACERCA DE / BUILDER",
    hero: "Entiende el sistema primero.",
    role: "Desarrollador de Software — Sistemas, Full Stack e IA Aplicada",
    identity: "Convierto problemas operativos desordenados en software funcional pasando de la realidad a los límites, modelos, decisiones construibles y evidencia.",
    portraitAlt: "Eduardo Merino, el builder detrás de THE BUILD ROOM",
    portraitKicker: "BUILDER / CONTEXTO HUMANO",
    portraitTitle: "Una persona detrás de los sistemas.",
    portraitBody: "Este es el lado humano de THE BUILD ROOM: la persona responsable de entender el problema, tomar las decisiones y construir el sistema.",
    methodKicker: "SECUENCIA DE TRABAJO",
    methodTitle: "La ambigüedad se vuelve manejable cuando el siguiente límite es explícito.",
    operating: [
      ["01", "ENTENDER", "¿Qué existe realmente? ¿Quién lo usa? ¿De dónde viene la verdad?"],
      ["02", "DELIMITAR", "Separar responsabilidades, propiedad, fuente de verdad y estado deseado."],
      ["03", "MODELAR", "Convertir la situación operativa en objetos explícitos de dominio y sistema."],
      ["04", "DECIDIR", "Elegir invariantes, tradeoffs y qué debe demostrar el siguiente slice."],
      ["05", "CONSTRUIR", "Implementar la ruta coherente más pequeña que pueda verificarse."],
      ["06", "VERIFICAR", "Usar pruebas, navegador, evidencia de campo o procedencia según la afirmación."],
    ],
    territoryKicker: "TERRITORIO DE TRABAJO",
    territoryTitle: "Me importa la ruta desde la realidad operativa hasta un comportamiento verificable.",
    territoryBody: "Eso suele cruzar varias capas a la vez. No necesito que todos los proyectos sean el mismo tipo de producto; necesito que los límites del sistema sean lo bastante comprensibles para construir deliberadamente.",
    territories: [
      ["SISTEMAS", "Modelos de dominio, límites, estado, propiedad y rutas de integración."],
      ["FULL STACK", "Superficies de producto funcionales conectadas con comportamiento real de aplicación y dominio."],
      ["ESTADO Y RECUPERACIÓN", "Persistencia, ciclo de vida, interrupción, reconciliación e integridad."],
      ["IA APLICADA", "Grounding, procedencia, inferencia controlada y flujos de apoyo a decisiones."],
      ["RECUPERACIÓN", "Entender un sistema existente antes de decidir qué debería cambiar."],
      ["EVIDENCIA", "Hacer inspeccionables tanto la prueba como la limitación de una afirmación."],
    ],
    rulesKicker: "REGLAS DE TRABAJO",
    rulesTitle: "Cosas que prefiero mantener verdaderas antes que hacerlas parecer impresionantes.",
    rules: [
      "Recuperar antes de rediseñar.",
      "No dejar que el estado deseado reescriba el estado actual.",
      "Tipos distintos de verdad deben seguir siendo objetos distintos.",
      "Construir en slices con una responsabilidad y un gate visible.",
      "Un build exitoso no es automáticamente un resultado validado.",
      "Mostrar lo que falta cuando ese límite importa para la historia.",
    ],
    mechanicalKicker: "NOTA PERSONAL / CURIOSIDAD MECÁNICA",
    mechanicalTitle: "Las máquinas hacen visibles los sistemas.",
    mechanicalBody: "Me gustan los autos y los sistemas mecánicos por una razón simple: los componentes que interactúan, restricciones, modos de falla, diagnóstico y mantenimiento son físicos. Esa curiosidad es un matiz de THE BUILD ROOM, no el tema del portfolio. AutoPulse es donde ambos mundos se encuentran de forma natural.",
    inspectAutoPulse: "Inspeccionar AutoPulse →",
    routesAria: "Seguir inspeccionando",
    routesTitle: "SEGUIR INSPECCIONANDO",
    systems: "Sistemas →",
    notebook: "Cuaderno →",
    contact: "Contacto →",
  },
} as const;

export function AboutPageView({locale}: {locale: AppLocale}) {
  const text = copy[locale];

  return (
    <main className="about-page about-page-v2">
      <section className="about-hero">
        <SiteHeader />
        <div className="about-hero-grid about-hero-grid-v2">
          <div className="about-builder-copy">
            <div><p className="public-kicker">{text.kicker}</p><h1>{text.hero}</h1></div>
            <div className="about-identity"><p>Eduardo Merino</p><strong>{text.role}</strong><span>{text.identity}</span></div>
          </div>
          <figure className="about-builder-portrait">
            <Image src="/portrait/eduardo.webp" alt={text.portraitAlt} width={480} height={594} sizes="(max-width: 680px) 21rem, (max-width: 1100px) 30rem, 24rem" priority />
            <figcaption><span>{text.portraitKicker}</span><strong>{text.portraitTitle}</strong><p>{text.portraitBody}</p></figcaption>
          </figure>
        </div>
      </section>

      <section className="about-method" id="method">
        <header><p className="public-kicker">{text.methodKicker}</p><h2>{text.methodTitle}</h2></header>
        <div className="about-sequence">
          {text.operating.map(([id, title, detail]) => <div key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>)}
        </div>
      </section>

      <section className="about-territory">
        <div className="about-territory-intro"><p className="public-kicker">{text.territoryKicker}</p><h2>{text.territoryTitle}</h2><p>{text.territoryBody}</p></div>
        <div className="about-territory-ledger">
          {text.territories.map(([title, detail], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{detail}</p></div>)}
        </div>
      </section>

      <section className="about-rules">
        <div><p className="public-kicker">{text.rulesKicker}</p><h2>{text.rulesTitle}</h2></div>
        <ol>{text.rules.map((rule, index) => <li key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></li>)}</ol>
      </section>

      <section className="about-mechanical-note about-mechanical-note-v2">
        <div className="about-mechanical-mark" aria-hidden="true"><i /><i /><span>EM</span></div>
        <div className="about-mechanical-copy"><p className="public-kicker">{text.mechanicalKicker}</p><h2>{text.mechanicalTitle}</h2><p>{text.mechanicalBody}</p><Link href="/systems/autopulse">{text.inspectAutoPulse}</Link></div>
        <nav className="about-routes about-routes-inline" aria-label={text.routesAria}><span>{text.routesTitle}</span><div><Link href="/systems">{text.systems}</Link><Link href="/notes">{text.notebook}</Link><Link href="/contact">{text.contact}</Link></div></nav>
      </section>
    </main>
  );
}
