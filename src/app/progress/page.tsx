"use client";
import HeroBackground from "../../components/HeroBackground";

export default function ProgressPage() {
  return (
    <main className="relative min-h-[calc(100dvh-64px)] pt-8 px-4 md:px-6 flex items-start justify-center">
      <HeroBackground src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80" />
      <div className="w-[min(1260px,95vw)]">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-500 via-red-500 to-rose-700 bg-clip-text text-transparent">
            Progreso
          </h1>
          <span className="text-sm md:text-base font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
            Vista general
          </span>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
            <h3 className="text-sm font-bold text-rose-700 mb-2">Volumen semanal</h3>
            <p className="text-3xl font-extrabold text-gray-900">12.4k kg</p>
            <p className="text-xs text-gray-500">+8% vs semana pasada</p>
          </div>
          <div className="bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
            <h3 className="text-sm font-bold text-rose-700 mb-2">Sesiones este mes</h3>
            <p className="text-3xl font-extrabold text-gray-900">14</p>
            <p className="text-xs text-gray-500">Objetivo: 20</p>
          </div>
          <div className="bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
            <h3 className="text-sm font-bold text-rose-700 mb-2">PRs recientes</h3>
            <ul className="text-sm text-gray-800 list-disc pl-4">
              <li>Sentadilla 1RM: 140 kg</li>
              <li>Banco 1RM: 95 kg</li>
              <li>DL 1RM: 180 kg</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Tendencia de peso corporal</h3>
              <span className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">Últimos 30 días</span>
            </div>
            <div className="h-52 rounded-xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 flex items-center justify-center text-rose-600">
              Gráfico (placeholder)
            </div>
          </div>

          <div className="bg-white/95 border border-rose-100 rounded-2xl p-5 shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Volumen por grupo muscular</h3>
              <span className="text-xs text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-lg">Últimas 4 semanas</span>
            </div>
            <div className="h-52 rounded-xl bg-gradient-to-b from-rose-50 to-white border border-rose-100 flex items-center justify-center text-rose-600">
              Gráfico (placeholder)
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}