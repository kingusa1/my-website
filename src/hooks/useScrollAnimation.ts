
'use client';

import { useEffect, useState, useRef } from 'react';
import type React from 'react';

interface ScrollAnimationHook {
  ref: React.RefObject<any>;
  isInView: boolean;
}

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options?: IntersectionObserverOptions): ScrollAnimationHook {
  const ref = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px', // Start animation a bit before it's fully in view
    triggerOnce: true,
    ...options,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (defaultOptions.triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else {
          if (!defaultOptions.triggerOnce) {
            // setIsInView(false); // Optional: reset if element scrolls out of view and not triggerOnce
          }
        }
      },
      {
        threshold: defaultOptions.threshold,
        root: defaultOptions.root || null,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [defaultOptions.threshold, defaultOptions.root, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

  return { ref, isInView };
}
