// Asegura que este componente sea cliente si usa hooks / localStorage
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundByRoute } from "@/components/layout/BackgroundByRoute";
import { MetricControls } from "../../components/progress/MetricControls";
import { MetricChart } from "../../components/progress/MetricChart";
import { progressTypes } from "../../constants/progressTypes";
import { ProgressForm } from "../../components/forms/ProgressForm";
import { progressService } from "../../services/progress";
import type { ProgressEntry } from "../../interfaces/progress";
import type { WorkoutRecord, RoutineItem } from "../../types/workout";

const STORAGE_KEY = "ffr.progress.v1";
const WORKOUTS_STORAGE_KEY = "ffr.workouts.v1";
const SETTINGS_KEY = "ffr.progress.settings.v1";

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

export default function ProgressPage() {
  const [metrics] = useState(() => progressTypes);
  const [selected, setSelected] = useState<string>("peso"); // debe ser key, no label
  const [meta, setMeta] = useState<number>(0);
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutRecord[]>([]);
  const [workoutPoints, setWorkoutPoints] = useState<any[]>([]);

  // Datos de ejemplo si no hay registros
  const fallbackEntries: ProgressEntry[] = [
    {
      id: "1",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      weight: 80,
      bodyFat: 22,
      muscleMass: 35,
    },
    {
      id: "2",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      weight: 78.5,
      bodyFat: 20.5,
      muscleMass: 36,
    },
    {
      id: "3",
      date: new Date().toISOString(),
      weight: 77,
      bodyFat: 19.8,
      muscleMass: 37,
    },
  ];

  const displayEntries = entries.length > 0 ? entries : fallbackEntries;

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setEntries(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (entries.length) return;
    const rawW = localStorage.getItem(WORKOUTS_STORAGE_KEY);
    if (!rawW) return;
    try {
      const workouts = JSON.parse(rawW) as any[];
      const derived = workouts
        .map((w) => {
          const date = w.date || w.createdAt || new Date().toISOString();
          return {
            id: crypto.randomUUID(),
            date,
            weight: typeof w.weight === "number" ? w.weight : undefined,
            bodyFat: typeof w.bodyFat === "number" ? w.bodyFat : undefined,
            muscleMass: typeof w.totalVolume === "number" ? w.totalVolume : undefined,
          } as ProgressEntry;
        })
        .filter((p) => p.weight !== undefined || p.bodyFat !== undefined || p.muscleMass !== undefined);
      if (derived.length) setEntries(derived);
    } catch {
      // ignore parse errors
    }
  }, [entries.length]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Carga workouts desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(WORKOUTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setWorkouts(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Cargar meta persistida para la métrica seleccionada
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      const settings = JSON.parse(raw);
      const saved = settings?.[selected]?.meta;
      if (typeof saved === "number") setMeta(saved);
    } catch {
      /* ignore */
    }
  }, [selected]);

  // Mantener meta en sync con la métrica seleccionada (solo si no hay meta persistida)
  useEffect(() => {
    const m = metrics.find((x) => x.key === selected);
    if (m && (!meta || meta === 0)) setMeta(m.config.meta);
  }, [selected, metrics]);

  async function handleAddEntry(data: ProgressEntry) {
    const toSave: ProgressEntry = {
      ...data,
      id: data.id ?? crypto.randomUUID(),
    };
    setEntries((s) => [toSave, ...s]);
    try {
      // Guarda en localStorage en vez de llamar a un API
      const prev = localStorage.getItem(STORAGE_KEY);
      const arr = prev ? JSON.parse(prev) : [];
      arr.unshift(toSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore errors
    }
  }

  const exerciseStats = aggregateByExercise(workouts);

  // Derivar param y unidad por key
  let param: "peso" | "sets" | "reps" = "peso";
  let unidad = "kg";
  if (selected === "peso") {
    param = "peso";
    unidad = "kg";
  } else if (selected === "resistencia") {
    param = "sets";
    unidad = "sets";
  } else if (selected === "calidadVida") {
    param = "reps";
    unidad = "reps";
  }

  const metric = useMemo(
    () => metrics.find(m => m.key === selected),
    [metrics, selected]
  );

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
        <div className="w-[min(1260px,98vw)] max-h-[90vh] flex flex-col overflow-auto rounded-2xl bg-white/80 backdrop-blur-md p-2 md:p-4 shadow-xl">
          <header className="mb-3 flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
              Progreso
            </h1>
            <span className="text-xs md:text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
              Vista general
            </span>
          </header>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
            <div className="lg:col-span-1 bg-white/95 border border-rose-100 rounded-2xl p-3 shadow flex flex-col h-fit mb-2">
              <h3 className="text-base font-bold text-gray-900 mb-2">Métrica</h3>
              <MetricControls
                metrics={metrics}
                selected={selected}
                meta={meta}
                workouts={workouts}
                onSelect={k => setSelected(k)}
                onMetaChange={m => setMeta(m)}
                onDataChange={pts => setWorkoutPoints(pts)}
                settingsKey={SETTINGS_KEY}
              />
              <div className="mt-3 flex-1 flex flex-col">
                <h4 className="text-xs font-semibold text-rose-700 mb-1">Registrar progreso</h4>
                <ProgressForm onSubmit={handleAddEntry} />
                {/* Progreso por ejercicio eliminado */}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white/95 border border-rose-100 rounded-2xl p-3 shadow flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-gray-900">
                  Tendencia - {metric?.label ?? "—"}
                </h3>
                <span className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">
                  Meta: {meta}{unidad}
                </span>
              </div>
              <div className="h-[200px]">
                <MetricChart
                  meta={meta}
                  param={param}
                  unidad={unidad}
                  dataOverride={workoutPoints}
                />
              </div>

              {/* --- Resumen textual del progreso --- */}
              {displayEntries?.length > 0 && (() => {
                const sorted = [...displayEntries].sort(
                  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                const first = sorted[0];
                const last = sorted[sorted.length - 1];
                if (!first || !last) return null;
                return (
                  <div className="my-3">
                    {/* Tarjetas resumen comprimidas */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="w-full bg-gradient-to-br from-indigo-100 to-white border border-indigo-200 rounded-xl p-2 text-center shadow">
                        <div className="text-[10px] text-gray-500 mb-1">Peso actual</div>
                        <div className="text-lg font-extrabold text-indigo-700 truncate">{last.weight ?? "-"} <span className="text-xs font-medium text-gray-500">kg</span></div>
                      </div>
                      <div className="w-full bg-gradient-to-br from-pink-100 to-white border border-pink-200 rounded-xl p-2 text-center shadow">
                        <div className="text-[10px] text-gray-500 mb-1">Grasa corporal</div>
                        <div className="text-lg font-extrabold text-pink-700 truncate">{last.bodyFat ?? "-"} <span className="text-xs font-medium text-gray-500">%</span></div>
                      </div>
                      <div className="w-full bg-gradient-to-br from-green-100 to-white border border-green-200 rounded-xl p-2 text-center shadow">
                        <div className="text-[10px] text-gray-500 mb-1">Masa muscular</div>
                        <div className="text-lg font-extrabold text-green-700 truncate">{last.muscleMass ?? "-"}</div>
                      </div>
                    </div>
                    {/* Resumen de cambios comprimido */}
                    <div className="p-2 bg-white/80 border border-gray-200 rounded-xl text-xs mb-2 shadow-sm">
                      <div className="mb-1">
                        <strong className="text-indigo-700">Cambio de peso:</strong> {first.weight ?? "-"}kg → {last.weight ?? "-"}kg
                        {first.weight !== undefined && last.weight !== undefined
                          ? <span className="text-gray-500"> ({(last.weight - first.weight).toFixed(1)}kg)</span>
                          : ""}
                      </div>
                      <div className="mb-1">
                        <strong className="text-pink-700">Cambio de grasa corporal:</strong> {first.bodyFat ?? "-"}% → {last.bodyFat ?? "-"}%
                      </div>
                      <div>
                        <strong className="text-green-700">Cambio de masa muscular:</strong> {first.muscleMass ?? "-"} → {last.muscleMass ?? "-"}
                      </div>
                    </div>
                    {/* Tabla de historial comprimida */}
                    <div className="mt-2 overflow-x-auto">
                      <h4 className="font-semibold mb-1 text-xs">Historial reciente</h4>
                      <table className="min-w-[320px] w-full border-separate border-spacing-0 rounded-xl overflow-hidden shadow bg-white text-[11px]">
                        <thead>
                          <tr className="bg-indigo-100 text-indigo-900">
                            <th className="px-2 py-1 font-semibold text-[10px] border-b border-indigo-200 text-left">Fecha</th>
                            <th className="px-2 py-1 font-semibold text-[10px] border-b border-indigo-200 text-left">Peso (kg)</th>
                            <th className="px-2 py-1 font-semibold text-[10px] border-b border-indigo-200 text-left">% Grasa</th>
                            <th className="px-2 py-1 font-semibold text-[10px] border-b border-indigo-200 text-left">Masa muscular</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sorted.slice(-10).reverse().map((e, i) => (
                            <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
                              <td className="px-2 py-1 border-b border-indigo-50">{new Date(e.date).toLocaleDateString()}</td>
                              <td className="px-2 py-1 border-b border-indigo-50">{e.weight ?? "-"}</td>
                              <td className="px-2 py-1 border-b border-indigo-50">{e.bodyFat ?? "-"}</td>
                              <td className="px-2 py-1 border-b border-indigo-50">{e.muscleMass ?? "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              <div className="mt-2 text-xs text-gray-600">
                {loading ? "Cargando entradas..." : `${displayEntries.length} registro(s) almacenado(s)`}.
              </div>
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
}