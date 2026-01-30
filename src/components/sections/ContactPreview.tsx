'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { PhoneIcon, HeartIcon } from '@/src/components/icons';

export interface ContactPreviewProps {
  /** Section title override */
  title?: string;
  /** Section subtitle override */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show section title */
  showTitle?: boolean;
  /** Phone number to display */
  phone?: string;
  /** Email to display */
  email?: string;
}

/**
 * ContactPreview Component
 *
 * A warm, inviting contact teaser section for the homepage.
 * Features:
 * - "Welcome mat" aesthetic with embracing warmth
 * - Athletic starting blocks / open arms motif
 * - Contact quick-access cards (phone, email)
 * - Prominent CTA to full contact page
 * - Full RTL support
 * - WCAG AAA compliant (7:1+ contrast)
 * - Reduced motion support
 */
export function ContactPreview({
  title,
  subtitle,
  className,
  showTitle = true,
  phone = '054-6638378',
  email = 'info@sport-darom.org.il',
}: ContactPreviewProps) {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const sectionTitle = title || t('title');
  const sectionSubtitle = subtitle || t('subtitle');

  // Section container animation
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  // Title animation
  const titleVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Card animation
  const cardVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 30, scale: 0.95 },
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

  // Open arms / welcoming gesture animation
  const armVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0.3 }
      : { opacity: 0, rotate: 0, x: 0 },
    visible: {
      opacity: 0.15,
      rotate: 0,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="contact-preview"
      aria-labelledby="contact-preview-title"
      className={cn(
        // Section padding
        'py-[var(--space-20)] px-[var(--space-6)]',
        'md:px-[var(--space-12)] lg:px-[var(--space-16)]',
        // Warm, welcoming background gradient
        'relative overflow-hidden',
        'bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--color-accent-100)]/30 to-[var(--color-primary-100)]',
        className
      )}
    >
      {/* Decorative background pattern - starting blocks / welcome mat texture */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden',
          'opacity-[0.04]'
        )}
        aria-hidden="true"
      >
        {/* Horizontal welcoming lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                180deg,
                var(--color-primary-900) 0px,
                var(--color-primary-900) 1px,
                transparent 1px,
                transparent 60px
              )
            `,
          }}
        />
      </div>

      {/* Decorative "open arms" curves - welcoming gesture */}
      <motion.div
        variants={armVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={cn(
          'absolute top-1/2 start-0 -translate-y-1/2',
          'w-[300px] h-[600px]'
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 600"
          fill="none"
          className="w-full h-full text-[var(--color-accent-500)]"
        >
          <path
            d="M300 0 C100 100, 50 300, 300 600"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M300 50 C150 150, 100 300, 300 550"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <motion.div
        variants={armVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={cn(
          'absolute top-1/2 end-0 -translate-y-1/2',
          'w-[300px] h-[600px]',
          'scale-x-[-1]'
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 300 600"
          fill="none"
          className="w-full h-full text-[var(--color-accent-500)]"
        >
          <path
            d="M300 0 C100 100, 50 300, 300 600"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M300 50 C150 150, 100 300, 300 550"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Decorative corner hearts/connection symbols */}
      <div className="absolute top-8 start-8 opacity-15" aria-hidden="true">
        <HandshakeIcon className="w-12 h-12 text-[var(--color-accent-600)]" />
      </div>
      <div className="absolute bottom-8 end-8 opacity-15 rotate-12" aria-hidden="true">
        <HeartIcon className="w-10 h-10 text-[var(--color-accent-500)]" />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Section header */}
        {showTitle && (
          <div className="mb-[var(--space-12)] text-center">
            {/* Decorative element - open envelope / message motif */}
            <div
              className={cn(
                'flex items-center justify-center gap-4 mb-[var(--space-4)]'
              )}
              aria-hidden="true"
            >
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-12 origin-end rtl:origin-start',
                  'bg-gradient-to-l from-[var(--color-accent-500)] to-transparent',
                  'rtl:bg-gradient-to-r'
                )}
              />
              {/* Message/envelope icon */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, y: 20 }}
                animate={isInView ? { scale: 1, y: 0 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: prefersReducedMotion ? 0 : 0.3,
                }}
                className={cn(
                  'w-12 h-12 rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-600)]',
                  'shadow-lg shadow-[var(--color-accent-500)]/30',
                  'flex items-center justify-center'
                )}
              >
                <MessageIcon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-0.5 w-12 origin-start rtl:origin-end',
                  'bg-gradient-to-r from-[var(--color-accent-500)] to-transparent',
                  'rtl:bg-gradient-to-l'
                )}
              />
            </div>

            {/* Section title */}
            <motion.h2
              id="contact-preview-title"
              variants={titleVariants}
              className={cn(
                'text-[clamp(1.75rem,5vw,2.5rem)]',
                'font-bold tracking-tight',
                'text-[var(--color-primary-900)]',
                // Scalable font
                'text-[calc(clamp(1.75rem,5vw,2.5rem)*var(--font-scale))]'
              )}
            >
              {sectionTitle}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={titleVariants}
              className={cn(
                'mt-[var(--space-3)] text-[var(--text-lg)]',
                'text-[var(--color-primary-700)]',
                'max-w-xl mx-auto',
                'text-[calc(var(--text-lg)*var(--font-scale))]'
              )}
            >
              {sectionSubtitle}
            </motion.p>

            {/* Decorative underline - warm wave */}
            <div className="flex justify-center gap-1 mt-[var(--space-4)]" aria-hidden="true">
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-8 rounded-full',
                  'bg-[var(--color-accent-300)]'
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-16 rounded-full',
                  'bg-[var(--color-accent-500)]'
                )}
              />
              <motion.div
                variants={lineVariants}
                className={cn(
                  'h-1 w-8 rounded-full',
                  'bg-[var(--color-accent-300)]'
                )}
              />
            </div>
          </div>
        )}

        {/* Contact cards grid */}
        <div
          className={cn(
            'grid gap-6 mb-[var(--space-10)]',
            'grid-cols-1 sm:grid-cols-2'
          )}
        >
          {/* Phone card */}
          <motion.a
            href={`tel:${phone.replace(/-/g, '')}`}
            variants={cardVariants}
            whileHover={prefersReducedMotion ? {} : {
              scale: 1.02,
              y: -4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(184, 134, 11, 0.15)',
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className={cn(
              'group relative overflow-hidden',
              'flex items-center gap-4 p-6',
              'bg-white/80 backdrop-blur-sm',
              'border-2 border-[var(--color-primary-200)]',
              'rounded-[var(--radius-xl)]',
              // Focus styles
              'focus-visible:outline-none',
              'focus-visible:ring-[var(--focus-ring-width)]',
              'focus-visible:ring-[var(--focus-ring-color)]',
              'focus-visible:ring-offset-[var(--focus-ring-offset)]',
              // Transition
              'transition-all duration-[var(--duration-normal)]',
              // Hover border
              'hover:border-[var(--color-accent-400)]',
              // Shadow
              'shadow-md'
            )}
          >
            {/* Top accent line */}
            <div
              className={cn(
                'absolute top-0 start-0 end-0 h-1',
                'bg-gradient-to-r from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-400)]',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-[var(--duration-normal)]'
              )}
              aria-hidden="true"
            />

            {/* Icon container */}
            <div
              className={cn(
                'flex-shrink-0 w-14 h-14 rounded-full',
                'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
                'group-hover:from-[var(--color-accent-100)] group-hover:to-[var(--color-accent-200)]',
                'flex items-center justify-center',
                'transition-colors duration-[var(--duration-normal)]'
              )}
            >
              <PhoneIcon className={cn(
                'w-6 h-6 text-[var(--color-primary-600)]',
                'group-hover:text-[var(--color-accent-600)]',
                'transition-colors duration-[var(--duration-normal)]'
              )} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-[var(--text-sm)] font-medium',
                  'text-[var(--color-primary-600)]',
                  'mb-1',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {tCommon('phone')}
              </p>
              <p
                className={cn(
                  'text-[var(--text-lg)] font-bold',
                  'text-[var(--color-primary-900)]',
                  'group-hover:text-[var(--color-accent-700)]',
                  'transition-colors duration-[var(--duration-normal)]',
                  'text-[calc(var(--text-lg)*var(--font-scale))]',
                  // LTR for phone number
                  'dir-ltr'
                )}
                dir="ltr"
              >
                {phone}
              </p>
            </div>

            {/* Arrow indicator */}
            <div
              className={cn(
                'flex-shrink-0',
                'text-[var(--color-primary-400)]',
                'group-hover:text-[var(--color-accent-500)]',
                'transition-all duration-[var(--duration-normal)]',
                'group-hover:translate-x-1',
                'rtl:group-hover:-translate-x-1'
              )}
              aria-hidden="true"
            >
              <ArrowIcon className="w-5 h-5 rtl:rotate-180" />
            </div>
          </motion.a>

          {/* Email card */}
          <motion.a
            href={`mailto:${email}`}
            variants={cardVariants}
            whileHover={prefersReducedMotion ? {} : {
              scale: 1.02,
              y: -4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(184, 134, 11, 0.15)',
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className={cn(
              'group relative overflow-hidden',
              'flex items-center gap-4 p-6',
              'bg-white/80 backdrop-blur-sm',
              'border-2 border-[var(--color-primary-200)]',
              'rounded-[var(--radius-xl)]',
              // Focus styles
              'focus-visible:outline-none',
              'focus-visible:ring-[var(--focus-ring-width)]',
              'focus-visible:ring-[var(--focus-ring-color)]',
              'focus-visible:ring-offset-[var(--focus-ring-offset)]',
              // Transition
              'transition-all duration-[var(--duration-normal)]',
              // Hover border
              'hover:border-[var(--color-accent-400)]',
              // Shadow
              'shadow-md'
            )}
          >
            {/* Top accent line */}
            <div
              className={cn(
                'absolute top-0 start-0 end-0 h-1',
                'bg-gradient-to-r from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-400)]',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-[var(--duration-normal)]'
              )}
              aria-hidden="true"
            />

            {/* Icon container */}
            <div
              className={cn(
                'flex-shrink-0 w-14 h-14 rounded-full',
                'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]',
                'group-hover:from-[var(--color-accent-100)] group-hover:to-[var(--color-accent-200)]',
                'flex items-center justify-center',
                'transition-colors duration-[var(--duration-normal)]'
              )}
            >
              <EmailIcon className={cn(
                'w-6 h-6 text-[var(--color-primary-600)]',
                'group-hover:text-[var(--color-accent-600)]',
                'transition-colors duration-[var(--duration-normal)]'
              )} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-[var(--text-sm)] font-medium',
                  'text-[var(--color-primary-600)]',
                  'mb-1',
                  'text-[calc(var(--text-sm)*var(--font-scale))]'
                )}
              >
                {tCommon('email')}
              </p>
              <p
                className={cn(
                  'text-[var(--text-lg)] font-bold',
                  'text-[var(--color-primary-900)]',
                  'group-hover:text-[var(--color-accent-700)]',
                  'transition-colors duration-[var(--duration-normal)]',
                  'text-[calc(var(--text-lg)*var(--font-scale))]',
                  'truncate'
                )}
              >
                {email}
              </p>
            </div>

            {/* Arrow indicator */}
            <div
              className={cn(
                'flex-shrink-0',
                'text-[var(--color-primary-400)]',
                'group-hover:text-[var(--color-accent-500)]',
                'transition-all duration-[var(--duration-normal)]',
                'group-hover:translate-x-1',
                'rtl:group-hover:-translate-x-1'
              )}
              aria-hidden="true"
            >
              <ArrowIcon className="w-5 h-5 rtl:rotate-180" />
            </div>
          </motion.a>
        </div>

        {/* Main CTA button */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className="text-center"
        >
          <Link
            href="/contact"
            className={cn(
              'group relative inline-flex items-center justify-center',
              'overflow-hidden',
              // Sizing - minimum 44px touch target
              'min-h-[56px] px-[var(--space-10)] py-[var(--space-5)]',
              // Typography
              'text-[var(--text-lg)] font-bold',
              // Colors - primary with gold accent
              'bg-gradient-to-r from-[var(--color-primary-800)] via-[var(--color-primary-700)] to-[var(--color-primary-800)]',
              'text-white',
              // Border radius
              'rounded-full',
              // Transitions
              'transition-all duration-[var(--duration-normal)]',
              // Focus states - AAA compliant
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-[var(--focus-ring-offset)]',
              'focus-visible:outline-[var(--color-primary-900)]',
              // Hover
              'hover:from-[var(--color-primary-700)] hover:via-[var(--color-primary-600)] hover:to-[var(--color-primary-700)]',
              // Shadow
              'shadow-lg shadow-[var(--color-primary-900)]/30',
              'hover:shadow-xl hover:shadow-[var(--color-primary-900)]/40'
            )}
          >
            {/* Gold accent border */}
            <span
              className={cn(
                'absolute inset-0 rounded-full',
                'border-2 border-[var(--color-accent-500)]/50',
                'group-hover:border-[var(--color-accent-400)]',
                'transition-colors duration-[var(--duration-normal)]'
              )}
              aria-hidden="true"
            />

            {/* Shimmer effect */}
            <span
              className={cn(
                'absolute inset-0 -translate-x-full skew-x-[-20deg]',
                'bg-gradient-to-r from-transparent via-white/20 to-transparent',
                'transition-transform duration-[var(--duration-slow)]',
                'group-hover:translate-x-full',
                'rtl:translate-x-full rtl:skew-x-[20deg]',
                'rtl:group-hover:-translate-x-full'
              )}
              aria-hidden="true"
            />

            <span className="relative z-10">{t('cta') || 'לדף יצירת קשר'}</span>

            {/* Arrow */}
            <span
              className={cn(
                'relative z-10 ms-[var(--space-3)]',
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Bottom decorative element - welcome finish */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            ease: [0.22, 1, 0.36, 1],
            delay: prefersReducedMotion ? 0 : 0.7,
          }}
          className={cn(
            'mt-[var(--space-12)] h-1 mx-auto max-w-xs',
            'rounded-full origin-center',
            'bg-gradient-to-r from-transparent via-[var(--color-accent-400)] to-transparent'
          )}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

/**
 * Email icon component
 */
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6l-10 7L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Message icon component
 */
function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

/**
 * Arrow icon component
 */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Handshake icon component
 */
function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

export default ContactPreview;
