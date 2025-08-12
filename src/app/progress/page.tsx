"use client";
import { useState, useEffect } from "react";
import { PageBackground } from "../../components/layout/PageBackground";
import { PageHeader } from "../../components/layout/PageHeader";
import { Card } from "../../components/ui/Card";
import { ProgressForm } from "../../components/forms/ProgressForm";
import { progressTypes } from "../../constants/progressTypes";
import { MetricControls } from "../../components/progress/MetricControls";
import { MetricChart } from "../../components/progress/MetricChart";

type Props = {
  image: string;
};

export default function ProgressPage() {
  const [selectedType, setSelectedType] = useState(progressTypes[0].key);
  const currentMetric = progressTypes.find(m => m.key === selectedType)!;
  const [meta, setMeta] = useState(currentMetric.config.meta);

  // Sync meta al cambiar de tipo
  useEffect(() => {
    setMeta(currentMetric.config.meta);
  }, [currentMetric]);

  return (
    <main className="relative min-h-screen flex items-start justify-center pt-20 pb-24">
      <PageBackground
        image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80"
      />
      <div className="w-full max-w-5xl mx-auto px-4 space-y-10">
        <PageHeader title="Progreso" subtitle="Registra y visualiza tus métricas." />

        <Card translucent>
          <h2 className="text-xl font-semibold text-indigo-700 mb-6">Métricas</h2>
          <MetricControls
            metrics={progressTypes}
            selected={selectedType}
            onChange={setSelectedType}
            meta={meta}
            onMetaChange={setMeta}
          />
          <div className="mt-8">
            <MetricChart metric={currentMetric} meta={meta} />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Nuevo registro</h2>
            <ProgressForm />
          </Card>
          <Card translucent>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Historial (demo)</h2>
            <p className="text-sm text-indigo-800">
              Aquí consumirás progressService.list() y podrás combinarlo con las métricas seleccionadas.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}