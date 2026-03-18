import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import AnimatedSection, { AnimatedCounter } from '../common/AnimatedSection';
import AnimatedCard from '../common/AnimatedCard';
import { useSettings } from '../../contexts/SettingsContext';

const Hero = () => {
  const { hero, trustStats, loading } = useSettings();

  // Fallback stats if trustStats not available
  const displayStats = trustStats?.length > 0
    ? trustStats.slice(0, 3).map(stat => ({
        number: stat.number?.replace(/[^0-9]/g, '') || stat.number,
        suffix: stat.number?.replace(/[0-9]/g, '') || '',
        label: stat.label
      }))
    : [
        { number: '500', suffix: '+', label: 'Families Settled' },
        { number: '300', suffix: '+', label: 'Students Admitted' },
        { number: '95', suffix: '%', label: 'Success Rate' }
      ];

  // Extract hero content with fallbacks
  const headline = hero?.headline || 'Your Pathway to Canada';
  const subheadline = hero?.subheadline || 'Immigration & Education Made Personal';
  const description = hero?.description || 'Helping professionals, entrepreneurs, and students achieve their Canadian dream with personalized guidance and expert support.';
  const primaryCTA = hero?.primaryCTA || { text: 'Explore Immigration Options', link: '/immigration' };
  const secondaryCTA = hero?.secondaryCTA || { text: 'Discover Education Programs', link: '/education' };

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Background Image if available */}
      {hero?.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage || "https://www.mivisaconsultant.com/wp-content/uploads/2022/02/2104241316386919-1.jpg"}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse-soft"></div>
      </div>

      <Container className="relative z-10 pt-24 lg:pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white text-center lg:text-left">
            {/* Badge with animation */}
            <AnimatedSection animation="fade-in-down" delay={100}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 hover:bg-white/20 transition-colors duration-300">
                <span className="w-2 h-2 bg-accent-gold rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium">ICCRC Certified Consultants</span>
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fade-in-up" delay={200}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                {headline.split('Canada')[0]}
                {headline.includes('Canada') && (
                  <span className="text-accent-gold relative">
                    Canada
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                      <path d="M0 8C50 2 150 2 200 8" stroke="currentColor" strokeWidth="2" className="text-accent-gold/30" />
                    </svg>
                  </span>
                )}
                {headline.split('Canada')[1]}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={300}>
              <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
                {subheadline}
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={400}>
              <p className="text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {description}
              </p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="fade-in-up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button to={primaryCTA.link} variant="gold" size="lg" className="hover-shine">
                  <span className="flex items-center">
                    {primaryCTA.text}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
                <Button
                  to={secondaryCTA.link}
                  variant="secondary"
                  size="lg"
                  className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue transition-all duration-300"
                >
                  {secondaryCTA.text}
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="fade-in-up" delay={600}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                {displayStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center lg:text-left transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-accent-gold">
                      <AnimatedCounter
                        end={parseInt(stat.number) || 0}
                        suffix={stat.suffix}
                        duration={2000}
                        delay={index * 200}
                      />
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Image / Visual */}
          <div className="hidden lg:block relative">
            <AnimatedSection animation="fade-in-right" delay={400}>
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={hero?.backgroundImage || "https://www.mivisaconsultant.com/wp-content/uploads/2022/02/2104241316386919-1.jpg"}
                    alt="Canadian landscape"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/50 to-transparent"></div>
                </div>

                {/* Floating Cards with animations */}
                <AnimatedSection animation="scale-in" delay={700}>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 w-64 hover:shadow-2xl transition-shadow duration-300 animate-float">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-secondary-green/10 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text-dark">Visa Approved</div>
                        <div className="text-xs text-text-muted">Express Entry Success</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="scale-in" delay={800}>
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 hover:shadow-2xl transition-shadow duration-300 animate-float-delayed">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">🎓</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-text-dark">Top Universities</div>
                        <div className="text-xs text-text-muted">Admission Support</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>

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