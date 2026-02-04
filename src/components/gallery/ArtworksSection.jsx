import { Link } from 'react-router-dom';
import { useGsapStagger } from '../../hooks/useGsap';
import { useArts } from '../../context/ArtsContext';

/**
 * Featured artworks from arts context. Discover more → All Arts page.
 */
export function ArtworksSection() {
  const ref = useGsapStagger({ stagger: 0.15, y: 28 });
  const { arts } = useArts();
  const featured = arts.slice(0, 6);

  return (
    <section id="artworks" className="border-t border-tertiary/10 bg-primary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-light tracking-wide uppercase text-tertiary md:mb-16 md:text-4xl">
          Artworks
        </h2>
        <ul ref={ref} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {featured.map((item) => (
            <li key={item.id} data-reveal>
              <Link
                to={`/gallery/${item.id}`}
                className="block overflow-hidden rounded-sm border border-tertiary/10 bg-surface transition hover:border-tertiary/20 focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover md:h-80"
                />
                <div className="border-t border-tertiary/10 px-4 py-4">
                  <h3 className="text-lg font-medium text-tertiary">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-tertiary/70">{item.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            to="/arts"
            className="rounded-sm border-2 border-tertiary/30 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition hover:border-secondary hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50"
          >
            Discover more
          </Link>
        </div>
      </div>
    </section>
  );
}
