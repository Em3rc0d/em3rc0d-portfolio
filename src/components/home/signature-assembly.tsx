"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { localeFromPathname } from "@/lib/i18n";

const layers = {
  en: [
    { id: "01", kind: "interface", label: "INTERFACE", detail: "INPUT → UI → OUTPUT" },
    { id: "02", kind: "logic", label: "LOGIC", detail: "CAPTURE → VALIDATE → PERSIST" },
    { id: "03", kind: "data", label: "DATA", detail: "SESSION_ID · TIME · STATE" },
    { id: "04", kind: "infrastructure", label: "INFRASTRUCTURE", detail: "CLIENT → API → SERVICE → STORE" },
    { id: "05", kind: "evidence", label: "EVIDENCE", detail: "CLAIM → SOURCE → LIMIT" },
  ],
  es: [
    { id: "01", kind: "interface", label: "INTERFAZ", detail: "ENTRADA → UI → SALIDA" },
    { id: "02", kind: "logic", label: "LÓGICA", detail: "CAPTURAR → VALIDAR → PERSISTIR" },
    { id: "03", kind: "data", label: "DATOS", detail: "SESSION_ID · TIEMPO · ESTADO" },
    { id: "04", kind: "infrastructure", label: "INFRAESTRUCTURA", detail: "CLIENTE → API → SERVICIO → STORE" },
    { id: "05", kind: "evidence", label: "EVIDENCIA", detail: "AFIRMACIÓN → FUENTE → LÍMITE" },
  ],
} as const;

const copy = {
  en: {
    core: "05 RESPONSIBILITIES / 01 WHOLE",
    signature: "SIGNATURE SYSTEM / SEPARATE RESPONSIBILITIES → ONE COHERENT SYSTEM",
    responsibilities: "INTERFACE / LOGIC / DATA / INFRASTRUCTURE / EVIDENCE",
    caption:
      "Each plate owns a different responsibility. The mechanical idea is the behavior: separate parts align, engage and lock only when the system can move from input to durable state and inspectable proof.",
  },
  es: {
    core: "05 RESPONSABILIDADES / 01 TODO",
    signature: "SISTEMA FIRMA / RESPONSABILIDADES SEPARADAS → UN SISTEMA COHERENTE",
    responsibilities: "INTERFAZ / LÓGICA / DATOS / INFRAESTRUCTURA / EVIDENCIA",
    caption:
      "Cada placa posee una responsabilidad diferente. La idea mecánica es el comportamiento: partes separadas se alinean, acoplan y bloquean solo cuando el sistema puede pasar de una entrada a un estado durable y una evidencia inspeccionable.",
  },
} as const;

export function SignatureAssembly({ ready }: { ready: boolean }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const visibleLayers = layers[locale];
  const text = copy[locale];
  const reduceMotion = useReducedMotion();
  const settled = ready || Boolean(reduceMotion);

  return (
    <figure className="signature-assembly" aria-labelledby="assembly-caption">
      <div className="signature-assembly-frame" aria-hidden="true">
        <div className="assembly-stack">
          {visibleLayers.map((layer, index) => {
            const offset = (index - 2) * 2.75;
            const style = {
              "--assembly-depth": `${index * 22}px`,
              "--assembly-offset": `${offset}rem`,
            } as CSSProperties;

            return (
              <motion.div
                className="assembly-layer"
                key={layer.id}
                style={style}
                data-id={layer.id}
                data-kind={layer.kind}
                data-label={layer.label}
                data-detail={layer.detail}
                initial={false}
                animate={{ opacity: settled ? 1 : 0.14 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.055,
                  duration: reduceMotion ? 0 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="assembly-core"
          data-label="SYSTEM"
          data-detail={text.core}
          initial={false}
          animate={{ opacity: settled ? 1 : 0.12 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <figcaption id="assembly-caption" data-label={text.signature}>
        <strong className="assembly-responsibilities">{text.responsibilities}</strong>
        {text.caption}
      </figcaption>
    </figure>
  );
}
