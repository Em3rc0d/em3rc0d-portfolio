import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

const copy: Record<Locale, {
  title: string; subtitle: string; profileLabel: string; profileText: string; experience: string; role: string; roleDetail: string;
  projects: string; education: string; educationDetail: string; skills: string; contact: string; back: string;
}> = {
  en: {
    title: "Eduardo Farid Merino Cordova", subtitle: "Software Engineer · Full Stack · Applied AI · Systems",
    profileLabel: "Professional profile", profileText: "Software Engineer building end-to-end products and systems across backend, frontend, mobile, data, automation and applied AI. I work from requirements and architecture through implementation, integration, deployment and production evolution, with an emphasis on maintainability, scalability, security and reliability.",
    experience: "Professional experience", role: "Full Stack Developer · Thradex Tech", roleDetail: "Lima, Peru · Feb 2025 — Present. End-to-end software development spanning architecture, APIs, web interfaces, SQL/NoSQL persistence, integrations, performance improvement, automation, applied AI, testing, CI/CD and containerization.",
    projects: "Selected engineering work", education: "Education", educationDetail: "Systems & Informatics Engineering · Universidad Nacional Mayor de San Marcos · Mar 2022 — Present · final stage · top third.",
    skills: "Technical scope", contact: "Contact", back: "Back to portfolio",
  },
  es: {
    title: "Eduardo Farid Merino Cordova", subtitle: "Software Engineer · Full Stack · Applied AI · Systems",
    profileLabel: "Perfil profesional", profileText: "Software Engineer que construye productos y sistemas end-to-end sobre backend, frontend, mobile, datos, automatización e IA aplicada. Trabajo desde requerimientos y arquitectura hasta implementación, integración, despliegue y evolución en producción, priorizando mantenibilidad, escalabilidad, seguridad y confiabilidad.",
    experience: "Experiencia profesional", role: "Full Stack Developer · Thradex Tech", roleDetail: "Lima, Perú · Feb. 2025 — Actualidad. Desarrollo de software end-to-end sobre arquitectura, APIs, interfaces web, persistencia SQL/NoSQL, integraciones, rendimiento, automatización, IA aplicada, testing, CI/CD y contenerización.",
    projects: "Ingeniería seleccionada", education: "Educación", educationDetail: "Ingeniería de Sistemas e Informática · Universidad Nacional Mayor de San Marcos · Mar. 2022 — Actualidad · etapa final · tercio superior.",
    skills: "Alcance técnico", contact: "Contacto", back: "Volver al portfolio",
  },
  pt: {
    title: "Eduardo Farid Merino Cordova", subtitle: "Software Engineer · Full Stack · Applied AI · Systems",
    profileLabel: "Perfil profissional", profileText: "Software Engineer construindo produtos e sistemas end-to-end em backend, frontend, mobile, dados, automação e IA aplicada. Trabalho de requisitos e arquitetura até implementação, integração, deploy e evolução em produção, priorizando manutenibilidade, escalabilidade, segurança e confiabilidade.",
    experience: "Experiência profissional", role: "Full Stack Developer · Thradex Tech", roleDetail: "Lima, Peru · Fev. 2025 — Presente. Desenvolvimento end-to-end envolvendo arquitetura, APIs, interfaces web, persistência SQL/NoSQL, integrações, desempenho, automação, IA aplicada, testes, CI/CD e conteinerização.",
    projects: "Engenharia selecionada", education: "Formação", educationDetail: "Engenharia de Sistemas e Informática · Universidad Nacional Mayor de San Marcos · Mar. 2022 — Presente · etapa final · terço superior.",
    skills: "Escopo técnico", contact: "Contato", back: "Voltar ao portfólio",
  },
};

const projects = [
  ["AutoPulse", "Android vehicle intelligence · live OBD-II telemetry · local-first sessions · integrity-aware history"],
  ["prodAgentic", "Governed agentic content production · editorial memory · novelty controls · human approval"],
  ["VIGIA", "Geospatial decision support · PostGIS/pgRouting · fixed-budget scenario comparison · auditability"],
  ["CV Engine", "ATS & career opportunity intelligence · evidence-first CV generation · RLS · applied AI"],
  ["TALOS", "Source-aware process intelligence · canonical models · semantic validation · durable execution on Temporal"],
  ["FinanceSensor", "Privacy-first financial telemetry R&D · Gmail/OAuth · canonical events · E2EE architecture"],
] as const;

export function LocalizedResume({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const home = locale === "en" ? "/" : `/${locale}`;
  return <main id="main-content" className="resume-page container" lang={locale} tabIndex={-1}>
    <header className="resume-header"><div><p className="eyebrow accent">Résumé / CV</p><h1>{t.title}</h1><p className="lead">{t.subtitle}</p></div><Link className="text-link resume-back" href={home}>← {t.back}</Link></header>
    <section className="resume-block"><p className="eyebrow">{t.profileLabel}</p><p>{t.profileText}</p></section>
    <section className="resume-grid"><div className="resume-block"><p className="eyebrow">{t.experience}</p><h2>{t.role}</h2><p>{t.roleDetail}</p></div><div className="resume-block"><p className="eyebrow">{t.education}</p><h2>UNMSM</h2><p>{t.educationDetail}</p></div></section>
    <section className="resume-block"><p className="eyebrow">{t.projects}</p><div className="resume-projects">{projects.map(([name,detail])=><article key={name}><h2>{name}</h2><p>{detail}</p></article>)}</div></section>
    <section className="resume-grid"><div className="resume-block"><p className="eyebrow">{t.skills}</p><p>Java · Spring Boot · Python · FastAPI · Node.js · TypeScript · Next.js · React · Angular · React Native · PostgreSQL/PostGIS · MongoDB · SQLite · Docker · GitHub Actions · AWS · Applied AI · OAuth/JWT/RLS · BLE/OBD-II</p></div><div className="resume-block"><p className="eyebrow">{t.contact}</p><p><a href={`mailto:${profile.email}`}>{profile.email}</a><br/><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/emerinoc</a><br/><a href={profile.github} target="_blank" rel="noreferrer">github.com/Em3rc0d</a><br/>{profile.location}</p></div></section>
  </main>;
}
