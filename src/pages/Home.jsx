import { PageLayout } from '../components/layout/PageLayout';
import { Hero } from '../components/ui/Hero';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { ArtworksSection } from '../components/gallery/ArtworksSection';

/**
 * Home page. Light-dominant merge: hero + mid band dark; rest light. All content data-driven.
 */
export const Home = () => {
  return (
    <PageLayout>
      <Hero />
      <GalleryGrid />
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
