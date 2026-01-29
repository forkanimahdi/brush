import { navigationItems } from '../../data/navigation';

/**
 * Site footer. Uses same nav data; minimal, luxury feel.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-tertiary/10 bg-primary/60">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap justify-center gap-6 md:gap-8" aria-label="Footer">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm uppercase tracking-wide text-tertiary/70 transition hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-center text-sm text-tertiary/50">
          © {currentYear} Hanane Brush. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
