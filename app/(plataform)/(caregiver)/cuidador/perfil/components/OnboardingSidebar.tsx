"use client";

import Image from "next/image";
import { useOnboarding } from "../context";

export function OnboardingSidebar() {
  const { currentStep, setCurrentStep, steps, isStepCompleted } =
    useOnboarding();

  return (
    <div className="hidden md:flex w-64 lg:w-72 bg-background border-r border-border flex-col h-screen sticky top-0 z-40">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-2 text-primary mb-8">
          <Image
            src="/logo-horizontal.svg"
            alt="Miuma"
            width={100}
            height={35}
          />
        </div>

        {/* Step indicators - now interactive */}
        <div className="space-y-1">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = isStepCompleted(step.id);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-stone-900 bg-stone-50"
                    : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors shrink-0 ${
                    isActive
                      ? "bg-stone-900 text-white"
                      : isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "border border-stone-200 text-stone-400"
                  }`}
                >
                  {step.number}
                </div>
                <span className="text-left leading-tight">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
