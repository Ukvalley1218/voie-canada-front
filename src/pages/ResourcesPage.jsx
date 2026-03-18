import { useState } from 'react';
import { useInView } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import BlogCard from '../components/common/BlogCard';

const ResourcesPage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [guidesRef, isGuidesVisible] = useInView({ threshold: 0.2 });
  const [blogRef, isBlogVisible] = useInView({ threshold: 0.2 });
  const [faqRef, isFaqVisible] = useInView({ threshold: 0.2 });
  const [newsletterRef, isNewsletterVisible] = useInView({ threshold: 0.2 });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const featuredGuides = [
    {
      title: 'Top 10 Canadian Universities for International Students',
      description: 'A comprehensive guide to the best universities in Canada for international students.',
      type: 'PDF Guide',
      pages: '15 pages'
    },
    {
      title: 'Express Entry Complete Guide 2026',
      description: 'Everything you need to know about Express Entry, from eligibility to application.',
      type: 'PDF Guide',
      pages: '20 pages'
    },
    {
      title: 'Scholarships for International Students',
      description: 'Discover scholarship opportunities and financial aid options for studying in Canada.',
      type: 'PDF Guide',
      pages: '12 pages'
    },
    {
      title: 'Inclusive Education Guide for Parents',
      description: 'Understanding special education options in Canadian schools.',
      type: 'PDF Guide',
      pages: '10 pages'
    },
  ];

  const blogPosts = [
    {
      title: 'Understanding Express Entry Draws in 2026',
      excerpt: 'Latest updates on Express Entry draws and what they mean for your application.',
      category: 'Immigration',
      date: '2026-03-15',
      author: 'John Smith',
      slug: 'express-entry-draws-2026'
    },
    {
      title: 'Top Scholarships for International Students in Canada',
      excerpt: 'Discover the best scholarship opportunities for international students.',
      category: 'Education',
      date: '2026-03-10',
      author: 'Sarah Johnson',
      slug: 'top-scholarships-canada'
    },
    {
      title: 'Schools Offering Learning Support in Canada',
      excerpt: 'A guide to Canadian institutions with excellent support services for students with learning challenges.',
      category: 'Education',
      date: '2026-03-05',
      author: 'Emily Williams',
      slug: 'schools-learning-support-canada'
    },
    {
      title: 'Provincial Nominee Program Updates',
      excerpt: 'Recent changes to PNP streams and how they affect your immigration strategy.',
      category: 'Immigration',
      date: '2026-03-01',
      author: 'Michael Chen',
      slug: 'pnp-updates-2026'
    },
    {
      title: 'Bridge Programs for International Students',
      excerpt: 'How bridge programs can help you transition to Canadian universities.',
      category: 'Education',
      date: '2026-02-25',
      author: 'Sarah Johnson',
      slug: 'bridge-programs-international-students'
    },
    {
      title: 'Settlement Tips for Newcomers',
      excerpt: 'Essential advice for your first months in Canada.',
      category: 'Settlement',
      date: '2026-02-20',
      author: 'John Smith',
      slug: 'settlement-tips-newcomers'
    },
  ];

  const faqs = [
    {
      category: 'Immigration',
      questions: [
        {
          q: 'How long does the Express Entry process take?',
          a: 'Express Entry applications are typically processed within 6 months. However, this can vary based on individual circumstances and current IRCC processing times.'
        },
        {
          q: 'What is the minimum CRS score required?',
          a: 'There is no fixed minimum score. CRS scores vary with each draw. Recent draws have seen scores between 450-500, but this changes frequently.'
        },
        {
          q: 'Can I apply for PR without a job offer?',
          a: 'Yes, many applicants receive PR without a job offer. A job offer can add points but is not mandatory for most programs.'
        },
      ]
    },
    {
      category: 'Education',
      questions: [
        {
          q: 'What support is available for students with learning disabilities?',
          a: 'Canadian universities offer various accommodations including extended exam times, note-taking services, assistive technology, and dedicated learning support centers.'
        },
        {
          q: 'Can international students work while studying?',
          a: 'Yes, international students can work up to 20 hours per week during academic sessions and full-time during scheduled breaks.'
        },
        {
          q: 'What is a study permit and how long does it take?',
          a: 'A study permit is required for international students. Processing times vary by country, typically ranging from 4-12 weeks.'
        },
      ]
    },
    {
      category: 'General',
      questions: [
        {
          q: 'What are your consultation fees?',
          a: 'We offer a free initial consultation to assess your case. Detailed pricing is provided based on your specific needs and the complexity of your case.'
        },
        {
          q: 'Do you provide services for complex cases?',
          a: 'Yes, we specialize in complex cases including refusals, appeals, and unique situations. Our team has extensive experience with challenging applications.'
        },
      ]
    },
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
            Resources
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Stay Informed
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore immigration updates, education trends, FAQs, and free guides for your Canadian journey.
          </p>
        </div>
      </Section>

      {/* Featured Guides */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Downloadable Guides
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Free Resource Guides
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Download our comprehensive guides to help navigate your immigration or education journey.
          </p>
        </div>

        <div ref={guidesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGuides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: isGuidesVisible ? 1 : 0,
                transform: isGuidesVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="h-32 bg-gradient-to-br from-primary-blue to-primary-red flex items-center justify-center relative overflow-hidden">
                <svg className="w-16 h-16 text-white/80 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {/* Download indicator on hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary-red bg-primary-red/10 px-2 py-1 rounded">
                    {guide.type}
                  </span>
                  <span className="text-xs text-text-muted">{guide.pages}</span>
                </div>
                <h4 className="font-heading font-semibold text-text-dark mb-2 group-hover:text-primary-blue transition-colors">
                  {guide.title}
                </h4>
                <p className="text-sm text-text-muted mb-4">{guide.description}</p>
                <button className="text-primary-blue font-medium text-sm hover:text-primary-red transition-colors inline-flex items-center group/btn">
                  Download Free
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              {/* Bottom accent */}
              <div className="h-1 w-0 bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* Blog Posts */}
      <Section background="gray">
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            Latest Articles
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            From Our Blog
          </h2>
        </div>

        <div ref={blogRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              style={{
                opacity: isBlogVisible ? 1 : 0,
                transform: isBlogVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                author={post.author}
                slug={post.slug}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button to="/resources/blog" variant="primary" className="hover-lift">
            View All Articles
          </Button>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <div className="text-center mb-12">
          <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
            FAQs
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-blue mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div ref={faqRef} className="max-w-3xl mx-auto space-y-8">
          {faqs.map((category, catIndex) => (
            <div
              key={catIndex}
              style={{
                opacity: isFaqVisible ? 1 : 0,
                transform: isFaqVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${catIndex * 0.1}s`
              }}
            >
              <h3 className="text-lg font-heading font-semibold text-primary-blue mb-4">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details
                    key={faqIndex}
                    className="bg-white rounded-xl shadow-card group overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-text-dark">{faq.q}</span>
                      <svg className="w-5 h-5 text-primary-blue transform group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-text-muted border-t border-gray-100">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-text-muted mb-4">Can't find what you're looking for?</p>
          <Button to="/contact" variant="secondary" className="hover-lift">
            Ask Us Directly
          </Button>
        </div>
      </Section>

      {/* Newsletter */}
      <Section background="blue">
        <div
          ref={newsletterRef}
          className="text-center max-w-xl mx-auto"
          style={{
            opacity: isNewsletterVisible ? 1 : 0,
            transform: isNewsletterVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter for the latest immigration updates, education news, and exclusive resources.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
            />
            <Button variant="gold" size="md" className="hover-lift">
              Subscribe
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
};

export default ResourcesPage;