export const noteTranslationsEs = {
  "N-01": {
    title: "NO_DATA no es cero.",
    thesis:
      "La ausencia es un estado. Convertirla en un valor numérico cambia el significado del sistema.",
    sections: [
      {
        heading: "El atajo",
        body:
          "Las interfaces de telemetría hacen que cero parezca conveniente porque es fácil de representar y agregar. Pero que un comando OBD devuelva NO_DATA no es el mismo evento que una lectura válida cuyo valor sea cero.",
      },
      {
        heading: "El límite",
        body:
          "En AutoPulse, adquisición exitosa, NO_DATA, timeout, error del adaptador y desconexión siguen siendo resultados diferentes. NO_DATA repetidos pueden retirar un PID del conjunto activo de polling, mientras que las fallas de transporte no usan esa misma regla.",
      },
      {
        heading: "Por qué importa",
        body:
          "Cuando la ausencia se convierte en una medición, los resúmenes posteriores ya no pueden distinguir si el vehículo estaba detenido, el PID no era soportado o la adquisición simplemente no devolvió un valor. Modelar temprano el estado ausente conserva la posibilidad de razonar correctamente después.",
      },
    ],
    currentBoundary:
      "La evidencia actual del portfolio respalda la ruta explícita de NO_DATA y el comportamiento de retiro. No generaliza el umbral actual de retiro como un requisito del estándar OBD.",
  },
  "N-02": {
    title: "La recuperación no debería reescribir la historia.",
    thesis:
      "Un sistema recuperado puede volver a ser consistente sin fingir que la falla nunca ocurrió.",
    sections: [
      {
        heading: "La reparación tentadora",
        body:
          "Cuando un proceso móvil desaparece durante una sesión de grabación, es tentador reabrir la app, reconciliar los datos disponibles y marcar la sesión como completa. Eso produce una base de datos más limpia y una historia menos fiel.",
      },
      {
        heading: "El contrato de recuperación",
        body:
          "AutoPulse reconcilia contadores durables derivados de bloques para sesiones huérfanas, pero la historia terminal sigue explícita: la sesión pasa a INTERRUPTED con UNEXPECTED_APP_TERMINATION y se registra un evento de recuperación.",
      },
      {
        heading: "Por qué importa",
        body:
          "Recuperar no equivale a éxito retroactivo. Mantener visible la interrupción permite que resúmenes, diagnósticos y usuarios distingan una detención normal de un estado reconstruido después de una falla.",
      },
    ],
  },
  "N-03": {
    title: "Un requisito del puesto no es evidencia del candidato.",
    thesis:
      "Lo que un empleador busca y lo que un candidato puede demostrar pertenecen a dominios de verdad distintos.",
    sections: [
      {
        heading: "La mezcla peligrosa",
        body:
          "Las herramientas de CV suelen empezar desde una descripción de puesto y preguntar cómo hacer que el candidato parezca más alineado. Eso se vuelve peligroso cuando el requisito objetivo se filtra al propio modelo del candidato.",
      },
      {
        heading: "La separación",
        body:
          "CV Engine mantiene CareerEvidence y CareerAssertions del lado del candidato, mientras JobRequirements deriva de la descripción del puesto. RequirementMatch es el objeto de convergencia; puede decir MATCH, POTENTIAL_MATCH, GAP, UNKNOWN o BLOCKER sin crear nueva verdad del candidato.",
      },
      {
        heading: "Por qué importa",
        body:
          "Un objetivo puede orientar qué enfatizar, qué preparar y si conviene aplicar. No puede utilizarse como evidencia de que el candidato ya posee una habilidad, responsabilidad o condición de elegibilidad ausente.",
      },
    ],
  },
  "N-04": {
    title: "UNKNOWN no es falso.",
    thesis:
      "Cuando la fuente guarda silencio, el sistema debería preservar ese silencio en lugar de inventar certeza.",
    sections: [
      {
        heading: "Tres estados diferentes",
        body:
          "Un campo puede ser conocido, explícitamente negativo o simplemente estar ausente de la fuente. Tratar los dos últimos como equivalentes hace que las decisiones posteriores parezcan más seguras de lo que permite la información disponible.",
      },
      {
        heading: "El ejemplo de mercado",
        body:
          "CV Engine modela campos de mercado derivados como KNOWN o UNKNOWN. UNKNOWN conserva razones como SOURCE_SILENT, UNRECOGNIZED_SOURCE_VALUE o INVALID_SOURCE_VALUE. Un título cercano con palabras como Senior o Remote no autoriza completar un campo estructurado ausente.",
      },
      {
        heading: "Por qué importa",
        body:
          "Esto es menos vistoso que un motor de inferencia que rellena cada vacío. Es más útil para un sistema de decisión porque el usuario todavía puede distinguir qué conclusiones vienen de material fuente y qué preguntas siguen sin resolver.",
      },
    ],
  },
  "N-05": {
    title: "Consume el snapshot; no lo reconstruyas.",
    thesis:
      "Si una decisión debe usar una entrada congelada, volver a parsearla en el momento de decidir crea silenciosamente un estado distinto del sistema.",
    sections: [
      {
        heading: "La reconstrucción oculta",
        body:
          "Una oferta de mercado puede observarse, interpretarse y proyectarse a un JobSnapshot durable. Si la ruta de evaluación acepta después otra descripción libre y reconstruye requisitos, la procedencia deja de decirnos qué estado del puesto produjo la decisión.",
      },
      {
        heading: "La invariante",
        body:
          "La ruta actual de evaluación de mercado de CV Engine selecciona una identidad JobSnapshot. El matching lee el conjunto de requisitos almacenado y OpportunityHistory preserva el mismo vínculo al snapshot. La verdad del lado del puesto se consume; no se regenera en la ruta de decisión.",
      },
      {
        heading: "Por qué importa",
        body:
          "Los sistemas de decisión deterministas necesitan entradas estables. Versionar solo ayuda cuando la ruta de aplicación realmente respeta el objeto versionado en lugar de reconstruir después otro objeto que parece equivalente.",
      },
    ],
  },
  "N-06": {
    title: "El CV no debería ser la fuente de verdad.",
    thesis:
      "Un CV es una proyección contextual de un registro profesional, no la base de datos canónica de quién es el candidato.",
    sections: [
      {
        heading: "Por qué los documentos divergen",
        body:
          "Un candidato puede mantener muchos CV orientados a distintos puestos. Si cada documento se vuelve una fuente de verdad independiente, redacción, fechas, responsabilidades y habilidades pueden divergir sin un origen estable contra el cual reconciliarlas.",
      },
      {
        heading: "El modelo de proyección",
        body:
          "CV Engine mantiene CareerAssertions aguas arriba, las mapea a ResumeClaims mediante un ClaimLedger y registra ResumeVersions aprobadas con procedencia de objetivo, claims y contenido. El documento generado está aguas abajo del grafo de verdad.",
      },
      {
        heading: "Por qué importa",
        body:
          "Orientar una aplicación debería cambiar énfasis y redacción, no la historia. Tratar el CV como una proyección permite crear artefactos específicos por aplicación y seguir preguntando de dónde vino cada afirmación material.",
      },
    ],
  },
  "N-07": {
    title: "La evidencia necesita un campo de limitación.",
    thesis:
      "Saber qué respalda un artefacto es incompleto si el sistema no registra también qué no puede establecer.",
    sections: [
      {
        heading: "La fuga de confianza",
        body:
          "Un archivo fuente de repositorio puede demostrar que existe una ruta de implementación. Un archivo de pruebas puede demostrar que existe un artefacto de verificación. Ninguno demuestra automáticamente que se volvió a ejecutar toda la suite actual, que hubo validación física en campo o que se alcanzó un resultado de negocio.",
      },
      {
        heading: "El contrato del portfolio",
        body:
          "THE BUILD ROOM hace que `limitations` sea un campo obligatorio en EvidenceRecord. El dossier de inspección coloca la limitación junto a la afirmación respaldada para que el pulido visual no eleve silenciosamente el nivel de confianza.",
      },
      {
        heading: "Por qué importa",
        body:
          "Los sistemas de evidencia deberían reducir ambigüedad, no solo acumular artefactos. Una limitación convierte la evidencia de una insignia de confianza en un límite alrededor de la afirmación que puede hacerse con seguridad.",
      },
    ],
    currentBoundary:
      "La Evidence Library pública actual comienza con AutoPulse y CV Engine. Sistemas adicionales solo entran al corpus después de recuperar sus propios límites de publicabilidad y techo de afirmaciones.",
  },
  "N-08": {
    title: "¿Cuándo una publicación se convierte en una sola oportunidad?",
    thesis:
      "El historial de observación no es el mismo problema que la identidad lógica de una oportunidad a través de fuentes y tiempo.",
    sections: [
      {
        heading: "Lo que existe ahora",
        body:
          "La arquitectura de mercado actual puede preservar una MarketObservation semántica separada de cada ObservationOccurrence, ingerir ofertas controladas de proveedores, proyectar texto autorizado por la fuente y evaluar el JobSnapshot durable resultante.",
      },
      {
        heading: "El siguiente límite",
        body:
          "Una pregunta diferente aparece cuando Greenhouse, Lever, Ashby u otras fuentes futuras pueden describir lo que lógicamente es la misma oportunidad, o cuando una fuente cambia, desaparece y vuelve. La identidad de observación por sí sola no resuelve deduplicación entre fuentes ni ciclo de vida.",
      },
      {
        heading: "La pregunta que mantengo abierta",
        body:
          "¿Qué evidencia debería autorizar que dos registros fuente se conviertan en una sola Opportunity lógica, y cómo deberían evolucionar OPEN, CLOSED, STALE y freshness sin borrar la historia de las fuentes? Ese es el problema arquitectónico actual M4B-07.",
      },
    ],
    currentBoundary:
      "EXPLORANDO — M4B-07 es el siguiente paso. La identidad lógica entre fuentes, deduplicación, ciclo OPEN/CLOSED/STALE y semántica de freshness no se declaran completas.",
  },
} as const;
