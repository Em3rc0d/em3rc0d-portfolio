/* eslint-disable @next/next/no-img-element -- flagship captures are hosted in public project/evidence sources */
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { systemCases } from "@/content/systems";
import { localePath, type Locale } from "@/i18n/config";

type Principle = { code: string; body: string };
type Pipeline = { input: string; system: string; output: string; label: string };

const copy: Record<Locale, {
  eyebrow: string; titleA: string; titleB: string; lead: string;
  viewProjects: string; download: string; contact: string;
  projects: string; projectsTitle: string; projectsLead: string; openProject: string;
  principles: string; principlesTitle: string; principlesLead: string; principlesList: readonly Principle[];
  more: string; moreTitle: string; moreLead: string;
  about: string; aboutTitle: string; aboutText: string;
  current: string; education: string; finalCta: string; finalText: string;
  legendField: string; legendSystem: string; legendProduct: string;
}> = {
  en: {
    eyebrow: "Software Engineer · Full Stack · Applied AI · Lima, Peru",
    titleA: "I build systems",
    titleB: "for messy real-world problems.",
    lead: "From vehicle data and acoustic signals to payments, automation and AI — I turn uncertain inputs into software people can actually use.",
    viewProjects: "Explore the work", download: "Download CV", contact: "Contact me",
    projects: "Selected work", projectsTitle: "Field. System. Product.", projectsLead: "The projects are different. The engineering responsibility is not: understand the signal, preserve what is true, and build a useful outcome.",
    openProject: "View project",
    principles: "Engineering principles", principlesTitle: "A few things I refuse to blur.", principlesLead: "The systems change. These boundaries keep showing up in the work.",
    principlesList: [
      { code: "MISSING ≠ ZERO", body: "Absence is information. Do not turn it into a measurement." },
      { code: "PAYMENT ≠ REPORT GENERATED", body: "A successful transaction is not the same state as a successful product outcome." },
      { code: "MODEL SCORE ≠ REAL-WORLD EVENT", body: "Inference is evidence, not permission to invent a story." },
      { code: "IMPLEMENTED ≠ PROVEN", body: "Code can exist before the field evidence needed to trust a claim." },
    ],
    more: "Deeper systems", moreTitle: "More work behind the surface.", moreLead: "Advanced systems, experiments and professional engineering work remain available when you want the deeper picture.",
    about: "About me", aboutTitle: "I like software that has to deal with reality.",
    aboutText: "Vehicles disconnect. Data sources disagree. AI models are uncertain. Payments can fail halfway through. People change their minds. I like building the systems that still have to work.",
    current: "Full Stack Developer at Thradex Tech", education: "Systems & Informatics Engineering at UNMSM · final stage",
    finalCta: "Bring me the messy part.", finalText: "A role, a product, a workflow, a system that keeps breaking at the edges — send me the context and we can start there.",
    legendField: "Reality / signal", legendSystem: "Engineering / decisions", legendProduct: "Useful / outcome",
  },
  es: {
    eyebrow: "Software Engineer · Full Stack · IA aplicada · Lima, Perú",
    titleA: "Construyo sistemas",
    titleB: "para problemas reales y desordenados.",
    lead: "Desde datos vehiculares y señales acústicas hasta pagos, automatización e IA — convierto entradas inciertas en software que la gente puede usar de verdad.",
    viewProjects: "Explorar el trabajo", download: "Descargar CV", contact: "Contactarme",
    projects: "Trabajo destacado", projectsTitle: "Campo. Sistema. Producto.", projectsLead: "Los proyectos son distintos. La responsabilidad de ingeniería no: entender la señal, preservar lo verdadero y construir un resultado útil.",
    openProject: "Ver proyecto",
    principles: "Principios de ingeniería", principlesTitle: "Hay cosas que no mezclo.", principlesLead: "Los sistemas cambian. Estos límites aparecen una y otra vez en el trabajo.",
    principlesList: [
      { code: "AUSENTE ≠ CERO", body: "La ausencia también es información. No debe convertirse en una medición." },
      { code: "PAGO ≠ REPORTE GENERADO", body: "Una transacción exitosa no es el mismo estado que un resultado de producto exitoso." },
      { code: "SCORE DEL MODELO ≠ EVENTO REAL", body: "La inferencia es evidencia; no es permiso para inventar una historia." },
      { code: "IMPLEMENTADO ≠ DEMOSTRADO", body: "El código puede existir antes de la evidencia de campo necesaria para confiar en una afirmación." },
    ],
    more: "Sistemas más profundos", moreTitle: "Hay más trabajo detrás.", moreLead: "Sistemas avanzados, experimentos y trabajo profesional siguen disponibles cuando quieres ver la capa más profunda.",
    about: "Sobre mí", aboutTitle: "Me gusta el software que tiene que enfrentarse a la realidad.",
    aboutText: "Los vehículos se desconectan. Las fuentes discrepan. Los modelos de IA son inciertos. Los pagos pueden fallar a mitad del camino. Las personas cambian de opinión. Me gusta construir los sistemas que aun así tienen que funcionar.",
    current: "Full Stack Developer en Thradex Tech", education: "Ingeniería de Sistemas e Informática en UNMSM · etapa final",
    finalCta: "Tráeme la parte complicada.", finalText: "Una oportunidad, un producto, un flujo o un sistema que se rompe en los bordes — cuéntame el contexto y empezamos desde ahí.",
    legendField: "Realidad / señal", legendSystem: "Ingeniería / decisiones", legendProduct: "Producto / resultado",
  },
  pt: {
    eyebrow: "Software Engineer · Full Stack · IA aplicada · Lima, Peru",
    titleA: "Eu construo sistemas",
    titleB: "para problemas reais e bagunçados.",
    lead: "De dados veiculares e sinais acústicos a pagamentos, automação e IA — transformo entradas incertas em software que as pessoas realmente conseguem usar.",
    viewProjects: "Explorar o trabalho", download: "Baixar CV", contact: "Entrar em contato",
    projects: "Trabalho em destaque", projectsTitle: "Campo. Sistema. Produto.", projectsLead: "Os projetos são diferentes. A responsabilidade de engenharia não: entender o sinal, preservar a verdade e construir um resultado útil.",
    openProject: "Ver projeto",
    principles: "Princípios de engenharia", principlesTitle: "Há coisas que eu não misturo.", principlesLead: "Os sistemas mudam. Estes limites continuam aparecendo no trabalho.",
    principlesList: [
      { code: "AUSENTE ≠ ZERO", body: "Ausência também é informação. Não deve virar uma medição." },
      { code: "PAGAMENTO ≠ RELATÓRIO GERADO", body: "Uma transação bem-sucedida não é o mesmo estado que um resultado de produto bem-sucedido." },
      { code: "SCORE DO MODELO ≠ EVENTO REAL", body: "Inferência é evidência, não permissão para inventar uma história." },
      { code: "IMPLEMENTADO ≠ PROVADO", body: "O código pode existir antes da evidência de campo necessária para sustentar uma afirmação." },
    ],
    more: "Sistemas mais profundos", moreTitle: "Há mais trabalho por trás.", moreLead: "Sistemas avançados, experimentos e trabalho profissional continuam disponíveis quando você quiser a camada mais profunda.",
    about: "Sobre mim", aboutTitle: "Gosto de software que precisa lidar com a realidade.",
    aboutText: "Veículos desconectam. Fontes discordam. Modelos de IA são incertos. Pagamentos podem falhar no meio do caminho. Pessoas mudam de ideia. Gosto de construir os sistemas que ainda assim precisam funcionar.",
    current: "Full Stack Developer na Thradex Tech", education: "Engenharia de Sistemas e Informática na UNMSM · etapa final",
    finalCta: "Traga a parte complicada.", finalText: "Uma vaga, um produto, um fluxo ou um sistema que quebra nas bordas — envie o contexto e podemos começar por aí.",
    legendField: "Realidade / sinal", legendSystem: "Engenharia / decisões", legendProduct: "Produto / resultado",
  },
};

