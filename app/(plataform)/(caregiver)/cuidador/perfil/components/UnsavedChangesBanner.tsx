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
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-900">
              Você tem alterações não salvas
            </p>
            <p className="text-xs text-amber-700">
              Último salvamento: {formatLastSaved(lastSaved)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSave}
            className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
          >
            Salvar agora
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-600 hover:text-amber-900 transition-colors"
            aria-label="Dispensar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
