'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

export interface Achievement {
  id: string;
  year: string;
  titleKey: string;
  descriptionKey: string;
  type: 'gold' | 'silver' | 'bronze' | 'milestone';
  icon?: 'medal' | 'flag' | 'star' | 'trophy';
}

export interface AchievementsSectionProps {
  /** Section title override */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show section title */
  showTitle?: boolean;
  /** Custom achievements data */
  achievements?: Achievement[];
}

// Default achievements data
const defaultAchievements: Achievement[] = [
  {
    id: 'goalball-european-2019',
    year: '2019',
    titleKey: 'goalballEuropean',
    descriptionKey: 'goalballEuropeanDesc',
    type: 'silver',
    icon: 'medal',
  },
  {
    id: 'paris-2024',
    year: '2024',
    titleKey: 'paris2024',
    descriptionKey: 'paris2024Desc',
    type: 'silver',
    icon: 'medal',
  },
  {
    id: 'national-champions',
    year: '2023',
    titleKey: 'nationalChampions',
    descriptionKey: 'nationalChampionsDesc',
    type: 'gold',
    icon: 'trophy',
  },
  {
    id: 'international-reps',
    year: '2014-2024',
    titleKey: 'internationalReps',
    descriptionKey: 'internationalRepsDesc',
    type: 'gold',
    icon: 'flag',
  },
  {
    id: 'community-growth',
    year: '2024',
    titleKey: 'communityGrowth',
    descriptionKey: 'communityGrowthDesc',
    type: 'milestone',
    icon: 'star',
  },
  {
    id: 'personal-growth',
    year: '',
    titleKey: 'personalGrowth',
    descriptionKey: 'personalGrowthDesc',
    type: 'milestone',
    icon: 'star',
  },
];

/**
 * AchievementsSection Component
 *
 * A distinctive, accessible section showcasing Paralympic achievements.
 * Features:
 * - Podium-inspired cascading card layout
 * - Olympic ring decorative motifs
 * - Medal-themed color coding (gold/silver/bronze)
 * - Dramatic staggered reveal animations
 * - Full RTL support
 * - WCAG AAA compliant (7:1+ contrast)
 * - Reduced motion support
 */
