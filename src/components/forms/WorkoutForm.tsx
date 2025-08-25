"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { Workout, Exercise } from "../../interfaces/workout";

interface Props {
  onSubmit?: (data: any) => void;

}

export const WorkoutForm = ({ onSubmit }: Props) => {
  const [workout, setWorkout] = useState<Workout>({
    date: new Date().toISOString().slice(0, 10),
    title: "",
    exercises: [],
    notes: "",
  });
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    sets: 3,
    reps: 10,
    weight: undefined,
  });
  const [error, setError] = useState("");

  const addExercise = () => {
    if (!exercise.name) return;
    setWorkout(w => ({ ...w, exercises: [...w.exercises, exercise] }));
    setExercise({ name: "", sets: 3, reps: 10, weight: undefined });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workout.title || !workout.exercises.length) {
      setError("Título y al menos un ejercicio.");
      return;
    }
    setError("");
    onSubmit?.(workout);
    // alert("Workout guardado (demo)."); // Quitar para producción
  };

  return (
    <form onSubmit={submit} className="space-y-4 animate-fade-in">
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Fecha"
          type="date"
          value={workout.date}
          onChange={e => setWorkout(w => ({ ...w, date: e.target.value }))}
        />
        <Input
          label="Título"
          value={workout.title}
          onChange={e => setWorkout(w => ({ ...w, title: e.target.value }))}
          placeholder="Pecho / Espalda"
        />
      </div>
      <Input
        label="Notas"
        value={workout.notes}
        onChange={e => setWorkout(w => ({ ...w, notes: e.target.value }))}
        placeholder="Sensaciones generales"
      />

      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3 shadow">
        <p className="text-sm font-semibold text-rose-700 flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="3" fill="currentColor" opacity="0.15" />
            <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M16 3v4M8 3v4M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Agregar ejercicio
        </p>
        <div className="grid gap-3 md:grid-cols-5">
          <Input
            className="md:col-span-2"
            placeholder="Nombre"
            value={exercise.name}
            onChange={e => setExercise(ex => ({ ...ex, name: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Sets"
            value={exercise.sets}
            onChange={e => setExercise(ex => ({ ...ex, sets: Number(e.target.value) }))}
          />
          <Input
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={e => setExercise(ex => ({ ...ex, reps: Number(e.target.value) }))}
          />
          <Input
            type="number"
            placeholder="Peso"
            value={exercise.weight ?? ""}
            onChange={e => setExercise(ex => ({ ...ex, weight: e.target.value ? Number(e.target.value) : undefined }))}
          />
        </div>
        <Button type="button" onClick={addExercise} className="flex items-center gap-2 bg-rose-500 text-white hover:bg-rose-700 transition">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <rect x="10" y="4" width="4" height="16" rx="2" fill="currentColor" />
            <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
          </svg>
          Añadir ejercicio
        </Button>

        {workout.exercises.length > 0 && (
          <ul className="space-y-2 max-h-40 overflow-auto text-sm">
            {workout.exercises.map((ex, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-rose-100 text-rose-800 shadow-sm"
              >
                <span>
                  {ex.name} - {ex.sets}x{ex.reps}
                  {ex.weight ? ` @ ${ex.weight}kg` : ""}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setWorkout(w => ({
                      ...w,
                      exercises: w.exercises.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-xs text-red-500 hover:underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-rose-500 to-red-700 text-white font-bold shadow-lg hover:from-rose-600 hover:to-red-800 transition-all duration-200 hover:scale-105">
        Guardar workout
      </Button>
    </form>
  );
};