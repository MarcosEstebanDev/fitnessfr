"use client";
import { useEffect } from "react";
import type { ProgressMetric } from "../../constants/progressTypes";
import { Input } from "../ui/Input";

interface Props {
  metrics: ProgressMetric[];
  selected: string;
  onChange: (key: string) => void;
  meta: number;
  onMetaChange: (m: number) => void;
}

export const MetricControls = ({ metrics, selected, onChange, meta, onMetaChange }: Props) => {
  // Asegura meta consistente si cambia selected desde fuera
  useEffect(() => {
    const current = metrics.find(m => m.key === selected);
    if (current && current.config.meta !== meta) {
      // no forzamos set aquí para evitar loop; control externo decide
    }
  }, [selected, metrics, meta]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {metrics.map(m => (
          <button
            key={m.key}
            type="button"
            onClick={() => onChange(m.key)}
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
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-rose-800">Meta:</label>
        <Input
          type="number"
            className="w-28"
          value={meta}
          onChange={e => onMetaChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};