import { useEffect, useRef, useState } from 'react';

// Hook for detecting when element is in viewport
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once !== false) {
          observer.disconnect();
        }
      } else if (options.once === false) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isInView];
};

// Hook for staggered animations on children
export const useStaggerAnimation = (itemCount, delay = 100) => {
  const [ref, isInView] = useInView();
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (isInView) {
      const timeouts = [];
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay);
        timeouts.push(timeout);
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [isInView, itemCount, delay]);

  return [ref, visibleItems];
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

// Hook for parallax effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};

export default { useInView, useStaggerAnimation, useScrollProgress, useParallax };