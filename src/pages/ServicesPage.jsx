import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Code2, Layers, Palette, TrendingUp, Cpu, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import SectionHeader from '../components/ui/SectionHeader';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import ContactCTA from '../components/sections/ContactCTA';

const services = [
  {
    slug: 'web',
    icon: Code2,
    title: 'Website Development',
    tagline: 'Performant, beautiful websites that convert.',
    description: 'We build lightning-fast, SEO-optimized websites using modern frameworks like React and Next.js. Every site is mobile-first, accessible, and engineered for conversions.',
    features: ['Custom React/Next.js development', 'SEO & performance optimization', 'Mobile-first responsive design', 'CMS integration', 'E-commerce solutions', 'Maintenance & support'],
    gradient: 'from-blue-500/20 to-teal-500/20',
    accent: '#3B82F6',
  },
  {
    slug: 'fullstack',
    icon: Layers,
    title: 'Full Stack Development',
    tagline: 'Complete end-to-end application development.',
    description: 'From complex backend APIs to polished frontends, we deliver full-stack solutions with scalable architecture, robust security, and clean codebases.',
    features: ['REST & GraphQL APIs', 'Database design & optimization', 'Cloud deployment (AWS/GCP)', 'Authentication & security', 'Third-party integrations', 'Microservices architecture'],
    gradient: 'from-purple-500/20 to-teal-500/20',
    accent: '#8B5CF6',
  },
  {
    slug: 'uiux',
    icon: Palette,
    title: 'UI/UX Design',
    tagline: 'Interfaces users love to interact with.',
    description: 'Our design team creates research-backed, visually stunning interfaces. We use Figma to deliver pixel-perfect prototypes before a single line of code is written.',
    features: ['User research & personas', 'Wireframing & prototyping', 'Visual design systems', 'Usability testing', 'Brand identity', 'Design-to-dev handoff'],
    gradient: 'from-pink-500/20 to-teal-500/20',
    accent: '#EC4899',
  },
  {
    slug: 'digital',
    icon: TrendingUp,
    title: 'Digital Marketing',
    tagline: 'Data-driven growth that scales your business.',
    description: 'We craft and execute multi-channel digital marketing strategies — SEO, PPC, social media, and content — all driven by data and focused on ROI.',
    features: ['SEO & content marketing', 'Google & Meta Ads', 'Social media management', 'Email marketing', 'Analytics & reporting', 'Conversion rate optimization'],
    gradient: 'from-amber-500/20 to-teal-500/20',
    accent: '#F59E0B',
  },
  {
    slug: 'software',
    icon: Cpu,
    title: 'Software Solutions',
    tagline: 'Custom software built around your workflow.',
    description: 'We design and develop bespoke software solutions tailored to your unique business processes — reliable, scalable, and built for the long term.',
    features: ['Business process automation', 'ERP/CRM development', 'SaaS product development', 'Legacy system modernization', 'API development & integration', 'Quality assurance'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10B981',
  },
  {
    slug: 'ai',
    icon: Zap,
    title: 'AI Automation',
    tagline: 'Intelligent automation that saves you time and money.',
    description: 'We build AI-powered workflows using LLMs, computer vision, and ML models to automate repetitive tasks, extract insights, and supercharge your operations.',
    features: ['LLM-powered chatbots', 'Document processing & OCR', 'Predictive analytics', 'Workflow automation', 'Computer vision solutions', 'AI integration consulting'],
    gradient: 'from-violet-500/20 to-teal-500/20',
    accent: '#7C3AED',
  },
];

const WEB_POINTS = ['E-Commerce Websites', 'Business Websites', 'Portfolio Websites', 'Landing Pages', 'Custom Web Applications', 'Responsive Design', 'SEO Optimized', 'Fast & Secure'];

function ServiceCard({ service, i }) {
  const { slug, icon: Icon, title, tagline, description, features, gradient, accent } = service;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });
  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="glass-card p-7 group"
    >
      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
        style={{ boxShadow: `0 4px 20px ${accent}20` }}
      >
        <Icon size={24} className="text-teal-600" />
      </div>
      <h3 className="font-display font-bold text-lg text-[#1a1a2e] mb-1">{title}</h3>
      <p className="text-teal-600 text-sm font-semibold mb-3">{tagline}</p>
      <p className="text-sm text-gray-400 leading-relaxed mb-5">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 size={12} className="text-teal-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link to={`/services/${slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-500 group/link">
        View Details
        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
      </Link>
    </m.div>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <div className="pt-32 text-center text-gray-500">Service not found.</div>;

  const Icon = service.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <PageTransition>
      <PageHeroBanner className="pt-24 pb-20 bg-[#fafbfc]">
        <div ref={ref} className="container-pad relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                style={{ boxShadow: `0 8px 32px ${service.accent}20` }}
              >
                <Icon size={30} className="text-teal-600" />
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
              <span className="eyebrow mb-4 inline-flex"><ArrowRight size={12} /> Service</span>
            </m.div>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="section-title mb-4">
              {service.title}
            </m.h1>
            <m.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="text-base text-teal-600 font-semibold mb-4">
              {service.tagline}
            </m.p>
            <m.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="text-gray-500 leading-relaxed">
              {service.description}
            </m.p>
          </div>

          <m.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="max-w-4xl mx-auto">
            {slug === 'web' && (
              <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
                <img
                  src="/software.png"
                  alt="Website Development"
                  className="w-full rounded-2xl shadow-lg object-cover"
                />
                <div className="text-left">
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    We create modern, responsive, and high-performance websites that help businesses grow online.
                  </p>
                  <ul className="space-y-3">
                    {WEB_POINTS.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-teal-500 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <h3 className="font-display font-bold text-xl text-[#1a1a2e] mb-6 text-center">
              What's <span className="text-gradient">Included</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((f) => (
                <div key={f} className="glass-card p-4 flex items-center gap-3 hover:translate-y-[-2px]">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={14} className="text-teal-500" />
                  </div>
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 }} className="mt-12 text-center">
            <Link to="/contact" className="btn-premium">
              Get a Free Quote
              <ArrowRight size={16} />
            </Link>
          </m.div>
        </div>
      </PageHeroBanner>
      <ContactCTA />
    </PageTransition>
  );
}

function ServicesListPage() {
  useLenis();
  return (
    <PageTransition>
      <PageHeroBanner className="pt-24 pb-16 bg-[#fafbfc]">
        <div className="container-pad">
          <SectionHeader
            tag="Services"
            title="What We Offer"
            subtitle="Comprehensive digital services engineered to grow your business in the modern economy."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} i={i} />
            ))}
          </div>
        </div>
      </PageHeroBanner>
      <ContactCTA />
    </PageTransition>
  );
}

export default function ServicesPage() {
  useLenis();
  const { slug } = useParams();
  return slug ? <ServiceDetailPage /> : <ServicesListPage />;
}
