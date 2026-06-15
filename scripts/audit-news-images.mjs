#!/usr/bin/env node
/**
 * Audita imágenes de noticias: busca la mejor foto en ovalleturismo.cl
 * y descarga a public/noticias/{slug}.jpg
 *
 * Ejecutar: node scripts/audit-news-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "noticias");
const SITE_TS = path.join(ROOT, "src", "lib", "data", "site.ts");
const WP = "https://www.ovalleturismo.cl/sitio/wp-content/uploads";

/** slug local → slug/path del artículo en ovalleturismo.cl */
const ARTICLE_SLUGS = {
  "fiesta-vendimia-2026-50-mil":
    "mas-de-50-mil-personas-participaron-en-la-fiesta-de-la-vendimia-de-ovalle-2026",
  "vendimia-cooperativa-pisquera":
    "fiesta-de-la-vendimia-ovalle-2026-se-realizara-por-primera-vez-en-la-cooperativa-control-pisquera",
  "programacion-verano-2026":
    "la-ilustre-municipalidad-de-ovalle-desplegara-una-serie-de-eventos-que-incluyen-fiestas-costumbristas-y-exposiciones-regionales",
  "temporada-estival-limari-2026":
    "provincia-de-limari-lanza-su-temporada-estival-2026-con-foco-en-el-turismo-sustentable",
  "calendario-vendimias-2026":
    "chile-lanza-calendario-de-vendimias-y-presenta-innovador-mapa-interactivo-que-moderniza-experiencia-enoturistica",
  "diplomado-gestion-turistica-amtc":
    "amtc-y-utem-lanzan-diplomado-para-fortalecer-la-gestion-turistica-municipal-en-chile",
  "marca-turistica-coquimbo":
    "region-de-coquimbo-actualiza-marca-turistica-con-proceso-participativo",
  "yasna-molina-world-cheese-awards":
    "entre-5-mil-participantes-productora-caprina-de-ovalle-yasna-molina-obtiene-medalla-de-oro-en-el-world-cheese-awards",
  "premios-enoturismo-2025":
    "premios-enoturismo-chile-2025-anuncian-a-sus-ganadores-regionales",
  "ovallino-mejor-carta-vinos":
    "restaurante-ovallino-es-elegido-nuevamente-como-la-mejor-carta-de-vinos-de-chile",
  "turismo-internacional-chile-2040":
    "chile-duplicara-su-turismo-internacional-para-2040-segun-estudio-de-google",
  "mas-valor-turistico-2025":
    "sernatur-premiara-los-productos-mas-innovadores-del-pais-con-su-concurso-mas-valor-turistico-2025",
  "sellos-vendimia-2025":
    "ocho-fiestas-de-la-vendimia-reciben-sello-de-buenas-practicas-de-enoturismo-chile",
};

/** Fallbacks de alta resolución cuando el artículo solo trae miniatura */
const FALLBACKS = {
  "programacion-verano-2026": `${WP}/2026/01/1-plaza.jpg`,
  "temporada-estival-limari-2026": `${WP}/2026/01/plaza-1-scaled.jpg`,
  "premios-enoturismo-2025": `${WP}/2025/11/nota-web-1536x819.jpg`,
  "turismo-internacional-chile-2040": `${WP}/2025/08/Torres-del-Paine-turismo-Chile-1024x576.webp`,
};

/**
 * Fuentes externas (municipalidad, prensa, Sernatur, etc.) con prioridad
 * sobre miniaturas o PNG genéricos de ovalleturismo.cl
 */
const EXTERNAL_SOURCES = {
  "fiesta-vendimia-2026-50-mil": {
    src: "https://muniovalle.cl/sitio/wp-content/uploads/2026/03/Anais-Velasquez-2048x1365.jpg",
    source: "muniovalle.cl",
  },
  "vendimia-cooperativa-pisquera": {
    src: "https://muniovalle.cl/sitio/wp-content/uploads/2026/02/Fiesta-de-la-Vendimia-2026--2048x1366.jpg",
    source: "muniovalle.cl",
  },
  "calendario-vendimias-2026": {
    src: "https://www.enoturismochile.cl/wp-content/uploads/2025/12/Lanzamientro-calendario-de-Vendimias-2026.jpg",
    source: "enoturismochile.cl",
  },
  "diplomado-gestion-turistica-amtc": {
    src: "https://www.utem.cl/wp-content/uploads/2025/12/portada-diplomado-turismo-municipal.jpg",
    source: "utem.cl",
  },
  "marca-turistica-coquimbo": {
    src: "https://turismoregiondecoquimbo.cl/wp-content/uploads/2025/11/Collowara.jpg",
    source: "turismoregiondecoquimbo.cl",
  },
  "yasna-molina-world-cheese-awards": {
    src: "https://www.indap.gob.cl/sites/default/files/2025-11/caprinos-villaseca-medalla-bronce-suiza-1.jpg",
    source: "indap.gob.cl",
  },
  "ovallino-mejor-carta-vinos": {
    src: "/fotos/fuente-toscana/02.jpg",
    source: "local-fotos",
  },
  "sellos-vendimia-2025": {
    src: `${WP}/2025/07/Foto-notas-para-web-2025-07-15T105418.016.png`,
    source: "ovalleturismo-full",
  },
};

