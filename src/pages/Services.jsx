import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Bot, Code2, GraduationCap, Layers, Palette, Settings, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const services = [
  { Icon: Code2,         slug: 'website-development',  title: 'Website Development',    body: 'Custom websites built for speed, SEO, and conversion. From landing pages to complex platforms.',                color: '#0d9488' },
  { Icon: Layers,        slug: 'full-stack-development',title: 'Full Stack Development', body: 'End-to-end web applications — frontend, backend, databases, and APIs, all in one team.',                       color: '#0891b2' },
  { Icon: Palette,       slug: 'ui-ux-design',          title: 'UI/UX Design',           body: 'User-first interfaces that are intuitive, beautiful, and drive action.',                                       color: '#7c3aed' },
  { Icon: TrendingUp,    slug: 'digital-marketing',     title: 'Digital Marketing',      body: 'SEO, social media, and paid campaigns engineered for measurable business growth.',                              color: '#0d9488' },
  { Icon: Bot,           slug: 'ai-automation',         title: 'AI Automation',          body: 'Intelligent automation to eliminate repetitive tasks and reduce operational costs.',                            color: '#0891b2' },
  { Icon: Settings,      slug: 'software-solutions',    title: 'Software Solutions',     body: 'Custom internal tools and software built precisely around your business workflows.',                            color: '#7c3aed' },
  { Icon: GraduationCap, slug: 'internship-programs',   title: 'Internship Programs',    body: 'Practical training in real projects for aspiring developers, designers, and marketers.',                       color: '#0d9488' },
];

export default function Services() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Sparkles size={11} /> What We Do</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            End-to-end solutions<br />
            <span className="text-gradient">for modern businesses.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 text-sm text-gray-400 max-w-xl leading-relaxed">
            From design to deployment — every service under one roof, built to help your business grow faster.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Grid */}
      <section className="py-6 sm:py-16">
        <div className="container-pad">
          <div className="grid gap-3 sm:gap-5 grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, slug, body, color }, i) => (
              <m.article
                key={title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                whileHover={{ y: -5 }}
                className="svc-card group p-4 sm:p-7"
                style={{ willChange: 'transform, opacity' }}
              >
                <div
                  className="mb-3 sm:mb-5 inline-flex rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}10`, color }}
                >
                  <Icon size={18} />
                </div>
                <h2 className="text-xs sm:text-[1.0625rem] font-bold text-charcoal mb-1.5 sm:mb-2 leading-tight">{title}</h2>
                <p className="hidden sm:block text-sm leading-relaxed text-gray-400">{body}</p>
                <p className="sm:hidden text-[11px] leading-relaxed text-gray-400 line-clamp-2">{body}</p>
                <Link
                  to={`/services/${slug}`}
                  className="mt-5 flex items-center gap-1 text-xs font-bold text-teal-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                >
                  Learn more <ArrowRight size={12} />
                </Link>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.20)' }}
          >
            <div className="glow-orb w-72 h-72" style={{ top: '-90px', right: '-50px', background: 'rgba(20,184,166,0.16)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Not sure which service fits?</h2>
              <p className="mt-2 text-sm text-white/70">Talk to us — we'll recommend exactly what your business needs.</p>
            </div>
            <Link to="/contact" className="relative z-10 shrink-0 btn-primary">
              Talk to us <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
