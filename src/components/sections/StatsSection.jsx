import { useInView } from '../../hooks/useScrollAnimation';
import Section from '../ui/Section';

const StatsSection = ({
  title = 'Trusted by Hundreds of Families',
  subtitle = 'Our track record speaks for itself',
  stats = [],
  background = 'gray'
}) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  // Icon mapping for stats
  const getIcon = (iconName) => {
    const icons = {
      users: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      graduation: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      check: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      globe: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      star: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    };
    return icons[iconName] || icons.check;
  };

  // Default stats if none provided
  const displayStats = stats.length > 0 ? stats : [
    { number: '500+', label: 'Families Settled', icon: 'users', description: 'Successfully helped families relocate' },
    { number: '300+', label: 'Students Admitted', icon: 'graduation', description: 'Placed in top institutions' },
    { number: '95%', label: 'Success Rate', icon: 'check', description: 'High approval rate' },
    { number: '50+', label: 'Countries Served', icon: 'globe', description: 'Global client base' }
  ];

  return (
    <Section background={background}>
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        {subtitle && (
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            {subtitle}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-3 sm:mb-4">
          {title}
        </h2>
      </div>

      {/* Stats Grid */}
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {displayStats.map((stat, index) => (
          <div
            key={index}
            className="relative group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
            }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 text-center relative overflow-hidden">
              {/* Background gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue via-primary-red to-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-blue/10 to-primary-red/10 rounded-xl flex items-center justify-center text-primary-blue transition-all duration-300 group-hover:scale-110 group-hover:from-primary-blue group-hover:to-primary-red group-hover:text-white">
                {getIcon(stat.icon)}
              </div>

              {/* Number */}
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-primary-blue mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-text-muted text-xs sm:text-sm lg:text-base font-medium mb-2">{stat.label}</div>

              {/* Description */}
              {stat.description && (
                <div className="text-text-light text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  {stat.description}
                </div>
              )}

              {/* Corner accent */}
              <div className="absolute bottom-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <svg viewBox="0 0 32 32" fill="currentColor" className="text-primary-blue">
                  <path d="M16 0v16h16c0-8.837-7.163-16-16-16z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-text-muted text-xs sm:text-sm mb-3 sm:mb-4">Trusted by clients worldwide</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-center opacity-60">
          {/* Certification badges */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg shadow-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-text-dark text-xs sm:text-sm font-medium">ICCRC Certified</span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg shadow-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-dark text-xs sm:text-sm font-medium">Verified Agency</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StatsSection;