import { autopulseCase } from "@/content/autopulse";
import { cvEngineCase } from "@/content/cv-engine";
import { publicEvidenceRecords } from "@/content/evidence-index";
import { publicNotes } from "@/content/notes";
import { findSupportingCase } from "@/content/supporting-cases";
import { systems } from "@/content/systems";
import { autopulseCaseEs } from "@/content/es/autopulse";
import { cvEngineCaseEs } from "@/content/es/cv-engine";
import {
  evidenceTranslationsEs,
  privateProfessionalSourceNoteEs,
  sourceLabelTranslationsEs,
} from "@/content/es/evidence";
import { noteTranslationsEs } from "@/content/es/notes";
import { supportingCaseTranslationsEs } from "@/content/es/supporting-cases";
import { systemTranslationsEs } from "@/content/es/systems";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { EvidenceRecord, NoteRecord, SystemRecord } from "@/lib/content/types";

function requiresPublicTranslation(system: SystemRecord) {
  return Boolean(system.href) && system.publicability !== "PRIVATE" && system.role !== "RESERVED";
}

export function getLocalizedSystems(locale: Locale): readonly SystemRecord[] {
  if (locale === "en") return systems;

  return systems.map((system) => {
    const translation = systemTranslationsEs[
      system.slug as keyof typeof systemTranslationsEs
    ];

    if (!translation) {
      if (requiresPublicTranslation(system)) {
        throw new Error(`Missing Spanish system translation for ${system.slug}`);
      }
      return system;
    }

    return {
      ...system,
      ...translation,
      href: system.href ? localizedHref(system.href, locale) : undefined,
    };
  });
}

export function getLocalizedPublicSystems(locale: Locale) {
  return getLocalizedSystems(locale).filter(
    (system) => requiresPublicTranslation(system),
  );
}

export function getLocalizedSystemBySlug(slug: string, locale: Locale) {
  return getLocalizedSystems(locale).find(
    (system) => system.slug === slug && system.publicability !== "PRIVATE",
  );
}

export function getLocalizedAutoPulseCase(locale: Locale) {
  return locale === "es" ? autopulseCaseEs : autopulseCase;
}

export function getLocalizedCvEngineCase(locale: Locale) {
  return locale === "es" ? cvEngineCaseEs : cvEngineCase;
}

export function getLocalizedEvidenceRecords(locale: Locale): readonly EvidenceRecord[] {
  if (locale === "en") return publicEvidenceRecords;

  return publicEvidenceRecords.map((record) => {
    const translation = evidenceTranslationsEs[
      record.id as keyof typeof evidenceTranslationsEs
    ];

    if (!translation) {
      throw new Error(`Missing Spanish evidence translation for ${record.id}`);
    }

    return {
      ...record,
      ...translation,
      sources: record.sources.map((source) => ({
        ...source,
        label: sourceLabelTranslationsEs[source.label] ?? source.label,
        note:
          source.access === "PRIVATE_WITHHELD"
            ? privateProfessionalSourceNoteEs
            : source.note,
      })),
    };
  });
}

export function findLocalizedEvidenceBySlug(slug: string, locale: Locale) {
  return getLocalizedEvidenceRecords(locale).find((record) => record.slug === slug);
}

export function getLocalizedNotes(locale: Locale): readonly NoteRecord[] {
  if (locale === "en") return publicNotes;

  return publicNotes.map((note) => {
    const translation = noteTranslationsEs[note.id as keyof typeof noteTranslationsEs];
    if (!translation) {
      throw new Error(`Missing Spanish note translation for ${note.id}`);
    }

    return {
      ...note,
      ...translation,
      systemHref: note.systemHref ? localizedHref(note.systemHref, locale) : undefined,
    };
  });
}

export function findLocalizedNoteBySlug(slug: string, locale: Locale) {
  return getLocalizedNotes(locale).find((note) => note.slug === slug);
}

export function getLocalizedSupportingCase(slug: string, locale: Locale) {
  const base = findSupportingCase(slug);
  if (!base || locale === "en") return base;

  const translation = supportingCaseTranslationsEs[
    slug as keyof typeof supportingCaseTranslationsEs
  ];

  if (!translation) {
    throw new Error(`Missing Spanish supporting-case translation for ${slug}`);
  }

  return {
    ...base,
    reputationLabel: translation.reputationLabel,
    context: translation.context,
    problem: translation.problem,
    responsibility: translation.responsibility,
    architecture: translation.architecture,
    implementation: translation.implementation,
    constraints: translation.constraints,
    limitation: translation.limitation,
    sourceLink: base.sourceLink
      ? {
          ...base.sourceLink,
          label:
            "sourceLinkLabel" in translation
              ? translation.sourceLinkLabel
              : base.sourceLink.label,
        }
      : undefined,
  };
}
