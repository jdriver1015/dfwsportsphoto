// One-off migration helper: Lovable stores photos on its own CDN and leaves only
// ".asset.json" pointers in the repo. This downloads every photo the pages
// import into src/assets so the site no longer depends on Lovable hosting.
//
//   node scripts/fetch-assets.mjs [origin]      (default https://dfwsportsphotography.com)

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = (process.argv[2] ?? "https://dfwsportsphotography.com").replace(/\/$/, "");
const SRC = fileURLToPath(new URL("../src/", import.meta.url));
const ASSETS = new URL("../src/assets/", import.meta.url);

async function wanted() {
  const names = new Set();
  for (const rel of await readdir(SRC, { recursive: true })) {
    if (!/\.(tsx?|css)$/.test(rel)) continue;
    const text = await readFile(join(SRC, rel), "utf8");
    for (const m of text.matchAll(/assets\/([^"']+?\.(?:jpe?g|png|webp))(?:\.asset\.json)?["']/gi)) names.add(m[1]);
  }
  return [...names];
}

async function text(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// Every <img src> the site can show is baked into its JS bundles as
// "/__l5e/assets-v1/<id>/<original-filename>".
async function discover() {
  const html = await text(`${ORIGIN}/`);
  const scripts = new Set(
    [...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)].map((m) => new URL(m[1], ORIGIN).href),
  );
  const found = new Map();
  const scan = (s) => {
    for (const m of s.matchAll(/\/__l5e\/assets-v1\/([0-9a-f-]{36})\/([^"'`\\\s)]+)/g)) {
      found.set(decodeURIComponent(m[2]), `${ORIGIN}${m[0]}`);
    }
  };
  scan(html);
  for (const s of scripts) {
    try {
      const js = await text(s);
      scan(js);
      // Route chunks are lazy-loaded from the entry bundle.
      for (const m of js.matchAll(/["'`]((?:\.\/|\/assets\/)[\w./-]+\.js)["'`]/g)) {
        const u = new URL(m[1], s).href;
        if (!scripts.has(u)) {
          scripts.add(u);
        }
      }
    } catch (e) {
      console.warn("skip", s, e.message);
    }
  }
  return found;
}

async function exists(u) {
  try {
    await stat(u);
    return true;
  } catch {
    return false;
  }
}

async function pool(items, n, fn) {
  const q = [...items];
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (q.length) await fn(q.shift());
    }),
  );
}

await mkdir(ASSETS, { recursive: true });
const need = await wanted();
const urls = await discover();
console.log(`${need.length} images imported by pages, ${urls.size} URLs found in the live bundles`);

const missing = [];
let done = 0;
await pool(need, 6, async (name) => {
  const dest = new URL(name, ASSETS);
  if (await exists(dest)) return;
  const url = urls.get(name);
  if (!url) return void missing.push(name);
  const r = await fetch(url);
  if (!r.ok) return void missing.push(`${name} (${r.status})`);
  await writeFile(dest, Buffer.from(await r.arrayBuffer()));
  done++;
});

console.log(`downloaded ${done}`);
if (missing.length) {
  console.log(`MISSING ${missing.length}:\n  ${missing.join("\n  ")}`);
  process.exitCode = 1;
}
