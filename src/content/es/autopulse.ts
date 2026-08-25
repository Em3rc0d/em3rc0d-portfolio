export const autopulseCaseEs = {
  id: "01",
  name: "AutoPulse",
  label: "TELEMETRÍA DEL MUNDO REAL",
  role: "Constructor principal",
  state: "I+D ACTIVO",
  thesis:
    "La telemetría real es imperfecta. AutoPulse hace explícitas la adquisición, persistencia, interrupción, recuperación e integridad, en lugar de fingir que cada sesión es un flujo limpio.",
  path: ["Adquirir", "Ensamblar", "Persistir", "Recuperar", "Interpretar"],
  problemSignals: [
    {
      id: "P-01",
      title: "Un comando puede devolver NO_DATA.",
      detail:
        "NO_DATA es diferente de cero, un timeout, una desconexión o una respuesta negativa.",
    },
    {
      id: "P-02",
      title: "La app puede desaparecer a mitad de una sesión.",
      detail:
        "El ciclo de vida del proceso puede terminar mientras la telemetría ya persistida continúa existiendo.",
    },
    {
      id: "P-03",
      title: "La persistencia puede estar mal sin estar vacía.",
      detail:
        "Saltos de secuencia, reintentos conflictivos, payloads truncados y CRC incorrectos necesitan resultados distintos.",
    },
  ],
  architecture: [
    {
      id: "acquisition",
      number: "01",
      label: "ADQUISICIÓN",
      title: "RealTelemetryPoller",
      detail:
        "Serializa el polling de comandos OBD en vivo y mantiene el comportamiento NO_DATA separado de las fallas de transporte.",
      evidence: "E-AP-07",
    },
    {
      id: "events",
      number: "02",
      label: "MODELO DE EVENTOS",
      title: "ObdAcquisitionMapper",
      detail:
        "Convierte los resultados de comandos en eventos de adquisición que preservan estado y contexto de diagnóstico.",
      evidence: "E-AP-02",
    },
    {
      id: "blocks",
      number: "03",
      label: "ESTADO ACOTADO",
      title: "TelemetryBlockAssembler",
      detail:
        "Agrupa eventos de adquisición en ventanas acotadas antes de que entren a la ruta de persistencia.",
      evidence: "E-AP-01",
    },
    {
      id: "codec",
      number: "04",
      label: "FORMATO BINARIO",
      title: "BinaryObd2V3Codec",
      detail:
        "Codifica lecturas, respuestas negativas, fragmentos raw y frames en un payload binario versionado con metadata CRC.",
      evidence: "E-AP-02",
    },
    {
      id: "queue",
      number: "05",
      label: "ORDEN DE COMMIT",
      title: "TelemetryCommitQueue",
      detail:
        "Serializa commits y reintenta únicamente las fallas de persistencia explícitamente transitorias.",
      evidence: "E-AP-04",
    },
    {
      id: "storage",
      number: "06",
      label: "ALMACENAMIENTO DURABLE",
      title: "TelemetryBlockRepository",
      detail:
        "Valida identidad de sesión/workspace, secuencia de bloques, idempotencia, longitud de bytes y CRC antes de considerar durable un bloque.",
      evidence: "E-AP-03",
    },
    {
      id: "recovery",
      number: "07",
      label: "RECUPERACIÓN",
      title: "LiveSessionRepository",
      detail:
        "Reconcilia sesiones huérfanas desde bloques persistidos y registra explícitamente la terminación inesperada.",
      evidence: "E-AP-06",
    },
    {
      id: "summary",
      number: "08",
      label: "INTERPRETACIÓN",
      title: "SessionSummaryBuilder",
      detail:
        "Construye resúmenes de señales y clasifica la integridad de la sesión sin borrar estados parciales, corruptos o no disponibles.",
      evidence: "E-AP-08",
    },
  ],
  decisions: [
    {
      id: "D-01",
      title: "Persistir bloques acotados, no un flujo de lecturas aisladas.",
      why:
        "Una sesión necesita unidades durables y reproducibles con secuencia y metadata de integridad, no únicamente los últimos valores visibles en la UI.",
      tradeoff:
        "La recuperación trabaja a nivel de bloques, por lo que los límites y reglas de secuencia pasan a formar parte del contrato de dominio.",
      evidence: ["E-AP-01", "E-AP-03"],
    },
    {
      id: "D-02",
      title: "Tratar NO_DATA como resultado de adquisición, no como cero.",
      why:
        "Una respuesta ausente significa algo distinto de un cero numérico válido y no debe corromper el significado silenciosamente.",
      tradeoff:
        "La capa de polling debe preservar más estados de resultado y gestionar explícitamente NO_DATA repetidos.",
      evidence: ["E-AP-02", "E-AP-07"],
    },
    {
      id: "D-03",
      title: "Recuperar una interrupción como interrupción.",
      why:
        "Una terminación inesperada debe reconciliar contadores durables sin reescribir la historia como una finalización limpia.",
      tradeoff:
        "El ciclo de vida de la sesión necesita estados terminales/intermedios y eventos de recuperación en lugar de un simple indicador booleano de ejecución.",
      evidence: ["E-AP-05", "E-AP-06", "E-AP-08"],
    },
  ],
  verification: [
    {
      claim: "El payload V3 preserva resultados de adquisición más ricos.",
      state: "ARTEFACTO DE PRUEBA",
      evidence: "E-AP-02",
      proof:
        "Los fixtures del codec cubren lecturas, velocidad cero, respuestas negativas, fragmentos raw, NO_DATA, cancelación, corrupción y rechazo de versión.",
    },
    {
      claim: "La persistencia rechaza estados inválidos de secuencia/integridad.",
      state: "ARTEFACTO DE PRUEBA",
      evidence: "E-AP-03",
      proof:
        "Las pruebas del repositorio cubren idempotencia, conflicto, salto de secuencia, lectura byte-perfect y clasificación de corrupción CRC.",
    },
    {
      claim: "Las sesiones huérfanas pueden reconciliarse como interrumpidas.",
      state: "ARTEFACTO DE PRUEBA",
      evidence: "E-AP-06",
      proof:
        "La prueba de integración inspecciona contadores reconciliados y el estado UNEXPECTED_APP_TERMINATION.",
    },
    {
      claim: "La integridad de una sesión puede permanecer incompleta o degradada.",
      state: "ARTEFACTO DE PRUEBA",
      evidence: "E-AP-08",
      proof:
        "Las pruebas de resumen cubren casos parciales, degradados, no disponibles, corruptos/no soportados, gaps y regresiones.",
    },
    {
      claim: "La ruta de código actual está validada físicamente end-to-end en campo.",
      state: "NO DECLARADO",
      evidence: "FIELD GATE",
      proof:
        "Existe contexto histórico de pruebas físicas, pero esta auditoría del portfolio no cerró de forma independiente un gate actual de validación end-to-end en campo para main.",
    },
  ],
  evidence: [
    ["E-AP-01", "Bloques de telemetría acotados", "IMPLEMENTADO"],
    ["E-AP-02", "Codec BINARY_OBD2_V3", "FUENTE + ARTEFACTO DE PRUEBA"],
    ["E-AP-03", "Integridad y secuencia de persistencia", "FUENTE + ARTEFACTO DE PRUEBA"],
    ["E-AP-04", "Commit ordenado / reintento acotado", "IMPLEMENTADO"],
    ["E-AP-05", "Ciclo de vida explícito de sesión", "IMPLEMENTADO"],
    ["E-AP-06", "Recuperación de huérfanas", "FUENTE + ARTEFACTO DE PRUEBA"],
    ["E-AP-07", "Comportamiento NO_DATA", "FUENTE + ARTEFACTO DE PRUEBA"],
    ["E-AP-08", "Resumen / integridad de sesión", "FUENTE + ARTEFACTO DE PRUEBA"],
    ["E-AP-09", "Superficies de producto", "FUENTE VERIFICADA"],
  ] as const,
} as const;
