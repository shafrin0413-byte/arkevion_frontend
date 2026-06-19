import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container-pad">
        <div className="flex h-16 items-center justify-between sm:h-[72px] lg:h-20">
          <Link to="/" className="flex shrink-0 items-center">
            <img src="/Arkevion_logo.png" alt="Arkevion Technology" className="h-12 w-auto object-contain sm:h-14 lg:h-16" />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group relative rounded-full px-3 py-2 text-sm transition ${active ? 'bg-teal-50 font-semibold text-teal-primary' : 'font-medium text-gray-500 hover:bg-gray-50 hover:text-teal-primary'}`}
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

          <Link to="/contact" className="hidden items-center gap-2 rounded-full bg-teal-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90 active:scale-95 lg:inline-flex">
            Get in Touch <ArrowRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-100 bg-white text-teal-700 shadow-[0_10px_28px_rgba(13,148,136,0.16)] transition hover:border-teal-200 hover:bg-teal-50 active:scale-95 lg:hidden"
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
              className="fixed inset-0 top-16 z-40 bg-teal-950/10 backdrop-blur-sm sm:top-[72px] lg:hidden"
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
