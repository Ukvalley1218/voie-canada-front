import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Hero from '../components/sections/Hero';
import ImageContentSection from '../components/sections/ImageContentSection';
import StatsSection from '../components/sections/StatsSection';
import TestimonialsPreview from '../components/sections/TestimonialsPreview';
import CTASection from '../components/sections/CTASection';
import SectionHeader from '../components/ui/SectionHeader';
import ServiceCard from '../components/common/ServiceCard';
import { useSettings } from '../contexts/SettingsContext';
import { useFetchData } from '../hooks/useFetchData';
import { serviceService, testimonialService } from '../services';
import { defaultImmigrationServices, defaultEducationServices, defaultTestimonials, defaultProcessSteps, defaultFaqs, defaultSettings } from '../data/defaults';

// Icons for services
const ImmigrationIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const HomePage = () => {
  const { homepageSections, statsSection, testimonialsSection, ctaBanner, differentiator, ctaSection, processSteps, faqs } = useSettings();

  const [processRef, isProcessVisible] = useInView({ threshold: 0.2 });
  const [immigrationRef, isImmigrationVisible] = useInView({ threshold: 0.2 });
  const [educationRef, isEducationVisible] = useInView({ threshold: 0.2 });
  const [faqRef, isFaqVisible] = useInView({ threshold: 0.2 });
  const [blogRef, isBlogVisible] = useInView({ threshold: 0.2 });
  const [whyChooseRef, isWhyChooseVisible] = useInView({ threshold: 0.2 });

  // Fetch immigration services
  const { data: immigrationServices } = useFetchData(
    () => serviceService.getByCategory('immigration'),
    defaultImmigrationServices
  );

  // Fetch education services
  const { data: educationServices } = useFetchData(
    () => serviceService.getByCategory('education'),
    defaultEducationServices
  );

  // Fetch testimonials
  const { data: testimonials } = useFetchData(
    () => testimonialService.getFeatured(),
    defaultTestimonials
  );

  // Get process steps with fallback
  const displayProcessSteps = processSteps?.length > 0 ? processSteps : defaultProcessSteps;

  // Get FAQs with fallback
  const displayFaqs = faqs?.length > 0 ? faqs : defaultFaqs;

  // Get dynamic homepage sections with fallback to defaults
  const displayHomepageSections = homepageSections?.length > 0 ? homepageSections : defaultSettings.homepageSections;

  // Differentiator points with fallback
  const differentiatorPoints = differentiator?.points?.length > 0
    ? differentiator.points
    : [
        { title: 'Specialized Student Support', description: 'Expert guidance for students with learning challenges' },
        { title: 'Entrepreneur Immigration', description: 'Dedicated startup visa and business immigration programs' },
        { title: 'Personalized Approach', description: 'One-on-one guidance tailored to your unique journey' }
      ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section - Enhanced with icons */}
      <StatsSection
        title={statsSection?.title || 'Trusted by Hundreds of Families'}
        subtitle={statsSection?.subtitle || 'Our track record speaks for itself'}
        stats={statsSection?.stats?.length > 0 ? statsSection.stats : defaultSettings.statsSection?.stats || []}
        background={statsSection?.backgroundColor || 'gray'}
      />

      {/* Dynamic Image + Content Sections */}
      {displayHomepageSections
        .filter(section => section.isActive)
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <ImageContentSection
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            image={section.image}
            imageAlt={section.imageAlt}
            points={section.points}
            cta={section.cta}
            reverse={section.type === 'content-image'}
            background={section.backgroundColor || (index % 2 === 0 ? 'white' : 'gray')}
          />
        ))}

      {/* Immigration Services */}
      <Section>
        <SectionHeader
          subtitle="Immigration Services"
          title="Your Canadian Immigration Journey"
          description="Canada offers over 80 immigration pathways. We help you choose the right one for your unique situation."
        />

        <div ref={immigrationRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {immigrationServices.slice(0, 3).map((service, index) => (
            <div
              key={service._id || index}
              className="h-full"
              style={{
                opacity: isImmigrationVisible ? 1 : 0,
                transform: isImmigrationVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <ServiceCard
                icon={<ImmigrationIcon />}
                title={service.title}
                description={service.description}
                link={service.slug ? `/immigration/${service.slug}` : `/immigration`}
                centered={true}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/immigration" variant="primary" className="hover-lift">
            View All Immigration Services
          </Button>
        </div>
      </Section>

      {/* Education Services */}
      <Section background="gray">
        <SectionHeader
          subtitle="Education Services"
          title="Education Pathways for Every Student"
          description="Inclusive education support from admissions to graduation. We specialize in helping students with unique needs."
        />

        <div ref={educationRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {educationServices.slice(0, 3).map((service, index) => (
            <div
              key={service._id || index}
              className="h-full"
              style={{
                opacity: isEducationVisible ? 1 : 0,
                transform: isEducationVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <ServiceCard
                icon={<EducationIcon />}
                title={service.title}
                description={service.description}
                link={service.slug ? `/education/${service.slug}` : `/education`}
                badge={service.badge}
                centered={true}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/education" variant="primary" className="hover-lift">
            View All Education Services
          </Button>
        </div>
      </Section>

      {/* How It Works - Enhanced Process Steps */}
      <Section>
        <SectionHeader
          subtitle="Our Process"
          title="How It Works"
          description="Your journey to Canada in 5 simple steps"
        />

        <div ref={processRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary-blue via-primary-red to-secondary-green" />

            {displayProcessSteps.map((step, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center"
                style={{
                  opacity: isProcessVisible ? 1 : 0,
                  transform: isProcessVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
                }}
              >
                {/* Step number circle */}
                <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-card flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-card-hover">
                  <span className="text-3xl font-heading font-bold text-primary-blue">{step.number || index + 1}</span>
                </div>

                <h3 className="text-base font-heading font-semibold text-primary-blue mb-2 text-center transition-colors group-hover:text-primary-red min-h-[2.5rem]">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us - Enhanced */}
      <Section background="gray">
        <div ref={whyChooseRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            className="relative"
            style={{
              opacity: isWhyChooseVisible ? 1 : 0,
              transform: isWhyChooseVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.95)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src={differentiator?.image || "https://geic.in/wp-content/uploads/2024/05/LOILhdIYSBOmfvQKpyIjYg-768x432.png"}
              alt="Why choose us"
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
            />
            {/* Overlay card */}
            <div
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
              style={{
                opacity: isWhyChooseVisible ? 1 : 0,
                transform: isWhyChooseVisible ? 'translateX(0) translateY(0)' : 'translateX(30px) translateY(30px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary-green/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-heading font-bold text-primary-blue">95%</div>
                  <div className="text-sm text-text-muted">Success Rate</div>
                </div>
              </div>
              <p className="text-text-dark text-sm">Trusted by 500+ families worldwide</p>
            </div>
          </div>

          {/* Content Side */}
          <div
            style={{
              opacity: isWhyChooseVisible ? 1 : 0,
              transform: isWhyChooseVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s'
            }}
          >
            <span className="inline-block text-primary-red font-medium mb-3 uppercase tracking-wide text-sm">
              {differentiator?.title || 'Why Choose Us'}
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
              {differentiator?.headline || 'Inclusive Education & Tailored Immigration Support'}
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              {differentiator?.description || 'At Voie Canada, we specialize in inclusive education pathways and tailored entrepreneur immigration programs.'}
            </p>

            <div className="space-y-4 mb-8">
              {differentiatorPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start group"
                  style={{
                    opacity: isWhyChooseVisible ? 1 : 0,
                    transform: isWhyChooseVisible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s`
                  }}
                >
                  <div className="w-10 h-10 bg-secondary-green/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-secondary-green group-hover:scale-110">
                    <svg className="w-5 h-5 text-secondary-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark transition-colors group-hover:text-primary-blue">
                      {point.title}
                    </h4>
                    <p className="text-text-muted text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: isWhyChooseVisible ? 1 : 0,
                transform: isWhyChooseVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
              }}
            >
              <Button to="/about" variant="primary" className="hover-lift">
                Learn More
              </Button>
              <Button to="/assessment" variant="secondary" className="hover-lift">
                Free Assessment
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQs Section */}
      <Section>
        <SectionHeader
          subtitle="FAQs"
          title="Frequently Asked Questions"
          description="Get answers to common questions about immigration and education"
        />

        <div ref={faqRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayFaqs.slice(0, 6).map((faq, index) => (
              <div
                key={index}
                className="bg-secondary-gray rounded-xl p-6 hover:shadow-card transition-all duration-300 group"
                style={{
                  opacity: isFaqVisible ? 1 : 0,
                  transform: isFaqVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-primary-blue">
                    <svg className="w-4 h-4 text-primary-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark mb-2 transition-colors group-hover:text-primary-blue">
                      {faq.question}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <span className="inline-block mt-3 px-2 py-1 bg-white text-xs font-medium text-primary-blue rounded">
                        {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button to="/faq" variant="secondary" className="hover-lift">
              View All FAQs
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <TestimonialsPreview
        title={testimonialsSection?.title || 'Success Stories'}
        subtitle={testimonialsSection?.subtitle || 'Real Journeys. Real Success.'}
        description={testimonialsSection?.description || 'From visa approvals to inclusive education placements, we make every journey possible.'}
        testimonials={testimonials}
        background={testimonialsSection?.backgroundColor || 'gray'}
      />

      {/* CTA Banner */}
      <CTASection
        headline={ctaBanner?.headline || ctaSection?.headline || 'Start Your Canadian Journey Today'}
        description={ctaBanner?.description || ctaSection?.description || 'Take the first step towards your Canadian dream. Get a free assessment or book a consultation with our experts.'}
        backgroundImage={ctaBanner?.backgroundImage || 'https://i0.wp.com/calmatters.org/wp-content/uploads/2025/06/050625-TurnitinAICollege-JAH-CM-02.jpg?resize=1536%2C1024&ssl=1'}
        backgroundColor={ctaBanner?.backgroundColor || 'blue'}
        primaryButton={ctaBanner?.primaryButton || ctaSection?.primaryButton || { text: 'Free Assessment', link: '/assessment' }}
        secondaryButton={ctaBanner?.secondaryButton || ctaSection?.secondaryButton || { text: 'Book Consultation', link: '/contact' }}
      />

      {/* Blog Preview */}
      <Section>
        <div
          ref={blogRef}
          className="text-center mb-12"
          style={{
            opacity: isBlogVisible ? 1 : 0,
            transform: isBlogVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Latest Resources
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Stay Informed
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Explore immigration updates, education trends, and helpful guides.
          </p>
        </div>

        <div className="text-center">
          <Button to="/resources" variant="primary" className="hover-lift">
            View All Resources
          </Button>
        </div>
      </Section>
    </>
  );
};

export default HomePage;