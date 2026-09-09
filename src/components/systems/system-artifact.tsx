import type { SystemCase } from "@/content/systems/types";
import type { Locale } from "@/i18n/config";
import { getReputationPolish } from "@/i18n/polish";

export function SystemArtifact({ system, locale = "en" }: { system: SystemCase; locale?: Locale }) {
  const id = `artifact-${system.slug}`;
  const copy = getReputationPolish(locale).artifact;
  return <figure className={`system-artifact artifact-${system.artifact}`} data-accent={system.accent}>
    <div className="artifact-topline"><span>{system.category}</span><span aria-hidden="true">{String(system.id).padStart(2,"0")} / {copy.model}</span></div>
    <svg viewBox="0 0 600 340" aria-hidden="true">
      <defs><pattern id={`${id}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="currentColor" opacity=".08"/></pattern></defs>
      <rect width="600" height="340" fill={`url(#${id}-grid)`}/>
      {system.artifact === "signal" ? <g fill="none">
        {[90,170,250].map((y,i) => <g key={y}><path d={`M45 ${y}H555`} stroke="currentColor" opacity=".18"/><path d={`M45 ${y}h45l12 -18 14 36 15 -54 16 63 17 -27h38l12 -10 13 10h30`} stroke="currentColor" strokeWidth="2"/><path d={`M330 ${y}h38l13 -${20+i*5} 17 ${40+i*10} 18 -${20+i*5}h139`} stroke="currentColor" strokeWidth="2"/><path d={`M280 ${y}h40`} stroke="currentColor" strokeDasharray="3 6" opacity=".4"/><circle cx="330" cy={y} r="4" fill="currentColor"/></g>)}
        <rect x="274" y="55" width="51" height="228" rx="4" stroke="currentColor" strokeDasharray="3 7" opacity=".6"/>
      </g> : system.artifact === "territory" ? <g transform="translate(70 26) skewY(-10)">
        {Array.from({length:60},(_,i) => { const row=Math.floor(i/10), col=i%10,x=col*45+(row%2)*22.5,y=row*40; const active=(col>2&&col<7&&row>0&&row<5); return <path key={i} d={`M${x+22} ${y}l21 12v24l-21 12-21-12v-24Z`} fill={active ? "currentColor" : "none"} fillOpacity={active ? .09+(col%3)*.06 : 0} stroke="currentColor" strokeOpacity={active?.75:.2}/>;})}
        <path d="M90 106 180 130 270 106 337 166" stroke="currentColor" strokeWidth="2" fill="none"/>{[[90,106],[180,130],[270,106],[337,166]].map(([x,y])=><circle key={x} cx={x} cy={y} r="5" fill="currentColor"/>)}
      </g> : system.artifact === "workflow" ? <g fill="none" stroke="currentColor">
        <path d="M105 170H205M285 170h70M435 170h60M245 130V70H395v60M395 210v60H245v-60" opacity=".55"/>
        {[65,205,355,495].map((x,i)=><g key={x}><rect x={x} y="130" width={i===0||i===3?40:80} height="80" rx="3" fill="currentColor" fillOpacity={i===1?.15:.04}/><path d={`M${x+12} 160h${i===0||i===3?16:54}M${x+12} 175h${i===0||i===3?16:35}`} opacity=".6"/></g>)}<circle cx="245" cy="70" r="5" fill="currentColor"/><circle cx="395" cy="270" r="5" fill="currentColor"/>
      </g> : <g fill="none" stroke="currentColor">{[0,1,2,3].map(i=><g key={i} transform={`translate(${90+i*22},${70+i*38})`}><path d="M0 0 200-30 355 30 155 60Z" fill="currentColor" fillOpacity=".07"/><path d="M0 0v14l155 60 200-30V30M155 60v14" opacity=".45"/></g>)}</g>}
    </svg>
    <figcaption><ol>{system.path.map(step => <li key={step}>{step}</li>)}</ol><p>{copy.conceptual} · {system.artifact === "territory" ? copy.coverageBoundary : copy.runtimeBoundary}</p></figcaption>
  </figure>;
}
