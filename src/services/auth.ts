import type { LoginForm, AuthResponse, ApiError } from "../interfaces/auth";
import type { RegisterForm } from "../interfaces/register";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({ message: "Error" }));
    throw err;
  }
  return res.json();
}

// Asegura que login devuelva { user, token } válido desde tu API.
// Si todavía es demo, puedes simular:
export const authService = {
  login: async (data: LoginForm) => {
    // DEMO: reemplazar por fetch real
    await new Promise((r) => setTimeout(r, 400));
    return {
      user: { id: "1", email: data.email, name: "Usuario" },
      token: "demo-token-123",
    } as AuthResponse;
  },
  register: async () => {
    // ...
  },
};