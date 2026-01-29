import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

// Sports data with icons for the About page
const sportsWithIcons = [
  { slug: 'athletics', icon: '🏃' },
  { slug: 'wheelchair-basketball', icon: '🏀' },
  { slug: 'goalball', icon: '⚽' },
  { slug: 'swimming', icon: '🏊' },
  { slug: 'bocce', icon: '🎯' },
  { slug: 'hand-cycling', icon: '🚴' },
  { slug: 'judo', icon: '🥋' },
  { slug: 'archery', icon: '🏹' },
] as const;

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the about page
 */
export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'אודות | ספורט דרום',
    ar: 'من نحن | سبورت داروم',
    ru: 'О нас | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: 'הכירו את ספורט דרום - פרויקט ספורט פראלימפי באזור באר שבע והדרום. שיתוף פעולה בין מרכז ספיבק, עמותת אילן ואיגוד הספורט הפראלימפי',
    ar: 'تعرفوا على سبورت داروم - مشروع رياضي بارالمبي في منطقة بئر السبع والجنوب. تعاون بين مركز سبيفاك وجمعية إيلان واتحاد الرياضة البارالمبية',
    ru: 'Познакомьтесь со Спорт Даром - паралимпийским спортивным проектом в районе Беэр-Шевы и юга страны. Сотрудничество между центром Спивак, ассоциацией Илан и федерацией паралимпийского спорта',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * About Page
 *
 * Comprehensive page about Sport Darom organization.
 * Features:
 * - Organization history and mission
 * - Partner organizations
 * - Values and approach
 * - Sports overview
 * - Achievements summary
 * - Contact CTA
 * - Full RTL/LTR support
 * - WCAG AAA compliant
 */
