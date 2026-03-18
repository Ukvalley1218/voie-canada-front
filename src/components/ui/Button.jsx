import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-blue text-white hover:bg-blue-700 focus:ring-primary-blue',
    secondary: 'bg-white text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue',
    accent: 'bg-primary-red text-white hover:bg-red-700 focus:ring-primary-red',
    gold: 'bg-accent-gold text-text-dark hover:bg-yellow-500 focus:ring-accent-gold',
    ghost: 'bg-transparent text-primary-blue hover:bg-gray-100 focus:ring-primary-blue',
    outline: 'bg-transparent text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? disabledStyles : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;