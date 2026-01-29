'use client';

import { useState, useRef, useId, useCallback, useMemo, type FormEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { Button } from '@/src/components/ui/Button';

// Email validation regex - defined outside component to avoid dependency warnings
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormProps {
  /** Additional CSS classes */
  className?: string;
  /** Custom submit handler (overrides default API call) */
  onSubmit?: (data: FormData) => Promise<{ success: boolean; error?: string }>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * ContactForm Component - "Victory Celebration" Design
 *
 * A warm, welcoming contact form with Paralympic-inspired aesthetics:
 * - Finish line gold accents and medal decorations
 * - Triumphant success animation (confetti-like celebration)
 * - Encouraging, supportive tone
 * - Full WCAG AAA accessibility
 * - Complete RTL/LTR support
 */
export function ContactForm({ className, onSubmit: customSubmit }: ContactFormProps) {
  const t = useTranslations('form');
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string>('');

  // Validate a single field
  const validateField = useCallback(
    (name: keyof FormData, value: string): string | undefined => {
      switch (name) {
        case 'name':
          return value.trim() ? undefined : t('required');
        case 'email':
          if (!value.trim()) return t('required');
          if (!EMAIL_REGEX.test(value)) return t('invalidEmail');
          return undefined;
        case 'message':
          return value.trim() ? undefined : t('required');
        default:
          return undefined;
      }
    },
    [t]
  );

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (['name', 'email', 'message'] as const).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  // Handle field change
  const handleChange = useCallback(
    (name: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // Handle field blur - validate on blur
  const handleBlur = useCallback(
    (name: keyof FormData) => {
      const error = validateField(name, formData[name]);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [formData, validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        // Focus first error field
        const firstErrorField = Object.keys(errors)[0] as keyof FormData;
        if (firstErrorField) {
          const element = formRef.current?.querySelector(
            `[name="${firstErrorField}"]`
          ) as HTMLElement;
          element?.focus();
        }
        return;
      }

      setStatus('submitting');
      setServerError('');

      try {
        let result: { success: boolean; error?: string };

        if (customSubmit) {
          result = await customSubmit(formData);
        } else {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          result = await response.json();
        }

        if (result.success) {
          setStatus('success');
          // Reset form after success
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          setStatus('error');
          setServerError(result.error || t('error'));
        }
      } catch {
        setStatus('error');
        setServerError(t('error'));
      }
    },
    [formData, validateForm, errors, customSubmit, t]
  );

  // Reset form to try again
  const handleReset = useCallback(() => {
    setStatus('idle');
    setServerError('');
  }, []);

  // Pre-compute confetti positions to avoid Math.random during render
  const confettiPositions = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${20 + i * 5}%`,
      xOffset: `${50 + (i % 3 - 1) * 10}%`,
    })),
    []
  );

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const fieldVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const successVariants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'rounded-[var(--radius-xl)]',
        'bg-[var(--background)]',
        'border-2 border-[var(--color-primary-200)]',
        'shadow-lg shadow-[var(--color-primary-900)]/10',
        className
      )}
    >
      {/* Decorative finish line pattern at top */}
      <div
        className={cn(
          'absolute top-0 inset-x-0 h-2',
          'bg-gradient-to-r from-[var(--color-accent-500)] via-[var(--color-accent-400)] to-[var(--color-accent-500)]'
        )}
        aria-hidden="true"
      />

      {/* Decorative diagonal stripes */}
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden pointer-events-none',
          'opacity-[0.03]'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute -inset-[100%] rotate-[-15deg]',
            'rtl:rotate-[15deg]'
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              var(--color-accent-500) 0px,
              var(--color-accent-500) 2px,
              transparent 2px,
              transparent 30px
            )`,
          }}
        />
      </div>

      {/* Form content */}
      <div className="relative z-10 p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* Success State */}
          {status === 'success' && (
            <motion.div
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center py-8"
            >
              {/* Celebration icon */}
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: prefersReducedMotion ? 0 : 0.2,
                }}
                className={cn(
                  'inline-flex items-center justify-center',
                  'w-20 h-20 mb-6',
                  'rounded-full',
                  'bg-gradient-to-br from-[var(--color-accent-400)] via-[var(--color-accent-500)] to-[var(--color-accent-600)]',
                  'shadow-xl shadow-[var(--color-accent-500)]/40'
                )}
              >
                <TrophyIcon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Confetti decoration */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {confettiPositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 0,
                        x: pos.xOffset,
                        rotate: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [0, -20, 80],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.1 + i * 0.05,
                        ease: 'easeOut',
                      }}
                      className={cn(
                        'absolute top-1/2 w-3 h-3 rounded-full',
                        i % 3 === 0 && 'bg-[var(--color-accent-500)]',
                        i % 3 === 1 && 'bg-[var(--color-primary-500)]',
                        i % 3 === 2 && 'bg-[var(--color-success)]'
                      )}
                      style={{
                        left: pos.left,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}

              <h3
                className={cn(
                  'text-[calc(var(--text-2xl)*var(--font-scale))]',
                  'font-bold text-[var(--color-success)]',
                  'mb-3'
                )}
              >
                {t('success')}
              </h3>

              <p
                className={cn(
                  'text-[calc(var(--text-base)*var(--font-scale))]',
                  'text-[var(--color-primary-700)]',
                  'mb-6'
                )}
              >
                {t('successDescription') ||
                  'נחזור אליכם בהקדם האפשרי'}
              </p>

              {/* Decorative finish line */}
              <div
                className={cn(
                  'h-1 w-24 mx-auto rounded-full',
                  'bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent'
                )}
                aria-hidden="true"
              />
            </motion.div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <motion.div
              key="error"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center py-8"
            >
              {/* Error icon */}
              <div
                className={cn(
                  'inline-flex items-center justify-center',
                  'w-16 h-16 mb-6',
                  'rounded-full',
                  'bg-[var(--color-error)]/10',
                  'border-2 border-[var(--color-error)]'
                )}
              >
                <ErrorIcon className="w-8 h-8 text-[var(--color-error)]" />
              </div>

              <h3
                className={cn(
                  'text-[calc(var(--text-xl)*var(--font-scale))]',
                  'font-bold text-[var(--color-error)]',
                  'mb-3'
                )}
              >
                {t('error')}
              </h3>

              {serverError && (
                <p
                  className={cn(
                    'text-[calc(var(--text-sm)*var(--font-scale))]',
                    'text-[var(--color-primary-700)]',
                    'mb-6'
                  )}
                >
                  {serverError}
                </p>
              )}

              <Button
                variant="outline"
                onClick={handleReset}
                className="min-w-[160px]"
              >
                {t('tryAgain') || 'נסו שוב'}
              </Button>
            </motion.div>
          )}

          {/* Form State (idle or submitting) */}
          {(status === 'idle' || status === 'submitting') && (
            <motion.form
              key="form"
              ref={formRef}
              id={formId}
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-busy={status === 'submitting'}
              aria-describedby={`${formId}-description`}
              className="space-y-6"
              noValidate
            >
              {/* Form description for screen readers */}
              <p id={`${formId}-description`} className="sr-only">
                {t('formDescription') ||
                  'טופס יצירת קשר. מלאו את הפרטים ונחזור אליכם בהקדם'}
              </p>

              {/* Name field */}
              <motion.div variants={fieldVariants}>
                <Input
                  name="name"
                  label={t('name')}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  errorMessage={errors.name}
                  required
                  fullWidth
                  disabled={status === 'submitting'}
                  autoComplete="name"
                />
              </motion.div>

              {/* Email field */}
              <motion.div variants={fieldVariants}>
                <Input
                  name="email"
                  type="email"
                  label={t('email')}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  errorMessage={errors.email}
                  required
                  fullWidth
                  disabled={status === 'submitting'}
                  autoComplete="email"
                  dir="ltr"
                />
              </motion.div>

              {/* Phone field */}
              <motion.div variants={fieldVariants}>
                <Input
                  name="phone"
                  type="tel"
                  label={t('phone')}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  errorMessage={errors.phone}
                  fullWidth
                  disabled={status === 'submitting'}
                  autoComplete="tel"
                  dir="ltr"
                />
              </motion.div>

              {/* Message field */}
              <motion.div variants={fieldVariants}>
                <Textarea
                  name="message"
                  label={t('message')}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  errorMessage={errors.message}
                  required
                  fullWidth
                  disabled={status === 'submitting'}
                  minRows={4}
                />
              </motion.div>

              {/* Submit button */}
              <motion.div variants={fieldVariants} className="pt-2">
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  isLoading={status === 'submitting'}
                  icon={<SendIcon className="w-5 h-5" />}
                  iconPosition="end"
                >
                  {status === 'submitting' ? t('sending') : t('submit')}
                </Button>
              </motion.div>

              {/* Decorative medal corner */}
              <div
                className={cn(
                  'absolute -bottom-4 -end-4 opacity-20',
                  'transition-opacity duration-[var(--duration-normal)]',
                  'group-hover:opacity-40'
                )}
                aria-hidden="true"
              >
                <MedalIcon className="w-24 h-24 text-[var(--color-accent-500)]" />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Trophy icon for success state
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
      <path
        d="M12 8L12.5 9.5H14L12.75 10.5L13.25 12L12 11L10.75 12L11.25 10.5L10 9.5H11.5L12 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Error icon
 */
function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7V13M12 16V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Send icon for submit button
 */
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, 'rtl:rotate-180')}
      aria-hidden="true"
    >
      <path
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Medal decorative icon
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
      <circle
        cx="12"
        cy="15"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
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

export default ContactForm;
