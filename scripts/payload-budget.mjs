import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const directory = '.next/static/chunks';
const chunks = [];
for (const name of await readdir(directory)) {
  if (!name.endsWith('.js')) continue;
  const bytes = await readFile(`${directory}/${name}`);
  chunks.push({
    name,
    bytes: bytes.length,
    gzip: gzipSync(bytes).length,
    scene: bytes.includes(Buffer.from('WebGLRenderer')) || bytes.includes(Buffer.from('WEBGL_UNAVAILABLE')),
  });
}

const scene = chunks.filter(chunk => chunk.scene);
const allJsGzip = chunks.reduce((sum, chunk) => sum + chunk.gzip, 0);
const largest = [...chunks].sort((a,b) => b.gzip - a.gzip).slice(0, 10);
const report = {
  contract: 'simple-public-portfolio',
  sceneChunks: scene,
  sceneGzip: scene.reduce((sum, chunk) => sum + chunk.gzip, 0),
  allJsGzip,
  allJsGzipLimit: 1_500_000,
  largest,
};

await mkdir('verification-output', { recursive: true });
await writeFile('verification-output/payload.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (scene.length) throw new Error('Public portfolio unexpectedly ships the retired WebGL scene runtime');
if (allJsGzip >= report.allJsGzipLimit) throw new Error(`Compiled JS gzip ${allJsGzip} exceeds ${report.allJsGzipLimit}`);
