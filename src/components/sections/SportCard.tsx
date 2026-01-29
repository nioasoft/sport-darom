'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import type { Sport } from '@/src/lib/sports';
import { getSportImage, getImageAlt } from '@/src/lib/images';

export interface SportCardProps {
  /** Sport data */
  sport: Sport;
  /** Card index for staggered animations */
  index?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SportCard Component
 *
 * A distinctive, accessible card for displaying Paralympic sports.
 * Features:
 * - Dynamic diagonal cut design inspired by athletic tracks
 * - Sport-specific accent colors via HSL
 * - Gold medal reveal animation on hover
 * - Full RTL support
 * - WCAG AAA compliant (7:1+ contrast)
 * - Reduced motion support
 */
export function SportCard({ sport, index = 0, className }: SportCardProps) {
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'he' | 'ar' | 'ru';
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [imageError, setImageError] = useState(false);

  // Get localized sport name
  const sportName = sport.names[locale] || sport.names.he;

  // Get image configuration with localized alt text
  const imageConfig = getSportImage(sport.slug);
  const imageAlt = imageConfig ? getImageAlt(imageConfig, locale) : sportName;

  // Build sport-specific accent color (darker shade for AAA contrast)
  const accentColor = `hsl(${sport.accentHue}, 70%, 35%)`;
  const accentColorLight = `hsl(${sport.accentHue}, 60%, 50%)`;
  const accentColorGlow = `hsl(${sport.accentHue}, 80%, 60%)`;

  // Card entrance animation variants
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: 60,
          rotateX: -15,
        },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      },
    },
  };

  // Hover animation (scale + lift)
  const hoverVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.03,
      y: prefersReducedMotion ? 0 : -8,
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px ${accentColorGlow}40`,
    },
  };

  // Racing lane indicator animation
  const laneVariants: Variants = {
    rest: { scaleX: 0, opacity: 0 },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Medal shine animation
  const shineVariants: Variants = {
    rest: { x: '-100%', opacity: 0 },
    hover: {
      x: '200%',
      opacity: [0, 0.8, 0],
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeInOut',
      },
    },
  };

  // Arrow animation
  const arrowVariants: Variants = {
    rest: { x: 0, opacity: 0.7 },
    hover: {
      x: prefersReducedMotion ? 0 : 6,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('perspective-[1000px]', className)}
    >
      <Link
        ref={cardRef}
        href={`/${locale}/sports/${sport.slug}`}
        className="block outline-none group"
        aria-label={`${sportName} - ${tCommon('learnMore')}`}
      >
        <motion.article
          variants={hoverVariants}
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          className={cn(
            // Base layout
            'relative overflow-hidden',
            'flex flex-col',
            'min-h-[280px] sm:min-h-[320px]',
            // Background with diagonal cut
            'bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--color-primary-50)]',
            // Border with sport accent
            'border-2 border-[var(--color-primary-200)]',
            // Rounded corners - asymmetric for dynamism
            'rounded-[var(--radius-xl)] rounded-tr-[2rem]',
            'rtl:rounded-tr-[var(--radius-xl)] rtl:rounded-tl-[2rem]',
            // Focus styles - AAA compliant
            'focus-visible:outline-none',
            'focus-visible:ring-[var(--focus-ring-width)]',
            'focus-visible:ring-[var(--focus-ring-color)]',
            'focus-visible:ring-offset-[var(--focus-ring-offset)]',
            // Transition
            'transition-colors duration-[var(--duration-normal)]',
            // High contrast mode
            '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]'
          )}
          style={{
            // Dynamic border accent on hover via CSS custom property
            ['--card-accent' as string]: accentColor,
            ['--card-accent-light' as string]: accentColorLight,
          }}
        >
          {/* Racing lane indicator - animates on hover */}
          <motion.div
            variants={laneVariants}
            className={cn(
              'absolute top-0 start-0 h-1 w-full origin-start',
              'rtl:origin-end',
              'bg-gradient-to-r from-[var(--card-accent)] via-[var(--color-accent-500)] to-transparent',
              'rtl:bg-gradient-to-l'
            )}
            aria-hidden="true"
          />

          {/* Diagonal decorative corner */}
          <div
            className={cn(
              'absolute -top-10 -end-10 w-32 h-32',
              'bg-gradient-to-bl from-[var(--card-accent-light)]/20 to-transparent',
              'rotate-45',
              'rtl:-rotate-45',
              'transition-opacity duration-[var(--duration-normal)]',
              'group-hover:opacity-100 opacity-50'
            )}
            aria-hidden="true"
          />

          {/* Image container with diagonal clip */}
          <div
            className={cn(
              'relative h-40 sm:h-48 overflow-hidden',
              'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]'
            )}
          >
            {/* Sport image with fallback to icon */}
            {!imageError ? (
              <Image
                src={`/images/sports/${sport.slug}.webp`}
                alt={imageAlt}
                fill
                className={cn(
                  'object-cover',
                  'transition-transform duration-[var(--duration-slow)]',
                  'group-hover:scale-110'
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Fallback: Sport icon with gradient background */
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'bg-gradient-to-br'
                )}
                style={{
                  background: `linear-gradient(135deg, hsl(${sport.accentHue}, 40%, 85%), hsl(${sport.accentHue}, 50%, 75%))`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/icons/${sport.slug}.svg`}
                  alt=""
                  className="w-24 h-24 opacity-40"
                  style={{ color: accentColor }}
                />
              </div>
            )}

            {/* Gradient overlay for text readability */}
            <div
              className={cn(
                'absolute inset-0',
                'bg-gradient-to-t from-[var(--color-primary-900)]/60 via-transparent to-transparent'
              )}
              aria-hidden="true"
            />

            {/* Shine effect on hover */}
            <motion.div
              variants={shineVariants}
              className={cn(
                'absolute inset-0 w-1/2',
                'bg-gradient-to-r from-transparent via-white/30 to-transparent',
                '-skew-x-12'
              )}
              aria-hidden="true"
            />

            {/* Sport number badge - like athlete bib numbers */}
            <div
              className={cn(
                'absolute top-3 start-3',
                'flex items-center justify-center',
                'w-10 h-10 rounded-lg',
                'text-white font-bold text-lg',
                'shadow-lg'
              )}
              style={{ backgroundColor: accentColor }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            {/* Sport name with accent underline */}
            <div>
              <h2
                className={cn(
                  'text-[var(--text-xl)] font-bold',
                  'text-[var(--foreground)]',
                  'leading-tight mb-2',
                  // Scalable text
                  'text-[calc(var(--text-xl)*var(--font-scale))]'
                )}
              >
                {sportName}
              </h2>

              {/* Decorative accent line under title */}
              <div
                className={cn(
                  'h-0.5 w-12 rounded-full mb-3',
                  'transition-all duration-[var(--duration-normal)]',
                  'group-hover:w-20'
                )}
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
            </div>

            {/* Call to action */}
            <div
              className={cn(
                'flex items-center gap-2',
                'text-[var(--text-sm)] font-semibold',
                'transition-colors duration-[var(--duration-fast)]'
              )}
              style={{ color: accentColor }}
            >
              <span>{tCommon('learnMore')}</span>
              <motion.span
                variants={arrowVariants}
                className="rtl:rotate-180 inline-block"
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </div>
          </div>

          {/* Bottom accent bar - finish line inspired */}
          <div
            className={cn(
              'absolute bottom-0 start-0 end-0 h-1',
              'bg-gradient-to-r from-transparent via-[var(--card-accent)] to-transparent',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-[var(--duration-normal)]'
            )}
            aria-hidden="true"
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default SportCard;
