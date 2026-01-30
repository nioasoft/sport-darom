'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect user's preference for reduced motion
 * Combines system preference with manual override from accessibility settings
 *
 * @returns boolean - true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Check manual override from data attribute
    const checkPreference = () => {
      const manualOverride = document.documentElement.dataset.reducedMotion === 'true';
      const systemPreference = mediaQuery.matches;
      setPrefersReducedMotion(manualOverride || systemPreference);
    };

    // Initial check
    checkPreference();

    // Listen for system preference changes
    const handleChange = () => checkPreference();
    mediaQuery.addEventListener('change', handleChange);

    // Listen for manual changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-reduced-motion'
        ) {
          checkPreference();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduced-motion'],
    });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;
