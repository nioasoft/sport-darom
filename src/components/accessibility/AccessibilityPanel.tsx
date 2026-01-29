'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility, type FontSize } from '@/src/hooks/useAccessibility';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/src/lib/utils';

// Language configuration
const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
] as const;

// Font size options (like podium steps - ascending)
const fontSizeOptions: { value: FontSize; label: string; scale: number }[] = [
  { value: '100', label: '100%', scale: 1 },
  { value: '125', label: '125%', scale: 1.25 },
  { value: '150', label: '150%', scale: 1.5 },
  { value: '200', label: '200%', scale: 2 },
];

// Icon components
function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM9 7a1 1 0 0 0 0 2h.586l-.293 5.867a1 1 0 0 0 .708 1.05L7.5 21.5a1 1 0 0 0 1.8.87L12 17.37l2.7 5a1 1 0 0 0 1.8-.87l-2.501-5.583a1 1 0 0 0 .708-1.05L14.414 9H15a1 1 0 1 0 0-2H9z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TextSizeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5H7v14h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1V5H3a1 1 0 0 1-1-1zM14 8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-.5h-1.5V19h.5a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2h.5V8.5H15V9a1 1 0 1 1-2 0V8z" />
    </svg>
  );
}

function ContrastIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z" />
    </svg>
  );
}

function MotionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
    </svg>
  );
}

function LanguageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
    </svg>
  );
}

function ResetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// Toggle Switch component
function ToggleSwitch({
  checked,
  onChange,
  id,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  label: string;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        // Base styles - 44px height for touch target
        'relative inline-flex h-[44px] w-[76px] items-center',
        'rounded-full p-1',
        'transition-colors duration-[var(--duration-normal)]',
        // Focus ring
        'focus-visible:outline-none',
        'focus-visible:ring-[var(--focus-ring-width)]',
        'focus-visible:ring-[var(--focus-ring-color)]',
        'focus-visible:ring-offset-[var(--focus-ring-offset)]',
        'focus-visible:ring-offset-[var(--background)]',
        // Background color based on state
        checked
          ? 'bg-[var(--color-accent-500)]'
          : 'bg-[var(--color-primary-300)]',
        // High contrast mode
        '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]'
      )}
    >
      {/* Track labels */}
      <span className="sr-only">{label}</span>

      {/* Thumb */}
      <motion.span
        initial={false}
        animate={{
          x: checked ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          'inline-block h-[36px] w-[36px]',
          'rounded-full bg-white',
          'shadow-md',
          // High contrast
          '[data-contrast="high"]_&:bg-[var(--foreground)]'
        )}
      />
    </button>
  );
}

