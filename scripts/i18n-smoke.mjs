const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const failures = [];

function pass(label) {
  console.log(`PASS ${label}`);
}

function fail(label, detail) {
  failures.push({ label, detail });
  console.error(`FAIL ${label}`);
  console.error(`  - ${detail}`);
}

function htmlDecode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function titleFromHtml(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? htmlDecode(match[1].trim()) : null;
}

function metaDescription(html) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/name=["']description["']/i.test(tag)) continue;
    const match = tag.match(/content=["']([^"']*)["']/i);
    if (match) return htmlDecode(match[1]);
  }
  return null;
}

function alternateLinks(html) {
  return (html.match(/<link\s+[^>]*rel=["']alternate["'][^>]*>/gi) ?? []).join("\n");
}

async function fetchText(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

const sitemap = await fetchText("/sitemap.xml");
if (sitemap.response.status !== 200) {
  fail("sitemap status", `expected 200, received ${sitemap.response.status}`);
} else {
  pass("sitemap status");
}

const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => htmlDecode(match[1]));
const spanishPaths = locs
  .map((value) => {
    try { return new URL(value).pathname.replace(/\/$/, "") || "/"; }
    catch { return null; }
  })
  .filter((value) => value === "/es" || value?.startsWith("/es/"));

if (spanishPaths.length < 10) {
  fail("Spanish sitemap coverage", `expected a mirrored route family, found ${spanishPaths.length} Spanish routes`);
} else {
  pass(`Spanish sitemap coverage (${spanishPaths.length} routes)`);
}

for (const pathname of spanishPaths) {
  try {
    const { response, text } = await fetchText(pathname);
    if (response.status !== 200) {
      fail(`${pathname} status`, `expected 200, received ${response.status}`);
      continue;
    }

    const title = titleFromHtml(text);
    if (!title) fail(`${pathname} title`, "missing title");
    else pass(`${pathname} title`);

    const description = metaDescription(text);
    if (!description?.trim()) fail(`${pathname} description`, "missing meta description");
    else pass(`${pathname} description`);

    if (!text.includes('lang="es"')) {
      fail(`${pathname} language`, "Spanish route does not expose an SSR lang=es subtree");
    } else {
      pass(`${pathname} language`);
    }

    if (!text.includes("Cambiar a inglés")) {
      fail(`${pathname} switcher`, "Spanish route is missing the English language switch action");
    } else {
      pass(`${pathname} switcher`);
    }

    const alternates = alternateLinks(text);
    if (!/hreflang=["']en["']/i.test(alternates) || !/hreflang=["']es["']/i.test(alternates)) {
      fail(`${pathname} hreflang`, "missing EN/ES alternate links");
    } else {
      pass(`${pathname} hreflang`);
    }

    const englishPath = pathname === "/es" ? "/" : pathname.slice(3);
    const english = await fetchText(englishPath);
    if (english.response.status !== 200) {
      fail(`${pathname} English pair`, `${englishPath} returned ${english.response.status}`);
    } else {
      pass(`${pathname} English pair`);
    }
  } catch (error) {
    fail(pathname, error instanceof Error ? error.message : String(error));
  }
}

const markerChecks = [
  ["/es", "¿Qué puedo ayudarte a hacer funcionar?"],
  ["/es/systems", "Sistemas, no tarjetas de proyectos."],
  ["/es/systems/autopulse", "La telemetría no es un flujo limpio."],
  ["/es/systems/cv-engine", "Una descripción de puesto puede decirte lo que una empresa quiere."],
  ["/es/evidence", "Mira qué respalda el trabajo."],
  ["/es/evidence/e-ap-07", "NO_DATA se preserva como un resultado de adquisición distinto"],
  ["/es/notes", "Pequeños registros de cómo pienso mientras construyo."],
  ["/es/notes/no-data-is-not-zero", "NO_DATA no es cero."],
  ["/es/about", "Entiende el sistema primero."],
  ["/es/contact", "¿Tienes un sistema que valga la pena construir, entender o mejorar?"],
];

for (const [pathname, marker] of markerChecks) {
  const { response, text } = await fetchText(pathname);
  if (response.status !== 200) {
    fail(`${pathname} translation marker`, `route returned ${response.status}`);
  } else if (!htmlDecode(text).includes(marker)) {
    fail(`${pathname} translation marker`, `missing ${JSON.stringify(marker)}`);
  } else {
    pass(`${pathname} translation marker`);
  }
}

if (failures.length) {
  console.error(`\nI18N smoke failed: ${failures.length} check(s).`);
  for (const failure of failures) console.error(JSON.stringify(failure));
  process.exit(1);
}

console.log(`\nI18N smoke passed: ${spanishPaths.length} Spanish routes + EN pairs + translation markers.`);
