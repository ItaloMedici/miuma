"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useOnboarding } from "../context";

export function MobileHeader() {
  const {
    currentStep,
    totalSteps,
    steps,
    setCurrentStep,
    currentStepNumber,
    isStepCompleted,
  } = useOnboarding();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-background border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-primary">
            <Image
              src="/logo-horizontal.svg"
              alt="Miuma"
              width={80}
              height={30}
            />
          </div>
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Passo {currentStepNumber} de {totalSteps}
        </div>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Etapas do Cadastro</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-1">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = isStepCompleted(step.id);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setCurrentStep(step.id);
                    setDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-stone-900 bg-stone-50"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors shrink-0 ${
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
