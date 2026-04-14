'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { StarIcon, HeartIcon, TrophyIcon } from '@/src/components/icons';

export interface AboutSectionProps {
  /** Additional CSS classes */
  className?: string;
  /** Show section title */
  showTitle?: boolean;
}

// Feature keys for mapping to translations
const featureKeys = [
  'whoFits',
  'personalAttention',
  'safeEnvironment',
  'professionalCoaches',
  'community',
  'achievements',
  'confidence',
] as const;

// Icons for each feature
const featureIcons: Record<string, React.FC<{ className?: string }>> = {
  whoFits: AudienceIcon,
  personalAttention: PersonIcon,
  safeEnvironment: ShieldIcon,
  professionalCoaches: StarIcon,
  community: HeartIcon,
  achievements: TrophyIcon,
  confidence: SparklesIcon,
};

/**
 * AboutSection Component
 *
 * A compelling "Why Sport Darom?" section for the homepage.
 * Features:
 * - Seven key value propositions for parents
 * - Warm, personal messaging
 * - Full RTL support
 * - WCAG AAA compliant (7:1+ contrast)
 * - Reduced motion support
 */
export function AboutSection({ className, showTitle = true }: AboutSectionProps) {
  const t = useTranslations('about');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Section container animation
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
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Card animation
  const cardVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
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
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className={cn(
        // Section padding
        'py-[var(--space-20)] px-[var(--space-6)]',
        'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
        // Background - subtle gradient
        'relative overflow-hidden',
        'bg-gradient-to-b from-[var(--background)] via-[var(--color-primary-50)]/50 to-[var(--background)]',
        className
      )}
    >
      {/* Decorative background pattern */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden',
          'opacity-[0.02]'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -inset-[50%] rotate-[-5deg]',
            'rtl:rotate-[5deg]'
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              var(--color-primary-900) 0px,
              var(--color-primary-900) 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute top-0 end-0 w-64 h-64 opacity-5"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-500)] to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        {showTitle && (
          <div className="mb-[var(--space-12)] text-center">
            {/* Decorative element */}
            <motion.div
              variants={lineVariants}
              className={cn(
                'mx-auto mb-[var(--space-4)] h-1 w-16',
                'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent',
                'rounded-full'
              )}
              aria-hidden="true"
            />

            {/* Section title */}
            <motion.h2
              id="about-title"
              variants={titleVariants}
              className={cn(
                'text-[clamp(2rem,6vw,3rem)]',
                'font-bold tracking-tight',
                'text-[var(--color-primary-900)]',
                'text-[calc(clamp(2rem,6vw,3rem)*var(--font-scale))]'
              )}
            >
              {t('sectionTitle')}
            </motion.h2>

            {/* Intro paragraph */}
            <motion.p
              variants={titleVariants}
              className={cn(
                'mt-[var(--space-6)] text-[var(--text-lg)]',
                'text-[var(--color-primary-700)]',
                'max-w-3xl mx-auto leading-relaxed',
                'text-[calc(var(--text-lg)*var(--font-scale))]'
              )}
            >
              {t('intro')}
            </motion.p>
          </div>
        )}

        {/* Features grid */}
        <div
          className={cn(
            'grid gap-6 md:gap-8',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
          role="list"
          aria-label={t('sectionTitle')}
        >
          {featureKeys.map((key) => {
            const Icon = featureIcons[key];
            return (
              <motion.article
                key={key}
                variants={cardVariants}
               
                className="group"
              >
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                  className={cn(
                    // Card base
                    'relative h-full overflow-hidden',
                    'bg-[var(--background)]',
                    'border border-[var(--color-primary-200)]',
                    'rounded-[var(--radius-xl)]',
                    'p-6',
                    // Shadow
                    'shadow-sm',
                    'hover:shadow-lg hover:shadow-[var(--color-primary-200)]/50',
                    // Focus styles
                    'focus-within:ring-[var(--focus-ring-width)]',
                    'focus-within:ring-[var(--focus-ring-color)]',
                    'focus-within:ring-offset-[var(--focus-ring-offset)]',
                    // Transition
                    'transition-all duration-[var(--duration-normal)]'
                  )}
                >
                  {/* Top accent line */}
                  <div
                    className={cn(
                      'absolute top-0 start-0 end-0 h-1',
                      'bg-gradient-to-r from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-400)]',
                      'opacity-0 group-hover:opacity-100',
                      'transition-opacity duration-[var(--duration-normal)]'
                    )}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl mb-4',
                      'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
                      'flex items-center justify-center',
                      'text-[var(--color-primary-700)]',
                      'group-hover:from-[var(--color-accent-100)] group-hover:to-[var(--color-accent-200)]',
                      'group-hover:text-[var(--color-accent-700)]',
                      'transition-all duration-[var(--duration-normal)]'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      'text-[var(--text-lg)] font-bold',
                      'text-[var(--color-primary-900)]',
                      'mb-2',
                      'text-[calc(var(--text-lg)*var(--font-scale))]'
                    )}
                  >
                    {t(`features.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      'text-[var(--text-base)]',
                      'text-[var(--color-primary-600)]',
                      'leading-relaxed',
                      'text-[calc(var(--text-base)*var(--font-scale))]'
                    )}
                  >
                    {t(`features.${key}.description`)}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        {/* Parent-focused CTA section */}
        <motion.div
          variants={cardVariants}
          className={cn(
            'mt-[var(--space-16)] text-center',
            'max-w-3xl mx-auto'
          )}
        >
          {/* Quote-style message for parents */}
          <div
            className={cn(
              'relative p-8 rounded-[var(--radius-xl)]',
              'bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-800)]',
              'text-white'
            )}
          >
            {/* Decorative quote marks */}
            <div
              className="absolute top-4 start-6 text-[var(--color-accent-400)] opacity-30 text-6xl font-serif"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <p
              className={cn(
                'relative z-10',
                'text-[var(--text-lg)] md:text-[var(--text-xl)]',
                'leading-relaxed',
                'text-[var(--color-primary-100)]',
                'text-[calc(var(--text-lg)*var(--font-scale))] md:text-[calc(var(--text-xl)*var(--font-scale))]'
              )}
            >
              {t('parentsCta')}
            </p>

            {/* CTA Button */}
            <motion.div className="mt-8">
              <Link
                href="/sports"
                className={cn(
                  'inline-flex items-center justify-center',
                  'min-h-[48px] px-8 py-3',
                  'text-[var(--text-base)] font-semibold',
                  'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]',
                  'rounded-full',
                  'hover:bg-[var(--color-accent-400)]',
                  'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                  'focus-visible:outline-offset-[var(--focus-ring-offset)]',
                  'focus-visible:outline-white',
                  'transition-colors duration-[var(--duration-normal)]',
                  'shadow-lg shadow-[var(--color-accent-500)]/30'
                )}
              >
                {t('learnMore')}
                <span className="ms-2 rtl:rotate-180" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10H16M16 10L11 5M16 10L11 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.8,
          }}
          className={cn(
            'mt-[var(--space-16)] h-0.5 mx-auto max-w-xs',
            'rounded-full origin-center',
            'bg-gradient-to-r from-transparent via-[var(--color-primary-300)] to-transparent'
          )}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

// Icons

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 21V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AudienceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20C4 16.6863 6.68629 14 10 14H12C15.3137 14 18 16.6863 18 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 14.5C18.4556 15.0908 20 16.8993 20 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 17L5.5 19L7.5 19.5L5.5 20L5 22L4.5 20L2.5 19.5L4.5 19L5 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AboutSection;
