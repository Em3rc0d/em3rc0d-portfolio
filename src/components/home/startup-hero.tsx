"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { SignatureAssembly } from "@/components/home/signature-assembly";
import {
  localeFromPathname,
  localizedHref,
  navigationLabels,
} from "@/lib/i18n";

const STARTUP_SESSION_KEY = "build-room-startup-seen";
const STARTUP_DURATION_MS = 1200;

const NAV = [
  ["systems", "/systems"],
  ["notes", "/notes"],
  ["evidence", "/evidence"],
  ["about", "/about"],
  ["contact", "/contact"],
] as const;

const copy = {
  en: {
    parameters: ["IDENTITY", "SYSTEMS", "EVIDENCE", "INTERFACE"],
    softwareSystems: "SOFTWARE SYSTEMS",
    ready: "READY",
    line1: "I turn messy",
    line2: "operational problems",
    line3: "into working software.",
    role: "Software Developer — Systems, Full Stack & Applied AI",
    explore: "Explore systems",
    conversation: "Start a conversation",
    systemReady: "SYSTEM READY",
    initialization: "BUILD ROOM INITIALIZATION",
    aligning: "ALIGNING SYSTEM RESPONSIBILITIES",
    lock: "LOCK",
  },
  es: {
    parameters: ["IDENTIDAD", "SISTEMAS", "EVIDENCIA", "INTERFAZ"],
    softwareSystems: "SISTEMAS DE SOFTWARE",
    ready: "LISTO",
    line1: "Convierto problemas",
    line2: "operativos complejos",
    line3: "en software funcional.",
    role: "Desarrollador de Software — Sistemas, Full Stack e IA Aplicada",
    explore: "Explorar sistemas",
    conversation: "Iniciar una conversación",
    systemReady: "SISTEMA LISTO",
    initialization: "INICIALIZACIÓN DE BUILD ROOM",
    aligning: "ALINEANDO RESPONSABILIDADES DEL SISTEMA",
    lock: "LOCK",
  },
} as const;

export function StartupHero() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const labels = navigationLabels[locale];
  const text = copy[locale];
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenStartup = window.sessionStorage.getItem(STARTUP_SESSION_KEY) === "1";

    if (reduceMotion || hasSeenStartup) {
      const settleTimer = window.setTimeout(() => {
        setReady(true);
        setShowIntro(false);
      }, 0);

      return () => window.clearTimeout(settleTimer);
    }

    window.sessionStorage.setItem(STARTUP_SESSION_KEY, "1");
    const timer = window.setTimeout(() => {
      setReady(true);
      setShowIntro(false);
    }, STARTUP_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <LayoutGroup id="build-room-entry">
      <section className="carbon-stage hero-stage hero-v2 narrative-frame" aria-labelledby="hero-title">
        <noscript>
          <style>{`.startup-overlay{display:none!important}.hero-v2-content{opacity:1!important}`}</style>
        </noscript>

        <header className="hero-v2-header">
          <motion.div layoutId="build-room-identity" className="hero-v2-identity">
            <Link href={localizedHref("/", locale)} aria-label={labels.home}>
              <span>EM</span>
              <span aria-hidden="true">/</span>
              <span>BUILD ROOM</span>
              <i aria-hidden="true" />
            </Link>
          </motion.div>

          <nav aria-label={labels.primaryNavigation}>
            <ul>
              {NAV.map(([key, baseHref], index) => (
                <li key={baseHref}>
                  <Link href={localizedHref(baseHref, locale)}>
                    <span aria-hidden="true">0{index + 1}</span>
                    {labels[key]}
                  </Link>
                </li>
              ))}
              <li className="language-switch" aria-label={labels.switchLanguage}>
                <Link
                  href={localizedHref(pathname, "en")}
                  aria-current={locale === "en" ? "true" : undefined}
                  aria-label={labels.switchToEnglish}
                >
                  EN
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  href={localizedHref(pathname, "es")}
                  aria-current={locale === "es" ? "true" : undefined}
                  aria-label={labels.switchToSpanish}
                >
                  ES
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="hero-v2-content">
          <div className="hero-v2-copy">
            <div className="hero-v2-kicker">
              <span>EDUARDO MERINO / PORTFOLIO 001</span>
              <span>{text.softwareSystems}</span>
              <span className="hero-v2-status">{text.ready}</span>
            </div>

            <h1 id="hero-title">
              {text.line1}
              <span>{text.line2}</span>
              {text.line3}
            </h1>

            <div className="hero-v2-lower-copy">
              <p>{text.role}</p>
              <div className="hero-v2-actions">
                <Link href={localizedHref("/systems", locale)}>
                  {text.explore} <span aria-hidden="true">↗</span>
                </Link>
                <Link href={localizedHref("/contact", locale)}>{text.conversation}</Link>
              </div>
            </div>
          </div>

          <SignatureAssembly ready={ready || Boolean(reduceMotion)} />
        </div>

        {ready || reduceMotion ? (
          <motion.div
            layoutId="parameter-rail"
            className="parameter-rail parameter-rail-final"
            transition={{ type: "spring", stiffness: 180, damping: 27, mass: 0.8 }}
          >
            <div className="parameter-rail-labels">
              {text.parameters.map((parameter) => (
                <span key={parameter}>{parameter}</span>
              ))}
            </div>
            <div className="parameter-rail-track" aria-hidden="true">
              {Array.from({ length: 16 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
            <motion.span layoutId="system-ready-state" className="parameter-ready">
              {text.systemReady}
            </motion.span>
          </motion.div>
        ) : null}

        <AnimatePresence>
          {showIntro && !reduceMotion ? (
            <motion.div
              key="startup"
              className="startup-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              aria-hidden="true"
            >
              <div className="startup-crosshair">
                <span />
                <span />
              </div>

              <div className="startup-center">
                <div className="startup-coordinate-row">
                  <span>ENTRY / 00</span>
                  <span>{text.initialization}</span>
                  <span>REV / 03</span>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {text.aligning}
                </motion.p>

                <div className="startup-locks">
                  {text.parameters.map((parameter, index) => (
                    <motion.div
                      key={parameter}
                      initial={{ opacity: 0.25 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.12, duration: 0.16 }}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{parameter}</strong>
                      <motion.em
                        initial={{ color: "#6f7478" }}
                        animate={{ color: "#d39d36" }}
                        transition={{ delay: 0.18 + index * 0.12, duration: 0.14 }}
                      >
                        {text.lock}
                      </motion.em>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                layoutId="parameter-rail"
                className="parameter-rail parameter-rail-startup"
                transition={{ type: "spring", stiffness: 180, damping: 27, mass: 0.8 }}
              >
                <div className="parameter-rail-labels">
                  {text.parameters.map((parameter) => (
                    <span key={parameter}>{parameter}</span>
                  ))}
                </div>
                <div className="parameter-rail-track" aria-hidden="true">
                  {Array.from({ length: 16 }, (_, index) => (
                    <motion.i
                      key={index}
                      initial={{ scaleX: 0.05, opacity: 0.2 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        delay: 0.08 + index * 0.04,
                        duration: 0.12,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                    />
                  ))}
                </div>
                <motion.span
                  layoutId="system-ready-state"
                  className="parameter-ready"
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.82, duration: 0.14 }}
                >
                  {text.systemReady}
                </motion.span>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
