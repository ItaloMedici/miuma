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
      <div className="bg-background border-border sticky top-0 z-50 flex items-center justify-between border-b p-4 md:hidden">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-primary flex items-center gap-2">
            <Image
              src="/logo-horizontal.svg"
              alt="Miuma"
              width={80}
              height={30}
            />
          </div>
        </div>
        <div className="text-muted-foreground text-xs font-medium">
          Passo {currentStepNumber} de {totalSteps}
        </div>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Etapas do Cadastro</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-1 p-4 pb-6">
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
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-stone-50 text-stone-900"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
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
