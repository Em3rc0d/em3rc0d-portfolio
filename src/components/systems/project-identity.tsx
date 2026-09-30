import { useId, type ComponentType, type ReactNode } from "react";
import type { SystemCase } from "@/content/systems/types";
import type { Locale } from "@/i18n/config";
import { getReputationPolish } from "@/i18n/polish";
import { SystemArtifact } from "./system-artifact";

type LabelProps = { x: number; y: number; children: ReactNode; accent?: boolean; small?: boolean; anchor?: "start" | "middle" | "end" };
function Label({ x, y, children, accent, small, anchor = "start" }: LabelProps) {
  return <text x={x} y={y} textAnchor={anchor} className={`identity-label${accent ? " identity-accent" : ""}${small ? " identity-small" : ""}`}>{children}</text>;
}
function Route({ d, soft = false, dashed = false }: { d: string; soft?: boolean; dashed?: boolean }) {
  return <path d={d} className={`identity-route${soft ? " identity-soft" : ""}`} strokeDasharray={dashed ? "4 6" : undefined}/>;
}
function Dot({ x, y, open = false }: { x: number; y: number; open?: boolean }) {
  return <circle cx={x} cy={y} r={open ? 5 : 3} className={open ? "identity-dot-open" : "identity-dot"}/>;
}
function PlateConstellation() {
  const sources = ["REGISTRY", "FINES", "CITV", "INSURANCE", "OWNERSHIP", "RISK FLAGS"];
  return <>
    <Label x={28} y={40} small>01 / DISTRIBUTED SOURCES</Label>
    <Route d="M86 202L220 79M86 202L220 127M86 202L220 175M86 202L220 223" soft/>
    <Route d="M86 202L220 271M86 202L220 319" dashed soft/>
    <circle cx="86" cy="202" r="35" className="identity-surface"/>
    <Label x={86} y={207} anchor="middle" accent>PLATE</Label>
    {sources.map((label, i) => <g key={label}>
      <Route d={`M232 ${79 + i * 48}L372 202`} soft={i > 3} dashed={i > 3}/>
      <Dot x={226} y={79 + i * 48} open={i > 3}/>
      <Label x={226} y={64 + i * 48} anchor="middle" small>{label}</Label>
    </g>)}
    <path d="M372 154L420 178V226L372 250L324 226V178Z" className="identity-surface"/>
    <Label x={372} y={196} anchor="middle" accent>CANONICAL</Label>
    <Label x={372} y={215} anchor="middle">REPORT</Label>
    <Route d="M420 202H483"/>
    <path d="M475 197L483 202L475 207" className="identity-route"/>
    <Label x={535} y={207} anchor="middle" accent>DECISION</Label>
    <Label x={372} y={282} anchor="middle" small>EVIDENCE CONVERGENCE</Label>
    <Route d="M28 355H572" soft/>
    <Label x={28} y={380} small>DASHED / VARIABLE COVERAGE</Label>
  </>;
}
function TelemetrySession() {
  const rows = [
    { name: "RPM", y: 90, before: "M100 95H137V81H173V98H213V87H275", after: "M349 91H392V77H429V88H486V81H567" },
    { name: "SPEED", y: 144, before: "M100 158H130L161 147H201L233 130H275", after: "M379 140H414L447 127H491L533 140H567" },
    { name: "TEMP", y: 198, before: "M100 207L158 202H202L248 196H275", after: "M349 196H407L450 190H506L567 193" },
    { name: "VOLTAGE", y: 252, before: "M100 249H137V257H180V245H221V253H275", after: "M349 251H393V246H448V254H506V247H567" },
  ];
  return <>
    <Label x={28} y={35} small>CAPTURE / VEHICLE CHANNELS</Label>
    <rect x="282" y="58" width="58" height="214" className="identity-window"/>
    {rows.map(row => <g key={row.name}>
      <Label x={28} y={row.y + 5} small>{row.name}</Label>
      <Route d={`M100 ${row.y}H567`} soft/>
      <Route d={row.before}/><Route d={row.after}/>
      <Route d={`M275 ${row.y}H349`} dashed soft/>
      <Dot x={275} y={row.y}/>
    </g>)}
    <Label x={311} y={290} anchor="middle" small>PARTIAL GAP</Label>
    <Route d="M156 272V316M465 272V316" soft/>
    <rect x="100" y="317" width="467" height="52" rx="3" className="identity-surface"/>
    <Label x={119} y={339} accent>SESSION / LOCAL STORE</Label>
    <Route d="M120 354H545"/>
    {[170, 245, 311, 382, 458, 533].map(x => <Dot key={x} x={x} y={354}/>)}
    <Label x={545} y={339} anchor="end" small>RECOVERY</Label>
    <Label x={100} y={394} small>PERSISTED HISTORY / CONTINUOUS</Label>
  </>;
}
function AcousticCorridor() {
  return <>
    <Label x={28} y={36} small>ENVIRONMENTAL AUDIO / TEMPORAL WINDOWS</Label>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={30 + i * 68} y="61" width="62" height="119" className="identity-window"/>)}
    <Route d="M30 121H568" soft/>
    {Array.from({ length: 83 }, (_, i) => {
      const height = 5 + Math.abs(Math.sin(i * 1.7)) * (i > 26 && i < 58 ? 46 : 14);
      return <path key={i} d={`M${34 + i * 6.4} ${121 - height}v${height * 2}`} className={i > 26 && i < 58 ? "identity-route" : "identity-route identity-soft"}/>;
    })}
    <Route d="M90 182V220H165"/>
    <rect x="165" y="199" width="144" height="43" className="identity-surface"/>
    <Label x={237} y={225} anchor="middle" accent>INFERENCE</Label>
    <Route d="M309 220H352V266"/>
    <rect x="187" y="267" width="381" height="73" className="identity-window"/>
    <Label x={202} y={286} small>TEMPORAL CONFIRMATION</Label>
    <Dot x={207} y={313} open/><Route d="M216 313H384" dashed/>
    <Label x={227} y={304} small>CANDIDATE EVENT</Label>
    <Dot x={397} y={313}/><Label x={412} y={304} small accent>CONFIRMED EVENT</Label>
    <Route d="M494 341V375H364"/>
    <Label x={350} y={380} anchor="end" accent>PUBLISH / MQTT</Label>
  </>;
}
function MatchMatrix() {
  const cells = [[2, 1, 0, 0], [1, 2, 1, 0], [0, 1, 2, 0], [0, 0, 1, 1]];
  return <>
    <Label x={28} y={39} small>EVIDENCE</Label>
    <Label x={568} y={39} anchor="end" small>OPPORTUNITY</Label>
    <Label x={300} y={73} anchor="middle" accent>MATCH / ASSESSMENT MATRIX</Label>
    {["WORK", "SKILLS", "RESULTS", "CONTEXT"].map((label, i) => <g key={label}>
      <Label x={28} y={127 + i * 45} small>{label}</Label>
      <Route d={`M106 ${122 + i * 45}H199M401 ${122 + i * 45}H484`} soft/>
      <Label x={568} y={127 + i * 45} anchor="end" small>{["ROLE", "STACK", "SCOPE", "NEEDS"][i]}</Label>
    </g>)}
    {cells.flatMap((row, y) => row.map((state, x) => <g key={`${x}-${y}`}>
      <rect x={207 + x * 48} y={102 + y * 45} width="39" height="36" className={`identity-cell identity-cell-${state}`}/>
      {state === 2 ? <path d={`M${219 + x * 48} ${120 + y * 45}l5 5 9-11`} className="identity-route"/> : state === 1 ? <path d={`M${219 + x * 48} ${120 + y * 45}h13`} className="identity-route"/> : <circle cx={226 + x * 48} cy={120 + y * 45} r="2" className="identity-muted-dot"/>}
    </g>))}
    <Label x={300} y={307} anchor="middle" small>✓ ALIGNED   /   − PARTIAL   /   · MISSING</Label>
    <Route d="M300 318V349"/>
    <path d="M191 349H409L426 374L409 399H191L174 374Z" className="identity-surface"/>
    <Label x={300} y={379} anchor="middle" accent>APPLICATION / PROJECTION</Label>
  </>;
}
function AuthorityChain() {
  const stages = ["SOURCE", "REVIEW", "APPROVAL", "EXECUTION PLAN", "TEMPORAL RUNTIME"];
  return <>
    <Label x={28} y={35} small>PROCESS AUTHORITY / CONTROLLED HANDOFFS</Label>
    <Route d="M48 77V361" soft/>
    {stages.map((label, i) => <g key={label}>
      <Label x={48} y={81 + i * 70} anchor="middle" small>{String(i + 1).padStart(2, "0")}</Label>
      <rect x="92" y={57 + i * 70} width="278" height="43" className="identity-surface"/>
      <Label x={110} y={83 + i * 70} accent={i === 2 || i === 4}>{label}</Label>
      {i < 4 && <Route d={`M231 ${100 + i * 70}V${127 + i * 70}`}/>}
      {i < 3 && <>
        <path d={`M231 ${104 + i * 70}l9 9-9 9-9-9Z`} className="identity-gate"/>
        <Route d={`M244 ${113 + i * 70}H400`} soft/>
        <Label x={416} y={118 + i * 70} small>{["G1 / PRESERVE", "G2 / REVIEW", "G3 / AUTHORIZE"][i]}</Label>
      </>}
    </g>)}
    <Route d="M370 358H553V288H389" dashed/>
    <Label x={569} y={322} anchor="end" small>DURABLE</Label>
    <Label x={92} y={400} small>EXECUTION FOLLOWS EXPLICIT APPROVAL</Label>
  </>;
}
function TerritoryGrid() {
  return <>
    <Label x={28} y={36} small>TERRITORY / CONSTRAINT LAYERS</Label>
    <g transform="translate(40 66)">
      <path d="M8 30L191 0L303 53L282 236L115 261L0 174Z" className="identity-surface"/>
      {Array.from({ length: 48 }, (_, i) => <rect key={i} x={22 + (i % 8) * 31} y={29 + Math.floor(i / 8) * 32} width="25" height="26" className={`identity-cell identity-cell-${[11, 12, 19, 20, 27, 28, 35].includes(i) ? 2 : 0}`}/>)}
      <path d="M12 167L81 144L132 162L181 118L270 97" className="identity-route"/>
      <path d="M188 23L156 80L188 126L144 233" className="identity-route" strokeDasharray="4 6"/>
      <Dot x={181} y={118}/>
    </g>
    <Route d="M344 179H385V110H409M385 179V255H409" soft/>
    {[0, 1].map(i => <g key={i}>
      <Label x={430} y={83 + i * 145} small>SCENARIO {i === 0 ? "A" : "B"}</Label>
      {[0, 1, 2, 3, 4, 5].map(j => <rect key={j} x={429 + j % 3 * 33} y={98 + i * 145 + Math.floor(j / 3) * 30} width="26" height="23" className={`identity-cell identity-cell-${(j + i) % 3 === 0 ? 2 : 0}`}/>)}
    </g>)}
    <Route d="M479 310V362H344"/>
    <Label x={329} y={368} anchor="end" accent>ALLOCATION</Label>
    <Label x={40} y={399} small>SCENARIO COMPARISON / NO LIVE MAP DATA</Label>
  </>;
}
function EditorialLoop() {
  return <>
    <Label x={28} y={36} small>EDITORIAL MEMORY / HUMAN AUTHORITY</Label>
    <path d="M168 102C27 100 27 304 168 304" className="identity-route"/>
    <path d="M169 304C291 304 291 102 169 102" className="identity-route" strokeDasharray="4 6"/>
    <path d="M160 95L169 102L159 108" className="identity-route"/>
    <Label x={168} y={193} anchor="middle" accent>MEMORY</Label>
    <Label x={168} y={214} anchor="middle" small>PRIOR TOPICS</Label>
    <Label x={168} y={233} anchor="middle" small>ANGLES / HISTORY</Label>
    <circle cx="168" cy="102" r="29" className="identity-surface"/>
    <Label x={168} y={107} anchor="middle">IDEA</Label>
    <Route d="M197 102H376"/>
    <path d="M376 67L433 102L376 137L319 102Z" className="identity-surface"/>
    <Label x={376} y={98} anchor="middle" accent>NOVELTY</Label>
    <Label x={376} y={116} anchor="middle" small>CHECK</Label>
    <Route d="M319 109L271 128" dashed/>
    <Route d="M376 137V201"/>
    <path d="M333 201H404L421 218V263H333Z M404 201V218H421" className="identity-surface"/>
    <Label x={377} y={239} anchor="middle">DRAFT</Label>
    <Route d="M377 263V328"/>
    <path d="M349 300H405M349 306H405" className="identity-route"/>
    <Label x={437} y={307} small>HUMAN GATE</Label>
    <Label x={377} y={352} anchor="middle" accent>APPROVE</Label>
    <Route d="M333 345H168V304" dashed/>
    <Label x={28} y={395} small>MEMORY INFORMS THE NEXT DRAFT</Label>
  </>;
}
function FinancialStack() {
  return <>
    <Label x={28} y={36} small>PRIVATE FINANCIAL SIGNALS / LAYERED BOUNDARY</Label>
    {["SOURCE A", "SOURCE B", "SOURCE C"].map((label, i) => <g key={label}>
      <Label x={130 + i * 170} y={81} anchor="middle" small>{label}</Label>
      <Route d={`M${130 + i * 170} 92V122L300 150`} soft/>
      <Dot x={130 + i * 170} y={92}/>
    </g>)}
    <path d="M84 160L300 124L516 160L300 196Z" className="identity-surface"/>
    <Label x={300} y={163} anchor="middle" accent>NORMALIZE</Label>
    <Route d="M84 161V197L300 234L516 197V161" soft/>
    <Label x={300} y={213} anchor="middle" small>CANONICAL EVENTS</Label>
    <rect x="60" y="246" width="480" height="66" rx="3" className="identity-window"/>
    <path d="M79 246V312M85 246V312M515 246V312M521 246V312" className="identity-route"/>
    <Label x={300} y={275} anchor="middle" accent>PROTECT / PRIVACY BOUNDARY</Label>
    <Label x={300} y={297} anchor="middle" small>CONTROLLED EXPOSURE</Label>
    <Route d="M300 234V246M300 313V359H471"/>
    <Dot x={471} y={359}/>
    <Label x={300} y={387} anchor="middle" accent>OBSERVE / SYSTEM HEALTH</Label>
  </>;
}


