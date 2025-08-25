export type RoutineItem = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type WorkoutRecord = {
  id: string;
  title: string;
  notes?: string;
  routines: RoutineItem[];
  attachments?: { name: string }[];
  createdAt: string; // ISO
  };