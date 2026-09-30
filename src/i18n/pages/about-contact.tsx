import Image from "next/image";
import Link from "next/link";
import { EmailActions } from "@/components/contact/email-actions";
import { profile } from "@/content/profile";
import { localePath, type Locale } from "@/i18n/config";

const aboutCopy: Record<Locale, {
  eyebrow:string; title:string; lead:string; body:string; current:string; education:string;
  focus:string; projects:string; cv:string; contact:string; workTitle:string;
  areas: readonly {title:string; body:string}[];
}> = {
  en: {
    eyebrow:"About", title:"Hi, I’m Eduardo.", lead:"Software Engineer and full-stack builder based in Lima, Peru.",
    body:"I like taking a real problem, understanding what actually matters, and turning it into software people can use. Recent work spans a live vehicle-research product, physical OBD telemetry, acoustic AI and governed process automation.",
    current:"Full Stack Developer at Thradex Tech", education:"Systems & Informatics Engineering at UNMSM · final stage",
    focus:"Product engineering · Full Stack · Applied AI", projects:"View projects", cv:"Download CV", contact:"Contact me",
    workTitle:"What I work with",
    areas:[
      {title:"Product engineering",body:"From requirements and architecture to implementation, deployment and iteration."},
      {title:"Backend & data",body:"APIs, services, SQL/NoSQL persistence, integrations and durable application behavior."},
      {title:"Web & mobile",body:"Interfaces that make the product understandable and useful on real devices."},
      {title:"Automation & AI",body:"Workflows that reduce repetitive work while keeping human control where it matters."},
    ],
  },
  es: {
    eyebrow:"Sobre mí", title:"Hola, soy Eduardo.", lead:"Software Engineer y desarrollador full-stack en Lima, Perú.",
    body:"Me gusta tomar un problema real, entender qué importa de verdad y convertirlo en software que alguien pueda usar. Mi trabajo reciente abarca un producto vehicular en producción, telemetría OBD física, IA acústica y automatización de procesos gobernada.",
    current:"Full Stack Developer en Thradex Tech", education:"Ingeniería de Sistemas e Informática en UNMSM · etapa final",
    focus:"Ingeniería de producto · Full Stack · IA aplicada", projects:"Ver proyectos", cv:"Descargar CV", contact:"Contactarme",
    workTitle:"Con qué trabajo",
    areas:[
      {title:"Ingeniería de producto",body:"Desde requerimientos y arquitectura hasta implementación, despliegue e iteración."},
      {title:"Backend y datos",body:"APIs, servicios, persistencia SQL/NoSQL, integraciones y comportamiento durable."},
      {title:"Web y mobile",body:"Interfaces que hacen el producto entendible y útil en dispositivos reales."},
      {title:"Automatización e IA",body:"Flujos que reducen trabajo repetitivo manteniendo control humano cuando importa."},
    ],
  },
  pt: {
    eyebrow:"Sobre mim", title:"Olá, eu sou Eduardo.", lead:"Software Engineer e desenvolvedor full-stack baseado em Lima, Peru.",
    body:"Gosto de pegar um problema real, entender o que realmente importa e transformá-lo em software que as pessoas possam usar. Meu trabalho recente inclui produto veicular em produção, telemetria OBD física, IA acústica e automação de processos governada.",
    current:"Full Stack Developer na Thradex Tech", education:"Engenharia de Sistemas e Informática na UNMSM · etapa final",
    focus:"Engenharia de produto · Full Stack · IA aplicada", projects:"Ver projetos", cv:"Baixar CV", contact:"Entrar em contato",
    workTitle:"Com o que trabalho",
    areas:[
      {title:"Engenharia de produto",body:"De requisitos e arquitetura até implementação, deploy e evolução."},
      {title:"Backend e dados",body:"APIs, serviços, persistência SQL/NoSQL, integrações e comportamento durável."},
      {title:"Web e mobile",body:"Interfaces que tornam o produto compreensível e útil em dispositivos reais."},
      {title:"Automação e IA",body:"Fluxos que reduzem trabalho repetitivo mantendo controle humano onde importa."},
    ],
  },
};

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const t=aboutCopy[locale];
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container section about-intro">
      <div>
        <p className="eyebrow accent">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="lead">{t.lead}</p>
        <p className="about-personal">{t.body}</p>
        <div className="actions">
          <Link href={localePath(locale,"/systems")} className="button primary">{t.projects} <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="button">{t.cv} <span aria-hidden="true">↓</span></a>
          <Link href={localePath(locale,"/contact")} className="text-link">{t.contact} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <figure className="about-portrait">
        <Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/>
        <figcaption>{profile.role} · Full Stack</figcaption>
      </figure>
    </section>

    <section className="section professional-section">
      <div className="container split">
        <div>
          <p className="eyebrow accent">{t.workTitle}</p>
          <h2>{t.focus}</h2>
          <div className="simple-about-facts">
            <span>{t.current}</span>
            <span>{t.education}</span>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="capability-list">
          {t.areas.map((area)=><div key={area.title} className="simple-about-area"><h3>{area.title}</h3><p>{area.body}</p></div>)}
        </div>
      </div>
    </section>
  </main>;
}

export function LocalizedContact({ locale }: { locale: Locale }) {
  const copy: Record<Locale, {
    eyebrow: string; title: string; lead: string; email: string; linkedin: string; github: string;
    note: string; cv: string;
  }> = {
    en: {
      eyebrow: "Contact", title: "Let’s talk.", lead: "A role, a project, a collaboration or a product idea — send me the context and we can start from there.",
      email: "Email", linkedin: "LinkedIn", github: "GitHub",
      note: "You do not need a polished brief. A few lines about what you are working on, what you need and what a useful result would look like are enough.",
      cv: "Download CV",
    },
    es: {
      eyebrow: "Contacto", title: "Hablemos.", lead: "Una oportunidad laboral, un proyecto, una colaboración o una idea de producto — cuéntame el contexto y empezamos desde ahí.",
      email: "Correo", linkedin: "LinkedIn", github: "GitHub",
      note: "No necesitas un brief perfecto. Bastan unas líneas sobre qué estás haciendo, qué necesitas y cómo se vería un buen resultado.",
      cv: "Descargar CV",
    },
    pt: {
      eyebrow: "Contato", title: "Vamos conversar.", lead: "Uma vaga, um projeto, uma colaboração ou uma ideia de produto — envie o contexto e podemos começar por aí.",
      email: "E-mail", linkedin: "LinkedIn", github: "GitHub",
      note: "Você não precisa de um briefing perfeito. Algumas linhas sobre o que está fazendo, o que precisa e como seria um bom resultado já bastam.",
      cv: "Baixar CV",
    },
  };
  const t = copy[locale];

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="simple-contact-page container">
      <div className="simple-contact-grid">
        <div className="simple-contact-main">
          <p className="eyebrow accent">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <EmailActions locale={locale}/>
          <p className="simple-contact-note">{t.note}</p>
        </div>
        <div>
          <p className="eyebrow">{locale === "es" ? "Canales" : locale === "pt" ? "Canais" : "Channels"}</p>
          <nav className="simple-contact-options" aria-label="Contact channels">
            <a href={`mailto:${profile.email}`}><span>{t.email}</span><strong>↗</strong></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.linkedin}</span><strong>↗</strong></a>
            <a href={profile.github} target="_blank" rel="noreferrer"><span>{t.github}</span><strong>↗</strong></a>
            <a href={profile.cvDownload}><span>{t.cv}</span><strong>↓</strong></a>
          </nav>
        </div>
      </div>
    </section>
  </main>;
}
