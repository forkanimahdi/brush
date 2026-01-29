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
        slideWidth: 260,
        slideHeight: 340,
        radius: 220,
        perspectiveTilt: 4,
        viewportMinHeight: 380,
        perspective: 1400,
      }
    : {
        slideWidth: 360,
        slideHeight: 460,
        radius: 300,
        perspectiveTilt: 8,
        viewportMinHeight: 500,
        perspective: 2000,
      };
}
