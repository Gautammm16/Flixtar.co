import { useState, useEffect, useRef, useCallback } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); if (!options.repeat) obs.unobserve(el); } else if (options.repeat) setIsInView(false); },
      { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || '0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isInView];
}

// Hook for reveal animations — adds 'visible' class when in view
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Stagger children reveals
export function useStaggerReveal(count, baseDelay = 0.08) {
  const refs = useRef([]);
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          refs.current.forEach((el, i) => {
            if (el) setTimeout(() => el.classList.add('visible'), i * baseDelay * 1000);
          });
          obs.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, [count]);
  const setRef = useCallback((i) => (el) => { refs.current[i] = el; }, []);
  return { containerRef, setRef };
}
