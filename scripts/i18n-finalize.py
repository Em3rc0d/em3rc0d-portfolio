from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 occurrence, found {count}")
    return text.replace(old, new, 1)


# Locale layout: restore the existing Open Graph image explicitly.
path = Path("src/app/[locale]/layout.tsx")
text = path.read_text()
text = replace_once(
    text,
    'import {getSiteOrigin} from "@/lib/site-config";',
    'import {absoluteSiteUrl, getSiteOrigin} from "@/lib/site-config";',
    "layout site-config import",
)
text = replace_once(
    text,
    '  const copy = localeMetadata[locale];\n\n  return {',
    '  const copy = localeMetadata[locale];\n  const socialImage = absoluteSiteUrl("/opengraph-image");\n\n  return {',
    "layout social image declaration",
)
text = replace_once(
    text,
    '      description: copy.description,\n      locale: copy.openGraphLocale,\n    },\n    twitter: {\n      card: "summary_large_image",\n      title: copy.title,\n      description: copy.description,\n    },',
    '      description: copy.description,\n      locale: copy.openGraphLocale,\n      ...(socialImage ? {images: [{url: socialImage, width: 1200, height: 630, alt: copy.title}]} : {}),\n    },\n    twitter: {\n      card: "summary_large_image",\n      title: copy.title,\n      description: copy.description,\n      ...(socialImage ? {images: [socialImage]} : {}),\n    },',
    "layout social metadata",
)
path.write_text(text)

# Canonical content must not own locale URL prefixes anymore.
path = Path("src/content/localized.ts")
text = path.read_text()
text = text.replace(
    'import { localizedHref, type Locale } from "@/lib/i18n";',
    'import type { Locale } from "@/lib/i18n";',
)
text = replace_once(
    text,
    '      ...translation,\n      href: system.href ? localizedHref(system.href, locale) : undefined,\n',
    '      ...translation,\n      href: system.href,\n',
    "system canonical href",
)
text = replace_once(
    text,
    '      ...translation,\n      systemHref: note.systemHref ? localizedHref(note.systemHref, locale) : undefined,\n',
    '      ...translation,\n      systemHref: note.systemHref,\n',
    "note canonical href",
)
if "localizedHref" in text:
    raise SystemExit("localized.ts: localizedHref remains")
path.write_text(text)

# Interactive flagship cases receive active locale content from the server route.
flagship_specs = [
    {
        "path": Path("src/components/systems/autopulse/autopulse-case.tsx"),
        "getter": "getLocalizedAutoPulseCase",
        "component": "AutoPulseCase",
        "record": "AutoPulseCaseRecord",
        "prefix": "E-AP-",
        "ref": "EvidenceReference",
        "var": "autopulseCase",
    },
    {
        "path": Path("src/components/systems/cv-engine/cv-engine-case.tsx"),
        "getter": "getLocalizedCvEngineCase",
        "component": "CvEngineCase",
        "record": "CvEngineCaseRecord",
        "prefix": "E-CV-",
        "ref": "EvidenceRef",
        "var": "cvEngineCase",
    },
]

for spec in flagship_specs:
    path = spec["path"]
    text = path.read_text()
    text = replace_once(
        text,
        'import Link from "next/link";\n',
        'import {Link} from "@/i18n/navigation";\n',
        f"{path} Link",
    )
    text = text.replace('import { usePathname } from "next/navigation";\n', "")
    text = replace_once(
        text,
        f'import {{ {spec["getter"]} }} from "@/content/localized";\n',
        f'import type {{ {spec["getter"]} }} from "@/content/localized";\n',
        f"{path} type-only content getter",
    )
    text = replace_once(
        text,
        'import { localeFromPathname, localizedHref, type Locale } from "@/lib/i18n";\n',
        'import type {AppLocale} from "@/i18n/routing";\n',
        f"{path} legacy locale import",
    )

    old_helper = (
        f'function evidenceHref(id: string, locale: Locale) {{\n'
        f'  return id.startsWith("{spec["prefix"]}")\n'
        f'    ? localizedHref(`/evidence/${{id.toLowerCase()}}`, locale)\n'
        f'    : null;\n'
        f'}}\n\n'
        f'function {spec["ref"]}({{ id, locale }}: {{ id: string; locale: Locale }}) {{\n'
        f'  const href = evidenceHref(id, locale);'
    )
    new_helper = (
        f'function evidenceHref(id: string) {{\n'
        f'  return id.startsWith("{spec["prefix"]}")\n'
        f'    ? `/evidence/${{id.toLowerCase()}}`\n'
        f'    : null;\n'
        f'}}\n\n'
        f'function {spec["ref"]}({{ id }}: {{ id: string }}) {{\n'
        f'  const href = evidenceHref(id);'
    )
    text = replace_once(text, old_helper, new_helper, f"{path} evidence helper")

    old_function = (
        f'export function {spec["component"]}() {{\n'
        f'  const pathname = usePathname();\n'
        f'  const locale = localeFromPathname(pathname);\n'
        f'  const {spec["var"]} = {spec["getter"]}(locale);\n'
    )
    new_function = (
        f'type {spec["record"]} = ReturnType<typeof {spec["getter"]}>;\n\n'
        f'export function {spec["component"]}({{locale, {spec["var"]}}}: '
        f'{{locale: AppLocale; {spec["var"]}: {spec["record"]}}}) {{\n'
    )
    text = replace_once(text, old_function, new_function, f"{path} component props")
    text = re.sub(r"\s+locale=\{locale\}", "", text)
    text = re.sub(r'localizedHref\((`[^`]+`|"[^"]+"), locale\)', r"\1", text)

    if spec["component"] == "AutoPulseCase":
        text = replace_once(
            text,
            "<AutoPulseProductSpecimen />",
            "<AutoPulseProductSpecimen path={autopulseCase.path} />",
            "AutoPulse specimen path prop",
        )

    forbidden = ["localeFromPathname", "localizedHref", "usePathname", 'from "next/link"']
    leftovers = [token for token in forbidden if token in text]
    if leftovers:
        raise SystemExit(f"{path}: legacy route plumbing remains: {leftovers}")
    path.write_text(text)

