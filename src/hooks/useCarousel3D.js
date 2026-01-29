import { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * 3D carousel: ring of slides, GSAP animates rotation. All GSAP here; no GSAP in JSX.
 *
 * @param {Array} items - Data array (length used for angle step)
 * @param {Object} options - { radius?: number, duration?: number, ease?: string }
 * @returns { { ringRef, currentIndex, goNext, goPrev, setCurrentIndex, angleStep } }
 */
export function useCarousel3D(items, options = {}) {
  const ringRef = useRef(null);
  const { duration = 1.1, ease = 'power2.inOut' } = options;

  const count = items?.length || 1;
  const angleStep = count > 0 ? 360 / count : 0;

  const [currentIndex, setCurrentIndexState] = useState(0);

  const setCurrentIndex = useCallback((next) => {
    if (count === 0) return;
    const n = ((next % count) + count) % count;
    setCurrentIndexState(n);
  }, [count]);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || count === 0) return;

    gsap.to(ring, {
      rotateY: -currentIndex * angleStep,
      duration,
      ease,
      overwrite: true,
    });
  }, [currentIndex, angleStep, duration, ease, count]);

  const goNext = useCallback(() => setCurrentIndexState((i) => ((i + 1) % count)), [count]);
  const goPrev = useCallback(() => setCurrentIndexState((i) => (i - 1 + count) % count), [count]);

  return { ringRef, currentIndex, goNext, goPrev, setCurrentIndex, angleStep };
}
