import { useRef, useState } from 'react';

const AnimatedCard = ({
  children,
  className = '',
  hoverEffect = 'lift',
  glowColor = 'rgba(30, 58, 138, 0.2)',
  borderOnHover = false,
  scaleOnHover = false,
  tiltOnHover = false
}) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!tiltOnHover || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform({
      x: 0,
      y: 0,
      rotateX: -rotateX,
      rotateY: -rotateY
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const hoverEffects = {
    lift: 'hover:-translate-y-2 hover:shadow-xl',
    glow: 'hover:shadow-lg',
    scale: scaleOnHover ? 'hover:scale-[1.02]' : '',
    border: borderOnHover ? 'hover:border-primary-blue hover:border-2' : '',
    tilt: ''
  };

  const combinedClassName = `
    card-base
    overflow-hidden
    relative
    transition-all
    duration-300
    ease-out
    ${hoverEffects.lift}
    ${hoverEffects.glow}
    ${hoverEffects.scale}
    ${hoverEffects.border}
    ${className}
  `.trim();

  return (
    <div
      ref={ref}
      className={combinedClassName}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tiltOnHover
          ? {
              transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }
          : {}
      }
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 shimmer-effect" />
      </div>

      {/* Glow effect */}
      {hoverEffect === 'glow' && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${glowColor}`,
            borderRadius: 'inherit'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Icon Card Variant
export const IconCard = ({
  icon,
  title,
  description,
  link,
  badge,
  className = ''
}) => {
  const content = (
    <AnimatedCard
      className={`p-6 h-full ${className}`}
      hoverEffect="lift"
      tiltOnHover={false}
    >
      {badge && (
        <span className="inline-block bg-accent-gold text-text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}

      {icon && (
        <div className="w-14 h-14 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary-blue">
          <div className="text-primary-blue group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-xl font-heading font-semibold text-primary-blue mb-3 transition-colors duration-300 group-hover:text-primary-red">
        {title}
      </h3>

      <p className="text-text-muted leading-relaxed mb-4">{description}</p>

      {link && (
        <div className="flex items-center text-primary-blue font-medium group-hover:text-primary-red transition-colors duration-300">
          <span>Learn More</span>
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </AnimatedCard>
  );

  return link ? (
    <a href={link} className="block h-full group">
      {content}
    </a>
  ) : (
    <div className="group h-full">{content}</div>
  );
};

// Feature Card Variant
export const FeatureCard = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <AnimatedCard className={`text-center p-8 ${className}`}>
      <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary-blue hover:text-white transition-all duration-300 group">
        <div className="text-primary-blue group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <h4 className="text-lg font-heading font-semibold text-primary-blue mb-2">
        {title}
      </h4>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </AnimatedCard>
  );
};

// Stats Card Variant
export const StatsCard = ({ number, label, icon, className = '' }) => {
  return (
    <AnimatedCard className={`text-center p-6 ${className}`}>
      {icon && (
        <div className="text-primary-blue mb-2 flex justify-center">
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-heading font-bold text-primary-blue mb-1">
        {number}
      </div>
      <div className="text-text-muted text-sm">{label}</div>
    </AnimatedCard>
  );
};

export default AnimatedCard;