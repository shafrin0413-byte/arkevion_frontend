import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const services = [
  { label: 'Web Development',    path: '/services' },
  { label: 'Full Stack Dev',     path: '/services' },
  { label: 'Mobile Development', path: '/services' },
  { label: 'UI/UX Design',       path: '/services' },
  { label: 'Digital Marketing',  path: '/services' },
  { label: 'AI Automation',      path: '/services' },
];

const quickLinks = [
  { label: 'About Us',      path: '/about' },
  { label: 'Portfolio',     path: '/portfolio' },
  { label: 'Internship',    path: '/internship' },
  { label: 'Why Choose Us', path: '/why-us' },
  { label: 'Testimonials',  path: '/testimonials' },
  { label: 'Contact',       path: '/contact' },
];

const socials = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/arkevion-technology/', label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://www.instagram.com/arkeviontech.official/',  label: 'Instagram' },
];

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Footer() {
  return (
    <footer style={{ background: '#111827' }} className="text-gray-300">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className="container-pad py-10 sm:py-14">
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-12"
        >
          {/* Brand */}
          <m.div variants={fadeUp}>
            <Link to="/" className="mb-0 flex items-center">
              <img
                src="/Arkevion_logo.png"
                alt="Arkevion"
                className="h-24 w-auto brightness-0 invert sm:h-28 lg:h-32"
              />
            </Link>
            <p className="-mt-4 mb-5 text-[0.8125rem] leading-relaxed text-gray-400 sm:-mt-5 lg:-mt-6">Arkevion Technology builds modern websites, custom software, AI automation, UI/UX systems, and digital growth solutions for businesses ready to move beyond limits.</p>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 hover:text-white hover:bg-teal-600"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </m.div>

          {/* Services */}
          <m.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">Services</h4>
            <ul className="space-y-3">
              {services.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-[0.8125rem] text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-teal-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Quick Links */}
          <m.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-[0.8125rem] text-gray-400 hover:text-teal-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-teal-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact */}
          <m.div variants={fadeUp}>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-teal-400 mt-0.5 shrink-0" />
                <span className="text-[0.8125rem] text-gray-400">Trichy, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-teal-400 shrink-0" />
                <a href="tel:+918838749824" className="text-[0.8125rem] text-gray-400 hover:text-teal-400 transition-colors">
                  +91 88387 49824
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-teal-400 shrink-0" />
                <a href="mailto:arkeviontech@gmail.com" className="text-[0.8125rem] text-gray-400 hover:text-teal-400 transition-colors">
                  arkeviontech@gmail.com
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/918838749824"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 rounded-xl p-3 transition-all duration-200 group"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(37,211,102,0.15)' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.855L0 24l6.335-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 01-5.034-1.378l-.36-.214-3.742.888.939-3.648-.235-.374A9.844 9.844 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z"/>
                </svg>
              </div>
              <div>
                <p className="text-[0.7rem] text-gray-500">WhatsApp</p>
                <p className="text-xs font-semibold text-teal-400 group-hover:text-teal-300 transition-colors">Chat with us</p>
              </div>
            </a>
          </m.div>
        </m.div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container-pad py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Arkevion Technology. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="text-xs text-gray-500 hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

