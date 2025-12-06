/**
 * Form Utilities - Type-safe helpers for working with onboarding forms
 *
 * This file provides utilities that leverage the single source of truth
 * (OnboardingStepEnum) to ensure type safety across the application.
 *
 * If you rename a step in OnboardingStepEnum, TypeScript will enforce
 * updates everywhere these utilities are used.
 */

import { UseFormReturn } from "react-hook-form";
import { OnboardingStepEnum } from "./constants";
import {
  STEP_SCHEMA_MAP,
  type OnboardingFormsMap,
  type StepFormDataMap,
  type StepToFormKey,
} from "./schemas";

export function getStepSchema<T extends OnboardingStepEnum>(step: T) {
  return STEP_SCHEMA_MAP[step];
}

export function stepToFormKey<T extends OnboardingStepEnum>(
  step: T
): StepToFormKey<T> {
  const mapping: Record<
    OnboardingStepEnum,
    StepToFormKey<OnboardingStepEnum>
  > = {
    [OnboardingStepEnum.PROFILE_ESSENTIALS]: "profileEssentials",
    [OnboardingStepEnum.STORY]: "story",
    [OnboardingStepEnum.SOCIAL_MEDIA]: "socialMedia",
    [OnboardingStepEnum.LOCATION]: "location",
    [OnboardingStepEnum.GALLERY]: "gallery",
    [OnboardingStepEnum.PETS_IN_CARE]: "petsInCare",
    [OnboardingStepEnum.BILLING_AND_EXPENSES]: "billingAndExpenses",
  };

  return mapping[step] as StepToFormKey<T>;
}

/**
 * Get a specific form from the forms object using type-safe step enum
 * @example
 * const form = getFormForStep(forms, OnboardingStepEnum.PROFILE_ESSENTIALS);
 * // form is typed as UseFormReturn<ProfileEssentialsFormData>
 */
export function getFormForStep<T extends OnboardingStepEnum>(
  forms: {
    [K in keyof OnboardingFormsMap]: UseFormReturn<OnboardingFormsMap[K]>;
  },
  step: T
): UseFormReturn<StepFormDataMap[T]> {
  const key = stepToFormKey(step);
  return forms[key] as UseFormReturn<StepFormDataMap[T]>;
}

export function validateOnboardingSteps(): void {
  const requiredSteps: OnboardingStepEnum[] = [
    OnboardingStepEnum.PROFILE_ESSENTIALS,
    OnboardingStepEnum.STORY,
    OnboardingStepEnum.SOCIAL_MEDIA,
    OnboardingStepEnum.LOCATION,
    OnboardingStepEnum.GALLERY,
    OnboardingStepEnum.PETS_IN_CARE,
    OnboardingStepEnum.BILLING_AND_EXPENSES,
  ];

  requiredSteps.forEach((step) => {
    const key = stepToFormKey(step);
    const schema = getStepSchema(step);
    if (!key || !schema) {
      throw new Error(`Missing mapping for step: ${step}`);
    }
  });
}

export function isValidFormKey(key: string): key is keyof OnboardingFormsMap {
  const validKeys: (keyof OnboardingFormsMap)[] = [
    "profileEssentials",
    "story",
    "socialMedia",
    "location",
    "gallery",
    "petsInCare",
    "billingAndExpenses",
  ];
  return validKeys.includes(key as keyof OnboardingFormsMap);
}

export function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}
