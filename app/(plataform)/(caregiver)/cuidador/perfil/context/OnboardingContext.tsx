"use client";

import { CaregiverEntity } from "@/db/schema";
import { User } from "better-auth";
import React, { createContext, useContext, useState } from "react";
import {
  ONBOARDING_STEPS,
  OnboardingStepEnum,
  TOTAL_STEPS,
} from "../constants";

interface OnboardingContextValue {
  currentStep: OnboardingStepEnum;
  setCurrentStep: (step: OnboardingStepEnum) => void;
  currentStepNumber: number;
  totalSteps: number;
  steps: Array<{
    id: OnboardingStepEnum;
    number: number;
    label: string;
  }>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  completedSteps: Set<OnboardingStepEnum>;
  markStepAsCompleted: (step: OnboardingStepEnum) => void;
  isStepCompleted: (step: OnboardingStepEnum) => boolean;
  setCompletedSteps: (steps: Set<OnboardingStepEnum>) => void;
  isEditMode: boolean;
  inititalCaregiver?: CaregiverEntity;
  user: User;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

interface OnboardingProviderProps {
  children: React.ReactNode;
  initialStep?: OnboardingStepEnum;
  caregiver?: CaregiverEntity;
  user: User;
}

export function OnboardingProvider({
  children,
  initialStep = OnboardingStepEnum.PROFILE_ESSENTIALS,
  caregiver,
  user,
}: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] =
    useState<OnboardingStepEnum>(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<OnboardingStepEnum>>(
    new Set()
  );

  const getCurrentStepNumber = () => {
    return (
      ONBOARDING_STEPS.find((step) => step.id === currentStep)?.number || 1
    );
  };

  const goToNextStep = () => {
    const currentNumber = getCurrentStepNumber();
    if (currentNumber < TOTAL_STEPS) {
      const nextStep = ONBOARDING_STEPS.find(
        (step) => step.number === currentNumber + 1
      );
      if (nextStep) {
        setCurrentStep(nextStep.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const goToPreviousStep = () => {
    const currentNumber = getCurrentStepNumber();
    if (currentNumber > 1) {
      const prevStep = ONBOARDING_STEPS.find(
        (step) => step.number === currentNumber - 1
      );
      if (prevStep) {
        setCurrentStep(prevStep.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const markStepAsCompleted = (step: OnboardingStepEnum) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  };

  const isStepCompleted = (step: OnboardingStepEnum) => {
    return completedSteps.has(step);
  };

  const value: OnboardingContextValue = {
    currentStep,
    setCurrentStep,
    currentStepNumber: getCurrentStepNumber(),
    totalSteps: TOTAL_STEPS,
    steps: ONBOARDING_STEPS,
    goToNextStep,
    goToPreviousStep,
    isFirstStep: getCurrentStepNumber() === 1,
    isLastStep: getCurrentStepNumber() === TOTAL_STEPS,
    completedSteps,
    markStepAsCompleted,
    isStepCompleted,
    setCompletedSteps: (steps: Set<OnboardingStepEnum>) =>
      setCompletedSteps(steps),
    isEditMode: Boolean(caregiver?.id),
    inititalCaregiver: caregiver,
    user,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
