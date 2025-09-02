"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { getSession, clearSession } from "../lib/session";
import type { FitnessSession } from "../types/FitnessSession";

type AnyUser = Record<string, any> | null;

function normalizeUser(raw: AnyUser) {
  if (!raw) return null;
  // If the object already has firstName/lastName use them
  const id = raw.id ?? raw._id ?? null;
  const email = raw.email ?? raw.mail ?? null;
  // possible name fields: name, fullName, displayName
  const nameField = raw.name ?? raw.fullName ?? raw.displayName ?? null;

  const firstName = raw.firstName ?? raw.firstname ?? (nameField ? String(nameField).split(" ")[0] : undefined);
  const lastName =
    raw.lastName ??
    raw.lastname ??
    (nameField ? String(nameField).split(" ").slice(1).join(" ") : undefined);

  return {
    id,
    email,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
    name: nameField ?? undefined,
  };
}

export default function NavBar() {
  const router = useRouter();
  const { user } = useAuth();

  const [session, setSessionState] = useState<FitnessSession | null>(null);
  const [open, setOpen] = useState(false);

  // Rehidratar solo en cliente
  useEffect(() => {
    const s = getSession();
    setSessionState((s as FitnessSession) ?? null);
  }, []);

  useEffect(() => {
    const onChange = () => {
      const s = getSession();
      setSessionState((s as FitnessSession) ?? null);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("fitnessfr_session_changed", onChange);
      window.addEventListener("storage", onChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("fitnessfr_session_changed", onChange);
        window.removeEventListener("storage", onChange);
      }
    };
  }, []);

  // Fuente de verdad para el estado autenticado: user (useAuth) o session.user
  const currentUserRaw = user ?? session?.user ?? null;
  const currentUser = normalizeUser(currentUserRaw);

  useEffect(() => {
    if (!currentUser?.id) return;
    // lógica dependiente del usuario
  }, [currentUser?.id]);

  function initials() {
    const u = currentUser;
    if (!u) return "";
    // Preferir nombre completo si existe
    if (u.name) {
      const parts = String(u.name).trim().split(/\s+/);
      const a = (parts[0] || "").charAt(0);
      const b = (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "") || "";
      const res = (a + b).toUpperCase();
      return res || (u.email || "").charAt(0).toUpperCase();
    }
    const first = (u.firstName || "").charAt(0) || "";
    const last = (u.lastName || "").charAt(0) || "";
    if (first || last) return (first + last).toUpperCase();
    return (u.email || "").charAt(0).toUpperCase();
  }

  function displayName() {
    const u = currentUser;
    if (!u) return "";
    if (u.name) return String(u.name);
    if (u.firstName) return `${u.firstName}${u.lastName ? " " + u.lastName : ""}`;
    return u.email ?? "";
  }

  function handleSignOut() {
    try {
      clearSession();
    } catch {
      // ignore
    }
    setOpen(false);
    router.replace("/");
  }

  return (
    <nav className="w-full border-b border-rose-100 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center">
        <Link href="/" className="text-lg font-bold text-rose-700">
          FitnessFR
        </Link>

        {/* Centro / navegación principal */}
        <div className="ml-6 hidden md:flex items-center gap-4">
          <Link href="/workout" className="text-sm font-medium text-gray-700 hover:text-rose-700">
            Workout
          </Link>
          <Link href="/progress" className="text-sm font-medium text-gray-700 hover:text-rose-700">
            Progress
          </Link>
        </div>

        {/* Right: user / auth actions */}
        <div className="ml-auto flex items-center gap-4 relative">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-sm font-medium text-rose-700">{displayName()}</span>
                <span className="text-xs text-rose-500">{currentUser.email}</span>
              </div>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Abrir menú de usuario"
                className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-semibold"
              >
                {initials()}
              </button>

              {open && (
                <div className="absolute right-0 top-12 bg-white border rounded shadow-md px-3 py-2 z-50">
                  <Link href="/profile" className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-50">
                    Perfil
                  </Link>
                  <button onClick={handleSignOut} className="w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-rose-700">
                Iniciar
              </Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-rose-600 px-3 py-1 rounded hover:bg-rose-700">
                Crear cuenta
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}