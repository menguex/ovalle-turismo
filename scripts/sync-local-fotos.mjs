#!/usr/bin/env node
/**
 * Sincroniza "FOTOS Pagina Web/{categoría}/{nombre}/" → public/fotos/{ficha-id}/
 * y genera src/lib/data/local-ficha-galleries.ts
 *
 * Ejecutar: npm run sync-fotos
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "FOTOS Pagina Web");
const DEST = path.join(ROOT, "public", "fotos");
const OUT_TS = path.join(ROOT, "src", "lib", "data", "local-ficha-galleries.ts");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

/** Carpetas → id de ficha en fichas.ts */
const FOLDER_TO_FICHA_ID = {
  "cabanas stommeln": "cabanas-stommeln",
  "eco camping munay": "ecocamping-munay",
  "hacienda huamalata": "hacienda-huamalata",
  "pumas del encanto": "los-pumas-encanto",
  "termas de socos": "hotel-termas-socos",
  "trapiche lodge": "trapiche-lodge",
  "macero sour": "macero-sour",
  "angel calameno": "angel-calameno",
  "cabildo abierto": "cabildo-abierto",
  "cafe vittoria": "cafe-vittoria",
  "cafe carmen": "cafe-carmen",
  "fuente toscana": "fuente-toscana",
  "kata bar": "kata-resto-bar",
  "la lia pizza": "la-lia-pizza",
  "pizzeria don giorgio": "don-giorgio",
  "plaza terraza": "plaza-terraza",
  "poki bubble tea": "poki-bubble-tea",
  "rincon de los postres": "rincon-de-los-postres",
  "rincon del sushi": "rincon-del-sushi",
  "scart sushi": "scart-sushi",
  "silvestre cafeteria": "silvestre-cafeteria",
  "xin jiang": "xin-jiang",
  riquisimo: "riquisimo",
  "limari experience": "limari-experience",
  "turismo diaguitas": "turismo-diaguitas",
  "vina tololo": "vina-tololo",
};

function normalizeKey(name) {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function shouldSkipFile(filename) {
  const lower = filename.toLowerCase();
  if (/^logo\.(png|jpg|jpeg|webp)$/i.test(lower)) return true;
  if (lower.includes("diseno sin titulo")) return true;
  return false;
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .filter((name) => !shouldSkipFile(name))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
}

function copyGallery(fichaId, files, sourceDir) {
  const targetDir = path.join(DEST, fichaId);
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  const urls = [];
  files.forEach((file, index) => {
    const ext = path.extname(file).toLowerCase();
    const destName = `${String(index + 1).padStart(2, "0")}${ext}`;
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, destName));
    urls.push(`/fotos/${fichaId}/${destName}`);
  });
  return urls;
}

function walkSource() {
  const galleries = {};
  const unmapped = [];
  const skipped = [];

  if (!fs.existsSync(SOURCE)) {
    console.error(`No se encontró: ${SOURCE}`);
    process.exit(1);
  }

  for (const category of fs.readdirSync(SOURCE, { withFileTypes: true })) {
    if (!category.isDirectory()) continue;
    const categoryPath = path.join(SOURCE, category.name);

    for (const folder of fs.readdirSync(categoryPath, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;

      const key = normalizeKey(folder.name);
      const fichaId = FOLDER_TO_FICHA_ID[key];
      const folderPath = path.join(categoryPath, folder.name);
      const files = listImages(folderPath);

      if (!fichaId) {
        unmapped.push(`${category.name}/${folder.name}`);
        continue;
      }
      if (files.length === 0) {
        skipped.push(`${category.name}/${folder.name} (sin fotos válidas)`);
        continue;
      }

      galleries[fichaId] = copyGallery(fichaId, files, folderPath);
      console.log(`✓ ${folder.name} → ${fichaId} (${files.length} fotos)`);
    }
  }

  return { galleries, unmapped, skipped };
}

function writeTs(galleries) {
  const lines = Object.entries(galleries)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, urls]) => {
      const items = urls.map((u) => `    "${u}"`).join(",\n");
      return `  "${id}": [\n${items},\n  ]`;
    });

  const content = `/** Generado por scripts/sync-local-fotos.mjs — no editar a mano */
export const LOCAL_FICHA_GALLERIES: Record<string, readonly string[]> = {
${lines.join(",\n")},
};

export const LOCAL_GALLERY_FICHA_IDS = Object.keys(LOCAL_FICHA_GALLERIES) as readonly string[];
`;

  fs.mkdirSync(path.dirname(OUT_TS), { recursive: true });
  fs.writeFileSync(OUT_TS, content, "utf8");
}

const { galleries, unmapped, skipped } = walkSource();
writeTs(galleries);

console.log(`\n${Object.keys(galleries).length} fichas · ${Object.values(galleries).flat().length} fotos en public/fotos/`);
if (unmapped.length) console.warn("Sin mapeo:", unmapped.join(", "));
if (skipped.length) console.warn("Omitidas:", skipped.join(", "));
