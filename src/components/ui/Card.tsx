'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';

export type CardVariant = 'default' | 'elevated' | 'interactive';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Card visual variant */
  variant?: CardVariant;
  /** Card size */
  size?: CardSize;
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Children content (body) */
  children?: ReactNode;
  /** Make card fully clickable (interactive variant recommended) */
  onClick?: (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  /** URL for card link (makes entire card clickable) */
  href?: string;
  /** Full width card */
  fullWidth?: boolean;
  /** Add decorative "starting line" accent (Paralympic track theme) */
  showAccent?: boolean;
  /** Accent position - 'start' for vertical line, 'top' for horizontal */
  accentPosition?: 'start' | 'top';
  /** Disable card (visual only, for interactive cards) */
  disabled?: boolean;
  /** Image at top of card */
  image?: ReactNode;
  /** Image aspect ratio */
  imageAspect?: '16/9' | '4/3' | '1/1' | '3/4';
}

// Variant styles following the athletic track theme
const variantStyles: Record<CardVariant, string> = {
  default: cn(
    // Clean, solid background with subtle border
    'bg-[var(--background)]',
    'border border-[var(--color-primary-200)]',
    // Subtle shadow for depth
    'shadow-sm',
    // High contrast mode
    '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]'
  ),
  elevated: cn(
    // Elevated with stronger shadow (like a podium)
    'bg-[var(--background)]',
    'border border-[var(--color-primary-100)]',
    'shadow-lg shadow-[var(--color-primary-900)]/10',
    // Hover lifts higher
    'hover:shadow-xl hover:shadow-[var(--color-primary-900)]/15',
    'transition-shadow duration-[var(--duration-normal)]',
    // High contrast mode
    '[data-contrast="high"]_&:border-2 [data-contrast="high"]_&:border-[var(--foreground)]',
    '[data-contrast="high"]_&:shadow-none'
  ),
  interactive: cn(
    // Interactive cards that respond to user input
    'bg-[var(--background)]',
    'border-2 border-[var(--color-primary-200)]',
    'shadow-md',
    // Hover: border color shifts to gold (medal)
    'hover:border-[var(--color-accent-500)]',
    'hover:shadow-lg hover:shadow-[var(--color-accent-500)]/20',
    // Focus ring
    'focus-visible:outline-none',
    'focus-visible:ring-[var(--focus-ring-width)]',
    'focus-visible:ring-[var(--focus-ring-color)]',
    'focus-visible:ring-offset-[var(--focus-ring-offset)]',
    'focus-visible:ring-offset-[var(--background)]',
    // Cursor pointer
    'cursor-pointer',
    // Transition all
    'transition-all duration-[var(--duration-normal)]',
    // High contrast mode
    '[data-contrast="high"]_&:border-[3px] [data-contrast="high"]_&:border-[var(--foreground)]',
    '[data-contrast="high"]_&:hover:border-[var(--color-accent-700)]'
  ),
};

// Size configurations
const sizeStyles: Record<CardSize, { wrapper: string; header: string; body: string; footer: string }> = {
  sm: {
    wrapper: 'rounded-[var(--radius-md)]',
    header: 'px-4 py-3 text-[var(--text-sm)]',
    body: 'px-4 py-3 text-[var(--text-sm)]',
    footer: 'px-4 py-3 text-[var(--text-xs)]',
  },
  md: {
    wrapper: 'rounded-[var(--radius-lg)]',
    header: 'px-5 py-4 text-[var(--text-base)]',
    body: 'px-5 py-4 text-[var(--text-base)]',
    footer: 'px-5 py-3 text-[var(--text-sm)]',
  },
  lg: {
    wrapper: 'rounded-[var(--radius-xl)]',
    header: 'px-6 py-5 text-[var(--text-lg)]',
    body: 'px-6 py-5 text-[var(--text-lg)]',
    footer: 'px-6 py-4 text-[var(--text-base)]',
  },
};