const SKIP_PATTERNS = [
  "Logo-Ovalle",
  "20251219_160449",
  "/LOGO",
  "Inter-4.1",
  "cieloazul1",
  "Turismo-home",
];

function normalizeUrl(u) {
  u = u.split(" 500w")[0].split("?")[0].replace(/\)$/, "").replace(/;$/, "");
  if (u.startsWith("//")) u = "https:" + u;
  if (u.startsWith("/sitio/")) u = "https://www.ovalleturismo.cl" + u;
  if (u.startsWith("wp-content/")) u = "https://www.ovalleturismo.cl/sitio/" + u;
  return u;
}

function scoreUrl(u) {
  const skip = SKIP_PATTERNS.some((p) => u.includes(p));
  if (skip) return 0;
  const dim = u.match(/-(\d+)x(\d+)\.(jpe?g|png|webp)/i);
  if (dim) return parseInt(dim[1], 10) * parseInt(dim[2], 10);
  if (/noticia.*\.png$/i.test(u) && !/-\d+x\d+/.test(u)) return 800 * 600;
  if (/\.(jpe?g|webp)$/i.test(u) && !/-\d+x\d+/.test(u)) return 900 * 600;
  return 100;
}

function extractImages(html) {
  const found = [
    ...html.matchAll(/https:\/\/www\.ovalleturismo\.cl\/sitio\/wp-content\/uploads\/[^"\s'<>]+/gi),
    ...html.matchAll(/wp-content\/uploads\/[^"\s'<>]+/gi),
  ].map((m) => normalizeUrl(m[0]));
  return [...new Set(found)].sort((a, b) => scoreUrl(b) - scoreUrl(a));
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "OvalleTurismoAudit/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function fetchBytes(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "OvalleTurismoAudit/1.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp|gif)(?:\?|$)/i);
  return m ? `.${m[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
}

function isWeakArticleImage(url) {
  if (!url) return true;
  if (/noticia-?\d*\.png$/i.test(url)) return true;
  if (/-300x(169|200|225)/i.test(url)) return true;
  const dim = url.match(/-(\d+)x(\d+)\.(jpe?g|png|webp)/i);
  if (dim && parseInt(dim[1], 10) * parseInt(dim[2], 10) < 500 * 350) return true;
  return false;
}

async function resolveBestImage(slug, articleSlug) {
  const external = EXTERNAL_SOURCES[slug];
  if (external) return external;

  const url = `https://www.ovalleturismo.cl/sitio/${articleSlug}/`;
  try {
    const html = await fetchText(url);
    const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1];
    const candidates = extractImages(html);
    const best = candidates[0] || og;
    const fallback = FALLBACKS[slug];
    if (best && !isWeakArticleImage(best) && scoreUrl(best) >= 400 * 300) {
      return { src: best, source: "article" };
    }
    if (fallback) return { src: fallback, source: "fallback" };
    if (og && !isWeakArticleImage(og)) return { src: og, source: "og" };
    return { src: best, source: "article-weak" };
  } catch (e) {
    if (FALLBACKS[slug]) return { src: FALLBACKS[slug], source: "fallback-error" };
    throw e;
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const report = [];
  const imageMap = {};

  for (const [slug, articleSlug] of Object.entries(ARTICLE_SLUGS)) {
    const { src, source } = await resolveBestImage(slug, articleSlug);
    let localPath = src;

    if (src.startsWith("http")) {
      const ext = extFromUrl(src);
      const dest = path.join(OUT_DIR, `${slug}${ext}`);
      try {
        const buf = await fetchBytes(src);
        fs.writeFileSync(dest, buf);
        localPath = `/noticias/${slug}${ext}`;
        console.log(`✓ ${slug} ← ${src} (${Math.round(buf.length / 1024)} KB) [${source}]`);
      } catch (e) {
        console.warn(`⚠ ${slug} download failed: ${e.message}`);
        localPath = src;
      }
    } else {
      console.log(`✓ ${slug} ← ${src} [local]`);
    }

    imageMap[slug] = localPath;
    report.push({ slug, src, localPath, source });
  }

  // Patch site.ts image fields per slug
  let site = fs.readFileSync(SITE_TS, "utf8");
  for (const [slug, img] of Object.entries(imageMap)) {
    const re = new RegExp(
      `(slug:\\s*"${slug}"[\\s\\S]*?image:\\s*)("(?:[^"\\\\]|\\\\.)*"|/[^\\n]+)`,
      "m"
    );
    if (!re.test(site)) {
      console.warn(`⚠ No se encontró slug ${slug} en site.ts`);
      continue;
    }
    site = site.replace(re, `$1"${img}"`);
  }
  fs.writeFileSync(SITE_TS, site);

  const reportPath = path.join(ROOT, "scripts", "news-images-audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nAuditoría guardada en ${reportPath}`);
  console.log(`Imágenes en public/noticias/ (${Object.keys(imageMap).length} noticias)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
