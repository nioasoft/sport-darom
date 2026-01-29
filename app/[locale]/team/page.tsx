import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { cn } from '@/src/lib/utils';
import { team } from '@/src/lib/team';
import { TeamCard } from '@/src/components/team';

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the team page
 */
export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'הצוות שלנו | ספורט דרום',
    ar: 'فريقنا | سبورت داروم',
    ru: 'Наша команда | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: 'הכירו את הצוות המסור של ספורט דרום - מאמנים מקצועיים ואנשי צוות שמלווים ספורטאים פראלימפים בדרום הארץ',
    ar: 'تعرفوا على فريق سبورت داروم المتفاني - مدربون محترفون وموظفون يرافقون الرياضيين البارالمبيين في جنوب البلاد',
    ru: 'Познакомьтесь с командой Спорт Даром - профессиональные тренеры и сотрудники, сопровождающие паралимпийских спортсменов на юге страны',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Team Page
 *
 * Displays all team members with their photos, roles, and contact information.
 * Features:
 * - Page header with title and description
 * - Grid of TeamCard components
 * - Accessible heading structure
 * - Full RTL/LTR support
 * - WCAG AAA compliant
 */
export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('team');

  // Sort team members by order
  const sortedTeam = [...team].sort((a, b) => a.order - b.order);

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

        {/* Decorative podium shape */}
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
          {/* Decorative trophy icon */}
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
                d="M6.5 5H4C4 8.5 6 10 7.5 11C7.5 11 6 12.5 6 15H18C18 12.5 16.5 11 16.5 11C18 10 20 8.5 20 5H17.5M6.5 5V3H17.5V5M6.5 5H17.5M12 15V18M8 21H16M8 21V18H16V21M8 21H16"
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

          {/* Decorative gold podium steps */}
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

      {/* Team Grid Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]'
        )}
        aria-labelledby="team-grid-title"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hidden title for accessibility */}
          <h2 id="team-grid-title" className="sr-only">
            {t('title')}
          </h2>

          {/* Team cards grid */}
          <div
            className={cn(
              'grid gap-6 md:gap-8',
              // Responsive: 1 -> 2 -> 3 columns
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
            role="list"
            aria-label={t('title')}
          >
            {sortedTeam.map((member, index) => (
              <div key={member.id} role="listitem">
                <TeamCard
                  member={member}
                  locale={locale as 'he' | 'ar' | 'ru'}
                  showFullBio
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)]',
          'bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--background)]'
        )}
        aria-labelledby="team-contact-title"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="team-contact-title"
            className={cn(
              'text-[calc(var(--text-2xl)*var(--font-scale))]',
              'font-bold text-[var(--foreground)]',
              'mb-[var(--space-4)]'
            )}
          >
            {t('contactTitle')}
          </h2>

          <p
            className={cn(
              'text-[calc(var(--text-lg)*var(--font-scale))]',
              'text-[var(--color-primary-700)]',
              'mb-[var(--space-8)]',
              'leading-relaxed'
            )}
          >
            {t('contactDescription')}
          </p>

          {/* Decorative finish line */}
          <div
            className={cn(
              'h-1 w-24 mx-auto rounded-full',
              'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
            )}
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}