function WorkflowCertificationLane() {
  return <>
    <Label x={28} y={36} small>OUTCOME WORKFLOW / CERTIFICATION BOUNDARY</Label>
    <Route d="M58 112H542" soft/>
    {[
      { x: 78, title: "GOAL", sub: "USER OUTCOME" },
      { x: 224, title: "WORKFLOW", sub: "INPUT → PROCESS → OUTPUT" },
      { x: 378, title: "VERIFY", sub: "BEHAVIORAL RECEIPTS" },
      { x: 522, title: "REUSE", sub: "PORTABLE KIT" },
    ].map((stage, i) => <g key={stage.title}>
      <circle cx={stage.x} cy="112" r={i === 2 ? 30 : 24} className={i === 2 ? "identity-surface" : "identity-window"}/>
      <Label x={stage.x} y={116} anchor="middle" accent={i === 2}>{stage.title}</Label>
      <Label x={stage.x} y={156} anchor="middle" small>{stage.sub}</Label>
    </g>)}
    <Route d="M224 184V252H365" dashed soft/>
    <path d="M365 219H520V286H365Z" className="identity-surface"/>
    <Label x={442} y={245} anchor="middle" accent>PROMPT QUARRY</Label>
    <Label x={442} y={264} anchor="middle" small>INTERNAL FACTORY</Label>
    <Route d="M442 286V324H378" dashed/>
    <path d="M336 301L378 324L336 347L294 324Z" className="identity-gate"/>
    <Label x={336} y={329} anchor="middle" small>GATE</Label>
    <Route d="M294 324H151V252H224" dashed soft/>
    <Label x={28} y={383} small>GENERATED ≠ TESTED ≠ CERTIFIED</Label>
  </>;
}

