'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { TrophyIcon, MedalIcon } from '@/src/components/icons';
import {
  getFeaturedTeamMembers,
  getTeamMemberRole,
  getTeamMemberTagline,
  type TeamMember,
} from '@/src/lib/team';

export interface TeamPreviewProps {
  /** Section title override */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show section title */
  showTitle?: boolean;
  /** Maximum number of team members to display */
  limit?: number;
}

/**
 * TeamPreview Component
 *
 * A distinctive, accessible section showcasing featured team members.
 * Features:
 * - Podium-inspired layout with the main coach elevated
 * - Trophy/medal decorative accents
 * - Diagonal racing stripe patterns
 * - Staggered reveal animations
 * - Full RTL support
 * - WCAG AAA compliant (7:1+ contrast)
 * - Reduced motion support
 */
export function TeamPreview({
  title,
  className,
  showTitle = true,
  limit = 4,
}: TeamPreviewProps) {
  const t = useTranslations('team');
  const locale = useLocale() as 'he' | 'ar' | 'ru';
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const teamMembers = getFeaturedTeamMembers(limit);
  const sectionTitle = title || t('title');

  // Section container animation
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  // Title animation with slight slide
  const titleVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 },
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

  // Gold accent line animation
  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  // Card animation with stagger
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
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

  return (
    <section
      ref={sectionRef}
      id="team-preview"
      aria-labelledby="team-preview-title"
      className={cn(
        // Section padding
        'py-[var(--space-16)] px-[var(--space-6)]',
        'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
        // Background - darker for contrast with light cards
        'relative overflow-hidden',
        'bg-gradient-to-b from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-900)]',
        className
      )}
    >
      {/* Decorative background - diagonal racing stripes */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden',
          'opacity-[0.04]'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -inset-[50%] rotate-[-8deg]',
            'rtl:rotate-[8deg]'
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              var(--color-accent-300) 0px,
              var(--color-accent-300) 3px,
              transparent 3px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* Decorative podium shape - subtle gold accent */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 0.08, y: 0 } : {}}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2',
          'w-[120%] h-[40%]',
          'bg-gradient-to-t from-[var(--color-accent-500)] to-transparent',
          'clip-path-podium'
        )}
        style={{
          clipPath: 'polygon(20% 100%, 80% 100%, 95% 0%, 5% 0%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative corner medals */}
      <div className="absolute top-8 start-8 opacity-20" aria-hidden="true">
        <MedalIcon className="w-12 h-12 text-[var(--color-accent-400)]" />
      </div>
      <div className="absolute bottom-8 end-8 opacity-20 rotate-12" aria-hidden="true">
        <MedalIcon className="w-10 h-10 text-[var(--color-accent-300)]" />
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
            {/* Decorative element - trophy inspired */}
            <div
              className={cn(
                'flex items-center justify-center gap-4 mb-[var(--space-4)]'
              )}
              aria-hidden="true"
            >
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-12 origin-end rtl:origin-start',
                  'bg-gradient-to-l from-[var(--color-accent-400)] to-transparent',
                  'rtl:bg-gradient-to-r'
                )}
              />
              {/* Trophy icon */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                className={cn(
                  'w-10 h-10 rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
                  'shadow-lg shadow-[var(--color-accent-500)]/40',
                  'flex items-center justify-center'
                )}
              >
                <TrophyIcon className="w-5 h-5 text-white" />
              </motion.div>
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-12 origin-start rtl:origin-end',
                  'bg-gradient-to-r from-[var(--color-accent-400)] to-transparent',
                  'rtl:bg-gradient-to-l'
                )}
              />
            </div>

            {/* Section title */}
            <motion.h2
              id="team-preview-title"
              variants={titleVariants}
              className={cn(
                'text-[clamp(1.75rem,5vw,2.5rem)]',
                'font-bold tracking-tight',
                'text-white',
                // Scalable font
                'text-[calc(clamp(1.75rem,5vw,2.5rem)*var(--font-scale))]'
              )}
            >
              {sectionTitle}
            </motion.h2>

            {/* Decorative underline - podium steps inspired */}
            <div className="flex justify-center gap-1 mt-[var(--space-4)]" aria-hidden="true">
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-6 rounded-full',
                  'bg-[var(--color-accent-300)]'
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-12 rounded-full',
                  'bg-[var(--color-accent-500)]'
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-6 rounded-full',
                  'bg-[var(--color-accent-300)]'
                )}
              />
            </div>
          </div>
        )}

        {/* Team members grid */}
        <div
          className={cn(
            'grid gap-6 md:gap-8',
            // Responsive: 1 -> 2 -> 4 columns
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          )}
          role="list"
          aria-label={sectionTitle}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              locale={locale}
              index={index}
              variants={cardVariants}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* View all team CTA */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.6,
          }}
          className="mt-[var(--space-12)] text-center"
        >
          <Link
            href="/team"
            className={cn(
              'group relative inline-flex items-center justify-center',
              'overflow-hidden',
              // Sizing - minimum 44px touch target
              'min-h-[52px] px-[var(--space-8)] py-[var(--space-4)]',
              // Typography
              'text-[var(--text-lg)] font-semibold',
              // Colors - gold accent with dark text
              'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]',
              // Border radius
              'rounded-full',
              // Transitions
              'transition-all duration-[var(--duration-normal)]',
              // Focus states - AAA compliant
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-[var(--focus-ring-offset)]',
              'focus-visible:outline-white',
              // Hover
              'hover:bg-[var(--color-accent-400)]',
              // Shadow
              'shadow-[0_4px_20px_rgba(184,134,11,0.3)]'
            )}
          >
            {/* Shimmer effect */}
            <span
              className={cn(
                'absolute inset-0 -translate-x-full skew-x-[-20deg]',
                'bg-gradient-to-r from-transparent via-white/30 to-transparent',
                'transition-transform duration-[var(--duration-slow)]',
                'group-hover:translate-x-full',
                'rtl:translate-x-full rtl:skew-x-[20deg]',
                'rtl:group-hover:-translate-x-full'
              )}
              aria-hidden="true"
            />
            <span className="relative z-10">{t('viewAll')}</span>
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
          </Link>
        </motion.div>

        {/* Bottom decorative finish line */}
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
            'bg-gradient-to-r from-transparent via-[var(--color-accent-400)] to-transparent'
          )}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

