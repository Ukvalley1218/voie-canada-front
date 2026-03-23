const Container = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;