"use client";
import { useEffect, useMemo } from "react";
import type { ProgressMetric } from "../../constants/progressTypes";
import { Input } from "../ui/Input";

interface WorkoutLike {
  date?: string;
  createdAt?: string;
  metrics?: Record<string, number>;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  totalVolume?: number;
}

interface DataPoint {
  date: string;
  value: number;
  progress: number;
}

interface Props {
  metrics: ProgressMetric[];
  selected: string;
  meta: number;
  workouts?: WorkoutLike[];
  onSelect: (key: string) => void;
  onMetaChange: (m: number) => void;
  onDataChange?: (points: DataPoint[]) => void;
  settingsKey?: string;
}

const DEFAULT_SETTINGS_KEY = "ffr.progress.settings.v1";

// Mapa de fallback: solo peso
const FALLBACK_KEY_MAP: Record<
  string,
  (w: WorkoutLike) => number | undefined
> = {
  peso: (w) => w.weight,
};

export const MetricControls = ({
  metrics,
  selected,
  meta,
  workouts = [],
  onSelect,
  onMetaChange,
  onDataChange,
  settingsKey = DEFAULT_SETTINGS_KEY,
}: Props) => {
  // Mostrar únicamente la métrica 'peso'
  const visibleMetrics = metrics.filter((m) => m.key === "peso");

  // Recalcular puntos
  const points = useMemo<DataPoint[]>(() => {
    if (!workouts.length) return [];
    return (
      workouts
        .map((w) => {
          const date = w.date || w.createdAt;
          if (!date) return null;
          let raw: number | undefined;
          if (w.metrics && typeof w.metrics[selected] === "number") {
            raw = w.metrics[selected];
          } else if (FALLBACK_KEY_MAP[selected]) {
            raw = FALLBACK_KEY_MAP[selected](w);
          }
          if (typeof raw !== "number" || Number.isNaN(raw)) return null;
          return {
            date,
            value: raw,
            progress: meta > 0 ? Math.min(raw / meta, 1) : 0,
          };
        })
        .filter(Boolean)
        .sort(
          (a, b) =>
            new Date(a!.date).getTime() - new Date(b!.date).getTime()
        )
    ) as DataPoint[];
  }, [workouts, selected, meta]);

  // Emitir puntos
  useEffect(() => {
    if (onDataChange) onDataChange(points);
  }, [points, onDataChange]);

  // Nota: la persistencia / carga de 'meta' se gestiona en el padre (page.tsx)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {visibleMetrics.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => onSelect(m.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              m.key === selected
                ? "bg-rose-600 text-white shadow"
                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm font-medium text-rose-800">Meta:</label>
        <Input
          type="number"
          className="w-28"
          value={meta}
          onChange={(e) => {
            const v = Number(e.target.value);
            onMetaChange(Number.isNaN(v) ? 0 : v);
          }}
        />
        <span className="text-[11px] text-gray-500">Guardado local</span>
      </div>
    </div>
  );
};