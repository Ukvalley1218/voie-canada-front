import { useParams, Link } from 'react-router-dom';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { useState, useEffect } from 'react';
import api from '../services/api';

// Default blog posts for fallback
const defaultBlogPosts = [
  {
    slug: 'express-entry-draws-2026',
    title: 'Understanding Express Entry Draws in 2026',
    excerpt: 'Latest updates on Express Entry draws and what they mean for your application.',
    content: `
      <h2>What is Express Entry?</h2>
      <p>Express Entry is Canada's flagship application management system for skilled workers. It manages applications for three federal economic immigration programs:</p>
      <ul>
        <li>Federal Skilled Worker Program</li>
        <li>Canadian Experience Class</li>
        <li>Federal Skilled Trades Program</li>
      </ul>

      <h2>Recent Draw Trends</h2>
      <p>In 2026, we've seen significant changes in Express Entry draws. The CRS scores have stabilized, and IRCC has introduced category-based draws targeting specific occupations and French-speaking candidates.</p>

      <h2>How to Improve Your CRS Score</h2>
      <p>There are several ways to improve your Comprehensive Ranking System (CRS) score:</p>
      <ul>
        <li>Improve language test scores (IELTS/CELPIP for English, TEF/TCF for French)</li>
        <li>Gain additional work experience</li>
        <li>Complete higher education credentials</li>
        <li>Obtain a provincial nomination (adds 600 points)</li>
        <li>Secure a valid job offer from a Canadian employer</li>
      </ul>

      <h2>Next Steps</h2>
      <p>If you're considering Express Entry as your immigration pathway, we recommend starting with a free assessment to evaluate your eligibility and identify areas for improvement.</p>
    `,
    category: 'Immigration',
    publishedAt: '2026-03-15',
    author: { name: 'John Smith', title: 'Immigration Consultant' }
  },
  {
    slug: 'top-scholarships-canada',
    title: 'Top Scholarships for International Students in Canada',
    excerpt: 'Discover the best scholarship opportunities for international students.',
    content: `
      <h2>Why Study in Canada?</h2>
      <p>Canada is one of the top destinations for international students, offering world-class education at globally ranked institutions. With over 800,000 international students, Canada provides a diverse and welcoming environment.</p>

      <h2>Major Scholarship Programs</h2>
      <p>There are numerous scholarship opportunities available for international students:</p>
      <ul>
        <li><strong>Vanier Canada Graduate Scholarships:</strong> $50,000 per year for doctoral students</li>
        <li><strong>Ontario Graduate Scholarship:</strong> Up to $15,000 for graduate students</li>
        <li><strong>University-specific scholarships:</strong> Most Canadian universities offer entrance scholarships</li>
        <li><strong>Government-funded programs:</strong> Various provincial and federal programs</li>
      </ul>

      <h2>Eligibility Requirements</h2>
      <p>Each scholarship has specific requirements, but common criteria include:</p>
      <ul>
        <li>Academic excellence (minimum GPA requirements)</li>
        <li>Language proficiency (IELTS/TOEFL scores)</li>
        <li>Leadership and community involvement</li>
        <li>Research potential (for graduate scholarships)</li>
      </ul>

      <h2>How to Apply</h2>
      <p>Start by researching scholarships that match your profile. Our education consultants can help you identify the best opportunities and guide you through the application process.</p>
    `,
    category: 'Education',
    publishedAt: '2026-03-10',
    author: { name: 'Sarah Johnson', title: 'Education Specialist' }
  },
  {
    slug: 'schools-learning-support-canada',
    title: 'Schools Offering Learning Support in Canada',
    excerpt: 'A guide to Canadian institutions with excellent support services for students with learning challenges.',
    content: `
      <h2>Inclusive Education in Canada</h2>
      <p>Canada is known for its inclusive education system. Many institutions offer specialized support for students with learning disabilities, ADHD, autism spectrum disorders, and other unique needs.</p>

      <h2>Types of Support Available</h2>
      <p>Canadian schools and universities provide various accommodations:</p>
      <ul>
        <li>Extended exam time</li>
        <li>Note-taking services</li>
        <li>Assistive technology</li>
        <li>Learning support centers</li>
        <li>Individualized education plans</li>
        <li>Counselling services</li>
      </ul>

      <h2>Top Institutions for Learning Support</h2>
      <p>Several Canadian institutions are known for exceptional support services:</p>
      <ul>
        <li>University of Toronto - Accessibility Services</li>
        <li>University of British Columbia - Centre for Accessibility</li>
        <li>McGill University - Office for Students with Disabilities</li>
        <li>York University - Student Accessibility Services</li>
      </ul>

      <h2>How We Can Help</h2>
      <p>Our education consultants specialize in finding the right fit for students with unique needs. We help families navigate the application process and connect with support services.</p>
    `,
    category: 'Education',
    publishedAt: '2026-03-05',
    author: { name: 'Emily Williams', title: 'Student Advisor' }
  },
  {
    slug: 'pnp-updates-2026',
    title: 'Provincial Nominee Program Updates',
    excerpt: 'Recent changes to PNP streams and how they affect your immigration strategy.',
    content: `
      <h2>What are Provincial Nominee Programs?</h2>
      <p>Provincial Nominee Programs (PNPs) allow Canadian provinces and territories to nominate individuals for permanent residency based on local labor market needs.</p>

      <h2>Recent Changes in 2026</h2>
      <p>Several provinces have updated their PNP streams:</p>
      <ul>
        <li>Ontario has introduced new tech-specific streams</li>
        <li>British Columbia has expanded healthcare worker pathways</li>
        <li>Alberta has simplified their Alberta Opportunity Stream</li>
        <li>Atlantic provinces have enhanced their Atlantic Immigration Program</li>
      </ul>

      <h2>How to Choose the Right Province</h2>
      <p>Consider these factors when selecting a province:</p>
      <ul>
        <li>Your occupation and in-demand jobs in the province</li>
        <li>Language requirements</li>
        <li>Processing times</li>
        <li>Job market and settlement opportunities</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Our immigration consultants can help you identify the best PNP stream for your profile and guide you through the application process.</p>
    `,
    category: 'Immigration',
    publishedAt: '2026-03-01',
    author: { name: 'Michael Chen', title: 'Immigration Consultant' }
  },
  {
    slug: 'settlement-tips-newcomers',
    title: 'Settlement Tips for Newcomers',
    excerpt: 'Essential advice for your first months in Canada.',
    content: `
      <h2>Your First Weeks in Canada</h2>
      <p>Arriving in Canada is just the beginning. Here's what you need to do in your first weeks:</p>
      <ul>
        <li>Apply for your Social Insurance Number (SIN)</li>
        <li>Open a Canadian bank account</li>
        <li>Apply for provincial health insurance</li>
        <li>Get a Canadian phone number</li>
        <li>Find temporary accommodation</li>
      </ul>

      <h2>Housing in Canada</h2>
      <p>Finding permanent housing can take time. Consider:</p>
      <ul>
        <li>Temporary furnished rentals while you search</li>
        <li>Rental websites and platforms</li>
        <li>Neighborhood research for schools, transit, amenities</li>
        <li>Understanding tenant rights in your province</li>
      </ul>

      <h2>Employment</h2>
      <p>Finding work in Canada may require:</p>
      <ul>
        <li>Canadian credential assessment</li>
        <li>Resume formatting for Canadian employers</li>
        <li>Networking and job search strategies</li>
        <li>Understanding workplace culture</li>
      </ul>

      <h2>Building Your New Life</h2>
      <p>Canada offers excellent quality of life. Take advantage of community centers, libraries, cultural events, and newcomer services to build your network.</p>
    `,
    category: 'Settlement',
    publishedAt: '2026-02-20',
    author: { name: 'John Smith', title: 'Immigration Consultant' }
  }
];

