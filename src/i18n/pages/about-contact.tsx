import Image from "next/image";
import Link from "next/link";
import { EmailActions } from "@/components/contact/email-actions";
import { ProfessionalSnapshot } from "@/components/profile/professional-snapshot";
import { profile } from "@/content/profile";
import { localePath, type Locale } from "@/i18n/config";

const copy: Record<Locale, {
  aboutEyebrow:string; aboutTitle:string; aboutLead:string; aboutText:string; projects:string; cv:string;
  workEyebrow:string; workTitle:string; workLead:string; workText:string;
  contactEyebrow:string; contactTitle:string; contactLead:string; choose:string; noForm:string;
  email:string; professional:string; code:string; resume:string; download:string;
}> = {
  en: {
    aboutEyebrow:"About me", aboutTitle:"Hi, I’m\nEduardo Merino.", aboutLead:"Software Engineer focused on building complete products from idea to release.",
    aboutText:"I work across frontend, backend, data, integrations, mobile and applied AI. I enjoy taking a real problem, understanding what matters and turning it into software that is useful, clear and reliable.",
    projects:"View projects", cv:"Download CV",
    workEyebrow:"What I work on", workTitle:"Products, systems\nand useful automation.", workLead:"My projects span vehicle telemetry, geospatial planning, AI workflows, career tooling and operational software.", workText:"The common thread is simple: I like owning the full path from understanding the problem to shipping something that works.",
    contactEyebrow:"Contact", contactTitle:"Let’s talk.", contactLead:"A role, a project, a collaboration or simply an interesting software problem — send me a message.",
    choose:"Choose the easiest way.", noForm:"No form. No long process.", email:"Email", professional:"Professional", code:"Code", resume:"Résumé", download:"Download CV",
  },
  es: {
    aboutEyebrow:"Sobre mí", aboutTitle:"Hola, soy\nEduardo Merino.", aboutLead:"Software Engineer enfocado en construir productos completos desde la idea hasta el release.",
    aboutText:"Trabajo entre frontend, backend, datos, integraciones, mobile e IA aplicada. Me gusta tomar un problema real, entender qué importa y convertirlo en software útil, claro y confiable.",
    projects:"Ver proyectos", cv:"Descargar CV",
    workEyebrow:"En qué trabajo", workTitle:"Productos, sistemas\ny automatización útil.", workLead:"Mis proyectos abarcan telemetría vehicular, planificación geoespacial, flujos con IA, herramientas de carrera y software operativo.", workText:"El hilo común es simple: me gusta asumir el recorrido completo, desde entender el problema hasta entregar algo que funciona.",
    contactEyebrow:"Contacto", contactTitle:"Hablemos.", contactLead:"Una oportunidad, un proyecto, una colaboración o simplemente un problema de software interesante — escríbeme.",
    choose:"Elige la forma más fácil.", noForm:"Sin formularios. Sin procesos largos.", email:"Correo", professional:"Profesional", code:"Código", resume:"CV", download:"Descargar CV",
  },
  pt: {
    aboutEyebrow:"Sobre mim", aboutTitle:"Olá, eu sou\nEduardo Merino.", aboutLead:"Software Engineer focado em construir produtos completos da ideia ao release.",
    aboutText:"Trabalho com frontend, backend, dados, integrações, mobile e IA aplicada. Gosto de pegar um problema real, entender o que importa e transformá-lo em software útil, claro e confiável.",
    projects:"Ver projetos", cv:"Baixar CV",
    workEyebrow:"No que trabalho", workTitle:"Produtos, sistemas\ne automação útil.", workLead:"Meus projetos abrangem telemetria veicular, planejamento geoespacial, fluxos com IA, ferramentas de carreira e software operacional.", workText:"O fio comum é simples: gosto de assumir o caminho completo, de entender o problema até entregar algo que funciona.",
    contactEyebrow:"Contato", contactTitle:"Vamos conversar.", contactLead:"Uma oportunidade, um projeto, uma colaboração ou simplesmente um problema de software interessante — fale comigo.",
    choose:"Escolha o caminho mais fácil.", noForm:"Sem formulário. Sem processo longo.", email:"E-mail", professional:"Profissional", code:"Código", resume:"CV", download:"Baixar CV",
  },
};

function Lines({ value }: { value: string }) {
  const [a,b] = value.split("\n");
  return <>{a}{b && <><br/>{b}</>}</>;
}

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container section about-intro">
      <div>
        <p className="eyebrow accent">{t.aboutEyebrow}</p>
        <h1><Lines value={t.aboutTitle}/></h1>
        <p className="lead">{t.aboutLead}</p>
        <p className="about-personal">{t.aboutText}</p>
        <div className="actions">
          <Link href={localePath(locale,"/systems")} className="button primary">{t.projects} <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="hero-secondary">{t.cv} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <figure className="about-portrait">
        <Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/>
        <figcaption>{profile.role} · {profile.specialty}</figcaption>
      </figure>
    </section>

    <section className="container recruiter-strip about-snapshot"><ProfessionalSnapshot locale={locale} education/></section>

    <section className="professional-section section">
      <div className="container split">
        <div><p className="eyebrow accent">{t.workEyebrow}</p><h2><Lines value={t.workTitle}/></h2></div>
        <div className="case-body"><p className="lead">{t.workLead}</p><p className="about-personal">{t.workText}</p><Link className="text-link" href={localePath(locale,"/systems")}>{t.projects} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>

    <section className="conversation section rule-top">
      <div className="container split"><div><p className="eyebrow accent">{t.contactEyebrow}</p><h2>{t.contactTitle}</h2></div><div className="professional-copy"><p className="lead">{t.contactLead}</p><Link href={localePath(locale,"/contact")} className="button primary">{t.contactEyebrow} <span aria-hidden="true">↗</span></Link></div></div>
    </section>
  </main>;
}

export function LocalizedContact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container contact-intro">
      <p className="eyebrow accent">{t.contactEyebrow}</p>
      <h1>{t.contactTitle}</h1>
      <div className="contact-opening"><p className="lead">{t.contactLead}</p><EmailActions locale={locale}/></div>
    </section>

    <section className="container section contact-channels">
      <div><h2>{t.choose}</h2><p className="muted">{t.noForm}</p></div>
      <nav aria-label="Contact channels">
        <a href={`mailto:${profile.email}`}><span>Direct</span><strong>{t.email} ↗</strong></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.professional}</span><strong>LinkedIn ↗</strong></a>
        <a href={profile.github} target="_blank" rel="noreferrer"><span>{t.code}</span><strong>GitHub ↗</strong></a>
        <a href={profile.cvDownload}><span>{t.resume}</span><strong>{t.download} ↓</strong></a>
      </nav>
    </section>
  </main>;
}
