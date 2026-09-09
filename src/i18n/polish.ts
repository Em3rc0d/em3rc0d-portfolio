import type { Locale } from "./config";
import type { Placement } from "@/content/systems/types";
import type { EvidenceState, EvidenceType, Publicability } from "@/lib/content/types";

type Polish = {
  shell: { primaryNavigation: string; brandHome: string; footerNavigation: string; roleSuffix: string };
  home: { scope: string; heroCta: string; bottom: string };
  capabilities: readonly { title: string; description: string }[];
  artifact: { model: string; conceptual: string; runtimeBoundary: string; coverageBoundary: string };
  system: { sections: string; impactBoundary: string; placements: Record<Placement, string> };
  notFound: { eyebrow: string; title: string; lead: string; systems: string; contact: string };
  evidenceTypes: Record<EvidenceType, string>;
  evidenceStates: Record<EvidenceState, string>;
  publicability: Record<Publicability, string>;
};

const en: Polish = {
  shell: { primaryNavigation: "Primary navigation", brandHome: "Eduardo Merino — home", footerNavigation: "Footer navigation", roleSuffix: "Applied AI" },
  home: {
    scope: "I design and build end-to-end software, automation and applied AI for real operational problems — from defining the problem to shipping a working system.",
    heroCta: "Explore systems",
    bottom: "Products · Automation · Applied AI · Real-world software",
  },
  capabilities: [
    { title: "Automate work with AI", description: "Use AI inside bounded workflows that preserve context, verification and human control." },
    { title: "Compare options under real constraints", description: "Turn fragmented evidence and constraints into choices people can inspect and compare." },
    { title: "Connect real-world signals to software", description: "Capture physical signals, preserve history and handle missing data or interrupted connections." },
    { title: "Build products end to end", description: "Connect interface, application behavior, data and delivery into one coherent product." },
  ],
  artifact: { model: "MODEL", conceptual: "Conceptual model", runtimeBoundary: "not runtime data", coverageBoundary: "not a coverage result" },
  system: {
    sections: "sections",
    impactBoundary: "Measured impact stays evidence-bound: this case does not claim adoption, revenue, time saved or other outcome metrics unless a source actually measures them.",
    placements: { FLAGSHIP: "selected", SUPPORT: "support", PROFESSIONAL: "professional", "R&D": "in development", ARCHIVED: "archived" },
  },
  notFound: { eyebrow: "404 / Page not found", title: "This path\nends here.", lead: "The system or record you’re looking for isn’t available at this address.", systems: "Explore systems", contact: "Contact Eduardo" },
  evidenceTypes: { ARCHITECTURE: "architecture", IMPLEMENTATION: "implementation", TEST: "test", RECOVERY: "recovery", PRODUCT: "product", MODEL: "model" },
  evidenceStates: { IMPLEMENTED: "implemented", SOURCE_VERIFIED: "source verified", TEST_ARTIFACT: "test artifact", FIELD_VALIDATED: "field validated", IN_TEST: "in test", NOT_CLAIMED: "not claimed" },
  publicability: { PUBLIC: "public", SANITIZED: "sanitized", ABSTRACTED: "abstracted", PRIVATE: "private" },
};

