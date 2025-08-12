export interface ProgressEntry {
  id?: string;
  date: string;      // ISO
  weight?: number;   // kg
  bodyFat?: number;  // %
  muscleMass?: number; // kg opcional
  notes?: string;
}

export interface ProgressResponse {
  entry: ProgressEntry;
}

export interface ProgressListResponse {
  entries: ProgressEntry[];
}