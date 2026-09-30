import { placaclara } from "./placaclara";
import { autopulse } from "./autopulse";
import { echo } from "./echo";
import { talos } from "./talos";
import { cvEngine } from "./cv-engine";
import { vigia } from "./vigia";
import { prodagentic } from "./prodagentic";
import { financeSensor } from "./finance-sensor";
import { promptMachine } from "./prompt-machine";
import { infrastructure, gpets } from "./professional-and-gpets";

export const systemCases = [
  placaclara,
  autopulse,
  echo,
  talos,
  cvEngine,
  vigia,
  prodagentic,
  financeSensor,
  promptMachine,
  infrastructure,
  gpets,
];

export const featuredSystems = systemCases.filter(system => system.placement === "FLAGSHIP");
export function findSystem(slug: string) {
  return systemCases.find(system => system.slug === slug && system.publicability !== "PRIVATE");
}
