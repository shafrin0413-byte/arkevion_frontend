import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const testimonials = [
  ['Ravi M.',    'Founder, Trichy',    'RM', 'Arkevion delivered our website on time and beyond expectations. Their attention to detail is remarkable.',    'https://api.dicebear.com/8.x/personas/svg?seed=RaviM&backgroundColor=0d9488'],
  ['Priya S.',   'CEO',               'PS', 'The app they built scaled to 10,000 users without any issues. Solid team, solid execution.',                  'https://api.dicebear.com/8.x/personas/svg?seed=PriyaS&backgroundColor=0d9488'],
  ['Arjun K.',   'Product Lead',      'AK', 'Fast, clean, and professional. Exactly what we needed — no drama, just results.',                             'https://api.dicebear.com/8.x/personas/svg?seed=ArjunK&backgroundColor=0d9488'],
  ['Meena R.',   'Startup Founder',   'MR', "Their UI/UX team completely transformed our product's user experience. Retention improved 40%.",               'https://api.dicebear.com/8.x/personas/svg?seed=MeenaR&backgroundColor=0d9488'],
  ['Karthik V.', 'Intern Graduate',   'KV', 'Best internship experience. I learned more in 2 months here than in my entire final year.',                   'https://api.dicebear.com/8.x/personas/svg?seed=KarthikV&backgroundColor=0d9488'],
  ['Sundar P.',  'Operations Manager','SP', 'The AI automation they built saved us 10+ hours every single week. ROI was immediate.',                       'https://api.dicebear.com/8.x/personas/svg?seed=SundarP&backgroundColor=0d9488'],
  ['Shafrin',    'Intern - Full Stack Developer, Arkevion', 'SF', 'Interning at Arkevion was a transformative experience. I worked on real client projects from day one, sharpened my React and Node.js skills, and received mentorship that genuinely accelerated my growth as a developer.', 'https://api.dicebear.com/8.x/personas/svg?seed=Shafrin&backgroundColor=0d9488'],
  ['Shivasri',   'Intern - Full Stack Developer, Arkevion', 'SV', 'The learning curve was steep in the best way possible. The team at Arkevion pushed me to think beyond textbooks. I left with a solid portfolio, a certificate, and confidence to take on any full stack challenge.',       'https://api.dicebear.com/8.x/personas/svg?seed=Shivasri&backgroundColor=0d9488'],
];

export default function Testimonials() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Sparkles size={11} /> Client Stories</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            Trusted by builders,<br /><span className="text-gradient">founders & teams.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            Real words from real clients — people who trusted us with their products and got results.
          </m.p>
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24, ease }} className="mt-6 inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-gray-100 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="text-teal-500 fill-teal-500" />)}
            </div>
            <span className="text-sm font-bold text-charcoal">5.0</span>
            <span className="text-xs text-gray-400">from {testimonials.length} reviews</span>
          </m.div>
        </div>
      </PageHeroBanner>

      {/* Cards */}
      <section className="py-6 sm:py-14">
        <div className="container-pad grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(([name, role, initials, quote, avatar], i) => (
            <m.article
              key={name}
              variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
              whileHover={{ y: -5 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 flex flex-col cursor-default svc-card"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="absolute top-4 right-5 text-6xl font-black text-teal-500/[0.07] leading-none select-none">"</span>
              <div className="flex gap-0.5 text-teal-500 mb-4">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} fill="currentColor" />)}
              </div>
              <p className="text-sm leading-relaxed text-gray-500 flex-1">"{quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 shrink-0">
                  <img src={avatar} alt={name} className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display='none'; }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 sm:py-14 bg-[#fafcfc]">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.20)' }}
          >
            <div className="glow-orb w-56 h-56" style={{ top: '-50px', right: '-30px', background: 'rgba(20,184,166,0.15)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Become our next success story.</h2>
              <p className="mt-2 text-sm text-white/70">Join the businesses that chose Arkevion and saw real results.</p>
            </div>
            <Link to="/contact" className="relative z-10 shrink-0 btn-primary">
              Start a project <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}
