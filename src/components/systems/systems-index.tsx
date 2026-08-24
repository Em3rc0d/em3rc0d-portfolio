import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedPublicSystems } from "@/content/localized";
import {
  publicabilityLabel,
  systemStateLabel,
  type Locale,
} from "@/lib/i18n";

const copy = {
  en: {
    kicker: "BUILD ROOM / SYSTEMS",
    title: "Systems, not project tiles.",
    intro: "Four records. Four different engineering contexts. Inspect the system model, the responsibility I owned, and the evidence boundary behind each claim.",
    rolesAria: "System record roles",
    flagship: "FLAGSHIP / PERSONAL + R&D",
    professional: "PROFESSIONAL / ABSTRACTED",
    support: "FULL-STACK / SUPPORT",
    inspect: "Inspect system",
    pathAria: "system path",
  },
  es: {
    kicker: "BUILD ROOM / SISTEMAS",
    title: "Sistemas, no tarjetas de proyectos.",
    intro: "Cuatro registros. Cuatro contextos de ingeniería distintos. Inspecciona el modelo del sistema, la responsabilidad que asumí y el límite de evidencia detrás de cada afirmación.",
    rolesAria: "Roles de los registros de sistemas",
    flagship: "PRINCIPAL / PERSONAL + I+D",
    professional: "PROFESIONAL / ABSTRAÍDO",
    support: "FULL-STACK / SOPORTE",
    inspect: "Inspeccionar sistema",
    pathAria: "ruta del sistema",
  },
} as const;

export function SystemsIndex({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const publicSystems = getLocalizedPublicSystems(locale);

  return (
    <main className="build-room-shell systems-room-page">
      <section className="carbon-stage systems-room-frame narrative-frame" aria-labelledby="systems-room-title">
        <SiteHeader />
        <div className="systems-room-shell">
          <header className="systems-room-intro">
            <div><p className="technical-label">{text.kicker}</p><h1 id="systems-room-title">{text.title}</h1></div>
            <div className="systems-room-intro-copy">
              <p>{text.intro}</p>
              <div className="systems-room-legend" aria-label={text.rolesAria}>
                <span><i /> {text.flagship}</span>
                <span><i /> {text.professional}</span>
                <span><i /> {text.support}</span>
              </div>
            </div>
          </header>

          <div className="systems-room-grid">
            {publicSystems.map((system) => (
              <Link key={system.id} href={system.href!} className={`systems-room-card systems-room-card-${system.slug}`} aria-label={`${text.inspect} ${system.name}`}>
                <div className="systems-room-card-topline"><span>{system.id}</span><span>{system.label}</span><span>{system.role}</span></div>
                <div className="systems-room-card-main"><h2>{system.name}</h2><p>{system.summary}</p></div>
                <div className="systems-room-path" aria-label={`${system.name} ${text.pathAria}`}>
                  {system.path.map((step, index) => <span key={step} data-id={String(index + 1).padStart(2, "0")}>{step}</span>)}
                </div>
                <footer>
                  <span>{systemStateLabel(system.state, locale)}</span>
                  <span>{publicabilityLabel(system.publicability, locale)}</span>
                  <strong>{text.inspect} ↗</strong>
                </footer>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
