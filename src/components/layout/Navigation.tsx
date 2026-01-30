'use client';

import { useState, useRef, useCallback, useEffect, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { sports } from '@/src/lib/sports';

// Navigation item type
interface NavItem {
  href: string;
  labelKey: string;
  hasDropdown?: boolean;
}

// Navigation items
const navItems: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/about', labelKey: 'about' },
  { href: '/sports', labelKey: 'sports', hasDropdown: true },
  { href: '/team', labelKey: 'team' },
  { href: '/stories', labelKey: 'stories' },
  { href: '/contact', labelKey: 'contact' },
];

// Dropdown for sports menu
function SportsDropdown({
  isOpen,
  onClose,
  buttonRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const t = useTranslations();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const firstLink = dropdownRef.current.querySelector('a');
      firstLink?.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation within dropdown
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const links = dropdownRef.current?.querySelectorAll('a');
    if (!links || links.length === 0) return;

    const currentIndex = Array.from(links).findIndex(
      (link) => link === document.activeElement
    );

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        (links[nextIndex] as HTMLElement).focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        (links[prevIndex] as HTMLElement).focus();
        break;
      case 'Home':
        event.preventDefault();
        (links[0] as HTMLElement).focus();
        break;
      case 'End':
        event.preventDefault();
        (links[links.length - 1] as HTMLElement).focus();
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        buttonRef?.current?.focus();
        break;
    }
  }, [onClose, buttonRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className={cn(
            // Position
            'absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2',
            'mt-2',
            // Size
            'w-[280px]',
            // Style
            'bg-[var(--background)]',
            'rounded-[var(--radius-lg)]',
            'border-2 border-[var(--color-primary-200)]',
            'shadow-xl shadow-[var(--color-primary-900)]/10',
            // Padding
            'p-3',
            // High contrast
            '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]'
          )}
          role="menu"
          aria-label={t('navigation.sports')}
          onKeyDown={handleKeyDown}
        >
          {/* Gold accent stripe */}
          <div
            className={cn(
              'absolute top-0 start-6 end-6 h-1',
              'bg-gradient-to-r from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-300)]',
              'rounded-full -translate-y-1/2',
              'rtl:bg-gradient-to-l'
            )}
            aria-hidden="true"
          />

          {/* Sports grid */}
          <div className="grid grid-cols-2 gap-1">
            {sports.map((sport) => (
              <Link
                key={sport.slug}
                href={`/sports/${sport.slug}`}
                onClick={onClose}
                role="menuitem"
                className={cn(
                  // Base
                  'flex items-center gap-2',
                  'min-h-[44px] px-3 py-2',
                  'rounded-[var(--radius-md)]',
                  // Typography
                  'text-[var(--text-sm)] font-medium',
                  'text-[var(--color-primary-900)]',
                  // Hover - track lane effect
                  'hover:bg-[var(--color-primary-50)]',
                  'hover:text-[var(--color-primary-700)]',
                  // Group for icon animation
                  'group',
                  // Focus
                  'focus-visible:outline-none',
                  'focus-visible:ring-[var(--focus-ring-width)]',
                  'focus-visible:ring-[var(--focus-ring-color)]',
                  'focus-visible:ring-inset',
                  // Transition
                  'transition-colors duration-[var(--duration-fast)]'
                )}
              >
                {/* Sport icon */}
                <span
                  className={cn(
                    'text-lg',
                    'transition-transform duration-[var(--duration-fast)]',
                    'group-hover:scale-110'
                  )}
                  aria-hidden="true"
                >
                  {sport.icon}
                </span>
                {/* Sport name */}
                <span>{t(`sports.${sport.slug}.name`)}</span>
              </Link>
            ))}
          </div>

          {/* View all link */}
          <div className="mt-2 pt-2 border-t border-[var(--color-primary-100)]">
            <Link
              href="/sports"
              onClick={onClose}
              role="menuitem"
              className={cn(
                'flex items-center justify-center gap-2',
                'min-h-[44px] px-4 py-2',
                'rounded-[var(--radius-md)]',
                // Typography
                'text-[var(--text-sm)] font-semibold',
                'text-[var(--color-accent-700)]',
                // Hover
                'hover:bg-[var(--color-accent-100)]',
                // Focus
                'focus-visible:outline-none',
                'focus-visible:ring-[var(--focus-ring-width)]',
                'focus-visible:ring-[var(--focus-ring-color)]',
                // Transition
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
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Navigation item component
function NavItem({
  href,
  labelKey,
  hasDropdown,
  isActive,
}: {
  href: string;
  labelKey: string;
  hasDropdown?: boolean;
  isActive: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('navigation');
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Handle mouse enter/leave for dropdown
  const handleMouseEnter = useCallback(() => {
    if (hasDropdown) {
      clearTimeout(closeTimeoutRef.current);
      setIsDropdownOpen(true);
    }
  }, [hasDropdown]);

  const handleMouseLeave = useCallback(() => {
    if (hasDropdown) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 150);
    }
  }, [hasDropdown]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (hasDropdown) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsDropdownOpen((prev) => !prev);
      } else if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      } else if (event.key === 'ArrowDown' && isDropdownOpen) {
        event.preventDefault();
        const firstLink = itemRef.current?.querySelector('[role="menu"] a');
        (firstLink as HTMLElement)?.focus();
      }
    }
  }, [hasDropdown, isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(closeTimeoutRef.current);
    };
  }, [isDropdownOpen]);

  const content = (
    <>
      <span className="relative z-10">{t(labelKey)}</span>

      {/* Dropdown arrow */}
      {hasDropdown && (
        <motion.svg
          className="w-4 h-4 relative z-10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      )}

      {/* Active indicator - track lane underline */}
      {isActive && (
        <motion.div
          layoutId="nav-active-indicator"
          className={cn(
            'absolute bottom-0 start-2 end-2 h-0.5',
            'bg-[var(--color-accent-500)]',
            'rounded-full'
          )}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      )}

      {/* Hover background - subtle track lane effect */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-[var(--color-primary-50)]',
          'rounded-[var(--radius-md)]',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-[var(--duration-fast)]',
          '-z-10'
        )}
        aria-hidden="true"
      />
    </>
  );

  const sharedClasses = cn(
    // Base layout
    'relative group',
    'flex items-center gap-1',
    'min-h-[44px] px-4',
    // Typography
    'text-[var(--text-base)] font-medium',
    'text-[var(--color-primary-900)]',
    // Focus
    'focus-visible:outline-none',
    'focus-visible:ring-[var(--focus-ring-width)]',
    'focus-visible:ring-[var(--focus-ring-color)]',
    'focus-visible:ring-offset-2',
    'rounded-[var(--radius-md)]',
    // Transition
    'transition-colors duration-[var(--duration-fast)]',
    // Active state
    isActive && 'text-[var(--color-primary-700)]'
  );

  if (hasDropdown) {
    return (
      <div
        ref={itemRef}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-current={isActive ? 'page' : undefined}
          className={sharedClasses}
          onKeyDown={handleKeyDown}
        >
          {content}
        </button>

        <SportsDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          buttonRef={buttonRef}
        />
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={sharedClasses}
    >
      {content}
    </Link>
  );
}

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();

  // Determine active state for each nav item
  const isActive = (href: string, hasDropdown?: boolean) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (hasDropdown) {
      return pathname.startsWith(href);
    }
    return pathname === href;
  };

  return (
    <nav
      className={cn(
        'flex items-center gap-1',
        className
      )}
      aria-label="תפריט ראשי"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          labelKey={item.labelKey}
          hasDropdown={item.hasDropdown}
          isActive={isActive(item.href, item.hasDropdown)}
        />
      ))}
    </nav>
  );
}

export default Navigation;
