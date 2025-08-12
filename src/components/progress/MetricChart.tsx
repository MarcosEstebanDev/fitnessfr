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
        <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ff" />
        <XAxis dataKey="name" stroke="#6366f1" />
        <YAxis stroke="#6366f1" />
        <Tooltip
          contentStyle={{ background: "rgba(255,255,255,0.9)", borderRadius: "12px", border: "1px solid #e0e7ff" }}
        />
        <ReferenceLine
          y={meta}
          stroke="#10b981"
          strokeDasharray="4 4"
          label={{ value: `Meta (${meta}${metric.config.unidad})`, fill: "#065f46", fontSize: 12 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={metric.color}
          strokeWidth={3}
          dot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);