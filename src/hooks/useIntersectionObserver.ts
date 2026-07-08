import { useEffect, useRef, useCallback } from 'react';

export default function useIntersectionObserver(onIntersect: () => void) {
  const callbackRef = useRef(onIntersect);
  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const triggerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!node) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callbackRef.current();
      }
    });

    observerRef.current.observe(node);
  }, []);

  return [triggerRef] as const;
}
