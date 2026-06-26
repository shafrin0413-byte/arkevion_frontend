export const chatbotQuestions = [
  {
    question: 'About Arkevion Technology',
    keywords: ['about', 'arkevion', 'company'],
    answer: 'Arkevion Technology is a service-based technology company providing software, web, mobile, AI automation, UI/UX, digital marketing, and IT consulting services.',
  },
  {
    question: 'Services',
    keywords: ['services', 'solutions', 'software', 'development'],
    answer: 'Our services include custom software development, web development, mobile app development, AI automation, UI/UX design, digital marketing, E-Com Websites, and IT consulting.',
  },
  {
    question: 'E-Commerce Development',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'shop', 'shopping', 'store', 'sell online'],
    answer: 'We build full-featured e-commerce websites and mobile apps with product management, secure checkout, payment gateway integration, order tracking, and admin dashboards — tailored for your business.',
  },
  {
    question: 'Internship domains',
    keywords: ['internship', 'intern', 'training', 'domain', 'course'],
    answer: 'Our internship domains include Web Development, Full Stack Development, Mobile Application Development, UI/UX Design, Digital Marketing, and AI Automation. Each domain offers hands-on training with real projects, mentorship, and a certificate upon completion.',
  },
  {
    question: 'Contact details',
    keywords: ['contact', 'phone', 'whatsapp', 'call'],
    answer: 'Our team can be contacted through the Contact page or WhatsApp at +91 88387 49824.',
  },
];

export const defaultChatbotQuestions = chatbotQuestions.map(({ question }) => ({ question }));
