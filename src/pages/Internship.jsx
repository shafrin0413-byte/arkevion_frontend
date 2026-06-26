import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Award, Bot, Code2, Layers, Palette, Smartphone, TrendingUp, Users, FolderKanban, ArrowRight, Briefcase, X, CheckCircle2, Clock, Monitor, Send } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const programs = [
  { Icon: Code2,      title: 'Web Development',       duration: '1–3 Months', mode: 'Online / Offline', body: 'HTML, CSS, JS, React, Node — real projects from day one.',                     offerings: ['HTML5, CSS3 & Responsive Design','JavaScript (ES6+) & DOM Manipulation','React.js — Components, Hooks, State','Node.js & Express REST APIs','Git & Version Control','Real client project deployment','Internship certificate on completion'] },
  { Icon: Layers,     title: 'Full Stack Development', duration: '2–3 Months', mode: 'Online / Offline', body: 'React, Node.js, Express, MongoDB — complete end-to-end apps.',                 offerings: ['React.js frontend with Tailwind CSS','Node.js + Express backend APIs','MongoDB & Mongoose ORM','JWT Authentication & Security','Cloud deployment (AWS / Render)','End-to-end project ownership','Letter of recommendation'] },
  { Icon: Palette,    title: 'UI/UX Design',           duration: '1–2 Months', mode: 'Online',           body: 'Figma, user research, prototyping, and design systems.',                       offerings: ['Figma — Frames, Components, Auto Layout','User Research & Persona creation','Wireframing & Prototyping','Design Systems & Style Guides','Usability Testing','Portfolio-ready case study','Internship certificate'] },
  { Icon: TrendingUp, title: 'Digital Marketing',      duration: '1 Month',    mode: 'Online',           body: 'SEO, social media, Google Ads, and analytics.',                                offerings: ['SEO — On-page & Off-page','Google Ads & Meta Ads','Social Media Strategy','Content Marketing & Copywriting','Google Analytics & Data Insights','Live campaign management','Certificate & recommendation letter'] },
  { Icon: Bot,        title: 'AI & Automation',        duration: '2 Months',   mode: 'Online',           body: 'Python, ML basics, automation tools, and real use cases.',                    offerings: ['Python for Data & Automation','Machine Learning fundamentals','OpenAI API & LLM integration','Workflow automation tools','Web scraping & data pipelines','AI product mini-project','Internship certificate'] },
  { Icon: Smartphone, title: 'Mobile Development',     duration: '1–2 Months', mode: 'Online',           body: 'Mobile-first app screens, React Native basics, APIs, and deployment workflows.', offerings: ['Mobile UI patterns and responsive layouts','React Native fundamentals','API integration and authentication','Android app build basics','Testing on mobile devices','Portfolio-ready mobile app project','Certificate & recommendation letter'] },
];

function ProgramModal({ prog, onClose }) {
  const { Icon, title, duration, mode, body, offerings } = prog;
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/50 backdrop-blur-sm sm:items-center" onClick={onClose} data-lenis-prevent>
      <m.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }} transition={{ duration: 0.25, ease }}
        onClick={e => e.stopPropagation()} className="modal-scroll my-4 max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="p-6" style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-black text-white leading-tight">{title}</h2>
                <p className="text-xs text-white/70 mt-0.5">{body}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shrink-0 ml-2">
              <X size={14} className="text-white" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"><Clock size={10} /> {duration}</span>
            <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"><Monitor size={10} /> {mode}</span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-4">What's Included</p>
          <ul className="space-y-2.5">
            {offerings.map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="text-teal-600 shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
          <a href="https://forms.gle/Rx51aevYp1SnkTrR7" target="_blank" rel="noopener noreferrer" className="mt-6 btn-primary w-full justify-center">
            Apply via Google Form <ArrowRight size={14} />
          </a>
        </div>
      </m.div>
    </m.div>
  );
}

function CertificateModal({ onClose }) {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={onClose} data-lenis-prevent>
      <m.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }} transition={{ duration: 0.25, ease }}
        onClick={e => e.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
          <p className="text-sm font-bold text-charcoal">Demo Certificate</p>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-charcoal" aria-label="Close certificate preview">
            <X size={16} />
          </button>
        </div>
        <div className="flex max-h-[72svh] items-center justify-center bg-gray-50 p-3 sm:p-4">
          <img src="/Internship.png" alt="Demo Certificate" className="max-h-[60svh] w-full rounded-xl border border-gray-100 bg-white object-contain shadow-sm" />
        </div>
      </m.div>
    </m.div>
  );
}

const initialForm = { full_name: '', email: '', phone: '', college: '', degree: '', year_of_study: '', internship: '', skills: '' };

