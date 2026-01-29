import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * Premium modal open/close with GSAP timeline. No GSAP in JSX.
 * Returns refs for backdrop and content + animateIn / animateOut.
 *
 * @param {Object} options - { duration?: number, ease?: string }
 * @returns { { backdropRef, contentRef, animateIn, animateOut } }
 */
export function useModalTransition(options = {}) {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const { duration = 0.6, ease = 'power3.inOut' } = options;

  const animateIn = useCallback(() => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!backdrop || !content) return;

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(content, { scale: 0.96, opacity: 0 });

    const tl = gsap.timeline({ overwrite: true });
    tl.to(backdrop, { opacity: 1, duration: duration * 0.6, ease })
      .to(content, { scale: 1, opacity: 1, duration: duration * 0.8, ease }, '-=0.3');
  }, [duration, ease]);

  const animateOut = useCallback((onComplete) => {
    const backdrop = backdropRef.current;
    const content = contentRef.current;
    if (!backdrop || !content) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({ overwrite: true, onComplete });
    tl.to(content, { scale: 0.96, opacity: 0, duration: duration * 0.5, ease })
      .to(backdrop, { opacity: 0, duration: duration * 0.5, ease }, '-=0.25');
  }, [duration, ease]);

  return { backdropRef, contentRef, animateIn, animateOut };
}
