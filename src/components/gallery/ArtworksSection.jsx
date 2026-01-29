import { artworks } from '../../data/artworks';
import { useGsapStagger } from '../../hooks/useGsap';

/**
 * Featured artworks. Renders from data/artworks.js via .map().
 */
export function ArtworksSection() {
  const ref = useGsapStagger({ stagger: 0.15, y: 28 });

  return (
    <section id="artworks" className="border-t border-tertiary/10 bg-primary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-light tracking-wide uppercase text-tertiary md:mb-16 md:text-4xl">
          Artworks
        </h2>
        <ul ref={ref} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {artworks.map((item) => (
            <li key={item.id} data-reveal>
              <article className="overflow-hidden rounded-sm border border-tertiary/10 bg-surface">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-72 w-full object-cover md:h-80"
                />
                <div className="border-t border-tertiary/10 px-4 py-4">
                  <h3 className="text-lg font-medium text-tertiary">{item.title}</h3>
                  <p className="mt-1 text-sm text-tertiary/70">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