function InfrastructureTopologyLens() {
  return <>
    <Label x={28} y={36} small>PHYSICAL INFRASTRUCTURE / OPERATIONAL CONTEXT</Label>
    <Route d="M96 85V323" soft/>
    {["SITE", "ZONE", "RACK", "EQUIPMENT"].map((label, i) => <g key={label}>
      <Dot x={96} y={101 + i * 68}/>
      <Route d={`M99 ${101 + i * 68}H188`} soft/>
      <Label x={201} y={106 + i * 68} small>{label}</Label>
    </g>)}
    <path d="M270 78L491 114L465 289L246 252Z" className="identity-surface"/>
    <path d="M294 102L443 126L425 168L315 151ZM280 181L377 170L429 198L391 243L296 235Z" className="identity-window"/>
    <Route d="M246 252L324 202L465 289M270 78L356 148L491 114" soft/>
    <circle cx="377" cy="170" r="43" className="identity-window"/>
    <circle cx="377" cy="170" r="6" className="identity-dot"/>
    <Route d="M408 201L488 301"/>
    <Label x={499} y={318} anchor="end" accent>OPERATIONS</Label>
    <Label x={377} y={177} anchor="middle" small>EQUIPMENT</Label>
    <Label x={28} y={382} small>HIERARCHY → SPACE → EQUIPMENT → OPERATIONS</Label>
  </>;
}

