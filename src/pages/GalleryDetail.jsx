import { Link, useParams } from 'react-router-dom';
import { getGalleryItemById } from '../data/gallery';
import { PageLayout } from '../components/layout/PageLayout';

/**
 * Gallery item detail page. Data from data/gallery.js by id.
 */
export function GalleryDetail() {
  const { id } = useParams();
  const item = getGalleryItemById(id);

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
        <div className="overflow-hidden rounded-sm border border-tertiary/10 bg-primary/20">
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
