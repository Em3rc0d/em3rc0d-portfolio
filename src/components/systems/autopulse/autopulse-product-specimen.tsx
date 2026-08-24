"use client";

import {useLocale} from "next-intl";
import {getLocalizedAutoPulseCase} from "@/content/localized";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

const copy = {
  en: {
    metrics: [["Engine RPM", "rpm"], ["Vehicle Speed", "km/h"], ["Engine Coolant", "°C"], ["Control Voltage", "V"]],
    sourcebar: "CURRENT IMPLEMENTATION / PUBLIC SPECIMEN",
    screen: "LIVE SESSION SCREEN",
    telemetry: "Live Telemetry",
    context: "Vehicle context · ECU Direct · Session [id]",
    live: "LIVE · ECU DATA",
    metricsAria: "Telemetry metric surfaces from the current LiveSessionScreen",
    ecu: "ECU direct",
    history: "RPM History",
    omitted: "REAL UI STATE / VALUES OMITTED",
    chartAria: "RPM history chart area without fabricated telemetry values",
    waiting: "Waiting for verified field data…",
    stop: "STOP SESSION",
    caption:
      "Reconstructed from the current React Native LiveSessionScreen source. Labels, states and metric surfaces are source-true; runtime values are intentionally omitted because this is not a captured field session.",
    inspect: "E-AP-04 / inspect UI-state evidence →",
    pathAria: "AutoPulse system path, secondary to the product specimen",
  },
  es: {
    metrics: [["RPM del motor", "rpm"], ["Velocidad del vehículo", "km/h"], ["Refrigerante del motor", "°C"], ["Voltaje de control", "V"]],
    sourcebar: "IMPLEMENTACIÓN ACTUAL / ESPÉCIMEN PÚBLICO",
    screen: "PANTALLA DE SESIÓN LIVE",
    telemetry: "Telemetría en vivo",
    context: "Contexto del vehículo · ECU directa · Sesión [id]",
    live: "LIVE · DATOS ECU",
    metricsAria: "Superficies de métricas de telemetría de LiveSessionScreen actual",
    ecu: "ECU directa",
    history: "Historial RPM",
    omitted: "ESTADO REAL DE UI / VALORES OMITIDOS",
    chartAria: "Área del gráfico de historial RPM sin valores de telemetría fabricados",
    waiting: "Esperando datos de campo verificados…",
    stop: "DETENER SESIÓN",
    caption:
      "Reconstruido desde el código actual de React Native LiveSessionScreen. Etiquetas, estados y superficies de métricas son fieles al código; los valores runtime se omiten intencionalmente porque esto no es una sesión de campo capturada.",
    inspect: "E-AP-04 / inspeccionar evidencia del estado de UI →",
    pathAria: "Ruta del sistema AutoPulse, secundaria al espécimen de producto",
  },
} as const;

export function AutoPulseProductSpecimen() {
  const locale = useLocale() as AppLocale;
  const text = copy[locale];
  const autopulseCase = getLocalizedAutoPulseCase(locale);

  return (
    <figure className="ap-product-specimen" aria-labelledby="ap-product-specimen-caption">
      <div className="ap-specimen-sourcebar">
        <span>{text.sourcebar}</span>
        <strong>{text.screen}</strong>
      </div>

      <div className="ap-specimen-screen">
        <header className="ap-specimen-header">
          <div>
            <strong>{text.telemetry}</strong>
            <span>{text.context}</span>
          </div>
          <b>00:00</b>
        </header>

        <div className="ap-specimen-live-state">{text.live}</div>

        <div className="ap-specimen-metrics" aria-label={text.metricsAria}>
          {text.metrics.map(([label, unit]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>— <small>{unit}</small></strong>
              <em>{text.ecu}</em>
            </div>
          ))}
        </div>

        <div className="ap-specimen-chart">
          <div>
            <span>{text.history}</span>
            <small>{text.omitted}</small>
          </div>
          <div className="ap-specimen-chart-field" aria-label={text.chartAria}>
            <span>{text.waiting}</span>
          </div>
        </div>

        <div className="ap-specimen-stop">{text.stop}</div>
      </div>

      <figcaption id="ap-product-specimen-caption">
        <p>{text.caption}</p>
        <Link href="/evidence/e-ap-04" prefetch={false}>{text.inspect}</Link>
      </figcaption>

      <div className="ap-specimen-system-path" aria-label={text.pathAria}>
        {autopulseCase.path.map((step, index) => (
          <span key={step}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            {step}
          </span>
        ))}
      </div>
    </figure>
  );
}