function RealtimeSyncRing() {
  const nodes = [
    { x: 300, y: 82, label: "BROWSER" },
    { x: 474, y: 206, label: "API" },
    { x: 300, y: 330, label: "PERSISTENCE" },
    { x: 126, y: 206, label: "REALTIME" },
  ];
  return <>
    <Label x={28} y={36} small>FULL-STACK STATE / ONLINE + OFFLINE CONTINUITY</Label>
    <circle cx="300" cy="206" r="142" className="identity-window"/>
    <Route d="M300 106C418 106 454 141 454 206C454 271 418 306 300 306C182 306 146 271 146 206C146 141 182 106 300 106"/>
    {nodes.map((node, i) => <g key={node.label}>
      <circle cx={node.x} cy={node.y} r="28" className="identity-surface"/>
      <Label x={node.x} y={node.y + 5} anchor="middle" accent={i === 1}>{node.label}</Label>
    </g>)}
    <path d="M213 116L236 89L263 116" className="identity-route"/>
    <path d="M448 161L480 170L462 195" className="identity-route"/>
    <path d="M387 296L364 323L337 296" className="identity-route"/>
    <path d="M152 251L120 242L138 217" className="identity-route"/>
    <path d="M243 166H357V246H243Z" className="identity-surface"/>
    <Label x={300} y={198} anchor="middle" accent>INCIDENT STATE</Label>
    <Label x={300} y={219} anchor="middle" small>SYNC / REPLAY</Label>
    <Route d="M244 246L186 286V355H269" dashed/>
    <Label x={28} y={371} small>OFFLINE QUEUE / IDEMPOTENCY KEY</Label>
  </>;
}

