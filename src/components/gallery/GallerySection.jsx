import { useGsapReveal } from '../../hooks/useGsap';

/**
 * Gallery section: CTA to open fullscreen 3D carousel. Data-driven; no hardcoded blocks.
 */
export function GallerySection({ onEnterGallery }) {
  const titleRef = useGsapReveal({ y: 24, duration: 0.9 });
  const ctaRef = useGsapReveal({ y: 20, duration: 0.8, delay: 0.15 });

  return (
    <section id="gallery" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="mb-4 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl"
        >
          Gallery
        </h2>
        <p className="mb-10 text-tertiary/80">
          Step inside. Explore the work in a 3D experience.
        </p>
        <button
          ref={ctaRef}
          type="button"
          onClick={onEnterGallery}
          className="rounded-sm border-2 border-tertiary/30 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition hover:border-secondary hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50"
        >
          Enter Gallery
        </button>
      </div>
    </section>
  );
}
