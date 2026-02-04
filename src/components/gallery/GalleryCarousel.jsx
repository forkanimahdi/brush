import { useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarousel3D } from '../../hooks/useCarousel3D';
import { useModalTransition } from '../../hooks/useModalTransition';
import { useSwipe } from '../../hooks/useSwipe';
import { useCarouselDimensions } from '../../hooks/useCarouselDimensions';
import { useGalleryTransition } from '../../context/GalleryTransitionContext';
import { useArts } from '../../context/ArtsContext';

const SCALE_CENTER = 1;
const SCALE_SIDE_FALLOFF = 0.14;
const SCALE_MIN = 0.8;

/**
 * 3D gallery carousel. Clicking a slide starts shared-element transition:
 * image animates from carousel position to detail page position.
 */
const MAX_CAROUSEL_SLIDES = 8;

/** Map arts to carousel item shape (id, src, alt, caption). Limit count so 3D ring stays readable. */
function toCarouselItems(artsList) {
  const list = artsList.slice(0, MAX_CAROUSEL_SLIDES);
  return list.map((a) => ({
    id: a.id,
    src: a.image,
    alt: a.name,
    caption: a.name,
  }));
}

export function GalleryCarousel({ isOpen, onClose }) {
  const navigate = useNavigate();
  const sceneRef = useRef(null);
  const { arts } = useArts();
  const { startTransition } = useGalleryTransition();
  const dims = useCarouselDimensions();
  const galleryItems = useMemo(() => toCarouselItems(arts), [arts]);
  const { ringRef, currentIndex, goNext, goPrev, angleStep } = useCarousel3D(galleryItems, {
    duration: 1.35,
    ease: 'power3.out',
  });
  const { backdropRef, contentRef, animateIn, animateOut } = useModalTransition({
    duration: 0.4,
    ease: 'power2.out',
  });
  const swipe = useSwipe({ onNext: goNext, onPrev: goPrev });

  const handleClose = useCallback(() => {
    animateOut(() => onClose());
  }, [animateOut, onClose]);

  const pointerDownX = useRef(0);

  const handleSlideClick = useCallback(
    (item, e) => {
      if (e && Math.abs(e.clientX - pointerDownX.current) > 24) return;
      const sourceRect = e?.currentTarget?.getBoundingClientRect?.();
      if (!sourceRect) return;
      startTransition(item, sourceRect);
      navigate(`/gallery/${item.id}`);
      onClose();
    },
    [startTransition, navigate, onClose]
  );

  const handlePointerDown = useCallback((e) => {
    pointerDownX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = requestAnimationFrame(() => animateIn());
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, animateIn, handleClose, goPrev, goNext]);

  if (!isOpen) return null;

  const currentItem = galleryItems[currentIndex];
  const count = galleryItems.length;

  const getScale = (index) => {
    let dist = Math.abs(index - currentIndex);
    dist = Math.min(dist, count - dist);
    return Math.max(SCALE_MIN, SCALE_CENTER - SCALE_SIDE_FALLOFF * dist);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery carousel"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-gradient-to-r from-quaternary via-tertiary/30 to-quaternary"
        onClick={handleClose}
        role="button"
        tabIndex={-1}
        aria-label="Close gallery"
      />
      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-3 py-12 sm:px-6 sm:py-20"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2.5 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:top-6 sm:right-6"
          aria-label="Close gallery"
        >
          <CloseIcon />
        </button>

        <div
          className="carousel-viewport relative flex w-full max-w-5xl flex-1 items-center justify-between overflow-visible px-1 sm:gap-4 sm:px-2"
          style={{
            minHeight: dims.viewportMinHeight,
            perspective: `${dims.perspective}px`,
            perspectiveOrigin: '50% 45%',
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:left-2 sm:p-3"
            aria-label="Previous"
          >
            <PrevIcon />
          </button>

          <div
            ref={sceneRef}
            className="carousel-scene relative flex-1 overflow-visible select-none"
            style={{
              minHeight: dims.viewportMinHeight,
              transformStyle: 'preserve-3d',
              transform: `perspective(${dims.perspective}px) rotateX(${dims.perspectiveTilt}deg)`,
              touchAction: 'none',
            }}
            {...swipe}
            onPointerDown={handlePointerDown}
          >
            {/* Full-size click overlay for current slide so entire image is clickable */}
            <button
              type="button"
              onClick={(e) => handleSlideClick(currentItem, e)}
              onPointerDown={handlePointerDown}
              className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                width: dims.slideWidth,
                height: dims.slideHeight,
              }}
              aria-label={`View ${currentItem?.alt ?? 'image'}`}
            />
            <div
              className="carousel-ring-wrapper absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <div
                ref={ringRef}
                className="carousel-ring absolute left-0 top-0"
                style={{
                  width: dims.slideWidth,
                  height: dims.slideHeight,
                  left: -dims.slideWidth / 2,
                  top: -dims.slideHeight / 2,
                  transformStyle: 'preserve-3d',
                }}
              >
                {galleryItems.map((item, i) => {
                  const scale = getScale(i);
                  const isFront = i === currentIndex;
                  const nudgeZ = isFront ? 6 : 0;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(e) => handleSlideClick(item, e)}
                      className="carousel-slide group absolute left-1/2 top-1/2 cursor-pointer overflow-hidden border-0 bg-tertiary/10 shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-quaternary hover:shadow-xl"
                      style={{
                        width: dims.slideWidth,
                        height: dims.slideHeight,
                        marginLeft: -dims.slideWidth / 2,
                        marginTop: -dims.slideHeight / 2,
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${i * angleStep}deg) translateZ(${dims.radius + nudgeZ}px) scale(${scale})`,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        isolation: 'isolate',
                        willChange: 'transform',
                        zIndex: isFront ? 10 : 0,
                      }}
                      aria-label={`View ${item.alt}`}
                    >
                      <span className="block h-full w-full overflow-hidden rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="block h-full w-full object-cover object-center pointer-events-none"
                          draggable={false}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full p-2.5 text-primary/90 transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:right-2 sm:p-3"
            aria-label="Next"
          >
            <NextIcon />
          </button>
        </div>

        <div className="mt-4 w-full max-w-xl px-2 text-center sm:mt-6">
          <p className="text-sm font-light text-primary/90">
            {currentItem?.caption ?? ''}
          </p>
          <p className="mt-1 text-xs text-primary/50">
            {currentIndex + 1} / {count} · Swipe or arrows · Tap for details
          </p>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  );
}