// Font Size Selector (like podium steps)
function FontSizeSelector({
  value,
  onChange,
}: {
  value: FontSize;
  onChange: (size: FontSize) => void;
}) {
  return (
    <div
      className="flex items-end justify-center gap-1"
      role="radiogroup"
      aria-label="Font size"
    >
      {fontSizeOptions.map((option, index) => {
        const isSelected = value === option.value;
        // Heights like podium steps: smallest to largest
        const heights = [28, 36, 44, 52];

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Font size ${option.label}`}
            onClick={() => onChange(option.value)}
            className={cn(
              // Base - minimum 44px width for touch target
              'min-w-[44px] flex items-center justify-center',
              'rounded-t-[var(--radius-md)]',
              'font-bold',
              'transition-all duration-[var(--duration-fast)]',
              // Focus ring
              'focus-visible:outline-none',
              'focus-visible:ring-[var(--focus-ring-width)]',
              'focus-visible:ring-[var(--focus-ring-color)]',
              'focus-visible:ring-offset-1',
              // Selected state
              isSelected
                ? 'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]'
                : 'bg-[var(--color-primary-200)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-300)]',
              // High contrast
              '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]'
            )}
            style={{
              height: `${heights[index]}px`,
              fontSize: `${10 + index * 2}px`,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

// Language Selector
function LanguageSelector({
  currentLocale,
  onLanguageChange,
}: {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Language"
    >
      {languages.map((lang) => {
        const isSelected = currentLocale === lang.code;

        return (
          <button
            key={lang.code}
            role="radio"
            aria-checked={isSelected}
            aria-label={lang.name}
            onClick={() => onLanguageChange(lang.code)}
            className={cn(
              // 44px minimum touch target
              'min-h-[44px] min-w-[44px] px-3',
              'flex items-center gap-2',
              'rounded-[var(--radius-md)]',
              'font-medium',
              'transition-all duration-[var(--duration-fast)]',
              // Focus ring
              'focus-visible:outline-none',
              'focus-visible:ring-[var(--focus-ring-width)]',
              'focus-visible:ring-[var(--focus-ring-color)]',
              'focus-visible:ring-offset-1',
              // Selected state
              isSelected
                ? 'bg-[var(--color-accent-500)] text-[var(--color-primary-900)] ring-2 ring-[var(--color-accent-700)]'
                : 'bg-[var(--color-primary-100)] text-[var(--color-primary-900)] hover:bg-[var(--color-primary-200)]',
              // High contrast
              '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]'
            )}
          >
            <span className="text-lg" aria-hidden="true">{lang.flag}</span>
            <span className="text-[var(--text-sm)]">{lang.name}</span>
          </button>
        );
      })}
    </div>
  );
}

// Section component for consistent styling
function PanelSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 text-[var(--color-accent-600)]">
          {icon}
        </span>
        <h3 className="font-semibold text-[var(--text-sm)] text-[var(--color-primary-900)]">
          {title}
        </h3>
      </div>
      {/* Section content */}
      <div className="ps-7">
        {children}
      </div>
    </div>
  );
}

// Main AccessibilityPanel component
export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const {
    preferences,
    setFontSize,
    toggleContrast,
    toggleReducedMotion,
    resetPreferences,
  } = useAccessibility();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Handle language change
  const handleLanguageChange = useCallback((newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  // Close panel on Escape
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  // Focus trap and outside click handling
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus first focusable element when panel opens
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  // Labels based on locale
  const labels = {
    he: {
      title: 'הגדרות נגישות',
      fontSize: 'גודל גופן',
      contrast: 'ניגודיות גבוהה',
      motion: 'הפחתת תנועה',
      language: 'שפה',
      reset: 'איפוס',
      open: 'פתח הגדרות נגישות',
      close: 'סגור הגדרות נגישות',
    },
    ar: {
      title: 'إعدادات إمكانية الوصول',
      fontSize: 'حجم الخط',
      contrast: 'تباين عالي',
      motion: 'تقليل الحركة',
      language: 'اللغة',
      reset: 'إعادة تعيين',
      open: 'فتح إعدادات إمكانية الوصول',
      close: 'إغلاق إعدادات إمكانية الوصول',
    },
    ru: {
      title: 'Настройки доступности',
      fontSize: 'Размер шрифта',
      contrast: 'Высокий контраст',
      motion: 'Уменьшить движение',
      language: 'Язык',
      reset: 'Сбросить',
      open: 'Открыть настройки доступности',
      close: 'Закрыть настройки доступности',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.he;

  return (
    <div
      ref={panelRef}
      onKeyDown={handleKeyDown}
      className={cn(
        // Fixed positioning - end side (right in LTR, left in RTL)
        'fixed bottom-4 end-4 z-50',
        // RTL/LTR aware
        'rtl:end-auto rtl:start-4'
      )}
    >
      {/* Trigger button */}
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? t.close : t.open}
        aria-controls="accessibility-panel"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          // Size - 56px for prominent touch target
          'w-14 h-14',
          'flex items-center justify-center',
          // Shape and color
          'rounded-full',
          'bg-[var(--color-primary-900)]',
          'text-white',
          // Shadow
          'shadow-lg shadow-[var(--color-primary-900)]/30',
          // Hover
          'hover:bg-[var(--color-primary-800)]',
          // Focus ring
          'focus-visible:outline-none',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-[var(--focus-ring-color)]',
          'focus-visible:ring-offset-[var(--focus-ring-offset)]',
          'focus-visible:ring-offset-[var(--background)]',
          // Transition
          'transition-colors duration-[var(--duration-fast)]',
          // Gold accent border when open
          isOpen && 'ring-4 ring-[var(--color-accent-500)]',
          // High contrast
          '[data-contrast="high"]_&:bg-[var(--foreground)]',
          '[data-contrast="high"]_&:text-[var(--background)]'
        )}
      >
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <AccessibilityIcon className="w-7 h-7" />
          )}
        </motion.span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-panel"
            role="dialog"
            aria-label={t.title}
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className={cn(
              // Positioning - above the trigger
              'absolute bottom-16 end-0',
              'rtl:end-auto rtl:start-0',
              // Size
              'w-[320px]',
              // Style
              'bg-[var(--background)]',
              'rounded-[var(--radius-xl)]',
              'border-2 border-[var(--color-primary-200)]',
              'shadow-xl shadow-[var(--color-primary-900)]/10',
              // Padding
              'p-5',
              // High contrast
              '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]',
              '[data-contrast="high"]_&:shadow-none'
            )}
          >
            {/* Gold accent line at top (like a medal ribbon) */}
            <div
              className={cn(
                'absolute top-0 start-6 end-6 h-1',
                'bg-gradient-to-r from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-300)]',
                'rounded-full',
                'rtl:bg-gradient-to-l',
                '[data-contrast="high"]_&:bg-[var(--color-accent-700)]'
              )}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pt-2">
              <h2 className="font-bold text-[var(--text-lg)] text-[var(--color-primary-900)]">
                {t.title}
              </h2>
              <button
                onClick={() => {
                  resetPreferences();
                }}
                aria-label={t.reset}
                title={t.reset}
                className={cn(
                  'min-w-[44px] min-h-[44px]',
                  'flex items-center justify-center',
                  'rounded-[var(--radius-md)]',
                  'text-[var(--color-primary-600)]',
                  'hover:bg-[var(--color-primary-100)]',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[var(--focus-ring-width)]',
                  'focus-visible:ring-[var(--focus-ring-color)]',
                  'transition-colors duration-[var(--duration-fast)]'
                )}
              >
                <ResetIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Font Size */}
              <PanelSection
                icon={<TextSizeIcon className="w-full h-full" />}
                title={t.fontSize}
              >
                <FontSizeSelector
                  value={preferences.fontSize}
                  onChange={setFontSize}
                />
              </PanelSection>

              {/* High Contrast */}
              <PanelSection
                icon={<ContrastIcon className="w-full h-full" />}
                title={t.contrast}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-sm)] text-[var(--color-primary-700)]">
                    {preferences.contrast === 'high' ? 'ON' : 'OFF'}
                  </span>
                  <ToggleSwitch
                    id="contrast-toggle"
                    checked={preferences.contrast === 'high'}
                    onChange={toggleContrast}
                    label={t.contrast}
                  />
                </div>
              </PanelSection>

              {/* Reduced Motion */}
              <PanelSection
                icon={<MotionIcon className="w-full h-full" />}
                title={t.motion}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-sm)] text-[var(--color-primary-700)]">
                    {preferences.reducedMotion ? 'ON' : 'OFF'}
                  </span>
                  <ToggleSwitch
                    id="motion-toggle"
                    checked={preferences.reducedMotion}
                    onChange={toggleReducedMotion}
                    label={t.motion}
                  />
                </div>
              </PanelSection>

              {/* Language */}
              <PanelSection
                icon={<LanguageIcon className="w-full h-full" />}
                title={t.language}
              >
                <LanguageSelector
                  currentLocale={locale}
                  onLanguageChange={handleLanguageChange}
                />
              </PanelSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AccessibilityPanel;
