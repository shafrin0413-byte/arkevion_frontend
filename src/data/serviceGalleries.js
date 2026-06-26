export const serviceGalleries = {
  'website-development': [
    {
      src: '/ecom/all.png',
      caption: 'Complete storefront layout with clear product discovery.',
      alt: 'Website design storefront gallery preview',
    },
    {
      src: '/ecom/ban.png',
      caption: 'Hero banner design built for strong first impressions.',
      alt: 'Website design banner gallery preview',
    },
    {
      src: '/ecom/com.png',
      caption: 'Conversion-focused content blocks for modern web pages.',
      alt: 'Website design content section gallery preview',
    },
    {
      src: '/ecom/eco.png',
      caption: 'E-commerce interface with polished shopping interactions.',
      alt: 'E-commerce website gallery preview',
    },
    {
      src: '/ecom/edu.png',
      caption: 'Education website layout with clean navigation and sections.',
      alt: 'Education website gallery preview',
    },
  ],
  'full-stack-development': [
    {
      src: '/ecom/fullstack/full.png',
      caption: 'Complete full-stack workflow from interface to backend logic.',
      alt: 'Full stack development overview gallery preview',
    },
    {
      src: '/ecom/fullstack/frontend.png',
      caption: 'Frontend screens built for clear, responsive product experiences.',
      alt: 'Frontend development gallery preview',
    },
    {
      src: '/ecom/fullstack/backend.png',
      caption: 'Backend systems designed for secure, scalable application logic.',
      alt: 'Backend development gallery preview',
    },
    {
      src: '/ecom/fullstack/databse.png',
      caption: 'Database architecture that keeps product data organized and reliable.',
      alt: 'Database architecture gallery preview',
    },
  ],
  'ui-ux-design': [
    {
      src: '/ecom/UI UX/whole.png',
      caption: 'Complete UI/UX flow shaped around user journeys and clarity.',
      alt: 'Complete UI UX design gallery preview',
    },
    {
      src: '/ecom/UI UX/ui.png',
      caption: 'Visual interface design with clean hierarchy and polished screens.',
      alt: 'UI design gallery preview',
    },
    {
      src: '/ecom/UI UX/ux.png',
      caption: 'Experience planning focused on usability, flow, and friction reduction.',
      alt: 'UX design gallery preview',
    },
    {
      src: '/ecom/UI UX/uiux.png',
      caption: 'Combined UI and UX systems ready for development handoff.',
      alt: 'UI UX system gallery preview',
    },
  ],
  'mobile-development': [
    {
      src: '/ecom/Service/all.png',
      caption: 'Mobile service overview designed for fast scanning.',
      alt: 'Mobile app service overview gallery preview',
    },
    {
      src: '/ecom/Service/bamk.png',
      caption: 'Banking-style mobile screen with focused actions.',
      alt: 'Mobile banking app gallery preview',
    },
    {
      src: '/ecom/Service/dei.png',
      caption: 'Detail screen layout for app-ready user journeys.',
      alt: 'Mobile detail screen gallery preview',
    },
    {
      src: '/ecom/Service/ecd.png',
      caption: 'Commerce mobile screen with clean product presentation.',
      alt: 'Mobile commerce screen gallery preview',
    },
  ],
  'digital-marketing': [
    {
      src: '/ecom/digital/digi.png',
      caption: 'Digital campaign planning for stronger reach and lead generation.',
      alt: 'Digital marketing campaign gallery preview',
    },
    {
      src: '/ecom/digital/seo.png',
      caption: 'SEO strategy focused on search visibility and organic growth.',
      alt: 'SEO marketing gallery preview',
    },
    {
      src: '/ecom/digital/types.png',
      caption: 'Multi-channel marketing approach across content, ads, and analytics.',
      alt: 'Digital marketing types gallery preview',
    },
  ],
  'ai-automation': [
    {
      src: '/ecom/AI/All.png',
      caption: 'AI automation overview for smarter business workflows.',
      alt: 'AI automation overview gallery preview',
    },
    {
      src: '/ecom/AI/Ai web.png',
      caption: 'AI-powered web experiences built around intelligent interactions.',
      alt: 'AI web automation gallery preview',
    },
    {
      src: '/ecom/AI/automation.png',
      caption: 'Workflow automation that reduces repetitive manual operations.',
      alt: 'Workflow automation gallery preview',
    },
    {
      src: '/ecom/AI/chatbot.png',
      caption: 'Chatbot and assistant flows for faster customer support.',
      alt: 'AI chatbot gallery preview',
    },
  ],
  'software-solutions': [
    {
      src: '/ecom/Software/erp.png',
      caption: 'ERP workflows built to connect teams, data, and approvals.',
      alt: 'ERP software solution gallery preview',
    },
    {
      src: '/ecom/Software/erp2.png',
      caption: 'Operational dashboards shaped for real business processes.',
      alt: 'Business software dashboard gallery preview',
    },
    {
      src: '/ecom/Software/hr.png',
      caption: 'HR software screens for people operations and internal tools.',
      alt: 'HR software solution gallery preview',
    },
  ],
};

export const getServiceGallery = (slug) => serviceGalleries[slug] || [];
