import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { cn } from '@/src/lib/utils';
import { PhoneIcon } from '@/src/components/icons';
import { ContactForm } from '@/src/components/forms';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Generate metadata for the contact page
 */
export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'צרו קשר | ספורט דרום',
    ar: 'اتصل بنا | سبورت داروم',
    ru: 'Контакты | Спорт Даром',
  };

  const descriptions: Record<string, string> = {
    he: 'צרו קשר עם ספורט דרום - נשמח לענות על שאלות ולעזור לכם להצטרף לפעילות הספורטיבית הפראלימפית',
    ar: 'تواصلوا مع سبورت داروم - يسعدنا الإجابة على أسئلتكم ومساعدتكم للانضمام للنشاط الرياضي البارالمبي',
    ru: 'Свяжитесь со Спорт Даром - мы рады ответить на вопросы и помочь присоединиться к паралимпийской спортивной деятельности',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

/**
 * Contact Page
 *
 * Features:
 * - Page header with title and description
 * - ContactForm component for inquiries
 * - Direct contact information sidebar
 * - Registration contact details
 * - Location information
 * - Full RTL/LTR support
 * - WCAG AAA compliant
 */
export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');

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

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Decorative envelope/message icon */}
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
                d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
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
      <section
        className={cn(
          'py-[var(--space-16)] px-[var(--space-6)]',
          'md:px-[var(--space-12)] lg:px-[var(--space-16)]'
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={cn(
              'grid gap-8 lg:gap-12',
              'lg:grid-cols-[1fr_400px]'
            )}
          >
            {/* Contact Form */}
            <div>
              <h2 className="sr-only">{t('subtitle')}</h2>
              <ContactForm />
            </div>

            {/* Contact Information Sidebar */}
            <aside
              className={cn(
                'space-y-6',
                'lg:order-last'
              )}
              aria-label={t('directContact')}
            >
              {/* Direct Contact Card */}
              <div
                className={cn(
                  'p-6 rounded-[var(--radius-xl)]',
                  'bg-[var(--color-primary-50)]',
                  'border border-[var(--color-primary-200)]'
                )}
              >
                <h3
                  className={cn(
                    'text-[calc(var(--text-lg)*var(--font-scale))]',
                    'font-bold text-[var(--foreground)]',
                    'mb-2'
                  )}
                >
                  {t('directContact')}
                </h3>
                <p
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]',
                    'mb-4'
                  )}
                >
                  {t('directContactDescription')}
                </p>

                {/* Project Manager */}
                <div className="space-y-3">
                  <ContactItem
                    icon={<PhoneIcon />}
                    label="ורד אבנעים"
                    sublabel="מנהלת פרויקט"
                    href="tel:050-8651200"
                    value="050-8651200"
                  />
                  <ContactItem
                    icon={<PhoneIcon />}
                    label="גדי סלוביק"
                    sublabel="מאמן ראשי"
                    href="tel:050-551-3199"
                    value="050-551-3199"
                  />
                </div>
              </div>

              {/* Registration Card */}
              <div
                className={cn(
                  'p-6 rounded-[var(--radius-xl)]',
                  'bg-gradient-to-br from-[var(--color-accent-50)] to-[var(--color-accent-100)]',
                  'border border-[var(--color-accent-200)]'
                )}
              >
                <h3
                  className={cn(
                    'text-[calc(var(--text-lg)*var(--font-scale))]',
                    'font-bold text-[var(--foreground)]',
                    'mb-2'
                  )}
                >
                  {t('registrationTitle')}
                </h3>
                <p
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]',
                    'mb-4'
                  )}
                >
                  {t('registrationDescription')}
                </p>

                <ContactItem
                  icon={<PhoneIcon />}
                  label="ירדן סימון"
                  sublabel="רכז הרשמות"
                  href="tel:054-6638378"
                  value="054-6638378"
                  highlight
                />
              </div>

              {/* Location Card */}
              <div
                className={cn(
                  'p-6 rounded-[var(--radius-xl)]',
                  'bg-[var(--color-primary-50)]',
                  'border border-[var(--color-primary-200)]'
                )}
              >
                <h3
                  className={cn(
                    'text-[calc(var(--text-lg)*var(--font-scale))]',
                    'font-bold text-[var(--foreground)]',
                    'mb-2'
                  )}
                >
                  {t('locationTitle')}
                </h3>
                <p
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]'
                  )}
                >
                  {t('locationDescription')}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg',
                      'bg-[var(--color-primary-200)]',
                      'flex items-center justify-center'
                    )}
                  >
                    <LocationIcon className="w-5 h-5 text-[var(--color-primary-700)]" />
                  </div>
                  <span
                    className={cn(
                      'text-[calc(var(--text-base)*var(--font-scale))]',
                      'font-medium text-[var(--foreground)]'
                    )}
                  >
                    {tCommon('address') || 'כתובת'}: באר שבע והסביבה
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Contact item component
 */
interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  href: string;
  value: string;
  highlight?: boolean;
}

function ContactItem({ icon, label, sublabel, href, value, highlight }: ContactItemProps) {
  return (
    <a
      href={href}
      className={cn(
        'group flex items-center gap-3 p-3 -mx-3',
        'rounded-lg',
        'transition-colors duration-[var(--duration-fast)]',
        'hover:bg-[var(--color-primary-100)]',
        highlight && 'bg-[var(--color-accent-100)]/50 hover:bg-[var(--color-accent-200)]/50',
        // Focus state
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--focus-ring-color)]',
        'focus-visible:ring-offset-2'
      )}
      dir="ltr"
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex-shrink-0',
          'flex items-center justify-center',
          highlight
            ? 'bg-[var(--color-accent-500)] text-white'
            : 'bg-[var(--color-primary-200)] text-[var(--color-primary-700)]',
          'transition-transform duration-[var(--duration-fast)]',
          'group-hover:scale-110'
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0 text-start" dir="rtl">
        <p
          className={cn(
            'text-[calc(var(--text-base)*var(--font-scale))]',
            'font-medium text-[var(--foreground)]',
            'truncate'
          )}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className={cn(
              'text-[calc(var(--text-xs)*var(--font-scale))]',
              'text-[var(--color-primary-600)]'
            )}
          >
            {sublabel}
          </p>
        )}
      </div>
      <span
        className={cn(
          'text-[calc(var(--text-sm)*var(--font-scale))]',
          'font-mono tracking-wider',
          highlight ? 'text-[var(--color-accent-700)]' : 'text-[var(--color-primary-700)]',
          'group-hover:text-[var(--foreground)]'
        )}
      >
        {value}
      </span>
    </a>
  );
}

/**
 * Location icon
 */
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 21C12 21 19 15 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 15 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
