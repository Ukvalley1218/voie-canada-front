import { useInView } from '../../hooks/useScrollAnimation';
import Button from '../ui/Button';

const ImageContentSection = ({
  title,
  subtitle,
  description,
  image,
  imageAlt = '',
  points = [],
  cta,
  reverse = false,
  background = 'white',
  className = ''
}) => {
  const [contentRef, isContentVisible] = useInView({ threshold: 0.2 });
  const [imageRef, isImageVisible] = useInView({ threshold: 0.2 });

  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-secondary-gray',
    blue: 'bg-primary-blue text-white',
    gradient: 'gradient-hero text-white'
  };

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      academic: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      work: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      passport: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      rocket: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      map: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A.5.5 0 013 16.82V5.18a.5.5 0 01.553-.476L9 6l6-3 5.447 2.724A.5.5 0 0121 5.18v11.64a.5.5 0 01-.553.476L15 18l-6 3z" />
        </svg>
      ),
      heart: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      lightbulb: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      chart: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      briefcase: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      clipboard: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      search: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      support: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      check: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      users: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      graduation: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      globe: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[iconName] || icons.check;
  };

  return (
    <section className={`py-16 lg:py-24 ${backgrounds[background]} ${className}`}>
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
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
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <img
                    src={image}
                    alt={imageAlt || title}
                    className="w-full h-80 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Corner accents */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-dark">Verified</div>
                      <div className="text-xs text-text-muted">RCIC Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Side */}
          <div
            ref={contentRef}
            className={`${reverse ? 'lg:order-1' : ''}`}
            style={{
              opacity: isContentVisible ? 1 : 0,
              transform: isContentVisible
                ? 'translateX(0)'
                : `translateX(${reverse ? '-50px' : '50px'})`,
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
            }}
          >
            {/* Subtitle */}
            {subtitle && (
              <span className="inline-block text-primary-red font-medium mb-3 uppercase tracking-wide text-sm relative">
                {subtitle}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-red/30" />
              </span>
            )}

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4 relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-primary-blue to-primary-red" />
            </h2>

            {/* Description */}
            {description && (
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                {description}
              </p>
            )}

            {/* Points */}
            {points && points.length > 0 && (
              <div className="space-y-4 mb-8">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group"
                    style={{
                      opacity: isContentVisible ? 1 : 0,
                      transform: isContentVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`
                    }}
                  >
                    <div className="w-12 h-12 bg-secondary-green/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-secondary-green group-hover:scale-110">
                      <span className="text-secondary-green group-hover:text-white transition-colors">
                        {getIcon(point.icon)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark mb-1 group-hover:text-primary-blue transition-colors">
                        {point.title}
                      </h4>
                      <p className="text-text-muted text-sm">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {cta && (
              <div className="flex flex-wrap gap-4">
                {cta.primary && (
                  <Button to={cta.primary.link} variant="primary" size="lg" className="hover-lift">
                    {cta.primary.text}
                  </Button>
                )}
                {cta.secondary && (
                  <Button to={cta.secondary.link} variant="secondary" size="lg" className="hover-lift">
                    {cta.secondary.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageContentSection;