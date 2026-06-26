import { useMemo, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

/* ── Answers ── */
const A = {
  greeting:  'Hello! Welcome to Arkevion Technology. How may we assist today?',
  thanks:    'Welcome! We are happy to assist. Feel free to ask anything about our services.',
  bye:       'Thank you for contacting Arkevion Technology. Have a great day!',
  company:   'Arkevion Technology is a service-based software company delivering modern websites, mobile apps, AI automation, UI/UX design, e-commerce platforms, digital marketing, and IT consulting — helping businesses grow beyond limits.',
  services:  'Our services include:\n• Website Development\n• Mobile App Development\n• E-Commerce Development\n• UI/UX Design\n• AI Automation\n• Digital Marketing\n• Full Stack Development\n• IT Consulting',
  ecommerce: 'We build full-featured e-commerce solutions including:\n• Online stores & product management\n• Payment gateway integration\n• Order tracking systems\n• Admin dashboards\n• Marketplace solutions (Amazon/Flipkart style)\n\nAll stores are mobile-friendly, fast, and built for conversions.',
  pricing:   'Pricing depends on project requirements, complexity, and timeline. We provide custom quotes tailored to each client. Please reach out through our Contact page or WhatsApp for a free consultation.',
  process:   'Our project delivery process:\n1. Requirement Gathering\n2. Planning & Scope\n3. UI/UX Design\n4. Development\n5. Testing & QA\n6. Deployment & Launch\n\nWe keep clients updated at every step.',
  tech:      'We use a modern technology stack including:\n• Frontend: React.js, Next.js, Angular\n• Backend: Node.js, Django, Express\n• Mobile: React Native\n• Databases: MongoDB, PostgreSQL, MySQL\n• Cloud: AWS, GCP, Azure\n• AI: Python, LLMs, ML frameworks',
  contact:   'We can be reached through:\n• Contact page on our website\n• WhatsApp: +91 88387 49824\n• Email: arkeviontech@gmail.com\n\nWe typically respond within a few hours.',
  support:   'We provide post-delivery maintenance and support for all projects. This includes bug fixes, updates, performance monitoring, and feature enhancements based on the agreed support plan.',
  trust:     'Arkevion Technology has delivered real projects across industries including e-commerce, education, healthcare, and more. We are an MSME-certified company committed to professional, on-time delivery with transparent communication.',
  internship:'Our internship domains include:\n• Web Development\n• Full Stack Development\n• Mobile Development\n• UI/UX Design\n• Digital Marketing\n• AI Automation\n\nInterns work on real projects with mentor guidance and receive a certificate.',
  fallback:  "We couldn't find specific information on that. Please contact our team directly — WhatsApp: +91 88387 49824 or visit our Contact page.",

  pricing_packages: 'We offer flexible pricing packages:\n• Basic — Simple websites & landing pages\n• Standard — Business websites & web apps\n• Premium — Full-scale platforms, mobile apps & AI solutions\n\nAll packages are customisable. Contact us for a free quote.',

  timeline: 'Project timelines vary by scope:\n• Landing pages: 3–5 days\n• Business websites: 1–2 weeks\n• Web apps & mobile apps: 3–8 weeks\n• AI automation & full-stack platforms: 6–12 weeks\n\nWe share a detailed timeline after requirement discussion.',

  industries: 'We have worked across multiple industries including:\n• E-Commerce & Retail\n• Education & E-Learning\n• Healthcare & Wellness\n• Food & Delivery\n• Real Estate\n• Finance & Fintech\n• Startups & SMEs\n• Corporate & Enterprise',

  why_us: 'Reasons to choose Arkevion Technology:\n• MSME-certified professional company\n• End-to-end delivery — design to deployment\n• On-time project completion\n• Transparent communication at every step\n• Modern tech stack & clean code\n• Post-delivery support included\n• Real projects, real results',

  portfolio: 'We have delivered real projects across e-commerce, education, healthcare, and business platforms. Visit our Portfolio page on the website to view our past work and case studies.',

  location: 'Yes! Arkevion Technology is placed in Trichy (Tiruchirappalli), Tamil Nadu, India. We work with clients remotely across India and internationally. All communication, meetings, and deliveries are handled online.',

  payment: 'We accept multiple payment methods including:\n• Bank transfer (NEFT / IMPS / RTGS)\n• UPI (GPay, PhonePe, Paytm)\n• Razorpay / online payment links\n• International payments via wire transfer\n\nPayment is typically split into milestones.',

  refund: 'We follow a milestone-based payment structure. If work does not meet agreed requirements, we revise it at no extra cost. Refund eligibility is discussed on a case-by-case basis as per our agreement terms.',

  languages: 'Our team communicates fluently in English and Tamil. All project documentation, reports, and deliverables are provided in English.',

  team: 'Arkevion Technology has a dedicated in-house team including:\n• UI/UX Designers\n• Frontend & Backend Developers\n• Mobile App Developers\n• AI & Automation Engineers\n• Digital Marketing Specialists\n• Project Managers\n\nEvery project is handled by the right experts.',
};

/* ── Quick chips ── */
const suggestions = [
  { question: 'About Arkevion Technology' },
  { question: 'Our Services' },
  { question: 'E-Commerce Development' },
  { question: 'Pricing & Quotes' },
  { question: 'Project Process' },
  { question: 'Technology Stack' },
  { question: 'Internship Domains' },
  { question: 'Contact Details' },
  { question: 'Support & Maintenance' },
];

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function has(q, words) {
  return words.some((w) => q.includes(w));
}

function findAnswer(input) {
  const q = normalize(input);
  if (!q) return A.fallback;

  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)$/.test(q)) return A.greeting;
  if (has(q, ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect']))  return A.thanks;
  if (has(q, ['bye', 'goodbye', 'see you', 'take care', 'later']))              return A.bye;
  if (has(q, ['ecommerce', 'e commerce', 'online store', 'online shop', 'sell online', 'shop', 'marketplace', 'amazon', 'flipkart', 'shopping cart', 'product'])) return A.ecommerce;
  if (has(q, ['price', 'pricing', 'cost', 'charge', 'fee', 'rate', 'budget', 'quote', 'estimate', 'how much'])) return A.pricing;
  if (has(q, ['package', 'packages', 'plan', 'plans', 'basic', 'standard', 'premium', 'tier']))                  return A.pricing_packages;
  if (has(q, ['timeline', 'how long', 'duration', 'time', 'days', 'weeks', 'delivery time', 'how fast', 'when']))return A.timeline;
  if (has(q, ['internship', 'intern', 'training', 'domain', 'course', 'learn', 'certificate']))                  return A.internship;
  if (has(q, ['industry', 'industries', 'sector', 'field', 'niche', 'type of business', 'work with']))            return A.industries;
  if (has(q, ['contact', 'phone', 'number', 'whatsapp', 'call', 'email', 'reach', 'get in touch']))              return A.contact;
  if (has(q, ['service', 'solution', 'offer', 'provide', 'web', 'mobile', 'app', 'ui', 'ux', 'design', 'marketing', 'ai', 'automation', 'full stack'])) return A.services;
  if (has(q, ['where', 'location', 'office', 'based', 'remote', 'city', 'trichy', 'india', 'onsite', 'placed', 'place', 'address', 'situated', 'located', 'tamilnadu', 'tamil nadu', 'tiruchirappalli'])) return A.location;
  if (has(q, ['about', 'arkevion', 'company', 'who are', 'what is', 'tell me', 'mission']))                      return A.company;

  return A.fallback;
}

/* ── Component ── */
export default function ChatbotWidget() {
  const [open, setOpen]           = useState(false);
  const [input, setInput]         = useState('');
  const [messages, setMessages]   = useState([{ from: 'bot', text: A.greeting }]);
  const [typing, setTyping]       = useState(false);
  const inputRef  = useRef(null);
  const bottomRef = useRef(null);
  const chips     = useMemo(() => suggestions, []);

  const askQuestion = (question) => {
    setMessages((prev) => [...prev, { from: 'user', text: question }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(question);
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: answer }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    askQuestion(q);
  };

  const stopScroll = (e) => e.stopPropagation();

  return (
    <div
      className="fixed bottom-6 right-4 z-[70] sm:right-6"
      onWheel={stopScroll}
      onTouchMove={stopScroll}
    >
      {open && (
        <div className="mb-3 flex h-[calc(100svh-120px)] max-h-[520px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-2xl shadow-teal-900/15">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-teal-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bot size={18} />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Arkevion Assistant</p>
                <p className="text-[11px] text-teal-50">Official company chatbot</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 cursor-default overflow-y-auto overscroll-contain bg-[#f8fcfc] px-3 py-4">
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'rounded-br-md bg-teal-600 text-white'
                        : 'rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '160ms' }} />
                      <span className="h-2 w-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '320ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips — hidden while typing */}
            {!input.trim() && (
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Quick questions</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map(({ question }) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => askQuestion(question)}
                      className="rounded-full border border-teal-100 bg-white px-3 py-1.5 text-left text-xs font-semibold text-teal-700 hover:border-teal-300 hover:bg-teal-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Arkevion..."
              className="min-w-0 flex-1 cursor-text rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white hover:bg-teal-700"
              aria-label="Send question"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          window.setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="ml-auto flex h-14 min-w-[132px] items-center justify-center gap-2 rounded-full bg-teal-600 px-5 text-white shadow-xl shadow-teal-900/20 hover:bg-teal-700"
        aria-label="Open Arkevion chatbot"
      >
        {open ? <X size={20} /> : <MessageCircle size={21} />}
        <span className="text-xs font-bold tracking-wide">CHATBOT</span>
      </button>
    </div>
  );
}
