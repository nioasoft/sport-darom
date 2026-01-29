import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { AchievementsSection } from '@/src/components/sections/AchievementsSection';

interface StoriesPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the stories/achievements page
 */
export async function generateMetadata({
  params,
}: StoriesPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'סיפורי הצלחה | ספורט דרום',
    ar: 'قصص نجاح | سبورت داروم',
    ru: 'Истории успеха | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: 'סיפורי הצלחה והישגים של ספורטאים ומאמנים מספורט דרום - גאווה פראלימפית מדרום הארץ',
    ar: 'قصص نجاح وإنجازات الرياضيين والمدربين من سبورت داروم - فخر بارالمبي من جنوب البلاد',
    ru: 'Истории успеха и достижения спортсменов и тренеров Спорт Даром - паралимпийская гордость юга страны',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Stories/Achievements Page - "Hall of Champions"
 *
 * A triumphant celebration of Paralympic achievements featuring:
 * - Dramatic hero header with victory pose motif
 * - Achievements section with medals and milestones
 * - Success stories/testimonials from athletes and coaches
 * - Call-to-action to join the community
 * - Full RTL/LTR support
 * - WCAG AAA compliant
 */
export default async function StoriesPage({ params }: StoriesPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('stories');

  return (
    <div className="bg-[var(--background)]">
      {/* Hero Header - Hall of Champions */}
      <header
        className={cn(
          'relative overflow-hidden',
          'py-[var(--space-20)] px-[var(--space-6)]',
          'md:py-24 md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-900)]'
        )}
      >
        {/* Decorative background - championship track lanes */}
        <div
          className={cn(
            'absolute inset-0 z-0 overflow-hidden',
            'opacity-[0.06]'
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
                var(--color-accent-300) 4px,
                transparent 4px,
                transparent 40px
              )`,
            }}
          />
        </div>

        {/* Decorative podium shape at bottom */}
        <div
          className={cn(
            'absolute bottom-0 left-1/2 -translate-x-1/2',
            'w-[160%] h-[50%]',
            'bg-gradient-to-t from-[var(--color-accent-500)]/15 to-transparent'
          )}
          style={{
            clipPath: 'polygon(15% 100%, 85% 100%, 100% 0%, 0% 0%)',
          }}
          aria-hidden="true"
        />

        {/* Floating Olympic rings */}
        <div
          className="absolute top-[10%] end-[5%] opacity-10"
          aria-hidden="true"
        >
          <OlympicRingsIcon className="w-40 h-20 md:w-56 md:h-28" />
        </div>
        <div
          className="absolute bottom-[15%] start-[3%] opacity-10 rotate-[-15deg]"
          aria-hidden="true"
        >
          <OlympicRingsIcon className="w-24 h-12" />
        </div>

        {/* Decorative corner laurels */}
        <div className="absolute top-8 start-8 opacity-15" aria-hidden="true">
          <LaurelIcon className="w-16 h-16 text-[var(--color-accent-400)]" />
        </div>
        <div className="absolute top-8 end-8 opacity-15 scale-x-[-1]" aria-hidden="true">
          <LaurelIcon className="w-16 h-16 text-[var(--color-accent-400)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Victory torch icon */}
          <div
            className={cn(
              'inline-flex items-center justify-center',
              'w-20 h-20 mb-[var(--space-8)]',
              'rounded-full',
              'bg-gradient-to-br from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
              'shadow-2xl shadow-[var(--color-accent-500)]/40',
              'ring-4 ring-[var(--color-accent-300)]/30'
            )}
            aria-hidden="true"
          >
            <TorchIcon className="w-10 h-10 text-white" />
          </div>

          {/* Page title */}
          <h1
            className={cn(
              'text-[clamp(2.5rem,8vw,4.5rem)]',
              'font-bold tracking-tight',
              'text-white',
              'mb-[var(--space-6)]',
              'text-[calc(clamp(2.5rem,8vw,4.5rem)*var(--font-scale))]',
              // Text shadow for depth
              'drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]'
            )}
          >
            {t('title')}
          </h1>

          {/* Page description */}
          <p
            className={cn(
              'text-[var(--text-xl)]',
              'text-[var(--color-primary-100)]',
              'max-w-3xl mx-auto',
              'leading-relaxed',
              'text-[calc(var(--text-xl)*var(--font-scale))]'
            )}
          >
            {t('pageDescription')}
          </p>

          {/* Decorative medal podium */}
          <div
            className={cn(
              'mt-[var(--space-10)] flex justify-center items-end gap-2'
            )}
            aria-hidden="true"
          >
            {/* Bronze - 3rd place */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full',
                  'bg-gradient-to-br from-[#D99052] to-[#8B5A2B]',
                  'shadow-lg mb-2'
                )}
              />
              <div
                className={cn(
                  'h-8 w-12 rounded-t-sm',
                  'bg-gradient-to-t from-[#8B5A2B] to-[#CD7F32]'
                )}
              />
            </div>

            {/* Gold - 1st place */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-300)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]',
                  'shadow-xl shadow-[var(--color-accent-500)]/50 mb-2',
                  'ring-2 ring-[var(--color-accent-200)]'
                )}
              />
              <div
                className={cn(
                  'h-14 w-14 rounded-t-sm',
                  'bg-gradient-to-t from-[var(--color-accent-700)] to-[var(--color-accent-400)]'
                )}
              />
            </div>

            {/* Silver - 2nd place */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full',
                  'bg-gradient-to-br from-[#E0E0E0] to-[#808080]',
                  'shadow-lg mb-2'
                )}
              />
              <div
                className={cn(
                  'h-10 w-12 rounded-t-sm',
                  'bg-gradient-to-t from-[#808080] to-[#C0C0C0]'
                )}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Achievements Section */}
      <AchievementsSection showTitle className="py-[var(--space-20)]" />

      {/* Success Stories Section */}
      <section
        className={cn(
          'py-[var(--space-20)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
          'bg-gradient-to-b from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-primary-50)]',
          'relative overflow-hidden'
        )}
        aria-labelledby="stories-section-title"
      >
        {/* Decorative quotes background */}
        <div
          className="absolute top-[10%] start-[5%] opacity-[0.03]"
          aria-hidden="true"
        >
          <QuoteIcon className="w-48 h-48 text-[var(--color-primary-900)]" />
        </div>
        <div
          className="absolute bottom-[10%] end-[5%] opacity-[0.03] rotate-180"
          aria-hidden="true"
        >
          <QuoteIcon className="w-40 h-40 text-[var(--color-primary-900)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-[var(--space-16)]">
            <h2
              id="stories-section-title"
              className={cn(
                'text-[clamp(1.75rem,5vw,2.5rem)]',
                'font-bold tracking-tight',
                'text-[var(--color-primary-900)]',
                'mb-[var(--space-4)]',
                'text-[calc(clamp(1.75rem,5vw,2.5rem)*var(--font-scale))]'
              )}
            >
              {t('storiesTitle')}
            </h2>
            <p
              className={cn(
                'text-[var(--text-lg)]',
                'text-[var(--color-primary-700)]',
                'text-[calc(var(--text-lg)*var(--font-scale))]'
              )}
            >
              {t('storiesDescription')}
            </p>

            {/* Decorative line */}
            <div
              className={cn(
                'mt-[var(--space-6)] flex justify-center gap-1'
              )}
              aria-hidden="true"
            >
              <div className="h-1 w-6 rounded-full bg-[var(--color-accent-300)]" />
              <div className="h-1 w-12 rounded-full bg-[var(--color-accent-500)]" />
              <div className="h-1 w-6 rounded-full bg-[var(--color-accent-300)]" />
            </div>
          </div>

          {/* Stories grid */}
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1 lg:grid-cols-3'
            )}
            role="list"
            aria-label={t('storiesTitle')}
          >
            <StoryCard
              quote={t('story1Quote')}
              author={t('story1Author')}
              accentColor="gold"
            />
            <StoryCard
              quote={t('story2Quote')}
              author={t('story2Author')}
              accentColor="primary"
              featured
            />
            <StoryCard
              quote={t('story3Quote')}
              author={t('story3Author')}
              accentColor="gold"
            />
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section
        className={cn(
          'py-[var(--space-20)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]',
          'relative overflow-hidden'
        )}
        aria-labelledby="join-cta-title"
      >
        {/* Decorative background stripes */}
        <div
          className={cn(
            'absolute inset-0 z-0 overflow-hidden',
            'opacity-[0.04]'
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'absolute -inset-[50%] rotate-[5deg]',
              'rtl:rotate-[-5deg]'
            )}
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                var(--color-accent-400) 0px,
                var(--color-accent-400) 2px,
                transparent 2px,
                transparent 60px
              )`,
            }}
          />
        </div>

        {/* Decorative corner medals */}
        <div className="absolute top-8 start-8 opacity-20" aria-hidden="true">
          <MedalIcon className="w-14 h-14 text-[var(--color-accent-400)]" />
        </div>
        <div className="absolute bottom-8 end-8 opacity-20 rotate-12" aria-hidden="true">
          <MedalIcon className="w-10 h-10 text-[var(--color-accent-300)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Trophy icon */}
          <div
            className={cn(
              'inline-flex items-center justify-center',
              'w-16 h-16 mb-[var(--space-6)]',
              'rounded-full',
              'bg-gradient-to-br from-[var(--color-accent-400)] to-[var(--color-accent-600)]',
              'shadow-lg shadow-[var(--color-accent-500)]/30'
            )}
            aria-hidden="true"
          >
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>

          <h2
            id="join-cta-title"
            className={cn(
              'text-[clamp(1.75rem,5vw,2.75rem)]',
              'font-bold tracking-tight',
              'text-white',
              'mb-[var(--space-4)]',
              'text-[calc(clamp(1.75rem,5vw,2.75rem)*var(--font-scale))]'
            )}
          >
            {t('joinTitle')}
          </h2>

          <p
            className={cn(
              'text-[var(--text-lg)]',
              'text-[var(--color-primary-200)]',
              'mb-[var(--space-8)]',
              'leading-relaxed',
              'text-[calc(var(--text-lg)*var(--font-scale))]'
            )}
          >
            {t('joinDescription')}
          </p>

          <Link
            href={`/${locale}/contact`}
            className={cn(
              'group relative inline-flex items-center justify-center',
              'overflow-hidden',
              'min-h-[56px] px-[var(--space-10)] py-[var(--space-4)]',
              'text-[var(--text-lg)] font-bold',
              'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]',
              'rounded-full',
              'transition-all duration-[var(--duration-normal)]',
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-[var(--focus-ring-offset)]',
              'focus-visible:outline-white',
              'hover:bg-[var(--color-accent-400)]',
              'shadow-xl shadow-[var(--color-accent-500)]/40'
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
            <span className="relative z-10">{t('joinCta')}</span>
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

          {/* Decorative finish line */}
          <div
            className={cn(
              'mt-[var(--space-12)] h-1 w-32 mx-auto rounded-full',
              'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
            )}
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}

/**
 * Story testimonial card component
 */
interface StoryCardProps {
  quote: string;
  author: string;
  accentColor: 'gold' | 'primary';
  featured?: boolean;
}

function StoryCard({ quote, author, accentColor, featured }: StoryCardProps) {
  const colors = {
    gold: {
      border: 'border-[var(--color-accent-300)]',
      accent: 'bg-[var(--color-accent-500)]',
      quote: 'text-[var(--color-accent-600)]',
    },
    primary: {
      border: 'border-[var(--color-primary-300)]',
      accent: 'bg-[var(--color-primary-700)]',
      quote: 'text-[var(--color-primary-600)]',
    },
  };

  const colorSet = colors[accentColor];

  return (
    <article
      role="listitem"
      className={cn(
        'group relative',
        featured && 'lg:-mt-4 lg:mb-4'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'p-6 md:p-8',
          'bg-[var(--background)]',
          'border-2',
          colorSet.border,
          'rounded-[var(--radius-xl)]',
          'shadow-lg',
          'transition-all duration-[var(--duration-normal)]',
          'hover:shadow-xl hover:-translate-y-1',
          // Focus styles
          'focus-within:ring-[var(--focus-ring-width)]',
          'focus-within:ring-[var(--focus-ring-color)]',
          'focus-within:ring-offset-[var(--focus-ring-offset)]'
        )}
      >
        {/* Top accent line */}
        <div
          className={cn(
            'absolute top-0 inset-x-0 h-1',
            colorSet.accent
          )}
          aria-hidden="true"
        />

        {/* Quote icon */}
        <div
          className={cn(
            'absolute -top-2 start-4',
            'w-10 h-10 rounded-full',
            colorSet.accent,
            'flex items-center justify-center',
            'shadow-md'
          )}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
          >
            <path
              d="M10 8C10 10.21 8.21 12 6 12C5.45 12 4.94 11.87 4.5 11.65C4.5 11.65 4.5 11.77 4.5 12C4.5 14.21 6.29 16 8.5 16H9V18H8.5C5.19 18 2.5 15.31 2.5 12V8C2.5 5.79 4.29 4 6.5 4C8.71 4 10.5 5.79 10.5 8H10ZM20 8C20 10.21 18.21 12 16 12C15.45 12 14.94 11.87 14.5 11.65C14.5 11.65 14.5 11.77 14.5 12C14.5 14.21 16.29 16 18.5 16H19V18H18.5C15.19 18 12.5 15.31 12.5 12V8C12.5 5.79 14.29 4 16.5 4C18.71 4 20.5 5.79 20.5 8H20Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Quote text */}
        <blockquote className="mt-4">
          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-800)]',
              'leading-relaxed',
              'italic',
              'mb-6'
            )}
          >
            &ldquo;{quote}&rdquo;
          </p>

          {/* Author */}
          <footer>
            <cite
              className={cn(
                'not-italic',
                'text-[calc(var(--text-sm)*var(--font-scale))]',
                'font-semibold',
                colorSet.quote
              )}
            >
              &mdash; {author}
            </cite>
          </footer>
        </blockquote>

        {/* Decorative corner medal */}
        <div
          className={cn(
            'absolute -bottom-3 -end-3 opacity-20',
            'group-hover:opacity-40',
            'transition-opacity duration-[var(--duration-normal)]'
          )}
          aria-hidden="true"
        >
          <MedalIcon
            className={cn(
              'w-16 h-16',
              accentColor === 'gold'
                ? 'text-[var(--color-accent-500)]'
                : 'text-[var(--color-primary-500)]'
            )}
          />
        </div>
      </div>
    </article>
  );
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
      aria-hidden="true"
    >
      <circle cx="20" cy="18" r="12" stroke="var(--color-primary-300)" strokeWidth="3" fill="none" />
      <circle cx="50" cy="18" r="12" stroke="var(--color-primary-400)" strokeWidth="3" fill="none" />
      <circle cx="80" cy="18" r="12" stroke="var(--color-primary-300)" strokeWidth="3" fill="none" />
      <circle cx="35" cy="32" r="12" stroke="var(--color-accent-400)" strokeWidth="3" fill="none" />
      <circle cx="65" cy="32" r="12" stroke="var(--color-accent-300)" strokeWidth="3" fill="none" />
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
      aria-hidden="true"
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
    </svg>
  );
}

