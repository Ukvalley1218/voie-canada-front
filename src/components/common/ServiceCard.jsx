import { Link } from 'react-router-dom';
import { useState } from 'react';

const ServiceCard = ({
  icon,
  title,
  description,
  link,
  badge,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const CardContent = () => (
    <div
      className={`card-base p-6 h-full flex flex-col group relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Badge */}
      {badge && (
        <span className="relative inline-block bg-accent-gold text-text-dark text-xs font-semibold px-3 py-1 rounded-full mb-4 transform transition-transform duration-300 group-hover:scale-105">
          {badge}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div className="relative w-14 h-14 bg-primary-blue/10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary-blue group-hover:scale-110 group-hover:rotate-3">
          <span className="text-primary-blue group-hover:text-white transition-colors duration-300">
            {icon}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="relative text-xl font-heading font-semibold text-primary-blue mb-3 transition-colors duration-300 group-hover:text-primary-red">
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-text-muted leading-relaxed flex-grow mb-4 line-clamp-3 group-hover:text-text-dark transition-colors duration-300">
        {description}
      </p>

      {/* Link Arrow */}
      {link && (
        <div className="relative flex items-center text-primary-blue font-medium group-hover:text-primary-red transition-colors duration-300">
          <span>Learn More</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}

      {/* Bottom border animation */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`}
      />
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default ServiceCard;