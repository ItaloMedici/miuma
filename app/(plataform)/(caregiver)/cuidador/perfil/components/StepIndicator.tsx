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
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
              isActive
                ? "text-stone-900 bg-stone-50"
                : "text-stone-500 hover:bg-stone-50"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors",
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
