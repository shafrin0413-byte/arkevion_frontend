export default function PageHeroBanner({ children, className = '', style = {} }) {
  return (
    <section
      className={`page-hero-banner relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
