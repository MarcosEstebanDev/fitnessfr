"use client";
import { useEffect, useState } from "react";
import type { WorkoutRecord, RoutineItem } from "../../types/workout";

const STORAGE_KEY = "ffr.workouts.v1";

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

export default function Progress() {
  const [workouts, setWorkouts] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const allWorkouts = Object.values(parsed).flat();
        setWorkouts(allWorkouts);
      } catch {}
    }
  }, []);

  // Evolución semanal
  const weekly = groupByWeek(workouts);

  // Evolución por ejercicio
  const exerciseStats = aggregateByExercise(workouts);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Progreso</h1>
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
    </main>
  );
}