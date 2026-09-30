/* eslint-disable @next/next/no-img-element -- flagship captures are hosted in the public evidence drive */
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { systemCases } from "@/content/systems";
import { localePath, type Locale } from "@/i18n/config";

const copy: Record<Locale, {
  eyebrow: string; title: string; lead: string; projects: string; projectsLead: string;
  viewProjects: string; download: string; contact: string; openProject: string;
  more: string; moreLead: string; about: string; aboutTitle: string; aboutText: string;
  current: string; education: string; finalCta: string; finalText: string;
}> = {
  en: {
    eyebrow: "Software Engineer · Full Stack · Lima, Peru",
    title: "I build useful software.",
    lead: "Web apps, mobile products, automation and AI-powered tools — from the first idea to a working product.",
    projects: "Selected projects", projectsLead: "Three real products that show the kind of problems I like to solve.",
    viewProjects: "View projects", download: "Download CV", contact: "Contact me", openProject: "View project",
    more: "More work", moreLead: "Other products, experiments and professional engineering work.",
    about: "About me", aboutTitle: "Full-stack, from problem to product.",
    aboutText: "I work across backend, frontend, mobile, data and applied AI. I care about making software understandable, useful and reliable — not just technically impressive.",
    current: "Full Stack Developer at Thradex Tech", education: "Systems & Informatics Engineering at UNMSM · final stage",
    finalCta: "Want to work together?", finalText: "For a role, a project, a collaboration or a product idea, send me the context and we can start from there."
  },
  es: {
    eyebrow: "Software Engineer · Full Stack · Lima, Perú",
    title: "Construyo software útil.",
    lead: "Aplicaciones web, productos móviles, automatización y herramientas con IA — desde la idea hasta un producto funcionando.",
    projects: "Proyectos destacados", projectsLead: "Tres productos reales que muestran el tipo de problemas que me gusta resolver.",
    viewProjects: "Ver proyectos", download: "Descargar CV", contact: "Contactarme", openProject: "Ver proyecto",
    more: "Más trabajo", moreLead: "Otros productos, experimentos y trabajo profesional de ingeniería.",
    about: "Sobre mí", aboutTitle: "Full-stack, del problema al producto.",
    aboutText: "Trabajo entre backend, frontend, mobile, datos e IA aplicada. Me importa que el software sea entendible, útil y confiable — no solo técnicamente llamativo.",
    current: "Full Stack Developer en Thradex Tech", education: "Ingeniería de Sistemas e Informática en UNMSM · etapa final",
    finalCta: "¿Trabajamos juntos?", finalText: "Para una oportunidad laboral, un proyecto, una colaboración o una idea de producto, cuéntame el contexto y empezamos desde ahí."
  },
  pt: {
    eyebrow: "Software Engineer · Full Stack · Lima, Peru",
    title: "Eu construo software útil.",
    lead: "Aplicações web, produtos mobile, automação e ferramentas com IA — da primeira ideia até um produto funcionando.",
    projects: "Projetos em destaque", projectsLead: "Três produtos reais que mostram o tipo de problema que gosto de resolver.",
    viewProjects: "Ver projetos", download: "Baixar CV", contact: "Entrar em contato", openProject: "Ver projeto",
    more: "Mais trabalhos", moreLead: "Outros produtos, experimentos e trabalho profissional de engenharia.",
    about: "Sobre mim", aboutTitle: "Full-stack, do problema ao produto.",
    aboutText: "Trabalho entre backend, frontend, mobile, dados e IA aplicada. Quero que o software seja compreensível, útil e confiável — não apenas tecnicamente impressionante.",
    current: "Full Stack Developer na Thradex Tech", education: "Engenharia de Sistemas e Informática na UNMSM · etapa final",
    finalCta: "Vamos trabalhar juntos?", finalText: "Para uma vaga, projeto, colaboração ou ideia de produto, envie o contexto e podemos começar por aí."
  },
};

