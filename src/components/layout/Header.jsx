import { Logo } from '../ui/Logo';
import { navigationItems } from '../../data/navigation';
import { SocialLinks } from '../ui/SocialLinks';

/**
 * Site header: logo + nav + artist social. Light-dominant; data-driven.
 */
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-tertiary/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <Logo href="#home" variant="light-bg" />
        <nav className="flex items-center gap-4 md:gap-6 lg:gap-8" aria-label="Main">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-tertiary transition hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <SocialLinks className="hidden md:flex shrink-0" linkClassName="p-1" />
      </div>
    </header>
  );
}
