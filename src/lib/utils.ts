import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeHtml(text: string) {
  return text
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&");
}

/** Fecha YYYY-MM-DD sin desfase UTC en Chile */
export function formatChileDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return new Date(year, month - 1, day).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  });
}

/** Primer número de cadenas con varios teléfonos (ej. "·") */
export function telHref(phone: string) {
  const first = phone.split(/[·,/|]/)[0]?.trim() ?? phone;
  const digits = first.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : undefined;
}
