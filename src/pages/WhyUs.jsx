import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Clock, Code2, DollarSign, HeadphonesIcon, Heart, Zap, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const reasons = [
  { Icon: Clock,          title: 'On-Time Delivery',      body: 'We ship on schedule, every time. No surprises, no excuses.',    color: '#0d9488' },
  { Icon: Code2,          title: 'Clean Code',            body: 'Maintainable, scalable, well-documented code that lasts.',       color: '#0891b2' },
  { Icon: HeadphonesIcon, title: 'Ongoing Support',       body: 'We stay with you after launch — patches, updates, guidance.',   color: '#7c3aed' },
  { Icon: Heart,          title: 'Client-First Approach', body: 'Your goals drive every single decision we make.',               color: '#0d9488' },
  { Icon: DollarSign,     title: 'Transparent Pricing',   body: 'No hidden costs. Clear scopes, honest invoices.',               color: '#0891b2' },
  { Icon: Zap,            title: 'Modern Tech Stack',     body: 'We use the latest tools to build the best products.',           color: '#7c3aed' },
];

const process = [
  ['01', 'Discovery',   'We listen and understand your goals, audience, and constraints.'],
  ['02', 'Design',      'We craft the UX and visual direction that fits your brand.'],
  ['03', 'Development', 'We build with clean, tested, production-ready code.'],
  ['04', 'Testing',     'We QA every detail before anything goes live.'],
  ['05', 'Launch',      'We ship, monitor, and support you post-launch.'],
];

export default function WhyUs() {
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
            <span className="eyebrow"><Sparkles size={11} /> Why Arkevion</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            Partners who deliver,<br /><span className="text-gradient">not just promise.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            We've built trust with every project — through clean work, honest communication, and results that speak for themselves.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Reasons grid */}
      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ Icon, title, body, color }, i) => (
              <m.article
                key={title}
                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                whileHover={{ y: -5 }}
                className="svc-card group p-7 cursor-default"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="mb-4 inline-flex rounded-xl p-3 group-hover:scale-110 transition-all duration-300"
                  style={{ background: `${color}10`, color }}>
                  <Icon size={20} />
                </div>
                <h2 className="font-bold text-charcoal">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{body}</p>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-6 sm:py-14 bg-[#fafcfc]">
        <div className="container-pad">
          <div className="text-center mb-12">
            <span className="eyebrow"><Sparkles size={10} /> How We Work</span>
            <h2 className="section-title mt-4">Our <span className="text-gradient">process.</span></h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent z-0" />
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 relative z-10">
              {process.map(([number, title, desc]) => (
                <div key={number} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-teal-100 flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-lg font-black text-teal-600">{number}</span>
                  </div>
                  <h3 className="font-bold text-charcoal">{title}</h3>
                  <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 rounded-2xl bg-white border border-gray-100 p-6 sm:p-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 shadow-sm">
            {['Weekly progress updates','Source code ownership','Post-launch monitoring','Free 30-day bug fixes','Performance optimised','SEO-ready structure'].map(item => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                <span className="text-sm text-charcoal">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 sm:py-14">
        <div className="container-pad text-center">
          <h2 className="section-title">Ready to <span className="text-gradient">get started?</span></h2>
          <p className="mt-3 text-sm text-gray-400">No commitment. Just a conversation about your project.</p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Start your project <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
