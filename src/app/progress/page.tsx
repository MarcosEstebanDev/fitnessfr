"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const progressTypes = [
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

export default function Progress() {
  const [selectedType, setSelectedType] = useState(progressTypes[0].key);
  const currentType = progressTypes.find(t => t.key === selectedType);

  const [meta, setMeta] = useState(currentType?.config.meta ?? 0);

  // Actualiza meta si cambia el tipo
  const handleTypeChange = (key: string) => {
    setSelectedType(key);
    const type = progressTypes.find(t => t.key === key);
    setMeta(type?.config.meta ?? 0);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Fondo igual que workout */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80"
          alt="Fondo gimnasio"
          className="w-full h-full object-cover opacity-40 absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-blue-700/80" />
      </div>
      {/* Tarjeta contenedor grande */}
      <div className="relative w-full max-w-[98vw] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-indigo-200 flex flex-col gap-10 px-4 md:px-12 py-8 md:py-14 overflow-hidden min-h-[80vh]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 bg-clip-text text-transparent animate-gradient-move drop-shadow">
            Progreso
          </h2>
        </div>
        {/* Selección de tipo de progreso */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-center">
          {progressTypes.map(type => (
            <button
              key={type.key}
              onClick={() => handleTypeChange(type.key)}
              className={`px-5 py-2 rounded-xl font-bold border transition ${
                selectedType === type.key
                  ? "bg-indigo-500 text-white border-indigo-600 shadow"
                  : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
        {/* Configuración de meta */}
        <div className="mb-8 flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex flex-col items-center">
            <label className="text-indigo-700 font-semibold mb-2">
              Meta de {currentType?.label}
            </label>
            <input
              type="number"
              value={meta}
              onChange={e => setMeta(Number(e.target.value))}
              className="px-4 py-2 rounded-xl border border-indigo-200 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-center font-bold w-32"
            />
            <span className="text-xs text-gray-500 mt-1">
              Unidad: {currentType?.config.unidad}
            </span>
          </div>
        </div>
        {/* Gráfico de progreso */}
        <div className="bg-white/90 rounded-2xl shadow-md border border-indigo-100 p-6">
          <h4 className="text-lg font-bold text-indigo-700 mb-4 text-center">
            Evolución de tu progreso
          </h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={currentType?.data ?? []}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#6366f1", fontWeight: 700 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={currentType?.color}
                strokeWidth={3}
                dot={{ r: 5 }}
                name={currentType?.label}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Animación gradiente título */}
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s ease-in-out infinite;
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </main>
  );
}