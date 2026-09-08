import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const directory = '.next/static/chunks';
const chunks = [];
for (const name of await readdir(directory)) {
  if (!name.endsWith('.js')) continue;
  const bytes = await readFile(`${directory}/${name}`);
  chunks.push({ name, bytes: bytes.length, gzip: gzipSync(bytes).length, scene: bytes.includes(Buffer.from('WebGLRenderer')) || bytes.includes(Buffer.from('WEBGL_UNAVAILABLE')) });
}
const scene = chunks.filter(chunk => chunk.scene);
if (!scene.length) throw new Error('No compiled scene chunk found; budget is UNKNOWN');
const sceneGzip = scene.reduce((sum, chunk) => sum + chunk.gzip, 0);
const report = { scene, sceneGzip, limit: 180_000, modelBytes: 0, textureBytes: 0, geometry: '27 procedural cuboids; shared geometry; 3 opaque materials', allJsGzip: chunks.reduce((sum, chunk) => sum + chunk.gzip, 0) };
await mkdir('verification-output', { recursive: true });
await writeFile('verification-output/payload.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (sceneGzip >= report.limit) throw new Error(`Scene payload ${sceneGzip} exceeds ${report.limit}`);
