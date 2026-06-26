import {
  ShoppingCart, GraduationCap, Building2, UserSquare2, HeartPulse, AppWindow,
  Smartphone, Apple, Layers, ShoppingBag, Bike, Stethoscope,
  Monitor, TabletSmartphone, LayoutDashboard, PenLine, MousePointerClick, Users,
  Bot, Workflow, HeadsetIcon, CreditCard, Mail, BrainCircuit,
  SearchCheck, Share2, Megaphone, FileText, AtSign, Star,
  Code2, Database, Cloud, ServerCog, GitBranch, Globe,
} from 'lucide-react';

export const serviceSections = [
  {
    route: 'web-development',
    slug:  'website-development',
    label: 'Web Development',
    eyebrow: 'Web Development',
    color: '#0d9488',
    tagline: 'Custom websites built for speed, SEO, and conversion.',
    description:
      'From simple landing pages to complex multi-page platforms, we craft responsive, accessible, and high-performing websites tailored to your business goals.',
    cards: [
      { Icon: ShoppingCart,  title: 'E-Commerce Websites',     body: 'Full-featured online stores with product management, secure checkout, and payment gateway integration.' },
      { Icon: Building2,     title: 'Business Websites',       body: 'Professional corporate sites that communicate your brand, services, and value proposition effectively.' },
      { Icon: GraduationCap, title: 'Educational Websites',    body: 'LMS portals, course platforms, and academic websites with student dashboards and content management.' },
      { Icon: UserSquare2,   title: 'Portfolio Websites',      body: 'Visually stunning portfolio sites for creatives, freelancers, and agencies to showcase their work.' },
      { Icon: HeartPulse,    title: 'Healthcare Websites',     body: 'HIPAA-conscious healthcare portals with appointment booking, doctor listings, and patient information.' },
      { Icon: AppWindow,     title: 'Custom Web Applications', body: 'Bespoke web apps with complex workflows, real-time features, and role-based access control.' },
    ],
  },
  {
    route: 'mobile-development',
    slug:  'mobile-development',
    label: 'Mobile Development',
    eyebrow: 'Mobile Development',
    color: '#0d9488',
    tagline: 'Mobile apps users love to open every day.',
    description:
      'We build polished, performant mobile experiences for Android, iOS, and cross-platform audiences — from MVPs to full-scale production apps.',
    cards: [
      { Icon: Smartphone,  title: 'Android Apps',          body: 'Native Android apps built with Kotlin/Java for fluid performance, battery efficiency, and Play Store launch.' },
      { Icon: Apple,       title: 'iOS Apps',              body: 'Elegant iOS apps crafted with Swift, optimised for every iPhone and iPad screen size.' },
      { Icon: Layers,      title: 'Cross-Platform Apps',   body: 'Single codebase apps using React Native that run seamlessly on both Android and iOS.' },
      { Icon: ShoppingBag, title: 'E-Commerce Apps',       body: 'Feature-rich shopping apps with product catalogs, wishlists, push notifications, and secure payments.' },
      { Icon: Bike,        title: 'Food Delivery Apps',    body: 'On-demand platforms with real-time order tracking, rider management, and restaurant dashboards.' },
      { Icon: Stethoscope, title: 'Healthcare Apps',       body: 'Telemedicine and health-tracking apps with appointment scheduling, records, and secure data storage.' },
    ],
  },
  {
    route: 'ui-ux',
    slug:  'ui-ux-design',
    label: 'UI/UX Design',
    eyebrow: 'UI/UX Design',
    color: '#7c3aed',
    tagline: 'Interfaces users love at first click.',
    description:
      'Research-backed, pixel-perfect design that reduces friction and drives engagement — from wireframes to polished, developer-ready Figma files.',
    cards: [
      { Icon: Monitor,           title: 'Website UI Design',        body: 'Clean, modern website interfaces designed to reflect your brand and guide visitors to take action.' },
      { Icon: TabletSmartphone,  title: 'Mobile UI Design',         body: 'Intuitive mobile interfaces with touch-optimised interactions and platform-native design patterns.' },
      { Icon: LayoutDashboard,   title: 'Dashboard Design',         body: 'Data-rich admin and analytics dashboards with clear visual hierarchy and actionable insights.' },
      { Icon: PenLine,           title: 'Wireframing',              body: 'Low-fidelity wireframes that map out user flows and page structure before any visual design begins.' },
      { Icon: MousePointerClick, title: 'Prototyping',              body: 'Interactive Figma prototypes to validate ideas with real users and stakeholders before development.' },
      { Icon: Users,             title: 'UX Research',              body: 'User interviews, heatmap analysis, and usability testing to inform design decisions with real data.' },
    ],
  },
  {
    route: 'ai-automation',
    slug:  'ai-automation',
    label: 'AI Automation',
    eyebrow: 'AI Automation',
    color: '#0891b2',
    tagline: 'Intelligent automation that works while you sleep.',
    description:
      'We build AI-powered systems that eliminate repetitive tasks, surface actionable insights, and supercharge your team\'s productivity.',
    cards: [
      { Icon: Bot,          title: 'AI Chatbots',             body: 'LLM-powered conversational bots for customer support, lead capture, and internal knowledge bases.' },
      { Icon: Workflow,     title: 'Workflow Automation',     body: 'End-to-end process automation connecting your apps, databases, and teams without manual intervention.' },
      { Icon: CreditCard,   title: 'CRM Automation',         body: 'Automated CRM pipelines for lead scoring, follow-up sequences, and deal management.' },
      { Icon: HeadsetIcon,  title: 'Customer Support AI',    body: '24/7 intelligent agents that resolve common queries, escalate issues, and learn over time.' },
      { Icon: Mail,         title: 'Email Automation',       body: 'Smart email sequences triggered by user behaviour to nurture leads and re-engage customers.' },
      { Icon: BrainCircuit, title: 'Business AI Solutions',  body: 'Custom ML models, predictive analytics, and decision-support tools tailored to your domain.' },
    ],
  },
  {
    route: 'digital-marketing',
    slug:  'digital-marketing',
    label: 'Digital Marketing',
    eyebrow: 'Digital Marketing',
    color: '#0d9488',
    tagline: 'Data-driven growth that scales your business.',
    description:
      'Multi-channel marketing strategies — SEO, paid ads, social, and content — all focused on measurable ROI and sustainable business growth.',
    cards: [
      { Icon: SearchCheck, title: 'SEO',                    body: 'Technical SEO, on-page optimisation, and link-building strategies to rank higher and drive organic traffic.' },
      { Icon: Megaphone,   title: 'Google Ads',             body: 'High-ROI PPC campaigns with precise audience targeting, A/B-tested creatives, and conversion tracking.' },
      { Icon: Share2,      title: 'Social Media Marketing', body: 'Content strategy, community management, and paid social campaigns across Instagram, LinkedIn, and more.' },
      { Icon: AtSign,      title: 'Email Marketing',        body: 'Segmented newsletters and drip campaigns with personalisation, automation, and detailed analytics.' },
      { Icon: FileText,    title: 'Content Marketing',      body: 'SEO-optimised blog posts, case studies, and thought-leadership content that attracts and converts.' },
      { Icon: Star,        title: 'Brand Promotion',        body: 'Cohesive brand campaigns across channels to build recognition, trust, and long-term customer loyalty.' },
    ],
  },
  {
    route: 'full-stack',
    slug:  'full-stack-development',
    label: 'Full Stack Development',
    eyebrow: 'Full Stack Development',
    color: '#0891b2',
    tagline: 'End-to-end applications built to last.',
    description:
      'One team, complete ownership — from polished React frontends and scalable Node/Django backends to cloud deployment and CI/CD pipelines.',
    cards: [
      { Icon: Code2,     title: 'MERN Stack',       body: 'Full-stack apps built with MongoDB, Express, React, and Node.js for fast, scalable, JavaScript-first products.' },
      { Icon: Globe,     title: 'MEAN Stack',       body: 'Enterprise-grade apps using MongoDB, Express, Angular, and Node.js with a strongly typed architecture.' },
      { Icon: ServerCog, title: 'Django Development', body: 'Secure, rapid Python-based backends with Django REST Framework and PostgreSQL for data-intensive platforms.' },
      { Icon: GitBranch, title: 'REST APIs',         body: 'Well-documented, versioned REST APIs with JWT auth, rate limiting, and third-party integrations.' },
      { Icon: Database,  title: 'Database Design',   body: 'Optimised relational and NoSQL schemas, indexing strategies, and migration workflows for production use.' },
      { Icon: Cloud,     title: 'Cloud Deployment',  body: 'CI/CD pipelines, containerised deploys on AWS/GCP/Azure, with monitoring, alerts, and auto-scaling.' },
    ],
  },
];