export default function Internship() {
  const [selected, setSelected] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [form, setForm] = useState(initialForm);
  useEffect(() => window.scrollTo(0, 0), []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*Internship Application*\n\n*Name:* ${form.full_name}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n*College:* ${form.college}\n*Degree:* ${form.degree}\n*Year of Study:* ${form.year_of_study}\n*Program:* ${form.internship}\n*Skills:* ${form.skills}\n*Motivation:* ${form.motivation}\n*Portfolio:* ${form.portfolio_url || 'N/A'}`;
    window.open(`https://wa.me/918838749824?text=${encodeURIComponent(msg)}`, '_blank');
    setForm(initialForm);
  };

  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><Briefcase size={11} /> Internship Programs</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            Learn by doing.<br /><span className="text-gradient">Launch your career.</span>
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 text-sm text-gray-400 max-w-xl leading-relaxed">
            Real projects, real mentorship, real certificate. Not just theory — actual industry experience from day one.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Programs */}
      <section className="py-6 sm:py-14">
        <div className="container-pad">
          <div className="flex items-center gap-2 mb-2">
            <span className="eyebrow"><ArrowRight size={10} /> Available Programs</span>
          </div>
          <p className="text-xs text-gray-400 mt-3 mb-8">Click any card to see full details</p>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
            {programs.map((prog, i) => {
              const { Icon, title, duration, mode, body } = prog;
              return (
                <m.article key={title}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                  onClick={() => setSelected(prog)}
                  whileHover={{ y: -5 }}
                  className="group svc-card p-4 sm:p-6 cursor-pointer"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="mb-2.5 sm:mb-3 inline-flex rounded-xl bg-teal-50 p-2 sm:p-2.5 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon size={16} />
                  </div>
                  <h2 className="font-bold text-charcoal text-xs sm:text-sm leading-tight">{title}</h2>
                  <div className="mt-1.5 sm:mt-2 flex flex-wrap gap-1">
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-teal-600">{duration}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-gray-500 hidden sm:inline-flex">{mode}</span>
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-gray-400 line-clamp-2 sm:line-clamp-none">{body}</p>
                  <p className="mt-3 text-xs font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                    View details <ArrowRight size={11} />
                  </p>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-6 sm:py-14 bg-[#fafcfc]">
        <div className="container-pad">
          <div className="text-center mb-10">
            <span className="eyebrow"><Award size={10} /> What You Get</span>
            <h2 className="section-title mt-4">More than just <span className="text-gradient">training.</span></h2>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
            {[[Award, 'Certificate', 'Industry-recognised completion certificate for your portfolio and resume.'],
              [FolderKanban, 'Real Projects', 'Work on live client projects — not dummy exercises.'],
              [Users, 'Mentorship', 'Direct guidance from working professionals in the industry.'],
            ].map(([BenIcon, title, body], i) => {
              const isCertificate = title === 'Certificate';
              return (
              <m.div key={title}
                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={viewport}
                whileHover={{ y: -5 }}
                onClick={isCertificate ? () => setShowCertificate(true) : undefined}
                role={isCertificate ? 'button' : undefined}
                tabIndex={isCertificate ? 0 : undefined}
                onKeyDown={isCertificate ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowCertificate(true);
                  }
                } : undefined}
                className={`svc-card p-4 sm:p-7 text-center ${isCertificate ? 'cursor-pointer' : 'cursor-default'}`}
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="mx-auto mb-3 sm:mb-4 inline-flex rounded-xl bg-teal-50 p-2.5 sm:p-3 text-teal-600"><BenIcon size={18} /></div>
                <h3 className="font-bold text-charcoal text-xs sm:text-base">{title}</h3>
                <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-gray-400 line-clamp-2 sm:line-clamp-none">{body}</p>
              </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="py-6 sm:py-14">
        <div className="container-pad grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* Steps */}
          <div>
            <span className="eyebrow"><Briefcase size={10} /> How to Apply</span>
            <h2 className="section-title mt-4 mb-8">Three steps to <span className="text-gradient">get started.</span></h2>
            <div className="space-y-4">
              {[['Fill the form', 'Fill in your details in the Apply Now form on the right.'],
                ['We review',     "We'll get back to you within 48 hours with next steps."],
                ['Start learning','Begin your internship and work on real projects.'],
              ].map(([title, desc], i) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center font-black text-sm shrink-0">0{i + 1}</div>
                  <div>
                    <p className="font-bold text-charcoal text-sm">{title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://forms.gle/Rx51aevYp1SnkTrR7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50 p-5 hover:bg-teal-100 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center shrink-0 group-hover:bg-teal-600 transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                  <path d="M8 12h8v1.5H8zm0 3h8v1.5H8zm0 3h5v1.5H8z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-teal-700">Apply via Google Form</p>
                <p className="text-xs text-teal-600/70 mt-0.5">Takes less than 3 minutes to complete</p>
              </div>
              <ArrowRight size={16} className="text-teal-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Apply Now Form */}
          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-charcoal mb-1">Apply Now</h3>
            <p className="text-sm text-gray-400 mb-5">Fill in your details — we'll get back within 48 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[['full_name','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['college','College / University','text'],['degree','Degree / Course','text'],['year_of_study','Year of Study','text']].map(([name, label, type]) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange} required placeholder={`Enter your ${label.toLowerCase()}`} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-colors" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Program of Interest</label>
                <select name="internship" value={form.internship} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-colors bg-white">
                  <option value="">Select a program</option>
                  {programs.map(({ title }) => <option key={title} value={title}>{title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Skills & Technologies</label>
                <textarea name="skills" value={form.skills} onChange={handleChange} rows={2} placeholder="List your relevant skills..." className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-colors resize-none" />
              </div>

              <button type="submit" className="btn-primary justify-center w-full">
                Submit via WhatsApp <Send size={14} />
              </button>
            </form>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {selected && <ProgramModal prog={selected} onClose={() => setSelected(null)} />}
        {showCertificate && <CertificateModal onClose={() => setShowCertificate(false)} />}
      </AnimatePresence>
    </div>
  );
}
