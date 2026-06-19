import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, CheckCircle2, Quote } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import { clients } from './OurClients';

const ease = [0.25, 0.46, 0.45, 0.94];

export default function ClientDetail() {
  const { slug } = useParams();
  const client = clients.find(c => c.slug === slug);

  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!client) return <Navigate to="/clients" replace />;

  const { image, name, industry, location, project, description, results, services, testimonial } = client;

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <Link to="/clients" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors mb-5">
              <ArrowRight size={12} className="rotate-180" /> All Clients
            </Link>
          </m.div>
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-100 shadow-md shrink-0"
            >
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </m.div>
            <div>
              <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}
                className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{industry}</span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} />{location}</span>
              </m.div>
              <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.13, ease }} className="section-title leading-tight">
                {name}
              </m.h1>
              <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.17, ease }}
                className="mt-1 text-sm font-semibold text-teal-600 flex items-center gap-1.5">
                <Briefcase size={13} /> {project}
              </m.p>
            </div>
          </div>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease }}
            className="mt-4 text-sm text-gray-400 max-w-xl leading-relaxed">
            {description}
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Content */}
      <section className="py-8 sm:py-16">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">

            {/* Results */}
            <m.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="eyebrow text-xs">Results Achieved</span>
              <h2 className="section-title mt-4 mb-6 text-xl sm:text-2xl">
                What we <span className="text-gradient">delivered.</span>
              </h2>
              <div className="grid gap-3">
                {results.map((r, i) => (
                  <m.div key={r} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-teal-50 text-teal-600">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-sm text-charcoal font-medium">{r}</span>
                  </m.div>
                ))}
              </div>

              {/* Services used */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Services Used</p>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <span key={s} className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Image + Testimonial */}
            <m.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
                <Quote size={28} className="text-teal-200 absolute top-4 right-4" />
                <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">"{testimonial}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-charcoal">{name}</p>
                    <p className="text-xs text-gray-400">{industry} · {location}</p>
                  </div>
                </div>
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.20)' }}
          >
            <div className="glow-orb w-72 h-72" style={{ top: '-90px', right: '-50px', background: 'rgba(20,184,166,0.16)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Want results like these?</h2>
              <p className="mt-2 text-sm text-white/70">Let's talk about your project and what we can build together.</p>
            </div>
            <Link to="/contact" className="relative z-10 shrink-0 btn-primary">
              Get in touch <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
