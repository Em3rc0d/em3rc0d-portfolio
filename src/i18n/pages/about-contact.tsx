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
    eyebrow:"About", title:"Hi, I’m Eduardo.", lead:"I like software that has to deal with reality.",
    body:"Connections drop. Providers disagree or return nothing. Models are uncertain. Payments and product outcomes can diverge. Those edges are where I enjoy engineering most: understanding what is actually true, making the boundary explicit, and building a product that still works.",
    current:"Full Stack Developer at Thradex Tech", education:"Systems & Informatics Engineering at UNMSM · final stage",
    focus:"Field systems · Product engineering · Applied AI", projects:"View projects", cv:"Download CV", contact:"Contact me",
    workTitle:"What I work with",
    areas:[
      {title:"Product engineering",body:"From requirements and architecture to implementation, deployment and iteration."},
      {title:"Backend & data",body:"APIs, services, SQL/NoSQL persistence, integrations and durable application behavior."},
      {title:"Web & mobile",body:"Interfaces that make the product understandable and useful on real devices."},
      {title:"Automation & AI",body:"Workflows that reduce repetitive work while keeping human control where it matters."},
    ],
  },
  es: {
    eyebrow:"Sobre mí", title:"Hola, soy Eduardo.", lead:"Me gusta el software que tiene que enfrentarse a la realidad.",
    body:"Las conexiones se caen. Los proveedores discrepan o no devuelven nada. Los modelos son inciertos. Un pago y el resultado del producto pueden separarse. Esos bordes son donde más disfruto la ingeniería: entender qué es realmente cierto, hacer explícito el límite y construir un producto que aun así funcione.",
    current:"Full Stack Developer en Thradex Tech", education:"Ingeniería de Sistemas e Informática en UNMSM · etapa final",
    focus:"Sistemas de campo · Ingeniería de producto · IA aplicada", projects:"Ver proyectos", cv:"Descargar CV", contact:"Contactarme",
    workTitle:"Con qué trabajo",
    areas:[
      {title:"Ingeniería de producto",body:"Desde requerimientos y arquitectura hasta implementación, despliegue e iteración."},
      {title:"Backend y datos",body:"APIs, servicios, persistencia SQL/NoSQL, integraciones y comportamiento durable."},
      {title:"Web y mobile",body:"Interfaces que hacen el producto entendible y útil en dispositivos reales."},
      {title:"Automatización e IA",body:"Flujos que reducen trabajo repetitivo manteniendo control humano cuando importa."},
    ],
  },
  pt: {
    eyebrow:"Sobre mim", title:"Olá, eu sou Eduardo.", lead:"Gosto de software que precisa lidar com a realidade.",
    body:"Conexões caem. Provedores discordam ou não retornam nada. Modelos são incertos. Pagamento e resultado do produto podem divergir. É nessas bordas que mais gosto de engenharia: entender o que é realmente verdadeiro, tornar o limite explícito e construir um produto que ainda assim funcione.",
    current:"Full Stack Developer na Thradex Tech", education:"Engenharia de Sistemas e Informática na UNMSM · etapa final",
    focus:"Sistemas de campo · Engenharia de produto · IA aplicada", projects:"Ver projetos", cv:"Baixar CV", contact:"Entrar em contato",
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
    rolesTitle: string; rolesText: string; rolesCta: string; rolesSubject: string;
    projectsTitle: string; projectsText: string; projectsCta: string; projectsSubject: string;
  }> = {
    en: {
      eyebrow: "Contact", title: "Hire or collaborate with Em3rc0d.", lead: "I’m Eduardo Merino. If you are hiring a software engineer or exploring a scoped software project, choose the route that fits your needs.",
      email: "Email", linkedin: "LinkedIn", github: "GitHub",
      note: "You do not need a polished brief. A few lines about what you are working on, what you need and what a useful result would look like are enough.",
      cv: "Download CV",
      rolesTitle: "Hiring a software engineer?", rolesText: "For an engineering role, share the position, team, working arrangement and interview process. See my CV and selected projects for evidence of my work.",
      rolesCta: "Discuss an engineering role", rolesSubject: "Engineering opportunity — Eduardo Merino (Em3rc0d)",
      projectsTitle: "Planning a software project?", projectsText: "For software delivery or technical collaboration, share the business problem, expected outcome, constraints and an approximate timeline. We can first check scope and availability.",
      projectsCta: "Discuss a software project", projectsSubject: "Software project inquiry — Em3rc0d",
    },
    es: {
      eyebrow: "Contacto", title: "Contrata o colabora con Em3rc0d.", lead: "Soy Eduardo Merino. Si buscas contratar a un ingeniero de software o desarrollar un proyecto, elige la opción que corresponda a tu necesidad.",
      email: "Correo", linkedin: "LinkedIn", github: "GitHub",
      note: "No necesitas un brief perfecto. Bastan unas líneas sobre qué estás haciendo, qué necesitas y cómo se vería un buen resultado.",
      cv: "Descargar CV",
      rolesTitle: "¿Buscas un ingeniero de software?", rolesText: "Comparte el puesto, el equipo, la modalidad de trabajo y las etapas del proceso. Puedes revisar mi CV y proyectos para evaluar mi experiencia.",
      rolesCta: "Proponer una oportunidad laboral", rolesSubject: "Oportunidad laboral — Eduardo Merino (Em3rc0d)",
      projectsTitle: "¿Necesitas un sistema o proyecto?", projectsText: "Cuéntame el problema del negocio, el resultado esperado, las restricciones y un plazo aproximado. Primero podemos validar el alcance y la disponibilidad.",
      projectsCta: "Consultar por un proyecto de software", projectsSubject: "Consulta de proyecto de software — Em3rc0d",
    },
    pt: {
      eyebrow: "Contato", title: "Contrate ou colabore com Em3rc0d.", lead: "Sou Eduardo Merino. Se você está contratando um engenheiro de software ou planejando um projeto, escolha a opção adequada.",
      email: "E-mail", linkedin: "LinkedIn", github: "GitHub",
      note: "Você não precisa de um briefing perfeito. Algumas linhas sobre o que está fazendo, o que precisa e como seria um bom resultado já bastam.",
      cv: "Baixar CV",
      rolesTitle: "Procurando um engenheiro de software?", rolesText: "Compartilhe a vaga, a equipe, o modelo de trabalho e as etapas da seleção. Consulte meu currículo e meus projetos para avaliar a experiência.",
      rolesCta: "Conversar sobre uma vaga", rolesSubject: "Oportunidade de engenharia — Eduardo Merino (Em3rc0d)",
      projectsTitle: "Precisa de um sistema ou projeto?", projectsText: "Descreva o problema de negócio, o resultado esperado, as restrições e um prazo aproximado. Podemos primeiro avaliar escopo e disponibilidade.",
      projectsCta: "Conversar sobre um projeto de software", projectsSubject: "Consulta de projeto de software — Em3rc0d",
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
          <div className="capability-list" data-testid="engagement-paths">
            <section className="simple-about-area">
              <h2>{t.rolesTitle}</h2><p>{t.rolesText}</p>
              <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(t.rolesSubject)}`}>{t.rolesCta} <span aria-hidden="true">↗</span></a>
            </section>
            <section className="simple-about-area">
              <h2>{t.projectsTitle}</h2><p>{t.projectsText}</p>
              <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(t.projectsSubject)}`}>{t.projectsCta} <span aria-hidden="true">↗</span></a>
            </section>
          </div>
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