const projectCopy: Record<Locale, Record<string, string>> = {
  en: {
    autopulse: "Android app that reads live vehicle data through OBD-II, records driving sessions and preserves useful history when connections fail.",
    vigia: "Planning tool for comparing how limited resources could cover a territory under the same declared constraints.",
    prodagentic: "Content production workspace that remembers previous topics, checks repetition and keeps human approval in the loop.",
  },
  es: {
    autopulse: "App Android que lee datos del vehículo por OBD-II, registra sesiones y conserva un historial útil incluso cuando la conexión falla.",
    vigia: "Herramienta de planificación para comparar cómo recursos limitados podrían cubrir un territorio bajo las mismas restricciones.",
    prodagentic: "Workspace de producción de contenido que recuerda temas anteriores, revisa repetición y mantiene la aprobación humana.",
  },
  pt: {
    autopulse: "App Android que lê dados do veículo por OBD-II, registra sessões e preserva histórico útil mesmo quando a conexão falha.",
    vigia: "Ferramenta de planejamento para comparar como recursos limitados poderiam cobrir um território sob as mesmas restrições.",
    prodagentic: "Workspace de produção de conteúdo que lembra temas anteriores, verifica repetição e mantém aprovação humana.",
  },
};

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = systemCases.filter((system) => system.placement === "FLAGSHIP");
  const more = systemCases.filter((system) => system.placement !== "FLAGSHIP");

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="simple-hero container">
      <div className="simple-hero-copy">
        <p className="eyebrow accent">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="simple-hero-lead">{t.lead}</p>
        <div className="actions simple-hero-actions">
          <Link href="#projects" className="button primary">{t.viewProjects} <span aria-hidden="true">↓</span></Link>
          <a href={profile.cvDownload} className="button">{t.download} <span aria-hidden="true">↓</span></a>
          <Link href={localePath(locale, "/contact")} className="simple-contact-link">{t.contact} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="simple-scope" aria-label="Professional scope">
          <span>Web</span><span>Mobile</span><span>Backend</span><span>Automation</span><span>Applied AI</span>
        </div>
      </div>
      <figure className="simple-hero-person">
        <Image src={profile.portrait} alt="Eduardo Merino" width={640} height={760} priority sizes="(max-width: 767px) 80vw, 38vw"/>
        <figcaption><strong>Eduardo Merino</strong><span>{profile.role} · Full Stack</span></figcaption>
      </figure>
    </section>

    <section className="simple-projects section container" id="projects">
      <div className="simple-section-heading">
        <div><p className="eyebrow accent">{t.projects}</p><h2>{t.projects}</h2></div>
        <p>{t.projectsLead}</p>
      </div>
      <div className="simple-project-grid">
        {featured.map((system) => {
          const media = system.media?.[0];
          return <article className="simple-project-card" key={system.slug}>
            <Link href={localePath(locale, `/systems/${system.slug}`)} className="simple-project-visual" aria-label={`${t.openProject}: ${system.name}`}>
              {media ? <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" referrerPolicy="no-referrer"/> : <div className="simple-project-placeholder">{system.name}</div>}
            </Link>
            <div className="simple-project-copy">
              <p className="eyebrow">{system.category}</p>
              <h3><Link href={localePath(locale, `/systems/${system.slug}`)}>{system.name}</Link></h3>
              <p>{projectCopy[locale][system.slug] ?? system.summary}</p>
              <Link className="text-link" href={localePath(locale, `/systems/${system.slug}`)}>{t.openProject} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>;
        })}
      </div>
    </section>

    <section className="simple-more section">
      <div className="container">
        <div className="simple-section-heading">
          <div><p className="eyebrow accent">{t.more}</p><h2>{t.more}</h2></div>
          <p>{t.moreLead}</p>
        </div>
        <div className="simple-more-list">
          {more.map((system) => <Link href={localePath(locale, `/systems/${system.slug}`)} key={system.slug}>
            <span><strong>{system.name}</strong><small>{system.category}</small></span>
            <p>{system.summary}</p>
            <span aria-hidden="true">↗</span>
          </Link>)}
        </div>
        <Link href={localePath(locale, "/systems")} className="text-link simple-all-projects">{t.viewProjects} <span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <section className="simple-about section container">
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

    <section className="simple-final-cta section">
      <div className="container simple-final-inner">
        <div><p className="eyebrow accent">{t.contact}</p><h2>{t.finalCta}</h2></div>
        <div><p>{t.finalText}</p><Link href={localePath(locale, "/contact")} className="button primary">{t.contact} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  </main>;
}
