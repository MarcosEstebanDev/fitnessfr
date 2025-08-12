"use client";
import Image from "next/image";
import { WorkoutForm } from "../../components/forms/WorkoutForm";

export default function WorkoutsPage() {
  return (
    <main className="relative min-h-screen flex items-start justify-center pt-16 pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=80"
          alt="Workouts"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-indigo-800/60 to-blue-700/70" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 space-y-10">
        <header className="text-center mt-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent bg-size-200 animate-gradient-move">
            Workouts
          </h1>
          <p className="text-indigo-100 mt-2">Crea y registra tus entrenamientos.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/50 backdrop-blur-xl border border-indigo-200 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Nuevo workout</h2>
            <WorkoutForm />
          </div>
          <div className="bg-white/40 backdrop-blur-xl border border-indigo-200 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Historial (demo)</h2>
            <p className="text-sm text-indigo-800">
              Aquí listarás los workouts desde la API. Integra workoutService.list().
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}