import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { systemCases } from "@/content/systems";
import { SystemArtifact } from "@/components/systems/system-artifact";
import { PortfolioIcon } from "@/components/profile/portfolio-icon";
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

const visualCopy = {
  en: {
    builder: "01 / BUILDER", viewCv: "View CV", all: "View all projects", more: "More projects exploring different problems, technologies and domains.",
    contact: "Get in touch", invitation: "Role, project, collaboration or product idea.", about: "More about me", city: "Lima, Peru",
    field: "FIELD", system: "SYSTEM", product: "PRODUCT", motto: <>REAL DATA.<br/>USEFUL SYSTEMS.</>,
    subtitles: ["Know more before buying a used car.", "Vehicle intelligence in your hands.", "From environmental audio to meaningful events."],
    tags: [["Live product", "Peru", "Payments", "Reports"], ["Android", "OBD-II", "Live telemetry", "Field tested"], ["Audio", "AI models", "Event engine", "MQTT"]],
    states: ["LIVE PRODUCT", "ACTIVE R&D · FIELD OBSERVATIONS", "RESEARCH MVP · MODEL VALIDATION IN PROGRESS"],
    deeper: ["Process intelligence and automation.", "Geospatial decision support.", "AI-assisted content production.", "Career intelligence with AI.", "Financial data and automation.", "Reusable AI workflows."],
    illustration: "Conceptual audio-to-event pipeline",
  },
  es: {
    builder: "01 / CONSTRUCTOR", viewCv: "Ver CV", all: "Ver todos los proyectos", more: "Más proyectos que exploran distintos problemas, tecnologías y dominios.",
    contact: "Hablemos", invitation: "Una oportunidad, proyecto, colaboración o idea de producto.", about: "Más sobre mí", city: "Lima, Perú",
    field: "CAMPO", system: "SISTEMA", product: "PRODUCTO", motto: <>DATOS REALES.<br/>SISTEMAS ÚTILES.</>,
    subtitles: ["Conoce más antes de comprar un auto usado.", "Inteligencia vehicular en tus manos.", "Del audio ambiental a eventos con significado."],
    tags: [["Producto activo", "Perú", "Pagos", "Reportes"], ["Android", "OBD-II", "Telemetría", "Pruebas de campo"], ["Audio", "Modelos IA", "Motor de eventos", "MQTT"]],
    states: ["PRODUCTO ACTIVO", "I+D ACTIVA · OBSERVACIONES DE CAMPO", "MVP DE INVESTIGACIÓN · MODELO EN VALIDACIÓN"],
    deeper: ["Inteligencia y automatización de procesos.", "Decisiones geoespaciales.", "Producción de contenido con IA.", "Inteligencia profesional con IA.", "Datos financieros y automatización.", "Workflows de IA reutilizables."],
    illustration: "Flujo conceptual de audio a eventos",
  },
  pt: {
    builder: "01 / CONSTRUTOR", viewCv: "Ver CV", all: "Ver todos os projetos", more: "Mais projetos explorando diferentes problemas, tecnologias e domínios.",
    contact: "Vamos conversar", invitation: "Uma vaga, projeto, colaboração ou ideia de produto.", about: "Mais sobre mim", city: "Lima, Peru",
    field: "CAMPO", system: "SISTEMA", product: "PRODUTO", motto: <>DADOS REAIS.<br/>SISTEMAS ÚTEIS.</>,
    subtitles: ["Saiba mais antes de comprar um carro usado.", "Inteligência veicular nas suas mãos.", "Do áudio ambiental a eventos com significado."],
    tags: [["Produto ativo", "Peru", "Pagamentos", "Relatórios"], ["Android", "OBD-II", "Telemetria", "Testes de campo"], ["Áudio", "Modelos IA", "Motor de eventos", "MQTT"]],
    states: ["PRODUTO ATIVO", "P&D ATIVA · OBSERVAÇÕES DE CAMPO", "MVP DE PESQUISA · MODELO EM VALIDAÇÃO"],
    deeper: ["Inteligência e automação de processos.", "Decisões geoespaciais.", "Produção de conteúdo com IA.", "Inteligência profissional com IA.", "Dados financeiros e automação.", "Workflows de IA reutilizáveis."],
    illustration: "Fluxo conceitual de áudio a eventos",
  },
} as const;

