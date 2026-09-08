import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const origin = process.env.EXPECTED_SITE_ORIGIN ?? 'https://em3rc0d-portfolio.vercel.app';
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const sitemap = await fetch(`${base}/sitemap.xml`).then(r => r.text());
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(decode(m[1])));
assert(routes.length >= 50, 'Sitemap must retain the existing evidence and notes');
const pages = new Map(); const links = new Set(); const external = new Set();
for (const url of routes) {
  assert.equal(url.origin, origin);
  const response = await fetch(base + url.pathname); assert.equal(response.status, 200, url.pathname);
  const html = await response.text(); pages.set(url.pathname, html);
  assert.match(html, /<title>[^<]*Eduardo Merino[^<]*<\/title>/, url.pathname);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical, `Missing canonical ${url.pathname}`); assert.equal(new URL(decode(canonical)).href, url.href, `Canonical ${url.pathname}`);
  assert(html.includes('property="og:title"')); assert(html.includes('name="twitter:card"'));
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `One h1 ${url.pathname}`);
  const personText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert(personText, `JSON-LD ${url.pathname}`); const person = JSON.parse(personText);
  assert.equal(person['@type'], 'Person'); assert.equal(person.url, `${origin}/`);
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = decode(match[1]); const link = new URL(href, url);
    if (link.origin === origin) links.add(link.pathname + link.hash); else external.add(link.href);
  }
}
for (const link of links) {
  const url = new URL(link, origin); let html = pages.get(url.pathname);
  if (!html) { const response = await fetch(base + url.pathname); assert.equal(response.status, 200, link); html = await response.text(); }
  if (url.hash) assert(html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Broken anchor ${link}`);
}
const og = [];
for (const path of ['/opengraph-image', '/systems/autopulse/opengraph-image', '/systems/vigia/opengraph-image', '/systems/prodagentic/opengraph-image']) {
  const response = await fetch(base + path); assert.equal(response.status, 200, path);
  assert.match(response.headers.get('content-type'), /image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer()); assert.equal(bytes.readUInt32BE(16), 1200); assert.equal(bytes.readUInt32BE(20), 630);
  og.push({ path, bytes: bytes.length });
  await mkdir('verification-output', { recursive: true });
  await writeFile(`verification-output/${path.replaceAll('/', '_')}.png`, bytes);
}
const robots = await fetch(base + '/robots.txt').then(r => r.text()); assert(robots.includes(`${origin}/sitemap.xml`));
assert.equal((await fetch(base + '/systems/missing-system')).status, 404);
assert.equal((await fetch(base + '/evidence/missing-proof')).status, 404);
const report = { routes: routes.length, internalLinks: links.size, og, externalLinks: [...external], externalStatus: 'Inventory only; authenticated/public source revisions reviewed separately. LinkedIn may block automated clients.' };
await mkdir('verification-output', { recursive: true }); await writeFile('verification-output/release.json', JSON.stringify(report, null, 2));
console.log(`PASS ${routes.length} routes, ${links.size} internal targets, metadata, JSON-LD, robots, 404s and ${og.length} PNG share images`);
