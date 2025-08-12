"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { RegisterForm as RegisterFormData } from "../../interfaces/register";

export const RegisterForm = () => {
  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Completa todos los campos.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    alert("Usuario registrado.");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 animate-fade-in">
      {error && <div className="mb-2 text-red-500 text-sm text-center">{error}</div>}
      <Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <Input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} />
      <Input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirmar contraseña"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      <Button type="submit">Crear cuenta</Button>
    </form>
  );
};