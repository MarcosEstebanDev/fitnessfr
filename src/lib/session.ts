export type FitnessSession = {
  id: string;
  token: string;
  user: { firstName?: string; lastName?: string; email: string };
  workouts: unknown[];
  createdAt: string;
};

const KEY = "fitnessfr_session";

export function getSession(): FitnessSession | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FitnessSession;
  } catch {
    return null;
  }
}

export function setSession(session: FitnessSession) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
    // storage event won't fire on same tab; you can dispatch a custom event if needed
    window.dispatchEvent(new Event("fitnessfr_session_changed"));
  } catch (e) {
    console.warn("No se pudo guardar la sesión en localStorage.", e);
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("fitnessfr_session_changed"));
  } catch (e) {
    console.warn("No se pudo eliminar la sesión.", e);
  }
}