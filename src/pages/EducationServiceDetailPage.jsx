import { useParams } from 'react-router-dom';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useFetchData } from '../hooks/useFetchData';
import { serviceService } from '../services';

// Default services for fallback (same as EducationPage)
const defaultServices = [
  {
    slug: 'college-university-admissions',
    title: 'College & University Admissions',
    description: 'Secure admission to Canada\'s top institutions with personalized guidance on programs, applications, and enrollment.',
    longDescription: 'Navigate the Canadian higher education landscape with confidence. Our admissions experts provide end-to-end support for college and university applications, helping you identify the right programs, prepare compelling applications, and secure your place at top Canadian institutions.',
    benefits: [
      'Personalized program selection based on your goals',
      'Application review and optimization',
      'Essay and personal statement guidance',
      'Interview preparation support',
      'Deadline management and reminders',
      'Acceptance and enrollment assistance'
    ],
    category: 'education'
  },
  {
    slug: 'specialized-programs-challenged-students',
    title: 'Specialized Programs for Challenged Students',
    description: 'Inclusive support for students with learning challenges, special needs, and unique educational requirements.',
    longDescription: 'Every student deserves access to quality education. We specialize in connecting students with learning challenges, ADHD, dyslexia, and other unique needs with institutions that offer the right support systems and inclusive environments.',
    benefits: [
      'Assessment of learning support needs',
      'Matching with inclusive institutions',
      'IEP advocacy and coordination',
      'Accommodation request assistance',
      'Ongoing support coordination',
      'Family consultation and guidance'
    ],
    badge: 'Unique',
    category: 'education'
  },
  {
    slug: 'bridge-foundation-programs',
    title: 'Bridge & Foundation Programs',
    description: 'Prepare for success with bridge programs and foundation courses designed for international students.',
    longDescription: 'Bridge programs provide a crucial pathway for international students to transition smoothly into Canadian higher education. We help you identify and enroll in programs that build your academic foundation and language skills.',
    benefits: [
      'Program matching based on academic background',
      'Language proficiency preparation',
      'Academic skills development',
      'Cultural transition support',
      'Pathway planning to degree programs',
      'Credit transfer guidance'
    ],
    category: 'education'
  },
  {
    slug: 'scholarship-financial-aid-guidance',
    title: 'Scholarship & Financial Aid Guidance',
    description: 'Maximize your opportunities with tailored scholarship support and financial aid application assistance.',
    longDescription: 'Financing your education shouldn\'t be a barrier to your dreams. Our scholarship specialists help you identify, apply for, and secure financial aid opportunities tailored to your academic profile and circumstances.',
    benefits: [
      'Scholarship opportunity matching',
      'Application essay support',
      'Financial aid form assistance',
      'Deadline tracking and reminders',
      'Renewal and continuation guidance',
      'Budget planning consultation'
    ],
    category: 'education'
  },
  {
    slug: 'career-clarity-aptitude-testing',
    title: 'Career Clarity & Aptitude Testing',
    description: 'Discover the right program for your future with professional career guidance and aptitude assessments.',
    longDescription: 'Not sure which path to take? Our career clarity programs combine professional aptitude testing with personalized counseling to help you identify programs that align with your strengths, interests, and career goals.',
    benefits: [
      'Comprehensive aptitude assessment',
      'Personality and interest profiling',
      'Career path recommendations',
      'Program alignment analysis',
      'One-on-one counseling sessions',
      'Action plan development'
    ],
    category: 'education'
  },
  {
    slug: 'parent-advisory-services',
    title: 'Parent Advisory Services',
    description: 'Comprehensive guidance for families relocating with children, including school selection and educational planning.',
    longDescription: 'Moving to Canada with children? Our parent advisory services help families navigate the Canadian education system, from school selection to enrollment, ensuring your children have the best possible start in their new environment.',
    benefits: [
      'School district analysis and selection',
      'Enrollment process guidance',
      'Special education coordination',
      'Extracurricular planning',
      'Parent-teacher communication support',
      'Educational pathway planning'
    ],
    category: 'education'
  }
];

// Icon mapping for services
const serviceIcons = {
  'college-university-admissions': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  'specialized-programs-challenged-students': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  'bridge-foundation-programs': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  'scholarship-financial-aid-guidance': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'career-clarity-aptitude-testing': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  'parent-advisory-services': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const EducationServiceDetailPage = () => {
  const { slug } = useParams();
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [benefitsRef, isBenefitsVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  // Try to fetch from API first
  const { data: apiService, loading } = useFetchData(
    () => serviceService.getBySlug(slug).catch(() => null),
    [slug]
  );

  // Find service from defaults if not in API
  const service = apiService
    ? {
      slug: apiService.slug,
      title: apiService.title,
      description: apiService.description,
      longDescription: apiService.longDescription,
      benefits: apiService.benefits,
      image: apiService.image,
      badge: apiService.badge,
      category: apiService.category
    }
    : defaultServices.find(s => s.slug === slug);

  // Get icon for service
  const getServiceIcon = () => {
    if (service?.icon) return service.icon;
    return serviceIcons[slug] || serviceIcons['college-university-admissions'];
  };

  // Loading state
  if (loading) {
    return (
      <Section className="pt-20">
        <Container>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
          </div>
        </Container>
      </Section>
    );
  }

  // Not found state
  if (!service) {
    return (
      <Section className="pt-20">
        <Container>
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary-blue mb-4">
              Service Not Found
            </h1>
            <p className="text-text-muted mb-8">
              The education service you're looking for doesn't exist or has been removed.
            </p>
            <Button to="/education" variant="primary">
              Back to Education Services
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Section background="blue" className="pt-20">
        <Container>
          <div
            ref={heroRef}
            className="text-center"
            style={{
              // opacity: isHeroVisible ? 1 : 0,
              transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Category Label */}
            <span className="inline-block text-accent-gold font-medium mb-2 uppercase tracking-wide text-sm">
              {service.category ? service.category.toUpperCase() + ' SERVICES' : 'EDUCATION SERVICES'}
            </span>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Long Description */}
      {service.longDescription && (
        <Section>
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h2 className="text-2xl font-heading font-bold text-primary-blue mb-4">
                  About This Service
                </h2>
                <p className="text-text-dark leading-relaxed text-lg">
                  {service.longDescription}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <Section background="gray">
          <Container>
            <div ref={benefitsRef} className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
                  What We Offer
                </span>
                <h2 className="text-3xl font-heading font-bold text-primary-blue">
                  Key Benefits
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                    style={{
                      opacity: isBenefitsVisible ? 1 : 0,
                      transform: isBenefitsVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-secondary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-text-dark font-medium">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section>
        <Container>
          <div
            ref={ctaRef}
            className="bg-gradient-to-r from-primary-blue to-primary-red rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
            style={{
              opacity: isCtaVisible ? 1 : 0,
              transform: isCtaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative text-center">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Book a free consultation with our education experts and take the first step toward your Canadian education journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/assessment" variant="gold" size="lg" className="hover-lift">
                  Free Assessment
                </Button>
                <Button to="/contact" variant="secondary" size="lg" className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue hover-lift">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Services */}
      <Section background="gray">
        <Container>
          <div className="text-center mb-8">
            <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
              Explore More
            </span>
            <h2 className="text-3xl font-heading font-bold text-primary-blue">
              Other Education Services
            </h2>
          </div>

          <div className="text-center">
            <Button to="/education" variant="primary" className="hover-lift">
              View All Education Services
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default EducationServiceDetailPage;