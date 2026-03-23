import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SectionLayout from '../components/common/SectionLayout';

const AboutPage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [valuesRef, isValuesVisible] = useInView({ threshold: 0.2 });
  const [teamRef, isTeamVisible] = useInView({ threshold: 0.2 });
  const [certRef, isCertVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  const teamMembers = [
    {
      name: 'John Smith',
      title: 'Founder & Lead Consultant',
      bio: '15+ years of experience in Canadian immigration law and consultancy.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sarah Johnson',
      title: 'Education Specialist',
      bio: 'Expert in Canadian university admissions and inclusive education pathways.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Michael Chen',
      title: 'Immigration Consultant',
      bio: 'RCIC certified with expertise in Express Entry and Provincial Nominee Programs.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Emily Williams',
      title: 'Student Advisor',
      bio: 'Specializes in supporting students with learning challenges and unique needs.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80'
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in all our dealings.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Inclusivity',
      description: 'We believe everyone deserves a fair chance at their Canadian dream.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We continuously adapt to provide the best solutions for our clients.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Compassion',
      description: 'We treat every client\'s journey as if it were our own.'
    },
  ];

  const certifications = [
    { name: 'ICCRC', description: 'Immigration Consultants of Canada Regulatory Council' },
    { name: 'CAPIC', description: 'Canadian Association of Professional Immigration Consultants' },
    { name: 'CSIC', description: 'Canadian Society of Immigration Consultants' },
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
          <span className="inline-block text-accent-gold font-medium mb-2 uppercase tracking-wide text-sm animate-fade-in-down">
            About Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Who We Are
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Voie Canada is a trusted immigration and education consultancy dedicated to helping
            professionals, entrepreneurs, and students achieve success in Canada.
          </p>
        </div>
      </Section>

      {/* Story */}
      <SectionLayout
        subtitle="Our Story"
        title="Building Bridges to Canadian Dreams"
        description="Founded with a vision to make Canadian immigration and education accessible to everyone, Voie Canada has grown from a small consultancy to a trusted partner for hundreds of families and students. Our journey began when we recognized the unique challenges faced by individuals with diverse backgrounds and learning needs."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        imageAlt="Voie Canada team collaboration"
        reverse={false}
        cta={{
          primary: { label: 'Meet Our Team', to: '#team', variant: 'primary' }
        }}
      />

      {/* Mission & Vision */}
      <Section background="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            style={{
              opacity: isValuesVisible ? 1 : 0,
              transform: isValuesVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
            }}
          >
            <div className="w-14 h-14 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110 hover:bg-primary-blue/20">
              <svg className="w-7 h-7 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary-blue mb-4">Our Mission</h3>
            <p className="text-text-muted leading-relaxed">
              To provide personalized, transparent, and inclusive pathways for immigration and education,
              ensuring every client receives expert guidance tailored to their unique circumstances and goals.
            </p>
          </div>

          <div
            className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            style={{
              opacity: isValuesVisible ? 1 : 0,
              transform: isValuesVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110 hover:bg-primary-red/20">
              <svg className="w-7 h-7 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary-blue mb-4">Our Vision</h3>
            <p className="text-text-muted leading-relaxed">
              To be the most trusted partner for families and professionals seeking opportunities in Canada,
              known for our expertise, integrity, and commitment to inclusive education and immigration services.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Values
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            What Guides Us
          </h2>
        </div>

        <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-card text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group"
              style={{
                opacity: isValuesVisible ? 1 : 0,
                transform: isValuesVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-blue transition-all duration-300 group-hover:bg-primary-blue group-hover:text-white group-hover:scale-110">
                {value.icon}
              </div>
              <h4 className="text-lg font-heading font-semibold text-primary-blue mb-2 transition-colors duration-300 group-hover:text-primary-red">
                {value.title}
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section background="gray" id="team">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Our Team
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Meet Our Experts
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Our dedicated team of certified consultants and education specialists are here to guide you every step of the way.
          </p>
        </div>

        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300"
              style={{
                opacity: isTeamVisible ? 1 : 0,
                transform: isTeamVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/60 via-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm">{member.bio}</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-heading font-semibold text-primary-blue mb-1 transition-colors duration-300 group-hover:text-primary-red">
                  {member.name}
                </h4>
                <p className="text-primary-red text-sm font-medium mb-2">{member.title}</p>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Certifications & Affiliations
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Licensed & Accredited
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            We are proud members of recognized professional bodies ensuring the highest standards of service.
          </p>
        </div>

        <div ref={certRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-secondary-gray p-8 rounded-xl text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 group"
              style={{
                opacity: isCertVisible ? 1 : 0,
                transform: isCertVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
              }}
            >
              <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-white font-heading font-bold text-lg">{cert.name}</span>
              </div>
              <h4 className="font-heading font-semibold text-text-dark mb-2 transition-colors duration-300 group-hover:text-primary-blue">{cert.name}</h4>
              <p className="text-text-muted text-sm">{cert.description}</p>
            </div>
          ))}
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
            Let our experienced team guide you through your Canadian immigration or education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="gold" size="lg" className="hover-lift">
              Book Consultation
            </Button>
            <Button to="/assessment" variant="secondary" size="lg" className="!bg-white/10 !border-black !text-black hover:!bg-white hover:!text-primary-blue hover-lift">
              Free Assessment
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;