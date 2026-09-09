import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

type SnapshotCopy = {
  role: string;
  experience: string;
  experienceValue: string;
  location: string;
  locationValue: string;
  education: string;
  educationValue: string;
  resume: string;
  open: string;
};

const copy: Record<Locale, SnapshotCopy> = {
  en: {
    role: "Role",
    experience: "Professional",
    experienceValue: profile.experience,
    location: "Based in",
    locationValue: profile.location,
    education: "Education",
    educationValue: profile.education,
    resume: "Résumé",
    open: "View résumé",
  },
  es: {
    role: "Rol",
    experience: "Experiencia",
    experienceValue: "Desarrollo profesional de software desde feb. 2025",
    location: "Base",
    locationValue: "Lima, Perú",
    education: "Educación",
    educationValue: "Ing. de Sistemas e Informática · etapa final",
    resume: "CV",
    open: "Ver CV",
  },
  pt: {
    role: "Função",
    experience: "Experiência",
    experienceValue: "Desenvolvimento profissional de software desde fev. 2025",
    location: "Base",
    locationValue: "Lima, Peru",
    education: "Formação",
    educationValue: "Eng. de Sistemas e Informática · etapa final",
    resume: "CV",
    open: "Ver CV",
  },
};

export function ProfessionalSnapshot({ locale = "en", education = false }: { locale?: Locale; education?: boolean }) {
  const t = copy[locale];
  const href = locale === "en" ? profile.cv : `/${locale}${profile.cv}`;
  return <div className="professional-snapshot" aria-label={locale === "es" ? "Resumen profesional" : locale === "pt" ? "Resumo profissional" : "Professional snapshot"}>
    <div><span>{t.role}</span><strong>{profile.role} · Full Stack</strong></div>
    <div><span>{t.experience}</span><strong>{t.experienceValue}</strong></div>
    <div><span>{t.location}</span><strong>{t.locationValue}</strong></div>
    {education && <div><span>{t.education}</span><strong>{t.educationValue}</strong></div>}
    <Link href={href}><span>{t.resume}</span><strong>{t.open} ↗</strong></Link>
  </div>;
}