# Product specimen only needs the already-resolved system path.
path = Path("src/components/systems/autopulse/autopulse-product-specimen.tsx")
text = path.read_text()
text = text.replace('import {getLocalizedAutoPulseCase} from "@/content/localized";\n', "")
text = replace_once(
    text,
    'export function AutoPulseProductSpecimen() {\n  const locale = useLocale() as AppLocale;\n  const text = copy[locale];\n  const autopulseCase = getLocalizedAutoPulseCase(locale);\n',
    'export function AutoPulseProductSpecimen({path}: {path: readonly string[]}) {\n  const locale = useLocale() as AppLocale;\n  const text = copy[locale];\n',
    "AutoPulse specimen props",
)
text = replace_once(
    text,
    "        {autopulseCase.path.map((step, index) => (",
    "        {path.map((step, index) => (",
    "AutoPulse specimen path render",
)
if "getLocalizedAutoPulseCase" in text:
    raise SystemExit("AutoPulse specimen still imports case corpus")
path.write_text(text)

# Supporting cases are presentation-only: server-render them and pass exact evidence.
path = Path("src/components/systems/supporting-case.tsx")
text = path.read_text()
text = text.replace('"use client";\n\n', "")
text = text.replace('import {useLocale} from "next-intl";\n', "")
text = text.replace('import {getLocalizedEvidenceRecords} from "@/content/localized";\n', "")
text = replace_once(
    text,
    'import type {SystemRecord} from "@/lib/content/types";',
    'import type {EvidenceRecord, SystemRecord} from "@/lib/content/types";',
    "SupportingCase evidence type",
)
text = replace_once(
    text,
    'interface SupportingCaseProps {\n  system: SystemRecord;\n  record: SupportingCaseRecord;\n}',
    'interface SupportingCaseProps {\n  system: SystemRecord;\n  record: SupportingCaseRecord;\n  locale: AppLocale;\n  evidence: readonly EvidenceRecord[];\n}',
    "SupportingCase props",
)
old_block = (
    'export function SupportingCase({system, record}: SupportingCaseProps) {\n'
    '  const locale = useLocale() as AppLocale;\n'
    '  const text = ui[locale];\n'
    '  const publicEvidenceRecords = getLocalizedEvidenceRecords(locale);\n'
    '  const evidence = record.evidenceIds\n'
    '    .map((id) => publicEvidenceRecords.find((candidate) => candidate.id === id))\n'
    '    .filter((candidate) => candidate !== undefined);\n'
)
new_block = (
    'export function SupportingCase({system, record, locale, evidence}: SupportingCaseProps) {\n'
    '  const text = ui[locale];\n'
)
text = replace_once(text, old_block, new_block, "SupportingCase server data")
for forbidden in ["useLocale", "getLocalizedEvidenceRecords", '"use client"']:
    if forbidden in text:
        raise SystemExit(f"SupportingCase still contains {forbidden}")
path.write_text(text)

