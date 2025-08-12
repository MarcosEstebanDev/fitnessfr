export interface Exercise {
  id?: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface Workout {
  id?: string;
  date: string; // ISO
  title: string;
  exercises: Exercise[];
  notes?: string;
}

export interface WorkoutResponse {
  workout: Workout;
}

export interface WorkoutListResponse {
  workouts: Workout[];
}