// Category colors for labels
const categoryColors = {
  'Immigration': 'bg-blue-100 text-blue-800',
  'Education': 'bg-purple-100 text-purple-800',
  'Settlement': 'bg-green-100 text-green-800',
  'General': 'bg-gray-100 text-gray-800'
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [contentRef, isContentVisible] = useInView({ threshold: 0.2 });
  const [relatedRef, isRelatedVisible] = useInView({ threshold: 0.2 });

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const response = await api.get(`/blog/${slug}`);
        console.log('Blog API response:', response);

        // Handle different response structures
        const blogData = response.data || response;

        if (blogData && (blogData.title || blogData._id)) {
          setBlog(blogData);
        } else {
          // API returned but no valid data, use fallback
          console.log('API returned no valid blog data, using fallback');
          const fallbackPost = defaultBlogPosts.find(post => post.slug === slug);
          if (fallbackPost) {
            setBlog(fallbackPost);
          }
        }
      } catch (error) {
        console.log('Blog not found in API, using fallback data:', error.message);
        // Find from default posts if API fails
        const fallbackPost = defaultBlogPosts.find(post => post.slug === slug);
        if (fallbackPost) {
          setBlog(fallbackPost);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Fetch related posts (same category)
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!blog?.category) return;

      try {
        const response = await api.get(`/blog?limit=3`);
        const posts = response.data || [];
        // Filter to same category, exclude current post
        const related = posts
          .filter(post => post.slug !== slug && post.category === blog.category)
          .slice(0, 2);
        setRelatedPosts(related);
      } catch (error) {
        // Use default related posts
        const related = defaultBlogPosts
          .filter(post => post.slug !== slug && post.category === blog?.category)
          .slice(0, 2);
        setRelatedPosts(related);
      }
    };

    if (blog) {
      fetchRelatedPosts();
    }
  }, [blog, slug]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  // Not found state - show placeholder with warning
  if (!blog) {
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
              Article Not Found
            </h1>
            <p className="text-text-muted mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button to="/resources" variant="primary">
              Back to Resources
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  // Extract blog data with proper field handling
  const blogTitle = blog.title || 'Blog Post';
  const blogCategory = blog.category || 'General';
  const blogExcerpt = blog.excerpt || '';
  // Ensure content is wrapped in paragraph if it's plain text (no HTML tags)
  const blogContent = blog.content
    ? (blog.content.includes('<') ? blog.content : `<p>${blog.content}</p>`)
    : '<p>Content not available.</p>';
  const blogImage = blog.featuredImage || null;
  const blogDate = blog.publishedAt || blog.createdAt || new Date().toISOString();
  const blogAuthor = blog.author?.name ? blog.author : { name: 'Voie Canada Team', title: 'Editorial Team' };

  // Debug: Log the content being rendered
  console.log('Blog content being rendered:', blogContent);
  console.log('Blog data:', blog);

  return (
    <>
      {/* Hero Section - Same style as Immigration Service Detail */}
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
              {blogCategory.toUpperCase()}
            </span>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              {blogTitle}
            </h1>

            {/* Date and Author */}
            <div className="flex items-center justify-center text-white/80 text-sm mt-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(blogDate)}
              </span>
              <span className="mx-3">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blogAuthor.name}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Section - White rounded card like Immigration Service Detail */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back to Resources Link */}
            <Link
              to="/resources"
              className="inline-flex items-center text-primary-blue hover:text-primary-red transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Resources
            </Link>

            {/* Featured Image */}
            {blogImage && (
              <div
                className="mb-8 rounded-2xl overflow-hidden shadow-card"
                style={{
                  opacity: isContentVisible ? 1 : 0,
                  transform: isContentVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <img
                  src={blogImage}
                  alt={blogTitle}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {blogExcerpt && (
              <div
                className="mb-8"
                style={{
                  opacity: isContentVisible ? 1 : 0,
                  transform: isContentVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
                }}
              >
                <p className="text-xl text-text-dark leading-relaxed font-medium border-l-4 border-primary-red pl-6">
                  {blogExcerpt}
                </p>
              </div>
            )}

            {/* Content Card - Same style as Immigration Service Detail "About This Service" card */}
            <div
              ref={contentRef}
              className="bg-white rounded-2xl p-8 shadow-card"
            >
              <h2 className="text-2xl font-heading font-bold text-primary-blue mb-6">
                Article
              </h2>

              {/* Blog Content - rendered as HTML */}
              <div
                className="blog-content"
                style={{ minHeight: '100px', color: '#1F2937', fontSize: '1.0625rem', lineHeight: '1.75' }}
                dangerouslySetInnerHTML={{ __html: blogContent }}
              />

              {/* Author Info */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-blue to-primary-red rounded-full flex items-center justify-center text-white font-heading font-bold text-xl">
                    {blogAuthor.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-text-dark">
                      {blogAuthor.name}
                    </p>
                    {blogAuthor.title && (
                      <p className="text-sm text-text-muted">
                        {blogAuthor.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Tag */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[blogCategory] || 'bg-accent-gold text-text-dark'}`}>
                  {blogCategory}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section background="gray">
          <Container>
            <div ref={relatedRef} className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block text-primary-red font-medium mb-2 uppercase tracking-wide text-sm">
                  Related Articles
                </span>
                <h2 className="text-2xl font-heading font-bold text-primary-blue">
                  Continue Reading
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post, index) => (
                  <div
                    key={post._id || post.slug || index}
                    className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                    style={{
                      opacity: isRelatedVisible ? 1 : 0,
                      transform: isRelatedVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                    }}
                  >
                    <Link to={`/resources/blog/${post.slug}`} className="block">
                      <div className="p-6">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${categoryColors[post.category] || 'bg-accent-gold text-text-dark'}`}>
                          {post.category}
                        </span>
                        <h3 className="text-lg font-heading font-semibold text-primary-blue mt-3 mb-2 hover:text-primary-red transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-text-muted text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section - Same style as Immigration Service Detail */}
      <Section>
        <Container>
          <div
            className="bg-gradient-to-r from-primary-blue to-primary-red rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden"
            style={{
              opacity: isRelatedVisible ? 1 : 0,
              transform: isRelatedVisible ? 'translateY(0)' : 'translateY(30px)',
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
                Need More Information?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Our experts are here to help you navigate your immigration and education journey. Get personalized guidance today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/assessment" variant="gold" size="lg" className="hover-lift">
                  Free Assessment
                </Button>
                <Button to="/contact" variant="secondary" size="lg" className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue hover-lift">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default BlogDetailPage;