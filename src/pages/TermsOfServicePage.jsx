import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import api from '../services/api';
import { useState, useEffect } from 'react';

const TermsOfServicePage = () => {
  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });

  // Static default content for fallback
  const staticTermsContent = {
    title: 'Terms of Service',
    lastUpdated: new Date().toISOString(),
    sections: [
      {
        title: 'Acceptance of Terms',
        content: 'By accessing and using the Voie Canada website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and Voie Canada Immigration & Education Services. Your use of our services signifies your acceptance of these terms in their entirety.'
      },
      {
        title: 'Description of Services',
        content: 'Voie Canada provides immigration and education consultation services, including but not limited to: visa application assistance, immigration pathway guidance, educational institution placement, settlement services, and related advisory services. Our services are intended to provide professional guidance and support throughout your immigration or education journey in Canada.'
      },
      {
        title: 'Use of Services',
        content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for providing accurate and complete information when requested. You must not use our services to submit false or misleading information, attempt to circumvent any security measures, or engage in any activity that interferes with or disrupts our services. Misuse of our services may result in termination of your access without refund.'
      },
      {
        title: 'Client Obligations',
        content: 'As a client, you agree to provide truthful, accurate, and complete information for all applications and documents. You are responsible for timely submission of required documents and fees. You must inform us of any changes to your circumstances that may affect your application. You agree to follow all applicable laws and regulations of Canada and your country of residence. Failure to meet these obligations may impact the success of your application.'
      },
      {
        title: 'Intellectual Property',
        content: 'All content on this website, including text, graphics, logos, images, and software, is the property of Voie Canada or its content suppliers and is protected by Canadian and international copyright laws. You may not reproduce, modify, distribute, or create derivative works from our content without explicit written permission. Unauthorized use may result in legal action.'
      },
      {
        title: 'Limitation of Liability',
        content: 'Voie Canada provides services on an "as is" basis. While we strive to provide accurate information and professional services, we cannot guarantee specific outcomes for immigration or education applications. Final decisions rest with Canadian immigration authorities and educational institutions. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the fees paid for the specific service in question.'
      },
      {
        title: 'Fees and Payment',
        content: 'Our fees are outlined in your service agreement and are subject to change with reasonable notice. Payment terms and schedules will be specified in your individual service contract. Government fees and third-party costs are not included in our service fees unless explicitly stated. Refund policies are governed by the terms specified in your service agreement. Late payments may incur additional charges and may result in service suspension.'
      },
      {
        title: 'Confidentiality',
        content: 'We maintain strict confidentiality regarding all client information and communications. Your personal information is protected in accordance with our Privacy Policy and applicable Canadian privacy laws. We will not disclose your information to third parties without your consent, except as required by law or as necessary to provide our services (such as submitting applications to government authorities).'
      },
      {
        title: 'Termination',
        content: 'Either party may terminate the service agreement according to the terms specified in your contract. Upon termination, you remain responsible for payment of services rendered up to the termination date. We reserve the right to refuse service or terminate agreements for breach of these Terms, fraudulent activity, or abusive behavior. Any termination does not relieve you of obligations incurred prior to termination.'
      },
      {
        title: 'Governing Law',
        content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada. Any disputes arising from these terms or our services shall be resolved in the courts of Ontario. You agree to submit to the exclusive jurisdiction of these courts for any proceedings arising from or related to our services.'
      },
      {
        title: 'Changes to Terms',
        content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically. Significant changes will be communicated to existing clients via email or other appropriate means.'
      },
      {
        title: 'Contact Information',
        content: 'For questions about these Terms of Service, please contact us: Voie Canada Immigration & Education Services. Email: legal@voiecanada.com. Phone: +1 (416) 555-0123. Address: 123 Main Street, Suite 400, Toronto, Ontario, M5V 1A1, Canada. Our normal business hours are Monday to Friday, 9:00 AM to 5:00 PM EST.'
      }
    ]
  };

  const [apiContent, setApiContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermsOfService = async () => {
      try {
        const response = await api.get('/settings/legal/terms-of-service');
        if (response.data && response.data.sections && response.data.sections.length > 0) {
          setApiContent(response.data);
        }
      } catch (error) {
        console.error('Error fetching terms of service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTermsOfService();
  }, []);

  const displayContent = apiContent || staticTermsContent;

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
            {displayContent.title || 'Terms of Service'}
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

export default TermsOfServicePage;