export function AchievementsSection({
  title,
  className,
  showTitle = true,
  achievements = defaultAchievements,
}: AchievementsSectionProps) {
  const t = useTranslations('achievements');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const sectionTitle = title || t('title');

  // Section container animation
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  // Title animation with dramatic entrance
  const titleVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -30, scale: 0.95 },
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

  // Decorative line animation
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

  // Card animation with podium-style stagger
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 60, scale: 0.9, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  // Floating Olympic rings animation
  const ringsVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 0.15,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.5,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-labelledby="achievements-title"
      className={cn(
        // Section padding
        'py-[var(--space-20)] px-[var(--space-6)]',
        'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
        // Background - light with subtle warmth for contrast with dark cards
        'relative overflow-hidden',
        'bg-gradient-to-b from-[var(--background)] via-[var(--color-primary-50)] to-[var(--background)]',
        className
      )}
    >
      {/* Decorative background - championship track lanes */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden',
          'opacity-[0.03]'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute inset-0',
            'bg-[repeating-linear-gradient(0deg,var(--color-primary-900)_0px,var(--color-primary-900)_2px,transparent_2px,transparent_80px)]'
          )}
        />
      </div>

      {/* Decorative Olympic rings - floating in background */}
      <motion.div
        variants={ringsVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="absolute top-[15%] end-[5%] z-0"
        aria-hidden="true"
      >
        <OlympicRingsIcon className="w-48 h-24 md:w-64 md:h-32 opacity-60" />
      </motion.div>

      {/* Secondary floating rings */}
      <motion.div
        variants={ringsVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="absolute bottom-[10%] start-[3%] z-0 rotate-12"
        aria-hidden="true"
      >
        <OlympicRingsIcon className="w-32 h-16 opacity-40" />
      </motion.div>

      {/* Decorative corner laurels */}
      <div className="absolute top-12 start-8 opacity-10" aria-hidden="true">
        <LaurelIcon className="w-16 h-16 text-[var(--color-accent-600)]" />
      </div>
      <div className="absolute bottom-12 end-8 opacity-10 rotate-180" aria-hidden="true">
        <LaurelIcon className="w-14 h-14 text-[var(--color-accent-500)]" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section header */}
        {showTitle && (
          <div className="mb-[var(--space-16)] text-center">
            {/* Decorative element - podium inspired */}
            <div
              className={cn(
                'flex items-center justify-center gap-4 mb-[var(--space-6)]'
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
              {/* Central medal icon */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, rotate: -360 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 15,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                className={cn(
                  'w-14 h-14 rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
                  'shadow-xl shadow-[var(--color-accent-500)]/30',
                  'flex items-center justify-center',
                  'ring-4 ring-[var(--color-accent-200)]'
                )}
              >
                <StarBurstIcon className="w-7 h-7 text-white" />
              </motion.div>
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
              id="achievements-title"
              variants={titleVariants}
              className={cn(
                'text-[clamp(2rem,6vw,3rem)]',
                'font-bold tracking-tight',
                'text-[var(--color-primary-900)]',
                // Scalable font
                'text-[calc(clamp(2rem,6vw,3rem)*var(--font-scale))]'
              )}
            >
              {sectionTitle}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={titleVariants}
              className={cn(
                'mt-[var(--space-4)] text-[var(--text-lg)]',
                'text-[var(--color-primary-700)]',
                'max-w-2xl mx-auto',
                'text-[calc(var(--text-lg)*var(--font-scale))]'
              )}
            >
              {t('subtitle')}
            </motion.p>

            {/* Decorative underline - three-step podium */}
            <div className="flex justify-center items-end gap-1 mt-[var(--space-6)]" aria-hidden="true">
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-2 w-8 rounded-t-sm',
                  'bg-gradient-to-t from-[#CD7F32] to-[#D99052]' // Bronze
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-4 w-10 rounded-t-sm',
                  'bg-gradient-to-t from-[var(--color-accent-600)] to-[var(--color-accent-400)]' // Gold
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-3 w-8 rounded-t-sm',
                  'bg-gradient-to-t from-[#A0A0A0] to-[#C0C0C0]' // Silver
                )}
              />
            </div>
          </div>
        )}

        {/* Achievements grid - podium-inspired layout */}
        <div
          className={cn(
            'grid gap-6 md:gap-8',
            // Responsive: 1 -> 2 columns
            'grid-cols-1 md:grid-cols-2'
          )}
          role="list"
          aria-label={sectionTitle}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
              variants={cardVariants}
              prefersReducedMotion={prefersReducedMotion}
              t={t}
            />
          ))}
        </div>

        {/* Bottom decorative element - victory lap finish line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.9,
          }}
          className={cn(
            'mt-[var(--space-16)] h-1 mx-auto max-w-lg',
            'rounded-full origin-center',
            'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
          )}
          aria-hidden="true"
        />

        {/* Checkered flag accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 1.1,
          }}
          className="flex justify-center mt-[var(--space-6)]"
          aria-hidden="true"
        >
          <CheckeredFlagIcon className="w-8 h-8 text-[var(--color-primary-400)] opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Individual achievement card component
 */
interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  variants: Variants;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'achievements'>>;
}

