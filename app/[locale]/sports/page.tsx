import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SportsGrid } from '@/src/components/sections/SportsGrid';
import { cn } from '@/src/lib/utils';

interface SportsPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the sports listing page
 */
export async function generateMetadata({
  params,
}: SportsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'ענפי ספורט | ספורט דרום',
    ar: 'الفروع الرياضية | سبورت داروم',
    ru: 'Виды спорта | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: '8 ענפי ספורט פראלימפי באזור באר שבע - אתלטיקה, כדורסל כיסאות גלגלים, גולבול, שחייה, בוצ\'ה, אופניים ידניים, ג\'ודו וקשתות',
    ar: '8 فروع رياضية بارالمبية في منطقة بئر السبع - ألعاب القوى، كرة السلة على الكراسي المتحركة، كرة الهدف، السباحة، البوتشي، الدراجات اليدوية، الجودو والرماية بالقوس',
    ru: '8 паралимпийских видов спорта в районе Беэр-Шевы - легкая атлетика, баскетбол на колясках, голбол, плавание, бочче, ручной велосипед, дзюдо и стрельба из лука',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Sports Listing Page
 *
 * Displays all 8 Paralympic sports offered by Sport Darom.
 * Features:
 * - Page header with title and description
 * - Full SportsGrid component with all sports
 * - Accessible heading structure
 * - Full RTL/LTR support
 */
export default async function SportsPage({ params }: SportsPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('sports');

  return (
    <div className="bg-[var(--background)]">
      {/* Page Header */}
      <header
        className={cn(
          'relative overflow-hidden',
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:py-[var(--space-20)] md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-800)]'
        )}
      >
        {/* Decorative background pattern */}
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

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Decorative medal icon */}
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
                d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="currentColor"
                fillOpacity="0.2"
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
            {t('pageDescription') ||
              'גלו את 8 ענפי הספורט הפראלימפי שלנו - כל אחד מותאם לצרכים ולכישורים שונים'}
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
      </header>

      {/* Sports Grid */}
      <SportsGrid showTitle={false} className="py-[var(--space-16)]" />
    </div>
  );
}
