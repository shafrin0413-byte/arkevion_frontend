export const chatbotQuestions = [
  {
    question: 'About Arkevion Technology',
    keywords: ['about', 'arkevion', 'company'],
    answer: 'Arkevion Technology is a service-based technology company providing software, web, mobile, AI automation, UI/UX, digital marketing, and IT consulting services.',
  },
  {
    question: 'Services',
    keywords: ['services', 'solutions', 'software', 'development'],
    answer: 'Our services include custom software development, web development, mobile app development, AI automation, UI/UX design, digital marketing, and IT consulting.',
  },
  {
    question: 'Internship domains',
    keywords: ['internship', 'intern', 'training', 'domain', 'course'],
    answer: 'Our internship domains include Web Development, Full Stack Development, Mobile Development, Digital Marketing, and AI Automation.',
  },
  {
    question: 'Contact details',
    keywords: ['contact', 'phone', 'whatsapp', 'call'],
    answer: 'Our team can be contacted through the Contact page or WhatsApp at +91 88387 49824.',
  },
];

export const defaultChatbotQuestions = chatbotQuestions.map(({ question }) => ({ question }));