/**
 * Torch icon for header
 */
function TorchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 14 4 14 6C14 8 12 10 12 10C12 10 10 8 10 6C10 4 12 2 12 2Z"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <path
        d="M9 9L8 22H16L15 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14H14.5M10 18H14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
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
      aria-hidden="true"
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
      aria-hidden="true"
    >
      <circle cx="12" cy="15" r="6" stroke="currentColor" strokeWidth="1.5" />
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
 * Quote icon for background decoration
 */
function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 8C10 10.21 8.21 12 6 12C5.45 12 4.94 11.87 4.5 11.65C4.5 11.65 4.5 11.77 4.5 12C4.5 14.21 6.29 16 8.5 16H9V18H8.5C5.19 18 2.5 15.31 2.5 12V8C2.5 5.79 4.29 4 6.5 4C8.71 4 10.5 5.79 10.5 8H10ZM20 8C20 10.21 18.21 12 16 12C15.45 12 14.94 11.87 14.5 11.65C14.5 11.65 14.5 11.77 14.5 12C14.5 14.21 16.29 16 18.5 16H19V18H18.5C15.19 18 12.5 15.31 12.5 12V8C12.5 5.79 14.29 4 16.5 4C18.71 4 20.5 5.79 20.5 8H20Z"
        fill="currentColor"
      />
    </svg>
  );
}
