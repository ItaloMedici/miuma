export const STORAGE_KEY = "onboarding_form_backup";
export const LAST_SAVED_KEY = "onboarding_last_saved";
export const UNSAVED_CHANGES_KEY = "onboarding_unsaved_changes";

class FormStorage {
  private listeners = new Set<() => void>();
  private lastSavedCache: Date | null = null;
  private lastSavedStrCache: string | null = null;
  private hasUnsavedChangesCache: boolean = false;
  private hasUnsavedChangesValueCache: string | null = null;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  notify = () => {
    this.listeners.forEach((listener) => listener());
  };

  getLastSaved = (): Date | null => {
    if (typeof window === "undefined") return null;
    const lastSavedStr = sessionStorage.getItem(LAST_SAVED_KEY);

    if (lastSavedStr === this.lastSavedStrCache) {
      return this.lastSavedCache;
    }

    // Update cache
    this.lastSavedStrCache = lastSavedStr;
    this.lastSavedCache = lastSavedStr ? new Date(lastSavedStr) : null;
    return this.lastSavedCache;
  };

  getHasUnsavedChanges = (): boolean => {
    if (typeof window === "undefined") return false;
    const value = sessionStorage.getItem(UNSAVED_CHANGES_KEY);

    if (value === this.hasUnsavedChangesValueCache) {
      return this.hasUnsavedChangesCache;
    }

    // Update cache
    this.hasUnsavedChangesValueCache = value;
    this.hasUnsavedChangesCache = value === "true";
    return this.hasUnsavedChangesCache;
  };

  setLastSaved = (date: Date | null) => {
    if (typeof window === "undefined") return;
    if (date) {
      const isoString = date.toISOString();
      sessionStorage.setItem(LAST_SAVED_KEY, isoString);

      this.lastSavedStrCache = isoString;
      this.lastSavedCache = date;
    } else {
      sessionStorage.removeItem(LAST_SAVED_KEY);
      this.lastSavedStrCache = null;
      this.lastSavedCache = null;
    }
    this.notify();
  };

  setHasUnsavedChanges = (value: boolean) => {
    if (typeof window === "undefined") return;
    if (value) {
      sessionStorage.setItem(UNSAVED_CHANGES_KEY, "true");
      this.hasUnsavedChangesValueCache = "true";
      this.hasUnsavedChangesCache = true;
    } else {
      sessionStorage.removeItem(UNSAVED_CHANGES_KEY);
      this.hasUnsavedChangesValueCache = null;
      this.hasUnsavedChangesCache = false;
    }
    this.notify();
  };
}

export const formStorage = new FormStorage();
