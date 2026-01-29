import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { navigationItems } from '../../data/navigation';
import { SocialLinks } from '../ui/SocialLinks';

/**
 * Site header: logo + nav + social. Responsive: slide-in panel from right on mobile.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-tertiary/10 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="Home">
          <Logo href={null} variant="light-bg" />
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex lg:gap-8"
          aria-label="Main"
        >
          {navigationItems.map((item) => {
            const isInternalRoute = item.href.startsWith('/') && !item.href.startsWith('/#');
            return isInternalRoute ? (
              <Link
                key={item.id}
                to={item.href}
                className="text-sm font-medium uppercase tracking-wide text-tertiary transition hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 rounded"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href.startsWith('#') ? `/${item.href}` : item.href}
                className="text-sm font-medium uppercase tracking-wide text-tertiary transition hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 rounded"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block shrink-0">
          <SocialLinks linkClassName="p-1.5" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-tertiary transition hover:bg-tertiary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="header-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-y-0 right-0 z-40 w-full max-w-[280px] border-l border-tertiary/10 bg-surface shadow-xl md:hidden"
        aria-hidden={!menuOpen}
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'transform 0.25s ease-out, visibility 0.25s',
        }}
      >
        <div className="flex flex-col gap-6 px-5 py-8">
          <nav aria-label="Main mobile">
            <ul className="flex flex-col gap-0.5">
              {navigationItems.map((item) => {
                const isInternalRoute = item.href.startsWith('/') && !item.href.startsWith('/#');
                return (
                  <li key={item.id}>
                    {isInternalRoute ? (
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className="block rounded-lg py-3 px-3 text-sm font-medium uppercase tracking-wide text-tertiary transition hover:bg-tertiary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-inset"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href.startsWith('#') ? `/${item.href}` : item.href}
                        onClick={closeMenu}
                        className="block rounded-lg py-3 px-3 text-sm font-medium uppercase tracking-wide text-tertiary transition hover:bg-tertiary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-inset"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-tertiary/10 pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-tertiary/60">
              Follow
            </p>
            <SocialLinks linkClassName="p-2" />
          </div>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          onClick={closeMenu}
          className="fixed inset-0 z-30 bg-quaternary/40 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu"
        />
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
