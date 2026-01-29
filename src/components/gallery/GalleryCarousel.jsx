import { useEffect, useCallback } from 'react';
import { galleryItems } from '../../data/gallery';
import { useCarousel3D } from '../../hooks/useCarousel3D';
import { useModalTransition } from '../../hooks/useModalTransition';

const RADIUS = 320;
const SLIDE_WIDTH = 280;
const SLIDE_HEIGHT = 360;

/**
 * Fullscreen 3D carousel modal. Opens from gallery section; GSAP for open/close and rotation.
 * Renders from data/gallery.js via .map().
 */
export function GalleryCarousel({ isOpen, onClose }) {
  const { ringRef, currentIndex, goNext, goPrev, angleStep } = useCarousel3D(galleryItems, {
    duration: 1.1,
    ease: 'power3.inOut',
  });
  const { backdropRef, contentRef, animateIn, animateOut } = useModalTransition({
    duration: 0.55,
    ease: 'power3.out',
  });

  const handleClose = useCallback(() => {
    animateOut(() => onClose());
  }, [animateOut, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = requestAnimationFrame(() => animateIn());
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, animateIn, handleClose]);

  if (!isOpen) return null;

  const currentItem = galleryItems[currentIndex];

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery carousel"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-quaternary/95 backdrop-blur-md"
        onClick={handleClose}
        role="button"
        tabIndex={-1}
        aria-label="Close gallery"
      />
      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-20"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-6 right-6 rounded p-2 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Close gallery"
        >
          <CloseIcon />
        </button>

        <div
          className="carousel-viewport relative h-[380px] w-full max-w-4xl"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        >
          <div
            className="carousel-ring-wrapper absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div
              ref={ringRef}
              className="carousel-ring absolute left-0 top-0"
              style={{
                width: SLIDE_WIDTH,
                height: SLIDE_HEIGHT,
                left: -SLIDE_WIDTH / 2,
                top: -SLIDE_HEIGHT / 2,
                transformStyle: 'preserve-3d',
              }}
            >
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className="carousel-slide absolute left-1/2 top-1/2 overflow-hidden rounded-sm border border-primary/20 bg-tertiary/20"
                style={{
                  width: SLIDE_WIDTH,
                  height: SLIDE_HEIGHT,
                  marginLeft: -SLIDE_WIDTH / 2,
                  marginTop: -SLIDE_HEIGHT / 2,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${i * angleStep}deg) translateZ(${RADIUS}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <button
            type="button"
            onClick={goPrev}
            className="rounded p-2 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Previous"
          >
            <PrevIcon />
          </button>
          <p className="min-w-[200px] text-center text-sm font-light text-primary/90">
            {currentItem?.caption ?? ''}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="rounded p-2 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Next"
          >
            <NextIcon />
          </button>
        </div>

        <p className="mt-2 text-xs text-primary/50">
          {currentIndex + 1} / {galleryItems.length}
        </p>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
