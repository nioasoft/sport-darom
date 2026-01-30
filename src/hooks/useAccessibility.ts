'use client';

import { useState, useEffect, useCallback } from 'react';

const A11Y_STORAGE_KEY = 'sport-darom-a11y';

export type FontSize = '100' | '125' | '150' | '200';
export type ContrastMode = 'normal' | 'high';
export type Locale = 'he' | 'ar' | 'ru';

export interface A11yPreferences {
  fontSize: FontSize;
  contrast: ContrastMode;
  reducedMotion: boolean;
}

const defaultPreferences: A11yPreferences = {
  fontSize: '100',
  contrast: 'normal',
  reducedMotion: false,
};

// Apply preferences to DOM data attributes
function applyPreferencesToDOM(prefs: A11yPreferences): void {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.dataset.fontSize = prefs.fontSize;
  html.dataset.contrast = prefs.contrast;
  html.dataset.reducedMotion = String(prefs.reducedMotion);
}

// Save preferences to localStorage
function savePreferencesToStorage(prefs: A11yPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

// Load preferences from localStorage
function loadPreferencesFromStorage(): A11yPreferences {
  if (typeof window === 'undefined') return defaultPreferences;
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<A11yPreferences>;
      return { ...defaultPreferences, ...parsed };
    }
    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return { ...defaultPreferences, reducedMotion: true };
    }
  } catch {
    // Silently fail
  }
  return defaultPreferences;
}

/**
 * Hook to manage accessibility preferences
 * Persists to localStorage and syncs with document data attributes
 */
export function useAccessibility() {
  // Use lazy initialization to load from storage
  const [preferences, setPreferencesState] = useState<A11yPreferences>(loadPreferencesFromStorage);

  // Apply DOM attributes on mount and when preferences change
  useEffect(() => {
    applyPreferencesToDOM(preferences);
  }, [preferences]);

  // Update preferences
  const setPreferences = useCallback((
    newPrefs: Partial<A11yPreferences> | ((prev: A11yPreferences) => Partial<A11yPreferences>)
  ) => {
    setPreferencesState((prev) => {
      const updates = typeof newPrefs === 'function' ? newPrefs(prev) : newPrefs;
      const merged = { ...prev, ...updates };
      savePreferencesToStorage(merged);
      return merged;
    });
  }, []);

  // Individual setters for convenience
  const setFontSize = useCallback((fontSize: FontSize) => {
    setPreferences({ fontSize });
  }, [setPreferences]);

  const setContrast = useCallback((contrast: ContrastMode) => {
    setPreferences({ contrast });
  }, [setPreferences]);

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    setPreferences({ reducedMotion });
  }, [setPreferences]);

  const toggleContrast = useCallback(() => {
    setPreferences((prev) => ({
      contrast: prev.contrast === 'normal' ? 'high' : 'normal',
    }));
  }, [setPreferences]);

  const toggleReducedMotion = useCallback(() => {
    setPreferences((prev) => ({
      reducedMotion: !prev.reducedMotion,
    }));
  }, [setPreferences]);

  const resetPreferences = useCallback(() => {
    setPreferencesState(defaultPreferences);
    try {
      localStorage.removeItem(A11Y_STORAGE_KEY);
    } catch {
      // Silently fail
    }
  }, []);

  return {
    preferences,
    setPreferences,
    setFontSize,
    setContrast,
    setReducedMotion,
    toggleContrast,
    toggleReducedMotion,
    resetPreferences,
  };
}

export default useAccessibility;
