"use client";

import Image from "next/image";
import { useOnboarding } from "../context";

export function OnboardingSidebar() {
  const { currentStep, setCurrentStep, steps, isStepCompleted } =
    useOnboarding();

  return (
    <div className="bg-background border-border sticky top-0 z-40 hidden h-screen w-64 flex-col border-r md:flex lg:w-72">
      <div className="p-8 pb-4">
        <div className="text-primary mb-8 flex items-center gap-2">
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
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-stone-50 text-stone-900"
                    : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
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
