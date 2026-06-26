import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import WhyUs from './pages/WhyUs';
import Internship from './pages/Internship';
import Testimonials from './pages/Testimonials';
import Portfolio from './pages/PortfolioPage';
import Contact from './pages/Contact';
import OurClients from './pages/OurClients';
import ClientDetail from './pages/ClientDetail';
import ChatbotWidget from './components/ChatbotWidget';

const WHATSAPP_NUMBER = '918838749824';

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-transform duration-200"
      style={{
        width: 44, height: 44,
        background: '#25D366',
        boxShadow: '0 0 14px 4px rgba(37,211,102,0.45), 0 2px 8px rgba(37,211,102,0.3)',
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.855L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 01-5.034-1.378l-.36-.214-3.742.888.939-3.648-.235-.374A9.844 9.844 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/>
      </svg>
    </a>
  );
}

function SplashScreen() {
  return (
    <m.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="blur-loader-bg fixed inset-0 z-[200] flex items-center justify-center"
      style={{ willChange: 'opacity' }}
    >
      <div className="flex flex-col items-center gap-3">
        <m.img
          src="/Arkevion_logo.png" alt="Arkevion"
          className="h-24 w-auto object-contain sm:h-28"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ willChange: 'transform, opacity' }}
        />
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-gray-100 mt-1">
          <m.div
            initial={{ x: '-100%' }} animate={{ x: '100%' }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-14 rounded-full bg-teal-primary"
            style={{ willChange: 'transform' }}
          />
        </div>
      </div>
    </m.div>
  );
}



function RouteLoader() {
  return (
    <m.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="blur-loader-bg fixed inset-0 z-[150] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <m.img
          src="/Arkevion_logo.png"
          alt="Arkevion"
          className="h-20 w-auto object-contain sm:h-24"
          animate={{ opacity: [0.72, 1, 0.72], scale: [0.96, 1, 0.96] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-gray-100">
          <m.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-14 rounded-full bg-teal-primary"
          />
        </div>
      </div>
    </m.div>
  );
}

export default function App() {
  const location = useLocation();
  const [splash, setSplash] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setRouteLoading(true);
    const t = setTimeout(() => setRouteLoading(false), 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  /* Lenis — single global instance, desktop only */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({
      duration: 0.75,
      easing: t => 1 - Math.pow(1 - t, 3), /* ease-out cubic — snappier */
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 0, /* let mobile use native scroll */
    });
    let id;
    const raf = time => { lenis.raf(time); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  /* instant scroll-to-top on route change */
  const prev = useRef(location.pathname);
  useEffect(() => {
    if (prev.current === location.pathname) return;
    prev.current = location.pathname;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-white font-sans text-charcoal">
        <AnimatePresence>{splash && <SplashScreen />}</AnimatePresence>
        <AnimatePresence>{routeLoading && <RouteLoader />}</AnimatePresence>
        {!splash && (
          <>
            <Navbar />
            <main className="site-main relative block min-h-[calc(100svh-4rem)] overflow-x-hidden bg-white sm:min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-5rem)]">
              <Routes location={location}>
                <Route path="/"             element={<Home />}         />
                <Route path="/about"        element={<About />}        />
                <Route path="/services"          element={<Services />}       />
                <Route path="/services/:slug"     element={<ServiceDetail />}  />
                <Route path="/why-us"       element={<WhyUs />}        />
                <Route path="/internship"   element={<Internship />}   />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/portfolio"    element={<Portfolio />}    />
                <Route path="/contact"      element={<Contact />}      />
                <Route path="/clients"      element={<OurClients />}   />
                <Route path="/clients/:slug" element={<ClientDetail />} />
                <Route path="*"             element={<Home />}         />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <ChatbotWidget />
          </>
        )}
      </div>
    </LazyMotion>
  );
}
