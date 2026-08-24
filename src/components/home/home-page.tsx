import Link from "next/link";
import { StartupHero } from "@/components/home/startup-hero";
import {
  getLocalizedEvidenceRecords,
  getLocalizedPublicSystems,
} from "@/content/localized";
import {
  evidenceStateLabel,
  localizedHref,
  publicabilityLabel,
  systemStateLabel,
  type Locale,
} from "@/lib/i18n";

const copy = {
  en: {
    clientKicker: "CLIENT PROBLEMS / 01",
    clientTitle: "What can I help you make work?",
    clientBody:
      "You do not need a perfect brief or a service package. Start with the operational problem, the product that already exists, or the outcome that needs to become reliable.",
    clientCta: "Start with your situation ↗",
    paths: [
      ["01", "BUILD", "Build custom software systems from operational problems, manual workflows, or product ideas with clear boundaries and ownership."],
      ["02", "RECOVER", "Recover existing products and codebases before changing them: behavior, architecture, dependencies, risks, and missing evidence."],
      ["03", "IMPROVE", "Improve fragmented workflows and integrations so software becomes easier to operate, verify, integrate, and evolve."],
      ["04", "APPLIED AI", "Add AI inside real products while keeping product truth, provenance, failure behavior, and human control explicit."],
    ],
    systemsKicker: "SELECTED SYSTEMS / 02",
    systemsTitle: "See the engineering in working systems.",
    systemsBody:
      "These are not technology lists. Each system exposes the problem, the operating model, engineering decisions, failure behavior, and evidence behind what I claim.",
    systemLabel: "SYSTEM",
    artifactLabel: "INSPECTABLE ARTIFACTS",
    artifactAria: "engineering artifact preview",
    role: "ROLE",
    publicability: "PUBLICABILITY",
    proofRoute: "PROOF ROUTE",
    selectedRecords: "selected records",
    inspectSystem: "Inspect system",
    workingKicker: "WORKING MODEL / 03",
    workingTitle: "From messy reality to inspectable software.",
    workingBody:
      "Once the problem is clear, the method becomes useful. I recover what is real, define boundaries, model the system, build the smallest coherent path, verify the claims, and evolve from new evidence.",
    operating: [
      ["01", "RECOVER", "Understand what actually exists before proposing what should exist."],
      ["02", "BOUND", "Separate actors, ownership, state, source truth and responsibility."],
      ["03", "MODEL", "Turn operational reality into explicit system objects and relationships."],
      ["04", "BUILD", "Implement the smallest coherent path with one visible responsibility."],
      ["05", "VERIFY", "Use source, tests, browser proof or field evidence appropriate to the claim."],
      ["06", "EVOLVE", "Keep the system honest as new evidence changes what should happen next."],
    ],
    evidenceKicker: "CARBON → PAPER / EVIDENCE",
    evidenceTitle: "Claims should be inspectable.",
    evidenceBody:
      "Decisions, source artifacts, tests, recovery behavior and limitations are first-class portfolio objects. If I say a system behaves a certain way, you can follow the route to the proof behind that statement.",
    evidenceCta: "Open evidence library ↗",
    sampleAria: "Open AutoPulse orphaned-session recovery evidence",
    startKicker: "START / 07",
    startTitle: "Have a system that is difficult to understand, build, or improve?",
    startBody:
      "Start with the situation. I can help turn the operating reality into a software path we can inspect, build, and verify deliberately.",
    startCta: "Start a conversation ↗",
    aboutCta: "About the builder ↗",
  },
  es: {
    clientKicker: "PROBLEMAS DEL CLIENTE / 01",
    clientTitle: "¿Qué puedo ayudarte a hacer funcionar?",
    clientBody:
      "No necesitas un brief perfecto ni elegir un paquete de servicios. Empieza por el problema operativo, el producto que ya existe o el resultado que necesita volverse confiable.",
    clientCta: "Empezar con tu situación ↗",
    paths: [
      ["01", "CONSTRUIR", "Construir sistemas de software a medida desde problemas operativos, flujos manuales o ideas de producto con límites y responsabilidades claras."],
      ["02", "RECUPERAR", "Recuperar productos y bases de código existentes antes de cambiarlos: comportamiento, arquitectura, dependencias, riesgos y evidencia faltante."],
      ["03", "MEJORAR", "Mejorar flujos e integraciones fragmentadas para que el software sea más fácil de operar, verificar, integrar y evolucionar."],
      ["04", "IA APLICADA", "Añadir IA dentro de productos reales manteniendo explícitos la verdad del producto, procedencia, fallas y control humano."],
    ],
    systemsKicker: "SISTEMAS SELECCIONADOS / 02",
    systemsTitle: "Mira la ingeniería en sistemas funcionales.",
    systemsBody:
      "No son listas de tecnologías. Cada sistema expone el problema, el modelo operativo, decisiones de ingeniería, comportamiento ante fallas y la evidencia detrás de lo que afirmo.",
    systemLabel: "SISTEMA",
    artifactLabel: "ARTEFACTOS INSPECCIONABLES",
    artifactAria: "vista previa del artefacto de ingeniería",
    role: "ROL",
    publicability: "PUBLICABILIDAD",
    proofRoute: "RUTA DE EVIDENCIA",
    selectedRecords: "registros seleccionados",
    inspectSystem: "Inspeccionar sistema",
    workingKicker: "MODELO DE TRABAJO / 03",
    workingTitle: "De una realidad desordenada a software inspeccionable.",
    workingBody:
      "Cuando el problema está claro, el método se vuelve útil. Recupero lo real, defino límites, modelo el sistema, construyo la ruta coherente más pequeña, verifico las afirmaciones y evoluciono con nueva evidencia.",
    operating: [
      ["01", "RECUPERAR", "Entender qué existe realmente antes de proponer qué debería existir."],
      ["02", "DELIMITAR", "Separar actores, propiedad, estado, fuente de verdad y responsabilidad."],
      ["03", "MODELAR", "Convertir la realidad operativa en objetos y relaciones explícitas del sistema."],
      ["04", "CONSTRUIR", "Implementar la ruta coherente más pequeña con una responsabilidad visible."],
      ["05", "VERIFICAR", "Usar fuente, pruebas, navegador o evidencia de campo según lo que afirma el claim."],
      ["06", "EVOLUCIONAR", "Mantener el sistema honesto cuando nueva evidencia cambia lo que debe ocurrir después."],
    ],
    evidenceKicker: "CARBONO → PAPEL / EVIDENCIA",
    evidenceTitle: "Las afirmaciones deberían poder inspeccionarse.",
    evidenceBody:
      "Decisiones, artefactos fuente, pruebas, comportamiento de recuperación y limitaciones son objetos de primera clase en el portfolio. Si afirmo que un sistema se comporta de cierta forma, puedes seguir la ruta hasta la evidencia detrás de esa afirmación.",
    evidenceCta: "Abrir biblioteca de evidencia ↗",
    sampleAria: "Abrir evidencia de recuperación de sesión huérfana de AutoPulse",
    startKicker: "INICIO / 07",
    startTitle: "¿Tienes un sistema difícil de entender, construir o mejorar?",
    startBody:
      "Empieza con la situación. Puedo ayudar a convertir la realidad operativa en una ruta de software que podamos inspeccionar, construir y verificar deliberadamente.",
    startCta: "Iniciar una conversación ↗",
    aboutCta: "Acerca del builder ↗",
  },
} as const;

