'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

interface CoachInfoProps {
  coachName: string;
  phone: string;
  sportName: string;
  locale: string;
  className?: string;
}

/**
 * CoachInfo Component
 *
 * Displays coach contact information for a specific sport.
 * Features:
 * - Coach name and role display
 * - Click-to-call phone link
 * - Animated reveal
 * - Accessible contact card
 * - Full RTL support
 */
export function CoachInfo({
  coachName,
  phone,
  sportName,
  locale,
  className,
}: CoachInfoProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Localized strings
  const labels = {
    coach: locale === 'he' ? 'מאמן/ת' : locale === 'ar' ? 'المدرب/ة' : 'Тренер',
    phone: locale === 'he' ? 'טלפון' : locale === 'ar' ? 'الهاتف' : 'Телефон',
    contactCoach:
      locale === 'he'
        ? 'צרו קשר עם המאמן/ת'
        : locale === 'ar'
        ? 'تواصل مع المدرب/ة'
        : 'Связаться с тренером',
  };

  // Animation variants
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(
        'relative overflow-hidden',
        'p-6 rounded-[var(--radius-xl)]',
        'bg-gradient-to-br from-[var(--color-primary-800)] to-[var(--color-primary-900)]',
        'shadow-lg',
        className
      )}
    >
      {/* Decorative accent */}
      <div
        className={cn(
          'absolute top-0 start-0 end-0 h-1',
          'bg-gradient-to-r from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-400)]'
        )}
        aria-hidden="true"
      />

      {/* Decorative corner shape */}
      <div
        className={cn(
          'absolute -bottom-10 -end-10 w-32 h-32',
          'rounded-full',
          'bg-[var(--color-accent-500)]/10'
        )}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-[var(--space-6)]">
        {/* Coach icon */}
        <motion.div
          variants={iconVariants}
          className={cn(
            'flex-shrink-0',
            'w-14 h-14 rounded-full',
            'bg-gradient-to-br from-[var(--color-accent-400)] to-[var(--color-accent-600)]',
            'flex items-center justify-center',
            'shadow-lg shadow-[var(--color-accent-500)]/30'
          )}
        >
          <CoachIcon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <div>
          <p
            className={cn(
              'text-[var(--text-sm)] font-medium',
              'text-[var(--color-primary-300)]',
              'text-[calc(var(--text-sm)*var(--font-scale))]'
            )}
          >
            {labels.coach} {sportName}
          </p>
          <h3
            className={cn(
              'text-[var(--text-xl)] font-bold',
              'text-white',
              'text-[calc(var(--text-xl)*var(--font-scale))]'
            )}
          >
            {coachName}
          </h3>
        </div>
      </div>

      {/* Contact info */}
      {phone && (
        <div className="space-y-4">
          {/* Divider */}
          <div
            className="h-px bg-[var(--color-primary-700)]"
            aria-hidden="true"
          />

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-lg',
                'bg-[var(--color-primary-700)]/50',
                'flex items-center justify-center'
              )}
            >
              <PhoneIcon className="w-5 h-5 text-[var(--color-accent-400)]" />
            </div>
            <div>
              <p
                className={cn(
                  'text-[var(--text-sm)]',
                  'text-[var(--color-primary-400)]',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {labels.phone}
              </p>
              <a
                href={`tel:${phone.replace(/-/g, '')}`}
                className={cn(
                  'text-[var(--text-base)] font-semibold',
                  'text-white',
                  'hover:text-[var(--color-accent-400)]',
                  'transition-colors duration-[var(--duration-fast)]',
                  'text-[calc(var(--text-base)*var(--font-scale))]',
                  // LTR for phone number
                  'dir-ltr'
                )}
                dir="ltr"
              >
                {phone}
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href={`tel:${phone.replace(/-/g, '')}`}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className={cn(
              'group relative',
              'flex items-center justify-center gap-2',
              'w-full mt-[var(--space-4)]',
              'py-3 px-4 rounded-full',
              'bg-[var(--color-accent-500)]',
              'text-[var(--color-primary-900)] font-semibold',
              'transition-colors duration-[var(--duration-normal)]',
              'hover:bg-[var(--color-accent-400)]',
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-2 focus-visible:outline-white',
              'overflow-hidden'
            )}
          >
            {/* Shimmer effect */}
            <span
              className={cn(
                'absolute inset-0 -translate-x-full skew-x-[-20deg]',
                'bg-gradient-to-r from-transparent via-white/30 to-transparent',
                'transition-transform duration-500',
                'group-hover:translate-x-full',
                'rtl:translate-x-full rtl:skew-x-[20deg]',
                'rtl:group-hover:-translate-x-full'
              )}
              aria-hidden="true"
            />

            <CallIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{labels.contactCoach}</span>
          </motion.a>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Icon components
 */
function CoachIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 4L17 2M17 2L19 4M17 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3H21M21 3V9M21 3L14 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CoachInfo;
