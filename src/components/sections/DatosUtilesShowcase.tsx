"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun,
  Coins,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  TrainFront,
} from "lucide-react";
import { USEFUL_INFO } from "@/lib/data/fichas";
import { fichaLabel } from "@/lib/types/ficha";
import { SITE, USEFUL_RECOMMENDATIONS } from "@/lib/data/site";
import { PAGE_ICONS } from "@/lib/icons/page-icons";
import { useFichaOptional } from "@/components/providers/FichaProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PagePanel } from "@/components/ui/PagePanel";
import { telHref } from "@/lib/utils";

const SECTION_ICONS: Record<string, typeof Info> = {
  "info-clima": CloudSun,
  "info-terminal": TrainFront,
  "info-oficina": MapPin,
  "info-cambio": Coins,
  "info-recomendaciones": ShieldCheck,
};

export function DatosUtilesShowcase() {
  const [activeId, setActiveId] = useState(USEFUL_INFO[0]?.id ?? "");
  const fichaCtx = useFichaOptional();
  const active = USEFUL_INFO.find((i) => i.id === activeId) ?? USEFUL_INFO[0];
  const ActiveIcon = SECTION_ICONS[active.id] ?? Info;

  return (
    <section className="py-20 lg:py-32">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            align="center"
            icon={PAGE_ICONS["datos-utiles"]}
            eyebrow="Planifica con calma"
            title="Todo lo que necesitas saber antes de llegar"
            description="Clima, transporte, oficina de turismo y consejos oficiales para una visita segura y memorable en el Valle del Limarí."
            className="mx-auto mb-16 text-center"
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {USEFUL_INFO.map((item) => {
              const Icon = SECTION_ICONS[item.id] ?? Info;
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition lg:w-full ${
                    selected
                      ? "border-copper/40 bg-copper/10 text-fg"
                      : "border-border bg-surface text-muted-fg hover:border-copper/20 hover:bg-surface-elevated"
                  }`}
                >
                  <Icon size={18} className={selected ? "text-copper" : "text-muted"} />
                  <span className="font-sans text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                    {item.title ?? item.name}
                  </span>
                </button>
              );
            })}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass-tech gradient-border overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-[21/9] min-h-[200px]">
                <Image
                  src={active.image}
                  alt={fichaLabel(active)}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 65vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
                  <div className="rounded-2xl bg-night/50 p-3 text-gold backdrop-blur-sm">
                    <ActiveIcon size={24} />
                  </div>
                  <div>
                    <p className="font-accent text-[10px] uppercase tracking-wider text-gold">
                      {active.type}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white lg:text-3xl">
                      {fichaLabel(active)}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-8 p-8 lg:p-12">
                <p className="text-lg leading-relaxed text-fg">{active.description}</p>

                {active.details && (
                  <ul className="space-y-4">
                    {active.details.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-base leading-relaxed text-muted-fg"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}

                {active.highlights && (
                  <div className="flex flex-wrap gap-2">
                    {active.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 font-accent text-[10px] uppercase tracking-wider text-muted-fg"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid gap-4 rounded-2xl border border-border bg-surface-elevated p-6 sm:grid-cols-2">
                  {active.address && (
                    <InfoRow icon={MapPin} label="Dirección" value={active.address} />
                  )}
                  {active.phone && (
                    <InfoRow
                      icon={Phone}
                      label="Teléfono"
                      value={active.phone}
                      href={telHref(active.phone)}
                    />
                  )}
                  {active.schedule && (
                    <InfoRow icon={CloudSun} label="Horario" value={active.schedule} />
                  )}
                  {active.email && (
                    <InfoRow icon={Info} label="Email" value={active.email} href={`mailto:${active.email}`} />
                  )}
                </div>

                {active.id === "info-oficina" && (
                  <button
                    type="button"
                    onClick={() => fichaCtx?.openFicha("oficina-turismo")}
                    className="rounded-full bg-copper px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-copper/90"
                  >
                    Contactar oficina de turismo
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-20">
          <PagePanel className="p-10 lg:p-14">
            <div className="mb-8 flex items-center gap-3">
              <ShieldCheck className="text-copper" size={28} />
              <h3 className="font-display text-2xl font-bold text-fg">
                Recomendaciones oficiales
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {USEFUL_RECOMMENDATIONS.map((item, i) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
                >
                  <span className="font-display text-2xl font-bold text-copper/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-muted-fg">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Oficina de Turismo · {SITE.address} · {SITE.phones.join(" · ")}
            </p>
          </PagePanel>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Info;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon size={16} className="mt-0.5 shrink-0 text-copper" />
      <div>
        <p className="font-accent text-[10px] uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-1 text-sm text-fg">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex gap-3 transition hover:text-copper">
        {content}
      </a>
    );
  }

  return <div className="flex gap-3">{content}</div>;
}
