"use client";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { ProgressEntry } from "../../interfaces/progress";

interface Props {
  onSubmit?: (data: ProgressEntry) => void;
}

export const ProgressForm = ({ onSubmit }: Props) => {
  const [entry, setEntry] = useState<ProgressEntry>({
    date: new Date().toISOString().slice(0, 10),
    weight: undefined,
    bodyFat: undefined,
    muscleMass: undefined,
    notes: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(entry);
    alert("Progreso guardado (demo).");
  };

  return (
    <form onSubmit={submit} className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <Input
          label="Fecha"
          type="date"
          value={entry.date}
          className="w-full"
          onChange={e => setEntry(v => ({ ...v, date: e.target.value }))}
        />
        <Input
          label="Peso (kg)"
          type="number"
          value={entry.weight ?? ""}
          className="w-full"
          onChange={e => setEntry(v => ({ ...v, weight: e.target.value ? Number(e.target.value) : undefined }))}
        />
        <Input
          label="% Grasa"
          type="number"
          value={entry.bodyFat ?? ""}
          className="w-full"
          onChange={e => setEntry(v => ({ ...v, bodyFat: e.target.value ? Number(e.target.value) : undefined }))}
        />
        <Input
          label="Músculo (kg)"
          type="number"
          value={entry.muscleMass ?? ""}
          className="w-full"
          onChange={e => setEntry(v => ({ ...v, muscleMass: e.target.value ? Number(e.target.value) : undefined }))}
        />
      </div>
      <Input
        label="Notas"
        value={entry.notes}
        onChange={e => setEntry(v => ({ ...v, notes: e.target.value }))}
        placeholder="Energía, sueño, etc."
      />
      <Button type="submit">Guardar progreso</Button>
    </form>
  );
};