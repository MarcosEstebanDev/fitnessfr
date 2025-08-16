"use client";
import { useState } from "react";
import type { RoutineItem, WorkoutRecord } from "../../types/workout";

type Props = {
  initial?: Partial<WorkoutRecord>;
  onSave: (input: Omit<WorkoutRecord, "id" | "createdAt">) => void;
  onCancel: () => void;
  bare?: boolean; // nuevo: sin tarjeta contenedora ni header (para modal)
};

export default function WorkoutForm({ initial, onSave, onCancel, bare = false }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [attachments, setAttachments] = useState<{ name: string }[]>(initial?.attachments ?? []);
  const [routines, setRoutines] = useState<RoutineItem[]>(
    initial?.routines?.length
      ? initial.routines
      : [{ id: crypto.randomUUID(), name: "", sets: 3, reps: 10, weight: 0 }]
  );

  function addRoutine() {
    setRoutines((r) => [...r, { id: crypto.randomUUID(), name: "", sets: 3, reps: 10, weight: 0 }]);
  }
  function removeRoutine(id: string) {
    setRoutines((r) => r.filter((x) => x.id !== id));
  }
  function updateRoutine(id: string, field: keyof RoutineItem, value: string | number) {
    setRoutines((list) => list.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }
  function handleSave() {
    if (!title.trim() || routines.length === 0) return;
    onSave({ title, notes, routines, attachments });
  }

  const Content = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Título</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pecho y tríceps"
            className="px-3 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Adjuntos (opcional)</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setAttachments(Array.from(e.target.files || []).map((f) => ({ name: f.name })))}
            className="px-3 py-2 rounded-lg border border-indigo-200 bg-white/80"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 mt-3">
        <span className="text-sm font-semibold text-gray-700">Notas</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Sensaciones, RPE, recordatorios…"
          className="px-3 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80"
        />
      </label>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-md font-bold text-indigo-700">Rutina</h4>
          <button onClick={addRoutine} className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Añadir ejercicio
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {routines.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-12 gap-2 bg-indigo-50/60 border border-indigo-200 rounded-xl p-3">
              <div className="col-span-12 md:col-span-4">
                <input
                  value={r.name}
                  onChange={(e) => updateRoutine(r.id, "name", e.target.value)}
                  placeholder={`Ejercicio ${idx + 1} (p.ej., Press banca)`}
                  className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  min={1}
                  value={r.sets}
                  onChange={(e) => updateRoutine(r.id, "sets", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white"
                  placeholder="Series"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  min={1}
                  value={r.reps}
                  onChange={(e) => updateRoutine(r.id, "reps", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white"
                  placeholder="Reps"
                />
              </div>
              <div className="col-span-4 md:col-span-3">
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  value={r.weight}
                  onChange={(e) => updateRoutine(r.id, "weight", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-white"
                  placeholder="Peso (kg)"
                />
              </div>
              <div className="col-span-12 md:col-span-1 flex md:justify-end">
                <button
                  onClick={() => removeRoutine(r.id)}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-700 font-semibold"
                  aria-label="Eliminar ejercicio"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
          Guardar
        </button>
        <button onClick={onCancel} className="px-5 py-2.5 bg-indigo-100 text-indigo-700 rounded-xl font-bold hover:bg-indigo-200">
          Cancelar
        </button>
      </div>
    </>
  );

  if (bare) return Content;

  return (
    <div className="bg-white/95 border border-indigo-100 rounded-2xl shadow p-5 mb-4 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-indigo-700">Nuevo entrenamiento</h3>
        <button onClick={onCancel} className="px-3 py-1.5 text-indigo-700 hover:text-indigo-900 font-semibold">
          Cerrar
        </button>
      </div>
      {Content}
    </div>
  );
}