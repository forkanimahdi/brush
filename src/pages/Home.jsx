import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Hero } from '../components/ui/Hero';
import { GallerySection } from '../components/gallery/GallerySection';
import { GalleryCarousel } from '../components/gallery/GalleryCarousel';
import { ArtworksSection } from '../components/gallery/ArtworksSection';

/**
 * Home page. Light-dominant; gallery opens as fullscreen 3D carousel.
 */
export const Home = () => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  return (
    <PageLayout>
      <Hero />
      <GallerySection onEnterGallery={() => setGalleryOpen(true)} />
      <GalleryCarousel isOpen={isGalleryOpen} onClose={() => setGalleryOpen(false)} />
      <StatementBand />
      <ArtworksSection />
      <section id="about" className="border-t border-tertiary/10 bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
            About
          </h2>
          <p className="text-tertiary/80 leading-relaxed">
            Hanane Brush is a calligraphic artist blending traditional script with contemporary
            expression. Each piece is crafted with intention and precision.
          </p>
        </div>
      </section>
      <section id="contact" className="border-t border-tertiary/10 bg-primary/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
            Contact
          </h2>
          <p className="text-tertiary/80 leading-relaxed">
            For commissions and inquiries, reach out. Let’s create something beautiful together.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

/** Dark accent band between gallery and artworks (editorial break). */
function StatementBand() {
  return (
    <section className="bg-quaternary py-16 md:py-20" aria-hidden>
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
        <p className="text-lg font-light tracking-wide text-primary/90 md:text-xl">
          Every stroke carries intention. Every piece tells a story.
        </p>
      </div>
    </section>
  );
}
