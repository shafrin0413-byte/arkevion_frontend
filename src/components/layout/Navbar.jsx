import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services', path: '/services',
    children: [
      { label: 'Web Development', path: '/services/web' },
      { label: 'Full Stack', path: '/services/fullstack' },
      { label: 'UI/UX Design', path: '/services/uiux' },
      { label: 'Digital Marketing', path: '/services/digital' },
      { label: 'AI Automation', path: '/services/ai' },
      { label: 'Software Solutions', path: '/services/software' },
    ],
  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Internship', path: '/internship' },
  { label: 'Contact', path: '/contact' },
];

function MagneticWrapper({ children, className = '', to }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.2;
    const y = (e.clientY - r.top  - r.height / 2) * 0.2;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = 'translate(0, 0)';
  };
  return (
    <Link ref={ref} to={to} className={className}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdown(null);
  }, [location]);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/50' 
          : 'bg-transparent'
      }`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100/50">
        <m.div
          className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100)}%` }}
        />
      </div>

      <div className="container-pad">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src="/ARkevion_logo.png" alt="Arkevion" className="h-16 w-auto relative z-10" />
              <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.children ? (
                  <button
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                    className={`nav-link flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname.startsWith(link.path)
                        ? 'text-teal-600 bg-teal-50/80'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={13} className={`transition-transform duration-300 ${dropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`nav-link px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'text-teal-600 bg-teal-50/80'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {dropdown === link.label && (
                      <m.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onMouseEnter={() => setDropdown(link.label)}
                        onMouseLeave={() => setDropdown(null)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] z-50"
                      >
                        <div className="glass-card p-2">
                          <div className="px-3 pt-2 pb-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500 mb-2">
                              Our Services
                            </p>
                            <div className="space-y-0.5">
                              {link.children.map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50/80 transition-all duration-150"
                                >
                                  <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100/50 group-hover:bg-teal-500 group-hover:border-teal-500 flex items-center justify-center shrink-0 transition-all duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 group-hover:bg-white transition-colors duration-200" />
                                  </span>
                                  <span className="text-xs font-semibold text-gray-700 group-hover:text-teal-600 transition-colors duration-200">
                                    {child.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="mx-2 mb-1.5 mt-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 p-3.5 flex items-center justify-between group cursor-pointer">
                            <div>
                              <p className="text-xs font-bold text-white leading-tight">Explore All Services</p>
                              <p className="text-[10px] text-teal-100/80 mt-0.5">View complete offerings</p>
                            </div>
                            <Link
                              to={link.path}
                              className="text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all whitespace-nowrap flex items-center gap-1"
                            >
                              View All <ArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticWrapper to="/contact" className="btn-premium text-sm py-2.5 px-5">
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </MagneticWrapper>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <m.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="absolute top-0 left-0 w-full h-[2px] bg-current rounded-full origin-center"
              />
              <m.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="absolute top-[9px] left-0 w-full h-[2px] bg-current rounded-full"
              />
              <m.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-current rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden shadow-2xl shadow-black/5"
          >
            <div className="container-pad py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className="text-gray-400" />}
                  </Link>
                  {link.children && (
                    <div className="pl-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 ml-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-teal-600 hover:bg-teal-50/50 transition-all"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link to="/contact" className="btn-premium justify-center text-sm w-full" onClick={() => setMenuOpen(false)}>
                  Get Started
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
}
