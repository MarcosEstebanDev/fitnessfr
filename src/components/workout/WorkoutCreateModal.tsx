"use client";
import Modal from "../ui/Modal";
import WorkoutForm from "./WorkoutForm";
import type { WorkoutRecord } from "../../types/workout";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (input: Omit<WorkoutRecord, "id" | "createdAt">) => void;
};

export default function WorkoutCreateModal({ open, onClose, onSave }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Nuevo entrenamiento" size="lg">
      <WorkoutForm onSave={onSave} onCancel={onClose} bare />
    </Modal>
  );
}