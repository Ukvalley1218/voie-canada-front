import { useState } from 'react';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import TestimonialCard from '../components/common/TestimonialCard';

const SuccessStoriesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [featuredRef, isFeaturedVisible] = useInView({ threshold: 0.2 });
  const [videoRef, isVideoVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'professional', label: 'Professionals' },
    { id: 'entrepreneur', label: 'Entrepreneurs' },
    { id: 'student', label: 'Students' },
    { id: 'family', label: 'Families' },
  ];

  const stories = [
    {
      quote: 'From visa refusal to successful PR in 8 months. Voie Canada\'s expertise in handling complex cases was remarkable. They identified the issues with my previous application and guided me through every step.',
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      company: 'Toronto, Canada',
      category: 'professional',
      journey: 'From Refusal to Approval'
    },
    {
      quote: 'As a student with dyslexia, I thought studying abroad was impossible. Voie Canada found the perfect university with learning support. I\'m now thriving in my computer science program!',
      name: 'Ananya Patel',
      role: 'Student',
      company: 'University of British Columbia',
      category: 'student',
      journey: 'Inclusive Education Success'
    },
    {
      quote: 'Their startup visa guidance was exceptional. From business plan to PR, they supported us at every step. We\'re now running a successful tech company in Vancouver.',
      name: 'Mohammed & Sarah Ahmed',
      role: 'Entrepreneurs',
      company: 'Tech Startup, Vancouver',
      category: 'entrepreneur',
      journey: 'Business Immigration Success'
    },
    {
      quote: 'Moving our family of four was overwhelming. Voie Canada handled everything - from our Express Entry application to finding schools for our children. They made Canada feel like home.',
      name: 'The Johnson Family',
      role: 'Family',
      company: 'Calgary, Canada',
      category: 'family',
      journey: 'Family Settlement'
    },
    {
      quote: 'The PNP process seemed complicated, but Voie Canada made it simple. They helped me navigate the Ontario Immigrant Nominee Program and I received my nomination within months.',
      name: 'Priya Sharma',
      role: 'Data Analyst',
      company: 'Toronto, Canada',
      category: 'professional',
      journey: 'PNP Success'
    },
    {
      quote: 'My son has autism, and we were worried about his education in a new country. Voie Canada connected us with schools that offer excellent special needs programs. He\'s thriving now!',
      name: 'David & Maria Rodriguez',
      role: 'Parents',
      company: 'Montreal, Canada',
      category: 'family',
      journey: 'Special Needs Education'
    },
  ];

  const filteredStories = activeFilter === 'all'
    ? stories
    : stories.filter(story => story.category === activeFilter);

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
            Success Stories
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Real Journeys. Real Success.
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover how we've helped families, professionals, and students achieve their Canadian dream.
          </p>
        </div>
      </Section>

      {/* Filter */}
      <Section>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-heading font-medium transition-all duration-300 hover:scale-105 ${
                activeFilter === category.id
                  ? 'bg-primary-blue text-white shadow-lg'
                  : 'bg-secondary-gray text-text-dark hover:bg-primary-blue/10'
              }`}
              style={{
                opacity: isHeroVisible ? 1 : 0,
                transform: isHeroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.05}s`
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <div
              key={index}
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <TestimonialCard
                quote={story.quote}
                name={story.name}
                role={story.role}
                company={story.company}
                category={story.category}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Story */}
      <Section background="gray">
        <div
          ref={featuredRef}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-card overflow-hidden relative group"
          style={{
            opacity: isFeaturedVisible ? 1 : 0,
            transform: isFeaturedVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-blue/5 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-150" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
                Featured Journey
              </span>
              <h2 className="text-3xl font-heading font-bold text-primary-blue mb-4">
                From Refusal to Approval: A Client's Story
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                When Rajesh came to us, his Express Entry application had been refused twice. Other consultants had given up on his case. Our team identified critical issues in his previous applications, developed a comprehensive strategy, and guided him through every step.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '8', label: 'Months to PR' },
                  { value: '2', label: 'Previous Refusals' },
                  { value: '100%', label: 'Success Rate' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-secondary-gray rounded-xl p-4 transition-all duration-300 hover:bg-primary-blue hover:text-white group/stat"
                    style={{
                      opacity: isFeaturedVisible ? 1 : 0,
                      transform: isFeaturedVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`
                    }}
                  >
                    <div className="text-2xl font-heading font-bold text-primary-blue group-hover/stat:text-white transition-colors">{stat.value}</div>
                    <div className="text-sm text-text-muted group-hover/stat:text-white/80 transition-colors">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://theforage.wpengine.com/wp-content/uploads/2024/03/client-services-e1709741837781.jpg"
                alt="Success story"
                className="w-full h-80 object-fit rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary-blue text-white p-4 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                <div className="text-sm font-medium">Journey</div>
                <div className="text-lg font-heading font-bold">India → Canada</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Video Testimonials */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Video Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Hear From Our Clients
          </h2>
        </div>

        <div ref={videoRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-card group cursor-pointer"
              style={{
                opacity: isVideoVisible ? 1 : 0,
                transform: isVideoVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-blue to-primary-red" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                    <svg className="w-8 h-8 text-primary-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-heading font-semibold text-text-dark group-hover:text-primary-blue transition-colors">Client Testimonial {index + 1}</h4>
                <p className="text-sm text-text-muted">Watch their journey to Canada</p>
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
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
            Start Your Success Story Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of families and individuals who have achieved their Canadian dream with Voie Canada.
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
      </Section>
    </>
  );
};

export default SuccessStoriesPage;