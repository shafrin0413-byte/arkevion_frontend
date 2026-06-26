import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

export const clients = [
  {
    slug: '1000221135',
    image: '/1000221135.jpg',
    name: 'Mens Wear',
    industry: 'E-Commerce',
    location: 'Trichy, Tamil Nadu',
    project: 'E-Commerce Website Development',
    description: 'A fully functional e-commerce website for a men\'s clothing brand, featuring a modern product catalog, size guides, smooth checkout flow, and mobile-first design to drive online sales.',
    results: ['2x increase in online orders', 'Mobile-first responsive shopping experience', 'Integrated secure payment gateway'],
    services: ['E-Commerce Development', 'UI/UX Design', 'SEO Optimization'],
    testimonial: 'Arkevion built us a clean, fast online store that our customers love. Sales have never been better.',
  },
  {
    slug: '1000221136',
    image: '/1000221136.jpg',
    name: 'Krish Promoters',
    industry: 'Real Estate',
    location: 'Chennai, Tamil Nadu',
    project: 'Website Development',
    description: 'A professional website for a construction and real estate promoter, showcasing ongoing and completed projects, plot listings, and an inquiry form to capture leads directly from the site.',
    results: ['Significant rise in property inquiries', 'Professional brand presence online', 'Easy-to-manage project listings'],
    services: ['Website Development', 'UI/UX Design', 'Digital Marketing'],
    testimonial: 'The team at Arkevion understood our business perfectly and delivered a site that truly represents our brand.',
  },
  {
    slug: '1000221137',
    image: '/1000221137.jpg',
    name: 'Cashevo',
    industry: 'Retail & Food',
    location: 'Bangalore, Karnataka',
    project: 'E-Commerce & Branding',
    description: 'An online storefront for a premium cashew nut brand, featuring product variants, bulk ordering options, freshness highlights, and a seamless buying experience to reach customers across India.',
    results: ['Expanded reach to pan-India customers', 'Streamlined bulk order management', 'Strong brand identity established online'],
    services: ['E-Commerce Development', 'Branding', 'Digital Marketing'],
    testimonial: 'Working with Arkevion was a game-changer. They captured our brand perfectly and made selling online effortless.',
  },
];

export default function OurClients() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Briefcase size={11} /> Our Clients</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            Businesses that<br /><span className="text-gradient">trust us.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17, ease }}
            className="mt-4 text-sm text-gray-400 max-w-xl leading-relaxed">
            We've partnered with businesses across industries to deliver digital solutions that drive real, measurable results.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Client Cards */}
      <section className="py-10 sm:py-18">
        <div className="container-pad">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, i) => (
              <m.div
                key={client.slug}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="visible" viewport={viewport}
                whileHover={{ y: -5 }}
                style={{ willChange: 'transform, opacity' }}
              >
                <Link to={`/clients/${client.slug}`} className="block group svc-card overflow-hidden">
                  {/* Image */}
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gray-50 p-5">
                    <img
                      src={client.image}
                      alt={client.name}
                      className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight size={14} className="text-teal-600" />
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                      {client.industry}
                    </span>
                    <h2 className="mt-3 text-xl font-black text-charcoal">{client.name}</h2>
                    <p className="text-xs text-gray-400 mt-2 mb-3 line-clamp-2">{client.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {client.services.slice(0, 2).map(s => (
                        <span key={s} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
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
