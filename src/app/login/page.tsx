"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HeroBackground from "../../components/HeroBackground";
import { BackgroundByRoute } from "@/components/layout/BackgroundByRoute";
import { setSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    try {
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
      const { email = "" } = data;

      await new Promise((r) => setTimeout(r, 800));

      const session = {
        id: typeof crypto !== "undefined" && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `id_${Date.now()}`,
        token: btoa(`${email}:${Date.now()}`),
        user: { email },
        workouts: [] as unknown[],
        createdAt: new Date().toISOString(),
      };

      // usa setSession para guardar y disparar el evento de actualización
      setSession(session);

      router.replace("/workout");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackgroundByRoute />
      <motion.main
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.5 }}
        className="relative h-full overflow-hidden pt-16 md:pt-20 px-3 md:px-6 flex items-center justify-center"
      >
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
                autoComplete="email"
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
                minLength={8}
                autoComplete="current-password"
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
      </motion.main>
    </>
  );
}