const deeperOrder = ["talos", "vigia", "prodagentic", "cv-engine", "finance-sensor", "prompt-machine"];

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const v = visualCopy[locale];
  const featured = systemCases.filter((system) => system.placement === "FLAGSHIP" && system.publicability !== "PRIVATE");
  const more = deeperOrder.flatMap((slug) => systemCases.filter((system) => system.slug === slug && system.publicability !== "PRIVATE"));

  return <main id="main-content" className="portfolio-cinema" lang={locale} tabIndex={-1}>
    <section className="cinema-hero" aria-labelledby="cinema-title">
      <Image className="cinema-background hero-background" src="/media/portfolio/builder.webp" alt="" fill priority sizes="100vw"/>
      <div className="cinema-hero-shade"/>
      <div className="container cinema-hero-inner">
        <div className="cinema-hero-copy">
          <p className="cinema-eyebrow">{v.builder}</p>
          <h1 id="cinema-title"><span>{t.titleA}</span>{" "}<em>{t.titleB}</em></h1>
          <p className="cinema-lead">{t.lead}</p>
          <div className="cinema-actions">
            <Link href="#projects" className="button primary">{t.viewProjects}<span aria-hidden="true">↓</span></Link>
            <a href={profile.cvDownload} className="button">{t.download}<span aria-hidden="true">↓</span></a>
            <Link href="#contact" className="button">{t.contact}<span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <aside className="cinema-coordinates" aria-hidden="true"><span>LIM / PE</span><span>EM / 2026</span><span>FIELD → SYSTEM → PRODUCT</span><p>{v.motto}</p></aside>
        <div className="cinema-pipeline">
          {[{title:v.field,body:t.legendField},{title:v.system,body:t.legendSystem},{title:v.product,body:t.legendProduct}].map((step,index)=><div key={step.title}>
            <span className="cinema-pipeline-rule" aria-hidden="true">{index === 0 ? "◉" : "»"}</span><span><b>{step.title}</b><small>{step.body}</small></span>
          </div>)}
        </div>
      </div>
    </section>

    <section id="projects" className="cinema-projects" aria-label={t.projects}>
      {featured.map((system,index) => {
        const pipeline = pipelines[locale][system.slug];
        return <article key={system.slug} className={`cinema-project cinema-project-${system.slug}`} aria-labelledby={`project-${system.slug}`}>
          <Image className="cinema-background" src={`/media/portfolio/${system.slug}.webp`} alt="" fill sizes={system.slug === "placaclara" ? "100vw" : "(max-width: 760px) 100vw, 50vw"}/>
          <div className="cinema-project-shade"/>
          {system.slug === "placaclara" && <div className="cinema-product-preview" aria-hidden="true">
            <Image src="/media/portfolio/placaclara-product.webp" alt="" fill sizes="(max-width: 760px) 80vw, 44vw"/>
          </div>}
          {system.slug === "autopulse" && <div className="cinema-phone-preview" aria-hidden="true">
            <Image src="/media/portfolio/autopulse-screen.webp" alt="" fill sizes="(max-width: 760px) 42vw, 21vw"/>
          </div>}
          {system.slug === "echo" && <div className="cinema-acoustic" aria-label={v.illustration}>
            <svg viewBox="0 0 260 100" fill="none" aria-hidden="true"><path d="M0 50H20l3-9 4 18 4-30 4 42 4-30 4 9h12l4-17 4 34 4-55 4 76 4-59 4 42 4-27 4 6h13l4-24 4 46 4-63 4 82 4-98 4 82 4-54 4 44 4-20 4 5h13l4-16 4 30 4-44 4 55 4-35 4 17h11l4-7 4 14 4-7h29" stroke="currentColor" strokeWidth="1.2"/></svg>
            <ol><li>RAW AUDIO</li><li>MODEL INFERENCE</li><li>CANDIDATE EVENT</li><li>CONFIRMED EVENT</li></ol>
          </div>}
          <div className="cinema-project-content">
            <p className="cinema-eyebrow">{pipeline?.label ?? system.category}</p>
            <h2 id={`project-${system.slug}`}>
              <Link href={localePath(locale, `/systems/${system.slug}`)}>{system.slug === "placaclara" ? <>Placa<em>Clara</em></> : system.slug === "autopulse" ? <>Auto<em>Pulse</em></> : system.name}</Link>
            </h2>
            <p className="cinema-project-subtitle">{v.subtitles[index]}</p>
            <p className="cinema-project-description">{projectCopy[locale][system.slug] ?? system.summary}</p>
            <ul className="cinema-tags">{v.tags[index].map((tag,i)=><li key={tag}><PortfolioIcon name={system.slug === "echo" ? (i === 0 ? "audio" : "chip") : i === 1 ? "pin" : i === 3 ? "document" : "signal"}/>{tag}</li>)}</ul>
            <Link className="button" href={localePath(locale, `/systems/${system.slug}`)}>{t.openProject}<span aria-hidden="true">→</span></Link>
            <p className="cinema-project-state">{v.states[index]}</p>
          </div>
        </article>;
      })}
    </section>

    <section className="cinema-deeper" aria-labelledby="deeper-title">
      <div className="cinema-deeper-heading"><h2 id="deeper-title">{t.more}</h2><p>{v.more}</p><Link className="button" href={localePath(locale,"/systems")}>{v.all}<span aria-hidden="true">→</span></Link></div>
      <div className="cinema-deeper-grid">
        {more.map((system,index)=><Link className="cinema-mini-project" href={localePath(locale,`/systems/${system.slug}`)} key={system.slug}>
          <div className="cinema-mini-art" aria-hidden="true">{system.media?.[0] ? <Image src={system.media[0].src} alt="" fill unoptimized sizes="(max-width: 760px) 50vw, 17vw"/> : <SystemArtifact system={system} locale={locale}/>}</div>
          <span className="cinema-mini-number">{String(index+4).padStart(2,"0")}</span><h3>{system.name}</h3><p>{v.deeper[index]}</p><span className="cinema-mini-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </section>

    <section className="cinema-bottom" aria-label={t.about}>
      <div className="cinema-about">
        <div className="cinema-portrait"><Image src={profile.portrait} alt="Eduardo Merino" fill sizes="(max-width: 580px) 38vw, 20vw"/></div>
        <div className="cinema-about-copy"><p className="cinema-eyebrow">{t.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="cinema-about-facts"><span>{profile.role} · {v.city}</span><span>{t.current}</span><span>{t.education}</span></div><Link href={localePath(locale,"/about")} className="button">{v.about}<span aria-hidden="true">→</span></Link></div>
      </div>
      <div className="cinema-principles"><h2 className="cinema-eyebrow">{t.principles}</h2><ol>{t.principlesList.map((item,index)=><li key={item.code}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{item.code}</h3><p>{item.body}</p></div></li>)}</ol></div>
      <div id="contact" className="cinema-contact"><h2 className="cinema-eyebrow">{v.contact}</h2><p>{v.invitation}</p><div className="cinema-contact-links"><a href={`mailto:${profile.email}`} className="button"><PortfolioIcon name="mail"/>Email<span aria-hidden="true">→</span></a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="button"><PortfolioIcon name="linkedin"/>LinkedIn<span aria-hidden="true">→</span></a><a href={profile.github} target="_blank" rel="noreferrer" className="button"><PortfolioIcon name="github"/>GitHub<span aria-hidden="true">→</span></a></div><a href={profile.cvDownload} className="button cinema-cv">{t.download}<span aria-hidden="true">↓</span></a></div>
    </section>
  </main>;
}
