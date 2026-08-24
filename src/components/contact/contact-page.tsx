import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { localizedHref, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    heroKicker: "CONTACT / START WITH THE PROBLEM",
    heroTitle: "Have a system worth building, understanding, or improving?",
    heroLead: "Start with the situation, not a polished brief.",
    heroBody: "A useful first conversation is usually about what exists, what is unclear, who depends on it, and what “working” should mean.",
    linkedinCta: "Start a conversation on LinkedIn →",
    briefingKicker: "FIRST CONVERSATION / BRIEFING",
    briefingTitle: "You do not need to choose a service package.",
    briefingBody: "Pick the closest problem shape, then send whatever context you already have. Partial information is enough to begin understanding the operating reality.",
    entryAria: "Common problem shapes",
    entries: [
      ["01", "BUILD", "Turn an operational problem or product idea into a working software path."],
      ["02", "RECOVER", "Understand an existing product or codebase before deciding what should change."],
      ["03", "IMPROVE", "Make a fragmented or brittle workflow easier to operate, verify, and evolve."],
      ["04", "APPLIED AI", "Add AI without losing grounding, provenance, failure behavior, or human control."],
    ],
    contextAria: "Useful first-message context",
    questions: [
      ["01", "WHAT EXISTS NOW", "Product, codebase, manual workflow, prototype, documents, or nothing yet."],
      ["02", "WHAT IS MESSY", "What is failing, missing, duplicated, slow, uncertain, or difficult to operate?"],
      ["03", "WHO IS INVOLVED", "Who uses it, operates it, owns decisions, or receives the result?"],
      ["04", "WHAT CONSTRAINS IT", "Current systems, data, integrations, privacy, time, business rules, or technical limits."],
      ["05", "WHAT WORKING MEANS", "What should become possible, reliable, understandable, or easier afterward?"],
    ],
    channelsKicker: "TALK / INSPECT",
    channelsTitle: "Talk first. Inspect the work whenever you need to.",
    channelsBody: "LinkedIn is the direct conversation route. GitHub is the public work route. The portfolio remains available when you want the system and evidence context first.",
    conversation: "01 / CONVERSATION",
    conversationBody: "Share the situation and the context you already have.",
    work: "02 / PUBLIC WORK",
    workBody: "Inspect repositories and public engineering artifacts.",
    moreAria: "Inspect more before contacting",
    more: "NEED MORE CONTEXT FIRST?",
    systems: "Systems →",
    evidence: "Evidence →",
    about: "About →",
  },
  es: {
    heroKicker: "CONTACTO / EMPIEZA POR EL PROBLEMA",
    heroTitle: "¿Tienes un sistema que valga la pena construir, entender o mejorar?",
    heroLead: "Empieza por la situación, no por un brief pulido.",
    heroBody: "Una primera conversación útil suele tratar de qué existe, qué no está claro, quién depende de ello y qué debería significar que “funcione”.",
    linkedinCta: "Iniciar una conversación en LinkedIn →",
    briefingKicker: "PRIMERA CONVERSACIÓN / BRIEFING",
    briefingTitle: "No necesitas elegir un paquete de servicios.",
    briefingBody: "Elige la forma de problema más cercana y envía el contexto que ya tengas. La información parcial es suficiente para empezar a entender la realidad operativa.",
    entryAria: "Formas comunes de problema",
    entries: [
      ["01", "CONSTRUIR", "Convertir un problema operativo o una idea de producto en una ruta de software funcional."],
      ["02", "RECUPERAR", "Entender un producto o código existente antes de decidir qué debería cambiar."],
      ["03", "MEJORAR", "Hacer que un flujo fragmentado o frágil sea más fácil de operar, verificar y evolucionar."],
      ["04", "IA APLICADA", "Añadir IA sin perder grounding, procedencia, comportamiento ante fallas ni control humano."],
    ],
    contextAria: "Contexto útil para el primer mensaje",
    questions: [
      ["01", "QUÉ EXISTE AHORA", "Producto, base de código, flujo manual, prototipo, documentos o todavía nada."],
      ["02", "QUÉ ESTÁ DESORDENADO", "¿Qué falla, falta, se duplica, es lento, incierto o difícil de operar?"],
      ["03", "QUIÉN PARTICIPA", "¿Quién lo usa, lo opera, toma decisiones o recibe el resultado?"],
      ["04", "QUÉ LO RESTRINGE", "Sistemas actuales, datos, integraciones, privacidad, tiempo, reglas de negocio o límites técnicos."],
      ["05", "QUÉ SIGNIFICA FUNCIONAR", "¿Qué debería volverse posible, confiable, comprensible o más fácil después?"],
    ],
    channelsKicker: "HABLAR / INSPECCIONAR",
    channelsTitle: "Hablemos primero. Inspecciona el trabajo cuando lo necesites.",
    channelsBody: "LinkedIn es la ruta directa de conversación. GitHub es la ruta pública del trabajo. El portfolio sigue disponible cuando quieras revisar primero el sistema y su evidencia.",
    conversation: "01 / CONVERSACIÓN",
    conversationBody: "Comparte la situación y el contexto que ya tengas.",
    work: "02 / TRABAJO PÚBLICO",
    workBody: "Inspecciona repositorios y artefactos públicos de ingeniería.",
    moreAria: "Inspeccionar más antes de contactar",
    more: "¿NECESITAS MÁS CONTEXTO PRIMERO?",
    systems: "Sistemas →",
    evidence: "Evidencia →",
    about: "Acerca de →",
  },
} as const;