const projectCopy: Record<Locale, Record<string, string>> = {
  en: {
    placaclara: "A live used-car research product for Peru: vehicle evidence, payments, reports and delivery in one customer path.",
    autopulse: "Android vehicle intelligence that reads physical OBD-II signals, records durable sessions and keeps missing data honest.",
    echo: "Acoustic-event AI that turns environmental audio into governed, time-aware events through a reproducible runtime path.",
  },
  es: {
    placaclara: "Un producto real para investigar autos usados en Perú: evidencia vehicular, pagos, reportes y entrega en un solo recorrido.",
    autopulse: "Inteligencia vehicular Android que lee señales OBD-II físicas, registra sesiones durables y trata los datos ausentes con honestidad.",
    echo: "IA de eventos acústicos que convierte audio ambiental en eventos gobernados y temporales mediante un runtime reproducible.",
  },
  pt: {
    placaclara: "Um produto real para pesquisar carros usados no Peru: evidência veicular, pagamentos, relatórios e entrega em um único caminho.",
    autopulse: "Inteligência veicular Android que lê sinais OBD-II físicos, registra sessões duráveis e trata dados ausentes com honestidade.",
    echo: "IA de eventos acústicos que transforma áudio ambiental em eventos governados e temporais por meio de um runtime reproduzível.",
  },
};

