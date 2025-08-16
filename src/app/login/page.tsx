"use client";
import Link from "next/link";
import { useState } from "react";
import HeroBackground from "../../components/HeroBackground";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <main className="relative h-[calc(100dvh-64px)] overflow-hidden flex items-center justify-center px-4">
      <HeroBackground src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1600&q=80" />
      <div className="w-[min(480px,95vw)] bg-white/90 backdrop-blur-xl border border-rose-200 rounded-2xl shadow-2xl p-6 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
            Iniciar sesión
          </h1>
          <p className="text-sm text-gray-600 mt-1">Accede a tu cuenta</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-rose-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-rose-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" className="h-4 w-4 rounded border-rose-300 text-rose-600 focus:ring-rose-500" />
              <span className="text-sm text-gray-700">Recordarme</span>
            </label>
            <button type="button" className="text-sm font-semibold text-rose-700 hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-bold text-white bg-gradient-to-r from-rose-500 to-red-700 shadow-lg hover:from-rose-600 hover:to-red-800 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold text-rose-700 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}