import { useGsapReveal } from '../../hooks/useGsap';

/**
 * Hero section for home. Subtle entrance via useGsapReveal.
 */
export function Hero() {
  const titleRef = useGsapReveal({ y: 32, duration: 1, delay: 0.2 });
  const subRef = useGsapReveal({ y: 24, duration: 0.9, delay: 0.4 });

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] flex-col justify-center bg-quaternary px-4 py-24 md:min-h-[90vh] md:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1
          ref={titleRef}
          className="text-4xl font-light tracking-tight text-primary md:text-5xl lg:text-6xl"
        >
          Calligraphy &amp; Art
        </h1>
        <p
          ref={subRef}
          className="mt-6 max-w-xl mx-auto text-lg text-primary/80 md:text-xl"
        >
          Luxury strokes. Timeless script. Hanane Brush.
        </p>
      </div>
    </section>
  );
}
