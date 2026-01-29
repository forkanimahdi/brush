import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralized GSAP hook. Runs subtle entrance animation when element enters viewport.
 * Use ref on the element; no GSAP code in JSX.
 *
 * @param {Object} options - { y?: number, opacity?: number, duration?: number, delay?: number }
 * @returns {React.RefObject} ref to attach to the animated element
 */
export function useGsapReveal(options = {}) {
  const ref = useRef(null);
  const {
    y = 24,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [y, opacity, duration, delay, ease]);

  return ref;
}

/**
 * Stagger children reveal. Attach ref to parent; children animate in sequence.
 *
 * @param {Object} options - { stagger?: number, y?: number, duration?: number }
 * @returns {React.RefObject} ref for parent element
 */
export function useGsapStagger(options = {}) {
  const ref = useRef(null);
  const { stagger = 0.1, y = 20, duration = 0.6, ease = 'power3.out' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('[data-reveal]');
    if (!children.length) return;

    gsap.fromTo(
      children,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [stagger, y, duration, ease]);

  return ref;
}
