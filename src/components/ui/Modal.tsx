"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Calendar } from "react-date-range";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode; // <-- CAMBIO: acepta JSX además de string
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnBackdrop?: boolean;
};

const sizeMap = {
  sm: "w-[min(480px,92vw)]",
  md: "w-[min(640px,92vw)]",
  lg: "w-[min(820px,94vw)]",
  xl: "w-[min(980px,96vw)]",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "lg",
  closeOnBackdrop = true,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      {/* Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`max-h-[90dvh] ${sizeMap[size]} bg-white rounded-2xl shadow-2xl border border-rose-200 overflow-hidden`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-red-50">
            <h3 className="text-lg font-bold text-rose-700">{title}</h3>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-rose-700 hover:bg-rose-100 font-semibold"
              aria-label="Cerrar modal"
            >
              Cerrar
            </button>
          </div>
          <div className="p-5 overflow-auto">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

type Routine = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export function WorkoutForm({ onCancel }: { onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [routines, setRoutines] = useState<Routine[]>([{ id: Date.now(), name: "", sets: 1, reps: 1, weight: 0 }]);

  const addRoutine = () => {
    setRoutines([...routines, { id: Date.now(), name: "", sets: 1, reps: 1, weight: 0 }]);
  };

  const updateRoutine = (id: number, field: keyof Routine, value: string | number) => {
    setRoutines(
      routines.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const removeRoutine = (id: number) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar el entrenamiento
    console.log({ title, notes, routines });
  };

  const Content = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Título</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pecho y tríceps"
            className="px-3 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">Adjuntos (opcional)</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setAttachments(Array.from(e.target.files || []).map((f) => ({ name: f.name })))}
            className="px-3 py-2 rounded-lg border border-rose-200 bg-white/80"
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
          className="px-3 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80"
        />
      </label>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-md font-bold text-rose-700">Rutina</h4>
          <button onClick={addRoutine} className="px-3 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700">
            Añadir ejercicio
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {routines.map((r, idx) => (
            <div key={r.id} className="grid grid-cols-12 gap-2 bg-rose-50/60 border border-rose-200 rounded-xl p-3">
              <div className="col-span-12 md:col-span-4">
                <input
                  value={r.name}
                  onChange={(e) => updateRoutine(r.id, "name", e.target.value)}
                  placeholder={`Ejercicio ${idx + 1} (p.ej., Press banca)`}
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  min={1}
                  value={r.sets}
                  onChange={(e) => updateRoutine(r.id, "sets", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-rose-200 bg-white"
                  placeholder="Series"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  min={1}
                  value={r.reps}
                  onChange={(e) => updateRoutine(r.id, "reps", Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-rose-200 bg-white"
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
                  className="w-full px-3 py-2 rounded-lg border border-rose-200 bg-white"
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
        <button onClick={handleSave} className="px-5 py-2.5 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700">
          Guardar
        </button>
        <button onClick={onCancel} className="px-5 py-2.5 bg-rose-100 text-rose-700 rounded-xl font-bold hover:bg-rose-200">
          Cancelar
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-white/95 border border-rose-100 rounded-2xl shadow p-5 mb-4 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-rose-700">Nuevo entrenamiento</h3>
        <button onClick={onCancel} className="px-3 py-1.5 text-rose-700 hover:text-rose-900 font-semibold">
          Cerrar
        </button>
      </div>
      {Content}
    </div>
  );
}

type Workout = {
  id: number;
  title: string;
  notes?: string;
  createdAt: string;
  routines: Routine[];
  attachments?: { name: string }[];
};

export function WorkoutCard({ workout, onDelete }: { workout: Workout; onDelete?: (id: number) => void }) {
  return (
    <div className="flex flex-col gap-2 bg-white/95 border border-rose-100 rounded-2xl shadow px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-rose-700">{workout.title}</h4>
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
          <div key={r.id} className="rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-sm text-gray-800">
            <div className="font-semibold text-rose-700">{r.name || "Ejercicio"}</div>
            <div className="opacity-90">Series: {r.sets} · Reps: {r.reps} · Peso: {r.weight} kg</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkoutPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayWorkouts, setDayWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async (date: Date) => {
    // Lógica para obtener los entrenamientos del día seleccionado
  };

  const deleteWorkout = async (id: number) => {
    // Lógica para eliminar un entrenamiento
  };

  useEffect(() => {
    fetchWorkouts(selectedDate);
  }, [selectedDate]);

  return (
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

      {/* Tunea estilos del calendario */}
      <style jsx global>{`
        .rdrCalendarWrapper { border-radius: 1rem; }
        .rdrMonthAndYearPickers select { color: #be123c; font-weight: 700; } /* rose-700 */
        .rdrWeekDay { color: #e11d48 !important; font-weight: 700; } /* rose-600 */
        .rdrDayNumber span { font-weight: 700; }
        .rdrDayToday .rdrDayNumber span:after { background: #e11d48 !important; }
        .rdrDaySelected, .rdrDayStartPreview, .rdrDayEndPreview { background: #e11d48 !important; color: white !important; }
      `}</style>
    </div>
  );
}

function setAttachments(arg0: { name: string; }[]): void {
    throw new Error("Function not implemented.");
}
