'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/src/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state - shows spinner and sets aria-busy */
  isLoading?: boolean;
  /** Icon to display */
  icon?: ReactNode;
  /** Icon position - automatically flips in RTL */
  iconPosition?: 'start' | 'end';
  /** Button content */
  children: ReactNode;
  /** Full width button */
  fullWidth?: boolean;
}

// Variant styles with AAA-compliant contrast ratios
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    // Base: Deep blue background with white text (15.1:1 contrast)
    'bg-[var(--color-primary-900)] text-white',
    // Decorative diagonal accent line
    'before:absolute before:inset-0 before:bg-gradient-to-r',
    'before:from-[var(--color-accent-500)] before:to-[var(--color-accent-300)]',
    'before:origin-left before:-skew-x-12 before:scale-x-0',
    'before:transition-transform before:duration-[var(--duration-normal)]',
    // Hover: accent reveal
    'hover:before:scale-x-[0.15]',
    // Active state
    'active:bg-[var(--color-primary-800)]',
    // Focus ring
    'focus-visible:ring-[var(--color-primary-500)]'
  ),
  secondary: cn(
    // Gold accent with dark text (7.2:1 contrast)
    'bg-[var(--color-accent-500)] text-[var(--color-primary-900)]',
    // Subtle shine effect
    'before:absolute before:inset-0',
    'before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0',
    'before:translate-x-[-100%] before:skew-x-12',
    'before:transition-transform before:duration-[var(--duration-slow)]',
    'hover:before:translate-x-[100%]',
    // Hover darken
    'hover:bg-[var(--color-accent-600)]',
    'active:bg-[var(--color-accent-700)]',
    'focus-visible:ring-[var(--color-accent-500)]'
  ),
  outline: cn(
    // Transparent with primary border
    'bg-transparent text-[var(--color-primary-900)]',
    'border-2 border-[var(--color-primary-700)]',
    // Fill from bottom on hover
    'before:absolute before:inset-0 before:bg-[var(--color-primary-900)]',
    'before:origin-bottom before:scale-y-0',
    'before:transition-transform before:duration-[var(--duration-normal)]',
    'hover:before:scale-y-100 hover:text-white',
    'active:before:bg-[var(--color-primary-800)]',
    'focus-visible:ring-[var(--color-primary-500)]',
    // High contrast mode adjustments
    '[data-contrast="high"]_&:border-[3px]'
  ),
  ghost: cn(
    // Minimal style
    'bg-transparent text-[var(--color-primary-900)]',
    // Subtle background on hover
    'hover:bg-[var(--color-primary-100)]',
    'active:bg-[var(--color-primary-200)]',
    'focus-visible:ring-[var(--color-primary-500)]'
  ),
};

// Size configurations ensuring 44px minimum touch target
const sizeStyles: Record<ButtonSize, string> = {
  sm: cn(
    'min-h-[44px] px-4 py-2',
    'text-[var(--text-sm)]',
    'gap-2'
  ),
  md: cn(
    'min-h-[48px] px-6 py-3',
    'text-[var(--text-base)]',
    'gap-2.5'
  ),
  lg: cn(
    'min-h-[56px] px-8 py-4',
    'text-[var(--text-lg)]',
    'gap-3'
  ),
};

// Loading spinner component
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Motion variants for the button
const buttonMotionVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'start',
      children,
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    // Determine icon sizes based on button size
    const iconSizeClass = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }[size];

    return (
      <motion.button
        ref={ref}
        variants={buttonMotionVariants}
        initial="initial"
        whileHover={isDisabled ? undefined : 'hover'}
        whileTap={isDisabled ? undefined : 'tap'}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'font-semibold tracking-wide',
          'rounded-[var(--radius-lg)]',
          'overflow-hidden',
          'cursor-pointer select-none',
          'transition-colors duration-[var(--duration-fast)]',

          // Focus styles - AAA compliant (3px+ outline)
          'focus-visible:outline-none',
          'focus-visible:ring-[var(--focus-ring-width)]',
          'focus-visible:ring-offset-[var(--focus-ring-offset)]',
          'focus-visible:ring-offset-[var(--background)]',

          // Disabled styles
          'disabled:cursor-not-allowed',
          'disabled:opacity-60',
          'disabled:before:hidden',

          // Z-index for content above pseudo-elements
          '[&>*]:relative [&>*]:z-10',

          // Width
          fullWidth && 'w-full',

          // Apply variant and size
          variantStyles[variant],
          sizeStyles[size],

          // Custom classes
          className
        )}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {/* Loading spinner */}
        {isLoading && (
          <LoadingSpinner className={cn(iconSizeClass, 'shrink-0')} />
        )}

        {/* Start icon (becomes end in RTL) */}
        {!isLoading && icon && iconPosition === 'start' && (
          <span className={cn(iconSizeClass, 'shrink-0 rtl:order-last')}>
            {icon}
          </span>
        )}

        {/* Button text */}
        <span className={cn(isLoading && 'opacity-0')}>
          {children}
        </span>

        {/* End icon (becomes start in RTL) */}
        {!isLoading && icon && iconPosition === 'end' && (
          <span className={cn(iconSizeClass, 'shrink-0 rtl:order-first')}>
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
