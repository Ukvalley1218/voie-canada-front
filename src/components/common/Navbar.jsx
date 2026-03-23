import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import logo from '../../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    {
      to: '/immigration',
      label: 'Immigration',
      children: [
        { to: '/immigration/express-entry', label: 'Express Entry' },
        { to: '/immigration/startup-visa', label: 'Startup Visa' },
        { to: '/immigration/pnp', label: 'Provincial Nominee' },
        { to: '/immigration/francophone', label: 'Francophone' },
      ]
    },
    {
      to: '/education',
      label: 'Education',
      children: [
        { to: '/education/admissions', label: 'Admissions' },
        { to: '/education/specialized-programs', label: 'Specialized Programs' },
        { to: '/education/scholarships', label: 'Scholarships' },
      ]
    },
    { to: '/success-stories', label: 'Success Stories' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-lg py-3'
          : 'bg-white/95 py-4'
      }`}
    >
      {/* Animated border on scroll */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-blue via-primary-red to-accent-gold transition-all duration-300 ${isScrolled ? 'w-full' : 'w-0'}`} />

      <div className="mx-auto px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
             <img src={logo} alt="VOIE LOGO IMG"  className='w-auto h-12 '/>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.to)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.to}
                  className={`font-heading font-medium transition-all duration-300 relative group ${
                    isActiveLink(link.to)
                      ? 'text-primary-red'
                      : 'text-text-dark hover:text-primary-red'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-red transition-all duration-300 ${isActiveLink(link.to) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  {link.children && (
                    <svg className={`inline-block w-4 h-4 ml-1 transition-transform duration-300 ${activeDropdown === link.to ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown for children */}
                {link.children && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card-lg overflow-hidden transition-all duration-300 ${
                      activeDropdown === link.to
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="py-2">
                      {link.children.map((child, index) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2 text-text-dark hover:bg-primary-blue/5 hover:text-primary-red transition-colors relative overflow-hidden group/item"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          <span className="relative z-10">{child.label}</span>
                          <span className="absolute left-0 top-0 w-1 h-full bg-primary-red transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/assessment"
              className="px-4 py-2 text-primary-blue border-2 border-primary-blue rounded-lg font-heading font-medium transition-all duration-300 hover:bg-primary-blue hover:text-white hover:shadow-lg"
            >
              Free Assessment
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-primary-blue text-white rounded-lg font-heading font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden group"
            >
              <span className="relative z-10">Book Consultation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 relative w-10 h-10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-2">
              <span className={`absolute left-0 top-0 w-full h-0.5 bg-text-dark transition-all duration-300 ${isOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : ''}`} />
              <span className={`absolute left-0 top-1/2 w-full h-0.5 bg-text-dark transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-text-dark transition-all duration-300 ${isOpen ? '-rotate-45 bottom-1/2 translate-y-1/2' : ''}`} />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 pb-2 space-y-1 border-t border-gray-100">
            {navLinks.map((link, index) => (
              <div
                key={link.to}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`transform transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
              >
                <Link
                  to={link.to}
                  className={`block py-2 px-4 font-heading font-medium rounded-lg transition-colors ${
                    isActiveLink(link.to)
                      ? 'text-primary-red bg-primary-red/5'
                      : 'text-text-dark hover:text-primary-red hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block py-1 px-4 text-text-muted hover:text-primary-red transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={`py-4 space-y-3 transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <Link
              to="/assessment"
              className="block w-full px-4 py-3 text-center text-primary-blue border-2 border-primary-blue rounded-lg font-heading font-medium transition-all hover:bg-primary-blue hover:text-white"
            >
              Free Assessment
            </Link>
            <Link
              to="/contact"
              className="block w-full px-4 py-3 text-center bg-primary-blue text-white rounded-lg font-heading font-medium transition-all hover:bg-blue-700"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;