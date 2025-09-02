// Mock data para workouts ajustado al shape que usa la pantalla Workout:
// - La app guarda workoutsByDate: Record<dateKey, WorkoutRecord[]>
// - Cada WorkoutRecord incluye id, createdAt, name, notes, exercises (sin date, ya que la key indica el día)

export type MockExercise = {
  id: string;
  name: string;
  sets: number;
  reps?: number | string;
  weightKg?: number;
  restSec?: number;
  notes?: string;
};

export type MockWorkoutRecord = {
  id: string;
  name: string;
  createdAt: string;
  notes?: string;
  exercises: MockExercise[];
  totalVolume?: number;
};

function dateKey(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Lista de workouts (útil si quieres un array plano)
export const mockWorkoutsList: MockWorkoutRecord[] = [
  {
    id: "wk-1",
    name: "Full Body A",
    createdAt: "2025-09-01T07:50:00.000Z",
    notes: "Enfocado en fuerza — prioridad sentadillas y press.",
    exercises: [
      { id: "ex-1", name: "Back Squat", sets: 5, reps: 5, weightKg: 100, restSec: 120 },
      { id: "ex-2", name: "Bench Press", sets: 5, reps: 5, weightKg: 80, restSec: 120 },
      { id: "ex-3", name: "Barbell Row", sets: 4, reps: 8, weightKg: 70, restSec: 90 },
    ],
    totalVolume: 5 * 5 * 100 + 5 * 5 * 80 + 4 * 8 * 70,
  },
  {
    id: "wk-2",
    name: "Upper Hypertrophy",
    createdAt: "2025-08-29T18:00:00.000Z",
    notes: "Más repeticiones, superseries.",
    exercises: [
      { id: "ex-4", name: "Incline Dumbbell Press", sets: 4, reps: 10, weightKg: 24, restSec: 60 },
      { id: "ex-5", name: "Pull-ups (weighted)", sets: 4, reps: 8, weightKg: 5, restSec: 90 },
      { id: "ex-6", name: "Lateral Raises", sets: 3, reps: "12-15", weightKg: 8, restSec: 45 },
    ],
  },
  {
    id: "wk-3",
    name: "Leg Day",
    createdAt: "2025-08-26T06:45:00.000Z",
    notes: "Trabajo de piernas pesado + accesorios.",
    exercises: [
      { id: "ex-7", name: "Deadlift", sets: 4, reps: 5, weightKg: 150, restSec: 180 },
      { id: "ex-8", name: "Front Squat", sets: 3, reps: 6, weightKg: 90, restSec: 120 },
      { id: "ex-9", name: "Hamstring Curl", sets: 3, reps: 12, weightKg: 40, restSec: 60 },
    ],
    totalVolume: 4 * 5 * 150 + 3 * 6 * 90 + 3 * 12 * 40,
  },
];

// Estructura por fecha (la que espera la pantalla Workout)
export const mockWorkoutsByDate: Record<string, MockWorkoutRecord[]> = {
  [dateKey("2025-09-01")]: [mockWorkoutsList[0]],
  [dateKey("2025-08-29")]: [mockWorkoutsList[1]],
  [dateKey("2025-08-26")]: [mockWorkoutsList[2]],
};

// Devuelve lista plana
export function getMockWorkouts() {
  return mockWorkoutsList;
}

// Devuelve map por fecha (matching workoutsByDate)
export function getMockWorkoutsByDate() {
  return mockWorkoutsByDate;
}

/**
 * Sembrar en localStorage usando la key por defecto que usa la app ("ffr.workouts.v1").
 * Ahora escribe la estructura Record<dateKey, WorkoutRecord[]>, que es lo que espera src/app/workout/page.tsx
 */
export function seedLocalWorkouts(key = "ffr.workouts.v1") {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(mockWorkoutsByDate));
  } catch (e) {
    // ignore
  }
}

/**
 * Si tu app utiliza una sesión en memoria, puedes inyectar los mocks así:
 * seedToSession(setSessionFn)
 */
export function seedToSession(setSessionFn: (payload: any) => void) {
  try {
    setSessionFn({ workouts: mockWorkoutsList });
  } catch (e) {
    // ignore
  }
}