const es: Polish = {
  shell: { primaryNavigation: "Navegación principal", brandHome: "Eduardo Merino — inicio", footerNavigation: "Navegación del pie de página", roleSuffix: "IA aplicada" },
  home: {
    scope: "Diseño y construyo software de extremo a extremo, automatización e IA aplicada para problemas operativos reales — desde definir el problema hasta llevar un sistema funcional a producción.",
    heroCta: "Explorar sistemas",
    bottom: "Productos · Automatización · IA aplicada · Software del mundo real",
  },
  capabilities: [
    { title: "Automatizar trabajo con IA", description: "Usar IA dentro de flujos acotados que preservan contexto, verificación y control humano." },
    { title: "Comparar opciones con restricciones reales", description: "Convertir evidencia fragmentada y restricciones en alternativas que las personas puedan inspeccionar y comparar." },
    { title: "Conectar señales del mundo real con software", description: "Capturar señales físicas, preservar historial y manejar datos ausentes o conexiones interrumpidas." },
    { title: "Construir productos de extremo a extremo", description: "Conectar interfaz, comportamiento de la aplicación, datos y entrega en un producto coherente." },
  ],
  artifact: { model: "MODELO", conceptual: "Modelo conceptual", runtimeBoundary: "no son datos de ejecución", coverageBoundary: "no es un resultado de cobertura" },
  system: {
    sections: "secciones",
    impactBoundary: "El impacto medido permanece ligado a evidencia: este caso no afirma adopción, ingresos, tiempo ahorrado ni otras métricas de resultado salvo que una fuente realmente las mida.",
    placements: { FLAGSHIP: "seleccionado", SUPPORT: "soporte", PROFESSIONAL: "profesional", "R&D": "en desarrollo", ARCHIVED: "archivado" },
  },
  notFound: { eyebrow: "404 / Página no encontrada", title: "Esta ruta\ntermina aquí.", lead: "El sistema o registro que buscas no está disponible en esta dirección.", systems: "Explorar sistemas", contact: "Contactar a Eduardo" },
  evidenceTypes: { ARCHITECTURE: "arquitectura", IMPLEMENTATION: "implementación", TEST: "prueba", RECOVERY: "recuperación", PRODUCT: "producto", MODEL: "modelo" },
  evidenceStates: { IMPLEMENTED: "implementado", SOURCE_VERIFIED: "fuente verificada", TEST_ARTIFACT: "artefacto de prueba", FIELD_VALIDATED: "validado en campo", IN_TEST: "en prueba", NOT_CLAIMED: "no afirmado" },
  publicability: { PUBLIC: "público", SANITIZED: "sanitizado", ABSTRACTED: "abstraído", PRIVATE: "privado" },
};

const pt: Polish = {
  shell: { primaryNavigation: "Navegação principal", brandHome: "Eduardo Merino — início", footerNavigation: "Navegação do rodapé", roleSuffix: "IA aplicada" },
  home: {
    scope: "Projeto e construo software de ponta a ponta, automação e IA aplicada para problemas operacionais reais — da definição do problema à entrega de um sistema funcional em produção.",
    heroCta: "Explorar sistemas",
    bottom: "Produtos · Automação · IA aplicada · Software do mundo real",
  },
  capabilities: [
    { title: "Automatizar trabalho com IA", description: "Usar IA em fluxos delimitados que preservam contexto, verificação e controle humano." },
    { title: "Comparar opções com restrições reais", description: "Transformar evidências fragmentadas e restrições em alternativas que as pessoas possam inspecionar e comparar." },
    { title: "Conectar sinais do mundo real ao software", description: "Capturar sinais físicos, preservar histórico e lidar com dados ausentes ou conexões interrompidas." },
    { title: "Construir produtos de ponta a ponta", description: "Conectar interface, comportamento da aplicação, dados e entrega em um produto coerente." },
  ],
  artifact: { model: "MODELO", conceptual: "Modelo conceitual", runtimeBoundary: "não são dados de execução", coverageBoundary: "não é um resultado de cobertura" },
  system: {
    sections: "seções",
    impactBoundary: "O impacto medido permanece ligado a evidências: este caso não reivindica adoção, receita, tempo economizado nem outras métricas de resultado sem uma fonte que realmente as meça.",
    placements: { FLAGSHIP: "selecionado", SUPPORT: "apoio", PROFESSIONAL: "profissional", "R&D": "em desenvolvimento", ARCHIVED: "arquivado" },
  },
  notFound: { eyebrow: "404 / Página não encontrada", title: "Este caminho\ntermina aqui.", lead: "O sistema ou registro que você procura não está disponível neste endereço.", systems: "Explorar sistemas", contact: "Falar com Eduardo" },
  evidenceTypes: { ARCHITECTURE: "arquitetura", IMPLEMENTATION: "implementação", TEST: "teste", RECOVERY: "recuperação", PRODUCT: "produto", MODEL: "modelo" },
  evidenceStates: { IMPLEMENTED: "implementado", SOURCE_VERIFIED: "fonte verificada", TEST_ARTIFACT: "artefato de teste", FIELD_VALIDATED: "validado em campo", IN_TEST: "em teste", NOT_CLAIMED: "não reivindicado" },
  publicability: { PUBLIC: "público", SANITIZED: "sanitizado", ABSTRACTED: "abstraído", PRIVATE: "privado" },
};

const polish: Record<Locale, Polish> = { en, es, pt };
export function getReputationPolish(locale: Locale): Polish { return polish[locale]; }
