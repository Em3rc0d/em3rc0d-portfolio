"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

const copy: Record<Locale, { email: string; copy: string; copied: string }> = {
  en: { email: "Email me", copy: "Copy email", copied: "Copied" },
  es: { email: "Escríbeme", copy: "Copiar correo", copied: "Copiado" },
  pt: { email: "Enviar e-mail", copy: "Copiar e-mail", copied: "Copiado" },
};

export function EmailActions({ locale = "en" }: { locale?: Locale }) {
  const [copied, setCopied] = useState(false);
  const t = copy[locale];

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const field = document.createElement("textarea");
        field.value = profile.email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return <div className="contact-email-actions">
    <a href={`mailto:${profile.email}`} className="button primary">{t.email} <span aria-hidden="true">↗</span></a>
    <button type="button" className="button contact-copy" onClick={copyEmail}>{copied ? t.copied : t.copy}</button>
    <span className="sr-only" aria-live="polite">{copied ? t.copied : ""}</span>
  </div>;
}
