import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import BlogCard from '../components/common/BlogCard';
import api from '../services/api';

const ResourcesPage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [guidesRef, isGuidesVisible] = useInView({ threshold: 0.2 });
  const [blogRef, isBlogVisible] = useInView({ threshold: 0.2 });
  const [faqRef, isFaqVisible] = useInView({ threshold: 0.2 });
  const [newsletterRef, isNewsletterVisible] = useInView({ threshold: 0.2 });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Fetch blog posts from API
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  // Fetch FAQs from API
  const [apiFaqs, setApiFaqs] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);

  // Fetch Resources from API
  const [apiResources, setApiResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await api.get('/blog?limit=6');
        setBlogPosts(response.data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/settings/public');
        if (response.data?.faqs && response.data.faqs.length > 0) {
          setApiFaqs(response.data.faqs);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setFaqLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get('/resources?isActive=true');
        setApiResources(response.data || []);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setResourcesLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Static resources for fallback (used when API fails or returns no data)
  const staticResources = [
    {
      _id: 'static-1',
      title: 'Top 10 Canadian Universities for International Students',
      description: 'A comprehensive guide to the best universities in Canada for international students.',
      type: 'guide',
      category: 'education',
      pages: 15
    },
    {
      _id: 'static-2',
      title: 'Express Entry Complete Guide 2026',
      description: 'Everything you need to know about Express Entry, from eligibility to application.',
      type: 'guide',
      category: 'immigration',
      pages: 20
    },
    {
      _id: 'static-3',
      title: 'Scholarships for International Students',
      description: 'Discover scholarship opportunities and financial aid options for studying in Canada.',
      type: 'guide',
      category: 'education',
      pages: 12
    },
    {
      _id: 'static-4',
      title: 'Inclusive Education Guide for Parents',
      description: 'Understanding special education options in Canadian schools.',
      type: 'guide',
      category: 'education',
      pages: 10
    },
  ];

  // Type labels for display
  const typeLabels = {
    'guide': 'PDF Guide',
    'ebook': 'eBook',
    'checklist': 'Checklist',
    'template': 'Template',
    'other': 'Other'
  };

  // Use API resources if available, otherwise use static fallback
  const displayResources = apiResources && apiResources.length > 0
    ? apiResources.map(resource => ({
      _id: resource._id,
      title: resource.title || '',
      description: resource.description || '',
      type: resource.type || 'guide',
      category: resource.category || 'general',
      pages: resource.pages || null,
      fileUrl: resource.fileUrl || null,
      downloadCount: resource.downloadCount || 0
    }))
    : staticResources;

  // Static FAQs for fallback (used when API fails or returns no data)
  const staticFaqs = [
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

  // Merge API FAQs with static fallback and group by category
  const getDisplayFaqs = () => {
    // Use API FAQs if available, otherwise use static
    const faqsToUse = apiFaqs.length > 0 ? apiFaqs : staticFaqs;

    // If using API FAQs (flat array), group by category
    if (apiFaqs.length > 0) {
      const groupedFaqs = faqsToUse.reduce((acc, faq) => {
        const category = faq.category || 'General';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          q: faq.question,
          a: faq.answer
        });
        return acc;
      }, {});

      // Convert to the same format as staticFaqs
      return Object.entries(groupedFaqs).map(([category, questions]) => ({
        category,
        questions
      }));
    }

    // Return static FAQs (already in correct format)
    return faqsToUse;
  };

  const displayFaqs = getDisplayFaqs();

  // Handle resource download - forces PDF download with correct filename
  const handleDownload = async (resource) => {
    if (!resource.fileUrl) {
      alert('This resource is not available for download yet.');
      return;
    }

    // Create a clean filename from the resource title
    const fileName = resource.title
      ? `${resource.title.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '-')}.pdf`
      : 'resource.pdf';

    // Track the download (non-blocking)
    if (resource._id && !resource._id.startsWith('static-')) {
      api.post(`/resources/${resource._id}/download`).catch(err =>
        console.error('Error tracking download:', err)
      );
    }

    // Method 1: Try fetch + blob download (ensures PDF format)
    try {
      const response = await fetch(resource.fileUrl, { method: 'GET' });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.type = 'application/pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return;
      }
    } catch (error) {
      console.warn('Fetch download failed, trying direct download:', error);
    }

    // Method 2: Fallback - Direct link with download attribute
    // For Cloudinary URLs, use fl_attachment to force download
    let downloadUrl = resource.fileUrl;
    if (resource.fileUrl.includes('cloudinary.com')) {
      downloadUrl = resource.fileUrl.replace('/upload/', '/upload/fl_attachment/');
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          {displayResources.slice(0, 4).map((resource, index) => (
            <div
              key={resource._id || index}
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
                    {typeLabels[resource.type] || resource.type || 'Guide'}
                  </span>
                  {resource.pages && (
                    <span className="text-xs text-text-muted">{resource.pages} pages</span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-text-dark mb-2 group-hover:text-primary-blue transition-colors">
                  {resource.title}
                </h4>
                <p className="text-sm text-text-muted mb-4">{resource.description}</p>
                <button
                  onClick={() => handleDownload(resource)}
                  disabled={!resource.fileUrl}
                  className={`font-medium text-sm inline-flex items-center group/btn ${resource.fileUrl
                    ? 'text-primary-blue hover:text-primary-red cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                    } transition-colors`}
                >
                  {resource.fileUrl ? 'Download Free' : 'Coming Soon'}
                  {resource.fileUrl && (
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
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
          {blogLoading ? (
            <div className="col-span-full flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="col-span-full text-center text-text-muted py-12">
              No blog posts available at the moment.
            </div>
          ) : (
            blogPosts.map((post, index) => (
              <div
                key={post._id || index}
                style={{
                  opacity: isBlogVisible ? 1 : 0,
                  transform: isBlogVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.featuredImage}
                  category={post.category}
                  date={post.publishedAt || post.createdAt}
                  author={post.author?.name || post.author}
                  slug={post.slug}
                />
              </div>
            ))
          )}
        </div>

        {/* <div className="text-center mt-8">
          <Button to="/resources/blog" variant="primary" className="hover-lift">
            View All Articles
          </Button>
        </div> */}
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
          {displayFaqs.map((category, catIndex) => (
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


      </Section>


    </>
  );
};

export default ResourcesPage;