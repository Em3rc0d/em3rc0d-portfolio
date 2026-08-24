import type { Metadata } from "next";
import Link from "next/link";
import { StartupHero } from "@/components/home/startup-hero";
import {
  getLocalizedEvidenceRecords,
  getLocalizedPublicSystems,
} from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";

export const metadata: Metadata = {
  title: "Sistemas de Software e IA Aplicada",
  description:
    "Desarrollador de software que convierte problemas operativos complejos en sistemas funcionales, productos full stack e IA aplicada con evidencia inspeccionable.",
  alternates: bilingualAlternates("/", "es"),
};

const clientPaths = [
  ["01", "CONSTRUIR", "Convertir un problema operativo o una idea de producto en una ruta de software funcional."],
  ["02", "RECUPERAR", "Entender un producto, código o flujo existente antes de decidir qué debería cambiar."],
  ["03", "MEJORAR", "Hacer que un flujo fragmentado o frágil sea más fácil de operar, verificar y evolucionar."],
  ["04", "IA APLICADA", "Añadir IA sin perder grounding, procedencia, comportamiento ante fallas ni control humano."],
] as const;

const operatingSequence = [
  ["01", "RECUPERAR", "Entender lo que existe realmente."],
  ["02", "MODELAR", "Separar estados, responsabilidades y límites."],
  ["03", "DISEÑAR", "Elegir qué debe ser explícito antes de construir."],
  ["04", "CONSTRUIR", "Implementar el menor sistema que preserve esas decisiones."],
  ["05", "VERIFICAR", "Conectar afirmaciones con código, pruebas, navegador o campo."],
] as const;

export default function SpanishHome() {
  const flagshipSystems = getLocalizedPublicSystems("es").filter((system) => system.role === "FLAGSHIP");
  const evidence = getLocalizedEvidenceRecords("es");
  const featuredEvidence = ["E-AP-03", "E-CV-03", "E-CV-12"]
    .map((id) => evidence.find((record) => record.id === id))
    .filter((record) => record !== undefined);

  return (
    <main className="build-room-shell home-v2">
      <StartupHero />

      <section className="home-client-paths narrative-frame" aria-labelledby="client-paths-title">
        <div className="home-client-paths-intro">
          <p className="technical-label">PROBLEMAS DEL CLIENTE / ENTRADA</p>
          <h2 id="client-paths-title">¿Qué puedo ayudarte a hacer funcionar?</h2>
          <p>
            No necesitas llegar con una arquitectura cerrada ni con un brief perfecto.
            Empieza por el problema operativo y el estado actual.
          </p>
        </div>
        <div className="home-client-paths-grid">
          {clientPaths.map(([id, title, detail]) => (
            <article key={id}>
              <span>{id}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <Link className="home-client-paths-link" href="/es/contact">
          Empezar por el problema →
        </Link>
      </section>

      <section className="systems-runway home-v2-systems narrative-frame" aria-labelledby="systems-heading">
        <header className="section-heading-row">
          <div>
            <p className="technical-label">SISTEMAS SELECCIONADOS</p>
            <h2 id="systems-heading">Mira la ingeniería en sistemas funcionales.</h2>
          </div>
          <p>
            Dos casos principales muestran el modelo del sistema, decisiones, implementación,
            evidencia y límites actuales sin convertir el portfolio en una lista de tecnologías.
          </p>
        </header>

        <div className="system-records">
          {flagshipSystems.map((system) => (
            <article className="system-record" key={system.id}>
              <div className="system-record-index">
                <span>{system.id}</span>
                <span>{system.label}</span>
              </div>
              <div className="system-record-main">
                <h3>{system.name}</h3>
                <p>{system.summary}</p>
                <div className="system-path" aria-label={`Ruta del sistema ${system.name}`}>
                  {system.path.map((step, index) => (
                    <span key={step}>{step}{index < system.path.length - 1 ? <i aria-hidden="true" /> : null}</span>
                  ))}
                </div>
              </div>
              <div className="system-record-meta">
                <dl>
                  <div><dt>ROL</dt><dd>{system.ownership}</dd></div>
                  <div><dt>ESTADO</dt><dd>{system.state.replaceAll("_", " ")}</dd></div>
                  <div><dt>PUBLICABILIDAD</dt><dd>{system.publicability}</dd></div>
                </dl>
                <Link className="inspect-link" href={system.href!}>Inspeccionar sistema ↗</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-operating-model narrative-frame" aria-labelledby="operating-model-title">
        <div className="home-operating-model-copy">
          <p className="technical-label">MODELO DE TRABAJO</p>
          <h2 id="operating-model-title">De una realidad desordenada a software inspeccionable.</h2>
          <p>
            La secuencia cambia según el problema, pero las responsabilidades no se mezclan para
            aparentar avance. Comprender, modelar y verificar siguen siendo trabajo de ingeniería.
          </p>
        </div>
        <div className="home-operating-sequence">
          {operatingSequence.map(([id, title, detail]) => (
            <div key={id}><span>{id}</span><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>
      </section>

      <section className="paper-stage home-evidence-stage narrative-frame" aria-labelledby="evidence-heading">
        <div className="paper-registration" aria-hidden="true"><span>+</span><span>+</span></div>
        <div className="paper-copy">
          <p className="technical-label ink-label">EVIDENCIA / NO CONFIANZA PRESTADA</p>
          <h2 id="evidence-heading">Las afirmaciones deberían poder inspeccionarse.</h2>
          <p>
            Cada registro separa lo que el artefacto respalda de lo que no puede establecer.
            Código, pruebas, ejecución en navegador y campo son niveles distintos de evidencia.
          </p>
          <Link className="paper-link" href="/es/evidence">Abrir Evidence Library →</Link>
        </div>
        <div className="home-evidence-stack">
          {featuredEvidence.map((record) => (
            <Link className="evidence-sample" href={`/es/evidence/${record.slug}`} key={record.id}>
              <span className="evidence-id">{record.id}</span>
              <strong>{record.title}</strong>
              <p>{record.claim}</p>
              <dl>
                <div><dt>ESTADO</dt><dd>{record.state.replaceAll("_", " ")}</dd></div>
                <div><dt>LÍMITE</dt><dd>{record.limitations}</dd></div>
              </dl>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-conversion narrative-frame" aria-labelledby="home-conversion-title">
        <div>
          <p className="technical-label">SIGUIENTE / CONVERSACIÓN</p>
          <h2 id="home-conversion-title">¿Tienes un sistema difícil de entender, construir o mejorar?</h2>
        </div>
        <div>
          <p>
            Empieza con lo que existe, lo que está fallando y lo que debería volverse posible.
            Podemos llegar a la arquitectura después.
          </p>
          <Link href="/es/contact">Iniciar una conversación →</Link>
        </div>
      </section>
    </main>
  );
}
