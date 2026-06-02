"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
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
import { ModalShell } from "@/components/ui/ModalShell";
import type { Ficha } from "@/lib/types/ficha";
import { fichaLabel } from "@/lib/types/ficha";
import { fichaImages } from "@/lib/ficha-images";
import { getFicha } from "@/lib/data/fichas";
import { cn, mapsEmbedUrl, telHref } from "@/lib/utils";

type FichaModalProps = {
  ficha: Ficha | null;
  onClose: () => void;
  onOpenRelated?: (id: string) => void;
};

export function FichaModal({ ficha, onClose, onOpenRelated }: FichaModalProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [ficha?.id]);

  const label = ficha ? fichaLabel(ficha) : "";
  const images = ficha ? fichaImages(ficha) : [];
  const hasGallery = images.length > 1;

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <ModalShell
      open={Boolean(ficha)}
      onClose={onClose}
      ariaLabelledBy="ficha-title"
      closeLabel="Cerrar ficha"
      header={ficha ? (
        <>
          <div className="relative aspect-[16/9] max-h-[42vh] overflow-hidden sm:max-h-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={images[activeIndex]}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${label} — foto ${activeIndex + 1} de ${images.length}`}
                  fill
                  className="object-cover"
                  priority={activeIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />

            {hasGallery && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="absolute right-4 top-4 z-10 rounded-full bg-night/50 px-2.5 py-1 font-accent text-[10px] uppercase tracking-wider text-white backdrop-blur-sm">
                  {activeIndex + 1} / {images.length}
                </span>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className={cn(
                "absolute z-10 rounded-full border border-white/20 bg-night/50 p-2 text-white backdrop-blur-sm transition hover:bg-night/70",
                hasGallery ? "right-4 top-12" : "right-4 top-4"
              )}
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="absolute bottom-4 left-5 right-5 z-10">
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

          {hasGallery && (
            <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-surface-elevated px-4 py-3">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition",
                    index === activeIndex
                      ? "border-copper ring-1 ring-copper/40"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <span className="sr-only">Cerrado</span>
      )}
    >
      {ficha ? (
      <div className="p-6 pb-8 sm:p-8 sm:pb-10">
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
          {ficha.priceRange && <p className="text-sm font-medium text-copper">{ficha.priceRange}</p>}
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

        {ficha.relatedIds && ficha.relatedIds.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 font-accent text-[10px] uppercase tracking-wider text-muted">Relacionados</p>
            <div className="flex flex-wrap gap-2">
              {ficha.relatedIds.map((id) => {
                const related = getFicha(id);
                if (!related) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onOpenRelated?.(id)}
                    className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm text-fg transition hover:border-copper hover:text-copper"
                  >
                    {fichaLabel(related)}
                  </button>
                );
              })}
            </div>
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
      ) : null}
    </ModalShell>
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
