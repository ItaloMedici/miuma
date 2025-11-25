"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useOnboarding } from "../context";

interface FooterNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FooterNavigation({
  onPrevious,
  onNext,
  onSubmit,
}: FooterNavigationProps) {
  const { isFirstStep, isLastStep } = useOnboarding();

  return (
    <div className="fixed md:relative bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:px-12 flex justify-between items-center z-30">
      {!isFirstStep ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      ) : (
        <div />
      )}

      <div className="ml-auto">
        {!isLastStep ? (
          <Button type="button" onClick={onNext} className="gap-2 group">
            <span>Continuar</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <span>Salvar Perfil</span>
            <Check className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
