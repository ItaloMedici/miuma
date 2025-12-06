"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{ label: string; number: number }>;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({
  currentStep,
  steps,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="space-y-1">
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <button
            key={step.number}
            type="button"
            onClick={() => onStepClick?.(step.number)}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-stone-50 text-stone-900"
                : "text-stone-500 hover:bg-stone-50"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] transition-colors",
                isActive
                  ? "bg-stone-900 text-white"
                  : isCompleted
                    ? "bg-primary text-primary-foreground"
                    : "border border-stone-200 text-stone-400 group-hover:border-stone-300"
              )}
            >
              {step.number}
            </div>
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}
