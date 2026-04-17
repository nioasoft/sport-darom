'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { HeartIcon, TrophyIcon } from '@/src/components/icons';

export interface HeroProps {
  /** Background image source */
  backgroundImage?: string;
  /** Background video source (takes precedence over image) */
  backgroundVideo?: string;
  /** Alt text for background image (for screen readers) */
  backgroundAlt?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero section component for Sport Darom
 *
 * Features:
 * - Dynamic diagonal composition inspired by athletic movement
 * - Full RTL support
 * - Respects reduced motion preferences
 * - WCAG 2.1 AAA compliant (7:1+ contrast ratios)
 * - 60vh minimum height
 */
export function Hero({
  backgroundImage,
  backgroundVideo,
  backgroundAlt,
  className,
}: HeroProps) {
  const t = useTranslations('hero');
  const partnerLogos = [
    { key: 'spivak', icon: BuildingIcon },
    { key: 'ilan', icon: HeartIcon },
    { key: 'paralympic', icon: TrophyIcon },
  ] as const;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animation variants - respect reduced motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, x: -60, skewX: -3 },
    visible: {
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  const subtitleVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 12,
        duration: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  const ctaVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 150,
        damping: 15,
        delay: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const decorativeLineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        // Base layout
        'relative min-h-[60vh] w-full overflow-hidden',
        // Background gradient - deep blue with subtle warmth
        'bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-900)]',
        className
      )}
      aria-labelledby="hero-title"
    >
      {/* Background media layer */}
      {(backgroundVideo || backgroundImage) && (
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          {backgroundVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              // Pause video if reduced motion is preferred
              {...(prefersReducedMotion && { autoPlay: false })}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : backgroundImage ? (
            <Image
              src={backgroundImage}
              alt={backgroundAlt || ''}
              fill
              className="object-cover object-[55%_10%] scale-[1.15] -translate-x-[8%] sm:-translate-x-[8%] md:-translate-x-[9%] lg:-translate-x-[10%]"
              priority
              sizes="100vw"
            />
          ) : null}
          {/* Gradient overlay for text readability - ensures AAA contrast */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-[var(--color-primary-900)]/95 via-[var(--color-primary-900)]/70 to-[var(--color-primary-900)]/50'
            )}
          />
        </div>
      )}

      {/* Decorative diagonal stripe pattern - athletic track lanes aesthetic */}
      <div
        className="absolute inset-0 z-[1] overflow-hidden opacity-[0.07]"
        aria-hidden="true"
      >
        {/* Repeating diagonal stripes */}
        <div
          className={cn(
            'absolute -inset-[50%] rotate-[-15deg]',
            // RTL: flip the rotation
            'rtl:rotate-[15deg]'
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              var(--color-accent-300) 0px,
              var(--color-accent-300) 4px,
              transparent 4px,
              transparent 48px
            )`,
          }}
        />
      </div>

      {/* Decorative geometric shapes - championship medal/finish line motif */}
      <div
        className="absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {/* Large diagonal accent block */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.3
          }}
          className={cn(
            'absolute -bottom-[20%] -end-[10%] h-[80%] w-[50%]',
            'origin-bottom-right skew-x-[-12deg]',
            'rtl:skew-x-[12deg] rtl:origin-bottom-left',
            'bg-gradient-to-t from-[var(--color-accent-500)]/20 to-transparent'
          )}
        />

        {/* Secondary geometric accent */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.5
          }}
          className={cn(
            'absolute -bottom-[10%] start-[5%] h-[60%] w-[3px]',
            'bg-gradient-to-t from-[var(--color-accent-400)] to-transparent',
            'opacity-40'
          )}
        />

        {/* Pulsing dot accent - heartbeat of determination */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={cn(
            'absolute top-[20%] end-[15%] h-3 w-3 rounded-full',
            'bg-[var(--color-accent-400)]',
            'shadow-[0_0_20px_var(--color-accent-400)]'
          )}
        />
      </div>

      {/* Content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={cn(
          'relative z-10',
          'flex min-h-[60vh] flex-col items-start justify-center',
          'px-[var(--space-6)] py-[var(--space-16)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
          'max-w-7xl mx-auto w-full'
        )}
      >
        <motion.div
          variants={subtitleVariants}
          className="mb-[var(--space-6)] flex max-w-4xl flex-wrap gap-3"
        >
          {partnerLogos.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2',
                'backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.14)]'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  'bg-white/14 text-[var(--color-accent-300)]'
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'text-[var(--text-sm)] font-semibold text-white',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {t(`partners.${key}`)}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Animated gold accent line above title */}
        <motion.div
          variants={decorativeLineVariants}
          className={cn(
            'mb-[var(--space-4)] h-1 w-16 origin-start',
            'bg-gradient-to-r from-[var(--color-accent-400)] to-[var(--color-accent-300)]',
            'rtl:origin-end rtl:bg-gradient-to-l',
            'rounded-full'
          )}
          aria-hidden="true"
        />

        {/* Main title */}
        <motion.h1
          id="hero-title"
          variants={titleVariants}
          className={cn(
            // Typography - bold, commanding presence
            'text-[clamp(2.5rem,8vw,5rem)]',
            'font-bold leading-[1.1] tracking-tight',
            'max-w-none sm:max-w-[12ch] lg:max-w-none',
            // Color - white for maximum contrast (15.1:1 against primary-900)
            'text-white',
            // Text shadow for additional depth
            'drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]',
            // Scalable font size support
            'text-[calc(clamp(2.5rem,8vw,5rem)*var(--font-scale))]'
          )}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle with accent styling */}
        <motion.p
          variants={subtitleVariants}
          className={cn(
            // Typography
            'mt-[var(--space-4)] text-[clamp(1.125rem,3vw,1.5rem)]',
            'font-medium leading-relaxed',
            // Color - light blue for hierarchy while maintaining AAA contrast
            'text-[var(--color-primary-100)]',
            // Max width for readability
            'max-w-2xl',
            // Scalable font size
            'text-[calc(clamp(1.125rem,3vw,1.5rem)*var(--font-scale))]'
          )}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={ctaVariants}
          className="mt-[var(--space-8)]"
        >
          <motion.a
            href="#contact"
            whileHover={prefersReducedMotion ? {} : {
              scale: 1.03,
              boxShadow: '0 8px 30px rgba(184, 134, 11, 0.4)'
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className={cn(
              // Base layout
              'group relative inline-flex items-center justify-center',
              'overflow-hidden',
              // Sizing - minimum 44px touch target
              'min-h-[52px] px-[var(--space-8)] py-[var(--space-4)]',
              // Typography
              'text-[var(--text-lg)] font-semibold',
              // Colors - gold accent with dark text for AAA contrast
              'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]',
              // Border radius - pill shape
              'rounded-full',
              // Transitions
              'transition-all duration-[var(--duration-normal)]',
              // Focus states - AAA compliant
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-[var(--focus-ring-offset)]',
              'focus-visible:outline-white',
              // Hover state background
              'hover:bg-[var(--color-accent-400)]',
              // Shadow
              'shadow-[0_4px_20px_rgba(184,134,11,0.3)]'
            )}
          >
            {/* Shimmer effect on hover */}
            <span
              className={cn(
                'absolute inset-0 -translate-x-full skew-x-[-20deg]',
                'bg-gradient-to-r from-transparent via-white/30 to-transparent',
                'transition-transform duration-[var(--duration-slow)]',
                'group-hover:translate-x-full',
                // RTL support
                'rtl:translate-x-full rtl:skew-x-[20deg]',
                'rtl:group-hover:-translate-x-full'
              )}
              aria-hidden="true"
            />

            {/* Button text */}
            <span className="relative z-10">
              {t('cta')}
            </span>

            {/* Arrow icon */}
            <span
              className={cn(
                'relative z-10 ms-[var(--space-2)]',
                'transition-transform duration-[var(--duration-fast)]',
                'group-hover:translate-x-1',
                'rtl:group-hover:-translate-x-1'
              )}
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="rtl:rotate-180"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Bottom decorative element - finish line inspired */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.8,
          }}
          className={cn(
            'absolute bottom-0 start-0 h-1 w-full origin-start',
            'rtl:origin-end',
            'bg-gradient-to-r from-[var(--color-accent-500)] via-[var(--color-accent-300)] to-transparent',
            'rtl:bg-gradient-to-l'
          )}
          aria-hidden="true"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          delay: prefersReducedMotion ? 0 : 1.2,
        }}
        className={cn(
          'absolute bottom-[var(--space-8)] left-1/2 -translate-x-1/2',
          'z-10'
        )}
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : {
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={cn(
            'flex h-10 w-6 items-start justify-center',
            'rounded-full border-2 border-white/40',
            'pt-2'
          )}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : {
              opacity: [1, 0.3, 1],
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 21H20M6 21V7L12 4L18 7V21M9 10H10M14 10H15M9 14H10M14 14H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Hero;