export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const tNav = await getTranslations('navigation');
  const tSports = await getTranslations('sports');
  const tAchievements = await getTranslations('achievements');

  // Partner organizations data
  const partners = [
    { key: 'spivak', icon: BuildingIcon },
    { key: 'ilan', icon: HeartIcon },
    { key: 'paralympic', icon: TrophyIcon },
  ];

  // Approach values
  const approachValues = [
    { key: 'personalAttention', icon: PersonIcon },
    { key: 'safeEnvironment', icon: ShieldIcon },
    { key: 'professionalism', icon: StarIcon },
    { key: 'community', icon: UsersIcon },
  ];

  return (
    <div className="bg-[var(--background)]">
      {/* Hero Header */}
      <header
        className={cn(
          'relative overflow-hidden',
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:py-[var(--space-20)] md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]'
        )}
      >
        {/* Decorative background - diagonal racing stripes */}
        <div
          className={cn(
            'absolute inset-0 z-0 overflow-hidden',
            'opacity-[0.06]'
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              'absolute -inset-[50%] rotate-[-10deg]',
              'rtl:rotate-[10deg]'
            )}
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                var(--color-accent-300) 0px,
                var(--color-accent-300) 3px,
                transparent 3px,
                transparent 50px
              )`,
            }}
          />
        </div>

        {/* Decorative shape */}
        <div
          className={cn(
            'absolute bottom-0 left-1/2 -translate-x-1/2',
            'w-[140%] h-[30%]',
            'bg-gradient-to-t from-[var(--color-accent-500)]/10 to-transparent',
            'opacity-60'
          )}
          style={{
            clipPath: 'polygon(25% 100%, 75% 100%, 90% 0%, 10% 0%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Decorative icon */}
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 text-white"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Page title */}
          <h1
            className={cn(
              'text-[clamp(2rem,6vw,3.5rem)]',
              'font-bold tracking-tight',
              'text-white',
              'mb-[var(--space-4)]',
              'text-[calc(clamp(2rem,6vw,3.5rem)*var(--font-scale))]'
            )}
          >
            {t('title')}
          </h1>

          {/* Page description */}
          <p
            className={cn(
              'text-[var(--text-lg)]',
              'text-[var(--color-primary-100)]',
              'max-w-2xl mx-auto',
              'leading-relaxed',
              'text-[calc(var(--text-lg)*var(--font-scale))]'
            )}
          >
            {t('pageDescription')}
          </p>

          {/* Decorative gold steps */}
          <div
            className={cn(
              'mt-[var(--space-8)] flex justify-center gap-1'
            )}
            aria-hidden="true"
          >
            <div className="h-1 w-6 rounded-full bg-[var(--color-accent-300)]" />
            <div className="h-1 w-12 rounded-full bg-[var(--color-accent-500)]" />
            <div className="h-1 w-6 rounded-full bg-[var(--color-accent-300)]" />
          </div>
        </div>
      </header>

      {/* Who We Are Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]'
        )}
        aria-labelledby="who-we-are-title"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="who-we-are-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-[var(--color-primary-900)]',
              'mb-[var(--space-6)]',
              'text-center'
            )}
          >
            {t('whoWeAre.title')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-700)]',
              'max-w-3xl mx-auto text-center',
              'leading-relaxed',
              'mb-[var(--space-12)]'
            )}
          >
            {t('whoWeAre.content')}
          </p>

          {/* Partner Organizations Grid */}
          <div
            className={cn(
              'grid gap-6 md:gap-8',
              'grid-cols-1 md:grid-cols-3'
            )}
            role="list"
            aria-label={t('whoWeAre.title')}
          >
            {partners.map(({ key, icon: Icon }) => (
              <article
                key={key}
                role="listitem"
                className={cn(
                  'relative p-6 rounded-[var(--radius-xl)]',
                  'bg-[var(--color-primary-50)]',
                  'border border-[var(--color-primary-100)]',
                  'hover:shadow-lg hover:shadow-[var(--color-primary-200)]/50',
                  'transition-shadow duration-[var(--duration-normal)]'
                )}
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    'absolute top-0 start-4 end-4 h-1',
                    'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent',
                    'rounded-full'
                  )}
                  aria-hidden="true"
                />

                <div
                  className={cn(
                    'w-12 h-12 rounded-xl mb-4',
                    'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
                    'flex items-center justify-center',
                    'text-[var(--color-primary-700)]'
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3
                  className={cn(
                    'text-[calc(var(--text-lg)*var(--font-scale))]',
                    'font-bold text-[var(--color-primary-900)]',
                    'mb-2'
                  )}
                >
                  {t(`whoWeAre.partners.${key}.name`)}
                </h3>

                <p
                  className={cn(
                    'text-[calc(var(--text-base)*var(--font-scale))]',
                    'text-[var(--color-primary-600)]',
                    'leading-relaxed'
                  )}
                >
                  {t(`whoWeAre.partners.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]'
        )}
        aria-labelledby="vision-title"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative quote */}
          <div
            className="text-[var(--color-accent-400)] text-6xl font-serif mb-4 opacity-40"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <h2
            id="vision-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-white',
              'mb-[var(--space-6)]'
            )}
          >
            {t('vision.title')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-xl)*var(--font-scale))]',
              'text-[var(--color-primary-100)]',
              'leading-relaxed'
            )}
          >
            {t('vision.content')}
          </p>

          {/* Decorative line */}
          <div
            className={cn(
              'mt-[var(--space-8)] h-1 w-24 mx-auto rounded-full',
              'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
            )}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Our Approach Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]'
        )}
        aria-labelledby="approach-title"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="approach-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-[var(--color-primary-900)]',
              'mb-[var(--space-12)]',
              'text-center'
            )}
          >
            {t('approach.title')}
          </h2>

          {/* Approach Values Grid */}
          <div
            className={cn(
              'grid gap-6 md:gap-8',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            )}
            role="list"
            aria-label={t('approach.title')}
          >
            {approachValues.map(({ key, icon: Icon }) => (
              <article
                key={key}
                role="listitem"
                className={cn(
                  'relative p-6 rounded-[var(--radius-xl)]',
                  'bg-[var(--background)]',
                  'border border-[var(--color-primary-200)]',
                  'hover:border-[var(--color-accent-300)]',
                  'hover:shadow-lg',
                  'transition-all duration-[var(--duration-normal)]'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-full mb-4',
                    'bg-gradient-to-br from-[var(--color-accent-100)] to-[var(--color-accent-200)]',
                    'flex items-center justify-center',
                    'text-[var(--color-accent-700)]'
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3
                  className={cn(
                    'text-[calc(var(--text-lg)*var(--font-scale))]',
                    'font-bold text-[var(--color-primary-900)]',
                    'mb-2'
                  )}
                >
                  {t(`approach.${key}.title`)}
                </h3>

                <p
                  className={cn(
                    'text-[calc(var(--text-base)*var(--font-scale))]',
                    'text-[var(--color-primary-600)]',
                    'leading-relaxed'
                  )}
                >
                  {t(`approach.${key}.content`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Overview Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]',
          'bg-[var(--color-primary-50)]'
        )}
        aria-labelledby="our-sports-title"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="our-sports-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-[var(--color-primary-900)]',
              'mb-[var(--space-4)]',
              'text-center'
            )}
          >
            {t('ourSports.title')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-700)]',
              'mb-[var(--space-8)]',
              'text-center'
            )}
          >
            {t('ourSports.intro')}
          </p>

          {/* Sports Grid */}
          <div
            className={cn(
              'grid gap-4',
              'grid-cols-2 sm:grid-cols-4'
            )}
            role="list"
            aria-label={t('ourSports.title')}
          >
            {sportsWithIcons.map((sport) => (
              <Link
                key={sport.slug}
                href={`/sports/${sport.slug}`}
                role="listitem"
                className={cn(
                  'flex flex-col items-center p-4',
                  'rounded-[var(--radius-lg)]',
                  'bg-[var(--background)]',
                  'border border-[var(--color-primary-200)]',
                  'hover:border-[var(--color-accent-400)]',
                  'hover:shadow-md',
                  'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                  'focus-visible:outline-[var(--focus-ring-color)]',
                  'transition-all duration-[var(--duration-normal)]'
                )}
              >
                <span
                  className="text-3xl mb-2"
                  aria-hidden="true"
                >
                  {sport.icon}
                </span>
                <span
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'font-medium text-[var(--color-primary-900)]',
                    'text-center'
                  )}
                >
                  {tSports(`${sport.slug}.name`)}
                </span>
              </Link>
            ))}
          </div>

          {/* View All Sports Link */}
          <div className="mt-[var(--space-8)] text-center">
            <Link
              href="/sports"
              className={cn(
                'inline-flex items-center gap-2',
                'text-[calc(var(--text-base)*var(--font-scale))]',
                'font-semibold text-[var(--color-accent-700)]',
                'hover:text-[var(--color-accent-600)]',
                'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                'focus-visible:outline-[var(--focus-ring-color)]',
                'transition-colors duration-[var(--duration-fast)]'
              )}
            >
              {t('ourSports.viewAllSports')}
              <svg
                className="w-5 h-5 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Highlight Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]'
        )}
        aria-labelledby="achievements-highlight-title"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="achievements-highlight-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-[var(--color-primary-900)]',
              'mb-[var(--space-4)]'
            )}
          >
            {t('achievements.title')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-700)]',
              'mb-[var(--space-8)]'
            )}
          >
            {t('achievements.intro')}
          </p>

          {/* Achievement Highlights */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'goalballEuropean', icon: '🥈' },
              { key: 'paris2024', icon: '🏆' },
              { key: 'nationalChampions', icon: '🏅' },
              { key: 'communityGrowth', icon: '👥' },
            ].map(({ key, icon }) => (
              <div
                key={key}
                className={cn(
                  'flex items-center gap-2 px-4 py-2',
                  'rounded-full',
                  'bg-[var(--color-primary-100)]',
                  'border border-[var(--color-primary-200)]'
                )}
              >
                <span aria-hidden="true">{icon}</span>
                <span
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'font-medium text-[var(--color-primary-900)]'
                  )}
                >
                  {tAchievements(key)}
                </span>
              </div>
            ))}
          </div>

          {/* Link to Stories */}
          <div className="mt-[var(--space-8)]">
            <Link
              href="/stories"
              className={cn(
                'inline-flex items-center gap-2',
                'text-[calc(var(--text-base)*var(--font-scale))]',
                'font-semibold text-[var(--color-accent-700)]',
                'hover:text-[var(--color-accent-600)]',
                'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                'focus-visible:outline-[var(--focus-ring-color)]',
                'transition-colors duration-[var(--duration-fast)]'
              )}
            >
              {tNav('stories')}
              <svg
                className="w-5 h-5 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]'
        )}
        aria-labelledby="join-us-title"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="join-us-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-white',
              'mb-[var(--space-4)]'
            )}
          >
            {t('joinUs.title')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-100)]',
              'mb-[var(--space-8)]',
              'leading-relaxed'
            )}
          >
            {t('joinUs.content')}
          </p>

          {/* Contact CTA Button */}
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center justify-center',
              'min-h-[48px] px-8 py-3',
              'text-[calc(var(--text-base)*var(--font-scale))]',
              'font-semibold',
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
            {t('joinUs.contactCta')}
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

          {/* Location Info */}
          <div className="mt-[var(--space-12)]">
            <h3
              className={cn(
                'text-[calc(var(--text-lg)*var(--font-scale))]',
                'font-semibold text-[var(--color-accent-400)]',
                'mb-2'
              )}
            >
              {t('joinUs.locationTitle')}
            </h3>
            <p
              className={cn(
                'text-[calc(var(--text-base)*var(--font-scale))]',
                'text-[var(--color-primary-200)]'
              )}
            >
              {t('joinUs.locationContent')}
            </p>
          </div>

          {/* Decorative finish line */}
          <div
            className={cn(
              'mt-[var(--space-8)] h-1 w-24 mx-auto rounded-full',
              'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
            )}
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}

// Icon Components

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 21H21M5 21V7L13 3V21M13 21H19V11L13 7M9 9H9.01M9 13H9.01M9 17H9.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20.84 4.61C20.3292 4.09924 19.7228 3.69397 19.0554 3.41673C18.3879 3.1395 17.6725 2.99594 16.95 2.99594C16.2275 2.99594 15.5121 3.1395 14.8446 3.41673C14.1772 3.69397 13.5708 4.09924 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99635 7.05 2.99635C5.59096 2.99635 4.19169 3.57831 3.16 4.61C2.12831 5.64169 1.54635 7.04097 1.54635 8.5C1.54635 9.95903 2.12831 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3508 11.8792 21.756 11.2728 22.0333 10.6054C22.3105 9.93792 22.4541 9.22249 22.4541 8.5C22.4541 7.77751 22.3105 7.06208 22.0333 6.39464C21.756 5.72721 21.3508 5.12076 20.84 4.61Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 5H4C4 8.5 6 10 7.5 11C7.5 11 6 12.5 6 15H18C18 12.5 16.5 11 16.5 11C18 10 20 8.5 20 5H17.5M6.5 5V3H17.5V5M6.5 5H17.5M12 15V18M8 21H16M8 21V18H16V21M8 21H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
