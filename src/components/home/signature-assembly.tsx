"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

const LAYERS = [
  {
    id: "01",
    kind: "interface",
    label: "INTERFACE",
    detail: "INPUT → UI → OUTPUT",
  },
  {
    id: "02",
    kind: "logic",
    label: "LOGIC",
    detail: "CAPTURE → VALIDATE → PERSIST",
  },
  {
    id: "03",
    kind: "data",
    label: "DATA",
    detail: "SESSION_ID · TIME · STATE",
  },
  {
    id: "04",
    kind: "infrastructure",
    label: "INFRASTRUCTURE",
    detail: "CLIENT → API → SERVICE → STORE",
  },
  {
    id: "05",
    kind: "evidence",
    label: "EVIDENCE",
    detail: "CLAIM → SOURCE → LIMIT",
  },
] as const;

export function SignatureAssembly({ ready }: { ready: boolean }) {
  const reduceMotion = useReducedMotion();
  const settled = ready || Boolean(reduceMotion);

  return (
    <figure className="signature-assembly" aria-labelledby="assembly-caption">
      <div className="signature-assembly-frame" aria-hidden="true">
        <div className="assembly-stack">
          {LAYERS.map((layer, index) => {
            const offset = (index - 2) * 1.2;
            const style = {
              "--assembly-depth": `${index * 34}px`,
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
          data-detail="05 RESPONSIBILITIES / 01 WHOLE"
          initial={false}
          animate={{ opacity: settled ? 1 : 0.12 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <figcaption
        id="assembly-caption"
        data-label="SIGNATURE SYSTEM / SEPARATE RESPONSIBILITIES → ONE COHERENT SYSTEM"
      >
        Each plate owns a different responsibility. The mechanical idea is the behavior:
        separate parts align, engage and lock only when the system can move from input to
        durable state and inspectable proof.
      </figcaption>
    </figure>
  );
}
