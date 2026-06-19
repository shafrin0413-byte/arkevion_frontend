import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Bot, Code2, GraduationCap, Layers, Palette, Settings, TrendingUp, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const services = [
  {
    slug: 'website-development',
    Icon: Code2,
    color: '#0d9488',
    title: 'Website Development',
    tagline: 'Custom websites built for speed, SEO, and conversion.',
    description: 'We build lightning-fast, SEO-optimized websites using modern frameworks like React and Next.js. Every site is mobile-first, accessible, and engineered to convert visitors into customers — from landing pages to complex multi-page platforms.',
    features: [
      'Custom React / Next.js development',
      'SEO & Core Web Vitals optimization',
      'Mobile-first responsive design',
      'CMS integration (Sanity, Contentful)',
      'E-commerce & payment integration',
      'Performance audits & maintenance',
    ],
    process: [
      ['Discovery', 'We understand your goals, audience, and technical requirements.'],
      ['Design', 'Wireframes and visual design tailored to your brand.'],
      ['Development', 'Clean, tested, production-ready code built to last.'],
      ['Launch', 'Deployment, monitoring, and post-launch support.'],
    ],
  },
  {
    slug: 'full-stack-development',
    Icon: Layers,
    color: '#0891b2',
    title: 'Full Stack Development',
    tagline: 'End-to-end applications — frontend, backend, and everything in between.',
    description: 'From complex backend APIs to polished frontends, we deliver full-stack solutions with scalable architecture, robust security, and clean codebases. One team, complete ownership.',
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
      ['Backend', 'APIs, databases, and server logic built for performance.'],
      ['Frontend', 'Polished UI connected seamlessly to your backend.'],
      ['Deploy', 'CI/CD pipelines, cloud hosting, and ongoing monitoring.'],
    ],
  },
  {
    slug: 'ui-ux-design',
    Icon: Palette,
    color: '#7c3aed',
    title: 'UI/UX Design',
    tagline: 'Interfaces users love — research-backed and pixel-perfect.',
    description: 'Our design team creates research-backed, visually stunning interfaces. We use Figma to deliver pixel-perfect prototypes before a single line of code is written, ensuring every product feels intuitive from day one.',
    features: [
      'User research & persona mapping',
      'Wireframing & interactive prototyping',
      'Visual design systems',
      'Usability testing & iteration',
      'Brand identity & style guides',
      'Design-to-dev handoff (Figma)',
    ],
    process: [
      ['Research', 'User interviews, competitor analysis, and persona creation.'],
      ['Wireframe', 'Low-fidelity layouts to validate structure and flow.'],
      ['Design', 'High-fidelity visuals with your brand language.'],
      ['Handoff', 'Developer-ready Figma files with specs and assets.'],
    ],
  },
  {
    slug: 'digital-marketing',
    Icon: TrendingUp,
    color: '#0d9488',
    title: 'Digital Marketing',
    tagline: 'Data-driven growth strategies that scale your business.',
    description: 'We craft and execute multi-channel digital marketing strategies — SEO, PPC, social media, and content — all driven by data and focused on delivering measurable ROI for your business.',
    features: [
      'SEO & content marketing',
      'Google Ads & Meta Ads management',
      'Social media strategy & execution',
      'Email marketing campaigns',
      'Analytics & conversion reporting',
      'Conversion rate optimization',
    ],
    process: [
      ['Audit', 'We analyse your current digital presence and gaps.'],
      ['Strategy', 'A custom growth plan aligned with your business goals.'],
      ['Execute', 'Campaigns launched, monitored, and continuously optimised.'],
      ['Report', 'Transparent reporting on every metric that matters.'],
    ],
  },
  {
    slug: 'ai-automation',
    Icon: Bot,
    color: '#0891b2',
    title: 'AI Automation',
    tagline: 'Intelligent automation that saves time and reduces costs.',
    description: 'We build AI-powered workflows using LLMs, computer vision, and ML models to automate repetitive tasks, extract insights, and supercharge your operations — so your team can focus on what matters.',
    features: [
      'LLM-powered chatbots & assistants',
      'Document processing & OCR',
      'Predictive analytics & forecasting',
      'Workflow & process automation',
      'Computer vision solutions',
      'AI integration consulting',
    ],
    process: [
      ['Identify', 'We map your workflows and identify automation opportunities.'],
      ['Prototype', 'A working proof-of-concept built in days, not months.'],
      ['Integrate', 'Seamless integration into your existing tools and systems.'],
      ['Monitor', 'Ongoing performance tracking and model improvements.'],
    ],
  },
  {
    slug: 'software-solutions',
    Icon: Settings,
    color: '#7c3aed',
    title: 'Software Solutions',
    tagline: 'Custom software built precisely around your workflow.',
    description: 'We design and develop bespoke software solutions tailored to your unique business processes — reliable, scalable, and built for the long term. From internal tools to full SaaS products.',
    features: [
      'Business process automation',
      'ERP / CRM development',
      'SaaS product development',
      'Legacy system modernization',
      'API development & integration',
      'Quality assurance & testing',
    ],
    process: [
      ['Discovery', 'Deep dive into your business processes and pain points.'],
      ['Spec', 'Detailed technical specification and project roadmap.'],
      ['Build', 'Iterative development with regular demos and feedback.'],
      ['Support', 'Training, documentation, and long-term maintenance.'],
    ],
  },
  {
    slug: 'internship-programs',
    Icon: GraduationCap,
    color: '#0d9488',
    title: 'Internship Programs',
    tagline: 'Real projects, real mentorship, real career launch.',
    description: 'Our industry-aligned internship programs bridge the gap between education and the real world. Work on live client projects, receive direct mentorship from professionals, and leave with a certificate and portfolio.',
    features: [
      'Frontend & Full Stack Development',
      'UI/UX Design tracks',
      'Digital Marketing & SEO',
      'AI & Machine Learning',
      'Industry-recognised certificate',
      'Letter of recommendation',
    ],
    process: [
      ['Apply', 'Fill out the application form with your background and interests.'],
      ['Onboard', 'Meet the team, set up your environment, and get started.'],
      ['Build', 'Work on real projects with daily guidance from mentors.'],
      ['Graduate', 'Present your work, receive feedback, and get certified.'],
    ],
  },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);

  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!service) return <Navigate to="/services" replace />;

  const { Icon, color, title, tagline, description, features, process } = service;

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors mb-4">
              <ArrowRight size={12} className="rotate-180" /> All Services
            </Link>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="mt-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${color}15`, color }}>
              <Icon size={22} />
            </div>
            <div>
              <h1 className="section-title leading-tight">{title}</h1>
              <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ color }}>{tagline}</p>
            </div>
          </m.div>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease }}
            className="mt-3 text-sm text-gray-400 max-w-lg leading-relaxed">
            {description}
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Features + Process */}
      <section className="py-8 sm:py-16">
        <div className="container-pad">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">

          {/* Features */}
          <m.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={viewport}>
            <span className="eyebrow"><Sparkles size={10} /> What's Included</span>
            <h2 className="section-title mt-4 mb-6 text-xl sm:text-2xl">
              Everything you <span className="text-gradient">need.</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
              {features.map((f, i) => (
                <m.div key={f} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}12`, color }}>
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-xs text-charcoal font-medium leading-tight">{f}</span>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Process */}
          <m.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewport}>
            <span className="eyebrow">Our Process</span>
            <h2 className="section-title mt-4 mb-6 text-xl sm:text-2xl">
              How we <span className="text-gradient">work.</span>
            </h2>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-teal-200 via-teal-100 to-transparent" />
              {process.map(([step, desc], i) => (
                <m.div key={step} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                  className="flex gap-4 pb-6 relative">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 relative z-10 shadow-sm border-2"
                    style={{ background: `${color}12`, borderColor: `${color}30`, color }}>
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to get started?</h2>
              <p className="mt-2 text-sm text-white/70">Let's talk about your project and how {title.toLowerCase()} can help.</p>
            </div>
            <Link to="/contact" className="relative z-10 shrink-0 btn-primary">
              Get a free quote <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
