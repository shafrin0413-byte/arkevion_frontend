import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Why Us', to: '/why-us' },
  { label: 'Internship', to: '/internship' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Our Clients',  to: '/clients' },
  { label: 'Contact', to: '/contact' },
];

const configuredInternshipUrl = process.env.REACT_APP_INTERNSHIP_URL?.replace(/\/$/, '');
const internshipBaseUrl = configuredInternshipUrl || (
  typeof window !== 'undefined' && window.location.port && window.location.port !== '8000'
    ? 'http://127.0.0.1:8000'
    : ''
);

const internshipLinks = [
  { label: 'Student', href: `${internshipBaseUrl}/internships/student/login/` },
  { label: 'Admin', href: `${internshipBaseUrl}/internships/admin/login/` },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [portalDropdownPinned, setPortalDropdownPinned] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);
  const portalDropdownRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPortalDropdownOpen(false);
    setPortalDropdownPinned(false);
    setMobilePortalOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (portalDropdownRef.current?.contains(event.target)) return;
      setPortalDropdownOpen(false);
      setPortalDropdownPinned(false);
    };

    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const togglePortalDropdown = () => {
    setPortalDropdownPinned((pinned) => {
      const nextPinned = !pinned;
      setPortalDropdownOpen(nextPinned);
      return nextPinned;
    });
  };

  return (
    <header className={`sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container-pad">
        <div className="flex h-20 items-center justify-between sm:h-[72px] lg:h-20">
          <Link to="/" className="flex shrink-0 items-center">
            <img src="/Arkevion_logo.png" alt="Arkevion Technology" className="h-24 w-auto object-contain sm:h-16 lg:h-20" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            {links.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition xl:px-3 xl:text-sm ${active ? 'bg-teal-50 font-semibold text-teal-primary' : 'font-medium text-gray-500 hover:bg-gray-50 hover:text-teal-primary'}`}
                >
                  {link.label}
                  <m.span
                    initial={{ scaleX: active ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-teal-primary"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <div
              ref={portalDropdownRef}
              className="relative"
              onMouseEnter={() => setPortalDropdownOpen(true)}
              onMouseLeave={() => {
                if (!portalDropdownPinned) setPortalDropdownOpen(false);
              }}
            >
              <button
                type="button"
                onClick={togglePortalDropdown}
                className="inline-flex items-center gap-1 rounded-full border border-teal-100 bg-white px-3 py-2 text-[13px] font-semibold text-teal-700 transition hover:bg-teal-50 xl:text-sm"
                aria-expanded={portalDropdownOpen}
                aria-haspopup="true"
              >
                Login
                <ChevronDown size={14} className={`transition-transform duration-200 ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {portalDropdownOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 2, scale: 0.98 }}
                    animate={{ opacity: 1, y: 8, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%-2px)] z-50 min-w-40 rounded-2xl border border-teal-50 bg-white p-2 shadow-2xl shadow-teal-950/10"
                  >
                    {internshipLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setPortalDropdownOpen(false);
                          setPortalDropdownPinned(false);
                        }}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-teal-50 hover:text-teal-primary"
                      >
                        {item.label}
                      </a>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-primary px-3.5 py-2 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90 active:scale-95 xl:px-4 xl:text-sm">
              Get in Touch <ArrowRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-100 bg-white text-teal-700 shadow-[0_10px_28px_rgba(13,148,136,0.16)] transition hover:border-teal-200 hover:bg-teal-50 active:scale-95 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <m.button
              type="button"
              aria-label="Close navigation"
              className="fixed inset-0 top-20 z-40 bg-teal-950/10 backdrop-blur-sm sm:top-[72px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={() => setOpen(false)}
            />
            <m.div
              className="absolute left-0 right-0 top-full z-50 overflow-hidden border-t border-teal-50 bg-white shadow-2xl shadow-teal-950/10 lg:hidden"
              initial={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'opacity, transform, clip-path' }}
            >
              <div className="container-pad py-4">
                <div className="rounded-2xl border border-teal-50 bg-white p-2 shadow-sm">
                <div className="flex flex-col gap-1">
                  {links.map((link) => {
                    const active = pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition active:scale-[0.99] ${active ? 'bg-teal-50 font-semibold text-teal-primary shadow-inner' : 'font-medium text-gray-600 hover:bg-[#EFF9FB] hover:text-teal-primary'}`}
                      >
                        {link.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-teal-primary" />}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-3 border-t border-gray-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setMobilePortalOpen((value) => !value)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-teal-700 transition hover:bg-[#EFF9FB]"
                    aria-expanded={mobilePortalOpen}
                  >
                    Login
                    <ChevronDown size={15} className={`transition-transform duration-200 ${mobilePortalOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobilePortalOpen && (
                    <div className="mt-1 grid gap-1 pl-3">
                      {internshipLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#EFF9FB] hover:text-teal-primary"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/contact" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-teal-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition active:scale-[0.99]">
                  Get in Touch <ArrowRight size={14} />
                </Link>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
