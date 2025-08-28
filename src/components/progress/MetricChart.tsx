"use client";
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
import type { ProgressMetric } from "../../constants/progressTypes";

interface Props {
  metric: ProgressMetric;
  meta: number;
}

export const MetricChart = ({ metric, meta }: Props) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={metric.data} margin={{ top: 10, right: 24, left: 0, bottom: 8 }}>
        {/* grid en rojo claro */}
        <CartesianGrid strokeDasharray="4 4" stroke="#fee2e2" />
        {/* ejes en rojo */}
        <XAxis dataKey="name" stroke="#ef4444" />
        <YAxis stroke="#ef4444" />
        <Tooltip
          contentStyle={{ background: "rgba(255,255,255,0.95)", borderRadius: "12px", border: "1px solid #fecaca" }}
        />
        <ReferenceLine
          y={meta}
          stroke="#ef4444"
          strokeDasharray="4 4"
          label={{ value: `Meta (${meta}${metric.config.unidad})`, fill: "#7f1d1d", fontSize: 12 }}
        />
        {/* Forzamos la línea a rojo para mantener consistencia con la UI */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);