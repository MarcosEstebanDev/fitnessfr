"use client";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "../../components/forms/LoginForm";

export default function Login() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo opaca */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1200&q=80"
          alt="Fondo gimnasio"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-blue-700/80" />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="grid grid-cols-1 gap-8 w-full max-w-3xl">
          {/* Card principal */}
          <div className="relative bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-indigo-200 flex flex-col items-center px-12 py-16 overflow-hidden min-h-[520px]">
            {/* Ícono de mancuernas */}
            <div className="flex justify-center items-center mt-4 mb-6">
              <span className="bg-indigo-100 text-indigo-600 rounded-full p-5 shadow-lg animate-bounce-slow">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="9" width="3" height="6" rx="1" fill="currentColor" />
                  <rect x="19" y="9" width="3" height="6" rx="1" fill="currentColor" />
                  <rect x="7" y="11" width="10" height="2" rx="1" fill="currentColor" />
                  <rect x="5" y="7" width="2" height="10" rx="1" fill="currentColor" />
                  <rect x="17" y="7" width="2" height="10" rx="1" fill="currentColor" />
                </svg>
              </span>
            </div>

            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center tracking-tight drop-shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 bg-clip-text text-transparent bg-size-200 animate-gradient-move">
              Iniciar sesión
            </h2>

            <p className="text-indigo-700 mb-8 text-center animate-fade-in-slow relative">
              Ingresa para llevar el control de tu progreso fitness.
              <span
                className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600 rounded-full opacity-70 animate-underline-slide"
                style={{ transform: "translateX(-50%)" }}
              />
            </p>

            <LoginForm />

            <p className="mt-8 text-center text-gray-500 text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-indigo-700 hover:underline font-semibold">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}