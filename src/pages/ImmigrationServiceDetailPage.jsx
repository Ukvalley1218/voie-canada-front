import { useParams } from 'react-router-dom';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useFetchData } from '../hooks/useFetchData';
import { serviceService } from '../services';

// Default services for fallback (same as ImmigrationPage)
const defaultServices = [
  {
    slug: 'express-entry-skilled-worker-programs',
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
    category: 'immigration'
  },
  {
    slug: 'entrepreneur-startup-visa-programs',
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
    category: 'immigration'
  },
  {
    slug: 'provincial-nominee-programs-pnp',
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
    category: 'immigration'
  },
  {
    slug: 'francophone-immigration-pathways',
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
    category: 'immigration'
  },
  {
    slug: 'complex-case-handling',
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
    category: 'immigration'
  },
  {
    slug: 'post-arrival-settlement-services',
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
    category: 'immigration'
  }
];

// Icon mapping for services
const serviceIcons = {
  'express-entry-skilled-worker-programs': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'entrepreneur-startup-visa-programs': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'provincial-nominee-programs-pnp': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'francophone-immigration-pathways': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  'complex-case-handling': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'post-arrival-settlement-services': (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
};

const ImmigrationServiceDetailPage = () => {
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
    return serviceIcons[slug] || serviceIcons['express-entry-skilled-worker-programs'];
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
              The immigration service you're looking for doesn't exist or has been removed.
            </p>
            <Button to="/immigration" variant="primary">
              Back to Immigration Services
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
          
              transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Category Label */}
            <span className="inline-block text-accent-gold font-medium mb-2 uppercase tracking-wide text-sm">
              {service.category ? service.category.toUpperCase() + ' SERVICES' : 'IMMIGRATION SERVICES'}
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
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Get a free assessment to discover the best immigration pathway for your Canadian dream. Our experts are ready to help.
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
              Other Immigration Services
            </h2>
          </div>

          <div className="text-center">
            <Button to="/immigration" variant="primary" className="hover-lift">
              View All Immigration Services
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ImmigrationServiceDetailPage;