"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Completa todos los campos.");
      return;
    }
    setError("");
    alert("¡Registro exitoso!");
  };

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
          <div className="relative bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-indigo-200 flex flex-col items-center px-12 py-16 overflow-hidden min-h-[720px]">
            {/* Ícono de mancuernas igual que en home */}
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
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center tracking-tight drop-shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 bg-clip-text text-transparent animate-gradient-move">
              Crear cuenta
            </h2>
            <p className="text-indigo-700 mb-8 text-center animate-fade-in-slow relative">
              Únete y lleva tu progreso fitness al siguiente nivel.
              <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600 rounded-full opacity-70 animate-underline-slide" style={{ transform: "translateX(-50%)" }} />
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-in">
              {error && (
                <div className="mb-2 text-red-500 text-sm text-center">{error}</div>
              )}
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-blue-800 transition-all duration-200 hover:scale-105"
              >
                Registrarse
              </button>
            </form>
            <p className="mt-8 text-center text-gray-500 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-indigo-700 hover:underline font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Animaciones personalizadas */}
      <style jsx>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s ease-in-out infinite;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease;
        }
        .animate-fade-in-slow {
          animation: fadeIn 2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        .animate-underline-slide {
          animation: underlineSlide 1.2s cubic-bezier(.4,0,.2,1);
        }
        @keyframes underlineSlide {
          from { width: 0; opacity: 0; }
          to { width: 66%; opacity: 0.7; }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.2s infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
      `}</style>
    </main>
  );
}