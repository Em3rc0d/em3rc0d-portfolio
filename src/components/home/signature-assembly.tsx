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
  const settled = ready || reduceMotion;

  return (
    <figure className="signature-assembly" aria-labelledby="assembly-caption">
      <div className="signature-assembly-frame" aria-hidden="true">
        <span className="assembly-axis assembly-axis-x" />
        <span className="assembly-axis assembly-axis-y" />
        <span className="assembly-orbit assembly-orbit-a" />
        <span className="assembly-orbit assembly-orbit-b" />

        <div className="assembly-stack">
          {LAYERS.map(([id, label, detail], index) => {
            const style = {
              "--assembly-depth": `${index * 34}px`,
              "--assembly-index": index,
            } as CSSProperties;

            return (
              <motion.div
                className="assembly-layer-motion"
                key={id}
                initial={false}
                animate={{
                  opacity: settled ? 1 : 0.18,
                  x: settled ? 0 : (index - 2) * 18,
                  y: settled ? 0 : (2 - index) * 11,
                  scale: settled ? 1 : 0.96,
                }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.055,
                  duration: reduceMotion ? 0 : 0.48,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="assembly-layer" style={style}>
                  <span>{id}</span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                  <i />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="assembly-core-motion"
          initial={false}
          animate={{ opacity: settled ? 1 : 0.15, scale: settled ? 1 : 0.76 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="assembly-core">
            <span>EM</span>
            <small>SYSTEM / 001</small>
          </div>
        </motion.div>

        <div className="assembly-trace assembly-trace-a" />
        <div className="assembly-trace assembly-trace-b" />
      </div>

      <figcaption id="assembly-caption">
        <span>SIGNATURE SYSTEM / FIVE RESPONSIBILITIES</span>
        <p>
          Interface, logic, data, infrastructure and evidence align into one
          inspectable system. Mechanical behavior is the undertone—not the subject.
        </p>
      </figcaption>
    </figure>
  );
}
