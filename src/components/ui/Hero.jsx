import { useState, useEffect, useRef } from 'react';
import { useGsapReveal } from '../../hooks/useGsap';
import { useArts } from '../../context/ArtsContext';
import { orderArtUrl } from '../../data/links';

const HERO_INTERVAL_MS = 7000;
const FLASH_DURATION_MS = 180;

/**
 * Hero: random starting image, auto-play carousel with flash transition (no sliding).
 */
export function Hero() {
  const { arts } = useArts();
  const titleRef = useGsapReveal({ y: 32, duration: 1, delay: 0.2 });
  const subRef = useGsapReveal({ y: 24, duration: 0.9, delay: 0.4 });
  const ctaRef = useGsapReveal({ y: 20, duration: 0.8, delay: 0.55 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const intervalRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const hasRandomized = useRef(false);

  useEffect(() => {
    if (arts.length > 0 && !hasRandomized.current) {
      setCurrentIndex(Math.floor(Math.random() * arts.length));
      hasRandomized.current = true;
    }
  }, [arts.length]);

  useEffect(() => {
    if (arts.length <= 1) return;

    function goToNext() {
      setFlashOpacity(1);
      flashTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % arts.length);
        setFlashOpacity(0);
      }, FLASH_DURATION_MS);
    }

    intervalRef.current = window.setInterval(goToNext, HERO_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, [arts.length]);

  const heroImage = arts.length > 0 ? arts[currentIndex].image : null;

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] flex-col justify-center bg-quaternary px-4 py-24 md:min-h-[90vh] md:px-6 md:py-32 lg:px-8"
      style={
        heroImage
          ? {
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-quaternary/85" aria-hidden />
      {/* Flash overlay for auto-play transition (flash in, then reveal next image) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-primary transition-opacity ease-out"
        style={{
          opacity: flashOpacity,
          transitionDuration: flashOpacity === 1 ? '120ms' : '280ms',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1
          ref={titleRef}
          className="text-4xl font-light tracking-tight text-primary md:text-5xl lg:text-6xl"
        >
          Calligraphy &amp; Art
        </h1>
        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-xl text-lg text-primary/80 md:text-xl"
        >
          Luxury strokes. Timeless script. Hanane Brush.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-base text-primary/70 md:text-lg">
          Your space deserves a piece that speaks to you. Commission a unique work—created for your table, your walls, your story.
        </p>
        <div className="mt-10">
          <a
            ref={ctaRef}
            href={orderArtUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm border-2 border-primary bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-quaternary transition hover:border-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-quaternary"
            aria-label="Commission your custom art via WhatsApp"
          >
            Commission your piece
          </a>
        </div>
      </div>
    </section>
  );
}
