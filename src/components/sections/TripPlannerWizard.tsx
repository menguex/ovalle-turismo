"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Heart,
  Mail,
  Moon,
  Sparkles,
  TreePine,
  User,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { LogoMotif } from "@/components/brand/LogoMotif";
import { TechSectionShell } from "@/components/brand/TechSectionShell";
import { ButtonSubmit } from "@/components/ui/Button";
import { PlannerDatePicker } from "@/components/ui/PlannerDatePicker";
import { PILLARS, SITE } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const DURATIONS = [
  { id: "1", label: "1 día", hint: "Lo esencial del valle" },
  { id: "2-3", label: "2–3 días", hint: "Experiencias combinadas" },
  { id: "week", label: "Una semana", hint: "Limarí a fondo" },
] as const;

const COMPANIONS = [
  { id: "solo", label: "Solo/a", icon: User, hint: "Ritmo libre" },
  { id: "pareja", label: "Pareja", icon: Heart, hint: "Escapada a medida" },
  { id: "familia", label: "Familia", icon: Users, hint: "Todos disfrutan" },
  { id: "grupo", label: "Grupo", icon: Compass, hint: "Experiencia compartida" },
] as const;

const INTEREST_ICONS: Record<string, typeof Moon> = {
  Astroturismo: Moon,
  Naturaleza: TreePine,
  Gastronomía: UtensilsCrossed,
  Enoturismo: Wine,
  Cultura: Compass,
  Wellness: Sparkles,
};

const STEPS = [
  { id: "duration", label: "Tiempo" },
  { id: "interests", label: "Intereses" },
  { id: "companion", label: "Viaje" },
  { id: "dates", label: "Cuándo" },
  { id: "contact", label: "Tu ruta" },
] as const;

type PlannerState = {
  duration: string;
  interests: string[];
  companion: string;
  dates: string;
  name: string;
  email: string;
};

