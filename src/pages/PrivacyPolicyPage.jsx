import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import api from '../services/api';
import { useState, useEffect } from 'react';

const PrivacyPolicyPage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });

  // Static default content for fallback
  const staticPrivacyContent = {
    title: 'Privacy Policy',
    lastUpdated: new Date().toISOString(),
    sections: [
      {
        title: 'Information We Collect',
        content: 'We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or use our services. This may include your name, email address, phone number, immigration status, educational background, and any other information you choose to provide. We also automatically collect certain information when you visit our website, including your IP address, browser type, device information, and pages visited.'
      },
      {
        title: 'How We Use Your Information',
        content: 'We use the information we collect to provide, maintain, and improve our services; process your immigration or education applications; communicate with you about your inquiries and applications; send you updates about our services and relevant immigration news; and comply with legal obligations. We do not sell, rent, or share your personal information with third parties for their marketing purposes without your explicit consent.'
      },
      {
        title: 'Data Security',
        content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, secure server infrastructure, regular security assessments, and staff training on data protection practices. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'
      },
      {
        title: 'Third Party Services',
        content: 'We may use third-party services for website analytics, email communications, and cloud storage. These service providers have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose. We ensure that our third-party partners maintain appropriate security practices and comply with applicable data protection regulations.'
      },
      {
        title: 'Cookies and Tracking Technologies',
        content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly, while analytics cookies help us improve our services. You may choose to disable non-essential cookies without affecting core website functionality.'
      },
      {
        title: 'Your Rights',
        content: 'You have the right to access, correct, or delete your personal information. You may also request a copy of your data, object to our processing of your information, or withdraw your consent at any time. To exercise these rights, please contact us using the information provided below. We will respond to your request within 30 days in accordance with applicable data protection laws.'
      },
      {
        title: 'Data Retention',
        content: 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. For immigration and education consultation records, we typically retain information for 7 years after your case is closed, in accordance with professional standards and regulatory requirements.'
      },
      {
        title: 'International Data Transfers',
        content: 'Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your data internationally, we take appropriate safeguards to ensure your information remains protected in accordance with applicable privacy laws and regulations.'
      },
      {
        title: 'Contact Information',
        content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at: Voie Canada Immigration & Education Services. Email: privacy@voiecanada.com. Phone: +1 (416) 555-0123. Address: 123 Main Street, Suite 400, Toronto, Ontario, M5V 1A1, Canada.'
      }
    ]
  };

  const [apiContent, setApiContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await api.get('/settings/legal/privacy-policy');
        if (response.data && response.data.sections && response.data.sections.length > 0) {
          setApiContent(response.data);
        }
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacyPolicy();
  }, []);

  const displayContent = apiContent || staticPrivacyContent;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
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
            Legal
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            {displayContent.title || 'Privacy Policy'}
          </h1>
          {displayContent.lastUpdated && (
            <p className="text-white/70 text-sm">
              Last Updated: {formatDate(displayContent.lastUpdated)}
            </p>
          )}
        </div>
      </Section>

      {/* Content Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              </div>
            ) : (
              <div className="space-y-8">
                {displayContent.sections && displayContent.sections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-card p-6 lg:p-8"
                    style={{
                      opacity: 1,
                      transform: 'translateY(0)',
                      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                    }}
                  >
                    <h2 className="text-xl font-heading font-semibold text-primary-blue mb-4">
                      {section.title}
                    </h2>
                    <p className="text-text-muted leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default PrivacyPolicyPage;