import { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Flat carousel: currentIndex + GSAP slide transition. No 3D.
 * Animates track ref by translateX so one slide is visible at a time.
 *
 * @param {Array} items - Data array (length used)
 * @param {Object} options - { duration?: number, ease?: string }
 * @returns { { trackRef, currentIndex, goNext, goPrev, setCurrentIndex } }
 */
export function useCarousel(items, options = {}) {
  const trackRef = useRef(null);
  const { duration = 0.5, ease = 'power3.inOut' } = options;

  const count = items?.length || 1;
  const [currentIndex, setCurrentIndexState] = useState(0);

  const setCurrentIndex = useCallback((next) => {
    if (count === 0) return;
    const n = ((next % count) + count) % count;
    setCurrentIndexState(n);
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const xPercent = -(currentIndex / count) * 100;
    gsap.to(track, {
      x: `${xPercent}%`,
      duration,
      ease,
      overwrite: true,
    });
  }, [currentIndex, count, duration, ease]);

  const goNext = useCallback(() => setCurrentIndexState((i) => (i + 1) % count), [count]);
  const goPrev = useCallback(() => setCurrentIndexState((i) => (i - 1 + count) % count), [count]);

  return { trackRef, currentIndex, goNext, goPrev, setCurrentIndex };
}
