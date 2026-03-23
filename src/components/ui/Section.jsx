import Container from './Container';

const Section = ({
  children,
  className = '',
  id,
  background = 'white',
  as: Component = 'section'
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-secondary-gray',
    blue: 'bg-primary-blue text-white',
    gradient: 'gradient-hero text-white'
  };

  return (
    <Component
      id={id}
      className={`py-10 sm:py-12 lg:py-16 ${backgrounds[background]} ${className}`}
    >
      <Container>
        {children}
      </Container>
    </Component>
  );
};

export default Section;