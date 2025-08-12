"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { LoginForm as LoginFormData } from "../../interfaces/auth";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onSuccess?: (data: LoginFormData) => void;
}

export const LoginForm = ({ onSuccess }: Props) => {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Completa todos los campos.");
      return;
    }
    setError("");
    try {
      await login(form);
      onSuccess?.(form);
    } catch (err: any) {
      setError(err?.message || "Error al iniciar sesión");
    }
  };

  // Redirige si ya está autenticado (no mostrar formulario en ese caso)
  useEffect(() => {
    if (!loading && user) router.replace("/progress");
  }, [loading, user, router]);

  if (loading) return null;
  if (user) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-in">
      {error && <div className="mb-2 text-red-500 text-sm text-center">{error}</div>}
      <Input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button type="submit">Iniciar sesión</Button>
    </form>
  );
};