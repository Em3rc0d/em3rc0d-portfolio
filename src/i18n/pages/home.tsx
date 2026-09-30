import Image from "next/image";
import Link from "next/link";
import { CoreFallback } from "@/components/scene/core-fallback";
import { SystemArtifact } from "@/components/systems/system-artifact";
import { ProfessionalSnapshot } from "@/components/profile/professional-snapshot";
import { profile } from "@/content/profile";
import { localePath, type Locale } from "@/i18n/config";
import { localizedSystemCases } from "@/i18n/systems";

const copy: Record<Locale, {
  identity:string; hero1:string; hero2:string; statement:string; scope:string;
  projects:string; projectsTitle:string; projectsIntro:string; viewProject:string; all:string; more:string;
  about:string; aboutTitle:string; aboutText:string; aboutLink:string;
  contact:string; contactTitle:string; contactText:string; contactButton:string;
  cv:string; selected:string;
}> = {
  en: {
    identity:"Software Engineer · Full Stack · Applied AI", hero1:"I build software", hero2:"people can use.", statement:"From idea to working product.",
    scope:"Full-stack development, automation and applied AI across real projects.",
    projects:"Selected projects", projectsTitle:"Built, tested\nand worth showing.", projectsIntro:"Three projects that show how I work across mobile, geospatial systems and AI-powered workflows.",
    viewProject:"View project", all:"See all projects", more:"There is more work behind these three, including product experiments, professional contributions and earlier full-stack projects.",
    about:"About me", aboutTitle:"Hi, I’m Eduardo.", aboutText:"I’m a Software Engineer from Lima focused on building complete products: interface, backend, data, integrations and AI when it genuinely helps.", aboutLink:"More about me",
    contact:"Get in touch", contactTitle:"Have a project,\nrole or idea?", contactText:"I’m open to conversations about software engineering, full-stack products and applied AI.", contactButton:"Contact me",
    cv:"Download CV (PDF)", selected:"See selected work",
  },
  es: {
    identity:"Software Engineer · Full Stack · IA aplicada", hero1:"Construyo software", hero2:"que la gente puede usar.", statement:"De la idea a un producto funcionando.",
    scope:"Desarrollo full-stack, automatización e IA aplicada en proyectos reales.",
    projects:"Proyectos destacados", projectsTitle:"Construidos, probados\ny listos para mostrar.", projectsIntro:"Tres proyectos que muestran cómo trabajo en mobile, sistemas geoespaciales y flujos con IA.",
    viewProject:"Ver proyecto", all:"Ver todos los proyectos", more:"Hay más trabajo detrás de estos tres: productos, contribuciones profesionales y proyectos full-stack anteriores.",
    about:"Sobre mí", aboutTitle:"Hola, soy Eduardo.", aboutText:"Soy Software Engineer en Lima. Construyo productos completos: interfaz, backend, datos, integraciones e IA cuando realmente aporta valor.", aboutLink:"Conocerme mejor",
    contact:"Contacto", contactTitle:"¿Tienes un proyecto,\nuna oportunidad o una idea?", contactText:"Estoy abierto a conversar sobre ingeniería de software, productos full-stack e IA aplicada.", contactButton:"Contactarme",
    cv:"Descargar CV (PDF)", selected:"Ver proyectos destacados",
  },
  pt: {
    identity:"Software Engineer · Full Stack · IA aplicada", hero1:"Eu construo software", hero2:"que as pessoas conseguem usar.", statement:"Da ideia ao produto funcionando.",
    scope:"Desenvolvimento full-stack, automação e IA aplicada em projetos reais.",
    projects:"Projetos em destaque", projectsTitle:"Construídos, testados\ne prontos para mostrar.", projectsIntro:"Três projetos que mostram como trabalho com mobile, sistemas geoespaciais e fluxos com IA.",
    viewProject:"Ver projeto", all:"Ver todos os projetos", more:"Há mais trabalho além destes três: produtos, contribuições profissionais e projetos full-stack anteriores.",
    about:"Sobre mim", aboutTitle:"Olá, eu sou Eduardo.", aboutText:"Sou Software Engineer em Lima. Construo produtos completos: interface, backend, dados, integrações e IA quando ela realmente ajuda.", aboutLink:"Saiba mais sobre mim",
    contact:"Contato", contactTitle:"Tem um projeto,\numa oportunidade ou uma ideia?", contactText:"Estou aberto a conversar sobre engenharia de software, produtos full-stack e IA aplicada.", contactButton:"Falar comigo",
    cv:"Baixar CV (PDF)", selected:"Ver projetos em destaque",
  },
};

