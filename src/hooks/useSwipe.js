import { useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 50;

/**
 * Swipe/drag gesture for carousel. Returns handlers to attach to the carousel area.
 * Touch: swipe left = onNext, swipe right = onPrev.
 * Mouse: drag same logic (optional, for desktop).
 *
 * @param { { onNext: () => void, onPrev: () => void } } callbacks
 * @returns { { onTouchStart, onTouchMove, onTouchEnd, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } }
 */
export function useSwipe({ onNext, onPrev }) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handleStart = useCallback((clientX) => {
    startX.current = clientX;
    currentX.current = clientX;
    isDragging.current = true;
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    currentX.current = clientX;
  }, []);

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = startX.current - currentX.current;
    if (delta > SWIPE_THRESHOLD) onNext();
    else if (delta < -SWIPE_THRESHOLD) onPrev();
  }, [onNext, onPrev]);

  const onTouchStart = useCallback(
    (e) => {
      handleStart(e.touches[0].clientX);
    },
    [handleStart]
  );

  const onTouchMove = useCallback(
    (e) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const onTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      handleStart(e.clientX);
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        handleEnd();
      };
      const move = (e) => handleMove(e.clientX);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up, { once: true });
    },
    [handleStart, handleMove, handleEnd]
  );

  const onMouseMove = useCallback(
    (e) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const onMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const onMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  }, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