const pipelines: Record<Locale, Record<string, Pipeline>> = {
  en: {
    placaclara: { label: "01 / PRODUCT IN THE WILD", input: "Vehicle plate", system: "Evidence + payment", output: "Buyer report" },
    autopulse: { label: "02 / CONNECTED SYSTEM", input: "Vehicle ECU", system: "OBD-II + local data", output: "Driving intelligence" },
    echo: { label: "03 / APPLIED AI", input: "Environmental audio", system: "AI event engine", output: "Acoustic events" },
  },
  es: {
    placaclara: { label: "01 / PRODUCTO EN USO", input: "Placa vehicular", system: "Evidencia + pago", output: "Reporte comprador" },
    autopulse: { label: "02 / SISTEMA CONECTADO", input: "ECU del vehículo", system: "OBD-II + datos locales", output: "Inteligencia de manejo" },
    echo: { label: "03 / IA APLICADA", input: "Audio ambiental", system: "Motor de eventos IA", output: "Eventos acústicos" },
  },
  pt: {
    placaclara: { label: "01 / PRODUTO EM USO", input: "Placa veicular", system: "Evidência + pagamento", output: "Relatório do comprador" },
    autopulse: { label: "02 / SISTEMA CONECTADO", input: "ECU do veículo", system: "OBD-II + dados locais", output: "Inteligência de condução" },
    echo: { label: "03 / IA APLICADA", input: "Áudio ambiental", system: "Motor de eventos IA", output: "Eventos acústicos" },
  },
};

