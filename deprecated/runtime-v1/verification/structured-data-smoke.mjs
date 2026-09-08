const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const EXPECTED_SITE_ORIGIN = process.env.EXPECTED_SITE_ORIGIN ?? null;

const response = await fetch(`${BASE_URL}/`);
if (!response.ok) throw new Error(`Home returned ${response.status}`);

const html = await response.text();
const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
if (!scripts.length) throw new Error("No JSON-LD script found on Home");

const objects = scripts
  .map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const person = objects.find((value) => value?.["@type"] === "Person");
if (!person) throw new Error("Person JSON-LD object not found");

if (EXPECTED_SITE_ORIGIN) {
  const expected = `${EXPECTED_SITE_ORIGIN.replace(/\/$/, "")}/`;
  if (person.url !== expected) {
    throw new Error(`Person JSON-LD URL mismatch: expected ${expected}, received ${person.url}`);
  }
}

if (typeof person.url === "string" && /:\/\/[^/]+\/\//.test(person.url)) {
  throw new Error(`Person JSON-LD URL contains a duplicated slash after the origin: ${person.url}`);
}

console.log(`PASS Person JSON-LD URL ${person.url ?? "(origin intentionally absent)"}`);
