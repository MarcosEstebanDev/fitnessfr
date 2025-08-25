"use client";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import WorkoutCard from "../../components/workout/WorkoutCard";
import WorkoutCreateModal from "../../components/workout/WorkoutCreateModal";
import HeroBackground from "../../components/HeroBackground";
import type { WorkoutRecord } from "../../types/workout";
import { motion } from "framer-motion";
import { BackgroundByRoute } from "@/components/layout/BackgroundByRoute";

const STORAGE_KEY = "ffr.workouts.v1";

export default function Workout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutsByDate, setWorkoutsByDate] = useState<Record<string, WorkoutRecord[]>>({});
  const [showForm, setShowForm] = useState(false);

  // Load/Persist
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setWorkoutsByDate(JSON.parse(raw));
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutsByDate));
  }, [workoutsByDate]);

  const k = useMemo(() => dateKey(selectedDate), [selectedDate]);
  const dayWorkouts = workoutsByDate[k] ?? [];

  function saveWorkout(input: Omit<WorkoutRecord, "id" | "createdAt">) {
    const toSave: WorkoutRecord = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setWorkoutsByDate((prev) => ({
      ...prev,
      [k]: [...(prev[k] || []), toSave],
    }));
    setShowForm(false);
  }

  function deleteWorkout(id: string) {
    setWorkoutsByDate((prev) => ({
      ...prev,
      [k]: (prev[k] || []).filter((w) => w.id !== id),
    }));
  }

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
        {/* Contenedor centrado y acotado (un poco más grande) */}
        <div className="relative w-[min(1260px,95vw)] h-[min(84dvh,820px)] bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-rose-200 flex flex-col md:flex-row gap-6 md:gap-8 px-5 md:px-8 py-6 md:py-8 overflow-hidden">
          {/* Columna izquierda: Calendario estético */}
          <div className="w-full md:w-[360px] flex flex-col">
            <div className="rounded-2xl border border-rose-100 bg-white/90 shadow-md overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-rose-500/10 to-red-500/10 border-b border-rose-100">
                <h3 className="text-xl font-bold text-rose-700">Calendario</h3>
                <p className="text-sm text-rose-600/80">Seleccioná un día para ver/registrar</p>
              </div>
              <div className="p-3">
                <Calendar
                  date={selectedDate}
                  onChange={(d: Date) => setSelectedDate(d)}
                  color="#e11d48" // rose-600
                  showMonthAndYearPickers
                  weekdayDisplayFormat="EE"
                />
              </div>
              <div className="px-4 py-3 bg-rose-50/70 border-t border-rose-100">
                <span className="text-rose-700 font-semibold">
                  Día seleccionado: <span className="font-bold">{selectedDate.toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Columna derecha: Tarjetas del día */}
          <div className="flex-1 min-w-0 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
                Workout
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm md:text-base font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
                  {selectedDate.toLocaleDateString()}
                </span>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-red-700 text-white rounded-xl font-bold shadow-lg hover:from-rose-600 hover:to-red-800 transition-all duration-200 hover:scale-105"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <rect x="10" y="4" width="4" height="16" rx="2" fill="currentColor" />
                    <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
                  </svg>
                  Registrar
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Entrenamientos del día</h3>
              {dayWorkouts.length === 0 ? (
                <div className="bg-white/95 border border-rose-100 rounded-2xl shadow p-6 text-center">
                  <p className="text-gray-700">No hay registros para {selectedDate.toLocaleDateString()}.</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Registrar entrenamiento
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {dayWorkouts.map((w) => (
                    <WorkoutCard key={w.id} workout={w} onDelete={deleteWorkout} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal crear workout */}
        <WorkoutCreateModal open={showForm} onClose={() => setShowForm(false)} onSave={saveWorkout} />
        {/* Estilos del calendario — movidos a styles/global.css */}
      </motion.main>
    </>
  );
}

function dateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}