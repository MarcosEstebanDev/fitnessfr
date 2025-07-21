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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <div className="container mx-auto flex flex-col items-center justify-center py-12 px-4">
        <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
          {/* Card principal */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center px-8 py-12">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg p-3 border border-blue-100">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                alt="Logo Fitness"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h2 className="text-3xl font-extrabold mt-10 mb-2 text-blue-700 text-center tracking-tight drop-shadow">
              Crear cuenta
            </h2>
            <p className="text-gray-500 mb-8 text-center">
              Únete y lleva tu progreso fitness al siguiente nivel.
            </p>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {error && (
                <div className="mb-2 text-red-500 text-sm text-center">{error}</div>
              )}
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50/50 transition placeholder:text-gray-400"
                autoComplete="off"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 hover:scale-105"
              >
                Registrarse
              </button>
            </form>
            <p className="mt-8 text-center text-gray-500 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}