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

const slots = [...siteTs.matchAll(/(\w+):\s*\{\s*youtubeId:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?poster:\s*([^,\n]+)/g)];

console.log("\n🎬 Auditoría de videos regionales — Ovalle Turismo\n");
console.log("| Sección | YouTube | Título | Poster |");
console.log("|---------|---------|--------|--------|");

for (const [, key, id, title, poster] of slots) {
  console.log(`| ${key} | \`${id}\` | ${title} | ${poster.trim()} |`);
}

console.log(`
Criterios aplicados en el sitio:
• Contenido de Ovalle / Valle del Limarí (sin costa ni stock ajeno)
• object-fit cover en iframe y MP4 (sin bandas negras ni recortes bruscos)
• Poster en alta resolución mientras carga el video
• Tarjeta destacada de eventos: solo imagen nítida (sin video embebido)
• Video de sección eventos: fondo a ancho completo bajo el contenido

Para reemplazar un video: editar REGIONAL_VIDEOS en src/lib/data/site.ts
Para MP4 locales: añadir src en SectionVideoBackground y public/videos/
`);
