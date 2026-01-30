'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/src/lib/utils';
import { sports } from '@/src/lib/sports';

// Contact information
const contactInfo = {
  registration: {
    name: 'ג\'ורדן סימון',
    phone: '054-6638378',
  },
  project: {
    name: 'ורד אבנעים',
    phone: '050-8651200',
  },
  location: 'באר שבע והסביבה',
};

// Social links (placeholder - can be updated with actual links)
const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'WhatsApp', href: '#', icon: 'whatsapp' },
] as const;

// Social icon component
function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'facebook':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      );
    default:
      return null;
  }
}

// Footer section heading
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={cn(
      'text-[var(--text-base)] font-bold',
      'text-white',
      'mb-4',
      // Gold underline accent
      'relative pb-2',
      'after:absolute after:bottom-0 after:start-0',
      'after:w-12 after:h-0.5',
      'after:bg-[var(--color-accent-500)]',
      'after:rounded-full'
    )}>
      {children}
    </h3>
  );
}

// Footer link component
function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const baseClasses = cn(
    'block',
    'min-h-[44px] py-2',
    'text-[var(--text-sm)]',
    'text-[var(--color-primary-200)]',
    'hover:text-white',
    'hover:ps-1',
    'focus-visible:outline-none',
    'focus-visible:ring-[var(--focus-ring-width)]',
    'focus-visible:ring-[var(--color-accent-500)]',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[var(--color-primary-900)]',
    'rounded-sm',
    'transition-all duration-[var(--duration-fast)]'
  );

  if (external) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {children}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className={cn(
        // Background with athletic pattern overlay
        'relative',
        'bg-[var(--color-primary-900)]',
        'text-white',
        // Decorative pattern
        'before:absolute before:inset-0',
        'before:bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.02)_20px,rgba(255,255,255,0.02)_40px)]',
        'before:pointer-events-none'
      )}
    >
      {/* Top victory stripe */}
      <div
        className={cn(
          'h-1.5 w-full',
          'bg-gradient-to-r from-[var(--color-accent-700)] via-[var(--color-accent-500)] to-[var(--color-accent-700)]'
        )}
        aria-hidden="true"
      />

      {/* Main footer content */}
      <div className={cn(
        'relative',
        'mx-auto max-w-7xl',
        'px-4 sm:px-6 lg:px-8',
        'py-12 lg:py-16'
      )}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              {/* Logo mark */}
              <div className={cn(
                'w-12 h-12 rounded-full',
                'bg-[var(--color-accent-500)]',
                'flex items-center justify-center'
              )}>
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-[var(--color-primary-900)]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="4" r="2.5" />
                  <path d="M15.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  <path d="M8.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  <path d="M12 7.5c-1.5 0-3 .5-4 1.5l1.5 2c.6-.5 1.5-1 2.5-1s1.9.5 2.5 1l1.5-2c-1-1-2.5-1.5-4-1.5z" />
                  <path d="M10 11l-1 6h2l.5-4 2.5 2v4h2v-5l-3-3h-3z" />
                </svg>
              </div>
              <div>
                <span className="block text-[var(--text-xl)] font-bold">
                  ספורט דרום
                </span>
                <span className="block text-[var(--text-xs)] text-[var(--color-accent-300)] uppercase tracking-wider">
                  Paralympic Sports
                </span>
              </div>
            </div>

            <p className="text-[var(--text-sm)] text-[var(--color-primary-300)] max-w-xs">
              ספורט פראלימפי באזור באר שבע והנגב - 8 ענפי ספורט לאנשים עם מוגבלויות מגיל 6 ומעלה.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={cn(
                    'w-11 h-11',
                    'flex items-center justify-center',
                    'rounded-full',
                    'bg-[var(--color-primary-800)]',
                    'text-[var(--color-primary-300)]',
                    'hover:bg-[var(--color-accent-500)]',
                    'hover:text-[var(--color-primary-900)]',
                    'focus-visible:outline-none',
                    'focus-visible:ring-[var(--focus-ring-width)]',
                    'focus-visible:ring-[var(--color-accent-500)]',
                    'focus-visible:ring-offset-2',
                    'focus-visible:ring-offset-[var(--color-primary-900)]',
                    'transition-colors duration-[var(--duration-fast)]'
                  )}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links - Sports */}
          <div>
            <SectionHeading>{t('navigation.sports')}</SectionHeading>
            <nav aria-label="ענפי ספורט">
              <ul className="space-y-1">
                {sports.slice(0, 4).map((sport) => (
                  <li key={sport.slug}>
                    <FooterLink href={`/sports/${sport.slug}`}>
                      {t(`sports.${sport.slug}.name`)}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick links - Pages */}
          <div>
            <SectionHeading>{t('navigation.home')}</SectionHeading>
            <nav aria-label="דפים">
              <ul className="space-y-1">
                <li>
                  <FooterLink href="/">{t('navigation.home')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/sports">{t('navigation.sports')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/team">{t('navigation.team')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/stories">{t('navigation.stories')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">{t('navigation.contact')}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/accessibility">{t('navigation.accessibility')}</FooterLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <SectionHeading>{t('contact.title')}</SectionHeading>
            <ul className="space-y-4">
              <li>
                <div className="text-[var(--text-xs)] text-[var(--color-primary-400)] uppercase tracking-wider mb-1">
                  הרשמה
                </div>
                <div className="text-[var(--text-sm)] text-white font-medium">
                  {contactInfo.registration.name}
                </div>
                <a
                  href={`tel:${contactInfo.registration.phone.replace(/-/g, '')}`}
                  dir="ltr"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'text-[var(--text-sm)]',
                    'text-[var(--color-accent-300)]',
                    'hover:text-[var(--color-accent-200)]',
                    'focus-visible:outline-none',
                    'focus-visible:ring-[var(--focus-ring-width)]',
                    'focus-visible:ring-[var(--color-accent-500)]',
                    'rounded-sm'
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {contactInfo.registration.phone}
                </a>
              </li>
              <li>
                <div className="text-[var(--text-xs)] text-[var(--color-primary-400)] uppercase tracking-wider mb-1">
                  מנהלת הפרויקט
                </div>
                <div className="text-[var(--text-sm)] text-white font-medium">
                  {contactInfo.project.name}
                </div>
                <a
                  href={`tel:${contactInfo.project.phone.replace(/-/g, '')}`}
                  dir="ltr"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'text-[var(--text-sm)]',
                    'text-[var(--color-accent-300)]',
                    'hover:text-[var(--color-accent-200)]',
                    'focus-visible:outline-none',
                    'focus-visible:ring-[var(--focus-ring-width)]',
                    'focus-visible:ring-[var(--color-accent-500)]',
                    'rounded-sm'
                  )}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {contactInfo.project.phone}
                </a>
              </li>
              <li>
                <div className="text-[var(--text-xs)] text-[var(--color-primary-400)] uppercase tracking-wider mb-1">
                  אזור פעילות
                </div>
                <div className="flex items-center gap-2 text-[var(--text-sm)] text-[var(--color-primary-200)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {contactInfo.location}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={cn(
        'relative',
        'border-t border-[var(--color-primary-800)]',
        'bg-[var(--color-primary-950)]'
      )}>
        <div className={cn(
          'mx-auto max-w-7xl',
          'px-4 sm:px-6 lg:px-8',
          'py-6'
        )}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[var(--text-sm)] text-[var(--color-primary-400)]">
              © {currentYear} ספורט דרום. {t('footer.rights')}.
            </p>

            {/* Legal links */}
            <nav aria-label="קישורים משפטיים">
              <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
                <li>
                  <FooterLink href="/accessibility">
                    {t('footer.accessibilityStatement')}
                  </FooterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