export function ContactPageView({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <main className="contact-page contact-page-v2">
      <section className="contact-hero contact-hero-v2">
        <SiteHeader />
        <div className="contact-hero-grid">
          <div><p className="public-kicker">{text.heroKicker}</p><h1>{text.heroTitle}</h1></div>
          <div className="contact-hero-copy">
            <p>{text.heroLead}</p><span>{text.heroBody}</span>
            <a className="contact-primary-action" href="https://www.linkedin.com/in/emerinoc" target="_blank" rel="noreferrer">{text.linkedinCta}</a>
          </div>
        </div>
      </section>

      <section className="contact-briefing" aria-labelledby="contact-briefing-title">
        <header className="contact-briefing-heading">
          <div><p className="public-kicker">{text.briefingKicker}</p><h2 id="contact-briefing-title">{text.briefingTitle}</h2></div>
          <p>{text.briefingBody}</p>
        </header>
        <div className="contact-briefing-grid">
          <div className="contact-problem-board" aria-label={text.entryAria}>
            {text.entries.map(([id, title, detail]) => <article key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className="contact-context-ledger" aria-label={text.contextAria}>
            {text.questions.map(([id, title, detail]) => <div key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>)}
          </div>
        </div>
      </section>

      <section className="contact-channels contact-channels-v2" aria-labelledby="contact-channels-title">
        <div className="contact-channels-heading"><p className="public-kicker">{text.channelsKicker}</p><h2 id="contact-channels-title">{text.channelsTitle}</h2><p>{text.channelsBody}</p></div>
        <div className="contact-channel-board">
          <a href="https://www.linkedin.com/in/emerinoc" target="_blank" rel="noreferrer"><span>{text.conversation}</span><strong>LinkedIn</strong><p>{text.conversationBody}</p><b aria-hidden="true">↗</b></a>
          <a href="https://github.com/Em3rc0d" target="_blank" rel="noreferrer"><span>{text.work}</span><strong>GitHub</strong><p>{text.workBody}</p><b aria-hidden="true">↗</b></a>
        </div>
        <nav className="contact-secondary-routes" aria-label={text.moreAria}><span>{text.more}</span><div><Link href={localizedHref("/systems", locale)}>{text.systems}</Link><Link href={localizedHref("/evidence", locale)}>{text.evidence}</Link><Link href={localizedHref("/about", locale)}>{text.about}</Link></div></nav>
      </section>
    </main>
  );
}
