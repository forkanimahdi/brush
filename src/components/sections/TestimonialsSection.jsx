import { testimonials } from '../../data/testimonials';
import { useGsapStagger } from '../../hooks/useGsap';

/**
 * Testimonials section. Renders from data/testimonials.js via .map().
 */
export function TestimonialsSection() {
  const ref = useGsapStagger({ stagger: 0.12, y: 20 });

  return (
    <section id="testimonials" className="border-t border-tertiary/10 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-light tracking-wide uppercase text-tertiary md:mb-16 md:text-4xl">
          Testimonials
        </h2>
        <ul
          ref={ref}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {testimonials.map((item) => (
            <li key={item.id} data-reveal>
              <blockquote className="flex h-full flex-col rounded-sm border border-tertiary/10 bg-primary/20 px-6 py-6 md:px-8 md:py-8">
                <p className="flex-1 text-tertiary/90 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-4 border-t border-tertiary/10 pt-4">
                  <cite className="not-italic">
                    <span className="font-medium text-tertiary">{item.author}</span>
                    {item.role && (
                      <span className="ml-1 text-sm text-tertiary/60">— {item.role}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
