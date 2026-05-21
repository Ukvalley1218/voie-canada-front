import { useInView } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ServiceCard from '../components/common/ServiceCard';
import { useFetchData } from '../hooks/useFetchData';
import { serviceService } from '../services';
import { useSettings } from '../contexts/SettingsContext';

const ImmigrationPage = () => {
  const { processSteps: settingsProcessSteps } = useSettings();
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [servicesRef, isServicesVisible] = useInView({ threshold: 0.2 });
  const [processRef, isProcessVisible] = useInView({ threshold: 0.2 });
  const [whyRef, isWhyVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  // Fetch immigration services from API
  const { data: apiServices } = useFetchData(
    () => serviceService.getByCategory('immigration'),
    []
  );

  // Default services for fallback
  const defaultServices = [
    {
      slug: 'express-entry-skilled-worker-programs',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Express Entry & Skilled Worker Programs',
      description: 'Fast-track your Canadian permanent residency through Express Entry, Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades programs.',
      longDescription: 'Express Entry is Canada\'s flagship application management system for skilled workers. Our team helps you navigate the Comprehensive Ranking System (CRS), optimize your profile, and maximize your chances of receiving an Invitation to Apply (ITA) for permanent residency.',
      benefits: [
        'CRS score optimization strategies',
        'Profile creation and management',
        'Document checklist and verification',
        'Regular draw monitoring and updates',
        'Provincial Nominee alignment guidance',
        'Post-ITA application support'
      ],
      link: '/immigration/express-entry-skilled-worker-programs'
    },
    {
      slug: 'entrepreneur-startup-visa-programs',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Entrepreneur & Startup Visa Programs',
      description: 'Launch your business in Canada with expert support for Startup Visa, Self-Employed Persons, and Business Immigration programs.',
      longDescription: 'Canada offers excellent pathways for entrepreneurs and business owners to establish themselves. The Startup Visa program provides a direct path to permanent residency for innovative entrepreneurs with the support of designated Canadian investors.',
      benefits: [
        'Business plan development support',
        'Designated organization introductions',
        'Investment pitch preparation',
        'Self-Employed program assessment',
        'Business immigration strategy',
        'Post-landing business support'
      ],
      link: '/immigration/entrepreneur-startup-visa-programs'
    },
    {
      slug: 'provincial-nominee-programs-pnp',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Provincial Nominee Programs (PNP)',
      description: 'Explore immigration opportunities across Canada\'s provinces and territories with tailored PNP guidance for your skills and goals.',
      longDescription: 'Each Canadian province and territory operates its own immigration programs designed to address local labor market needs. We help you identify the right PNP stream based on your occupation, education, and connection to the province.',
      benefits: [
        'Province-specific eligibility assessment',
        'Occupation-based stream matching',
        'Application documentation support',
        'Provincial and federal coordination',
        'Enhanced PNP strategies',
        'Settlement planning per province'
      ],
      link: '/immigration/provincial-nominee-programs-pnp'
    },
    {
      slug: 'francophone-immigration-pathways',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: 'Francophone Immigration Pathways',
      description: 'Specialized support for French-speaking applicants seeking to immigrate to Canada through Francophone immigration streams.',
      longDescription: 'Canada values French-speaking immigrants and offers special pathways for Francophones. These programs provide priority processing and additional points toward your application, making it easier for French speakers to settle in Canada.',
      benefits: [
        'French language proficiency assessment',
        'Francophone community connections',
        'Mobility Francophone stream guidance',
        'Ontario Francophone PNP support',
        'Settlement in Francophone communities',
        'Language test preparation tips'
      ],
      link: '/immigration/francophone-immigration-pathways'
    },
    {
      slug: 'complex-case-handling',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Complex Case Handling',
      description: 'Expert support for appeals, refusals, and reapplications. We navigate complex immigration situations with proven strategies.',
      longDescription: 'Not all immigration cases are straightforward. Our team specializes in handling complicated situations including previous refusals, medical inadmissibility, criminal inadmissibility, and other challenging circumstances that require expert intervention.',
      benefits: [
        'Refusal analysis and strategy',
        'Appeal preparation support',
        'Medical inadmissibility solutions',
        'Criminal rehabilitation applications',
        'Procedural fairness responses',
        'Judicial review coordination'
      ],
      badge: 'Specialized',
      link: '/immigration/complex-case-handling'
    },
    {
      slug: 'post-arrival-settlement-services',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Post-Arrival Settlement Services',
      description: 'Comprehensive support for housing, banking, community integration, and essential services after you arrive in Canada.',
      longDescription: 'Your journey doesn\'t end when you land in Canada. We provide comprehensive settlement support to help you integrate successfully, from finding housing and opening bank accounts to connecting with community services and navigating Canadian systems.',
      benefits: [
        'Airport pickup coordination',
        'Housing search assistance',
        'Banking and SIN setup',
        'Healthcare registration',
        'School enrollment support',
        'Community integration programs'
      ],
      link: '/immigration/post-arrival-settlement-services'
    },
  ];

  // Use API data if available, otherwise use defaults
  const services = apiServices?.length > 0
    ? apiServices.map(service => ({
      _id: service._id,
      slug: service.slug,
      icon: null, // Icons will be handled by slug-based logic
      title: service.title,
      description: service.description,
      longDescription: service.longDescription,
      benefits: service.benefits,
      image: service.image,
      badge: service.badge,
      link: `/immigration/${service.slug || service._id}`
    }))
    : defaultServices;

  // Process steps from settings or defaults
  const defaultProcessSteps = [
    { step: 1, title: 'Free Assessment', description: 'Share your background and goals for a personalized evaluation.' },
    { step: 2, title: 'Strategy Planning', description: 'Receive a tailored immigration strategy based on your profile.' },
    { step: 3, title: 'Documentation', description: 'We help gather and prepare all required documents accurately.' },
    { step: 4, title: 'Application', description: 'Your application is submitted with expert oversight.' },
    { step: 5, title: 'Follow-Up', description: 'We track progress and handle any requests from immigration.' },
    { step: 6, title: 'Arrival', description: 'Welcome to Canada! We support your settlement journey.' },
  ];

  const processSteps = settingsProcessSteps?.length > 0
    ? settingsProcessSteps
    : defaultProcessSteps;

  const whyChooseItems = [
    { title: 'ICCRC Certified Consultants', description: 'All our consultants are licensed and regulated' },
    { title: 'Personalized Strategy', description: 'Tailored plans based on your unique profile' },
    { title: 'High Success Rate', description: 'Over 95% of our applications are successful' },
    { title: 'Complex Case Expertise', description: 'Specialized handling of appeals and refusals' },
  ];

  // Icon mapping for services
  const getServiceIcon = (slug, index) => {
    const icons = [
      <svg key="lightning" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      <svg key="building" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>,
      <svg key="globe" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="language" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>,
      <svg key="shield" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      <svg key="home" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>,
    ];
    return icons[index % icons.length];
  };

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
            Immigration Services
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Your Canadian Immigration Journey
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Canada offers over 80 immigration pathways. We help you choose the right one for your unique situation.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Immigration Programs We Support
          </h2>
        </div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <div
              key={service.slug || index}
              style={{
                opacity: isServicesVisible ? 1 : 0,
                transform: isServicesVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <ServiceCard
                icon={service.icon || getServiceIcon(service.slug, index)}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section background="gray">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            How It Works
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A simple, transparent process to guide you from consultation to Canadian residency.
          </p>
        </div>

        <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-card relative group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 pt-8"
              style={{
                opacity: isProcessVisible ? 1 : 0,
                transform: isProcessVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="absolute top-4 left-4 lg:absolute lg:-top-4 lg:-left-4 w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-heading font-bold transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-red">
                {step.number || step.step}
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary-blue mb-2 mt-2 transition-colors duration-300 group-hover:text-primary-red">
                {step.title}
              </h4>
              <p className="text-text-muted text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div ref={whyRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            style={{
              opacity: isWhyVisible ? 1 : 0,
              transform: isWhyVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
              Expert Guidance Every Step of the Way
            </h2>
            <p className="text-text-muted text-lg mb-6 leading-relaxed">
              Our team of certified immigration consultants brings years of experience and a deep understanding of Canadian immigration law.
            </p>

            <div className="space-y-4">
              {whyChooseItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start group"
                  style={{
                    opacity: isWhyVisible ? 1 : 0,
                    transform: isWhyVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`
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

          <div
            className="relative rounded-2xl overflow-hidden shadow-card group"
            style={{
              opacity: isWhyVisible ? 1 : 0,
              transform: isWhyVisible ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.95)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <img
              src="https://geic.in/wp-content/uploads/2024/05/LOILhdIYSBOmfvQKpyIjYg-768x432.png"
              alt="Immigration consultation"
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            Check Your Eligibility Today
          </h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Get a free assessment to discover the best immigration pathway for your Canadian dream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/assessment" variant="gold" size="lg" className="hover-lift">
              Book Consultation
            </Button>
            {/* <Button to="/contact" variant="secondary" size="lg" className="!bg-white/10 !border-black !text-black hover:!bg-white hover:!text-primary-blue hover-lift">
              Book Consultation
            </Button> */}
          </div>
        </div>
      </Section>
    </>
  );
};

export default ImmigrationPage;