function buildRoutePreview(state: PlannerState) {
  const picks = PILLARS.filter((p) => state.interests.includes(p.title));
  const durationLabel =
    DURATIONS.find((d) => d.id === state.duration)?.label ?? state.duration;
  const companionLabel =
    COMPANIONS.find((c) => c.id === state.companion)?.label ?? "";

  const highlights: string[] = [];
  if (state.interests.includes("Astroturismo")) {
    highlights.push("Noche bajo cielos despejados (abr–sep ideal)");
  }
  if (state.interests.includes("Naturaleza")) {
    highlights.push("Valle del Encanto o Fray Jorge según tu ritmo");
  }
  if (state.interests.includes("Enoturismo") || state.interests.includes("Gastronomía")) {
    highlights.push("Ruta enoturística y sabores del Limarí");
  }
  if (state.interests.includes("Cultura")) {
    highlights.push("Patrimonio diaguita y tradiciones locales");
  }
  if (state.duration === "1" && highlights.length > 2) {
    highlights.length = 2;
  }

  return {
    durationLabel,
    companionLabel,
    picks,
    highlights:
      highlights.length > 0
        ? highlights
        : ["Exploración equilibrada por el corazón del Limarí"],
  };
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

export function TripPlannerWizard() {
  const reduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<PlannerState>({
    duration: "",
    interests: [],
    companion: "",
    dates: "",
    name: "",
    email: "",
  });

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const preview = useMemo(() => buildRoutePreview(state), [state]);

  const go = (next: number) => {
    setDirection(next > stepIndex ? 1 : -1);
    setStepIndex(next);
  };

  const toggleInterest = (title: string) => {
    setState((s) => ({
      ...s,
      interests: s.interests.includes(title)
        ? s.interests.filter((i) => i !== title)
        : [...s.interests, title],
    }));
  };

  const canContinue = () => {
    switch (step.id) {
      case "duration":
        return !!state.duration;
      case "interests":
        return state.interests.length > 0;
      case "companion":
        return !!state.companion;
      case "dates":
        return true;
      case "contact":
        return state.name.trim().length > 1 && state.email.includes("@");
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!canContinue()) return;
    const subject = encodeURIComponent(`Planifica mi viaje — ${state.name}`);
    const body = encodeURIComponent(
      [
        `Nombre: ${state.name}`,
        `Email: ${state.email}`,
        `Duración: ${preview.durationLabel}`,
        `Viaje: ${preview.companionLabel}`,
        `Intereses: ${state.interests.join(", ")}`,
        `Fechas: ${state.dates || "No indicadas"}`,
        "",
        "Ruta sugerida:",
        ...preview.highlights.map((h) => `• ${h}`),
      ].join("\n")
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl text-center"
      >
        <div className="glass-tech gradient-border mx-auto rounded-[2rem] p-10 lg:p-12">
          <motion.div
            initial={reduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-night"
          >
            <Check size={28} strokeWidth={2.5} />
          </motion.div>
          <LogoMotif size="sm" showArc className="mb-6 justify-center" />
          <h2 className="font-display text-3xl text-fg">¡Tu ruta está en camino!</h2>
          <p className="mt-4 text-muted-fg">
            Abrimos tu correo con la solicitud. El equipo de Ovalle Turismo te contactará con
            una propuesta para{" "}
            <span className="font-semibold text-brand-orange">{preview.durationLabel}</span>
            {preview.companionLabel ? ` · ${preview.companionLabel}` : ""}.
          </p>
          <div className="mt-8 space-y-2 text-left">
            {preview.highlights.map((h) => (
              <p key={h} className="flex items-start gap-2 text-sm text-fg">
                <Sparkles size={14} className="mt-0.5 shrink-0 text-brand-blue" />
                {h}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {preview.picks.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="pill-badge text-xs transition hover:border-brand-orange/40"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="font-accent uppercase tracking-wider text-brand-orange">
            Paso {stepIndex + 1} de {STEPS.length}
          </span>
          <span className="text-muted">{STEPS[stepIndex].label}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-elevated">
          <motion.div
            className="h-full rounded-full bg-brand-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-4 flex justify-between gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              disabled={i > stepIndex}
              onClick={() => i < stepIndex && go(i)}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                i <= stepIndex ? "bg-brand-orange/80" : "bg-border",
                i < stepIndex && "cursor-pointer hover:bg-brand-yellow"
              )}
              aria-label={s.label}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="glass-tech gradient-border relative min-h-[420px] overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial={reduced ? false : "enter"}
            animate="center"
            exit={reduced ? undefined : "exit"}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.id === "duration" && (
              <StepShell
                eyebrow="Paso 1"
                title="¿Cuántos días tienes en el valle?"
                description="Elige el tiempo que quieres dedicar a Ovalle y el Limarí."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {DURATIONS.map((d, i) => (
                    <motion.button
                      key={d.id}
                      type="button"
                      initial={reduced ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => setState((s) => ({ ...s, duration: d.id }))}
                      className={cn(
                        "tech-card-frame group flex flex-col items-start rounded-2xl border p-5 text-left transition duration-300",
                        state.duration === d.id
                          ? "border-brand-orange/50 bg-brand-yellow/10 shadow-glow"
                          : "border-border bg-surface-elevated hover:border-brand-blue/30"
                      )}
                    >
                      <span className="font-display text-xl font-bold text-fg">{d.label}</span>
                      <span className="mt-1 text-xs text-muted">{d.hint}</span>
                    </motion.button>
                  ))}
                </div>
              </StepShell>
            )}

            {step.id === "interests" && (
              <StepShell
                eyebrow="Paso 2"
                title="¿Qué quieres vivir?"
                description="Selecciona una o más experiencias. Armamos tu ruta en base a esto."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {PILLARS.map((pillar, i) => {
                    const Icon = INTEREST_ICONS[pillar.title] ?? Sparkles;
                    const active = state.interests.includes(pillar.title);
                    return (
                      <motion.button
                        key={pillar.id}
                        type="button"
                        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => toggleInterest(pillar.title)}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl border p-4 text-left transition duration-300",
                          active
                            ? "border-brand-orange/50 bg-brand-gradient text-night shadow-md"
                            : "border-border bg-surface-elevated hover:border-brand-orange/25"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition",
                            active ? "bg-night/15" : "bg-surface stat-pill-icon"
                          )}
                        >
                          <Icon size={20} />
                        </span>
                        <span>
                          <span className="block font-sans text-sm font-semibold">
                            {pillar.title}
                          </span>
                          <span
                            className={cn(
                              "text-xs",
                              active ? "text-night/75" : "text-muted"
                            )}
                          >
                            {pillar.subtitle}
                          </span>
                        </span>
                        {active && (
                          <Check size={18} className="ml-auto shrink-0 opacity-80" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step.id === "companion" && (
              <StepShell
                eyebrow="Paso 3"
                title="¿Con quién viajas?"
                description="Adaptamos el ritmo y las recomendaciones a tu tipo de viaje."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {COMPANIONS.map((c, i) => {
                    const Icon = c.icon;
                    const active = state.companion === c.id;
                    return (
                      <motion.button
                        key={c.id}
                        type="button"
                        initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setState((s) => ({ ...s, companion: c.id }))}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border p-5 text-left transition duration-300",
                          active
                            ? "border-brand-blue/50 bg-brand-blue/10 shadow-glow-blue"
                            : "border-border bg-surface-elevated hover:border-brand-blue/25"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-full",
                            active ? "bg-brand-blue text-white" : "bg-surface text-brand-blue"
                          )}
                        >
                          <Icon size={22} />
                        </span>
                        <span>
                          <span className="block font-sans font-semibold text-fg">{c.label}</span>
                          <span className="text-xs text-muted">{c.hint}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step.id === "dates" && (
              <StepShell
                eyebrow="Paso 4"
                title="¿Cuándo piensas visitarnos?"
                description="Opcional, pero nos ayuda a sugerir eventos y la mejor época para astroturismo."
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <PlannerDatePicker
                    key="planner-dates"
                    autoOpen
                    value={state.dates}
                    onChange={(dates) => setState((s) => ({ ...s, dates }))}
                  />
                  <p className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3 text-xs leading-relaxed text-muted-fg">
                    <Moon size={12} className="mr-1 inline text-brand-blue" />
                    Abril a septiembre: mejor ventana para cielos despejados y astroturismo.
                  </p>
                </motion.div>
              </StepShell>
            )}

            {step.id === "contact" && (
              <StepShell
                eyebrow="Paso 5"
                title="Tu ruta personalizada"
                description="Revisa el resumen y déjanos tus datos para recibir la propuesta."
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div className="rounded-2xl border border-border bg-surface-elevated/80 p-5">
                    <p className="font-accent text-[10px] uppercase tracking-wider text-brand-orange">
                      Vista previa
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-fg">
                      {preview.durationLabel}
                      {preview.companionLabel ? ` · ${preview.companionLabel}` : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {state.interests.map((i) => (
                        <span key={i} className="pill-badge text-[10px]">
                          {i}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {preview.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-muted-fg">
                          <Sparkles size={14} className="mt-0.5 shrink-0 text-brand-yellow" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      type="text"
                      value={state.name}
                      onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Tu nombre"
                      className="rounded-2xl border border-border bg-surface-elevated px-4 py-3.5 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
                    />
                    <input
                      required
                      type="email"
                      value={state.email}
                      onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="Tu email"
                      className="rounded-2xl border border-border bg-surface-elevated px-4 py-3.5 text-fg outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                </motion.div>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => go(stepIndex - 1)}
            disabled={stepIndex === 0}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition",
              stepIndex === 0
                ? "pointer-events-none opacity-0"
                : "text-muted hover:bg-surface-elevated hover:text-fg"
            )}
          >
            <ArrowLeft size={16} />
            Atrás
          </button>

          {step.id === "contact" ? (
            <ButtonSubmit
              type="button"
              onClick={handleSubmit}
              disabled={!canContinue()}
              className={cn(!canContinue() && "opacity-50")}
            >
              <Mail size={16} className="mr-2 inline" />
              Recibir mi ruta
            </ButtonSubmit>
          ) : (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => go(stepIndex + 1)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-night transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              )}
            >
              Continuar
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="heading-md text-balance">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-fg">{description}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function TripPlannerSection() {
  return (
    <TechSectionShell
      className="py-16 lg:py-24"
      innerClassName="container-wide"
      variant="subtle"
      glow
    >
      <TripPlannerWizard />
    </TechSectionShell>
  );
}
