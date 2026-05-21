import { useInView } from '../../hooks/useScrollAnimation';
import Section from '../ui/Section';
import Button from '../ui/Button';

const SectionLayout = ({
  title,
  subtitle,
  description,
  content,
  image,
  imageAlt = '',
  reverse = false,
  background = 'white',
  cta,
  className = '',
  children
}) => {
  const [textRef, isTextVisible] = useInView({ threshold: 0.2 });
  const [imageRef, isImageVisible] = useInView({ threshold: 0.2 });

  return (
    <Section background={background} className={className}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image Side */}
        <div
          ref={imageRef}
          className={`${reverse ? 'lg:order-2' : ''}`}
          style={{
            opacity: isImageVisible ? 1 : 0,
            transform: isImageVisible
              ? 'translateX(0) scale(1)'
              : `translateX(${reverse ? '50px' : '-50px'}) scale(0.95)`,
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {image && (
            <div className="relative rounded-2xl overflow-hidden shadow-card group">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-accent-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-accent-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>

        {/* Content Side */}
        <div
          ref={textRef}
          className={`${reverse ? 'lg:order-1' : ''}`}
          style={{
            opacity: isTextVisible ? 1 : 0,
            transform: isTextVisible
              ? 'translateX(0)'
              : `translateX(${reverse ? '-50px' : '50px'})`,
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {subtitle && (
            <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm relative">
              {subtitle}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-red/30" />
            </span>
          )}

          {title && (
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4 relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-primary-blue to-primary-red" />
            </h2>
          )}

          {description && (
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              {description}
            </p>
          )}

          {/* Additional content */}
          {content && (
            <div className="prose prose-lg text-text-dark mb-6">
              {content}
            </div>
          )}

          {/* Children (for lists, additional content, etc.) */}
          {children && (
            <div className="mb-6 space-y-4">
              {children}
            </div>
          )}

          {/* CTA Button */}
          {cta && (
            <div className="flex flex-wrap gap-4 mt-6">
              {cta.primary && (
                <Button
                  to={cta.primary.to}
                  onClick={cta.primary.onClick}
                  variant={cta.primary.variant || 'primary'}
                  className="hover-shine"
                >
                  {cta.primary.label}
                </Button>
              )}
              {cta.secondary && (
                <Button
                  to={cta.secondary.to}
                  onClick={cta.secondary.onClick}
                  variant={cta.secondary.variant || 'secondary'}
                >
                  {cta.secondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SectionLayout;