const proofIds = {
  autopulse: ["E-AP-03", "E-AP-06", "E-AP-08"],
  "cv-engine": ["E-CV-01", "E-CV-03", "E-CV-05"],
} as const;

export function HomePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const systems = getLocalizedPublicSystems(locale).filter((system) => system.role === "FLAGSHIP");
  const evidenceRecords = getLocalizedEvidenceRecords(locale);

  return (
    <main className="build-room-shell">
      <div className="calibration-rail" aria-hidden="true">
        <span>00</span><i /><span>100</span>
      </div>

      <StartupHero />

      <section className="client-paths narrative-frame" aria-labelledby="client-paths-heading">
        <header className="client-paths-heading">
          <p className="technical-label">{text.clientKicker}</p>
          <h2 id="client-paths-heading">{text.clientTitle}</h2>
          <p>{text.clientBody}</p>
          <Link href={localizedHref("/contact", locale)}>{text.clientCta}</Link>
        </header>
        <div className="client-path-grid">
          {text.paths.map(([id, title, detail]) => (
            <article key={id} data-index={id}><h3>{title}</h3><p>{detail}</p></article>
          ))}
        </div>
      </section>

      <section className="systems-runway systems-runway-v2" aria-labelledby="systems-heading">
        <div className="section-heading-row systems-commercial-heading">
          <div><p className="technical-label">{text.systemsKicker}</p><h2 id="systems-heading">{text.systemsTitle}</h2></div>
          <p>{text.systemsBody}</p>
        </div>

        <div className="system-records system-records-v2">
          {systems.map((system) => {
            const ids = proofIds[system.slug as keyof typeof proofIds] ?? [];
            const evidence = ids.map((id) => evidenceRecords.find((item) => item.id === id)).filter((item) => item !== undefined);
            return (
              <article className={`system-record system-encounter-record narrative-frame is-${system.slug}`} key={system.id}>
                <div className="system-record-index"><span>{system.id}</span><span>{system.label}</span></div>
                <div className="system-record-main">
                  <div className="system-title-row">
                    <div><p className="system-encounter-kicker">{text.systemLabel} / {system.id}</p><h3>{system.name}</h3></div>
                    <span className="system-role-state">{systemStateLabel(system.state, locale)}</span>
                  </div>
                  <p>{system.summary}</p>
                  <div className={`system-artifact-stage artifact-${system.slug}`} aria-label={`${system.name} ${text.artifactAria}`}>
                    <div className="artifact-system-path">
                      {system.path.map((step, index) => (
                        <span className="artifact-path-step" key={step} data-id={String(index + 1).padStart(2, "0")} data-label={step} data-terminal={index === system.path.length - 1 ? "true" : "false"} aria-label={`${String(index + 1).padStart(2, "0")} ${step}`} />
                      ))}
                    </div>
                    <div className="artifact-evidence-ledger">
                      <p>{text.artifactLabel}</p>
                      {evidence.map((item) => (
                        <Link href={localizedHref(`/evidence/${item.slug}`, locale)} key={item.id} data-id={item.id} data-state={evidenceStateLabel(item.state, locale)} aria-label={`${item.id}: ${item.title}. ${evidenceStateLabel(item.state, locale)}`}>{item.title}</Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="system-record-meta">
                  <dl>
                    <div><dt>{text.role}</dt><dd>{system.ownership}</dd></div>
                    <div><dt>{text.publicability}</dt><dd>{publicabilityLabel(system.publicability, locale)}</dd></div>
                    <div><dt>{text.proofRoute}</dt><dd>{evidence.length} {text.selectedRecords}</dd></div>
                  </dl>
                  {system.href ? <Link href={system.href} className="inspect-link">{text.inspectSystem} <span aria-hidden="true">↗</span></Link> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="operating-model narrative-frame" aria-labelledby="operating-model-heading">
        <div className="operating-model-intro"><p className="technical-label">{text.workingKicker}</p><h2 id="operating-model-heading">{text.workingTitle}</h2><p>{text.workingBody}</p></div>
        <ol className="operating-model-sequence">
          {text.operating.map(([id, title, detail]) => <li key={id} data-id={id} data-title={title} aria-label={`${id} ${title}. ${detail}`}>{detail}</li>)}
        </ol>
      </section>

      <section className="paper-stage paper-stage-v2 narrative-frame" aria-labelledby="evidence-heading">
        <div className="paper-copy"><p className="technical-label ink-label">{text.evidenceKicker}</p><h2 id="evidence-heading">{text.evidenceTitle}</h2><p>{text.evidenceBody}</p><Link href={localizedHref("/evidence", locale)} className="paper-link">{text.evidenceCta}</Link></div>
        {(() => {
          const sample = evidenceRecords.find((record) => record.id === "E-AP-06");
          return sample ? <Link href={localizedHref(`/evidence/${sample.slug}`, locale)} className="evidence-sample evidence-sample-v2 evidence-sample-compact" aria-label={text.sampleAria}><strong>{sample.id} · {sample.title}</strong><p>{sample.claim}</p></Link> : null;
        })()}
      </section>

      <section className="home-conversion narrative-frame" aria-labelledby="home-conversion-heading">
        <p className="technical-label">{text.startKicker}</p>
        <h2 id="home-conversion-heading">{text.startTitle}</h2>
        <p>{text.startBody}</p>
        <div className="home-conversion-actions"><Link href={localizedHref("/contact", locale)} className="home-conversion-primary">{text.startCta}</Link><Link href={localizedHref("/about", locale)}>{text.aboutCta}</Link></div>
      </section>
    </main>
  );
}