function Lines({ value }: { value: string }) {
  const [a,b] = value.split("\n");
  return <>{a}{b && <><br/>{b}</>}</>;
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const systems = localizedSystemCases(locale);
  const featured = systems.filter((system) => system.placement === "FLAGSHIP");

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="hero container">
      <div className="hero-copy enter">
        <p className="eyebrow hero-identity"><span className="identity-line" aria-hidden="true"/>Eduardo Merino <span>/</span> {t.identity}</p>
        <h1><span className="hero-line">{t.hero1}</span><span className="hero-line hero-line-accent">{t.hero2}</span></h1>
        <p className="hero-statement">{t.statement}</p><p className="hero-scope">{t.scope}</p>
        <div className="actions">
          <Link href={localePath(locale,"/systems")} className="button primary">{t.projects} <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="hero-secondary">{t.cv} <span aria-hidden="true">↓</span></a>
          <Link href={localePath(locale,"/contact")} className="hero-secondary">{t.contactButton} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-art"><div className="core-stage" data-scene-slot="HOME"><CoreFallback/></div><div className="core-caption"><span className="eyebrow">Software · Products · AI</span><span className="core-caption-index" aria-hidden="true">01 — 03</span></div></div>
      <div className="hero-bottom"><span>Software Engineer · Lima, Peru</span><a href="#projects">{t.selected} <span aria-hidden="true">↓</span></a></div>
    </section>

    <section className="container recruiter-strip"><ProfessionalSnapshot locale={locale}/></section>

    <section className="selected-section section container" id="projects">
      <div className="section-head"><div><p className="eyebrow accent">{t.projects}</p><h2><Lines value={t.projectsTitle}/></h2></div><p>{t.projectsIntro}</p></div>
      {featured.map((system,i)=><article key={system.slug} className={`system-encounter encounter-${i}`} data-accent={system.accent}>
        <div className="encounter-copy">
          <p className="eyebrow accent"><span className="encounter-number">0{i+1}</span>{system.category}</p>
          <h3><Link href={localePath(locale,`/systems/${system.slug}`)}>{system.name}</Link></h3>
          <p className="encounter-summary">{system.summary}</p>
          <p className="encounter-built">{system.built}</p>
          <Link href={localePath(locale,`/systems/${system.slug}`)} className="text-link">{t.viewProject} <span aria-hidden="true">↗</span></Link>
        </div>
        <SystemArtifact system={system} locale={locale}/>
      </article>)}
      <div className="all-systems-row"><p>{t.more}</p><Link href={localePath(locale,"/systems")} className="text-link">{t.all} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="human-section section container">
      <div className="human-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 50vw, 300px"/></div>
      <div className="human-copy"><p className="eyebrow accent">{t.about}</p><h2>{t.aboutTitle}</h2><p className="lead">{t.aboutText}</p><div className="actions"><Link href={localePath(locale,"/about")} className="text-link">{t.aboutLink} <span aria-hidden="true">↗</span></Link><a href={profile.cvDownload} className="text-link">{t.cv} <span aria-hidden="true">↓</span></a></div></div>
    </section>

    <section className="conversation section rule-top">
      <div className="container split"><div><p className="eyebrow accent">{t.contact}</p><h2><Lines value={t.contactTitle}/></h2></div><div className="professional-copy"><p className="lead">{t.contactText}</p><Link href={localePath(locale,"/contact")} className="button primary">{t.contactButton} <span aria-hidden="true">↗</span></Link></div></div>
    </section>
  </main>;
}
