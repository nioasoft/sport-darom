import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { cn } from '@/src/lib/utils';
import { PhoneIcon } from '@/src/components/icons';

interface AccessibilityPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the accessibility statement page
 */
export async function generateMetadata({
  params,
}: AccessibilityPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'הצהרת נגישות | ספורט דרום',
    ar: 'بيان إمكانية الوصول | سبورت داروم',
    ru: 'Заявление о доступности | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: 'הצהרת נגישות של אתר ספורט דרום - מחויבותנו להנגשת האתר והפעילות לכלל הציבור',
    ar: 'بيان إمكانية الوصول لموقع سبورت داروم - التزامنا بإتاحة الموقع والأنشطة للجميع',
    ru: 'Заявление о доступности сайта Спорт Даром - наше обязательство сделать сайт и деятельность доступными для всех',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Accessibility Statement Page
 *
 * Features:
 * - Comprehensive accessibility statement
 * - Details on WCAG 2.1 AAA compliance
 * - Accessibility features overview
 * - Contact information for feedback
 * - Full RTL/LTR support
 * - WCAG AAA compliant
 */
export default async function AccessibilityPage({ params }: AccessibilityPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('accessibilityStatement');

  const accessibilityFeatures = [
    { key: 'keyboard', icon: KeyboardIcon },
    { key: 'screenReader', icon: ScreenReaderIcon },
    { key: 'contrast', icon: ContrastIcon },
    { key: 'fontSize', icon: FontSizeIcon },
    { key: 'highContrastMode', icon: HighContrastIcon },
    { key: 'reducedMotion', icon: ReducedMotionIcon },
    { key: 'altText', icon: AltTextIcon },
    { key: 'skipLinks', icon: SkipLinksIcon },
    { key: 'focusIndicators', icon: FocusIcon },
    { key: 'rtlSupport', icon: RtlIcon },
  ];

  const activityFeatures = [
    'equipment',
    'facilities',
    'transportation',
    'training',
    'communication',
  ];

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
        {/* Decorative background - diagonal accessibility pattern */}
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
          {/* Decorative accessibility icon */}
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
              <circle cx="12" cy="4" r="2" fill="currentColor" />
              <path
                d="M19 8H5M12 8V12M12 12L8 22M12 12L16 22"
                stroke="currentColor"
                strokeWidth="2"
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

          {/* Decorative gold line */}
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

      {/* Main Content */}
      <main
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]'
        )}
      >
        <div className="max-w-4xl mx-auto">
          {/* Commitment Section */}
          <Section>
            <SectionTitle>{t('commitment.title')}</SectionTitle>
            <SectionContent>{t('commitment.content')}</SectionContent>
          </Section>

          {/* Standards Section */}
          <Section>
            <SectionTitle>{t('standards.title')}</SectionTitle>
            <SectionContent>{t('standards.content')}</SectionContent>
            <div className="mt-4 p-4 rounded-lg bg-[var(--color-primary-50)] border border-[var(--color-primary-200)]">
              <p className="text-[calc(var(--text-sm)*var(--font-scale))] text-[var(--color-primary-700)] font-medium">
                WCAG 2.1 Level AAA
              </p>
            </div>
          </Section>

          {/* Features Section */}
          <Section>
            <SectionTitle>{t('features.title')}</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              {accessibilityFeatures.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className={cn(
                    'flex items-start gap-3 p-4',
                    'rounded-lg',
                    'bg-[var(--color-primary-50)]',
                    'border border-[var(--color-primary-200)]'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex-shrink-0',
                      'flex items-center justify-center',
                      'bg-[var(--color-accent-100)]',
                      'text-[var(--color-accent-700)]'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[calc(var(--text-base)*var(--font-scale))] text-[var(--foreground)]">
                    {t(`features.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Accessibility Panel Section */}
          <Section>
            <SectionTitle>{t('accessibilityPanel.title')}</SectionTitle>
            <SectionContent>{t('accessibilityPanel.content')}</SectionContent>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-[var(--color-success)]" />
                <span className="text-[calc(var(--text-base)*var(--font-scale))]">
                  {t('features.fontSize')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-[var(--color-success)]" />
                <span className="text-[calc(var(--text-base)*var(--font-scale))]">
                  {t('features.highContrastMode')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-[var(--color-success)]" />
                <span className="text-[calc(var(--text-base)*var(--font-scale))]">
                  {t('features.reducedMotion')}
                </span>
              </li>
            </ul>
          </Section>

          {/* Feedback Section */}
          <Section>
            <SectionTitle>{t('feedback.title')}</SectionTitle>
            <SectionContent>{t('feedback.content')}</SectionContent>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <EmailIcon className="w-5 h-5 text-[var(--color-primary-600)]" />
                <a
                  href="mailto:info@sport-darom.org.il"
                  className={cn(
                    'text-[calc(var(--text-base)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]',
                    'hover:text-[var(--color-primary-900)]',
                    'underline underline-offset-2',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-[var(--focus-ring-color)]',
                    'focus-visible:ring-offset-2 rounded'
                  )}
                >
                  info@sport-darom.org.il
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-[var(--color-primary-600)]" />
                <a
                  href="tel:050-8651200"
                  className={cn(
                    'text-[calc(var(--text-base)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]',
                    'hover:text-[var(--color-primary-900)]',
                    'underline underline-offset-2',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-[var(--focus-ring-color)]',
                    'focus-visible:ring-offset-2 rounded'
                  )}
                  dir="ltr"
                >
                  050-8651200
                </a>
              </div>
            </div>
          </Section>

          {/* Activities Accessibility Section */}
          <Section>
            <SectionTitle>{t('activities.title')}</SectionTitle>
            <SectionContent>{t('activities.content')}</SectionContent>
            <ul className="mt-4 space-y-2">
              {activityFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                  <span className="text-[calc(var(--text-base)*var(--font-scale))]">
                    {t(`activities.${feature}`)}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Updates Section */}
          <Section last>
            <SectionTitle>{t('updates.title')}</SectionTitle>
            <SectionContent>{t('updates.content')}</SectionContent>
          </Section>
        </div>
      </main>
    </div>
  );
}

/**
 * Section component for consistent styling
 */
function Section({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <section
      className={cn(
        'pb-[var(--space-10)]',
        !last && 'mb-[var(--space-10)] border-b border-[var(--color-primary-200)]'
      )}
    >
      {children}
    </section>
  );
}

/**
 * Section title component
 */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={cn(
        'text-[calc(var(--text-2xl)*var(--font-scale))]',
        'font-bold text-[var(--foreground)]',
        'mb-4'
      )}
    >
      {children}
    </h2>
  );
}

/**
 * Section content component
 */
function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cn(
        'text-[calc(var(--text-base)*var(--font-scale))]',
        'text-[var(--color-primary-700)]',
        'leading-relaxed'
      )}
    >
      {children}
    </p>
  );
}

// Icons
function KeyboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M6 10H8M10 10H12M14 10H16M18 10H18.01M6 14H14M16 14H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ScreenReaderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ContrastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2C12 2 12 22 12 22" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22" fill="currentColor" />
    </svg>
  );
}

function FontSizeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 19L8 5H10L14 19M5.5 14H12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 19L18 10H19L22 19M16 16H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HighContrastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="3" width="9" height="18" fill="currentColor" />
    </svg>
  );
}

function ReducedMotionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 8L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AltTextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15L16 10L13 13L9 9L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkipLinksIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FocusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RtlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 6H11C8.79086 6 7 7.79086 7 10C7 12.2091 8.79086 14 11 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 18L7 14L3 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

