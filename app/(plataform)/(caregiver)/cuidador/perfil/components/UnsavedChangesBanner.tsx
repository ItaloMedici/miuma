"use client";

import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface UnsavedChangesBannerProps {
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  onSave: () => void;
}

export function UnsavedChangesBanner({
  hasUnsavedChanges,
  lastSaved,
  onSave,
}: UnsavedChangesBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!hasUnsavedChanges || dismissed) {
    return null;
  }

  const formatLastSaved = (date: Date | null) => {
    if (!date) return "nunca";

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "agora";
    if (minutes === 1) return "1 minuto atrás";
    if (minutes < 60) return `${minutes} minutos atrás`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hora atrás";
    return `${hours} horas atrás`;
  };

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-amber-900">
              Você tem alterações não salvas
            </p>
            <p className="text-xs text-amber-700">
              Último salvamento: {formatLastSaved(lastSaved)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onSave}
            className="rounded-md bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-200"
          >
            Salvar agora
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-600 transition-colors hover:text-amber-900"
            aria-label="Dispensar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
