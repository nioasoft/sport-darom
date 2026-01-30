'use client';

import {
  forwardRef,
  type SelectHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';
import { cn } from '@/src/lib/utils';

export type SelectVariant = 'default' | 'error' | 'success';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select visual variant */
  variant?: SelectVariant;
  /** Select size */
  size?: SelectSize;
  /** Label text */
  label?: string;
  /** Helper text shown below select */
  helperText?: string;
  /** Error message - overrides helperText and sets variant to error */
  errorMessage?: string;
  /** Success message - shown when variant is success */
  successMessage?: string;
  /** Options to display */
  options?: SelectOption[];
  /** Placeholder option (disabled) */
  placeholder?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Hides the label visually but keeps it for screen readers */
  hideLabel?: boolean;
  /** Icon at the start of select */
  startIcon?: ReactNode;
  /** Children - alternative to options prop */
  children?: ReactNode;
}

// Variant styles with AAA-compliant contrast ratios
const variantStyles: Record<SelectVariant, string> = {
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
    'after:bg-[var(--color-error)]',
    'after:scale-y-100'
  ),
  success: cn(
    'border-[var(--color-success)]',
    'focus-within:border-[var(--color-success)]',
    'after:bg-[var(--color-success)]',
    'after:scale-y-100'
  ),
};

// Size configurations ensuring 44px minimum touch target
const sizeStyles: Record<SelectSize, { wrapper: string; select: string; icon: string }> = {
  sm: {
    wrapper: 'min-h-[44px]',
    select: cn(
      'min-h-[44px] ps-3 pe-10 py-2',
      'text-[var(--text-sm)]'
    ),
    icon: 'w-4 h-4',
  },
  md: {
    wrapper: 'min-h-[48px]',
    select: cn(
      'min-h-[48px] ps-4 pe-12 py-3',
      'text-[var(--text-base)]'
    ),
    icon: 'w-5 h-5',
  },
  lg: {
    wrapper: 'min-h-[56px]',
    select: cn(
      'min-h-[56px] ps-5 pe-14 py-4',
      'text-[var(--text-lg)]'
    ),
    icon: 'w-6 h-6',
  },
};

// Chevron icon positioning
const chevronPositionStyles: Record<SelectSize, string> = {
  sm: 'end-3',
  md: 'end-4',
  lg: 'end-5',
};

// Label size styles
const labelSizeStyles: Record<SelectSize, string> = {
  sm: 'text-[var(--text-sm)]',
  md: 'text-[var(--text-base)]',
  lg: 'text-[var(--text-lg)]',
};

// Chevron icon component
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      variant: variantProp = 'default',
      size = 'md',
      label,
      helperText,
      errorMessage,
      successMessage,
      options,
      placeholder,
      fullWidth = false,
      hideLabel = false,
      startIcon,
      disabled,
      required,
      className,
      id: idProp,
      'aria-describedby': ariaDescribedByProp,
      children,
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

    const { wrapper, select, icon } = sizeStyles[size];

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

        {/* Select wrapper with decorative accent */}
        <div
          className={cn(
            'group relative flex items-center',
            'rounded-[var(--radius-lg)]',
            'bg-[var(--background)]',
            'border-2',
            'transition-all duration-[var(--duration-fast)]',
            // The "starting line" accent bar
            'after:absolute after:start-0 after:top-2 after:bottom-2',
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
          {/* Start icon */}
          {startIcon && (
            <span
              className={cn(
                icon,
                'absolute start-3 text-[var(--color-primary-600)]',
                'pointer-events-none z-10',
                disabled && 'opacity-60'
              )}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          {/* The actual select */}
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={variant === 'error'}
            aria-describedby={ariaDescribedBy}
            aria-required={required}
            className={cn(
              'flex-1 w-full',
              'bg-transparent',
              'text-[var(--foreground)]',
              'focus:outline-none',
              'disabled:cursor-not-allowed',
              'cursor-pointer',
              // Remove default browser arrow
              'appearance-none',
              select,
              // Adjust padding for start icon
              startIcon && 'ps-10'
            )}
            {...props}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {/* Options from prop */}
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}

            {/* Children (alternative to options) */}
            {children}
          </select>

          {/* Custom chevron icon */}
          <ChevronIcon
            className={cn(
              icon,
              'absolute text-[var(--color-primary-600)]',
              'pointer-events-none',
              'transition-transform duration-[var(--duration-fast)]',
              'group-focus-within:rotate-180',
              chevronPositionStyles[size],
              // RTL support
              'rtl:rotate-0 rtl:group-focus-within:rotate-180',
              disabled && 'opacity-60'
            )}
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

Select.displayName = 'Select';

export default Select;
