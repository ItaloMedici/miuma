"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

const STORAGE_KEY = "onboarding_form_backup";
const LAST_SAVED_KEY = "onboarding_last_saved";

interface FormBackup {
  profileEssentials?: unknown;
  storyAndSocial?: unknown;
  locationAndMedia?: unknown;
  petsInCare?: unknown;
  billingAndExpenses?: unknown;
  completedSteps?: string[];
}

export function useFormPersistence() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load backup from session storage
  const loadBackup = (): FormBackup | null => {
    if (typeof window === "undefined") return null;

    try {
      const backup = sessionStorage.getItem(STORAGE_KEY);
      const lastSavedStr = sessionStorage.getItem(LAST_SAVED_KEY);

      if (backup) {
        if (lastSavedStr) {
          setLastSaved(new Date(lastSavedStr));
        }
        return JSON.parse(backup);
      }
    } catch (error) {
      console.error("Error loading form backup:", error);
    }

    return null;
  };

  // Save backup to session storage
  const saveBackup = (data: FormBackup) => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const now = new Date();
      sessionStorage.setItem(LAST_SAVED_KEY, now.toISOString());
      setLastSaved(now);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving form backup:", error);
    }
  };

  // Clear backup from session storage
  const clearBackup = () => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(LAST_SAVED_KEY);
      setLastSaved(null);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error clearing form backup:", error);
    }
  };

  // Auto-save functionality
  const setupAutoSave = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forms: Record<string, UseFormReturn<any>>,
    completedSteps: Set<string>
  ) => {
    const saveInterval = setInterval(() => {
      const data: FormBackup = {
        profileEssentials: forms.profileEssentials?.getValues(),
        storyAndSocial: forms.storyAndSocial?.getValues(),
        locationAndMedia: forms.locationAndMedia?.getValues(),
        petsInCare: forms.petsInCare?.getValues(),
        billingAndExpenses: forms.billingAndExpenses?.getValues(),
        completedSteps: Array.from(completedSteps),
      };

      saveBackup(data);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  };

  // Mark as having unsaved changes
  const markAsChanged = () => {
    setHasUnsavedChanges(true);
  };

  // Check if backup exists
  const hasBackup = (): boolean => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  };

  return {
    loadBackup,
    saveBackup,
    clearBackup,
    setupAutoSave,
    markAsChanged,
    hasBackup,
    hasUnsavedChanges,
    lastSaved,
  };
}
