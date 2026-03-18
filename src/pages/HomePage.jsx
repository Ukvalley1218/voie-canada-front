import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Hero from '../components/sections/Hero';
import SectionLayout from '../components/common/SectionLayout';
import ServiceCard from '../components/common/ServiceCard';
import TestimonialCard from '../components/common/TestimonialCard';
import { useSettings } from '../contexts/SettingsContext';
import { useFetchData } from '../hooks/useFetchData';
import { serviceService, testimonialService } from '../services';
import { defaultImmigrationServices, defaultEducationServices, defaultTestimonials, defaultProcessSteps, defaultFaqs } from '../data/defaults';

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

const BusinessIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ScholarshipIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HomePage = () => {
  const { differentiator, ctaSection, processSteps, faqs } = useSettings();

  const [trustRef, isTrustVisible] = useInView({ threshold: 0.2 });
  const [processRef, isProcessVisible] = useInView({ threshold: 0.2 });
  const [immigrationRef, isImmigrationVisible] = useInView({ threshold: 0.2 });
  const [educationRef, isEducationVisible] = useInView({ threshold: 0.2 });
  const [faqRef, isFaqVisible] = useInView({ threshold: 0.2 });
  const [testimonialRef, isTestimonialVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });
  const [blogRef, isBlogVisible] = useInView({ threshold: 0.2 });

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

  // Map API data to service cards
  const mapServiceToCard = (service) => ({
    icon: service.category === 'immigration' ? <ImmigrationIcon /> : <EducationIcon />,
    title: service.title,
    description: service.description,
    link: `/services/${service.slug}` || service.link,
    badge: service.badge
  });

  // Get process steps with fallback
  const displayProcessSteps = processSteps?.length > 0 ? processSteps : defaultProcessSteps;

  // Get FAQs with fallback
  const displayFaqs = faqs?.length > 0 ? faqs : defaultFaqs;

  const trustStats = [
    { value: '500+', label: 'Families Settled' },
    { value: '300+', label: 'Students Admitted' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Countries Served' },
  ];

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

      {/* Trust Signals */}
      <Section background="gray">
        <div className="text-center mb-8">
          <p className="text-text-muted text-sm uppercase tracking-widest font-medium">
            Trusted by Hundreds of Families
          </p>
        </div>
        <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-card text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group"
              style={{
                opacity: isTrustVisible ? 1 : 0,
                transform: isTrustVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="text-3xl font-heading font-bold text-primary-blue mb-2 transition-transform duration-300 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm">{stat.label}</div>
              {/* Bottom accent */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300 group-hover:w-full mx-auto" />
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works - Process Steps */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            How It Works
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Your journey to Canada in 5 simple steps
          </p>
        </div>

        <div ref={processRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-blue via-primary-red to-secondary-green hidden md:block" />

            {displayProcessSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 mb-8 last:mb-0 group"
                style={{
                  opacity: isProcessVisible ? 1 : 0,
                  transform: isProcessVisible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
                }}
              >
                {/* Step number */}
                <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-card flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-card-hover">
                  <span className="text-2xl font-heading font-bold text-primary-blue">{step.number || index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-secondary-gray rounded-xl p-6 transition-all duration-300 group-hover:shadow-card group-hover:-translate-y-1">
                  <h3 className="text-xl font-heading font-semibold text-primary-blue mb-2 transition-colors group-hover:text-primary-red">
                    {step.title}
                  </h3>
                  <p className="text-text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Immigration Services */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Immigration Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Your Canadian Immigration Journey
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Canada offers over 80 immigration pathways. We help you choose the right one for your unique situation.
          </p>
        </div>

        <div ref={immigrationRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {immigrationServices.slice(0, 3).map((service, index) => (
            <div
              key={service._id || index}
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
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Education Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Education Pathways for Every Student
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Inclusive education support from admissions to graduation. We specialize in helping students with unique needs.
          </p>
        </div>

        <div ref={educationRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {educationServices.slice(0, 3).map((service, index) => (
            <div
              key={service._id || index}
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

      {/* Differentiator */}
      <SectionLayout
        subtitle={differentiator?.title || "Why Choose Us"}
        title={differentiator?.headline || "Inclusive Education & Tailored Immigration Support"}
        description={differentiator?.description || "At Voie Canada, we specialize in inclusive education pathways and tailored entrepreneur immigration programs. Our unique expertise in supporting academically challenged students sets us apart."}
        image={differentiator?.imagurl ||"https://www.mivisaconsultant.com/wp-content/uploads/2022/02/2104241316386919-1.jpg"}
        imageAlt="Voie Canada team helping clients"
        reverse={false}
        cta={{
          primary: { label: 'Learn More', to: '/about', variant: 'primary' },
          secondary: { label: 'Free Assessment', to: '/assessment', variant: 'secondary' }
        }}
      >
        <div className="space-y-4">
          {differentiatorPoints.map((point, index) => (
            <div key={index} className="flex items-start group">
              <div className="w-8 h-8 bg-secondary-green/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-secondary-green group-hover:scale-110">
                <svg className="w-5 h-5 text-secondary-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-text-dark transition-colors group-hover:text-primary-blue">{point.title}</h4>
                <p className="text-text-muted text-sm">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionLayout>

      {/* FAQs Section */}
      <Section background="gray">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            FAQs
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Get answers to common questions about immigration and education
          </p>
        </div>

        <div ref={faqRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayFaqs.slice(0, 6).map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
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
                      <span className="inline-block mt-3 px-2 py-1 bg-secondary-gray text-xs font-medium text-primary-blue rounded">
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
      <Section background="gray">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Success Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Real Journeys. Real Success.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From visa approvals to inclusive education placements, we make every journey possible.
          </p>
        </div>

        <div ref={testimonialRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              style={{
                opacity: isTestimonialVisible ? 1 : 0,
                transform: isTestimonialVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                category={testimonial.category}
                photo={testimonial.photo}
                videoUrl={testimonial.videoUrl}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/success-stories" variant="secondary" className="hover-lift">
            Read More Stories
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="blue">
        <div
          ref={ctaRef}
          className="text-center"
          style={{
            opacity: isCtaVisible ? 1 : 0,
            transform: isCtaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            {ctaSection?.headline || 'Start Your Canadian Journey Today'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {ctaSection?.description || 'Take the first step towards your Canadian dream. Get a free assessment or book a consultation with our experts.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to={ctaSection?.primaryButton?.link || '/assessment'} variant="gold" size="lg" className="hover-lift">
              {ctaSection?.primaryButton?.text || 'Free Assessment'}
            </Button>
            <Button to={ctaSection?.secondaryButton?.link || '/contact'} variant="secondary" size="lg" className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue hover-lift">
              {ctaSection?.secondaryButton?.text || 'Book Consultation'}
            </Button>
          </div>
        </div>
      </Section>

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