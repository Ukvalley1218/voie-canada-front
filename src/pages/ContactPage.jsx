import { useState } from 'react';
import { useInView } from '../hooks/useScrollAnimation';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { inquiryService } from '../services';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    specificService: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [heroRef, isHeroVisible] = useInView({ threshold: 0.2 });
  const [formRef, isFormVisible] = useInView({ threshold: 0.2 });
  const [infoRef, isInfoVisible] = useInView({ threshold: 0.2 });
  const [mapRef, isMapVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, isCtaVisible] = useInView({ threshold: 0.2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await inquiryService.submit(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      country: 'Canada',
      city: 'Toronto',
      address: '123 Main Street, Suite 400',
      phone: '+1 (416) XXX-XXXX',
      email: 'toronto@voiecanada.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST'
    },
    {
      country: 'India',
      city: 'New Delhi',
      address: '456 Business Park, Floor 5',
      phone: '+91 XXX XXX XXXX',
      email: 'delhi@voiecanada.com',
      hours: 'Mon-Sat: 10:00 AM - 7:00 PM IST'
    },
  ];

  const serviceOptions = [
    { value: 'immigration', label: 'Immigration Services' },
    { value: 'education', label: 'Education Services' },
  ];

  const specificServices = {
    immigration: [
      'Express Entry',
      'Startup Visa',
      'Provincial Nominee Program',
      'Francophone Immigration',
      'Complex Cases / Appeals',
      'Settlement Services',
      'Other Immigration'
    ],
    education: [
      'College/University Admissions',
      'Specialized Programs',
      'Bridge Programs',
      'Scholarships',
      'Career Assessment',
      'Parent Advisory',
      'Other Education'
    ]
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'info@voiecanada.com',
      href: 'mailto:info@voiecanada.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: '+1 (XXX) XXX-XXXX',
      href: 'tel:+1XXXXXXXXXX'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.793.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      ),
      title: 'WhatsApp',
      value: 'Chat with us on WhatsApp',
      href: 'https://wa.me/1XXXXXXXXXX'
    }
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
            Contact Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to start your Canadian journey? Reach out for a free consultation.
          </p>
        </div>
      </Section>

      {/* Contact Form & Info */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div
            ref={formRef}
            style={{
              opacity: isFormVisible ? 1 : 0,
              transform: isFormVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h2 className="text-2xl font-heading font-bold text-primary-blue mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-secondary-green/10 rounded-xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-secondary-green/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-secondary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-text-dark mb-2">
                  Thank You!
                </h3>
                <p className="text-text-muted">
                  We've received your inquiry. Our team will contact you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all hover:border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all hover:border-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all hover:border-gray-300"
                      placeholder="+1 (XXX) XXX-XXXX"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all bg-white hover:border-gray-300"
                    >
                      <option value="">Select service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.serviceType && (
                  <div className="animate-fade-in-up">
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Specific Service
                    </label>
                    <select
                      name="specificService"
                      value={formData.specificService}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all bg-white hover:border-gray-300"
                    >
                      <option value="">Select specific service</option>
                      {specificServices[formData.serviceType]?.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="group">
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all resize-none hover:border-gray-300"
                    placeholder="Tell us about your situation and how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full hover-lift relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </span>
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            style={{
              opacity: isInfoVisible ? 1 : 0,
              transform: isInfoVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
            }}
          >
            <h2 className="text-2xl font-heading font-bold text-primary-blue mb-6">
              Contact Information
            </h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start group"
                  style={{
                    opacity: isInfoVisible ? 1 : 0,
                    transform: isInfoVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`
                  }}
                >
                  <div className="w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-primary-blue group-hover:scale-110">
                    <svg className="w-6 h-6 text-primary-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {info.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1 transition-colors group-hover:text-primary-blue">{info.title}</h4>
                    <span className="text-text-muted group-hover:text-primary-blue transition-colors">
                      {info.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Office Locations */}
            <h3 className="text-lg font-heading font-semibold text-primary-blue mb-4">
              Our Offices
            </h3>
            <div className="space-y-4">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-secondary-gray rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    opacity: isInfoVisible ? 1 : 0,
                    transform: isInfoVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.5 + index * 0.1}s`
                  }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2 transition-transform duration-300 group-hover:scale-110">
                      {office.country === 'Canada' ? '🇨🇦' : '🇮🇳'}
                    </span>
                    <h4 className="font-heading font-semibold text-text-dark group-hover:text-primary-blue transition-colors">
                      {office.city}, {office.country}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm text-text-muted">
                    <p className="flex items-center group-hover:text-text-dark transition-colors">
                      <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {office.address}
                    </p>
                    <p className="flex items-center group-hover:text-text-dark transition-colors">
                      <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {office.phone}
                    </p>
                    <p className="flex items-center group-hover:text-text-dark transition-colors">
                      <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {office.email}
                    </p>
                    <p className="flex items-center group-hover:text-text-dark transition-colors">
                      <svg className="w-4 h-4 mr-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {office.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section background="gray">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-primary-blue mb-2">
            Find Us
          </h2>
          <p className="text-text-muted">Visit our offices in Canada and India</p>
        </div>

        <div
          ref={mapRef}
          className="bg-white rounded-xl shadow-card overflow-hidden h-96"
          style={{
            opacity: isMapVisible ? 1 : 0,
            transform: isMapVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Placeholder for map - you would integrate Google Maps here */}
          <div className="w-full h-full bg-secondary-gray flex items-center justify-center group">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-text-muted group-hover:text-text-dark transition-colors">Map integration coming soon</p>
              <p className="text-sm text-text-muted mt-2 group-hover:text-text-dark transition-colors">Contact us for office locations and directions</p>
            </div>
          </div>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
            Book a free consultation with our experts and take the first step towards your Canadian dream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/assessment" variant="gold" size="lg" className="hover-lift">
              Free Assessment
            </Button>
            <Button to="https://wa.me/1XXXXXXXXXX" variant="secondary" size="lg" className="!bg-white/10 !border-white !text-white hover:!bg-white hover:!text-primary-blue hover-lift">
              WhatsApp Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;