import { autopulse } from "./autopulse";
import { vigia } from "./vigia";
import { prodagentic } from "./prodagentic";
import { financeSensor } from "./finance-sensor";
import { cvEngine } from "./cv-engine";
import { promptMachine } from "./prompt-machine";
import { infrastructure, gpets } from "./professional-and-gpets";
export const systemCases = [autopulse, vigia, prodagentic, financeSensor, cvEngine, promptMachine, infrastructure, gpets];
export const featuredSystems = systemCases.filter(system => system.placement === "FLAGSHIP");
export function findSystem(slug: string) { return systemCases.find(system => system.slug === slug && system.publicability !== "PRIVATE"); }
