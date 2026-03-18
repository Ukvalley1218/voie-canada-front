import { Link } from 'react-router-dom';
import { useState } from 'react';

const BlogCard = ({
  title,
  excerpt,
  image,
  slug,
  category,
  date,
  author,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categoryColors = {
    'Immigration': 'bg-blue-100 text-blue-800',
    'Education': 'bg-purple-100 text-purple-800',
    'Settlement': 'bg-green-100 text-green-800',
    'General': 'bg-gray-100 text-gray-800'
  };

  return (
    <Link
      to={`/resources/blog/${slug}`}
      className={`block h-full group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-base h-full flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-xl">
          {image ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
            </div>
          ) : (
            <div className="relative h-48 bg-gradient-to-br from-primary-blue to-primary-red flex items-center justify-center overflow-hidden">
              <span className="text-white text-5xl font-heading font-bold opacity-50 transform transition-transform duration-300 group-hover:scale-110">
                {title?.charAt(0)}
              </span>
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className={`absolute top-4 left-4 z-10 transform transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryColors[category] || 'bg-accent-gold text-text-dark'}`}>
                {category}
              </span>
            </div>
          )}

          {/* Read time indicator */}
          <div className={`absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-blue transform transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 min read
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Date & Author */}
          <div className="flex items-center text-sm text-text-muted mb-3">
            {date && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(date)}
              </span>
            )}
            {author && (
              <>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {author}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className={`text-lg font-heading font-semibold text-primary-blue mb-2 transition-colors duration-300 line-clamp-2 group-hover:text-primary-red`}>
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
              {excerpt}
            </p>
          )}

          {/* Read More */}
          <div className="flex items-center text-primary-blue font-medium group-hover:text-primary-red transition-colors duration-300">
            <span>Read More</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;