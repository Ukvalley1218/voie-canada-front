import { useInView } from '../../hooks/useScrollAnimation';
import Section from '../ui/Section';
import SectionHeader from '../ui/SectionHeader';
import TestimonialCard from '../common/TestimonialCard';
import Button from '../ui/Button';

const TestimonialsPreview = ({
  title = 'Success Stories',
  subtitle = 'Real Journeys. Real Success.',
  description = 'From visa approvals to inclusive education placements, we make every journey possible.',
  testimonials = [],
  background = 'gray'
}) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <Section background={background}>
      <SectionHeader
        subtitle={subtitle}
        title={title}
        description={description}
        centered={true}
      />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <div
            key={testimonial._id || index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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

      <div className="text-center mt-10">
        <Button to="/success-stories" variant="secondary" className="hover-lift">
          Read More Stories
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </div>
    </Section>
  );
};

export default TestimonialsPreview;