type Identity = { title: string; drawing: ComponentType; path: string[]; description: Record<Locale, string> };
const identities: Record<string, Identity> = {
  placaclara: { title: "Evidence Constellation", drawing: PlateConstellation, path: ["Plate", "Sources", "Evidence", "Report", "Decision"], description: {
    en: "A plate fans out to sources with variable coverage. Available evidence converges into a canonical report to support a decision.",
    es: "Una placa se consulta en fuentes de cobertura variable. La evidencia disponible converge en un reporte canónico para apoyar una decisión.",
    pt: "Uma placa consulta fontes de cobertura variável. As evidências disponíveis convergem em um relatório canônico para apoiar uma decisão.",
  } },
  autopulse: { title: "Telemetry Session Engine", drawing: TelemetrySession, path: ["Capture", "Persist", "Recover", "Understand"], description: {
    en: "Vehicle channels can degrade independently. A local session retains captured history through interruptions and recovery.",
    es: "Los canales del vehículo pueden degradarse por separado. La sesión local conserva la historia capturada durante interrupciones y recuperación.",
    pt: "Os canais do veículo podem degradar separadamente. A sessão local conserva o histórico capturado durante interrupções e recuperação.",
  } },
  echo: { title: "Acoustic Event Corridor", drawing: AcousticCorridor, path: ["Audio", "Inference", "Event", "Publish"], description: {
    en: "Environmental audio passes through AI inference and temporal confirmation before an event is published through MQTT.",
    es: "El audio ambiental pasa por inferencia de IA y confirmación temporal antes de publicar un evento mediante MQTT.",
    pt: "O áudio ambiental passa por inferência de IA e confirmação temporal antes da publicação de um evento por MQTT.",
  } },
  "cv-engine": { title: "Evidence Match Matrix", drawing: MatchMatrix, path: ["Evidence", "Opportunity", "Assessment", "Application"], description: {
    en: "Demonstrable evidence is compared with an opportunity. Aligned, partial and missing matches inform an application without inventing qualifications.",
    es: "La evidencia demostrable se compara con una oportunidad. Coincidencias completas, parciales y ausencias orientan una candidatura sin inventar competencias.",
    pt: "Evidências demonstráveis são comparadas com uma oportunidade. Correspondências completas, parciais e ausentes orientam uma candidatura sem inventar competências.",
  } },
  talos: { title: "Process Authority Chain", drawing: AuthorityChain, path: ["Source", "Review", "Approve", "Execute"], description: {
    en: "Source preservation, review and explicit approval gate the execution plan before durable Temporal runtime.",
    es: "Preservación de fuentes, revisión y aprobación explícita condicionan el plan de ejecución antes del runtime durable de Temporal.",
    pt: "Preservação de fontes, revisão e aprovação explícita condicionam o plano de execução antes do runtime durável do Temporal.",
  } },
  vigia: { title: "Territory Scenario Grid", drawing: TerritoryGrid, path: ["Territory", "Constraints", "Scenarios", "Allocation"], description: {
    en: "Territory and constraint overlays feed alternative allocation scenarios. The grid is schematic, not a live map.",
    es: "El territorio y sus restricciones alimentan escenarios alternativos de asignación. La cuadrícula es esquemática, no un mapa en vivo.",
    pt: "O território e suas restrições alimentam cenários alternativos de alocação. A grade é esquemática, não um mapa ao vivo.",
  } },
  prodagentic: { title: "Editorial Memory Loop", drawing: EditorialLoop, path: ["Idea", "Memory", "Novelty", "Draft", "Approve"], description: {
    en: "Editorial memory informs novelty checking and drafting. Human approval remains a distinct gate; the diagram does not imply external publication.",
    es: "La memoria editorial orienta la revisión de novedad y el borrador. La aprobación humana es una etapa propia; el diagrama no implica publicación externa.",
    pt: "A memória editorial orienta a revisão de novidade e o rascunho. A aprovação humana é uma etapa própria; o diagrama não implica publicação externa.",
  } },
  "prompt-machine": { title: "Workflow Certification Lane", drawing: WorkflowCertificationLane, path: ["Goal", "Workflow", "Verify", "Reuse"], description: {
    en: "A user goal becomes a reusable workflow only after verification. The internal Prompt Quarry feeds candidates without turning generation into certification.",
    es: "Un objetivo del usuario se convierte en workflow reutilizable solo después de verificación. Prompt Quarry alimenta candidatos sin convertir generación en certificación.",
    pt: "Um objetivo do usuário vira workflow reutilizável somente após verificação. Prompt Quarry alimenta candidatos sem transformar geração em certificação.",
  } },
  "infrastructure-site-mapper": { title: "Infrastructure Topology Lens", drawing: InfrastructureTopologyLens, path: ["Hierarchy", "Space", "Equipment", "Operations"], description: {
    en: "Infrastructure hierarchy is projected into spatial context so equipment can be located and operated without exposing private site topology.",
    es: "La jerarquía de infraestructura se proyecta en contexto espacial para ubicar y operar equipos sin exponer la topología privada del sitio.",
    pt: "A hierarquia de infraestrutura é projetada em contexto espacial para localizar e operar equipamentos sem expor a topologia privada do local.",
  } },
  gpets: { title: "Realtime Sync Ring", drawing: RealtimeSyncRing, path: ["Browser", "API", "Persistence", "Realtime"], description: {
    en: "Browser, API, persistence and realtime updates share one state loop, with an offline queue and idempotent replay as a separate recovery path.",
    es: "Browser, API, persistencia y actualizaciones realtime comparten un ciclo de estado, con cola offline y replay idempotente como ruta separada de recuperación.",
    pt: "Browser, API, persistência e atualizações realtime compartilham um ciclo de estado, com fila offline e replay idempotente como rota separada de recuperação.",
  } },
  "finance-sensor": { title: "Private Financial Signal Stack", drawing: FinancialStack, path: ["Signals", "Normalize", "Protect", "Observe"], description: {
    en: "Multiple inputs become canonical events. A privacy boundary separates financial signals from system observability.",
    es: "Múltiples entradas se convierten en eventos canónicos. Un límite de privacidad separa las señales financieras de la observabilidad del sistema.",
    pt: "Múltiplas entradas se tornam eventos canônicos. Um limite de privacidade separa os sinais financeiros da observabilidade do sistema.",
  } },
};

