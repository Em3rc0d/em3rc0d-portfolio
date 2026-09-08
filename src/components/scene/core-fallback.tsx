import { coreModules } from "@/lib/scene/core-model";
// Orthographic projection of the same abstract modular geometry; not a product screenshot.
export function CoreFallback() {
  const project = (x: number, y: number, z: number) => [300 + (x - z) * 60, 310 + (x + z) * 27 - y * 60];
  const face = (points: number[][]) => points.map(p => project(p[0], p[1], p[2]).join(",")).join(" ");
  return <svg className="core-fallback" viewBox="0 0 600 600" aria-hidden="true">
    <defs><radialGradient id="core-halo"><stop offset="0" stopColor="#eca675" stopOpacity=".12"/><stop offset="1" stopColor="#eca675" stopOpacity="0"/></radialGradient><linearGradient id="core-top" x2="1" y2="1"><stop stopColor="#a2aaa7"/><stop offset="1" stopColor="#677570"/></linearGradient><linearGradient id="core-side" x2="1" y2="1"><stop stopColor="#43504b"/><stop offset="1" stopColor="#29342f"/></linearGradient></defs>
    <circle cx="300" cy="305" r="275" fill="url(#core-halo)"/>
    <ellipse cx="300" cy="462" rx="192" ry="60" fill="none" stroke="#35403c"/>
    <ellipse cx="300" cy="462" rx="248" ry="83" fill="none" stroke="#26302b" strokeDasharray="3 8"/>
    {coreModules.toSorted((a,b) => a.y-b.y || a.x+a.z-b.x-b.z).map(m => {
      const {x,y,z}=m; const s=.46; const low=y-s, high=y+s;
      return <g key={m.index} stroke={m.core ? "#f4bc8f" : "#9dada2"} strokeOpacity=".25" strokeWidth=".7">
        <polygon points={face([[x-s,high,z-s],[x+s,high,z-s],[x+s,high,z+s],[x-s,high,z+s]])} fill={m.core ? "#ebb286" : "url(#core-top)"}/>
        <polygon points={face([[x-s,high,z+s],[x+s,high,z+s],[x+s,low,z+s],[x-s,low,z+s]])} fill={m.core ? "#b26d40" : "url(#core-side)"}/>
        <polygon points={face([[x+s,high,z-s],[x+s,high,z+s],[x+s,low,z+s],[x+s,low,z-s]])} fill={m.core ? "#da9665" : "#53605a"}/>
      </g>;
    })}
  </svg>;
}
