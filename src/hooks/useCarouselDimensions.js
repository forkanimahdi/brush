import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Returns carousel dimensions based on viewport. Cleaner on mobile (smaller, less tilt).
 */
export function useCarouselDimensions() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile
    ? {
        slideWidth: 300,
        slideHeight: 400,
        radius: 260,
        perspectiveTilt: 4,
        viewportMinHeight: 420,
        perspective: 1400,
      }
    : {
        slideWidth: 420,
        slideHeight: 540,
        radius: 360,
        perspectiveTilt: 8,
        viewportMinHeight: 580,
        perspective: 2000,
      };
}
