import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { artworks, artworkCategories, getArtworksByCategory } from '../data/artworks';

/**
 * All arts page with filters. Data from data/artworks.js; filter by category.
 */
export function AllArts() {
  const [category, setCategory] = useState('');

  const filtered = useMemo(
    () => getArtworksByCategory(category || undefined),
    [category]
  );

  return (
    <PageLayout>
      <article className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <Link
          to="/#artworks"
          className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-tertiary/70 transition hover:text-secondary"
        >
          <span aria-hidden>←</span> Back to Artworks
        </Link>

        <header className="mb-10 md:mb-12">
          <h1 className="text-3xl font-light tracking-wide uppercase text-tertiary md:text-4xl">
            All Arts
          </h1>
          <p className="mt-2 text-tertiary/70">
            Browse all works. Use filters to narrow by technique.
          </p>
        </header>

        <nav
          className="mb-10 flex flex-wrap gap-2 border-b border-tertiary/10 pb-6 md:mb-12"
          aria-label="Filter by category"
        >
          {artworkCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`rounded-sm px-4 py-2 text-sm font-medium uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-secondary/50 ${
                (category || '') === cat.value
                  ? 'bg-tertiary text-primary'
                  : 'bg-primary/40 text-tertiary/80 hover:bg-tertiary/10 hover:text-tertiary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {filtered.map((item) => (
            <li key={item.id}>
              <article className="overflow-hidden rounded-sm border border-tertiary/10 bg-surface">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-72 w-full object-cover md:h-80"
                />
                <div className="border-t border-tertiary/10 px-4 py-4">
                  <h2 className="text-lg font-medium text-tertiary">{item.title}</h2>
                  <p className="mt-1 text-sm text-tertiary/70">{item.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-tertiary/70">No works in this category yet.</p>
        )}
      </article>
    </PageLayout>
  );
}
