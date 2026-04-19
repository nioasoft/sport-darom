'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

interface GalleryImage {
  src: string;
  alt: string;
  orientation: 'horizontal' | 'vertical';
}

interface ImageGalleryProps {
  sportSlug: string;
  sportName: string;
  images?: GalleryImage[];
  className?: string;
  /** How many images to show before the "load more" button appears. */
  initialCount?: number;
  /** How many additional images to reveal each time the button is clicked. */
  pageSize?: number;
}

const DEFAULT_INITIAL = 12;
const DEFAULT_PAGE_SIZE = 12;

/**
 * ImageGallery Component
 *
 * Displays sport images in a masonry-like grid layout.
 * Features:
 * - Supports both horizontal and vertical images
 * - Lightbox modal for full-size viewing
 * - Keyboard navigation
 * - Reduced motion support
 * - Accessible with proper ARIA labels
 */
export function ImageGallery({
  sportSlug,
  sportName,
  images,
  className,
  initialCount = DEFAULT_INITIAL,
  pageSize = DEFAULT_PAGE_SIZE,
}: ImageGalleryProps) {
  const t = useTranslations('sports');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const prefersReducedMotion = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

  // Default placeholder images if none provided
  const galleryImages: GalleryImage[] = images || [
    {
      src: `/images/sports/${sportSlug}/1.webp`,
      alt: `${sportName} training session`,
      orientation: 'horizontal',
    },
    {
      src: `/images/sports/${sportSlug}/2.webp`,
      alt: `${sportName} athlete in action`,
      orientation: 'vertical',
    },
    {
      src: `/images/sports/${sportSlug}/3.webp`,
      alt: `${sportName} competition`,
      orientation: 'horizontal',
    },
    {
      src: `/images/sports/${sportSlug}/4.webp`,
      alt: `${sportName} team practice`,
      orientation: 'horizontal',
    },
  ];

  const total = galleryImages.length;
  const shown = Math.min(visibleCount, total);
  const hasMore = shown < total;
  const visibleImages = galleryImages.slice(0, shown);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedImage(index);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    if (direction === 'prev') {
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1
      );
    } else {
      setSelectedImage(
        selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0
      );
    }
  };

  return (
    <>
      <motion.div
        ref={galleryRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={cn(
          'grid gap-4',
          // Masonry-like layout
          'grid-cols-2 md:grid-cols-3',
          className
        )}
        role="grid"
        aria-label={`${sportName} photo gallery`}
      >
        {visibleImages.map((image, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            onClick={() => setSelectedImage(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'group relative overflow-hidden rounded-[var(--radius-lg)]',
              'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
              'focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]',
              // Size based on orientation
              image.orientation === 'vertical' && 'row-span-2',
              // Hover effects
              'transition-transform duration-[var(--duration-normal)]',
              prefersReducedMotion ? '' : 'hover:scale-[1.02]'
            )}
            aria-label={`View ${image.alt}`}
            role="gridcell"
          >
            {/* Placeholder styling when image doesn't exist */}
            <div
              className={cn(
                'relative w-full',
                image.orientation === 'horizontal'
                  ? 'aspect-[4/3]'
                  : 'aspect-[3/4]',
                'bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)]'
              )}
            >
              {/* Image or placeholder */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={cn(
                  'object-cover',
                  'transition-transform duration-[var(--duration-normal)]',
                  prefersReducedMotion ? '' : 'group-hover:scale-105'
                )}
                sizes={
                  image.orientation === 'vertical'
                    ? '(max-width: 768px) 50vw, 33vw'
                    : '(max-width: 768px) 50vw, 33vw'
                }
                onError={(e) => {
                  // Hide broken image and show placeholder
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Placeholder icon when image fails to load */}
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'text-[var(--color-primary-400)]'
                )}
              >
                <PlaceholderIcon className="w-12 h-12 opacity-40" />
              </div>

              {/* Hover overlay */}
              <div
                className={cn(
                  'absolute inset-0',
                  'bg-[var(--color-primary-900)]/0',
                  'group-hover:bg-[var(--color-primary-900)]/30',
                  'transition-colors duration-[var(--duration-normal)]',
                  'flex items-center justify-center'
                )}
              >
                <ZoomIcon
                  className={cn(
                    'w-10 h-10 text-white',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-[var(--duration-normal)]'
                  )}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Load more */}
      {total > initialCount && (
        <div className="mt-[var(--space-6)] flex flex-col items-center gap-[var(--space-3)]">
          <p
            className={cn(
              'text-[var(--text-sm)] text-[var(--color-primary-600)]',
              'text-[calc(var(--text-sm)*var(--font-scale))]'
            )}
            aria-live="polite"
          >
            {t('showingImages', { shown, total })}
          </p>
          {hasMore && (
            <button
              type="button"
              onClick={() =>
                setVisibleCount((n) => Math.min(n + pageSize, total))
              }
              className={cn(
                'inline-flex items-center gap-2',
                'px-[var(--space-5)] py-[var(--space-3)]',
                'rounded-[var(--radius-full)]',
                'bg-[var(--color-primary-900)] text-white',
                'hover:bg-[var(--color-primary-800)]',
                'transition-colors duration-[var(--duration-fast)]',
                'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
                'focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]',
                'text-[calc(var(--text-base)*var(--font-scale))] font-medium'
              )}
              aria-label={`${t('loadMore')} (${total - shown})`}
            >
              <span>{t('loadMore')}</span>
              <span
                className={cn(
                  'inline-flex items-center justify-center',
                  'min-w-[1.5rem] h-6 px-2 rounded-full',
                  'bg-white/15 text-[var(--text-xs)]'
                )}
              >
                {total - shown}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedImage}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </>
  );
}

/**
 * Lightbox Modal Component
 */
interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  prefersReducedMotion: boolean;
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  prefersReducedMotion,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 z-50',
        'bg-[var(--color-primary-900)]/95 backdrop-blur-sm',
        'flex items-center justify-center',
        'p-4 md:p-8'
      )}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={cn(
          'absolute top-4 end-4 z-10',
          'w-12 h-12 rounded-full',
          'bg-white/10 hover:bg-white/20',
          'flex items-center justify-center',
          'text-white',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
          'focus-visible:outline-offset-2 focus-visible:outline-white'
        )}
        aria-label="Close lightbox"
      >
        <CloseIcon className="w-6 h-6" />
      </button>

      {/* Navigation: Previous */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('prev');
        }}
        className={cn(
          'absolute start-4 top-1/2 -translate-y-1/2 z-10',
          'w-12 h-12 rounded-full',
          'bg-white/10 hover:bg-white/20',
          'flex items-center justify-center',
          'text-white',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
          'focus-visible:outline-offset-2 focus-visible:outline-white',
          'rtl:rotate-180'
        )}
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      {/* Navigation: Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('next');
        }}
        className={cn(
          'absolute end-4 top-1/2 -translate-y-1/2 z-10',
          'w-12 h-12 rounded-full',
          'bg-white/10 hover:bg-white/20',
          'flex items-center justify-center',
          'text-white',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-visible:outline focus-visible:outline-[var(--focus-ring-width)]',
          'focus-visible:outline-offset-2 focus-visible:outline-white',
          'rtl:rotate-180'
        )}
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Main Image */}
      <motion.div
        key={currentIndex}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'relative max-w-4xl max-h-[80vh] w-full',
          currentImage.orientation === 'horizontal'
            ? 'aspect-[16/9]'
            : 'aspect-[3/4] max-w-md'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </motion.div>

      {/* Image counter */}
      <div
        className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2',
          'px-4 py-2 rounded-full',
          'bg-white/10',
          'text-white text-sm font-medium'
        )}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/**
 * Icon components
 */
function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default ImageGallery;
