"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { Workout, Exercise } from "../../interfaces/workout";

interface Props {
  onSubmit?: (data: Workout) => void;
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
    setExercise({ name: "", sets: 3, reps: 10, weight: undefined, notes: "" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workout.title || !workout.exercises.length) {
      setError("Título y al menos un ejercicio.");
      return;
    }
    setError("");
    onSubmit?.(workout);
    alert("Workout guardado (demo).");
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

      <div className="p-4 rounded-xl border border-indigo-200 bg-white/40 space-y-3">
        <p className="text-sm font-semibold text-indigo-700">Agregar ejercicio</p>
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
        <Button type="button" onClick={addExercise}>
          Añadir ejercicio
        </Button>

        {workout.exercises.length > 0 && (
          <ul className="space-y-2 max-h-40 overflow-auto text-sm">
            {workout.exercises.map((ex, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800"
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

      <Button type="submit">Guardar workout</Button>
    </form>
  );
};