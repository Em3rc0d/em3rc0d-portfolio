import { publicNotes } from "@/content/notes";
import type { NoteRecord, NoteTerritory } from "@/lib/content/types";
import type { Locale } from "./config";

type NoteCopy = Pick<NoteRecord, "title" | "thesis" | "sections"> & { currentBoundary?: string };

const es: Record<string, NoteCopy> = {
  "no-data-is-not-zero": {
    title: "NO_DATA no es cero.",
    thesis: "La ausencia es un estado. Convertirla en un valor numérico cambia el significado del sistema.",
    sections: [
      { heading: "El atajo", body: "En una UI de telemetría, el cero parece conveniente porque es fácil de mostrar y agregar. Pero un comando OBD que devuelve NO_DATA no es el mismo evento que una lectura válida cuyo valor resulta ser cero." },
      { heading: "El límite", body: "En AutoPulse, adquisición exitosa, NO_DATA, timeout, error del adaptador y desconexión siguen siendo resultados diferentes. NO_DATA repetido puede retirar un PID del conjunto activo de polling, mientras los fallos de transporte no usan esa misma regla." },
      { heading: "Por qué importa", body: "Una vez que la ausencia se convierte en medición, los resúmenes posteriores ya no pueden distinguir si el vehículo estaba detenido, el PID no era compatible o la adquisición simplemente no devolvió valor. Modelar temprano el estado ausente conserva la posibilidad de razonar correctamente después." },
    ],
    currentBoundary: "La evidencia actual del portfolio respalda la ruta explícita de NO_DATA y el comportamiento de retiro. No generaliza el umbral actual de retiro como un requisito del estándar OBD.",
  },
  "recovery-should-not-rewrite-history": {
    title: "La recuperación no debería reescribir la historia.",
    thesis: "Un sistema recuperado puede volver a ser consistente sin fingir que el fallo nunca ocurrió.",
    sections: [
      { heading: "La reparación tentadora", body: "Cuando un proceso móvil desaparece durante una sesión de grabación, resulta tentador reabrir la app, reconciliar los datos que existan y marcar la sesión como completa. Eso produce una base de datos más limpia y una historia menos verdadera." },
      { heading: "El contrato de recuperación", body: "AutoPulse reconcilia contadores durables derivados de bloques para sesiones huérfanas, pero la historia terminal sigue explícita: la sesión queda INTERRUPTED con UNEXPECTED_APP_TERMINATION y se registra un evento de recuperación." },
      { heading: "Por qué importa", body: "Recuperar no es éxito retroactivo. Mantener visible la interrupción permite que resúmenes, diagnósticos y usuarios distingan una parada normal de un estado reconstruido después de un fallo." },
    ],
  },
  "job-requirement-is-not-candidate-evidence": {
    title: "Un requisito de empleo no es evidencia del candidato.",
    thesis: "Lo que un empleador busca y lo que un candidato puede demostrar pertenecen a dominios de verdad distintos.",
    sections: [
      { heading: "La mezcla peligrosa", body: "Las herramientas de CV suelen partir de una oferta y preguntan cómo hacer que el candidato parezca más alineado. Eso se vuelve peligroso cuando el requisito objetivo se filtra al propio modelo del candidato." },
      { heading: "La separación", body: "CV Engine mantiene CareerEvidence y CareerAssertions del lado del candidato, mientras JobRequirements deriva de la descripción de empleo. RequirementMatch es el objeto de convergencia; puede indicar MATCH, POTENTIAL_MATCH, GAP, UNKNOWN o BLOCKER sin crear nueva verdad del candidato." },
      { heading: "Por qué importa", body: "Un objetivo puede orientar qué destacar, qué preparar y si conviene postular. No puede utilizarse como evidencia de que el candidato ya posee una habilidad, responsabilidad o condición de elegibilidad que falta." },
    ],
  },
  "unknown-is-not-false": {
    title: "UNKNOWN no es falso.",
    thesis: "Cuando la fuente guarda silencio, el sistema debe preservar ese silencio en vez de inventar certeza.",
    sections: [
      { heading: "Tres estados distintos", body: "Un campo puede conocerse, ser explícitamente negativo o simplemente estar ausente de la fuente. Tratar los dos últimos como equivalentes hace que las decisiones posteriores parezcan más seguras de lo que permiten los datos disponibles." },
      { heading: "El ejemplo de mercado", body: "CV Engine modela campos derivados del mercado como KNOWN o UNKNOWN. UNKNOWN conserva razones como SOURCE_SILENT, UNRECOGNIZED_SOURCE_VALUE o INVALID_SOURCE_VALUE. Un título cercano con palabras como Senior o Remote no autoriza completar un campo estructurado ausente." },
      { heading: "Por qué importa", body: "Esto es menos vistoso que un motor de inferencia que rellena cada vacío. Es más útil para un sistema de decisión porque el usuario aún puede ver qué conclusiones surgieron de la fuente y qué preguntas siguen sin resolver." },
    ],
  },
  "consume-the-snapshot-do-not-rebuild-it": {
    title: "Consume el snapshot; no lo reconstruyas.",
    thesis: "Si una decisión debe usar una entrada congelada, volver a parsearla al decidir crea silenciosamente otro estado del sistema.",
    sections: [
      { heading: "La reconstrucción oculta", body: "Una publicación de empleo puede observarse, interpretarse y proyectarse a un JobSnapshot durable. Si luego la ruta de evaluación acepta otra descripción libre y reconstruye requisitos, la provenance ya no indica qué estado de la oportunidad produjo la decisión." },
      { heading: "El invariante", body: "La ruta actual de evaluación de mercado de CV Engine selecciona una identidad JobSnapshot. El matching lee el conjunto de requisitos almacenado y OpportunityHistory preserva el mismo enlace al snapshot. La verdad del lado de la oportunidad se consume, no se regenera en la ruta de decisión." },
      { heading: "Por qué importa", body: "Los sistemas de decisión deterministas necesitan entradas estables. Versionar sólo ayuda cuando el camino de aplicación respeta el objeto versionado en vez de reconstruir después otro objeto que parece equivalente." },
    ],
  },
  "resume-should-not-be-the-truth-store": {
    title: "El CV no debería ser el almacén de verdad.",
    thesis: "Un CV es una proyección contextual de un registro profesional, no la base canónica de quién es el candidato.",
    sections: [
      { heading: "Por qué los documentos divergen", body: "Un candidato puede mantener muchos CV dirigidos. Si cada documento se vuelve una fuente de verdad independiente, wording, fechas, responsabilidades y habilidades pueden divergir sin un origen estable con el cual reconciliar." },
      { heading: "El modelo de proyección", body: "CV Engine mantiene CareerAssertions aguas arriba, las mapea a ResumeClaims mediante un ClaimLedger y registra ResumeVersions aprobadas con provenance de objetivo, claims y contenido. El documento generado queda aguas abajo del grafo de verdad." },
      { heading: "Por qué importa", body: "Apuntar a un rol debería cambiar énfasis y wording, no la historia. Tratar el CV como proyección permite crear artefactos específicos por aplicación y seguir preguntando de dónde salió cada afirmación material." },
    ],
  },
  "evidence-needs-a-limitation-field": {
    title: "La evidencia necesita un campo de limitación.",
    thesis: "Saber qué respalda un artefacto es incompleto si el sistema no registra también qué no puede establecer.",
    sections: [
      { heading: "La fuga de confianza", body: "Un archivo fuente puede demostrar que existe una ruta de implementación. Un test puede demostrar que existe un artefacto de verificación. Ninguno prueba automáticamente que toda la suite actual se volvió a ejecutar, que hubo validación física de campo o que se alcanzó un resultado de negocio." },
      { heading: "El contrato del portfolio", body: "THE BUILD ROOM hace de `limitations` un campo obligatorio de EvidenceRecord. El dossier de inspección coloca la limitación junto a la afirmación soportada para que el pulido visual no pueda elevar silenciosamente el nivel de confianza." },
      { heading: "Por qué importa", body: "Los sistemas de evidencia deben reducir ambigüedad, no sólo acumular artefactos. Una limitación convierte la evidencia de una insignia de confianza en un límite alrededor de la afirmación que puede hacerse con seguridad." },
    ],
    currentBoundary: "La Evidence Library pública actual comienza con AutoPulse y CV Engine y suma sólo sistemas cuya publicabilidad y techos de claims han sido recuperados. La ausencia de una evidencia pública no debe convertirse en una afirmación más fuerte.",
  },
  "when-does-a-listing-become-one-opportunity": {
    title: "¿Cuándo una publicación se convierte en una sola oportunidad?",
    thesis: "El historial de observaciones no es el mismo problema que la identidad lógica de una oportunidad entre fuentes y a través del tiempo.",
    sections: [
      { heading: "Lo que existe ahora", body: "La arquitectura actual de mercado puede preservar una MarketObservation semántica separada de cada ObservationOccurrence, ingerir publicaciones de proveedores controlados, proyectar texto autorizado por la fuente y evaluar el JobSnapshot durable resultante." },
      { heading: "El siguiente límite", body: "Otra pregunta empieza cuando Greenhouse, Lever, Ashby u otras fuentes pueden describir lo que lógicamente es la misma oportunidad — o cuando una fuente cambia, desaparece y vuelve. La identidad de observación por sí sola no resuelve deduplicación entre fuentes ni ciclo de vida." },
      { heading: "La pregunta que mantengo abierta", body: "¿Qué evidencia debería autorizar que dos registros fuente se conviertan en una sola Opportunity lógica, y cómo deberían evolucionar OPEN, CLOSED, STALE y el estado de freshness sin borrar el historial de fuentes? Ese es el problema arquitectónico M4B-07 actual." },
    ],
    currentBoundary: "EXPLORING — M4B-07 es lo siguiente. La identidad lógica entre fuentes, deduplicación, ciclo de vida OPEN/CLOSED/STALE y semántica de freshness no se afirman como completos.",
  },
};

