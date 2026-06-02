"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { formatChileDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"] as const;

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

export const SCHEDULE_OPTIONS = [
  { id: "morning", label: "Mañana", hint: "09:00 – 13:00" },
  { id: "afternoon", label: "Tarde", hint: "14:00 – 18:00" },
  { id: "full", label: "Día completo", hint: "Jornada amplia" },
  { id: "flexible", label: "Sin preferencia", hint: "Flexible" },
] as const;

export const DATE_PRESETS = [
  { id: "verano-2026", label: "Verano 2026", start: "2025-12-01", end: "2026-02-28" },
  { id: "vendimia", label: "Vendimia", start: "2026-03-01", end: "2026-04-15" },
  { id: "semana-santa", label: "Semana Santa", start: "2026-03-29", end: "2026-04-05" },
  { id: "unknown", label: "Aún no lo sé", start: "", end: "" },
] as const;

type PlannerDatePickerProps = {
  value: string;
  onChange: (formatted: string) => void;
  /** Despliega el calendario al montar (paso 4 del planificador) */
  autoOpen?: boolean;
};

function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatRangeLabel(start: string, end: string) {
  if (!start) return "";
  const startLabel = formatChileDate(start);
  if (!end || end === start) return startLabel;
  const endDate = parseIso(end);
  const startDate = parseIso(start);
  if (!endDate || !startDate) return startLabel;
  if (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()} al ${endDate.getDate()} de ${MONTHS_ES[endDate.getMonth()]} ${endDate.getFullYear()}`;
  }
  return `${startLabel} al ${formatChileDate(end)}`;
}

function buildFormattedValue(start: string, end: string, scheduleId: string, presetLabel?: string | null) {
  if (presetLabel === "Aún no lo sé") return "Aún no lo sé";
  if (!start && !end) return "";
  const range = formatRangeLabel(start, end);
  const schedule = SCHEDULE_OPTIONS.find((s) => s.id === scheduleId);
  if (!schedule || scheduleId === "flexible") return range;
  return `${range} · ${schedule.label} (${schedule.hint})`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/** Lunes = 0 … Domingo = 6 */
function weekdayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

export function PlannerDatePicker({ value, onChange, autoOpen = true }: PlannerDatePickerProps) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(autoOpen);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [schedule, setSchedule] = useState<string>("flexible");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  const emit = (nextStart: string, nextEnd: string, nextSchedule: string, presetLabel?: string | null) => {
    onChange(buildFormattedValue(nextStart, nextEnd, nextSchedule, presetLabel));
  };

  const todayIso = toIso(new Date());
  const grid = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const total = daysInMonth(viewMonth);
    const offset = weekdayIndex(first);
    const cells: (string | null)[] = Array.from({ length: offset }, () => null);
    for (let d = 1; d <= total; d++) {
      cells.push(toIso(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d)));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewMonth]);

  const summary = buildFormattedValue(start, end, schedule) || value;

  const pickDay = (iso: string) => {
    if (iso < todayIso) return;
    setActivePreset(null);
    if (!start || (start && end)) {
      setStart(iso);
      setEnd("");
      emit(iso, "", schedule);
      return;
    }
    const a = parseIso(start)!;
    const b = parseIso(iso)!;
    if (b < a) {
      setStart(iso);
      setEnd(start);
      emit(iso, start, schedule);
    } else {
      setEnd(iso);
      emit(start, iso, schedule);
    }
  };

  const applyPreset = (preset: (typeof DATE_PRESETS)[number]) => {
    setActivePreset(preset.id);
    if (preset.id === "unknown") {
      setStart("");
      setEnd("");
      setSchedule("flexible");
      emit("", "", "flexible", "Aún no lo sé");
      return;
    }
    setStart(preset.start);
    setEnd(preset.end);
    const mid = parseIso(preset.start);
    if (mid) setViewMonth(startOfMonth(mid));
    emit(preset.start, preset.end, schedule);
  };

  const setScheduleAndEmit = (id: string) => {
    setActivePreset(null);
    setSchedule(id);
    emit(start, end, id);
  };

  const inRange = (iso: string) => {
    if (!start) return false;
    const endIso = end || start;
    return iso >= start && iso <= endIso;
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative w-full rounded-2xl border border-border bg-surface-elevated py-4 pl-12 pr-4 text-left outline-none transition focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/20"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Calendar
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-orange"
        />
        <span className={cn("block text-sm", summary ? "font-medium text-fg" : "text-muted")}>
          {summary || "Elige fechas en el calendario"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border bg-surface-elevated/90 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, -1))}
                  className="rounded-full p-2 text-muted transition hover:bg-surface hover:text-fg"
                  aria-label="Mes anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <p className="font-display text-base font-semibold capitalize text-fg">
                  {MONTHS_ES[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </p>
                <button
                  type="button"
                  onClick={() => setViewMonth((m) => addMonths(m, 1))}
                  className="rounded-full p-2 text-muted transition hover:bg-surface hover:text-fg"
                  aria-label="Mes siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((d) => (
                  <span
                    key={d}
                    className="py-1 font-accent text-[10px] uppercase tracking-wider text-muted"
                  >
                    {d}
                  </span>
                ))}
                {grid.map((iso, i) =>
                  iso ? (
                    <button
                      key={iso + i}
                      type="button"
                      onClick={() => pickDay(iso)}
                      className={cn(
                        "aspect-square rounded-xl text-sm font-medium transition",
                        iso === todayIso && "ring-1 ring-brand-blue/40",
                        iso < todayIso && "cursor-not-allowed text-muted/40 hover:bg-transparent",
                        iso >= todayIso && (iso === start || iso === (end || start))
                          ? "bg-brand-gradient text-night shadow-sm"
                          : iso >= todayIso && inRange(iso)
                            ? "bg-brand-yellow/20 text-fg"
                            : iso >= todayIso
                              ? "text-fg hover:bg-brand-orange/10"
                              : ""
                      )}
                    >
                      {parseIso(iso)?.getDate()}
                    </button>
                  ) : (
                    <span key={`empty-${i}`} aria-hidden />
                  )
                )}
              </div>

              <p className="mt-3 text-center text-xs text-muted">
                {start && !end
                  ? "Selecciona la fecha de término (o vuelve a clicar para un solo día)"
                  : "Primer clic: inicio · Segundo clic: término"}
              </p>

              <div className="mt-5 border-t border-border pt-4">
                <p className="mb-3 flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-wider text-brand-orange">
                  <Clock size={12} />
                  Horario preferido
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {SCHEDULE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScheduleAndEmit(opt.id)}
                      className={cn(
                        "rounded-xl border px-2 py-2.5 text-left transition",
                        schedule === opt.id
                          ? "border-brand-orange/50 bg-brand-yellow/15"
                          : "border-border hover:border-brand-orange/30"
                      )}
                    >
                      <span className="block text-xs font-semibold text-fg">{opt.label}</span>
                      <span className="block text-[10px] text-muted">{opt.hint}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Atajos nativos en móvil */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[10px] font-accent uppercase tracking-wider text-muted">
                    Desde
                  </span>
                  <input
                    type="date"
                    value={start}
                    min={todayIso}
                    onChange={(e) => {
                      setActivePreset(null);
                      const v = e.target.value;
                      setStart(v);
                      const nextEnd = end && v > end ? "" : end;
                      if (end && v > end) setEnd("");
                      emit(v, nextEnd, schedule);
                    }}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-fg outline-none focus:border-brand-orange/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] font-accent uppercase tracking-wider text-muted">
                    Hasta
                  </span>
                  <input
                    type="date"
                    value={end || start}
                    min={start || todayIso}
                    onChange={(e) => {
                      setActivePreset(null);
                      const v = e.target.value;
                      if (!start) {
                        setStart(v);
                        setEnd(v);
                        emit(v, v, schedule);
                      } else {
                        setEnd(v);
                        emit(start, v, schedule);
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-fg outline-none focus:border-brand-orange/40"
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        {DATE_PRESETS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => applyPreset(chip)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition",
              activePreset === chip.id || value === chip.label
                ? "border-brand-orange bg-brand-yellow/15 text-fg"
                : "border-border text-muted hover:border-brand-orange/30"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
