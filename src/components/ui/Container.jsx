const Container = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={`max-w-7xl mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;