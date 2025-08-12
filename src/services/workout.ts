import type { Workout, WorkoutResponse, WorkoutListResponse } from "../interfaces/workout";
import type { ApiError } from "../interfaces/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function handle<T>(r: Response): Promise<T> {
  if (!r.ok) throw (await r.json().catch(() => ({ message: "Error" }))) as ApiError;
  return r.json();
}

export const workoutService = {
  list: () => fetch(`${API}/workouts`).then(handle<WorkoutListResponse>),
  create: (data: Workout) =>
    fetch(`${API}/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle<WorkoutResponse>),
};