// Accent line styles - the "starting line" gold accent
const accentStyles = {
  start: cn(
    // Vertical gold line on the start edge (like track lane markings)
    'before:absolute before:start-0 before:top-4 before:bottom-4',
    'before:w-1 before:rounded-full',
    'before:bg-gradient-to-b before:from-[var(--color-accent-300)] before:via-[var(--color-accent-500)] before:to-[var(--color-accent-300)]',
    // Animation: line grows from center
    'before:origin-center before:scale-y-0',
    'before:transition-transform before:duration-[var(--duration-normal)]',
    'hover:before:scale-y-100 focus-within:before:scale-y-100',
    // High contrast: solid gold
    '[data-contrast="high"]_&:before:bg-[var(--color-accent-700)]',
    '[data-contrast="high"]_&:before:scale-y-100'
  ),
  top: cn(
    // Horizontal gold line at top (like finish line)
    'before:absolute before:top-0 before:start-4 before:end-4',
    'before:h-1 before:rounded-full',
    'before:bg-gradient-to-r before:from-[var(--color-accent-300)] before:via-[var(--color-accent-500)] before:to-[var(--color-accent-300)]',
    // Animation: line grows from center
    'before:origin-center before:scale-x-0',
    'before:transition-transform before:duration-[var(--duration-normal)]',
    'hover:before:scale-x-100 focus-within:before:scale-x-100',
    // RTL support
    '[dir="rtl"]_&:before:bg-gradient-to-l',
    // High contrast: solid gold
    '[data-contrast="high"]_&:before:bg-[var(--color-accent-700)]',
    '[data-contrast="high"]_&:before:scale-x-100'
  ),
};

// Image aspect ratio styles
const imageAspectStyles: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
};

// Motion variants for interactive cards
const cardMotionVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
  },
  tap: {
    scale: 0.98,
    y: 0,
  },
};

// Header component for consistent styling
export function CardHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-b border-[var(--color-primary-100)]',
        'font-semibold text-[var(--foreground)]',
        '[data-contrast="high"]_&:border-[var(--foreground)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Footer component for consistent styling
export function CardFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-t border-[var(--color-primary-100)]',
        'text-[var(--color-primary-700)]',
        '[data-contrast="high"]_&:border-[var(--foreground)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Main Card component
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      variant = 'default',
      size = 'md',
      header,
      footer,
      children,
      onClick,
      href,
      fullWidth = false,
      showAccent = false,
      accentPosition = 'start',
      disabled = false,
      image,
      imageAspect = '16/9',
      className,
      ...props
    },
    ref
  ) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInteractive = variant === 'interactive' || onClick || href;

    // Handle keyboard interaction for interactive cards
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (href) {
            window.location.href = href;
          } else if (onClick) {
            onClick(event);
          }
        }
      },
      [disabled, href, onClick]
    );

    // Handle click
    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (href) {
          window.location.href = href;
        } else if (onClick) {
          onClick(event);
        }
      },
      [disabled, href, onClick]
    );

    // Focus management: when card becomes focused, ensure it's visible
    useEffect(() => {
      const card = cardRef.current;
      if (!card || !isInteractive) return;

      const handleFocus = () => {
        // Scroll into view if needed
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };

      card.addEventListener('focus', handleFocus);
      return () => card.removeEventListener('focus', handleFocus);
    }, [isInteractive]);

    const { wrapper, header: headerStyle, body, footer: footerStyle } = sizeStyles[size];

    // Determine if we should use motion
    const shouldAnimate = isInteractive && !disabled;

    // The card content
    const cardContent = (
      <>
        {/* Image section */}
        {image && (
          <div
            className={cn(
              'overflow-hidden',
              'rounded-t-[inherit]',
              imageAspectStyles[imageAspect],
              'bg-[var(--color-primary-100)]'
            )}
          >
            {image}
          </div>
        )}

        {/* Header */}
        {header && (
          <CardHeader className={headerStyle}>
            {header}
          </CardHeader>
        )}

        {/* Body */}
        {children && (
          <div
            className={cn(
              body,
              'text-[var(--foreground)]',
              'flex-1'
            )}
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <CardFooter className={footerStyle}>
            {footer}
          </CardFooter>
        )}
      </>
    );

    // Common props for both motion and non-motion cards
    const commonProps = {
      ref: cardRef,
      className: cn(
        // Base styles
        'relative flex flex-col overflow-hidden',
        // Variant
        variantStyles[variant],
        // Size
        wrapper,
        // Width
        fullWidth && 'w-full',
        // Accent
        showAccent && accentStyles[accentPosition],
        // Disabled
        disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
        // Custom
        className
      ),
      // Accessibility for interactive cards
      ...(isInteractive && !disabled && {
        role: 'button',
        tabIndex: 0,
        'aria-disabled': disabled,
      }),
      onClick: isInteractive ? handleClick : undefined,
      onKeyDown: isInteractive ? handleKeyDown : undefined,
    };

    // Render motion card for interactive variants
    if (shouldAnimate) {
      return (
        <motion.div
          {...commonProps}
          ref={ref || cardRef}
          variants={cardMotionVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {cardContent}
        </motion.div>
      );
    }

    // Render static card
    return (
      <div
        {...commonProps}
        ref={ref || cardRef}
        {...props}
      >
        {cardContent}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
