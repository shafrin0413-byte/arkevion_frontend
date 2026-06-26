import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import InstagramServiceGallery from '../components/ui/InstagramServiceGallery';
import ServiceSubCard from '../components/sections/ServiceSubCard';
import { serviceSections } from '../data/servicesData';
import { getServiceGallery } from '../data/serviceGalleries';

const serviceImages = {
  'website-development':    '/New folder/dg.png',
  'full-stack-development': '/New folder/modern.png',
  'ui-ux-design':           '/New folder/UI.png',
  'mobile-development':     '/New folder/Ecom.png',
  'digital-marketing':      '/New folder/digital.png',
  'ai-automation':          '/New folder/userinter.png',
};

// Features + process per slug (matches ServiceDetail data exactly)
const serviceDetails = {
  'website-development': {
    features: [
      'Custom React / Next.js development',
      'SEO & Core Web Vitals optimization',
      'Mobile-first responsive design',
      'CMS integration (Sanity, Contentful)',
      'E-commerce & payment integration',
      'Performance audits & maintenance',
    ],
    process: [
      ['Discovery',    'We understand your goals, audience, and technical requirements.'],
      ['Design',       'Wireframes and visual design tailored to your brand.'],
      ['Development',  'Clean, tested, production-ready code built to last.'],
      ['Launch',       'Deployment, monitoring, and post-launch support.'],
    ],
  },
  'full-stack-development': {
    features: [
      'REST & GraphQL API development',
      'Database design & optimization',
      'Cloud deployment (AWS / GCP / Azure)',
      'JWT authentication & security',
      'Third-party integrations',
      'Microservices architecture',
    ],
    process: [
      ['Architecture', 'We design scalable system architecture for your product.'],
      ['Backend',      'APIs, databases, and server logic built for performance.'],
      ['Frontend',     'Polished UI connected seamlessly to your backend.'],
      ['Deploy',       'CI/CD pipelines, cloud hosting, and ongoing monitoring.'],
    ],
  },
  'ui-ux-design': {
    features: [
      'User research & persona mapping',
      'Wireframing & interactive prototyping',
      'Visual design systems',
      'Usability testing & iteration',
      'Brand identity & style guides',
      'Design-to-dev handoff (Figma)',
    ],
    process: [
      ['Research',  'User interviews, competitor analysis, and persona creation.'],
      ['Wireframe', 'Low-fidelity layouts to validate structure and flow.'],
      ['Design',    'High-fidelity visuals with your brand language.'],
      ['Handoff',   'Developer-ready Figma files with specs and assets.'],
    ],
  },
  'mobile-development': {
    features: [
      'Android and iOS app planning',
      'React Native / PWA development',
      'Mobile-first UX and navigation',
      'API integration and authentication',
      'Push-ready product architecture',
      'Testing, launch, and maintenance',
    ],
    process: [
      ['Plan',      'We define user journeys, core features, and the right mobile approach.'],
      ['Prototype', 'Clickable screens validate the flow before development starts.'],
      ['Build',     'Clean mobile interfaces connected to secure backend services.'],
      ['Launch',    'Testing, deployment guidance, and ongoing improvements.'],
    ],
  },
  'digital-marketing': {
    features: [
      'SEO & content marketing',
      'Google Ads & Meta Ads management',
      'Social media strategy & execution',
      'Email marketing campaigns',
      'Analytics & conversion reporting',
      'Conversion rate optimization',
    ],
    process: [
      ['Audit',    'We analyse your current digital presence and gaps.'],
      ['Strategy', 'A custom growth plan aligned with your business goals.'],
      ['Execute',  'Campaigns launched, monitored, and continuously optimised.'],
      ['Report',   'Transparent reporting on every metric that matters.'],
    ],
  },
  'ai-automation': {
    features: [
      'LLM-powered chatbots & assistants',
      'Document processing & OCR',
      'Predictive analytics & forecasting',
      'Workflow & process automation',
      'Computer vision solutions',
      'AI integration consulting',
    ],
    process: [
      ['Identify',  'We map your workflows and identify automation opportunities.'],
      ['Prototype', 'A working proof-of-concept built in days, not months.'],
      ['Integrate', 'Seamless integration into your existing tools and systems.'],
      ['Monitor',   'Ongoing performance tracking and model improvements.'],
    ],
  },
};

