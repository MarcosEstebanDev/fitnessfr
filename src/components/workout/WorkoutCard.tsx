"use client";
import type { WorkoutRecord } from "../../types/workout";

type Props = {
  workout: WorkoutRecord;
  onDelete?: (id: string) => void;
};

export default function WorkoutCard({ workout, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-white/95 border border-indigo-100 rounded-2xl shadow px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-indigo-700">{workout.title}</h4>
          <span className="text-sm text-gray-500">
            {new Date(workout.createdAt).toLocaleTimeString()} • {workout.routines.length} ejercicios
            {workout.attachments && workout.attachments.length > 0 ? ` • ${workout.attachments.length} adjunto(s)` : ""}
          </span>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(workout.id)}
            className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 font-semibold"
          >
            Eliminar
          </button>
        )}
      </div>
      {workout.notes && <p className="text-gray-700">{workout.notes}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {workout.routines.map((r) => (
          <div key={r.id} className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-sm text-gray-800">
            <div className="font-semibold text-indigo-700">{r.name || "Ejercicio"}</div>
            <div className="opacity-90">Series: {r.sets} · Reps: {r.reps} · Peso: {r.weight} kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}