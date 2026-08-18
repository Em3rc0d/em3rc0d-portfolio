"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

const LAYERS = [
  ["01", "INTERFACE", "human surface"],
  ["02", "LOGIC", "application rules"],
  ["03", "DATA", "durable state"],
  ["04", "INFRASTRUCTURE", "runtime boundary"],
  ["05", "EVIDENCE", "inspectable proof"],
] as const;

export function SignatureAssembly({ ready }: { ready: boolean }) {
  const reduceMotion = useReducedMotion();
  const settled = ready || Boolean(reduceMotion);

  return (
    <figure className="signature-assembly" aria-labelledby="assembly-caption">
      <div className="signature-assembly-frame" aria-hidden="true">
        <div className="assembly-stack">
          {LAYERS.map(([id, label, detail], index) => {
            const offset = (index - 2) * 1.2;
            const style = {
              "--assembly-depth": `${index * 34}px`,
              "--assembly-offset": `${offset}rem`,
            } as CSSProperties;

            return (
              <motion.div
                className="assembly-layer"
                key={id}
                style={style}
                data-id={id}
                data-label={label}
                data-detail={detail}
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
          data-label="EM"
          data-detail="SYSTEM / 001"
          initial={false}
          animate={{ opacity: settled ? 1 : 0.12 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <figcaption
        id="assembly-caption"
        data-label="SIGNATURE SYSTEM / FIVE RESPONSIBILITIES"
      >
        Interface, logic, data, infrastructure and evidence align into one
        inspectable system. Mechanical behavior is the undertone—not the subject.
      </figcaption>
    </figure>
  );
}
