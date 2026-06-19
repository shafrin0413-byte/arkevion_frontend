import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone, ArrowRight, MessageCircle, ChevronDown, Sparkles } from 'lucide-react';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];
const SERVICES = ['Web Development','Full Stack','UI/UX Design','Digital Marketing','AI Automation','Software Solutions','Internship'];

function CustomSelect({ options, placeholder, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-sm text-left transition-colors ${open ? 'border-teal-500' : 'border-gray-200'} ${value ? 'text-charcoal' : 'text-gray-400'} bg-white`}>
        <span>{value || placeholder}</span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <m.ul initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
            className="absolute z-50 mt-1.5 w-full rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden">
            {options.map(opt => (
              <li key={opt}>
                <button type="button" onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-teal-50 hover:text-teal-600 ${value === opt ? 'bg-teal-50 text-teal-600 font-semibold' : 'text-charcoal'}`}>
                  {opt}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [service, setService] = useState('');
  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd      = new FormData(e.currentTarget);
    const name    = fd.get('name')    || '';
    const email   = fd.get('email')   || '';
    const phone   = fd.get('phone')   || 'Not provided';
    const message = fd.get('message') || '';
    const text = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
    window.open(`https://wa.me/918838749824?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
    setService('');
    e.currentTarget.reset();
  };

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Sparkles size={11} /> Contact Us</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            Let's build something<br /><span className="text-gradient">great together.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            We respond within 24 hours. Tell us about your project and we'll figure out the best way to help.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Content */}
      <section className="py-6 sm:py-14">
        <div className="container-pad grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal mb-6">Get in touch</h2>
            <div className="space-y-3">
              {[
                { Icon: Mail,      href: 'mailto:arkeviontech@gmail.com',                    label: 'Email',     text: 'arkeviontech@gmail.com'   },
                { Icon: Phone,     href: 'tel:+918838749824',                                label: 'Phone',     text: '+91 88387 49824'          },
                { Icon: MapPin,    href: 'https://maps.google.com/?q=Trichy,Tamil+Nadu',     label: 'Location',  text: 'Trichy, Tamil Nadu, India' },
                { Icon: Instagram, href: 'https://www.instagram.com/arkeviontech.official/', label: 'Instagram', text: '@arkeviontech.official'    },
              ].map(({ Icon, href, label, text }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-4 hover:border-teal-300 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                    <p className="text-sm font-semibold text-charcoal group-hover:text-teal-600 transition-colors">{text}</p>
                  </div>
                </a>
              ))}
            </div>

            <a href="https://wa.me/918838749824" target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/05 p-4 hover:bg-[#25D366]/10 transition-colors">
              <MessageCircle size={18} className="text-[#25D366] shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Prefer to chat?</p>
                <p className="text-sm font-bold text-charcoal">Message us on WhatsApp</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 ml-auto" />
            </a>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Typically responds within 2–4 hours
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-sm">
            <h3 className="text-lg font-bold text-charcoal mb-5">Send us a message</h3>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input required name="name"  placeholder="Full Name"      className="input-field" />
                <input required type="email" name="email" placeholder="Email Address" className="input-field" />
              </div>
              <input name="phone" placeholder="Phone Number (optional)" className="input-field" />
              <CustomSelect options={SERVICES} placeholder="Service Interested In" value={service} onChange={setService} />
              <textarea required name="message" rows={4} placeholder="Tell us about your project..." className="input-field resize-none" />
              <button type="submit" className="btn-primary justify-center">
                Send Message <ArrowRight size={15} />
              </button>
              <AnimatePresence>
                {sent && (
                  <m.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    className="text-sm font-semibold text-teal-600 text-center">
                    ✓ Message sent! We'll get back to you soon.
                  </m.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
