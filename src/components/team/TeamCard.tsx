'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { PhoneIcon } from '@/src/components/icons';
import type { TeamMember } from '@/src/lib/team';

export interface TeamCardProps {
  /** Team member data */
  member: TeamMember;
  /** Current locale for translations */
  locale: 'he' | 'ar' | 'ru';
  /** Show full bio (for team page) vs tagline (for preview) */
  showFullBio?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Animation index for stagger effects */
  index?: number;
}

/**
 * TeamCard Component - "Victory Lane" Design
 *
 * A distinctive card celebrating Paralympic athletes and coaches with:
 * - Podium-inspired diagonal accent lines
 * - Medal/trophy decorative elements
 * - Dynamic image handling (horizontal & vertical)
 * - Warm, welcoming aesthetic with gold accents
 * - Full WCAG AAA accessibility (7:1+ contrast)
 * - RTL/LTR support
 * - Respectful reduced motion support
 */
export function TeamCard({
  member,
  locale,
  showFullBio = false,
  className,
  index = 0,
}: TeamCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const role = member.role[locale] || member.role.he;
  const bio = showFullBio
    ? (member.tagline[locale] || member.tagline.he)
    : (member.tagline[locale] || member.tagline.he);

  const isVerticalImage = member.imageOrientation === 'vertical';

  // Card entrance animation
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      },
    },
  };

  // Hover state for the whole card
  const hoverVariants: Variants = {
    rest: {
      y: 0,
      boxShadow: '0 4px 20px rgba(10, 37, 64, 0.12), 0 0 0 0 rgba(184, 134, 11, 0)',
    },
    hover: {
      y: prefersReducedMotion ? 0 : -8,
      boxShadow: prefersReducedMotion
        ? '0 4px 20px rgba(10, 37, 64, 0.12), 0 0 0 0 rgba(184, 134, 11, 0)'
        : '0 20px 40px rgba(10, 37, 64, 0.18), 0 0 0 4px rgba(184, 134, 11, 0.3)',
    },
  };

  // Image zoom on hover
  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: prefersReducedMotion ? 1 : 1.06 },
  };

  // Gold accent line animation
  const accentLineVariants: Variants = {
    rest: { scaleX: 0.4, opacity: 0.6 },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Diagonal stripe reveal
  const stripeVariants: Variants = {
    rest: { opacity: 0.08 },
    hover: {
      opacity: 0.15,
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('group', className)}
    >
      <motion.div
        variants={hoverVariants}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        className={cn(
          // Base structure
          'relative overflow-hidden',
          'bg-[var(--background)]',
          // Border with subtle gradient effect
          'border-2 border-[var(--color-primary-200)]',
          // Distinctive asymmetric corners - like a victory podium
          'rounded-[var(--radius-xl)]',
          'rounded-tl-[2rem] rounded-br-[2rem]',
          'rtl:rounded-tl-[var(--radius-xl)] rtl:rounded-tr-[2rem]',
          'rtl:rounded-br-[var(--radius-xl)] rtl:rounded-bl-[2rem]',
          // Focus states for accessibility
          'focus-within:outline-none',
          'focus-within:ring-[var(--focus-ring-width)]',
          'focus-within:ring-[var(--focus-ring-color)]',
          'focus-within:ring-offset-[var(--focus-ring-offset)]',
          'focus-within:ring-offset-[var(--background)]',
          // Transitions
          'transition-colors duration-[var(--duration-normal)]',
          // High contrast mode
          '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]'
        )}
      >
        {/* Decorative diagonal stripes - athletic track lanes */}
        <motion.div
          variants={stripeVariants}
          className={cn(
            'absolute inset-0 z-0 overflow-hidden pointer-events-none'
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'absolute -inset-[100%] rotate-[-12deg]',
              'rtl:rotate-[12deg]'
            )}
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                var(--color-accent-300) 0px,
                var(--color-accent-300) 2px,
                transparent 2px,
                transparent 24px
              )`,
            }}
          />
        </motion.div>

        {/* Top gold accent line - the "finish line" */}
        <motion.div
          variants={accentLineVariants}
          className={cn(
            'absolute top-0 inset-x-0 h-1.5 origin-start',
            'rtl:origin-end',
            'bg-gradient-to-r from-[var(--color-accent-500)] via-[var(--color-accent-400)] to-[var(--color-accent-300)]',
            'rtl:bg-gradient-to-l'
          )}
          aria-hidden="true"
        />

        {/* Decorative corner medal */}
        <div
          className={cn(
            'absolute -top-3 -end-3 z-20',
            'w-12 h-12 opacity-0 group-hover:opacity-100',
            'transition-opacity duration-[var(--duration-normal)]'
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'w-full h-full rounded-full',
              'bg-gradient-to-br from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
              'shadow-lg shadow-[var(--color-accent-500)]/30',
              'flex items-center justify-center',
              'transform rotate-12'
            )}
          >
            <MedalStarIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Image section - handles both orientations */}
        <div
          className={cn(
            'relative overflow-hidden',
            // Different aspect ratios for different orientations
            isVerticalImage ? 'aspect-[3/4]' : 'aspect-[4/3]',
            // Gradient background as placeholder
            'bg-gradient-to-br from-[var(--color-primary-100)] via-[var(--color-primary-50)] to-[var(--color-primary-200)]'
          )}
        >
          {member.image ? (
            <motion.div
              variants={imageVariants}
              className="h-full w-full"
            >
              <Image
                src={member.image}
                alt=""
                fill
                className={cn(
                  'object-cover',
                  // Subtle vignette effect
                  'brightness-[1.02]'
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            // Placeholder with athlete silhouette
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]'
              )}
            >
              <AthleteIcon className="w-28 h-28 text-[var(--color-primary-300)]" />
            </div>
          )}

          {/* Gradient overlay for text contrast */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-[var(--color-primary-900)]/60 via-transparent to-transparent',
              'group-hover:from-[var(--color-primary-900)]/70',
              'transition-all duration-[var(--duration-normal)]'
            )}
            aria-hidden="true"
          />

          {/* Floating role badge */}
          <div
            className={cn(
              'absolute bottom-3 start-3 end-3',
              'flex items-center gap-2'
            )}
          >
            <span
              className={cn(
                'inline-flex items-center',
                'px-3 py-1.5 rounded-full',
                'bg-[var(--color-accent-500)]/95 backdrop-blur-sm',
                'text-[var(--color-primary-900)] font-semibold',
                'text-[calc(var(--text-xs)*var(--font-scale))]',
                'shadow-md shadow-[var(--color-accent-700)]/30',
                'border border-[var(--color-accent-400)]'
              )}
            >
              {role}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className={cn('relative z-10 p-5')}>
          {/* Name with underline accent */}
          <div className="mb-3">
            <h3
              className={cn(
                'text-[calc(var(--text-xl)*var(--font-scale))]',
                'font-bold leading-tight',
                'text-[var(--foreground)]',
                'mb-1'
              )}
            >
              {member.name}
            </h3>

            {/* Decorative gold underline */}
            <div
              className={cn(
                'h-0.5 w-12 rounded-full',
                'bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-300)]',
                'transition-all duration-[var(--duration-normal)]',
                'group-hover:w-20'
              )}
              aria-hidden="true"
            />
          </div>

          {/* Bio/Tagline */}
          <p
            className={cn(
              'text-[calc(var(--text-sm)*var(--font-scale))]',
              'text-[var(--color-primary-700)]',
              'leading-relaxed',
              showFullBio ? '' : 'line-clamp-2',
              'mb-4',
              // High contrast
              '[data-contrast="high"]_&:text-[var(--foreground)]'
            )}
          >
            {bio}
          </p>

          {/* Phone contact - prominent and accessible */}
          {member.phone && (
            <a
              href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
              className={cn(
                'group/phone inline-flex items-center gap-2',
                // Accessible touch target
                'min-h-[44px] py-2 px-4 -mx-4',
                // Styling
                'text-[calc(var(--text-base)*var(--font-scale))]',
                'font-semibold',
                'text-[var(--color-primary-700)]',
                // Hover state
                'hover:text-[var(--color-accent-700)]',
                // Underline effect
                'relative',
                // Focus state
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--focus-ring-color)]',
                'focus-visible:ring-offset-2',
                'rounded-[var(--radius-md)]',
                // Transition
                'transition-colors duration-[var(--duration-fast)]',
                // High contrast
                '[data-contrast="high"]_&:text-[var(--foreground)]',
                '[data-contrast="high"]_&:underline'
              )}
              dir="ltr"
            >
              <PhoneIcon
                className={cn(
                  'w-5 h-5 flex-shrink-0',
                  'transition-transform duration-[var(--duration-fast)]',
                  'group-hover/phone:scale-110'
                )}
              />
              <span className="tracking-wider">{member.phone}</span>
            </a>
          )}
        </div>

        {/* Bottom decorative element - podium steps */}
        <div
          className={cn(
            'absolute bottom-0 start-0 end-0',
            'flex justify-center gap-1 pb-2',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-[var(--duration-normal)]'
          )}
          aria-hidden="true"
        >
          <div className="h-1 w-4 rounded-full bg-[var(--color-accent-300)]" />
          <div className="h-1 w-8 rounded-full bg-[var(--color-accent-500)]" />
          <div className="h-1 w-4 rounded-full bg-[var(--color-accent-300)]" />
        </div>
      </motion.div>
    </motion.article>
  );
}

/**
 * Medal star icon for decorative corner
 */
function MedalStarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Athlete placeholder icon
 */
function AthleteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="12" cy="5" r="3" fill="currentColor" opacity="0.4" />
      {/* Body in dynamic pose */}
      <path
        d="M12 8C12 8 8 10 7 14C6 18 8 20 8 20M12 8C12 8 16 10 17 14C18 18 16 20 16 20M12 8V14M9 12H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      {/* Arms raised in victory */}
      <path
        d="M7 10L5 6M17 10L19 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export default TeamCard;
