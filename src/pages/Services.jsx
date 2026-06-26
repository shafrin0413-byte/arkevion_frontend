import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Bot, Code2, GraduationCap, Layers, Palette, Settings, Smartphone, TrendingUp, ArrowRight } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const services = [
  { Icon: Code2, slug: 'website-development', title: 'Website Development', body: 'Responsive business websites, landing pages, and portals built for speed, SEO, accessibility, and conversion.', color: '#0d9488', image: '/New folder/dg.png' },
  { Icon: Layers, slug: 'full-stack-development', title: 'Full Stack Development', body: 'Complete web applications with React interfaces, secure APIs, databases, admin workflows, and deployment support.', color: '#0891b2', image: '/New folder/modern.png' },
  { Icon: Smartphone, slug: 'mobile-development', title: 'Mobile Development', body: 'Responsive mobile apps and app-ready interfaces built for Android, iOS, and modern users.', color: '#0d9488', image: '/New folder/Ecom.png' },
  { Icon: Palette, slug: 'ui-ux-design', title: 'UI/UX Design', body: 'User journeys, wireframes, prototypes, and clean design systems that make digital products easier to understand.', color: '#7c3aed', image: '/New folder/UI.png' },
  { Icon: TrendingUp, slug: 'digital-marketing', title: 'Digital Marketing', body: 'SEO, social media, paid ads, analytics, and campaign strategy focused on measurable business growth.', color: '#0d9488', image: '/New folder/digital.png' },
  { Icon: Bot, slug: 'ai-automation', title: 'AI Automation', body: 'AI chatbots, workflow automation, data processing, and productivity systems tailored to daily operations.', color: '#0891b2', image: '/New folder/userinter.png' },
  { Icon: Settings, slug: 'software-solutions', title: 'Software Solutions', body: 'Custom dashboards, CRM-style tools, reporting systems, and process software built around business needs.', color: '#7c3aed', image: '/New folder/Ecom.png' },
  { Icon: GraduationCap, slug: 'internship-programs', title: 'Internship Programs', body: 'Hands-on training in development, design, marketing, HR, and AI with practical project exposure.', color: '#0d9488', image: '/New folder/hel.png' },
];

export default function Services() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="w-full bg-white">
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><ArrowRight size={11} /> What We Do</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            End-to-end solutions<br />
            <span className="text-gradient">for modern businesses.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Arkevion Technology brings strategy, design, development, automation, and digital growth together so businesses can launch better products and operate beyond limits.
          </m.p>
        </div>
      </PageHeroBanner>

      <section className="py-8 sm:py-16">
        <div className="container-pad">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, slug, body, color, image }, i) => (
              <m.article
                key={title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                whileHover={{ y: -5 }}
                className="svc-card group overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 sm:p-6">
                  <div
                    className="mb-4 inline-flex rounded-2xl p-3 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}10`, color }}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="mb-2 text-base font-bold leading-tight text-charcoal sm:text-xl">{title}</h2>
                  <p className="text-sm leading-relaxed text-gray-500">{body}</p>
                  <Link
                    to={`/services/${slug}`}
                    className="mt-5 flex items-center gap-1 text-sm font-bold text-teal-600 opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    Learn more <ArrowRight size={13} />
                  </Link>
                </div>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl p-10 sm:flex-row sm:items-center sm:p-14"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.20)' }}
          >
            <div className="glow-orb w-72 h-72" style={{ top: '-90px', right: '-50px', background: 'rgba(20,184,166,0.16)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Not sure which service fits?</h2>
              <p className="mt-2 text-sm text-white/70">Talk to us and we'll recommend exactly what your business needs.</p>
            </div>
            <Link to="/contact" className="btn-primary relative z-10 shrink-0">
              Talk to us <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}

