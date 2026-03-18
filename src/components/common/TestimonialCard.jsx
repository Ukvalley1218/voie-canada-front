import { useState } from 'react';

const TestimonialCard = ({
  quote,
  name,
  role,
  company,
  photo,
  videoUrl,
  category,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabels = {
    professional: 'Professional',
    entrepreneur: 'Entrepreneur',
    student: 'Student',
    family: 'Family'
  };

  const categoryColors = {
    professional: 'bg-blue-100 text-blue-800',
    entrepreneur: 'bg-green-100 text-green-800',
    student: 'bg-purple-100 text-purple-800',
    family: 'bg-orange-100 text-orange-800'
  };

  return (
    <div
      className={`card-base p-6 lg:p-8 h-full flex flex-col relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-blue/5 to-transparent rounded-bl-full transition-transform duration-500 ${isHovered ? 'scale-150' : 'scale-100'}`} />

      {/* Quote Icon */}
      <div className="relative text-accent-gold/30 mb-4 transition-transform duration-300">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Quote */}
      <p className="relative text-text-dark text-lg leading-relaxed mb-6 flex-grow italic">
        "{quote}"
      </p>

      {/* Video Link */}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center text-primary-blue hover:text-primary-red transition-colors mb-4 group"
        >
          <div className="w-10 h-10 bg-primary-blue/10 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-primary-blue">
            <svg className="w-5 h-5 text-primary-blue group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-medium">Watch Video Testimonial</span>
        </a>
      )}

      {/* Author Info */}
      <div className="relative flex items-center">
        {photo ? (
          <div className="relative mr-4">
            <img
              src={photo}
              alt={name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-blue/20 transition-all duration-300 group-hover:ring-primary-blue"
            />
            {category && (
              <span className={`absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
                {categoryLabels[category]?.charAt(0)}
              </span>
            )}
          </div>
        ) : (
          <div className="relative mr-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-blue to-primary-red flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {name?.charAt(0)}
              </span>
            </div>
            {category && (
              <span className={`absolute -bottom-1 -right-1 text-xs px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
                {categoryLabels[category]?.charAt(0)}
              </span>
            )}
          </div>
        )}

        <div className="flex-grow">
          <h4 className="font-heading font-semibold text-text-dark transition-colors duration-300 hover:text-primary-blue">
            {name}
          </h4>
          {(role || company) && (
            <p className="text-text-muted text-sm">
              {role}{role && company && ', '}{company}
            </p>
          )}
          {category && (
            <span className={`inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded-full ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-blue via-primary-red to-accent-gold transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`} />
    </div>
  );
};

export default TestimonialCard;