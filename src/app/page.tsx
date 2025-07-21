import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-14 flex flex-col items-center transition-transform duration-300 hover:scale-[1.025] hover:shadow-3xl">
        <div className="relative mb-8">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="Fitness Motivation"
            width={140}
            height={140}
            className="rounded-full shadow-xl border-4 border-blue-100"
            priority
          />
          <span className="absolute bottom-2 right-2 bg-blue-500 w-5 h-5 rounded-full border-2 border-white animate-pulse"></span>
        </div>
        <h1 className="text-4xl font-black mb-3 text-blue-700 text-center tracking-tight drop-shadow-lg font-sans">
          Bienvenido a tu Fitness App
        </h1>
        <p className="text-lg text-gray-600 mb-7 text-center font-medium">
          Registra tus entrenamientos, sigue tu progreso y mantente motivado con una experiencia premium.
        </p>
        <ul className="mb-10 text-gray-600 text-base space-y-2 text-left w-full max-w-sm mx-auto font-medium">
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">✔️</span> Rutinas personalizadas
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">✔️</span> Seguimiento de progreso
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">✔️</span> Comunidad y motivación
          </li>
        </ul>
        <Link
          href="/register"
          className="w-full block text-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl font-extrabold shadow-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-200 hover:scale-105 text-lg tracking-wide"
        >
          Comenzar ahora
        </Link>
        <nav className="mt-10 flex justify-center gap-6 text-base font-semibold">
          <Link href="/login" className="text-blue-600 hover:underline transition">
            Iniciar sesión
          </Link>
          <Link href="/workout" className="text-gray-700 hover:text-blue-600 transition">
            Workout
          </Link>
          <Link href="/progress" className="text-gray-700 hover:text-blue-600 transition">
            Progress
          </Link>
        </nav>
      </div>
    </main>
  );
}