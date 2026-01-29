import { galleryItems } from '../../data/gallery';
import { useGsapStagger } from '../../hooks/useGsap';

/**
 * Gallery grid. Renders from data/gallery.js via .map().
 */
export function GalleryGrid() {
  const ref = useGsapStagger({ stagger: 0.12, y: 24 });

  return (
    <section id="gallery" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-light tracking-wide uppercase text-tertiary md:mb-16 md:text-4xl">
          Gallery
        </h2>
        <ul
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {galleryItems.map((item) => (
            <li key={item.id} data-reveal className="group">
              <figure className="overflow-hidden rounded-sm border border-tertiary/10 bg-primary/30">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
                />
                <figcaption className="border-t border-tertiary/10 px-4 py-3 text-sm text-tertiary/80">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
