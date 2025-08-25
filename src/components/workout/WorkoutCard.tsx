"use client";
import type { WorkoutRecord } from "../../types/workout";

type Props = {
  workout: WorkoutRecord;
  onDelete?: (id: string) => void;
};

export default function WorkoutCard({ workout, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-3 bg-white/95 border border-rose-200 rounded-2xl shadow-lg px-6 py-5 transition hover:shadow-2xl hover:-translate-y-1 hover:bg-rose-50/70 duration-200 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-rose-100 text-rose-600 rounded-full p-2 shadow">
            {/* Icono de ejercicio */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect x="2" y="9" width="3" height="6" rx="1" fill="currentColor" />
              <rect x="19" y="9" width="3" height="6" rx="1" fill="currentColor" />
              <rect x="7" y="11" width="10" height="2" rx="1" fill="currentColor" />
              <rect x="5" y="7" width="2" height="10" rx="1" fill="currentColor" />
              <rect x="17" y="7" width="2" height="10" rx="1" fill="currentColor" />
            </svg>
          </span>
          <h4 className="text-lg font-bold text-rose-700">{workout.title}</h4>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(workout.id)}
            className="px-3 py-1.5 text-sm bg-rose-500 text-white rounded-lg font-semibold shadow hover:bg-rose-700 transition"
            title="Eliminar"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {new Date(workout.createdAt).toLocaleDateString()} {new Date(workout.createdAt).toLocaleTimeString()}
        </span>
        <span>• {workout.routines.length} ejercicios</span>
        {workout.attachments && workout.attachments.length > 0 && (
          <span>• {workout.attachments.length} adjunto(s)</span>
        )}
      </div>
      {workout.notes && <p className="text-gray-700 italic">{workout.notes}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {workout.routines.map((r) => (
          <div key={r.id} className="rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-sm text-gray-800 shadow-sm hover:bg-rose-100 transition">
            <div className="font-semibold text-rose-700 flex items-center gap-2">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="7" y="11" width="10" height="2" rx="1" fill="currentColor" />
              </svg>
              {r.name || "Ejercicio"}
            </div>
            <div className="opacity-90">Series: {r.sets} · Reps: {r.reps} · Peso: {r.weight ?? 0} kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}