const pt: Record<string, NoteCopy> = {
  "no-data-is-not-zero": {
    title: "NO_DATA não é zero.",
    thesis: "Ausência é um estado. Convertê-la em um valor numérico muda o significado do sistema.",
    sections: [
      { heading: "O atalho", body: "Em uma UI de telemetria, zero parece conveniente porque é fácil de mostrar e agregar. Mas um comando OBD retornando NO_DATA não é o mesmo evento que uma leitura válida cujo valor por acaso é zero." },
      { heading: "O limite", body: "No AutoPulse, aquisição bem-sucedida, NO_DATA, timeout, erro do adaptador e desconexão continuam resultados diferentes. NO_DATA repetido pode retirar um PID do conjunto ativo de polling, enquanto falhas de transporte não seguem a mesma regra." },
      { heading: "Por que importa", body: "Quando ausência vira medição, resumos posteriores já não conseguem distinguir se o veículo estava parado, o PID não era suportado ou a aquisição simplesmente não devolveu valor. Modelar cedo o estado ausente preserva a capacidade de raciocinar corretamente depois." },
    ],
    currentBoundary: "A evidência atual do portfolio suporta o caminho explícito de NO_DATA e o comportamento de retirada. Ela não generaliza o limite atual como requisito do padrão OBD.",
  },
  "recovery-should-not-rewrite-history": {
    title: "Recuperação não deve reescrever a história.",
    thesis: "Um sistema recuperado pode voltar a ser consistente sem fingir que a falha nunca aconteceu.",
    sections: [
      { heading: "O reparo tentador", body: "Quando um processo móvel desaparece durante uma sessão de gravação, é tentador reabrir o app, reconciliar os dados existentes e marcar a sessão como completa. Isso produz um banco mais limpo e uma história menos verdadeira." },
      { heading: "O contrato de recuperação", body: "AutoPulse reconcilia contadores duráveis derivados de blocos para sessões órfãs, mas a história terminal permanece explícita: a sessão vira INTERRUPTED com UNEXPECTED_APP_TERMINATION e um evento de recuperação é registrado." },
      { heading: "Por que importa", body: "Recuperação não é sucesso retroativo. Manter a interrupção visível permite distinguir uma parada normal de um estado reconstruído após falha." },
    ],
  },
  "job-requirement-is-not-candidate-evidence": {
    title: "Um requisito de vaga não é evidência do candidato.",
    thesis: "O que um empregador deseja e o que um candidato consegue provar pertencem a domínios de verdade diferentes.",
    sections: [
      { heading: "A mistura perigosa", body: "Ferramentas de currículo costumam partir de uma vaga e perguntar como tornar o candidato mais alinhado. Isso se torna perigoso quando o requisito-alvo vaza para o próprio modelo do candidato." },
      { heading: "A separação", body: "CV Engine mantém CareerEvidence e CareerAssertions do lado do candidato, enquanto JobRequirements deriva da descrição da vaga. RequirementMatch é o objeto de convergência e pode dizer MATCH, POTENTIAL_MATCH, GAP, UNKNOWN ou BLOCKER sem criar nova verdade do candidato." },
      { heading: "Por que importa", body: "Um alvo pode orientar o que destacar, preparar e se vale aplicar. Ele não pode servir como evidência de que o candidato já possui uma habilidade, responsabilidade ou condição de elegibilidade ausente." },
    ],
  },
  "unknown-is-not-false": {
    title: "UNKNOWN não é falso.",
    thesis: "Quando a fonte está silenciosa, o sistema deve preservar esse silêncio em vez de inventar certeza.",
    sections: [
      { heading: "Três estados diferentes", body: "Um campo pode ser conhecido, explicitamente negativo ou apenas ausente da fonte. Tratar os dois últimos como equivalentes faz decisões posteriores parecerem mais confiantes do que a informação disponível permite." },
      { heading: "O exemplo de mercado", body: "CV Engine modela campos derivados do mercado como KNOWN ou UNKNOWN. UNKNOWN preserva razões como SOURCE_SILENT, UNRECOGNIZED_SOURCE_VALUE ou INVALID_SOURCE_VALUE. Um título próximo contendo Senior ou Remote não autoriza preencher um campo estruturado ausente." },
      { heading: "Por que importa", body: "Isso é menos chamativo do que um motor de inferência que preenche todo vazio. É mais útil para um sistema de decisão porque o usuário ainda vê quais conclusões vieram da fonte e quais perguntas seguem abertas." },
    ],
  },
  "consume-the-snapshot-do-not-rebuild-it": {
    title: "Consuma o snapshot; não o reconstrua.",
    thesis: "Se uma decisão deve usar uma entrada congelada, reanalisar essa entrada na hora de decidir cria silenciosamente outro estado do sistema.",
    sections: [
      { heading: "A reconstrução escondida", body: "Uma vaga pode ser observada, interpretada e projetada em um JobSnapshot durável. Se a rota de avaliação aceitar depois outra descrição livre e reconstruir requisitos, a provenance deixa de indicar qual estado da vaga produziu a decisão." },
      { heading: "O invariante", body: "O caminho atual de avaliação de mercado do CV Engine seleciona uma identidade JobSnapshot. O matching lê o conjunto armazenado de requisitos e OpportunityHistory preserva o mesmo vínculo ao snapshot. A verdade do lado da vaga é consumida, não regenerada no caminho decisório." },
      { heading: "Por que importa", body: "Sistemas de decisão determinísticos precisam de entradas estáveis. Versionamento só ajuda quando o caminho da aplicação respeita o objeto versionado em vez de reconstruir depois outro objeto aparentemente equivalente." },
    ],
  },
  "resume-should-not-be-the-truth-store": {
    title: "O currículo não deve ser o repositório da verdade.",
    thesis: "Um currículo é uma projeção contextual de um registro de carreira, não a base canônica de quem o candidato é.",
    sections: [
      { heading: "Por que documentos divergem", body: "Um candidato pode manter muitos currículos direcionados. Se cada documento vira uma fonte independente da verdade, wording, datas, responsabilidades e habilidades podem divergir sem uma origem estável para reconciliação." },
      { heading: "O modelo de projeção", body: "CV Engine mantém CareerAssertions upstream, mapeia-as em ResumeClaims por um ClaimLedger e registra ResumeVersions aprovadas com provenance de alvo, claims e conteúdo. O documento gerado fica downstream do grafo da verdade." },
      { heading: "Por que importa", body: "Direcionar uma vaga deve mudar ênfase e wording, não história. Tratar o currículo como projeção permite artefatos específicos por candidatura mantendo a pergunta: de onde veio cada claim material?" },
    ],
  },
  "evidence-needs-a-limitation-field": {
    title: "Evidência precisa de um campo de limitação.",
    thesis: "Saber o que um artefato sustenta é incompleto se o sistema não registrar também o que ele não consegue estabelecer.",
    sections: [
      { heading: "O vazamento de confiança", body: "Um arquivo-fonte pode provar que existe um caminho de implementação. Um teste pode provar que existe um artefato de verificação. Nenhum deles prova automaticamente que toda a suite atual foi reexecutada, que houve validação física em campo ou que um resultado de negócio foi alcançado." },
      { heading: "O contrato do portfolio", body: "THE BUILD ROOM torna `limitations` obrigatório em EvidenceRecord. O dossier de inspeção coloca a limitação ao lado do claim suportado para que o acabamento visual não aumente silenciosamente o nível de confiança." },
      { heading: "Por que importa", body: "Sistemas de evidência devem reduzir ambiguidade, não apenas acumular artefatos. Uma limitação transforma evidência de selo de confiança em uma fronteira em torno do claim que pode ser feito com segurança." },
    ],
    currentBoundary: "A Evidence Library pública inclui somente sistemas cujo teto de claims e publicabilidade foram recuperados. A ausência de uma evidência pública nunca deve ser convertida em uma afirmação mais forte.",
  },
  "when-does-a-listing-become-one-opportunity": {
    title: "Quando uma vaga se torna uma única oportunidade?",
    thesis: "Histórico de observações não é o mesmo problema que identidade lógica de oportunidade entre fontes e ao longo do tempo.",
    sections: [
      { heading: "O que existe agora", body: "A arquitetura atual de mercado consegue preservar uma MarketObservation semântica separada de cada ObservationOccurrence, ingerir listagens de providers controlados, projetar texto autorizado pela fonte e avaliar o JobSnapshot durável resultante." },
      { heading: "A próxima fronteira", body: "Outra pergunta começa quando Greenhouse, Lever, Ashby ou fontes futuras podem descrever o que logicamente é a mesma oportunidade — ou quando uma fonte muda, desaparece e volta. Identidade de observação sozinha não resolve deduplicação entre fontes nem ciclo de vida." },
      { heading: "A pergunta que mantenho aberta", body: "Que evidência deveria autorizar dois registros de fonte a se tornarem uma única Opportunity lógica, e como OPEN, CLOSED, STALE e freshness deveriam evoluir sem apagar o histórico das fontes? Esse é o problema de arquitetura M4B-07 atual." },
    ],
    currentBoundary: "EXPLORING — M4B-07 é o próximo passo. Identidade lógica entre fontes, deduplicação, ciclo OPEN/CLOSED/STALE e semântica de freshness não são reivindicados como completos.",
  },
};

