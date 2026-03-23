import { useInView } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ServiceCard from '../components/common/ServiceCard';

const EducationPage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [uniqueRef, isUniqueVisible] = useInView({ threshold: 0.2 });
  const [servicesRef, isServicesVisible] = useInView({ threshold: 0.2 });
  const [whyRef, isWhyVisible] = useInView({ threshold: 0.2 });
  const [scholarshipRef, isScholarshipVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  const services = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: 'College & University Admissions',
      description: 'Secure admission to Canada\'s top institutions with personalized guidance on programs, applications, and enrollment.',
      link: '/education/admissions'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Specialized Programs for Challenged Students',
      description: 'Inclusive support for students with learning challenges, special needs, and unique educational requirements.',
      link: '/education/specialized-programs',
      badge: 'Unique'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: 'Bridge & Foundation Programs',
      description: 'Prepare for success with bridge programs and foundation courses designed for international students.',
      link: '/education/bridge-programs'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Scholarship & Financial Aid Guidance',
      description: 'Maximize your opportunities with tailored scholarship support and financial aid application assistance.',
      link: '/education/scholarships'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Career Clarity & Aptitude Testing',
      description: 'Discover the right program for your future with professional career guidance and aptitude assessments.',
      link: '/education/career-clarity'
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Parent Advisory Services',
      description: 'Comprehensive guidance for families relocating with children, including school selection and educational planning.',
      link: '/education/parent-advisory'
    },
  ];

  const whyChooseUs = [
    { title: 'Inclusive Education Expertise', description: 'Specialized support for students with learning challenges and unique needs' },
    { title: 'Direct University Partnerships', description: 'Strong relationships with Canadian colleges and universities' },
    { title: 'Holistic Support', description: 'From career assessment to enrollment and beyond' },
    { title: 'Financial Aid Navigation', description: 'Expert guidance on scholarships and financial assistance' },
  ];

  const inclusiveFeatures = [
    'Individualized Education Plans (IEPs)',
    'Learning support centers',
    'Bridge and foundation programs',
    'Academic accommodations',
    'Smaller class sizes',
    'Dedicated student advisors'
  ];

  return (
    <>
      {/* Hero */}
      <Section background="blue" className="pt-20">
        <div
          ref={heroRef}
          className="text-center"
          style={{
            opacity: isHeroVisible ? 1 : 0,
            transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <span className="inline-block text-accent-gold font-medium mb-2 uppercase tracking-wide text-sm">
            Education Services
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Education Pathways for Every Student
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Inclusive education support from admissions to graduation. We specialize in helping students with unique needs find their path to success.
          </p>
        </div>
      </Section>

      {/* Unique Differentiator */}
      <Section background="gray">
        <div
          ref={uniqueRef}
          className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
          style={{
            opacity: isUniqueVisible ? 1 : 0,
            transform: isUniqueVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-accent-gold/20 rounded-xl flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 hover:bg-accent-gold/30">
              <svg className="w-7 h-7 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-primary-blue">
                Our Unique Focus: Inclusive Education
              </h3>
              <p className="text-text-muted">Specializing in academically challenged student admissions</p>
            </div>
          </div>
          <p className="text-text-dark leading-relaxed mb-4">
            At Voie Canada, we believe every student deserves access to quality education. Our specialized programs support students with learning challenges, ADHD, dyslexia, and other unique educational needs. We work with institutions that offer:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inclusiveFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-text-muted group"
                style={{
                  opacity: isUniqueVisible ? 1 : 0,
                  transform: isUniqueVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.05}s`
                }}
              >
                <div className="w-5 h-5 bg-secondary-green/10 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-secondary-green">
                  <svg className="w-3 h-3 text-secondary-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="group-hover:text-text-dark transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Education Programs We Support
          </h2>
        </div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                opacity: isServicesVisible ? 1 : 0,
                transform: isServicesVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
                badge={service.badge}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section background="gray">
        <div ref={whyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative rounded-2xl overflow-hidden shadow-card group"
            style={{
              opacity: isWhyVisible ? 1 : 0,
              transform: isWhyVisible ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src="https://geic.in/wp-content/uploads/2024/05/LOILhdIYSBOmfvQKpyIjYg-768x432.png"
              alt="Students studying"
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div
            style={{
              opacity: isWhyVisible ? 1 : 0,
              transform: isWhyVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
              Your Education Partner
            </h2>
            <p className="text-text-muted text-lg mb-6 leading-relaxed">
              We understand that every student's journey is unique. Our education specialists provide personalized guidance from program selection to enrollment and beyond.
            </p>

            <div className="space-y-4">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start group"
                  style={{
                    opacity: isWhyVisible ? 1 : 0,
                    transform: isWhyVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s`
                  }}
                >
                  <div className="w-8 h-8 bg-secondary-green/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-secondary-green group-hover:scale-110">
                    <svg className="w-5 h-5 text-secondary-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark transition-colors group-hover:text-primary-blue">{item.title}</h4>
                    <p className="text-text-muted text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Scholarship Finder CTA */}
      <Section>
        <div
          ref={scholarshipRef}
          className="bg-gradient-to-r from-primary-blue to-primary-red rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
          style={{
            opacity: isScholarshipVisible ? 1 : 0,
            transform: isScholarshipVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Find Scholarships for You
              </h2>
              <p className="text-white/80 mb-6">
                Discover scholarships and financial aid opportunities tailored to your academic profile. Our scholarship finder tool helps you identify funding options for your Canadian education journey.
              </p>
              <Button to="/education/scholarships" variant="gold" size="lg" className="hover-lift">
                Explore Scholarships
              </Button>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 inline-block transition-transform duration-300 hover:scale-105">
                <div className="text-5xl font-heading font-bold text-accent-gold mb-2">$2M+</div>
                <div className="text-white/80">Scholarships secured for our students</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="gray">
        <div
          ref={ctaRef}
          className="text-center"
          style={{
            opacity: isCtaVisible ? 1 : 0,
            transform: isCtaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-black mb-4">
            Find the Right Program for You
          </h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Get personalized guidance on Canadian education opportunities. Book a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/assessment" variant="gold" size="lg" className="hover-lift">
              Free Assessment
            </Button>
            <Button to="/contact" variant="secondary" size="lg" className="!bg-white/10 !border-black !text-black hover:!bg-white hover:!text-primary-blue hover-lift">
              Book Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default EducationPage;