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
    experience: "Experience",
    experienceValue: profile.experience,
    location: "Location",
    locationValue: profile.location,
    education: "Education",
    educationValue: profile.education,
    resume: "CV",
    open: "Download PDF",
  },
  es: {
    role: "Rol",
    experience: "Experiencia",
    experienceValue: "Desarrollo profesional de software desde feb. 2025",
    location: "Ubicación",
    locationValue: "Lima, Perú",
    education: "Educación",
    educationValue: "Ing. de Sistemas e Informática · etapa final",
    resume: "CV",
    open: "Descargar PDF",
  },
  pt: {
    role: "Função",
    experience: "Experiência",
    experienceValue: "Desenvolvimento profissional de software desde fev. 2025",
    location: "Localização",
    locationValue: "Lima, Peru",
    education: "Formação",
    educationValue: "Eng. de Sistemas e Informática · etapa final",
    resume: "CV",
    open: "Baixar PDF",
  },
};

export function ProfessionalSnapshot({ locale = "en", education = false }: { locale?: Locale; education?: boolean }) {
  const t = copy[locale];
  return <div className="professional-snapshot" aria-label={locale === "es" ? "Resumen profesional" : locale === "pt" ? "Resumo profissional" : "Professional snapshot"}>
    <div><span>{t.role}</span><strong>{profile.role} · Full Stack</strong></div>
    <div><span>{t.experience}</span><strong>{t.experienceValue}</strong></div>
    <div><span>{t.location}</span><strong>{t.locationValue}</strong></div>
    {education && <div><span>{t.education}</span><strong>{t.educationValue}</strong></div>}
    <a href={profile.cvDownload}><span>{t.resume}</span><strong>{t.open} ↓</strong></a>
  </div>;
}
