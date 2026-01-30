'use client';

import {
  forwardRef,
  type TextareaHTMLAttributes,
  useId,
} from 'react';
import { cn } from '@/src/lib/utils';

export type TextareaVariant = 'default' | 'error' | 'success';
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Textarea visual variant */
  variant?: TextareaVariant;
  /** Textarea size */
  size?: TextareaSize;
  /** Label text */
  label?: string;
  /** Helper text shown below textarea */
  helperText?: string;
  /** Error message - overrides helperText and sets variant to error */
  errorMessage?: string;
  /** Success message - shown when variant is success */
  successMessage?: string;
  /** Full width textarea */
  fullWidth?: boolean;
  /** Hides the label visually but keeps it for screen readers */
  hideLabel?: boolean;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows for auto-resize (not implemented, for future use) */
  maxRows?: number;
}

// Variant styles with AAA-compliant contrast ratios
const variantStyles: Record<TextareaVariant, string> = {
  default: cn(
    'border-[var(--color-primary-300)]',
    'focus-within:border-[var(--color-primary-700)]',
    // Gold "starting line" accent on focus
    'after:bg-[var(--color-accent-500)]',
    'after:scale-y-0 focus-within:after:scale-y-100'
  ),
  error: cn(
    'border-[var(--color-error)]',
    'focus-within:border-[var(--color-error)]',
    // Red accent line
    'after:bg-[var(--color-error)]',
    'after:scale-y-100'
  ),
  success: cn(
    'border-[var(--color-success)]',
    'focus-within:border-[var(--color-success)]',
    // Green accent line
    'after:bg-[var(--color-success)]',
    'after:scale-y-100'
  ),
};

// Size configurations
const sizeStyles: Record<TextareaSize, { wrapper: string; textarea: string }> = {
  sm: {
    wrapper: 'min-h-[88px]', // 2 rows minimum
    textarea: cn(
      'min-h-[88px] px-3 py-2',
      'text-[var(--text-sm)]'
    ),
  },
  md: {
    wrapper: 'min-h-[120px]', // ~3 rows
    textarea: cn(
      'min-h-[120px] px-4 py-3',
      'text-[var(--text-base)]'
    ),
  },
  lg: {
    wrapper: 'min-h-[160px]', // ~4 rows
    textarea: cn(
      'min-h-[160px] px-5 py-4',
      'text-[var(--text-lg)]'
    ),
  },
};

// Label size styles
const labelSizeStyles: Record<TextareaSize, string> = {
  sm: 'text-[var(--text-sm)]',
  md: 'text-[var(--text-base)]',
  lg: 'text-[var(--text-lg)]',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      variant: variantProp = 'default',
      size = 'md',
      label,
      helperText,
      errorMessage,
      successMessage,
      fullWidth = false,
      hideLabel = false,
      minRows = 3,
      disabled,
      required,
      className,
      id: idProp,
      'aria-describedby': ariaDescribedByProp,
      ...props
    },
    ref
  ) {
    // Generate unique IDs for accessibility
    const generatedId = useId();
    const id = idProp || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const successId = `${id}-success`;

    // Determine actual variant based on error state
    const variant = errorMessage ? 'error' : variantProp;

    // Build aria-describedby based on available messages
    const ariaDescribedBy = [
      ariaDescribedByProp,
      errorMessage ? errorId : null,
      successMessage && variant === 'success' ? successId : null,
      helperText && !errorMessage ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    const { wrapper, textarea } = sizeStyles[size];

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'font-medium text-[var(--foreground)]',
              'transition-colors duration-[var(--duration-fast)]',
              labelSizeStyles[size],
              hideLabel && 'sr-only',
              disabled && 'opacity-60',
              required && 'after:content-["_*"] after:text-[var(--color-error)] after:font-bold'
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea wrapper with decorative accent */}
        <div
          className={cn(
            'group relative',
            'rounded-[var(--radius-lg)]',
            'bg-[var(--background)]',
            'border-2',
            'transition-all duration-[var(--duration-fast)]',
            // The "starting line" accent bar - runs full height for textarea
            'after:absolute after:start-0 after:top-3 after:bottom-3',
            'after:w-[3px] after:rounded-full',
            'after:origin-center',
            'after:transition-transform after:duration-[var(--duration-normal)]',
            // Focus ring
            'focus-within:ring-[var(--focus-ring-width)]',
            'focus-within:ring-[var(--focus-ring-color)]',
            'focus-within:ring-offset-[var(--focus-ring-offset)]',
            'focus-within:ring-offset-[var(--background)]',
            // Variant styles
            variantStyles[variant],
            wrapper,
            // Disabled state
            disabled && 'opacity-60 cursor-not-allowed bg-[var(--color-primary-50)]',
            // High contrast mode
            '[data-contrast="high"]_&:border-[3px]',
            className
          )}
        >
          {/* The actual textarea */}
          <textarea
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            rows={minRows}
            aria-invalid={variant === 'error'}
            aria-describedby={ariaDescribedBy}
            aria-required={required}
            className={cn(
              'w-full h-full',
              'bg-transparent',
              'text-[var(--foreground)]',
              'placeholder:text-[var(--color-primary-400)]',
              'focus:outline-none',
              'disabled:cursor-not-allowed',
              'resize-y',
              // Remove default browser styles
              'appearance-none',
              textarea
            )}
            {...props}
          />
        </div>

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p
            id={helperId}
            className={cn(
              'text-[var(--text-sm)] text-[var(--color-primary-600)]',
              'transition-colors duration-[var(--duration-fast)]',
              disabled && 'opacity-60'
            )}
          >
            {helperText}
          </p>
        )}

        {/* Error message */}
        {errorMessage && (
          <p
            id={errorId}
            role="alert"
            className={cn(
              'text-[var(--text-sm)] text-[var(--color-error)]',
              'font-medium',
              'flex items-center gap-1.5'
            )}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {errorMessage}
          </p>
        )}

        {/* Success message */}
        {successMessage && variant === 'success' && (
          <p
            id={successId}
            className={cn(
              'text-[var(--text-sm)] text-[var(--color-success)]',
              'font-medium',
              'flex items-center gap-1.5'
            )}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
