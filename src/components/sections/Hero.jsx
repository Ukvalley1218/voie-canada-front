import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import heroimg from '../../assets/hero.webp'
import Button from '../ui/Button';
import AnimatedSection from '../common/AnimatedSection';
import { useSettings } from '../../contexts/SettingsContext';


// Default background image (consistent with defaults.js)
const DEFAULT_BG_IMAGE = heroimg;

// Icon mapping for badge
const BadgeIcon = ({ icon }) => {
  const icons = {
    flag: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    globe: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    check: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  return icons[icon] || icons.flag;
};

const Hero = () => {
  const { hero, trustStats, loading } = useSettings();

  // Show loading skeleton while settings load
  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 w-full min-h-screen flex items-center py-20 lg:py-0">
          <div className="container-custom">
            <div className="max-w-2xl">
              {/* Badge skeleton */}
              <div className="animate-pulse bg-white/20 h-8 w-48 rounded-full mb-6" />
              {/* Headline skeleton */}
              <div className="animate-pulse bg-white/20 h-12 w-96 rounded mb-4" />
              <div className="animate-pulse bg-white/20 h-8 w-80 rounded mb-3" />
              <div className="animate-pulse bg-white/20 h-6 w-full max-w-lg rounded mb-8" />
              {/* Buttons skeleton */}
              <div className="flex gap-4 mb-10">
                <div className="animate-pulse bg-white/20 h-12 w-48 rounded-lg" />
                <div className="animate-pulse bg-white/20 h-12 w-48 rounded-lg" />
              </div>
              {/* Stats skeleton */}
              <div className="flex gap-8">
                <div className="animate-pulse bg-white/20 h-16 w-24 rounded" />
                <div className="animate-pulse bg-white/20 h-16 w-24 rounded" />
                <div className="animate-pulse bg-white/20 h-16 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default stats
  const displayStats = hero?.stats?.length > 0
    ? hero.stats
    : trustStats?.slice(0, 3).map(stat => ({
        value: stat.number,
        label: stat.label
      })) || [
        { value: '500+', label: 'Families Settled' },
        { value: '300+', label: 'Students Admitted' },
        { value: '95%', label: 'Success Rate' }
      ];

  // Extract hero content - use consistent fallback
  const badge = hero?.badge || { text: 'IMMIGRATION CANADA', icon: 'flag' };
  const headline = hero?.headline || 'Your Pathway to Canada';
  const subheadline = hero?.subheadline || 'Immigration & Education Made Personal';
  const description = hero?.description || 'Helping professionals, entrepreneurs, and students achieve their Canadian dream with personalized guidance and expert support.';
  const backgroundImage = hero?.backgroundImage || DEFAULT_BG_IMAGE;
  const overlayOpacity = hero?.overlayOpacity ?? 0.85;
  const showStats = hero?.showStats !== false;
  const primaryCTA = hero?.primaryCTA || { text: 'Explore Immigration Options', link: '/immigration' };
  const secondaryCTA = hero?.secondaryCTA || { text: 'Discover Education Programs', link: '/education' };

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Canada landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Black Gradient Overlay from Left */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            rgba(0, 0, 0, ${overlayOpacity}) 0%,
            rgba(0, 0, 0, ${overlayOpacity * 0.9}) 20%,
            rgba(0, 0, 0, ${overlayOpacity * 0.7}) 40%,
            rgba(0, 0, 0, ${overlayOpacity * 0.4}) 55%,
            rgba(0, 0, 0, 0.1) 75%,
            transparent 100%)`
        }}
      />

      {/* Secondary color tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            rgba(30, 58, 138, 0.3) 0%,
            rgba(30, 58, 138, 0.2) 30%,
            transparent 60%)`
        }}
      />

      {/* Content Container - Left Aligned */}
      <div className="relative z-10 w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center py-16 sm:py-20 lg:py-0 lg:px-12">
        <div className="w-full px-4 sm:px-6 lg:px-0 lg:ml-0 container-custom">
          <div className="text-left max-w-xl sm:max-w-2xl">
            {/* Badge */}
            <AnimatedSection animation="fade-in-down" delay={100}>
              <div className="inline-flex items-center gap-2 bg-accent-gold/20 backdrop-blur-sm border border-accent-gold/40 px-4 py-2 rounded-full mb-6">
                <span className="text-accent-gold">
                  <BadgeIcon icon={badge.icon} />
                </span>
                <span className="text-white text-sm font-medium tracking-wide">{badge.text}</span>
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fade-in-up" delay={200}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-3 sm:mb-4">
                {headline.split(' ').map((word, idx, arr) => (
                  <span key={idx}>
                    {word.toLowerCase().includes('canada') ? (
                      <span className="text-accent-gold">{word}</span>
                    ) : (
                      word
                    )}
                    {idx < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection animation="fade-in-up" delay={300}>
              <p className="text-lg sm:text-xl md:text-2xl text-white font-light mb-2 sm:mb-3">
                {subheadline}
              </p>
            </AnimatedSection>

            {/* Description */}
            <AnimatedSection animation="fade-in-up" delay={400}>
              <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-md sm:max-w-lg">
                {description}
              </p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="fade-in-up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Button to={primaryCTA.link} variant="gold" size="sm" className="hover-lift group w-full sm:w-auto justify-center">
                  <span className="flex items-center justify-center">
                    {primaryCTA.text}
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
                <Button
                  to={secondaryCTA.link}
                  variant="secondary"
                  size="lg"
                  className="!bg-white/10 !border-white/50 !text-white hover:!bg-white hover:!text-primary-blue transition-all duration-300 hover-lift w-full sm:w-auto justify-center"
                >
                  {secondaryCTA.text}
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            {showStats && (
              <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
                {displayStats.map((stat, index) => {
                  // Different animations for each stat
                  const animations = ['scale-up', 'fade-in-left', 'scale-up'];
                  const delays = [600, 750, 900];
                  return (
                    <AnimatedSection
                      key={index}
                      animation={animations[index % animations.length]}
                      delay={delays[index % delays.length]}
                    >
                      <div className="text-left min-w-[80px] sm:min-w-[100px]">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatedSection animation="fade-in" delay={1000}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Hero;