'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useUI } from '@/src/contexts/UIContext';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

// Logo component with athletic diagonal accent
function Logo({ className }: { className?: string }) {
  const t = useTranslations('metadata');

  return (
    <Link
      href="/"
      className={cn(
        'group relative flex items-center gap-3',
        'focus-visible:outline-none',
        'focus-visible:ring-[var(--focus-ring-width)]',
        'focus-visible:ring-[var(--focus-ring-color)]',
        'focus-visible:ring-offset-2',
        'rounded-[var(--radius-md)]',
        className
      )}
      aria-label={t('title')}
    >
      {/* Logo mark - stylized athlete figure with Paralympic rings aesthetic */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background circle */}
        <div className={cn(
          'absolute inset-0 rounded-full',
          'bg-[var(--color-primary-900)]',
          'transition-transform duration-[var(--duration-normal)]',
          'group-hover:scale-105'
        )} />

        {/* Diagonal victory stripe */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full overflow-hidden',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-[var(--duration-normal)]'
          )}
        >
          <div className={cn(
            'absolute top-1/2 left-0 right-0 h-1',
            'bg-gradient-to-r from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-300)]',
            '-rotate-45 origin-center'
          )} />
        </motion.div>

        {/* Athlete icon */}
        <svg
          viewBox="0 0 24 24"
          className="relative w-7 h-7 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Stylized wheelchair athlete */}
          <circle cx="12" cy="4" r="2.5" />
          <path d="M15.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          <path d="M8.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          <path d="M12 7.5c-1.5 0-3 .5-4 1.5l1.5 2c.6-.5 1.5-1 2.5-1s1.9.5 2.5 1l1.5-2c-1-1-2.5-1.5-4-1.5z" />
          <path d="M10 11l-1 6h2l.5-4 2.5 2v4h2v-5l-3-3h-3z" />
        </svg>
      </div>

      {/* Text logo */}
      <div className="flex flex-col">
        <span className={cn(
          'text-[var(--text-lg)] font-bold leading-tight',
          'text-[var(--color-primary-900)]',
          'tracking-tight'
        )}>
          ספורט דרום
        </span>
        {/* Decorative English text - hidden from screen readers */}
        <span
          className={cn(
            'text-[var(--text-xs)] font-medium',
            'text-[var(--color-accent-600)]',
            'tracking-wide uppercase'
          )}
          aria-hidden="true"
        >
          Paralympic Sports
        </span>
      </div>
    </Link>
  );
}

// Hamburger menu button
function HamburgerButton({
  isOpen,
  onClick,
  className,
  prefersReducedMotion = false,
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  prefersReducedMotion?: boolean;
}) {
  const transitionDuration = prefersReducedMotion ? 0 : 0.2;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      className={cn(
        // Size - 44px minimum touch target
        'w-11 h-11',
        'flex items-center justify-center',
        // Style
        'rounded-[var(--radius-md)]',
        'text-[var(--color-primary-900)]',
        // Hover
        'hover:bg-[var(--color-primary-100)]',
        // Focus
        'focus-visible:outline-none',
        'focus-visible:ring-[var(--focus-ring-width)]',
        'focus-visible:ring-[var(--focus-ring-color)]',
        'focus-visible:ring-offset-2',
        // Transition
        'transition-colors duration-[var(--duration-fast)]',
        className
      )}
    >
      <div className="relative w-6 h-5 flex flex-col justify-center items-center">
        {/* Top line */}
        <motion.span
          initial={false}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6,
          }}
          transition={{ duration: transitionDuration }}
          className={cn(
            'absolute w-6 h-0.5 rounded-full',
            'bg-current',
            'origin-center'
          )}
        />
        {/* Middle line */}
        <motion.span
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: transitionDuration }}
          className={cn(
            'absolute w-6 h-0.5 rounded-full',
            'bg-current'
          )}
        />
        {/* Bottom line */}
        <motion.span
          initial={false}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6,
          }}
          transition={{ duration: transitionDuration }}
          className={cn(
            'absolute w-6 h-0.5 rounded-full',
            'bg-current',
            'origin-center'
          )}
        />
      </div>
    </button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen, setMobileMenuOpen } = useUI();
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll position for header styling (throttled with RAF)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  // Using padding-right to prevent layout shift when scrollbar disappears
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Handle closing mobile menu (passed to MobileMenu, which closes on navigation)
  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        id="navigation"
        className={cn(
          // Position
          'sticky top-0 z-40',
          // Layout
          'w-full',
          // Background with blur
          'bg-[var(--background)]/95 backdrop-blur-sm',
          // Border
          'border-b border-transparent',
          // Transition
          'transition-all duration-[var(--duration-normal)]',
          // Scrolled state
          isScrolled && [
            'border-[var(--color-primary-200)]',
            'shadow-sm shadow-[var(--color-primary-900)]/5',
          ],
          // High contrast
          '[data-contrast="high"]_&:bg-[var(--background)]',
          '[data-contrast="high"]_&:border-[var(--foreground)]'
        )}
      >
        {/* Victory stripe accent at top */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-1',
            'bg-gradient-to-r from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-300)]',
            '[data-contrast="high"]_&:bg-[var(--color-accent-700)]'
          )}
          aria-hidden="true"
        />

        <div className={cn(
          'mx-auto max-w-7xl',
          'px-4 sm:px-6 lg:px-8'
        )}>
          <div className={cn(
            'flex items-center justify-between',
            'h-16 sm:h-20'
          )}>
            {/* Logo */}
            <Logo />

            {/* Desktop navigation */}
            <Navigation className="hidden lg:flex" />

            {/* Right side - Language switcher + Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Language switcher - visible on desktop */}
              <LanguageSwitcher className="hidden sm:flex" />

              {/* Mobile menu button */}
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
    </>
  );
}

export default Header;
