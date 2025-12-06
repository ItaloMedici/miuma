"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { UseFormReturn } from "react-hook-form";
import { formStorage, LAST_SAVED_KEY, STORAGE_KEY } from "../form-storage";
import type { OnboardingFormsMap } from "../schemas";

export type OnboardingForms = {
  [K in keyof OnboardingFormsMap]: UseFormReturn<OnboardingFormsMap[K]>;
};

type FormBackup = Partial<OnboardingFormsMap> & {
  completedSteps?: string[];
};

interface UseFormPersistenceParams {
  forms: OnboardingForms;
  completedSteps: Set<string>;
  setCompletedSteps: (steps: Set<any>) => void;
}

export function useFormPersistence({
  forms,
  completedSteps,
  setCompletedSteps,
}: UseFormPersistenceParams) {
  const lastSaved = useSyncExternalStore(
    formStorage.subscribe,
    formStorage.getLastSaved,
    () => null
  );

  const hasUnsavedChanges = useSyncExternalStore(
    formStorage.subscribe,
    formStorage.getHasUnsavedChanges,
    () => false
  );

  const saveBackup = useCallback((data: FormBackup) => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const now = new Date();
      formStorage.setLastSaved(now);
      formStorage.setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving form backup:", error);
    }
  }, []);

  const clearBackup = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.removeItem(STORAGE_KEY);
      formStorage.setLastSaved(null);
      formStorage.setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error clearing form backup:", error);
    }
  }, []);

  const markAsChanged = useCallback(() => {
    console.log(
      "📝 FormPersistence: Mudança detectada - marcando como não salvo"
    );
    formStorage.setHasUnsavedChanges(true);
  }, []);

  const hasBackup = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  }, []);

  const handleManualSave = useCallback(() => {
    const data: FormBackup = {
      profileEssentials: forms.profileEssentials.getValues(),
      story: forms.story.getValues(),
      socialMedia: forms.socialMedia.getValues(),
      location: forms.location.getValues(),
      gallery: forms.gallery.getValues(),
      petsInCare: forms.petsInCare.getValues(),
      billingAndExpenses: forms.billingAndExpenses.getValues(),
      completedSteps: Array.from(completedSteps),
    };
    saveBackup(data);
  }, [forms, completedSteps, saveBackup]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const backup = sessionStorage.getItem(STORAGE_KEY);
      const lastSavedStr = sessionStorage.getItem(LAST_SAVED_KEY);

      if (!backup) return;

      const parsedBackup: FormBackup = JSON.parse(backup);

      if (lastSavedStr) {
        formStorage.setLastSaved(new Date(lastSavedStr));
      }

      if (parsedBackup.profileEssentials) {
        forms.profileEssentials.reset(parsedBackup.profileEssentials);
      }

      if (parsedBackup.story) {
        forms.story.reset(parsedBackup.story);
      }

      if (parsedBackup.socialMedia) {
        forms.socialMedia.reset(parsedBackup.socialMedia);
      }

      if (parsedBackup.location) {
        forms.location.reset(parsedBackup.location);
      }

      if (parsedBackup.gallery) {
        forms.gallery.reset(parsedBackup.gallery);
      }

      if (parsedBackup.petsInCare) {
        forms.petsInCare.reset(parsedBackup.petsInCare);
      }

      if (parsedBackup.billingAndExpenses) {
        forms.billingAndExpenses.reset(parsedBackup.billingAndExpenses);
      }

      if (
        parsedBackup.completedSteps &&
        Array.isArray(parsedBackup.completedSteps)
      ) {
        setCompletedSteps(new Set(parsedBackup.completedSteps));
      }
    } catch (error) {
      console.error("Error loading form backup:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      console.log("Auto-saving form backup...");

      const data: FormBackup = {
        profileEssentials: forms.profileEssentials.getValues(),
        story: forms.story.getValues(),
        socialMedia: forms.socialMedia.getValues(),
        location: forms.location.getValues(),
        gallery: forms.gallery.getValues(),
        petsInCare: forms.petsInCare.getValues(),
        billingAndExpenses: forms.billingAndExpenses.getValues(),
        completedSteps: Array.from(completedSteps),
      };

      saveBackup(data);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [forms, completedSteps, saveBackup]);

  // Watch for form changes
  useEffect(() => {
    const subscriptions = [
      forms.profileEssentials.watch(() => markAsChanged()),
      forms.story.watch(() => markAsChanged()),
      forms.socialMedia.watch(() => markAsChanged()),
      forms.location.watch(() => markAsChanged()),
      forms.gallery.watch(() => markAsChanged()),
      forms.petsInCare.watch(() => markAsChanged()),
      forms.billingAndExpenses.watch(() => markAsChanged()),
    ];

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe.unsubscribe());
    };
  }, [forms, markAsChanged]);

  return {
    saveBackup: handleManualSave,
    clearBackup,
    hasBackup,
    hasUnsavedChanges,
    lastSaved,
  };
}
