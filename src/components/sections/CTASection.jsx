import { useInView } from '../../hooks/useScrollAnimation';
import Button from '../ui/Button';

const CTASection = ({
  headline,
  description,
  backgroundImage,
  backgroundColor = 'blue',
  primaryButton,
  secondaryButton,
  className = ''
}) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-secondary-gray',
    blue: 'bg-primary-blue',
    gradient: 'gradient-hero'
  };

  return (
    <section
      ref={ref}
      className={`relative py-20 lg:py-28 overflow-hidden ${backgrounds[backgroundColor]} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 " />
        </div>
      )}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            {headline}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton && (
              <Button
                to={primaryButton.link}
                variant="gold"
                size="xl"
                className="hover-lift group"
              >
                <span className="flex items-center">
                  {primaryButton.text}
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
            )}
            {secondaryButton && (
              <Button
                to={secondaryButton.link}
                variant="secondary"
                size="xl"
                className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue transition-all duration-300 hover-lift"
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>RCIC Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>500+ Families Helped</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;