export const supportingCaseTranslationsEs = {
  "infrastructure-site-mapper": {
    reputationLabel: "PROFUNDIDAD PROFESIONAL",
    context:
      "Una aplicación real de operaciones de infraestructura profesional. El registro público está deliberadamente abstraído: conserva el problema de ingeniería, el límite de responsabilidad, la arquitectura y la evidencia, mientras oculta activos del empleador/cliente e identificadores operativos.",
    problem:
      "Los datos de infraestructura física solo son operativamente útiles cuando ubicación, jerarquía, dimensiones, relaciones de equipos y contexto de dispositivos permanecen conectados. Aplanar esa realidad en pantallas aisladas hace la navegación más fácil de dibujar, pero más difícil de confiar y operar.",
    responsibility:
      "Eduardo contribuyó como desarrollador de software en implementación y hardening. El trabajo revisado incluye flujos de datos respaldados por persistencia, comportamiento de provisioning, vistas de dispositivos y telemetría, comportamiento basado en roles y QA de seguridad. Este registro no afirma propiedad exclusiva del sistema profesional.",
    architecture: [
      {
        title: "Preservar la jerarquía",
        body:
          "La navegación mantiene explícitos sitio, estructura, nivel, sala, posición y contexto de equipo para que una vista profunda de dispositivo siga perteneciendo a un modelo físico operativo.",
      },
      {
        title: "Derivar el espacio desde los datos",
        body:
          "El renderizado espacial está guiado por reglas de grid y dimensiones físicas, en lugar de posiciones fijas en píxeles, para que la distribución de equipos refleje datos y no una composición específica de screenshot.",
      },
      {
        title: "Conservar el contexto del dispositivo",
        body:
          "Provisioning, representación de equipos, contexto de telemetría y vistas operativas permanecen conectados a la misma jerarquía de infraestructura recuperada.",
      },
    ],
    implementation: [
      {
        title: "Datos y persistencia",
        body:
          "El trabajo de implementación incluyó datos de infraestructura respaldados por persistencia y las rutas de aplicación que los consumen, en lugar de dejar la experiencia dependiente de coordenadas mock estáticas.",
      },
      {
        title: "Vistas operativas",
        body:
          "Las vistas relacionadas con dispositivos, equipos, provisioning y telemetría evolucionaron para que operadores pudieran moverse desde el contexto de la instalación hacia un estado de infraestructura específico.",
      },
      {
        title: "Hardening",
        body:
          "El comportamiento basado en roles, contención de seguridad no disruptiva y QA de seguridad fueron workstreams de ingeniería explícitos en la historia profesional revisada.",
      },
    ],
    constraints: [
      "La jerarquía física y las dimensiones no podían tratarse como metadata decorativa de UI.",
      "El renderizado y la navegación debían seguir siendo guiados por datos conforme cambiaban equipos y ubicaciones.",
      "La confidencialidad profesional impone un límite más estricto a la evidencia pública que la completitud visual.",
    ],
    limitation:
      "La identidad del cliente/empresa, coordenadas del repositorio privado, screenshots, datos del sitio, detalles de seguridad e identificadores operativos se ocultan intencionalmente. El caso demuestra una responsabilidad acotada de implementación y un patrón de arquitectura; no afirma autoría del sistema completo, métricas de producción ni resultados que no puedan publicarse de forma segura.",
  },
  gpets: {
    reputationLabel: "EVIDENCIA FULL STACK",
    context:
      "Un sistema archivado de reto técnico que es útil aquí por una razón: el repositorio público expone una ruta completa de aplicación desde el comportamiento del navegador, pasando por servicios backend autenticados, hasta persistencia, entrega en tiempo real y manejo de replay offline.",
    problem:
      "Un flujo geoespacial de incidentes tiene que mantener coherentes un mapa orientado al usuario, identidad, escrituras API, registros durables, actualizaciones en tiempo real y conectividad intermitente. Resolver una sola capa no haría funcionar el comportamiento end-to-end.",
    responsibility:
      "Eduardo construyó la implementación del reto a través de la superficie del navegador y la integración backend Spring representada por el repositorio público. El portfolio usa el código actual como autoridad y no infiere uso en producción a partir del contexto del reto.",
    architecture: [
      {
        title: "Navegador → API autenticada",
        body:
          "El navegador inicializa configuración de producto y mapas, autentica mediante Firebase, obtiene un ID token y llama endpoints Spring REST protegidos con autorización bearer.",
      },
      {
        title: "API → servicio → persistencia",
        body:
          "Los controllers delegan operaciones de incidentes y propietarios a servicios de aplicación que persisten estado en Firebase Realtime Database, con Redis usado para responsabilidades acotadas de cache/idempotencia.",
      },
      {
        title: "Persistencia → clientes en tiempo real",
        body:
          "Las escrituras exitosas de incidentes se publican mediante STOMP; los clientes del navegador reconcilian los eventos recibidos en la colección, mapa, feed y estado de UI actuales.",
      },
      {
        title: "Offline → límite de replay",
        body:
          "IndexedDB almacena mutaciones pendientes del navegador y asigna claves de idempotencia antes del replay, mientras el backend conserva claves procesadas durante un tiempo acotado para reducir efectos duplicados.",
      },
    ],
    implementation: [
      {
        title: "Superficie de producto",
        body:
          "Código vanilla del navegador coordina Google Maps, filtros, geolocalización, estado de autenticación, notificaciones en tiempo real e interacciones optimistas de incidentes.",
      },
      {
        title: "Límite backend",
        body:
          "Controllers y servicios Spring, junto con un filtro de autenticación, hacen explícitas del lado servidor las responsabilidades HTTP, verificación de identidad, persistencia y publicación en tiempo real.",
      },
      {
        title: "Entrega consciente de fallas",
        body:
          "La cola offline, comportamiento de reconexión, claves de idempotencia y cache de idempotencia backend muestran que interrupción de red y replay fueron modelados como comportamiento de producto y no ignorados como detalles del happy path.",
      },
    ],
    constraints: [
      "La configuración externa de Firebase y Google Maps debe permanecer ligada al entorno y no incrustada como credenciales privadas.",
      "La entrega en tiempo real y el replay offline introducen límites de duplicados, reconexión y tokens vencidos que un CRUD estático no expone.",
      "El sistema es evidencia archivada de un reto técnico; la evidencia de código no debe promoverse a afirmaciones de escala de producción o adopción comercial.",
    ],
    limitation:
      "El repositorio público demuestra la ruta de implementación representada aquí. No demuestra disponibilidad actual del deployment, tráfico de producción, SLA, adopción comercial, escala multi-región ni que todos los modos de falla de sistemas distribuidos estén resueltos.",
    sourceLinkLabel: "Inspeccionar el código público de GPets en GitHub",
  },
} as const;
