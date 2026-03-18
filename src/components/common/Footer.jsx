import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const { settings, socialLinks, contact, certifications, footer } = useSettings();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/immigration', label: 'Immigration Services' },
    { to: '/education', label: 'Education Services' },
    { to: '/success-stories', label: 'Success Stories' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const immigrationServices = [
    { to: '/immigration/express-entry', label: 'Express Entry' },
    { to: '/immigration/startup-visa', label: 'Startup Visa' },
    { to: '/immigration/pnp', label: 'Provincial Nominee' },
    { to: '/immigration/francophone', label: 'Francophone Pathways' },
    { to: '/immigration/complex-cases', label: 'Complex Cases' },
    { to: '/immigration/settlement', label: 'Settlement Services' },
  ];

  const educationServices = [
    { to: '/education/admissions', label: 'College Admissions' },
    { to: '/education/specialized-programs', label: 'Specialized Programs' },
    { to: '/education/bridge-programs', label: 'Bridge Programs' },
    { to: '/education/scholarships', label: 'Scholarships' },
    { to: '/education/career-clarity', label: 'Career Clarity' },
    { to: '/education/parent-advisory', label: 'Parent Advisory' },
  ];

  // Use social links from settings or fallback to defaults
  const displaySocialLinks = socialLinks && Object.keys(socialLinks).length > 0
    ? [
        { href: socialLinks.facebook || 'https://facebook.com', label: 'Facebook', icon: 'facebook' },
        { href: socialLinks.instagram || 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
        { href: socialLinks.linkedin || 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
        { href: socialLinks.twitter || 'https://twitter.com', label: 'Twitter', icon: 'twitter' },
        { href: socialLinks.youtube || 'https://youtube.com', label: 'YouTube', icon: 'youtube' },
      ].filter(link => link.href)
    : [
        { href: 'https://facebook.com', label: 'Facebook', icon: 'facebook' },
        { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
        { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
        { href: 'https://twitter.com', label: 'Twitter', icon: 'twitter' },
        { href: 'https://youtube.com', label: 'YouTube', icon: 'youtube' },
      ];

  // Use certifications from settings or fallback to defaults
  const displayCertifications = certifications?.length > 0
    ? certifications
    : [
        { name: 'ICCRC', description: 'Immigration Consultants of Canada Regulatory Council' },
        { name: 'CAPIC', description: 'Canadian Association of Professional Immigration Consultants' },
      ];

  const getSocialIcon = (iconName) => {
    const icons = {
      facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
        </svg>
      ),
      instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      youtube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      )
    };
    return icons[iconName] || null;
  };

  return (
    <footer className="bg-primary-blue text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center mb-4 group">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-primary-blue font-heading font-bold text-xl">V</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-white">Voie</span>
                  <span className="font-heading font-bold text-xl text-accent-gold ml-1">Canada</span>
                </div>
              </Link>
              <p className="text-white/80 mb-4 leading-relaxed">
                {footer?.aboutText || 'Your trusted partner for Canadian immigration and education services. Helping professionals, entrepreneurs, and students achieve their Canadian dream.'}
              </p>
              {/* Trust Badges */}
              <div className="flex items-center space-x-4 mt-6">
                {displayCertifications.slice(0, 2).map((cert, index) => (
                  <div key={index} className="bg-white/10 px-3 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors cursor-default">
                    <span className="text-accent-gold font-semibold">{cert.name}</span> Certified
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-gold" />
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li
                    key={link.to}
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Link
                      to={link.to}
                      className="text-white/80 hover:text-white transition-colors relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immigration Services */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 relative inline-block">
                Immigration Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-gold" />
              </h4>
              <ul className="space-y-3">
                {immigrationServices.map((link, index) => (
                  <li
                    key={link.to}
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Link
                      to={link.to}
                      className="text-white/80 hover:text-white transition-colors relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education Services & Contact */}
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 relative inline-block">
                Education Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-gold" />
              </h4>
              <ul className="space-y-3 mb-6">
                {educationServices.slice(0, 4).map((link, index) => (
                  <li
                    key={link.to}
                    className="transform transition-all duration-300 hover:translate-x-2"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Link
                      to={link.to}
                      className="text-white/80 hover:text-white transition-colors relative group"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-gold group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <h4 className="font-heading font-semibold text-lg mb-4 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent-gold" />
              </h4>
              <div className="space-y-3 text-white/80">
                {contact?.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center group hover:text-white transition-colors">
                    <svg className="w-5 h-5 mr-3 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="relative z-10">{contact.email}</span>
                  </a>
                )}
                {contact?.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center group hover:text-white transition-colors">
                    <svg className="w-5 h-5 mr-3 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{contact.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Social Links & Copyright */}
      <div className="relative border-t border-white/10 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm text-center md:text-left">
              {footer?.copyrightText?.replace('{year}', currentYear) || `© ${currentYear} Voie Canada. All rights reserved.`}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {displaySocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-primary-blue transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;