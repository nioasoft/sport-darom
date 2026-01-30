'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { sports } from '@/src/lib/sports';

// Language configuration
const languages = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

// Navigation item type
interface MobileNavItem {
  href: string;
  labelKey: string;
  icon: string;
  hasChildren?: boolean;
}

// Navigation items
const navItems: MobileNavItem[] = [
  { href: '/', labelKey: 'home', icon: '🏠' },
  { href: '/sports', labelKey: 'sports', icon: '🏅', hasChildren: true },
  { href: '/team', labelKey: 'team', icon: '👥' },
  { href: '/stories', labelKey: 'stories', icon: '🏆' },
  { href: '/contact', labelKey: 'contact', icon: '📞' },
];

// Accordion item for sports submenu
function SportsAccordion({
  isExpanded,
  onToggle,
  onClose,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const isActive = pathname.startsWith('/sports');

  return (
    <div>
      {/* Sports main item */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls="sports-submenu"
        className={cn(
          // Base
          'w-full flex items-center gap-4',
          'min-h-[56px] px-4',
          'rounded-[var(--radius-lg)]',
          // Typography
          'text-[var(--text-lg)] font-semibold',
          'text-[var(--color-primary-900)]',
          // Hover
          'hover:bg-[var(--color-primary-50)]',
          // Focus
          'focus-visible:outline-none',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-[var(--focus-ring-color)]',
          'focus-visible:ring-inset',
          // Transition
          'transition-colors duration-[var(--duration-fast)]',
          // Active
          isActive && 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)]'
        )}
      >
        <span className="text-2xl" aria-hidden="true">🏅</span>
        <span className="flex-1 text-start">{t('navigation.sports')}</span>
        <motion.svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      {/* Submenu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="sports-submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-2 ps-8 space-y-1">
              {sports.map((sport) => (
                <Link
                  key={sport.slug}
                  href={`/sports/${sport.slug}`}
                  onClick={onClose}
                  className={cn(
                    // Base
                    'flex items-center gap-3',
                    'min-h-[48px] px-4',
                    'rounded-[var(--radius-md)]',
                    // Typography
                    'text-[var(--text-base)] font-medium',
                    'text-[var(--color-primary-700)]',
                    // Hover
                    'hover:bg-[var(--color-primary-50)]',
                    'hover:text-[var(--color-primary-900)]',
                    // Focus
                    'focus-visible:outline-none',
                    'focus-visible:ring-[var(--focus-ring-width)]',
                    'focus-visible:ring-[var(--focus-ring-color)]',
                    'focus-visible:ring-inset',
                    // Transition
                    'transition-colors duration-[var(--duration-fast)]'
                  )}
                >
                  <span className="text-lg" aria-hidden="true">{sport.icon}</span>
                  <span>{t(`sports.${sport.slug}.name`)}</span>
                </Link>
              ))}

              {/* View all */}
              <Link
                href="/sports"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3',
                  'min-h-[48px] px-4',
                  'rounded-[var(--radius-md)]',
                  'text-[var(--text-base)] font-semibold',
                  'text-[var(--color-accent-700)]',
                  'hover:bg-[var(--color-accent-50)]',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[var(--focus-ring-width)]',
                  'focus-visible:ring-[var(--focus-ring-color)]',
                  'transition-colors duration-[var(--duration-fast)]'
                )}
              >
                <span>{t('sports.title')}</span>
                <svg
                  className="w-4 h-4 rtl:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main navigation item
function NavItem({
  href,
  labelKey,
  icon,
  isActive,
  onClick,
}: {
  href: string;
  labelKey: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const t = useTranslations('navigation');

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        // Base
        'flex items-center gap-4',
        'min-h-[56px] px-4',
        'rounded-[var(--radius-lg)]',
        // Typography
        'text-[var(--text-lg)] font-semibold',
        'text-[var(--color-primary-900)]',
        // Hover
        'hover:bg-[var(--color-primary-50)]',
        // Focus
        'focus-visible:outline-none',
        'focus-visible:ring-[var(--focus-ring-width)]',
        'focus-visible:ring-[var(--focus-ring-color)]',
        'focus-visible:ring-inset',
        // Transition
        'transition-colors duration-[var(--duration-fast)]',
        // Active
        isActive && 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)]'
      )}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span>{t(labelKey)}</span>
    </Link>
  );
}

