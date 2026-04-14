import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { HeartIcon, TrophyIcon, StarIcon } from '@/src/components/icons';
import { sports } from '@/src/lib/sports';
import { getImageAlt, getImagePath, getSportImage, type Locale } from '@/src/lib/images';

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
            {sports.map((sport) => (
              <Link
                key={sport.slug}
                href={`/sports/${sport.slug}`}
                className={cn(
                  'group overflow-hidden rounded-[var(--radius-lg)]',
                  'bg-[var(--background)]',
                  'border border-[var(--color-primary-200)]',
                  'hover:border-[var(--color-accent-400)]',
                  'hover:shadow-md',
                  'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                  'focus-visible:outline-[var(--focus-ring-color)]',
                  'transition-all duration-[var(--duration-normal)]'
                )}
              >
                <div className="relative h-28 overflow-hidden bg-[var(--color-primary-100)]">
                  {(() => {
                    const imageConfig = getSportImage(sport.slug);

                    if (!imageConfig) {
                      return (
                        <div className="flex h-full items-center justify-center text-3xl" aria-hidden="true">
                          {sport.icon}
                        </div>
                      );
                    }

                    return (
                      <Image
                        src={getImagePath(imageConfig)}
                        alt={getImageAlt(imageConfig, locale as Locale)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    );
                  })()}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-900)]/30 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="p-4">
                  <span
                    className={cn(
                      'block text-[calc(var(--text-sm)*var(--font-scale))]',
                      'font-medium text-[var(--color-primary-900)]',
                      'text-center'
                    )}
                  >
                    {tSports(`${sport.slug}.name`)}
                  </span>
                </div>
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
