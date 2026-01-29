'use client';

import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';

// Language configuration with RTL support
const languages = [
  { code: 'he', name: 'עברית', shortName: 'עב', flag: '🇮🇱', dir: 'rtl' },
  { code: 'ar', name: 'العربية', shortName: 'عر', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ru', name: 'Русский', shortName: 'РУ', flag: '🇷🇺', dir: 'ltr' },
] as const;

interface LanguageSwitcherProps {
  className?: string;
  /** Compact mode shows just the flag/code */
  compact?: boolean;
  /** Variant for different contexts */
  variant?: 'default' | 'header' | 'footer';
}

export function LanguageSwitcher({
  className,
  compact = false,
  variant = 'default',
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  // Handle language change
  const handleLanguageChange = useCallback((newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  }, [router, pathname]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' && isOpen) {
      event.preventDefault();
      const firstOption = containerRef.current?.querySelector('[role="option"]');
      (firstOption as HTMLElement)?.focus();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`שפה נוכחית: ${currentLanguage.name}. לחץ לשינוי שפה`}
        className={cn(
          // Base
          'flex items-center gap-2',
          'min-h-[44px]',
          'rounded-[var(--radius-md)]',
          // Padding based on variant
          variant === 'header' ? 'px-3' : 'px-4',
          // Typography
          'text-[var(--text-sm)] font-medium',
          'text-[var(--color-primary-900)]',
          // Border for definition
          'border border-[var(--color-primary-200)]',
          // Hover
          'hover:bg-[var(--color-primary-50)]',
          'hover:border-[var(--color-primary-300)]',
          // Focus
          'focus-visible:outline-none',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-[var(--focus-ring-color)]',
          'focus-visible:ring-offset-2',
          // Transition
          'transition-all duration-[var(--duration-fast)]',
          // Open state
          isOpen && 'bg-[var(--color-primary-50)] border-[var(--color-primary-400)]',
          // High contrast
          '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]'
        )}
      >
        {/* Globe icon */}
        <svg
          className="w-5 h-5 text-[var(--color-primary-600)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        {/* Current language */}
        {!compact && (
          <>
            <span className="hidden sm:inline">{currentLanguage.name}</span>
            <span className="sm:hidden">{currentLanguage.shortName}</span>
          </>
        )}

        {/* Dropdown arrow */}
        <motion.svg
          className="w-4 h-4 text-[var(--color-primary-500)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
            role="listbox"
            aria-label="בחירת שפה"
            className={cn(
              // Position
              'absolute top-full end-0 rtl:end-auto rtl:start-0',
              'mt-2',
              // Size
              'min-w-[160px]',
              // Style
              'bg-[var(--background)]',
              'rounded-[var(--radius-lg)]',
              'border-2 border-[var(--color-primary-200)]',
              'shadow-lg shadow-[var(--color-primary-900)]/10',
              // Padding
              'p-1.5',
              // Z-index
              'z-50',
              // High contrast
              '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]'
            )}
          >
            {/* Gold accent stripe */}
            <div
              className={cn(
                'absolute top-0 start-4 end-4 h-0.5',
                'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent',
                '-translate-y-1/2',
                'rounded-full'
              )}
              aria-hidden="true"
            />

            {languages.map((lang) => {
              const isSelected = lang.code === locale;

              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleLanguageChange(lang.code)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLanguageChange(lang.code);
                    } else if (e.key === 'Escape') {
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    // Base
                    'w-full flex items-center gap-3',
                    'min-h-[44px] px-3',
                    'rounded-[var(--radius-md)]',
                    // Typography
                    'text-[var(--text-sm)]',
                    isSelected ? 'font-semibold' : 'font-medium',
                    // Colors
                    'text-[var(--color-primary-900)]',
                    // Hover
                    'hover:bg-[var(--color-primary-50)]',
                    // Selected
                    isSelected && [
                      'bg-[var(--color-accent-100)]',
                      'text-[var(--color-accent-700)]',
                    ],
                    // Focus
                    'focus-visible:outline-none',
                    'focus-visible:ring-[var(--focus-ring-width)]',
                    'focus-visible:ring-[var(--focus-ring-color)]',
                    'focus-visible:ring-inset',
                    // Transition
                    'transition-colors duration-[var(--duration-fast)]'
                  )}
                >
                  {/* Flag */}
                  <span className="text-lg" aria-hidden="true">
                    {lang.flag}
                  </span>

                  {/* Language name */}
                  <span className="flex-1 text-start">{lang.name}</span>

                  {/* Checkmark for selected */}
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[var(--color-accent-600)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;
