import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const NAV = [
  { label: 'Home',       path: '/'           },
  { label: 'About',      path: '/about'      },
  { label: 'Services',   path: '/services'   },
  { label: 'Why Us',     path: '/why-us'     },
  { label: 'Internship', path: '/internship' },
  { label: 'Contact',    path: '/contact'    },
];

const SOCIALS = [
  { Icon: Instagram, href: 'https://www.instagram.com/arkeviontech.official/', label: 'Instagram', color: '#E4405F' },
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/arkevion-technology/', label: 'LinkedIn', color: '#0A66C2' },
];

const SERVICES = [
  { label: 'Web Development', path: '/services/web' },
  { label: 'Full Stack', path: '/services/fullstack' },
  { label: 'Mobile Development', path: '/services/mobile-development' },
  { label: 'UI/UX Design', path: '/services/uiux' },
  { label: 'Digital Marketing', path: '/services/digital' },
  { label: 'AI Automation', path: '/services/ai' },
  { label: 'Software Solutions', path: '/services/software' },
];

function ExternalLink({ href, children, className, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={e => { e.stopPropagation(); }}
      {...props}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <footer ref={sectionRef} className="relative overflow-hidden" style={{ background: '#0c0c0e' }}>
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1F8A9E 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2AAFCA 0%, transparent 70%)' }}
      />

      <div className="container-pad relative z-10">
        {/* Main footer content */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-16 md:grid-cols-2 md:gap-10 md:py-20 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 group mb-0">
              <img src="/Arkevion_logo.png" alt="Arkevion"
                className="h-24 w-auto brightness-0 invert sm:h-28 lg:h-32" />
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-base tracking-tight text-white">
                  AR<span className="text-teal-400">kevion</span>
                </span>
                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                  Technology Solutions
                </span>
              </div>
            </Link>
            <p className="-mt-4 mb-6 max-w-xs text-xs leading-relaxed text-gray-500 sm:-mt-5 lg:-mt-6">
              Premium digital agency specializing in web development, UI/UX design, AI automation, 
              and digital marketing. We craft digital experiences that drive measurable results.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ Icon, href, label, color }) => (
                <ExternalLink
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 border border-white/5 hover:border-white/10"
                >
                  <Icon size={18} />
                </ExternalLink>
              ))}
            </div>
          </m.div>

          {/* Services Column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Quick Links Column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {label}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact Column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <ExternalLink
                  href="mailto:arkeviontech@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 group-hover:bg-teal-500/10 transition-colors duration-200 shrink-0">
                    <Mail size={12} className="text-gray-400 group-hover:text-teal-400" />
                  </span>
                  arkeviontech@gmail.com
                </ExternalLink>
              </li>
              <li>
                <ExternalLink
                  href="tel:+918838749824"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-teal-400 transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 group-hover:bg-teal-500/10 transition-colors duration-200 shrink-0">
                    <Phone size={12} className="text-gray-400 group-hover:text-teal-400" />
                  </span>
                  +91 88387 49824
                </ExternalLink>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors duration-200 bg-teal-500/10 hover:bg-teal-500/20 px-4 py-2 rounded-xl"
                >
                  Get in touch <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </m.div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/5">
        <div className="container-pad flex flex-col md:flex-row justify-between items-center gap-3 py-5">
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2025 Arkevion Technology. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Trichy, Tamil Nadu
            </span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Built with ❤️ by Arkevion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
