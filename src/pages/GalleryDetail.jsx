import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { getGalleryItemById } from '../data/gallery';
import { PageLayout } from '../components/layout/PageLayout';
import { useGalleryTransition } from '../context/GalleryTransitionContext';

/**
 * Gallery item detail page. Image enters via shared-element transition from carousel
 * or with zoom + fade when opened directly.
 */
export function GalleryDetail() {
  const { id } = useParams();
  const item = getGalleryItemById(id);
  const imageRef = useRef(null);
  const { transitionItemId } = useGalleryTransition();
  const isFromCarousel = transitionItemId === id;

  useEffect(() => {
    if (!item || !imageRef.current) return;
    if (isFromCarousel) {
      gsap.set(imageRef.current, { opacity: 0 });
      return;
    }
    gsap.fromTo(
      imageRef.current,
      { scale: 0.98, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [item, isFromCarousel]);

  // When shared-element transition ends (transitionItemId becomes null), fade in the detail image
  const prevTransitionId = useRef(transitionItemId);
  useEffect(() => {
    if (!item || !imageRef.current) return;
    if (prevTransitionId.current === id && transitionItemId !== id) {
      gsap.to(imageRef.current, { opacity: 1, duration: 0.28, ease: 'power2.out' });
    }
    prevTransitionId.current = transitionItemId;
  }, [item, id, transitionItemId]);

  if (!item) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-light text-tertiary">Not found</h1>
          <Link
            to="/"
            className="text-secondary underline transition hover:no-underline"
          >
            Back to home
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="mx-auto max-w-4xl px-4 py-24 md:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-tertiary/70 transition hover:text-secondary"
        >
          <span aria-hidden>←</span> Back to gallery
        </Link>
        <div
          ref={imageRef}
          data-gallery-detail-image
          className="overflow-hidden rounded-sm border border-tertiary/10 bg-primary/20"
          style={isFromCarousel ? { opacity: 0 } : undefined}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full object-cover"
          />
        </div>
        <header className="mt-8">
          <h1 className="text-3xl font-light tracking-wide text-tertiary md:text-4xl">
            {item.caption}
          </h1>
          {item.description && (
            <p className="mt-4 text-tertiary/80 leading-relaxed">
              {item.description}
            </p>
          )}
        </header>
      </article>
    </PageLayout>
  );
}
