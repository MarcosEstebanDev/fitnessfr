"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { authService } from "../services/auth";
import type { AuthUser, AuthResponse, LoginForm } from "../interfaces/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_USER = "fitnessfr.user";
const STORAGE_TOKEN = "fitnessfr.token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehidratar
  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_TOKEN);
      const u = localStorage.getItem(STORAGE_USER);
      if (t && u) {
        setToken(t);
        setUser(JSON.parse(u));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginForm) => {
    const res: AuthResponse = await authService.login(credentials);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem(STORAGE_TOKEN, res.token);
    localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}