import type { ProgressEntry, ProgressListResponse, ProgressResponse } from "../interfaces/progress";
import type { ApiError } from "../interfaces/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function handle<T>(r: Response): Promise<T> {
  if (!r.ok) throw (await r.json().catch(() => ({ message: "Error" }))) as ApiError;
  return r.json();
}

export const progressService = {
  list: () => fetch(`${API}/progress`).then(handle<ProgressListResponse>),
  create: (data: ProgressEntry) =>
    fetch(`${API}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle<ProgressResponse>),
};