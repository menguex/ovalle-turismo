"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bed, ChefHat, Compass, Search, Sparkles } from "lucide-react";
import { InteractiveCardGrid } from "@/components/ui/InteractiveCardGrid";
import { IconBadge } from "@/components/ui/IconBadge";
import { PagePanel } from "@/components/ui/PagePanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TourOperatorsSection } from "@/components/sections/TourOperatorsSection";
import { LODGING, RESTAURANTS, TOUR_OPERATORS } from "@/lib/data/fichas";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "alojamiento",
    label: "Alojamiento",
    shortLabel: "Dormir",
    icon: Bed,
    count: LODGING.length,
    description: "Hoteles, hostales, cabañas y astrocamping en el valle.",
    sectionTitle: "Dónde dormir",
    sectionDescription: "Haz clic en cada opción para ver contacto, servicios y cómo llegar.",
    accent: "blue" as const,
  },
  {
    id: "gastronomia",
    label: "Gastronomía",
    shortLabel: "Comer",
    icon: ChefHat,
    count: RESTAURANTS.length,
    description: "Restaurantes, cafés, heladerías y sabores del Limarí.",
    sectionTitle: "Dónde comer",
    sectionDescription: "Desde cocina local hasta cafés y heladerías artesanales.",
    accent: "orange" as const,
  },
  {
    id: "tours",
    label: "Tour operadores",
    shortLabel: "Guiarte",
    icon: Compass,
    count: TOUR_OPERATORS.length,
    description: "Guías locales que conocen cada rincón del territorio.",
    sectionTitle: "Operadores locales",
    sectionDescription:
      "Conoce a quienes harán de tu visita una experiencia inolvidable: patrimonio, naturaleza y astroturismo.",
    accent: "gradient" as const,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_STYLES = {
  blue: {
    selected:
      "gradient-border border-brand-blue/45 bg-brand-blue/10 shadow-glow-blue ring-1 ring-brand-blue/20",
    iconSelected: "bg-brand-blue/20 text-brand-blue ring-brand-blue/35",
    countSelected: "bg-brand-blue/15 text-brand-blue",
  },
  orange: {
    selected:
      "gradient-border border-brand-orange/45 bg-brand-yellow/10 shadow-glow ring-1 ring-brand-orange/20",
    iconSelected: "bg-brand-orange/20 text-brand-orange ring-brand-orange/35",
    countSelected: "bg-brand-orange/15 text-brand-orange",
  },
  gradient: {
    selected:
      "gradient-border gradient-border-animated border-brand-orange/45 bg-brand-gradient text-night shadow-glow ring-1 ring-brand-orange/25",
    iconSelected: "bg-night/15 text-night ring-night/20",
    countSelected: "bg-night/15 text-night",
  },
} as const;

function EmptySearchState({ query, label }: { query: string; label: string }) {
  return (
    <div className="container-wide pb-8">
      <PagePanel className="p-8 text-center lg:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
          <Search size={22} strokeWidth={1.75} />
        </div>
        <h3 className="font-display text-xl font-bold text-fg">Sin resultados</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-fg">
          No encontramos opciones en {label.toLowerCase()} para &ldquo;{query}&rdquo;. Prueba con
          otro término o explora otra categoría.
        </p>
      </PagePanel>
    </div>
  );
}

export function ServiciosExplorer() {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabId>("alojamiento");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const setTab = (id: TabId) => {
    setActiveTab(id);
    setQuery("");
    window.history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filterItems = <T extends { name: string; type?: string; description: string }>(
    items: readonly T[]
  ) => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.type?.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  };

  const activeMeta = TABS.find((t) => t.id === activeTab)!;
  const filteredLodging = filterItems(LODGING);
  const filteredRestaurants = filterItems(RESTAURANTS);
  const filteredTours = filterItems(TOUR_OPERATORS);

  const panelTransition = reduced
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <section
        aria-label="Categorías de servicios"
        className="relative border-b border-border bg-surface section-tech-glow lg:sticky lg:top-[calc(var(--topbar-h)+var(--header-h))] lg:z-30"
      >
        <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" aria-hidden />
        <div className="container-wide relative py-8 lg:py-10">
          <p className="eyebrow mb-4">Elige una categoría</p>

          <div
            role="tablist"
            aria-label="Servicios turísticos"
            className="grid gap-3 sm:grid-cols-3 sm:gap-4"
          >
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              const selected = tab.id === activeTab;
              const styles = TAB_STYLES[tab.accent];

              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={tab.id}
                  id={`tab-${tab.id}`}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : i * 0.06, duration: 0.4 }}
                  onClick={() => setTab(tab.id)}
                  className={cn(
                    "tech-card-frame group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50",
                    selected
                      ? cn(styles.selected, "scale-[1.02]")
                      : "border-border bg-surface-elevated hover:-translate-y-0.5 hover:border-brand-orange/30 hover:shadow-card"
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="servicios-tab-glow"
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-yellow/5"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <div className="relative z-[1] flex w-full items-start justify-between gap-3">
                    <span
                      className={cn(
                        "stat-pill-icon shrink-0 rounded-xl p-3",
                        selected ? styles.iconSelected : "group-hover:scale-105"
                      )}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 font-accent text-[10px] font-bold uppercase tracking-wider",
                        selected ? styles.countSelected : "bg-border/80 text-muted"
                      )}
                    >
                      {tab.count}
                    </span>
                  </div>

                  <span
                    className={cn(
                      "relative z-[1] mt-4 font-display text-lg font-bold leading-tight sm:text-xl",
                      selected && tab.accent === "gradient" ? "text-night" : "text-fg"
                    )}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={cn(
                      "relative z-[1] mt-1 font-accent text-[10px] uppercase tracking-[0.12em]",
                      selected
                        ? tab.accent === "gradient"
                          ? "text-night/70"
                          : "text-brand-orange"
                        : "text-muted"
                    )}
                  >
                    {tab.shortLabel}
                  </span>
                  <span
                    className={cn(
                      "relative z-[1] mt-2 line-clamp-2 text-xs leading-relaxed",
                      selected
                        ? tab.accent === "gradient"
                          ? "text-night/75"
                          : "text-muted-fg"
                        : "text-muted"
                    )}
                  >
                    {tab.description}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className="mt-6"
            >
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-brand-orange"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Buscar en ${activeMeta.label.toLowerCase()}…`}
                  aria-label={`Buscar en ${activeMeta.label}`}
                  className="glass-tech w-full rounded-2xl border border-border py-3.5 pl-12 pr-4 text-sm text-fg outline-none transition focus:border-brand-orange/40 focus:shadow-glow sm:max-w-md"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Reveal>
        <div className="container-wide py-8 lg:py-10">
          <PagePanel animated className="p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <IconBadge icon={activeMeta.icon} size="lg" variant="brand" />
              <div className="min-w-0 flex-1">
                <p className="eyebrow mb-1">{activeMeta.label}</p>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-fg">
                  {activeMeta.description}
                </p>
              </div>
              <span className="pill-badge-warm shrink-0 self-start">
                <Sparkles size={12} />
                {activeMeta.count} opciones
              </span>
            </div>
          </PagePanel>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {activeTab === "alojamiento" && (
          <motion.section
            key="alojamiento"
            id="alojamiento"
            role="tabpanel"
            aria-labelledby="tab-alojamiento"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={panelTransition}
            className="pb-20 lg:pb-28"
          >
            <div className="container-wide mb-8">
              <SectionHeading
                icon={Bed}
                eyebrow="Alojamiento"
                title={TABS[0].sectionTitle}
                description={TABS[0].sectionDescription}
              />
            </div>
            {filteredLodging.length > 0 ? (
              <InteractiveCardGrid items={filteredLodging} />
            ) : (
              <EmptySearchState query={query} label={activeMeta.label} />
            )}
          </motion.section>
        )}

        {activeTab === "gastronomia" && (
          <motion.section
            key="gastronomia"
            id="gastronomia"
            role="tabpanel"
            aria-labelledby="tab-gastronomia"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={panelTransition}
            className="section-alt pb-20 lg:pb-28"
          >
            <div className="container-wide mb-8 pt-4">
              <SectionHeading
                icon={ChefHat}
                eyebrow="Gastronomía"
                title={TABS[1].sectionTitle}
                description={TABS[1].sectionDescription}
              />
            </div>
            {filteredRestaurants.length > 0 ? (
              <InteractiveCardGrid items={filteredRestaurants} />
            ) : (
              <EmptySearchState query={query} label={activeMeta.label} />
            )}
          </motion.section>
        )}

        {activeTab === "tours" && (
          <motion.div
            key="tours"
            role="tabpanel"
            aria-labelledby="tab-tours"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={panelTransition}
          >
            {filteredTours.length > 0 ? (
              <TourOperatorsSection items={filteredTours} />
            ) : (
              <>
                <div className="container-wide mb-8 pt-4">
                  <SectionHeading
                    icon={Compass}
                    eyebrow="Tour operadores"
                    title={TABS[2].sectionTitle}
                    description={TABS[2].sectionDescription}
                  />
                </div>
                <EmptySearchState query={query} label={activeMeta.label} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