function AchievementCard({
  achievement,
  index,
  variants,
  prefersReducedMotion,
  t,
}: AchievementCardProps) {
  // Medal color schemes
  const medalColors = {
    gold: {
      bg: 'bg-gradient-to-br from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
      border: 'border-[var(--color-accent-400)]',
      shadow: 'shadow-[var(--color-accent-500)]/30',
      yearBg: 'bg-[var(--color-accent-600)]',
      iconBg: 'from-[var(--color-accent-300)] to-[var(--color-accent-600)]',
    },
    silver: {
      bg: 'bg-gradient-to-br from-[#C0C0C0] via-[#A8A8A8] to-[#808080]',
      border: 'border-[#B0B0B0]',
      shadow: 'shadow-[#A0A0A0]/30',
      yearBg: 'bg-[#707070]',
      iconBg: 'from-[#D0D0D0] to-[#909090]',
    },
    bronze: {
      bg: 'bg-gradient-to-br from-[#D99052] via-[#CD7F32] to-[#8B5A2B]',
      border: 'border-[#CD7F32]',
      shadow: 'shadow-[#CD7F32]/30',
      yearBg: 'bg-[#8B5A2B]',
      iconBg: 'from-[#D99052] to-[#8B5A2B]',
    },
    milestone: {
      bg: 'bg-gradient-to-br from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-900)]',
      border: 'border-[var(--color-primary-500)]',
      shadow: 'shadow-[var(--color-primary-500)]/30',
      yearBg: 'bg-[var(--color-primary-800)]',
      iconBg: 'from-[var(--color-primary-400)] to-[var(--color-primary-700)]',
    },
  };

  const colors = medalColors[achievement.type];

  // Hover animation
  const hoverVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.02,
      y: prefersReducedMotion ? 0 : -8,
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 0 40px rgba(184, 134, 11, 0.15)',
    },
  };

  // Medal icon shine animation
  const shineVariants: Variants = {
    rest: { x: '-100%', opacity: 0 },
    hover: {
      x: '200%',
      opacity: [0, 1, 0],
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.article
      variants={variants}
     
      className={cn(
        'group',
        // Podium-style offset for visual interest
        index === 0 && 'md:mt-0',
        index === 1 && 'md:mt-8',
        index === 2 && 'md:mt-4',
        index === 3 && 'md:mt-12'
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
          'border-2',
          colors.border,
          // Rounded corners - championship banner style
          'rounded-[var(--radius-xl)]',
          // Focus styles
          'focus-within:outline-none',
          'focus-within:ring-[var(--focus-ring-width)]',
          'focus-within:ring-[var(--focus-ring-color)]',
          'focus-within:ring-offset-[var(--focus-ring-offset)]',
          // Shadow
          'shadow-lg',
          colors.shadow,
          // Transition
          'transition-all duration-[var(--duration-normal)]'
        )}
      >
        {/* Top medal ribbon accent */}
        <div
          className={cn(
            'absolute top-0 start-0 end-0 h-2',
            colors.bg
          )}
          aria-hidden="true"
        />

        {/* Diagonal corner ribbon */}
        <div
          className={cn(
            'absolute -top-1 -end-1 w-20 h-20',
            'overflow-hidden'
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'absolute top-4 -end-8 w-32 h-6',
              'rotate-45 rtl:-rotate-45',
              colors.bg,
              'flex items-center justify-center',
              'text-white text-xs font-bold tracking-wider'
            )}
          >
            {achievement.year}
          </div>
        </div>

        {/* Content container */}
        <div className="p-6 pt-8">
          {/* Icon and title row */}
          <div className="flex items-start gap-4">
            {/* Medal icon */}
            <motion.div
              className={cn(
                'relative flex-shrink-0',
                'w-14 h-14 rounded-full',
                `bg-gradient-to-br ${colors.iconBg}`,
                'shadow-lg',
                'flex items-center justify-center',
                'overflow-hidden'
              )}
            >
              {/* Shine effect */}
              <motion.div
                variants={shineVariants}
                className={cn(
                  'absolute inset-0',
                  'bg-gradient-to-r from-transparent via-white/40 to-transparent',
                  'skew-x-[-20deg]'
                )}
                aria-hidden="true"
              />
              {renderAchievementIcon(achievement.icon)}
            </motion.div>

            {/* Title and description */}
            <div className="flex-1 min-w-0">
              {/* Year badge - mobile visible */}
              <div
                className={cn(
                  'inline-block md:hidden mb-2',
                  'px-3 py-1 rounded-full',
                  colors.yearBg,
                  'text-white text-xs font-bold'
                )}
              >
                {achievement.year}
              </div>

              {/* Title */}
              <h3
                className={cn(
                  'text-[var(--text-xl)] font-bold',
                  'text-[var(--color-primary-900)]',
                  'leading-tight mb-2',
                  'text-[calc(var(--text-xl)*var(--font-scale))]'
                )}
              >
                {t(achievement.titleKey)}
              </h3>

              {/* Gold accent line */}
              <div
                className={cn(
                  'h-0.5 w-12 rounded-full mb-3',
                  colors.bg,
                  'transition-all duration-[var(--duration-normal)]',
                  'group-hover:w-20'
                )}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                className={cn(
                  'text-[var(--text-base)]',
                  'text-[var(--color-primary-700)]',
                  'leading-relaxed',
                  'text-[calc(var(--text-base)*var(--font-scale))]'
                )}
              >
                {t(achievement.descriptionKey)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom victory lane accent */}
        <div
          className={cn(
            'absolute bottom-0 start-0 end-0 h-1',
            'bg-gradient-to-r from-transparent',
            'via-[var(--color-accent-500)] to-transparent',
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
 * Render achievement icon based on type
 */
function renderAchievementIcon(icon?: string) {
  const iconClass = "w-7 h-7 text-white relative z-10";
  switch (icon) {
    case 'medal':
      return <MedalIcon className={iconClass} />;
    case 'flag':
      return <FlagIcon className={iconClass} />;
    case 'star':
      return <StarIcon className={iconClass} />;
    case 'trophy':
    default:
      return <TrophyIcon className={iconClass} />;
  }
}

/**
 * Olympic rings icon
 */
function OlympicRingsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top row */}
      <circle cx="20" cy="18" r="12" stroke="var(--color-primary-400)" strokeWidth="3" fill="none" />
      <circle cx="50" cy="18" r="12" stroke="var(--color-primary-500)" strokeWidth="3" fill="none" />
      <circle cx="80" cy="18" r="12" stroke="var(--color-primary-400)" strokeWidth="3" fill="none" />
      {/* Bottom row */}
      <circle cx="35" cy="32" r="12" stroke="var(--color-accent-500)" strokeWidth="3" fill="none" />
      <circle cx="65" cy="32" r="12" stroke="var(--color-accent-400)" strokeWidth="3" fill="none" />
    </svg>
  );
}

/**
 * Laurel wreath icon
 */
function LaurelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3C8 3 5 6 5 10C5 14 8 18 12 21C16 18 19 14 19 10C19 6 16 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M4 8C3 10 3 13 5 15M20 8C21 10 21 13 19 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 5C5 6 4 8 4 10M17 5C19 6 20 8 20 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Trophy icon
 */
function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.5 5H4C4 8.5 6 10 7.5 11C7.5 11 6 12.5 6 15H18C18 12.5 16.5 11 16.5 11C18 10 20 8.5 20 5H17.5M6.5 5V3H17.5V5M6.5 5H17.5M12 15V18M8 21H16M8 21V18H16V21M8 21H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Medal icon
 */
function MedalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12"
        cy="15"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 12L10.5 14L11 16L12 15.5L13 16L13.5 14L12 12Z"
        fill="currentColor"
      />
      <path
        d="M8.5 3L10 9M15.5 3L14 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 3H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Flag icon
 */
function FlagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 21V4M4 4H15L12 8L15 12H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Star icon
 */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

/**
 * Star burst icon for section header
 */
function StarBurstIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2V6M12 18V22M6 12H2M22 12H18M5.64 5.64L8.17 8.17M15.83 15.83L18.36 18.36M5.64 18.36L8.17 15.83M15.83 8.17L18.36 5.64"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}

/**
 * Checkered flag icon
 */
function CheckeredFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 4H20V12H4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect x="4" y="4" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="12" y="4" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="8" y="8" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
      <rect x="16" y="8" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export default AchievementsSection;
