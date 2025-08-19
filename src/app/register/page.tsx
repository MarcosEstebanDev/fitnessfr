"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroBackground from "../../components/HeroBackground";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function validatePasswordsMatch(form: HTMLFormElement) {
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value || "";
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement);
    if (confirm && password !== confirm.value) {
      confirm.setCustomValidity("Las contraseñas no coinciden.");
      confirm.reportValidity();
      confirm.setCustomValidity("");
      return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!validatePasswordsMatch(form)) return;

    setLoading(true);
    try {
      // TODO: reemplazar por tu llamada real al backend (fetch/axios)
      const data = Object.fromEntries(new FormData(form));
      console.log("register payload", data);
      await new Promise((r) => setTimeout(r, 900));
      // TODO: guardar token/usuario si aplica
      router.replace("/"); // Cambiar a "/workout" si quieres
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative h-[calc(100dvh-64px)] overflow-hidden flex items-center justify-center px-4">
      <HeroBackground src="https://images.unsplash.com/photo-1554344728-77cf90d9ed26?auto=format&fit=crop&w=1600&q=80" />
      <div className="w-[min(520px,95vw)] bg-white/90 backdrop-blur-xl border border-rose-200 rounded-2xl shadow-2xl p-6 sm:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-600 mt-1">Empieza gratis en segundos</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-rose-700">
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                minLength={2}
                autoComplete="given-name"
                className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="María"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-rose-700">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                minLength={2}
                autoComplete="family-name"
                className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Pérez"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
                title="Mínimo 8 caracteres, al menos 1 letra y 1 número"
                autoComplete="new-password"
                className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-semibold text-rose-700">
                Confirmar contraseña
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <label className="flex items-start gap-3">
            <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-rose-300 text-rose-600 focus:ring-rose-500" />
            <span className="text-sm text-gray-700">
              Acepto los{" "}
              <a href="#" className="font-semibold text-rose-700 hover:underline">
                Términos y la Política de privacidad
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-bold text-white bg-gradient-to-r from-rose-500 to-red-700 shadow-lg hover:from-rose-600 hover:to-red-800 disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-rose-700 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}