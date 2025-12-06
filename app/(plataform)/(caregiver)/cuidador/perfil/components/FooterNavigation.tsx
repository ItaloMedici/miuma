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
    <div className="bg-background border-border fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between border-t p-4 md:relative md:px-12">
      {!isFirstStep ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      ) : (
        <div />
      )}

      <div className="ml-auto">
        {!isLastStep ? (
          <Button type="button" onClick={onNext} className="group gap-2">
            <span>Continuar</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <span>Salvar Perfil</span>
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
