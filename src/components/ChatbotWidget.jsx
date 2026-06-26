import { useMemo, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

const fallbackAnswer = "We couldn't find the requested information. Please contact our team for further assistance.";
const greetingAnswer = 'Hello! Welcome to Arkevion Technology. How may we assist today?';
const thanksAnswer = 'Welcome! We are happy to assist.';
const byeAnswer = 'Thank you for contacting Arkevion Technology. Have a great day!';
const internshipAnswer = 'Our internship domains include:\n• Web Development\n• Full Stack Development\n• Mobile Development\n• Digital Marketing\n• AI Automation\nWhich domain would be of interest? We are happy to provide more details.';
const companyAnswer = 'Arkevion Technology is a service-based technology company providing innovative software solutions, web applications, mobile applications, AI automation, UI/UX design, digital marketing, and IT consulting services.';
const servicesAnswer = 'Our services include:\n• Custom Software Development\n• Web Development\n• Mobile App Development\n• AI Automation\n• UI/UX Design\n• Digital Marketing\n• IT Consulting';
const contactAnswer = 'Our team can be contacted through the Contact page or WhatsApp at +91 88387 49824.';

const defaultChatbotQuestions = [
  { question: 'About Arkevion Technology' },
  { question: 'Services' },
  { question: 'Internship domains' },
  { question: 'Contact details' },
];

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s+-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasAny(query, keywords) {
  return keywords.some((keyword) => query.includes(keyword));
}

function findAnswer(input) {
  const query = normalize(input);
  if (!query) return fallbackAnswer;

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(query)) {
    return greetingAnswer;
  }

  if (hasAny(query, ['thanks', 'thank you', 'thank'])) {
    return thanksAnswer;
  }

  if (hasAny(query, ['bye', 'goodbye', 'see you'])) {
    return byeAnswer;
  }

  if (hasAny(query, ['internship', 'intern', 'training', 'domain', 'course'])) {
    return internshipAnswer;
  }

  if (
    hasAny(query, ['about arkevion', 'company', 'what do we do', 'what does arkevion do', 'who is arkevion'])
  ) {
    return companyAnswer;
  }

  if (hasAny(query, ['services', 'solutions', 'software', 'development'])) {
    return servicesAnswer;
  }

  if (hasAny(query, ['contact', 'phone', 'number', 'whatsapp', 'call', 'email'])) {
    return contactAnswer;
  }

  if (hasAny(query, ['arkevion', 'technology'])) {
    return companyAnswer;
  }

  return fallbackAnswer;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: greetingAnswer,
    },
  ]);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => defaultChatbotQuestions, []);

  const askQuestion = (question) => {
    const answer = findAnswer(question);
    setMessages((current) => [
      ...current,
      { from: 'user', text: question },
      { from: 'bot', text: answer },
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    askQuestion(question);
  };

  const keepScrollInsideChat = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed bottom-6 right-4 z-[70] sm:right-6"
      onWheel={keepScrollInsideChat}
      onTouchMove={keepScrollInsideChat}
    >
      {open && (
        <div className="mb-3 flex h-[520px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-2xl shadow-teal-900/15">
          <div className="flex items-center justify-between border-b border-gray-100 bg-teal-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bot size={18} />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">Arkevion Assistant</p>
                <p className="text-[11px] text-teal-50">Automated company help</p>
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

          <div className="flex-1 cursor-default overflow-y-auto overscroll-contain bg-[#f8fcfc] px-3 py-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={`${message.from}-${index}`} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.from === 'user'
                        ? 'rounded-br-md bg-teal-600 text-white'
                        : 'rounded-bl-md border border-gray-100 bg-white text-gray-700 shadow-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Quick questions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(({ question }) => (
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
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
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

      <button
        type="button"
        onClick={() => {
          setOpen((current) => !current);
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
