import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const TRANSITION_DURATION = 0.65;
const TRANSITION_EASE = 'power3.out';
const DETAIL_IMAGE_SELECTOR = '[data-gallery-detail-image]';

const GalleryTransitionContext = createContext(null);

export function useGalleryTransition() {
  const ctx = useContext(GalleryTransitionContext);
  return ctx;
}

/**
 * Starts a shared-element transition: image moves from carousel position to detail page.
 * Call with (item, sourceRect), then navigate to /gallery/:id. Overlay animates to detail rect.
 */
export function GalleryTransitionProvider({ children }) {
  const [state, setState] = useState({ sourceRect: null, item: null });
  const overlayRef = useRef(null);
  const location = useLocation();
  const isActive = Boolean(state.item && state.sourceRect);

  const startTransition = useCallback((item, sourceRect) => {
    setState({ item, sourceRect });
  }, []);

  const clearTransition = useCallback(() => {
    setState({ sourceRect: null, item: null });
  }, []);

  // When we're on the detail page and have transition state, animate overlay to target rect
  useEffect(() => {
    if (!isActive || !state.item || !state.sourceRect) return;
    const expectedPath = `/gallery/${state.item.id}`;
    if (location.pathname !== expectedPath) return;

    const sourceRect = state.sourceRect;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const overlayEl = overlayRef.current;
        const targetEl = document.querySelector(DETAIL_IMAGE_SELECTOR);
        if (!overlayEl || !targetEl) {
          clearTransition();
          return;
        }
        const targetRect = targetEl.getBoundingClientRect();
        gsap.set(overlayEl, {
          left: sourceRect.left,
          top: sourceRect.top,
          width: sourceRect.width,
          height: sourceRect.height,
        });
        gsap.to(overlayEl, {
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          duration: TRANSITION_DURATION,
          ease: TRANSITION_EASE,
          onComplete: clearTransition,
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [isActive, location.pathname, state.item?.id, state.sourceRect, clearTransition]);

  return (
    <GalleryTransitionContext.Provider value={{ startTransition, clearTransition, transitionItemId: state.item?.id ?? null }}>
      {children}
      {isActive && state.item && state.sourceRect && (
        <div
          ref={overlayRef}
          className="pointer-events-none fixed z-[200] overflow-hidden rounded-sm bg-primary/20"
          style={{
            left: state.sourceRect.left,
            top: state.sourceRect.top,
            width: state.sourceRect.width,
            height: state.sourceRect.height,
          }}
          aria-hidden
        >
          <img
            src={state.item.src}
            alt=""
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
        </div>
      )}
    </GalleryTransitionContext.Provider>
  );
}
