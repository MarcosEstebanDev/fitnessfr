"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface WorkoutRoutine {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
interface WorkoutRecord {
  createdAt?: string;
  routines?: WorkoutRoutine[];
  // shape flexible
  [k: string]: any;
}

interface DataPoint {
  date: string | number | Date;
  value: number;
  progress?: number;
}

interface Props {
  meta: number;
  param?: "peso" | "sets" | "reps";
  unidad?: string;
  dataOverride?: DataPoint[];
  data?: DataPoint[];
}

const WORKOUTS_STORAGE_KEY = "ffr.workouts.v1";
// Cambiado a key inexistente para romper la lectura de progreso
const PROGRESS_STORAGE_KEY = "ffr.progress.v1";

const parseDateToTs = (raw: unknown): number => {
  if (raw === undefined || raw === null || raw === "") return NaN;
  if (typeof raw === "number") return raw;
  if (raw instanceof Date) return raw.getTime();
  if (typeof raw === "string") {
    const s = raw.trim();
    if (/^\d+$/.test(s)) return Number(s);
    const iso = Date.parse(s);
    if (!Number.isNaN(iso)) return iso;
    const parts = s.split("-");
    if (parts.length === 3) {
      const y = Number(parts[0]);
      const m = Number(parts[1]) - 1;
      const d = Number(parts[2]);
      if (!Number.isNaN(y) && !Number.isNaN(m) && !Number.isNaN(d)) return new Date(y, m, d).getTime();
    }
  }
  return NaN;
};

const parseNumber = (v: unknown): number => {
  if (v === null || v === undefined || v === "") return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const normalized = v.replace(",", ".").trim();
    const n = Number(normalized);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const normalizeProgressStore = (raw: any): any[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object") {
    // object may be { "2025-09-01": [{...}], "2025-09-16": {...} } or values as single objects
    const vals = Object.values(raw);
    // flatten one level
    const flat = (vals.flat && typeof vals.flat === "function") ? vals.flat() : ([] as any).concat(...vals);
    // if flat items are primitives or not objects, fallback to mapping entries to {date: key, ...value}
    const items: any[] = [];
    if (flat.length && flat.every((it) => it && typeof it === "object")) {
      return flat;
    }
    // fallback: map entries where value is object -> include key as date
    for (const [k, v] of Object.entries(raw)) {
      if (Array.isArray(v)) {
        v.forEach((it) => {
          items.push(Object.assign({}, it, { date: it.date ?? it.createdAt ?? k }));
        });
      } else if (v && typeof v === "object") {
        items.push(Object.assign({}, v, { date: v.date ?? v.createdAt ?? k }));
      } else {
        // primitive value (ignore)
      }
    }
    return items;
  }
  return [];
};