function EchoVisual() {
  return <div className="echo-system-visual" aria-hidden="true">
    <div className="echo-visual-meta"><span>RAW AUDIO</span><span>EVENT ENGINE</span><span>MQTT</span></div>
    <div className="echo-wave">
      {[18,38,65,34,82,52,94,43,71,26,58,88,47,76,32,62,90,45,70,24,54,80,42,66].map((height,index)=>
        <span key={index} style={{height:`${height}%`}}/>
      )}
    </div>
    <div className="echo-event-track">
      <span>RAW_INFERENCE</span><i>→</i><span>CANDIDATE</span><i>→</i><strong>CONFIRMED_EVENT</strong>
    </div>
  </div>;
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = systemCases.filter((system) => system.placement === "FLAGSHIP");
  const more = systemCases.filter((system) => system.placement !== "FLAGSHIP");

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="simple-hero system-theme-hero container">
      <div className="hero-coordinate hero-coordinate-a" aria-hidden="true">EM / 2026</div>
      <div className="hero-coordinate hero-coordinate-b" aria-hidden="true">LIM / PE</div>
      <div className="simple-hero-copy">
        <p className="eyebrow accent">{t.eyebrow}</p>
        <h1><span>{t.titleA}</span><em>{t.titleB}</em></h1>
        <p className="simple-hero-lead">{t.lead}</p>
        <div className="actions simple-hero-actions">
          <Link href="#projects" className="button primary">{t.viewProjects} <span aria-hidden="true">↓</span></Link>
          <a href={profile.cvDownload} className="button">{t.download} <span aria-hidden="true">↓</span></a>
          <Link href={localePath(locale, "/contact")} className="simple-contact-link">{t.contact} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="system-legend" aria-label="Portfolio theme">
          <span><b>FIELD</b><small>{t.legendField}</small></span>
          <span><b>SYSTEM</b><small>{t.legendSystem}</small></span>
          <span><b>PRODUCT</b><small>{t.legendProduct}</small></span>
        </div>
      </div>
      <figure className="simple-hero-person system-portrait">
        <div className="portrait-tag" aria-hidden="true">01 / BUILDER</div>
        <Image src={profile.portrait} alt="Eduardo Merino" width={640} height={760} priority sizes="(max-width: 767px) 80vw, 38vw"/>
        <figcaption><strong>Eduardo Merino</strong><span>{profile.role} · Full Stack</span></figcaption>
      </figure>
    </section>

    <section className="simple-projects section container" id="projects">
      <div className="simple-section-heading themed-section-heading">
        <div><p className="eyebrow accent">{t.projects}</p><h2>{t.projectsTitle}</h2></div>
        <p>{t.projectsLead}</p>
      </div>
      <div className="simple-project-grid identity-project-grid">
        {featured.map((system) => {
          const media = system.media?.[0];
          const pipeline = pipelines[locale][system.slug];
          const primary = system.slug === "placaclara";
          return <article className="simple-project-card identity-project-card" data-feature={primary ? "primary" : "secondary"} data-project={system.slug} key={system.slug}>
            <div className="project-system-label"><span>{pipeline?.label ?? system.category}</span><span>{system.state.label}</span></div>
            <Link href={localePath(locale, `/systems/${system.slug}`)} className="simple-project-visual identity-project-visual" aria-label={`${t.openProject}: ${system.name}`}>
              {media ? <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" referrerPolicy="no-referrer"/> : system.slug === "echo" ? <EchoVisual/> : <div className="simple-project-placeholder">{system.name}</div>}
            </Link>
            <div className="simple-project-copy identity-project-copy">
              <p className="eyebrow">{system.category}</p>
              <h3><Link href={localePath(locale, `/systems/${system.slug}`)}>{system.name}</Link></h3>
              <p>{projectCopy[locale][system.slug] ?? system.summary}</p>
              {pipeline && <div className="project-pipeline" aria-label={`${system.name} system path`}>
                <span><small>INPUT</small><strong>{pipeline.input}</strong></span>
                <i aria-hidden="true">→</i>
                <span><small>SYSTEM</small><strong>{pipeline.system}</strong></span>
                <i aria-hidden="true">→</i>
                <span><small>OUTCOME</small><strong>{pipeline.output}</strong></span>
              </div>}
              <Link className="text-link" href={localePath(locale, `/systems/${system.slug}`)}>{t.openProject} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>;
        })}
      </div>
    </section>

    <section className="system-principles section">
      <div className="container">
        <div className="simple-section-heading themed-section-heading">
          <div><p className="eyebrow accent">{t.principles}</p><h2>{t.principlesTitle}</h2></div>
          <p>{t.principlesLead}</p>
        </div>
        <div className="principles-grid">
          {t.principlesList.map((item,index)=><article key={item.code}>
            <span className="principle-index">0{index+1}</span>
            <h3>{item.code}</h3>
            <p>{item.body}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="simple-more section deeper-systems">
      <div className="container">
        <div className="simple-section-heading themed-section-heading">
          <div><p className="eyebrow accent">{t.more}</p><h2>{t.moreTitle}</h2></div>
          <p>{t.moreLead}</p>
        </div>
        <div className="simple-more-list">
          {more.map((system,index) => <Link href={localePath(locale, `/systems/${system.slug}`)} key={system.slug}>
            <span><small>{String(index+4).padStart(2,"0")} / SYSTEM</small><strong>{system.name}</strong><small>{system.category}</small></span>
            <p>{system.summary}</p>
            <span aria-hidden="true">↗</span>
          </Link>)}
        </div>
        <Link href={localePath(locale, "/systems")} className="text-link simple-all-projects">{t.viewProjects} <span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <section className="simple-about section container identity-about">
      <div>
        <p className="eyebrow accent">{t.about}</p>
        <h2>{t.aboutTitle}</h2>
      </div>
      <div className="simple-about-copy">
        <p className="lead">{t.aboutText}</p>
        <div className="simple-about-facts">
          <span>{t.current}</span>
          <span>{t.education}</span>
          <span>{profile.location}</span>
        </div>
        <div className="actions">
          <Link href={localePath(locale, "/about")} className="button">{t.about} <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="button">{t.download} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>

    <section className="simple-final-cta section identity-final-cta">
      <div className="container simple-final-inner">
        <div><p className="eyebrow accent">{t.contact}</p><h2>{t.finalCta}</h2></div>
        <div><p>{t.finalText}</p><Link href={localePath(locale, "/contact")} className="button primary">{t.contact} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  </main>;
}
