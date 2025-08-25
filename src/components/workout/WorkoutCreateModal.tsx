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
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-rose-700 font-bold text-xl">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="9" width="3" height="6" rx="1" fill="currentColor" />
            <rect x="19" y="9" width="3" height="6" rx="1" fill="currentColor" />
            <rect x="7" y="11" width="10" height="2" rx="1" fill="currentColor" />
            <rect x="5" y="7" width="2" height="10" rx="1" fill="currentColor" />
            <rect x="17" y="7" width="2" height="10" rx="1" fill="currentColor" />
          </svg>
          Nuevo entrenamiento
        </span>
      }
      size="lg"
      closeOnBackdrop={false}
    >
      <div className="p-2 md:p-4">
        <WorkoutForm
          onSave={(data) => {
            const { title, routines, notes } = data;
            onSave({
              title: title ?? "",
              routines: routines ?? [],
              notes: notes ?? "",
            });
          }}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
}