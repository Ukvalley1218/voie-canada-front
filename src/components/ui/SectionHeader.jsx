import { useInView } from '../../hooks/useScrollAnimation';

const SectionHeader = ({
  subtitle,
  title,
  description,
  centered = true,
  className = '',
  light = false
}) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {subtitle && (
        <div className={`flex ${centered ? 'justify-center' : ''} mb-3`}>
          <span className={`inline-block font-medium uppercase tracking-wide text-sm ${light ? 'text-white/80' : 'text-primary-red'}`}>
            {subtitle}
          </span>
        </div>
      )}

      {title && (
        <div className={`flex ${centered ? 'justify-center' : ''} mb-4`}>
          <h2 className={`text-3xl lg:text-4xl font-heading font-bold relative pb-2 ${light ? 'text-white' : 'text-primary-blue'}`}>
            {title}
            {!light && <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-primary-red mx-auto" style={{ width: '4rem' }} />}
          </h2>
        </div>
      )}

      {description && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-text-muted'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;