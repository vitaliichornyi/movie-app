import { useRef, useEffect } from 'react';

export default function useIntersectionObserver(onIntersect: () => void) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const currentTrigger = triggerRef.current;

    if (!currentTrigger) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callbackRef.current();
      }
    });
    observer.observe(currentTrigger);

    return () => {
      observer.unobserve(currentTrigger);
    };
  });

  return [triggerRef] as const;
}