const ease = [0.25, 0.46, 0.45, 0.94];

export default function ServiceLandingPage() {
  const { serviceSlug } = useParams();
  const section = serviceSections.find((s) => s.route === serviceSlug);

  useEffect(() => { window.scrollTo(0, 0); }, [serviceSlug]);

  if (!section) return <Navigate to="/services" replace />;

  const { label, eyebrow, tagline, description, color, slug, cards } = section;
  const galleryImages = getServiceGallery(slug);
  const fallbackImage = serviceImages[slug];
  const detail = serviceDetails[slug] || { features: [], process: [] };

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">

          {/* Left column */}
          <div className="pt-1 lg:pt-0">
            <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
              <Link
                to="/services"
                className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-teal-600"
              >
                <ArrowRight size={12} className="rotate-180" /> All Services
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="mt-4"
            >
              <span className="eyebrow"><ArrowRight size={11} /> {eyebrow}</span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
              className="mt-5 section-title leading-tight"
            >
              {label}<br />
              <span className="text-gradient">{tagline}</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-3 max-w-lg text-sm leading-relaxed text-gray-400"
            >
              {description}
            </m.p>
          </div>

          {/* Right column — Gallery */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
            className="w-full max-w-xl justify-self-center lg:justify-self-end"
          >
            {galleryImages.length ? (
              <InstagramServiceGallery images={galleryImages} title={label} accentColor={color} />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <img src={fallbackImage} alt={label} className="h-64 w-full object-cover sm:h-80" />
              </div>
            )}
          </m.div>

        </div>
      </PageHeroBanner>

      {/* ── What's Included + Our Process ── */}
      <section className="py-8 sm:py-16">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">

            {/* What's Included */}
            <m.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="eyebrow"><CheckCircle2 size={10} /> What's Included</span>
              <h2 className="section-title mt-4 mb-6 text-xl sm:text-2xl">
                Everything you <span className="text-gradient">need.</span>
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {detail.features.map((f, i) => (
                  <m.div
                    key={f}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-white shadow-sm"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}12`, color }}
                    >
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-xs text-charcoal font-medium leading-tight">{f}</span>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Our Process */}
            <m.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="eyebrow">Our Process</span>
              <h2 className="section-title mt-4 mb-6 text-xl sm:text-2xl">
                How we <span className="text-gradient">work.</span>
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-teal-200 via-teal-100 to-transparent" />
                {detail.process.map(([step, desc], i) => (
                  <m.div
                    key={step}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex gap-4 pb-6 relative"
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 relative z-10 shadow-sm border-2"
                      style={{ background: `${color}12`, borderColor: `${color}30`, color }}
                    >
                      <span className="text-xs font-black">0{i + 1}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-charcoal text-sm">{step}</h4>
                      <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* ── 6 Cards ── */}
      <section className="py-12 sm:py-20">
        <div className="container-pad">

          <m.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mb-10"
          >
            <span className="eyebrow"><ArrowRight size={11} /> What We Offer</span>
            <h2 className="section-title mt-4">
              Our <span className="text-gradient">{label}</span> Services
            </h2>
          </m.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-6">
            {cards.map(({ Icon, title, body }, i) => (
              <ServiceSubCard
                key={title}
                Icon={Icon}
                title={title}
                body={body}
                color={color}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl p-10 sm:flex-row sm:items-center sm:p-14"
            style={{
              background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)',
              boxShadow: '0 24px 72px rgba(13,148,136,0.20)',
            }}
          >
            <div
              className="glow-orb w-72 h-72"
              style={{ top: '-90px', right: '-50px', background: 'rgba(20,184,166,0.16)' }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Let's talk about your project and how {label.toLowerCase()} can help.
              </p>
            </div>
            <Link to="/contact" className="btn-primary relative z-10 shrink-0">
              Get a free quote <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
