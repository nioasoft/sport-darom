import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { sports, getSportBySlug, getSportName, type Sport } from '@/src/lib/sports';
import { galleryImages, getImageAlt, getImagePath } from '@/src/lib/images';
import { cn } from '@/src/lib/utils';
import { ImageGallery } from './ImageGallery';
import { CoachInfo } from './CoachInfo';

interface SportPageProps {
  params: Promise<{ locale: string; sport: string }>;
}

/**
 * Generate static params for all sports in all locales
 */
export function generateStaticParams() {
  const params: { locale: string; sport: string }[] = [];

  for (const locale of ['he', 'ar', 'ru']) {
    for (const sport of sports) {
      params.push({ locale, sport: sport.slug });
    }
  }

  return params;
}

/**
 * Generate metadata for individual sport pages
 */
export async function generateMetadata({
  params,
}: SportPageProps): Promise<Metadata> {
  const { locale, sport: sportSlug } = await params;
  const sport = getSportBySlug(sportSlug);

  if (!sport) {
    return {
      title: 'Sport Not Found',
    };
  }

  const sportName = getSportName(sport, locale as 'he' | 'ar' | 'ru');

  const titles: Record<string, string> = {
    he: `${sportName} | ספורט דרום`,
    ar: `${sportName} | سبورت داروم`,
    ru: `${sportName} | Спорт Даром`,
  };

  const descriptions: Record<string, string> = {
    he: `מידע על ${sportName} בספורט דרום - אימונים, מאמנים ופעילויות לאנשים עם מוגבלויות באזור באר שבע`,
    ar: `معلومات عن ${sportName} في سبورت داروم - تدريبات ومدربين وأنشطة للأشخاص ذوي الإعاقات في منطقة بئر السبع`,
    ru: `Информация о ${sportName} в Спорт Даром - тренировки, тренеры и мероприятия для людей с ограниченными возможностями в районе Беэр-Шевы`,
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Individual Sport Page
 *
 * Displays detailed information about a specific Paralympic sport.
 * Features:
 * - Sport-specific hero header with accent color
 * - Sport description
 * - Coach information with contact details
 * - Image gallery with horizontal/vertical image support
 * - Accessible heading structure
 * - Full RTL/LTR support
 */
export default async function SportPage({ params }: SportPageProps) {
  const { locale, sport: sportSlug } = await params;

  // Validate and get sport
  const sport = getSportBySlug(sportSlug);
  if (!sport) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('sports');
  const tCommon = await getTranslations('common');

  const sportName = getSportName(sport, locale as 'he' | 'ar' | 'ru');
  const sportDescription = t(`${sport.slug}.description`) || '';

  return (
    <div className="bg-[var(--background)]">
      {/* Hero Header */}
      <SportHero sport={sport} sportName={sportName} locale={locale} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-[var(--space-6)] md:px-[var(--space-12)] py-[var(--space-12)]">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Sport Description */}
            <section aria-labelledby="sport-description-title">
              <h2
                id="sport-description-title"
                className={cn(
                  'text-[var(--text-2xl)] font-bold mb-[var(--space-4)]',
                  'text-[var(--color-primary-900)]',
                  'text-[calc(var(--text-2xl)*var(--font-scale))]'
                )}
              >
                {t('aboutSport') || 'אודות הענף'}
              </h2>

              {sportDescription ? (
                <div
                  className={cn(
                    'prose prose-lg max-w-none',
                    'text-[var(--color-primary-700)]',
                    'text-[calc(var(--text-base)*var(--font-scale))]'
                  )}
                >
                  <p>{sportDescription}</p>
                </div>
              ) : (
                <p
                  className={cn(
                    'text-[var(--text-lg)] text-[var(--color-primary-600)]',
                    'italic',
                    'text-[calc(var(--text-lg)*var(--font-scale))]'
                  )}
                >
                  {t('descriptionComingSoon') || 'תיאור הענף יתווסף בקרוב...'}
                </p>
              )}
            </section>

            {/* Image Gallery */}
            <section aria-labelledby="gallery-title">
              <h2
                id="gallery-title"
                className={cn(
                  'text-[var(--text-2xl)] font-bold mb-[var(--space-4)]',
                  'text-[var(--color-primary-900)]',
                  'text-[calc(var(--text-2xl)*var(--font-scale))]'
                )}
              >
                {t('gallery') || 'גלריה'}
              </h2>

              <ImageGallery
                sportSlug={sport.slug}
                sportName={sportName}
                images={(galleryImages[sport.slug] ?? []).map((img) => ({
                  src: getImagePath(img),
                  alt: getImageAlt(img, locale as 'he' | 'ar' | 'ru'),
                  orientation: img.orientation,
                }))}
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Coach Information */}
            {sport.coach && (
              <CoachInfo
                coachName={sport.coach}
                phone={sport.phone}
                sportName={sportName}
                locale={locale}
              />
            )}

            {/* Quick Links */}
            <div
              className={cn(
                'p-6 rounded-[var(--radius-xl)]',
                'bg-[var(--color-primary-50)]',
                'border border-[var(--color-primary-100)]'
              )}
            >
              <h3
                className={cn(
                  'text-[var(--text-lg)] font-bold mb-[var(--space-4)]',
                  'text-[var(--color-primary-900)]',
                  'text-[calc(var(--text-lg)*var(--font-scale))]'
                )}
              >
                {t('quickLinks') || 'קישורים מהירים'}
              </h3>

              <nav aria-label={t('quickLinks') || 'Quick links'}>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/contact"
                      className={cn(
                        'flex items-center gap-2',
                        'text-[var(--color-primary-700)]',
                        'hover:text-[var(--color-accent-600)]',
                        'transition-colors duration-[var(--duration-fast)]',
                        'text-[calc(var(--text-base)*var(--font-scale))]'
                      )}
                    >
                      <ContactIcon className="w-5 h-5" />
                      {tCommon('learnMore')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports"
                      className={cn(
                        'flex items-center gap-2',
                        'text-[var(--color-primary-700)]',
                        'hover:text-[var(--color-accent-600)]',
                        'transition-colors duration-[var(--duration-fast)]',
                        'text-[calc(var(--text-base)*var(--font-scale))]'
                      )}
                    >
                      <SportsIcon className="w-5 h-5" />
                      {t('allSports') || 'כל ענפי הספורט'}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/**
 * Sport Hero Header Component
 */
function SportHero({
  sport,
  sportName,
  locale,
}: {
  sport: Sport;
  sportName: string;
  locale: string;
}) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        'py-[var(--space-16)] px-[var(--space-6)]',
        'md:py-[var(--space-20)] md:px-[var(--space-12)]',
        'bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--color-primary-800)] to-[var(--color-primary-900)]'
      )}
      style={{
        // Apply sport-specific accent hue
        '--sport-hue': sport.accentHue,
      } as React.CSSProperties}
    >
      {/* Decorative background with sport accent */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden',
          'opacity-[0.08]'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -inset-[50%] rotate-[-15deg]',
            'rtl:rotate-[15deg]'
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              hsl(var(--sport-hue, 45) 70% 50%) 0px,
              hsl(var(--sport-hue, 45) 70% 50%) 4px,
              transparent 4px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* Sport accent blob */}
      <div
        className={cn(
          'absolute -top-20 -end-20 w-80 h-80 rounded-full',
          'opacity-10'
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--sport-hue, 45) 70% 50%) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-[var(--space-6)]"
        >
          <ol className="flex items-center gap-2 text-[var(--color-primary-300)]">
            <li>
              <Link
                href="/"
                className={cn(
                  'hover:text-white transition-colors duration-[var(--duration-fast)]',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {locale === 'he' ? 'בית' : locale === 'ar' ? 'الرئيسية' : 'Главная'}
              </Link>
            </li>
            <li aria-hidden="true" className="rtl:rotate-180">
              <ChevronIcon className="w-4 h-4" />
            </li>
            <li>
              <Link
                href="/sports"
                className={cn(
                  'hover:text-white transition-colors duration-[var(--duration-fast)]',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {locale === 'he' ? 'ענפי ספורט' : locale === 'ar' ? 'الرياضات' : 'Виды спорта'}
              </Link>
            </li>
            <li aria-hidden="true" className="rtl:rotate-180">
              <ChevronIcon className="w-4 h-4" />
            </li>
            <li>
              <span
                className={cn(
                  'text-white font-medium',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
                aria-current="page"
              >
                {sportName}
              </span>
            </li>
          </ol>
        </nav>

        {/* Sport icon with accent color */}
        <div
          className={cn(
            'inline-flex items-center justify-center',
            'w-20 h-20 mb-[var(--space-6)]',
            'rounded-full',
            'shadow-lg'
          )}
          style={{
            background: `linear-gradient(135deg, hsl(var(--sport-hue, 45) 60% 55%), hsl(var(--sport-hue, 45) 70% 45%))`,
            boxShadow: `0 10px 30px hsl(var(--sport-hue, 45) 70% 40% / 0.3)`,
          }}
          aria-hidden="true"
        >
          <SportIcon sportSlug={sport.slug} className="w-10 h-10 text-white" />
        </div>

        {/* Page title */}
        <h1
          className={cn(
            'text-[clamp(2.5rem,7vw,4rem)]',
            'font-bold tracking-tight',
            'text-white',
            'mb-[var(--space-4)]',
            'text-[calc(clamp(2.5rem,7vw,4rem)*var(--font-scale))]'
          )}
        >
          {sportName}
        </h1>

        {/* Coach teaser */}
        {sport.coach && (
          <p
            className={cn(
              'text-[var(--text-lg)]',
              'text-[var(--color-primary-200)]',
              'text-[calc(var(--text-lg)*var(--font-scale))]'
            )}
          >
            {locale === 'he' ? 'מאמן/ת: ' : locale === 'ar' ? 'المدرب/ة: ' : 'Тренер: '}
            <span className="text-white font-medium">{sport.coach}</span>
          </p>
        )}

        {/* Decorative accent line */}
        <div
          className={cn(
            'mt-[var(--space-8)] h-1 w-32 rounded-full'
          )}
          style={{
            background: `linear-gradient(to right, hsl(var(--sport-hue, 45) 70% 50%), transparent)`,
          }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}

/**
 * Sport icon based on slug
 */
function SportIcon({ sportSlug, className }: { sportSlug: string; className?: string }) {
  // Generic sport icon - can be customized per sport in the future
  switch (sportSlug) {
    case 'athletics':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <path d="M4 22L8 14L12 12L16 14L20 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'wheelchair-basketball':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="15" r="6" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="4" r="2" fill="currentColor" />
          <path d="M12 6V10M8 8L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'swimming':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M2 18C2 18 4 20 8 18C12 16 14 20 18 18C22 16 22 18 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="5" cy="10" r="2" fill="currentColor" />
          <path d="M7 10L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'archery':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <path d="M12 3V1M12 23V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      // Generic star icon
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      );
  }
}

/**
 * Chevron icon for breadcrumbs
 */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M7 4L13 10L7 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Contact icon
 */
function ContactIcon({ className }: { className?: string }) {
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

/**
 * Sports icon
 */
function SportsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
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