export const MetricChart = ({ meta, param = "peso", unidad = "kg", dataOverride, data }: Props) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    console.log("MetricChart: effect run", { param, unidad, hasDataOverride: !!(dataOverride && dataOverride.length), hasData: !!(data && data.length) });
    const source = (dataOverride && dataOverride.length ? dataOverride : data && data.length ? data : undefined) ?? null;
    if (source) {
      console.log("MetricChart: using props source (first items)", Array.isArray(source) ? source.slice(0, 5) : source);
      const mapped = source
        .map((d) => {
          const ts = parseDateToTs(d.date);
          return {
            ts,
            name: Number.isNaN(ts) ? String(d.date) : new Date(ts).toLocaleDateString(),
            value: parseNumber(d.value ?? 0),
          };
        })
        .filter((p) => !Number.isNaN(p.ts) && Number.isFinite(p.value))
        .sort((a, b) => a.ts - b.ts)
        .map(({ name, value }) => ({ name, value }));
      console.log("MetricChart: mapped from props", mapped);
      setChartData(mapped);
      return;
    }

    // intentar progress store (con logs y mock en localhost si no existe)
    try {
      let rawProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      console.log("MetricChart: rawProgress key value:", PROGRESS_STORAGE_KEY, rawProgress);
      // Insert mock data automatically solo en localhost para debug si no hay nada
      if (!rawProgress && typeof window !== "undefined" && window.location && window.location.hostname === "localhost") {
        const mock = [{ date: "2025-08-26", peso: 80 }, { date: "2025-09-01", peso: 78.5 }, { date: "2025-09-16", peso: 77 }];
        console.log("MetricChart: inserting mock progress (dev)", mock);
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(mock));
        rawProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      }
      if (rawProgress) {
        const parsed = JSON.parse(rawProgress);
        console.log("MetricChart: parsedProgress (raw -> parsed)", parsed);
        const progressArr = normalizeProgressStore(parsed);
        console.log("MetricChart: normalized progress array (length)", progressArr.length, progressArr.slice(0, 5));
        if (progressArr.length) {
          const mapped = progressArr
            .map((p: any) => {
              const dateVal = p.date ?? p.createdAt ?? p.ts ?? Object.keys(p)[0];
              const value =
                param === "peso"
                  ? (p.peso ?? p.weight ?? p.value ?? 0)
                  : param === "sets"
                  ? p.sets ?? 0
                  : param === "reps"
                  ? p.reps ?? p.repsTotal ?? 0
                  : p.value ?? 0;
              const ts = parseDateToTs(dateVal);
              return { ts, name: Number.isNaN(ts) ? String(dateVal) : new Date(ts).toLocaleDateString(), value: parseNumber(value) };
            })
            .filter((p: any) => !Number.isNaN(p.ts) && Number.isFinite(p.value))
            .sort((a: any, b: any) => a.ts - b.ts)
            .map(({ name, value }: any) => ({ name, value }));
          console.log("MetricChart: mapped progress", mapped);
          setChartData(mapped);
          return;
        }
      } else {
        console.log("MetricChart: no rawProgress found");
      }
    } catch (e) {
      console.error("MetricChart: progress read error", e);
    }

    // fallback: workouts legacy (con logs)
    try {
      const raw = localStorage.getItem(WORKOUTS_STORAGE_KEY);
      console.log("MetricChart: workouts raw", WORKOUTS_STORAGE_KEY, raw ? "[exists]" : "[not found]");
      if (!raw) {
        setChartData([]);
        return;
      }
      const parsed = JSON.parse(raw);
      let workouts: WorkoutRecord[] = [];
      if (Array.isArray(parsed)) workouts = parsed;
      else if (parsed && typeof parsed === "object") {
        const vals = Object.values(parsed) as any[];
        const flat = (vals.flat && typeof vals.flat === "function") ? vals.flat() : ([] as any).concat(...vals);
        workouts = flat.filter((x) => x && typeof x === "object");
      }
      console.log("MetricChart: resolved workouts count", workouts.length);
      if (!workouts.length) {
        setChartData([]);
        return;
      }
      const byDay: Record<number, number> = {};
      workouts.forEach((w) => {
        const createdTs = parseDateToTs(w.createdAt ?? w.date);
        if (Number.isNaN(createdTs)) return;
        const day = new Date(createdTs);
        day.setHours(0, 0, 0, 0);
        const key = day.getTime();
        if (!byDay[key]) byDay[key] = 0;
        const routines = Array.isArray(w.routines) ? w.routines : [];
        routines.forEach((r) => {
          if (param === "peso") byDay[key] += (r.weight ?? 0) * (r.reps ?? 0) * (r.sets ?? 0);
          if (param === "sets") byDay[key] += r.sets ?? 0;
          if (param === "reps") byDay[key] += (r.reps ?? 0) * (r.sets ?? 0);
        });
      });
      const legacy = Object.entries(byDay)
        .map(([ts, value]) => ({ ts: Number(ts), name: new Date(Number(ts)).toLocaleDateString(), value: Number(value) }))
        .sort((a, b) => a.ts - b.ts)
        .map(({ name, value }) => ({ name, value }));
      console.log("MetricChart: mapped legacy workouts", legacy);
      setChartData(legacy);
    } catch (err) {
      console.error("MetricChart parse error:", err);
      setChartData([]);
    }
  }, [param, dataOverride, data, meta, unidad]);

  return (
    <div className="h-32 sm:h-40 rounded-xl bg-white/95 border border-rose-100 shadow p-1 sm:p-2">
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-sm text-rose-400">Sin datos para mostrar — revisa la consola</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} width={28} />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.98)",
                borderRadius: "8px",
                border: "1px solid #fca5a5",
                fontSize: "11px",
                padding: "4px 8px",
                boxShadow: "0 2px 8px 0 #0001",
              }}
              labelStyle={{ color: "#ef4444", fontWeight: 600 }}
              cursor={{ stroke: "#fca5a5", strokeWidth: 1, opacity: 0.2 }}
            />
            <ReferenceLine
              y={meta}
              stroke="#f87171"
              strokeDasharray="4 4"
              label={{
                value: `Meta (${meta}${unidad})`,
                fill: "#b91c1c",
                fontSize: 10,
                position: "top",
                fontWeight: 600,
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={{ r: 2.5, strokeWidth: 1.5, stroke: "#fff" }} activeDot={{ r: 4 }} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};