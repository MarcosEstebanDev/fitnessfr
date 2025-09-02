export type FitnessSession = {
  id: string;
  token: string;
  user: { firstName?: string; lastName?: string; email: string };
  workouts: unknown[];
  createdAt: string;
};

// Helpers seguros para leer/escribir/limpiar la sesión en localStorage
export const SESSION_KEY = "fitnessfr.session";

export function getSession(): unknown | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession(payload: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    // notificar listeners
    window.dispatchEvent(new Event("fitnessfr_session_changed"));
  } catch {
    // noop
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("fitnessfr_session_changed"));
  } catch {
    // noop
  }
}