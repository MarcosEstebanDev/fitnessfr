"use client";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "../../components/forms/RegisterForm";

export default function Register() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80"
          alt="Fondo gym"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-indigo-800/70 to-blue-700/80" />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="grid grid-cols-1 gap-8 w-full max-w-3xl">
          <div className="relative bg-white/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-indigo-200 flex flex-col items-center px-12 py-16 overflow-hidden min-h-[560px]">
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 text-center tracking-tight drop-shadow bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 bg-clip-text text-transparent bg-size-200 animate-gradient-move">
              Crear cuenta
            </h2>
            <p className="text-indigo-700 mb-8 text-center animate-fade-in-slow">
              Empieza a registrar tu progreso.
            </p>
            <RegisterForm />
            <p className="mt-8 text-center text-gray-500 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-indigo-700 hover:underline font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}