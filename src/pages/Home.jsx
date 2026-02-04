import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Hero } from '../components/ui/Hero';
import { GallerySection } from '../components/gallery/GallerySection';
import { GalleryCarousel } from '../components/gallery/GalleryCarousel';
import { ArtworksSection } from '../components/gallery/ArtworksSection';
import { StatementBand } from '../components/sections/StatementBand';
import { AboutSection } from '../components/sections/AboutSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { statementQuotes } from '../data/statementQuotes';

/**
 * Home page. Light-dominant; gallery opens as fullscreen 3D carousel.
 * Each section is followed by a StatementBand with a different art quote.
 */
export const Home = () => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);

  return (
    <PageLayout>
      <Hero />

      <GallerySection onEnterGallery={() => setGalleryOpen(true)} />
      <GalleryCarousel isOpen={isGalleryOpen} onClose={() => setGalleryOpen(false)} />
      <StatementBand quote={statementQuotes[0]} />

      <ArtworksSection />
      <StatementBand quote={statementQuotes[1]} />

      <AboutSection />
      {/* <StatementBand quote={statementQuotes[2]} /> */}

      <TestimonialsSection />
      <StatementBand quote={statementQuotes[3]} />

      <ContactSection />
      {/* <StatementBand quote={statementQuotes[4]} /> */}
    </PageLayout>
  );
};