export function ProjectIdentity({ system, locale = "en" }: { system: SystemCase; locale?: Locale }) {
  const id = useId();
  const identity = identities[system.slug];
  if (!identity) return <SystemArtifact system={system} locale={locale}/>;
  const Drawing = identity.drawing;
  const copy = getReputationPolish(locale).artifact;
  return <figure className={`system-artifact project-identity identity-${system.slug}`}>
    <div className="artifact-topline"><span lang="en">{identity.title}</span><span aria-hidden="true">{system.id} / {copy.model}</span></div>
    <svg viewBox="0 0 600 420" role="img" aria-labelledby={`${id}-title ${id}-description`} focusable="false" lang="en">
      <title id={`${id}-title`}>{system.name} — {identity.title}</title>
      <desc id={`${id}-description`} lang={locale}>{identity.description[locale]}</desc>
      <defs><pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" className="identity-grid"/></pattern></defs>
      <rect width="600" height="420" fill={`url(#${id}-grid)`}/>
      <Drawing/>
    </svg>
    <figcaption><ol lang="en">{identity.path.map(step => <li key={step}>{step}</li>)}</ol><p>{identity.description[locale]}</p><p className="identity-boundary">{copy.conceptual} · {system.slug === "vigia" ? copy.coverageBoundary : copy.runtimeBoundary}</p></figcaption>
  </figure>;
}
