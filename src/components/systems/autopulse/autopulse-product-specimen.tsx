import Link from "next/link";
import { autopulseCase } from "@/content/autopulse";

const LIVE_METRICS = [
  ["Engine RPM", "rpm"],
  ["Vehicle Speed", "km/h"],
  ["Engine Coolant", "°C"],
  ["Control Voltage", "V"],
] as const;

export function AutoPulseProductSpecimen() {
  return (
    <figure className="ap-product-specimen" aria-labelledby="ap-product-specimen-caption">
      <div className="ap-specimen-sourcebar">
        <span>CURRENT IMPLEMENTATION / PUBLIC SPECIMEN</span>
        <strong>LIVE SESSION SCREEN</strong>
      </div>

      <div className="ap-specimen-screen">
        <header className="ap-specimen-header">
          <div>
            <strong>Live Telemetry</strong>
            <span>Vehicle context · ECU Direct · Session [id]</span>
          </div>
          <b>00:00</b>
        </header>

        <div className="ap-specimen-live-state">LIVE · ECU DATA</div>

        <div className="ap-specimen-metrics" aria-label="Telemetry metric surfaces from the current LiveSessionScreen">
          {LIVE_METRICS.map(([label, unit]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>— <small>{unit}</small></strong>
              <em>ECU direct</em>
            </div>
          ))}
        </div>

        <div className="ap-specimen-chart">
          <div>
            <span>RPM History</span>
            <small>REAL UI STATE / VALUES OMITTED</small>
          </div>
          <div className="ap-specimen-chart-field" aria-label="RPM history chart area without fabricated telemetry values">
            <span>Waiting for verified field data…</span>
          </div>
        </div>

        <div className="ap-specimen-stop">STOP SESSION</div>
      </div>

      <figcaption id="ap-product-specimen-caption">
        <p>
          Reconstructed from the current React Native <code>LiveSessionScreen</code> source.
          Labels, states and metric surfaces are source-true; runtime values are intentionally
          omitted because this is not a captured field session.
        </p>
        <Link href="/evidence/e-ap-04">E-AP-04 / inspect UI-state evidence →</Link>
      </figcaption>

      <div className="ap-specimen-system-path" aria-label="AutoPulse system path, secondary to the product specimen">
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
