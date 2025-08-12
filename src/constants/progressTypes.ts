export interface ProgressMetric {
  key: string;
  label: string;
  config: { meta: number; unidad: string };
  data: { name: string; value: number }[];
  color: string;
}

export const progressTypes: ProgressMetric[] = [
  {
    key: "Peso",
    label: "Peso (kg)",
    config: { meta: 75, unidad: "kg" },
    data: [
      { name: "Enero", value: 80 },
      { name: "Febrero", value: 78 },
      { name: "Marzo", value: 77 },
      { name: "Abril", value: 76 },
      { name: "Mayo", value: 75 },
    ],
    color: "#6366f1",
  },
  {
    key: "Resistencia",
    label: "Resistencia (min)",
    config: { meta: 60, unidad: "min" },
    data: [
      { name: "Enero", value: 30 },
      { name: "Febrero", value: 35 },
      { name: "Marzo", value: 40 },
      { name: "Abril", value: 50 },
      { name: "Mayo", value: 55 },
    ],
    color: "#3b82f6",
  },
  {
    key: "CalidadVida",
    label: "Calidad de vida (1-10)",
    config: { meta: 9, unidad: "" },
    data: [
      { name: "Enero", value: 6 },
      { name: "Febrero", value: 7 },
      { name: "Marzo", value: 7.5 },
      { name: "Abril", value: 8 },
      { name: "Mayo", value: 8.5 },
    ],
    color: "#a78bfa",
  },
];