/**
 * Individual team member card component
 */
interface TeamMemberCardProps {
  member: TeamMember;
  locale: 'he' | 'ar' | 'ru';
  index: number;
  variants: Variants;
  prefersReducedMotion: boolean;
}

function TeamMemberCard({
  member,
  locale,
  index,
  variants,
  prefersReducedMotion,
}: TeamMemberCardProps) {
  const role = getTeamMemberRole(member, locale);
  const tagline = getTeamMemberTagline(member, locale);

  // Hover animation for card
  const hoverVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.02,
      y: prefersReducedMotion ? 0 : -6,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(184, 134, 11, 0.2)',
    },
  };

  // Image reveal animation
  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: prefersReducedMotion ? 1 : 1.08 },
  };

  // Gold accent line animation
  const accentVariants: Variants = {
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

  return (
    <motion.article
      variants={variants}
     
      className={cn(
        'group',
        // Podium effect - elevate certain cards on larger screens
        index === 0 && 'lg:mt-0',
        index === 1 && 'lg:-mt-4',
        index === 2 && 'lg:-mt-4',
        index === 3 && 'lg:mt-0'
      )}
    >
      <motion.div
        variants={hoverVariants}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        className={cn(
          // Card base
          'relative overflow-hidden',
          'bg-[var(--background)]',
          'border border-[var(--color-primary-200)]',
          // Rounded corners - asymmetric diagonal cut
          'rounded-[var(--radius-xl)] rounded-tr-[2rem]',
          'rtl:rounded-tr-[var(--radius-xl)] rtl:rounded-tl-[2rem]',
          // Focus styles
          'focus-within:outline-none',
          'focus-within:ring-[var(--focus-ring-width)]',
          'focus-within:ring-[var(--focus-ring-color)]',
          'focus-within:ring-offset-[var(--focus-ring-offset)]',
          // Transition
          'transition-colors duration-[var(--duration-normal)]',
          // High contrast mode
          '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]'
        )}
      >
        {/* Top accent line - race start indicator */}
        <motion.div
          variants={accentVariants}
          className={cn(
            'absolute top-0 start-0 h-1 w-full origin-start',
            'rtl:origin-end',
            'bg-gradient-to-r from-[var(--color-accent-500)] via-[var(--color-accent-400)] to-transparent',
            'rtl:bg-gradient-to-l'
          )}
          aria-hidden="true"
        />

        {/* Diagonal corner decoration */}
        <div
          className={cn(
            'absolute -top-6 -end-6 w-24 h-24',
            'bg-gradient-to-bl from-[var(--color-accent-400)]/15 to-transparent',
            'rotate-45 rtl:-rotate-45',
            'transition-opacity duration-[var(--duration-normal)]',
            'group-hover:opacity-100 opacity-40'
          )}
          aria-hidden="true"
        />

        {/* Image container */}
        <div
          className={cn(
            'relative aspect-[4/5] overflow-hidden',
            'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]'
          )}
        >
          {member.image ? (
            <motion.div variants={imageVariants} className="h-full w-full">
              <Image
                src={member.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          ) : (
            // Placeholder silhouette
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'bg-gradient-to-br from-[var(--color-primary-200)] to-[var(--color-primary-300)]'
              )}
            >
              <PersonIcon className="w-24 h-24 text-[var(--color-primary-400)]" />
            </div>
          )}

          {/* Gradient overlay for text contrast */}
          <div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-[var(--color-primary-900)]/70 via-transparent to-transparent'
            )}
            aria-hidden="true"
          />

          {/* Position badge - like athlete numbers */}
          <div
            className={cn(
              'absolute top-3 start-3',
              'flex items-center justify-center',
              'w-9 h-9 rounded-lg',
              'bg-gradient-to-br from-[var(--color-accent-400)] to-[var(--color-accent-600)]',
              'text-white font-bold text-sm',
              'shadow-md'
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content section */}
        <div className="p-5">
          {/* Name */}
          <h3
            className={cn(
              'text-[var(--text-lg)] font-bold',
              'text-[var(--foreground)]',
              'leading-tight mb-1',
              'text-[calc(var(--text-lg)*var(--font-scale))]'
            )}
          >
            {member.name}
          </h3>

          {/* Role with accent */}
          <p
            className={cn(
              'text-[var(--text-sm)] font-semibold',
              'text-[var(--color-accent-600)]',
              'mb-2',
              'text-[calc(var(--text-sm)*var(--font-scale))]'
            )}
          >
            {role}
          </p>

          {/* Gold accent line */}
          <div
            className={cn(
              'h-0.5 w-10 rounded-full mb-3',
              'bg-gradient-to-r from-[var(--color-accent-500)] to-[var(--color-accent-300)]',
              'transition-all duration-[var(--duration-normal)]',
              'group-hover:w-16'
            )}
            aria-hidden="true"
          />

          {/* Tagline */}
          <p
            className={cn(
              'text-[var(--text-sm)]',
              'text-[var(--color-primary-700)]',
              'leading-relaxed',
              'line-clamp-2',
              'text-[calc(var(--text-sm)*var(--font-scale))]'
            )}
          >
            {tagline}
          </p>
        </div>

        {/* Bottom accent bar */}
        <div
          className={cn(
            'absolute bottom-0 start-0 end-0 h-1',
            'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-[var(--duration-normal)]'
          )}
          aria-hidden="true"
        />
      </motion.div>
    </motion.article>
  );
}

/**
 * Person placeholder icon
 */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.4" />
      <path
        d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

export default TeamPreview;