# Resolve all localized case data on the server route.
path = Path("src/app/[locale]/systems/[slug]/page.tsx")
text = path.read_text()
text = replace_once(
    text,
    '  getLocalizedPublicSystems,\n  getLocalizedSupportingCase,\n  getLocalizedSystemBySlug,\n',
    '  getLocalizedAutoPulseCase,\n  getLocalizedCvEngineCase,\n  getLocalizedEvidenceRecords,\n  getLocalizedPublicSystems,\n  getLocalizedSupportingCase,\n  getLocalizedSystemBySlug,\n',
    "system page localized imports",
)
text = replace_once(
    text,
    '  if (system.slug === "autopulse") return <AutoPulseCase />;\n  if (system.slug === "cv-engine") return <CvEngineCase />;\n\n  const supportingCase = getLocalizedSupportingCase(system.slug, locale);\n  if (supportingCase) return <SupportingCase system={system} record={supportingCase} />;\n',
    '  if (system.slug === "autopulse") {\n    return <AutoPulseCase locale={locale} autopulseCase={getLocalizedAutoPulseCase(locale)} />;\n  }\n  if (system.slug === "cv-engine") {\n    return <CvEngineCase locale={locale} cvEngineCase={getLocalizedCvEngineCase(locale)} />;\n  }\n\n  const supportingCase = getLocalizedSupportingCase(system.slug, locale);\n  if (supportingCase) {\n    const evidenceRecords = getLocalizedEvidenceRecords(locale);\n    const evidence = supportingCase.evidenceIds\n      .map((id) => evidenceRecords.find((candidate) => candidate.id === id))\n      .filter((candidate) => candidate !== undefined);\n    return <SupportingCase system={system} record={supportingCase} locale={locale} evidence={evidence} />;\n  }\n',
    "system page server props",
)
path.write_text(text)

# Spanish-only density corrections. No content hidden; English geometry untouched.
path = Path("src/app/i18n.css")
text = path.read_text()
marker = "/* I18N FINAL FRAME DENSITY */"
if marker in text:
    raise SystemExit("i18n.css final density marker already exists")
text += '''

/* I18N FINAL FRAME DENSITY */
@media (min-width: 1101px) {
  html[lang="es"] .supporting-build-proof .supporting-evidence-grid-v2 a {
    min-height: 0;
  }
}

@media (min-width: 1101px) and (max-height: 820px) {
  html[lang="es"] .supporting-build-proof {
    gap: 1rem;
    padding-block: .7rem;
  }

  html[lang="es"] .supporting-build-proof header {
    padding-bottom: .4rem;
  }

  html[lang="es"] .supporting-implementation-list-v2 article,
  html[lang="es"] .supporting-evidence-grid-v2 a {
    padding-block: .32rem;
  }

  html[lang="es"] .supporting-evidence-grid-v2 a {
    gap: .2rem;
  }

  html[lang="es"] .supporting-evidence-grid-v2 a strong {
    font-size: .82rem;
    line-height: 1.08;
  }

  html[lang="es"] .supporting-evidence-grid-v2 a em {
    margin-top: .1rem;
  }

  html[lang="es"] .ap-v2-reality,
  html[lang="es"] .ap-v2-decisions {
    padding-block: .55rem;
  }

  html[lang="es"] .ap-v2-heading {
    margin-top: .25rem;
    padding-bottom: .4rem;
  }

  html[lang="es"] .ap-v2-reality-grid,
  html[lang="es"] .ap-v2-decision-architecture-grid {
    margin-top: .35rem;
    gap: .7rem;
  }

  html[lang="es"] .ap-v2-signal-board article {
    padding: .42rem;
  }

  html[lang="es"] .ap-v2-signal-board h3 {
    margin: .32rem 0 .2rem;
    font-size: .9rem;
  }

  html[lang="es"] .ap-v2-signal-board p {
    font-size: .62rem;
    line-height: 1.2;
  }

  html[lang="es"] .ap-v2-model-board > div {
    min-height: 4.8rem;
    padding: .42rem;
  }

  html[lang="es"] .ap-v2-model-board strong {
    margin-top: .3rem;
    font-size: .7rem;
  }

  html[lang="es"] .ap-v2-model-board p {
    font-size: .61rem;
    line-height: 1.2;
  }

  html[lang="es"] .ap-v2-architecture-flow button {
    min-height: 4.15rem;
    padding: .42rem;
  }

  html[lang="es"] .ap-v2-architecture-flow button strong {
    margin-top: .35rem;
    font-size: .72rem;
  }

  html[lang="es"] .ap-v2-component-inspector h3 {
    margin: .45rem 0 .25rem;
    font-size: 1.3rem;
  }

  html[lang="es"] .ap-v2-component-inspector p {
    font-size: .64rem;
    line-height: 1.24;
  }
}

@media (min-width: 1101px) and (max-height: 650px) {
  html[lang="es"] .ap-cover-grid {
    padding-top: .45rem;
    padding-bottom: 4.1rem;
  }
}
'''
path.write_text(text)

# Migration helpers are temporary; delete them from the successful product commit.
Path(".github/workflows/i18n-flagship-codemod.yml").unlink()
Path("scripts/i18n-finalize.py").unlink()
