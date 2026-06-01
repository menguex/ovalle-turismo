"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  AtSign,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Rotate3D,
  Timer,
  X,
} from "lucide-react";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { cn, mapsEmbedUrl, telHref } from "@/lib/utils";

type FichaModalProps = {
  ficha: Ficha | null;
  onClose: () => void;
};

export function FichaModal({ ficha, onClose }: FichaModalProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ficha) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [ficha, onClose]);

  const label = ficha ? fichaLabel(ficha) : "";

  return (
    <AnimatePresence>
      {ficha && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Cerrar ficha"
            className="absolute inset-0 bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ficha-title"
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border border-border bg-surface shadow-2xl sm:rounded-[2rem]"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/9] shrink-0">
              <Image src={ficha.image} alt={label} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <div className="mb-2 flex flex-wrap gap-2">
                  {ficha.badge && (
                    <span className="inline-block rounded-full bg-gold/90 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-night">
                      {ficha.badge}
                    </span>
                  )}
                  {ficha.type && (
                    <span className="inline-block rounded-full bg-white/15 px-3 py-1 font-accent text-[10px] uppercase tracking-wider text-sand backdrop-blur-sm">
                      {ficha.type}
                    </span>
                  )}
                </div>
                <h2 id="ficha-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {label}
                </h2>
              </div>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <p className="font-sans text-body-md leading-relaxed text-muted-fg">{ficha.description}</p>

              {ficha.highlights && ficha.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {ficha.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-fg">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {(ficha.distanceFromOvalle || ficha.visitDuration || ficha.bestSeason) && (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {ficha.distanceFromOvalle && (
                    <MetaTile icon={MapPin} label="Distancia" value={ficha.distanceFromOvalle} />
                  )}
                  {ficha.visitDuration && (
                    <MetaTile icon={Timer} label="Duración" value={ficha.visitDuration} />
                  )}
                  {ficha.bestSeason && (
                    <MetaTile icon={Calendar} label="Mejor época" value={ficha.bestSeason} />
                  )}
                </div>
              )}

              {ficha.details && ficha.details.length > 0 && (
                <div className="mt-6 rounded-2xl border border-border bg-surface-elevated p-4">
                  <p className="mb-3 font-accent text-[10px] uppercase tracking-wider text-muted">
                    Información útil
                  </p>
                  <ul className="space-y-2">
                    {ficha.details.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-muted-fg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 space-y-3 rounded-2xl border border-border bg-surface-elevated p-4">
                {ficha.schedule && (
                  <p className="flex items-start gap-2 text-sm text-muted-fg">
                    <Clock size={15} className="mt-0.5 shrink-0 text-copper" />
                    {ficha.schedule}
                  </p>
                )}
                {ficha.address && (
                  <p className="flex items-start gap-2 text-sm text-muted-fg">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-copper" />
                    {ficha.address}
                  </p>
                )}
                {ficha.phone &&
                  (telHref(ficha.phone) ? (
                    <a
                      href={telHref(ficha.phone)}
                      className="flex items-center gap-2 text-sm text-fg transition hover:text-copper"
                    >
                      <Phone size={15} className="shrink-0 text-copper" />
                      {ficha.phone}
                    </a>
                  ) : (
                    <p className="flex items-center gap-2 text-sm text-muted-fg">
                      <Phone size={15} className="shrink-0 text-copper" />
                      {ficha.phone}
                    </p>
                  ))}
                {ficha.email && (
                  <a
                    href={`mailto:${ficha.email}`}
                    className="flex items-center gap-2 text-sm text-fg transition hover:text-copper"
                  >
                    <Mail size={15} className="shrink-0 text-copper" />
                    {ficha.email}
                  </a>
                )}
                {ficha.instagram && (
                  <a
                    href={`https://www.instagram.com/${ficha.instagram.replace("@", "")}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-fg transition hover:text-copper"
                  >
                    <AtSign size={15} className="shrink-0 text-copper" />
                    {ficha.instagram}
                  </a>
                )}
                {ficha.priceRange && (
                  <p className="text-sm font-medium text-copper">{ficha.priceRange}</p>
                )}
                {ficha.amenities && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ficha.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-border px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(ficha.address || ficha.lat) && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                  <iframe
                    title={`Mapa de ${label}`}
                    src={
                      ficha.lat && ficha.lng
                        ? mapsEmbedUrl(`${ficha.lat},${ficha.lng}`)
                        : mapsEmbedUrl(ficha.address ?? label)
                    }
                    className="h-48 w-full border-0 sm:h-56"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {ficha.embedUrl && (
                  <a
                    href={ficha.embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 font-sans text-sm font-semibold text-night transition hover:brightness-105"
                  >
                    Tour 360°
                    <Rotate3D size={14} />
                  </a>
                )}
                {ficha.website && (
                  <a
                    href={ficha.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition",
                      ficha.embedUrl
                        ? "border border-border text-fg hover:bg-surface-elevated"
                        : "bg-copper text-white hover:bg-copper/90"
                    )}
                  >
                    {ficha.type?.includes("360") ? "Ver tour" : "Sitio web"}
                    <ExternalLink size={14} />
                  </a>
                )}
                {ficha.mapUrl && (
                  <a
                    href={ficha.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 font-sans text-sm font-medium text-fg transition hover:bg-surface-elevated"
                  >
                    <Navigation size={14} />
                    Cómo llegar
                  </a>
                )}
                {ficha.href && (
                  <Link
                    href={ficha.href}
                    onClick={onClose}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition",
                      ficha.website
                        ? "border border-border text-fg hover:bg-surface-elevated"
                        : "bg-copper text-white hover:bg-copper/90"
                    )}
                  >
                    Explorar sección
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MetaTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-3">
      <p className="flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-wider text-muted">
        <Icon size={12} className="text-copper" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium leading-snug text-fg">{value}</p>
    </div>
  );
}