// Language selector section
function LanguageSection({ onClose }: { onClose: () => void }) {
  const t = useTranslations('accessibility.panel');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    onClose();
  };

  return (
    <div className="pt-4 border-t border-[var(--color-primary-200)]">
      <h3 className={cn(
        'px-4 mb-3',
        'text-[var(--text-sm)] font-semibold uppercase tracking-wider',
        'text-[var(--color-primary-600)]'
      )}>
        {t('language')}
      </h3>
      <div className="flex flex-wrap gap-2 px-4">
        {languages.map((lang) => {
          const isSelected = lang.code === locale;

          return (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              aria-pressed={isSelected}
              className={cn(
                // Base
                'flex items-center gap-2',
                'min-h-[44px] px-4',
                'rounded-[var(--radius-md)]',
                // Typography
                'text-[var(--text-base)] font-medium',
                // Selected state
                isSelected
                  ? 'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]'
                  : 'bg-[var(--color-primary-100)] text-[var(--color-primary-900)] hover:bg-[var(--color-primary-200)]',
                // Focus
                'focus-visible:outline-none',
                'focus-visible:ring-[var(--focus-ring-width)]',
                'focus-visible:ring-[var(--focus-ring-color)]',
                'focus-visible:ring-offset-2',
                // Transition
                'transition-colors duration-[var(--duration-fast)]'
              )}
            >
              <span className="text-lg" aria-hidden="true">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [sportsExpanded, setSportsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus first focusable element when opened
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      setTimeout(() => firstFocusable?.focus(), 100);
    }
  }, [isOpen]);

  // Determine active state
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed inset-0 z-40',
              'bg-[var(--color-primary-900)]/50',
              'backdrop-blur-sm',
              'lg:hidden'
            )}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            className={cn(
              // Position
              'fixed top-0 end-0 bottom-0',
              'rtl:end-auto rtl:start-0',
              'z-50',
              // Size
              'w-full max-w-sm',
              // Style
              'bg-[var(--background)]',
              'shadow-2xl shadow-[var(--color-primary-900)]/20',
              // Layout
              'flex flex-col',
              // Only show on mobile/tablet
              'lg:hidden',
              // High contrast
              '[data-contrast="high"]_&:border-s-4 [data-contrast="high"]_&:border-[var(--foreground)]'
            )}
          >
            {/* Victory stripe at top */}
            <div
              className={cn(
                'h-1 w-full',
                'bg-gradient-to-r from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-300)]'
              )}
              aria-hidden="true"
            />

            {/* Header with close button */}
            <div className={cn(
              'flex items-center justify-between',
              'px-4 py-4',
              'border-b border-[var(--color-primary-200)]'
            )}>
              <span className={cn(
                'text-[var(--text-lg)] font-bold',
                'text-[var(--color-primary-900)]'
              )}>
                תפריט
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="סגור תפריט"
                className={cn(
                  'w-11 h-11',
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
                <svg
                  className="w-6 h-6"
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
              </button>
            </div>

            {/* Navigation */}
            <nav
              className={cn(
                'flex-1 overflow-y-auto',
                'px-3 py-4',
                'space-y-1'
              )}
              aria-label="תפריט ניווט ראשי"
            >
              {navItems.map((item) => {
                if (item.hasChildren) {
                  return (
                    <SportsAccordion
                      key={item.href}
                      isExpanded={sportsExpanded}
                      onToggle={() => setSportsExpanded(!sportsExpanded)}
                      onClose={onClose}
                    />
                  );
                }

                return (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    labelKey={item.labelKey}
                    icon={item.icon}
                    isActive={isActive(item.href)}
                    onClick={onClose}
                  />
                );
              })}
            </nav>

            {/* Language section at bottom */}
            <div className="px-3 pb-6">
              <LanguageSection onClose={onClose} />
            </div>

            {/* Bottom safe area for mobile */}
            <div className="h-safe-area-inset-bottom bg-[var(--background)]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
