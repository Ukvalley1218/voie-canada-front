import { useEffect, useRef, useState } from 'react';

// Higher Order Component for scroll animations
const AnimatedSection = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const animations = {
    'fade-in-up': 'opacity-0 translate-y-10',
    'fade-in-down': 'opacity-0 -translate-y-10',
    'fade-in-left': 'opacity-0 -translate-x-10',
    'fade-in-right': 'opacity-0 translate-x-10',
    'fade-in': 'opacity-0',
    'scale-up': 'opacity-0 scale-95',
    'scale-in': 'opacity-0 scale-90'
  };

  const visibleStyles = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...(isVisible
          ? {}
          : animations[animation]?.includes('translate-y-10')
            ? { transform: 'translateY(40px)', opacity: 0 }
            : animations[animation]?.includes('-translate-y')
              ? { transform: 'translateY(-40px)', opacity: 0 }
              : animations[animation]?.includes('translate-x')
                ? { transform: 'translateX(40px)', opacity: 0 }
                : animations[animation]?.includes('-translate-x')
                  ? { transform: 'translateX(-40px)', opacity: 0 }
                  : animations[animation]?.includes('scale')
                    ? { transform: 'scale(0.95)', opacity: 0 }
                    : { opacity: 0 }
        )
      }}
    >
      <div
        className={`transition-all ${isVisible ? visibleStyles : animations[animation] || ''}`}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Animated Counter Component
export const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Staggered Animation Container
export const StaggerContainer = ({ children, staggerDelay = 100, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className="opacity-0"
              style={{
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transitionDelay: `${isVisible ? index * staggerDelay : 0}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
};

// Parallax Background Component
export const ParallaxSection = ({ children, speed = 0.5, className = '', bgColor = '' }) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = (scrolled - rect.top) * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section
      ref={ref}
      className={className}
      style={{
        background: bgColor,
        backgroundPositionY: `${offset}px`
      }}
    >
      {children}
    </section>
  );
};

// Typewriter Effect
export const TypewriterText = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Magnetic Button Effect
export const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      className={`${className} transition-transform duration-200`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedSection;