import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

const copy: Record<Locale, { role: string; experience: string; location: string; education: string; resume: string; download: string }> = {
  en: { role: "Role", experience: "Professional", location: "Based in", education: "Education", resume: "Résumé", download: "Download CV" },
  es: { role: "Rol", experience: "Experiencia", location: "Base", education: "Educación", resume: "CV", download: "Descargar CV" },
  pt: { role: "Função", experience: "Experiência", location: "Base", education: "Formação", resume: "CV", download: "Baixar CV" },
};

export function ProfessionalSnapshot({ locale = "en", education = false }: { locale?: Locale; education?: boolean }) {
  const t = copy[locale];
  return <div className="professional-snapshot" aria-label={locale === "es" ? "Resumen profesional" : locale === "pt" ? "Resumo profissional" : "Professional snapshot"}>
    <div><span>{t.role}</span><strong>{profile.role} · Full Stack</strong></div>
    <div><span>{t.experience}</span><strong>{profile.experience}</strong></div>
    <div><span>{t.location}</span><strong>{profile.location}</strong></div>
    {education && <div><span>{t.education}</span><strong>{profile.education}</strong></div>}
    <a href={profile.cv} download><span>{t.resume}</span><strong>{t.download} ↓</strong></a>
  </div>;
}
