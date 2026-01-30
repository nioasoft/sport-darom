'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { sports } from '@/src/lib/sports';
import { SportCard } from './SportCard';

export interface SportsGridProps {
  /** Section title override */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show section title */
  showTitle?: boolean;
  /** Maximum number of sports to display (for homepage preview) */
  limit?: number;
}

/**
 * SportsGrid Component
 *
 * A dynamic, accessible grid displaying Paralympic sports cards.
 * Features:
 * - Asymmetric grid layout with offset rows for visual dynamism
 * - Staggered entrance animations
 * - Decorative track lane lines
 * - Section heading with gold medal accent
 * - Full RTL support
 * - WCAG AAA compliant
 * - Reduced motion support
 */
export function SportsGrid({
  title,
  className,
  showTitle = true,
  limit,
}: SportsGridProps) {
  const t = useTranslations('sports');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Determine which sports to display
  const displayedSports = limit ? sports.slice(0, limit) : sports;
  const sectionTitle = title || t('title');

  // Section entrance animation
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  // Title animation
  const titleVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Decorative line animation
  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="sports-grid"
      aria-labelledby="sports-grid-title"
      className={cn(
        // Section padding
        'py-[var(--space-16)] px-[var(--space-6)]',
        'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
        // Background with subtle pattern
        'relative overflow-hidden',
        'bg-gradient-to-b from-[var(--background)] via-[var(--color-primary-50)]/30 to-[var(--background)]',
        className
      )}
    >
      {/* Decorative background track lanes */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          'opacity-[0.03]'
        )}
        aria-hidden="true"
      >
        {/* Horizontal track lanes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute h-px w-full',
              'bg-gradient-to-r from-transparent via-[var(--color-primary-900)] to-transparent'
            )}
            style={{ top: `${12.5 * (i + 1)}%` }}
          />
        ))}
      </div>

      {/* Decorative diagonal accent */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={isInView ? { opacity: 0.05, x: 0 } : {}}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          'absolute -top-[20%] -end-[10%] w-[60%] h-[140%]',
          '-skew-x-12 rtl:skew-x-12',
          'bg-gradient-to-b from-[var(--color-accent-500)] to-transparent'
        )}
        aria-hidden="true"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        {showTitle && (
          <div className="mb-[var(--space-12)] text-center">
            {/* Decorative element above title */}
            <div
              className={cn(
                'flex items-center justify-center gap-4 mb-[var(--space-4)]'
              )}
              aria-hidden="true"
            >
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-16 origin-end rtl:origin-start',
                  'bg-gradient-to-l from-[var(--color-accent-500)] to-transparent',
                  'rtl:bg-gradient-to-r'
                )}
              />
              {/* Medal icon */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
                  'shadow-lg shadow-[var(--color-accent-500)]/30',
                  'flex items-center justify-center'
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6.5L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-16 origin-start rtl:origin-end',
                  'bg-gradient-to-r from-[var(--color-accent-500)] to-transparent',
                  'rtl:bg-gradient-to-l'
                )}
              />
            </div>

            {/* Section title */}
            <motion.h2
              id="sports-grid-title"
              variants={titleVariants}
              className={cn(
                'text-[clamp(1.75rem,5vw,2.5rem)]',
                'font-bold tracking-tight',
                'text-[var(--foreground)]',
                // Scalable font
                'text-[calc(clamp(1.75rem,5vw,2.5rem)*var(--font-scale))]'
              )}
            >
              {sectionTitle}
            </motion.h2>

            {/* Decorative underline */}
            <motion.div
              variants={lineVariants}
              className={cn(
                'h-1 w-24 mx-auto mt-[var(--space-4)]',
                'rounded-full',
                'bg-gradient-to-r from-[var(--color-primary-500)] via-[var(--color-accent-500)] to-[var(--color-primary-500)]'
              )}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Sports grid - asymmetric layout */}
        <div
          className={cn(
            'grid gap-6 md:gap-8',
            // Responsive grid: 1 -> 2 -> 3 -> 4 columns
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          )}
          role="list"
          aria-label={sectionTitle}
        >
          {displayedSports.map((sport, index) => (
            <div
              key={sport.slug}
             
              className={cn(
                // Create offset effect on larger screens
                // Odd rows are offset in alternating pattern
                index % 4 === 1 && 'xl:mt-8',
                index % 4 === 3 && 'xl:mt-8',
                index % 2 === 1 && 'lg:mt-6 xl:mt-0',
                // First card in second row offset on medium screens
                index === 2 && 'sm:mt-4 lg:mt-0',
                index === 3 && 'sm:mt-4 lg:mt-6 xl:mt-8'
              )}
            >
              <SportCard sport={sport} index={index} />
            </div>
          ))}
        </div>

        {/* Decorative bottom track finish line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.8,
          }}
          className={cn(
            'mt-[var(--space-16)] h-1 mx-auto max-w-md',
            'rounded-full origin-center',
            'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
          )}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

export default SportsGrid;
