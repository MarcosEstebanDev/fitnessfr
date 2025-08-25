"use client";
import { motion } from "framer-motion";
import { BackgroundByRoute } from "@/components/layout/BackgroundByRoute";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <BackgroundByRoute />
      <motion.main
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full flex items-center justify-center px-2 md:px-6 overflow-auto"
      >
        <div className="mx-auto w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px] bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-rose-200 p-3 md:p-4 flex flex-col gap-4 my-2">
          {/* Icono de mancuernas */}
          <div className="flex justify-center items-center mt-4 mb-1">
            <span className="bg-rose-100 text-rose-600 rounded-full p-4 shadow-lg animate-bounce-slow">
              {/* Ícono de mancuernas SVG */}
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                <rect
                  x="2"
                  y="9"
                  width="3"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="19"
                  y="9"
                  width="3"
                  height="6"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="7"
                  y="11"
                  width="10"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="5"
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="17"
                  y="7"
                  width="2"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>
          {/* Contenido principal */}
          <div className="flex flex-col items-center px-2 py-4 w-full">
            <span className="uppercase tracking-widest text-xs text-rose-600 font-bold mb-3 animate-fade-in">
              FitApp
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 text-center tracking-tight drop-shadow-lg font-sans bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent animate-gradient-move">
              Tu progreso,{" "}
              <span className="text-rose-700">tu mejor versión</span>
            </h1>
            <h2 className="text-lg md:text-xl font-semibold mb-6 text-rose-700 text-center relative animate-fade-in-slow">
              <span className="relative z-10">
                Registra tus entrenamientos, controla tu avance y alcanza tus
                objetivos fitness.
              </span>
              <span
                className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-rose-400 via-red-400 to-rose-600 rounded-full opacity-70 animate-underline-slide"
                style={{ transform: "translateX(-50%)" }}
              />
            </h2>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl">
              {/* Rutinas personalizadas */}
              <div className="flex flex-col items-center bg-white/95 border border-rose-100 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition hover:-translate-y-2 hover:bg-rose-50/70 duration-200 group">
                <span className="bg-rose-100 text-rose-600 rounded-full p-3 mb-2 shadow-lg group-hover:bg-rose-200 transition">
                  {/* Icono calendario */}
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="3"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 3v4M8 3v4M3 9h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-center font-semibold text-gray-800 text-sm">
                  Rutinas personalizadas y seguimiento digital
                </span>
              </div>
              {/* Progreso y métricas */}
              <div className="flex flex-col items-center bg-white/95 border border-rose-100 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition hover:-translate-y-2 hover:bg-rose-50/70 duration-200 group">
                <span className="bg-rose-100 text-rose-600 rounded-full p-3 mb-2 shadow-lg group-hover:bg-rose-200 transition">
                  {/* Icono gráfico de barras */}
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <rect
                      x="4"
                      y="13"
                      width="3"
                      height="7"
                      rx="1.5"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <rect
                      x="10.5"
                      y="9"
                      width="3"
                      height="11"
                      rx="1.5"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <rect
                      x="17"
                      y="5"
                      width="3"
                      height="15"
                      rx="1.5"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <rect
                      x="4"
                      y="13"
                      width="3"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="10.5"
                      y="9"
                      width="3"
                      height="11"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="17"
                      y="5"
                      width="3"
                      height="15"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <span className="text-center font-semibold text-gray-800 text-sm">
                  Progreso y métricas en tiempo real
                </span>
              </div>
              {/* Comunidad y motivación */}
              <div className="flex flex-col items-center bg-white/95 border border-rose-100 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition hover:-translate-y-2 hover:bg-rose-50/70 duration-200 group">
                <span className="bg-rose-100 text-rose-600 rounded-full p-3 mb-2 shadow-lg group-hover:bg-rose-200 transition">
                  {/* Icono comunidad */}
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <span className="text-center font-semibold text-gray-800 text-sm">
                  Comunidad, motivación y soporte profesional
                </span>
              </div>
            </div>
            <Link
              href="/register"
              className="w-full block text-center px-6 py-3 bg-gradient-to-r from-rose-500 to-red-700 text-white rounded-2xl font-extrabold shadow-xl hover:from-rose-600 hover:to-red-800 transition-all duration-200 hover:scale-105 text-lg tracking-wide mb-4"
            >
              ¡Empieza ahora!
            </Link>
            <nav className="mt-2 flex justify-center gap-6 text-base font-semibold opacity-90">
              <Link
                href="/login"
                className="text-rose-700 hover:underline transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/workout"
                className="text-gray-700 hover:text-rose-700 transition"
              >
                Workout
              </Link>
              <Link
                href="/progress"
                className="text-gray-700 hover:text-rose-700 transition"
              >
                Progreso
              </Link>
            </nav>
          </div>
        </div>
        {/* Animaciones personalizadas — movidas a styles/global.css */}
      </motion.main>
    </>
  );
}