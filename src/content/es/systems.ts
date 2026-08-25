export const systemTranslationsEs = {
  autopulse: {
    label: "TELEMETRÍA DEL MUNDO REAL",
    summary:
      "Un sistema de telemetría enfocado en hacer que señales poco confiables del mundo real puedan persistirse, recuperarse y utilizarse.",
    path: ["Capturar", "Persistir", "Recuperar", "Analizar"],
    ownership: "Constructor principal",
  },
  "cv-engine": {
    label: "INTELIGENCIA DE APLICACIONES",
    summary:
      "Un sistema guiado por evidencia para comprender oportunidades, medir compatibilidad y decidir cómo competir.",
    path: ["Evidencia", "Snapshot", "Match", "Decisión", "Aplicación"],
    ownership: "Constructor principal",
  },
  "infrastructure-site-mapper": {
    label: "PROFESIONAL / OPERACIONES DE INFRAESTRUCTURA",
    summary:
      "Un registro profesional abstraído que muestra cómo jerarquía de infraestructura física, datos espaciales, contexto de dispositivos y vistas operativas se convirtieron en software funcional.",
    path: ["Jerarquía", "Modelo espacial", "Contexto de dispositivo", "Vistas operativas"],
    ownership: "Desarrollador de software — implementación y hardening",
  },
  gpets: {
    label: "FULL STACK / PRODUCTO EN TIEMPO REAL",
    summary:
      "Un sistema full stack de reto técnico que conecta un mapa en el navegador, APIs REST autenticadas, persistencia, actualizaciones en tiempo real y sincronización segura ante desconexiones.",
    path: ["Navegador", "API", "Servicio", "Datos", "Tiempo real"],
    ownership: "Constructor",
  },
} as const;
