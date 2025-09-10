"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundByRoute } from "@/components/layout/BackgroundByRoute";
import HeroBackground from "../../components/HeroBackground";
import { MetricControls } from "../../components/progress/MetricControls";
import { MetricChart } from "../../components/progress/MetricChart";
import { progressTypes } from "../../constants/progressTypes";
import { ProgressForm } from "../../components/forms/ProgressForm";
import { progressService } from "../../services/progress";
import type { ProgressEntry } from "../../interfaces/progress";
import type { WorkoutRecord, RoutineItem } from "../../types/workout";

const STORAGE_KEY = "ffr.progress.v1";
const WORKOUTS_STORAGE_KEY = "ffr.workouts.v1";

// Agrupa los workouts por semana (ISO week)
function groupByWeek(workouts: WorkoutRecord[]) {
  const weeks: Record<string, WorkoutRecord[]> = {};
  workouts.forEach((w) => {
    const d = new Date(w.createdAt);
    const year = d.getFullYear();
    const week = getWeekNumber(d);
    const key = `${year}-W${week}`;
    if (!weeks[key]) weeks[key] = [];
    weeks[key].push(w);
  });
  return weeks;
}

// Agrupa los ejercicios y suma sets, reps y peso
function aggregateByExercise(workouts: WorkoutRecord[]) {
  const stats: Record<string, { sets: number; reps: number; weight: number }> = {};
  workouts.forEach((w) => {
    w.routines.forEach((r: RoutineItem) => {
      if (!stats[r.name]) stats[r.name] = { sets: 0, reps: 0, weight: 0 };
      stats[r.name].sets += r.sets;
      stats[r.name].reps += r.reps * r.sets;
      stats[r.name].weight += r.weight * r.sets * r.reps;
    });
  });
  return stats;
}

// Obtiene el número de semana ISO
function getWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export default function ProgressPage() {
  const [metrics] = useState(() => progressTypes);
  const [selected, setSelected] = useState(metrics[0].key);
  const [meta, setMeta] = useState(metrics[0].config.meta);
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutRecord[]>([]);

  // Load persisted / remote entries
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setEntries(JSON.parse(raw));
      } catch {
        // ignore
      }
    }

    // Try remote fetch (non-blocking)
    setLoading(true);
    progressService
      .list()
      .then((res) => {
        if (res?.entries && res.entries.length) {
          setEntries(res.entries);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.entries));
        }
      })
      .catch(() => {
        /* ignore remote errors for demo */
      })
      .finally(() => setLoading(false));
  }, []);

  // Si no hay entradas, intentar derivarlas de los workouts (localStorage)
  useEffect(() => {
    if (entries.length) return;
    const rawW = localStorage.getItem(WORKOUTS_STORAGE_KEY);
    if (!rawW) return;
    try {
      const workouts = JSON.parse(rawW) as any[];
      // Mapear workouts a ProgressEntry - adapta esto según la estructura real de tus workouts.
      const derived = workouts
        .map((w) => {
          const date = w.date || w.createdAt || new Date().toISOString();
          return {
            id: crypto.randomUUID(),
            date,
            // Ejemplo: usar peso si el workout tiene un measure, o usar volumen total como 'muscleMass' para la métrica de resistencia
            weight: typeof w.weight === "number" ? w.weight : undefined,
            bodyFat: typeof w.bodyFat === "number" ? w.bodyFat : undefined,
            muscleMass: typeof w.totalVolume === "number" ? w.totalVolume : undefined,
          } as ProgressEntry;
        })
        // filtrar entradas sin valores numéricos si quieres
        .filter((p) => p.weight !== undefined || p.bodyFat !== undefined || p.muscleMass !== undefined);
      if (derived.length) setEntries(derived);
    } catch {
      // ignore parse errors
    }
  }, [entries.length]);

  // Keep meta in sync when selected metric changes
  useEffect(() => {
    const m = metrics.find((x) => x.key === selected);
    if (m) setMeta(m.config.meta);
  }, [selected, metrics]);

  // Persist local changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Construye datos para el chart a partir de entries (fallback a progressTypes)
  const chartData = useMemo(() => {
    if (!entries || entries.length === 0) {
      const m = metrics.find((x) => x.key === selected);
      return m ? m.data : [];
    }
    // ordenar por fecha asc
    const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // mapear según la métrica seleccionada
    return sorted
      .map((e) => {
        const date = new Date(e.date);
        const name = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
        let value = 0;
        if (selected === "Peso") value = e.weight ?? 0;
        else if (selected === "CalidadVida") value = e.bodyFat ?? 0;
        else if (selected === "Resistencia") value = e.muscleMass ?? 0;
        else value = e.weight ?? 0;
        return { name, value };
      })
      .filter((d) => typeof d.value === "number");
  }, [entries, metrics, selected]);

  const metric = metrics.find((m) => m.key === selected) ?? metrics[0];

  async function handleAddEntry(data: ProgressEntry) {
    const toSave: ProgressEntry = {
      ...data,
      id: data.id ?? crypto.randomUUID(),
    };
    setEntries((s) => [toSave, ...s]);
    // intentar enviar al backend (no bloqueante)
    try {
      await progressService.create(toSave);
    } catch {
      // ignore errors in demo
    }
  }

  // Evolución semanal
  const weekly = groupByWeek(workouts);

  // Evolución por ejercicio
  const exerciseStats = aggregateByExercise(workouts);

  return (
    <>
      <BackgroundByRoute />
      <motion.main
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.5 }}
        className="relative h-full overflow-hidden pt-16 md:pt-20 px-3 md:px-6 flex items-center justify-center"
      >
        <div className="w-[min(1260px,95vw)]">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
              Progreso
            </h1>
            <span className="text-sm md:text-base font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
              Vista general
            </span>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Métrica</h3>
              <MetricControls
                metrics={metrics}
                selected={selected}
                onChange={(k) => setSelected(k)}
                meta={meta}
                onMetaChange={(m) => setMeta(m)}
              />
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-rose-700 mb-2">Registrar progreso</h4>
                <ProgressForm onSubmit={handleAddEntry} />
              </div>
            </div>

            <div className="lg:col-span-2 bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Tendencia - {metric.label}</h3>
                <span className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">
                  Meta: {meta}{metric.config.unidad}
                </span>
              </div>

              <div className="h-[320px]">
                <MetricChart metric={{ ...metric, data: chartData }} meta={meta} />
              </div>

              <div className="mt-4 text-sm text-gray-600">
                {loading ? "Cargando entradas..." : `${entries.length} registro(s) almacenado(s)`}.
              </div>
            </div>
          </section>

          {/* Evolución semanal */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Entrenamientos por semana</h2>
            <ul>
              {Object.entries(weekly).map(([week, ws]) => (
                <li key={week} className="mb-2">
                  <strong>{week}:</strong> {ws.length} entrenamientos
                </li>
              ))}
            </ul>
          </section>
          {/* Evolución por ejercicio */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Progreso por ejercicio</h2>
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Ejercicio</th>
                  <th className="border px-2 py-1">Sets</th>
                  <th className="border px-2 py-1">Reps</th>
                  <th className="border px-2 py-1">Peso total (kg)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(exerciseStats).map(([name, stats]) => (
                  <tr key={name}>
                    <td className="border px-2 py-1">{name}</td>
                    <td className="border px-2 py-1">{stats.sets}</td>
                    <td className="border px-2 py-1">{stats.reps}</td>
                    <td className="border px-2 py-1">{stats.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {/* Aquí puedes agregar objetivos y comparar el progreso */}
        </div>
      </motion.main>
    </>
  );
}