const territoryLabels: Record<Locale, Record<NoteTerritory, string>> = {
  en: { "SYSTEM THINKING": "SYSTEM THINKING", BUILDING: "BUILDING", RECOVERY: "RECOVERY", "APPLIED AI": "APPLIED AI", EVIDENCE: "EVIDENCE", "FIELD NOTE": "FIELD NOTE" },
  es: { "SYSTEM THINKING": "PENSAMIENTO DE SISTEMAS", BUILDING: "CONSTRUCCIÓN", RECOVERY: "RECUPERACIÓN", "APPLIED AI": "IA APLICADA", EVIDENCE: "EVIDENCIA", "FIELD NOTE": "NOTA DE CAMPO" },
  pt: { "SYSTEM THINKING": "PENSAMENTO DE SISTEMAS", BUILDING: "CONSTRUÇÃO", RECOVERY: "RECUPERAÇÃO", "APPLIED AI": "IA APLICADA", EVIDENCE: "EVIDÊNCIA", "FIELD NOTE": "NOTA DE CAMPO" },
};

function apply(base: NoteRecord, copy: NoteCopy): NoteRecord {
  return { ...base, ...copy };
}

export function localizedNotes(locale: Locale): readonly NoteRecord[] {
  if (locale === "en") return publicNotes;
  const table = locale === "es" ? es : pt;
  return publicNotes.map((note) => apply(note, table[note.slug]));
}

export function findLocalizedNote(locale: Locale, slug: string) {
  return localizedNotes(locale).find((note) => note.slug === slug);
}

export function localizedTerritory(locale: Locale, territory: NoteTerritory) {
  return territoryLabels[locale][territory];
}
