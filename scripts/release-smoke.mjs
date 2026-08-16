const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const EXPECTED_SITE_ORIGIN = process.env.EXPECTED_SITE_ORIGIN ?? null;

const routeChecks = [
  ["/", "Eduardo Merino — The Build Room"],
  ["/systems", "Systems — Eduardo Merino"],
  ["/systems/autopulse", "AutoPulse — Eduardo Merino"],
  ["/systems/cv-engine", "CV Engine — Eduardo Merino"],
  ["/evidence", "Evidence — Eduardo Merino"],
  ["/evidence/e-cv-12", "E-CV-12 — Eduardo Merino"],
  ["/notes", "Engineering Notebook — Eduardo Merino"],
  ["/notes/no-data-is-not-zero", "NO_DATA is not zero. — Eduardo Merino"],
  ["/about", "About — Eduardo Merino"],
  ["/contact", "Contact — Eduardo Merino"],
];

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

function metaContent(html, key, value) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const keyMatch = tag.match(new RegExp(`${key}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i"));
    if (!keyMatch) continue;
    const contentMatch = tag.match(/content=["']([^"']*)["']/i);
    if (contentMatch) return htmlDecode(contentMatch[1]);
  }
  return null;
}

async function fetchText(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

for (const [pathname, expectedTitle] of routeChecks) {
  try {
    const { response, text } = await fetchText(pathname);
    if (response.status !== 200) {
      fail(`${pathname} status`, `expected 200, received ${response.status}`);
      continue;
    }

    const title = titleFromHtml(text);
    if (title !== expectedTitle) {
      fail(`${pathname} title`, `expected ${JSON.stringify(expectedTitle)}, received ${JSON.stringify(title)}`);
    } else {
      pass(`${pathname} title`);
    }

    const description = metaContent(text, "name", "description");
    if (!description?.trim()) fail(`${pathname} description`, "missing meta description");
    else pass(`${pathname} description`);

    const robots = metaContent(text, "name", "robots");
    if (robots && /noindex/i.test(robots)) {
      fail(`${pathname} robots`, `public route unexpectedly contains ${robots}`);
    } else {
      pass(`${pathname} indexability`);
    }
  } catch (error) {
    fail(pathname, error instanceof Error ? error.message : String(error));
  }
}

try {
  const { response, text } = await fetchText("/");
  const ogTitle = metaContent(text, "property", "og:title");
  const ogDescription = metaContent(text, "property", "og:description");
  const ogImage = metaContent(text, "property", "og:image");
  const twitterCard = metaContent(text, "name", "twitter:card");
  const iconLink = /<link\s+[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/i.test(text);

  if (!ogTitle) fail("Home Open Graph title", "missing og:title"); else pass("Home Open Graph title");
  if (!ogDescription) fail("Home Open Graph description", "missing og:description"); else pass("Home Open Graph description");
  if (!ogImage) fail("Home Open Graph image", "missing og:image"); else pass("Home Open Graph image");
  if (twitterCard !== "summary_large_image") {
    fail("Home Twitter card", `expected summary_large_image, received ${JSON.stringify(twitterCard)}`);
  } else pass("Home Twitter card");
  if (!iconLink) fail("Home icon metadata", "missing icon link"); else pass("Home icon metadata");

  if (response.status !== 200) fail("Home metadata response", `received ${response.status}`);
} catch (error) {
  fail("Home social metadata", error instanceof Error ? error.message : String(error));
}

try {
  const { response, text } = await fetchText("/robots.txt");
  if (response.status !== 200) fail("robots.txt status", `received ${response.status}`);
  else pass("robots.txt status");

  if (!/User-Agent:\s*\*/i.test(text) || !/Allow:\s*\//i.test(text)) {
    fail("robots.txt public rule", "expected User-Agent * with Allow /");
  } else pass("robots.txt public rule");

  if (EXPECTED_SITE_ORIGIN) {
    const expectedSitemap = `${EXPECTED_SITE_ORIGIN.replace(/\/$/, "")}/sitemap.xml`;
    if (!text.includes(expectedSitemap)) {
      fail("robots.txt sitemap", `missing ${expectedSitemap}`);
    } else pass("robots.txt sitemap");
  }
} catch (error) {
  fail("robots.txt", error instanceof Error ? error.message : String(error));
}

try {
  const { response, text } = await fetchText("/sitemap.xml");
  if (response.status !== 200) fail("sitemap.xml status", `received ${response.status}`);
  else pass("sitemap.xml status");

  if (EXPECTED_SITE_ORIGIN) {
    const origin = EXPECTED_SITE_ORIGIN.replace(/\/$/, "");
    const required = [
      `${origin}/`,
      `${origin}/systems/autopulse`,
      `${origin}/systems/cv-engine`,
      `${origin}/evidence/e-cv-12`,
      `${origin}/notes/no-data-is-not-zero`,
      `${origin}/contact`,
    ];
    for (const url of required) {
      if (!text.includes(url)) fail(`sitemap entry ${url}`, "missing expected public route");
      else pass(`sitemap entry ${url}`);
    }
  }
} catch (error) {
  fail("sitemap.xml", error instanceof Error ? error.message : String(error));
}

try {
  const { response } = await fetchText("/this-route-must-not-exist-build-room-release-smoke");
  if (response.status !== 404) fail("unknown route 404", `expected 404, received ${response.status}`);
  else pass("unknown route 404");
} catch (error) {
  fail("unknown route 404", error instanceof Error ? error.message : String(error));
}

if (failures.length) {
  console.error(`\nRelease smoke failed: ${failures.length} check(s).`);
  for (const failure of failures) console.error(JSON.stringify(failure));
  process.exit(1);
}

console.log(`\nRelease smoke passed: ${routeChecks.length} public routes + metadata/search/404 boundary.`);
