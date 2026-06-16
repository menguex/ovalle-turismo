#!/usr/bin/env node
/**
 * Auditoría de videos de fondo — Ovalle Turismo
 * Ejecutar: node scripts/audit-videos.mjs
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const siteTs = readFileSync(join(root, "src/lib/data/site.ts"), "utf8");

const slots = [
  ...siteTs.matchAll(
    /(\w+):\s*\{\s*src:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?poster:\s*([^,\n]+)/g
  ),
];

console.log("\n🎬 Auditoría de videos regionales — Ovalle Turismo\n");
console.log("| Clave | Archivo | Título | Poster |");
console.log("|-------|---------|--------|--------|");

for (const [, key, src, title, poster] of slots) {
  console.log(`| ${key} | \`${src}\` | ${title} | ${poster.trim()} |`);
}

console.log(`
Uso por sección:
• eventosVerano — fondo Eventos (home)
• planificaValle — CTA Planifica (home + páginas internas)
• astroCielo — Astroturismo (home)
• geografiaValle — Geografía viva (Valles del Limarí, video exclusivo)

Para reemplazar: editar REGIONAL_VIDEOS en src/lib/data/site.ts
MP4 locales en public/videos/
`);
