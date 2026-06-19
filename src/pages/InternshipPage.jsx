import { useState } from 'react';
import { m } from 'framer-motion';
import { Code2, Palette, TrendingUp, Layers, Zap, CheckCircle2, Clock, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const categories = [
  { icon: Code2, title: 'Frontend Development', duration: '3 months', type: 'Stipend Based', description: 'Master React, Tailwind CSS, animations, and modern web development practices.', gradient: 'from-blue-500/20 to-teal-500/20', accent: '#3B82F6' },
  { icon: Layers, title: 'Full Stack Development', duration: '6 months', type: 'Paid', description: 'Learn end-to-end development with React, Node.js, databases, and cloud deployment.', gradient: 'from-purple-500/20 to-teal-500/20', accent: '#8B5CF6' },
  { icon: Palette, title: 'UI/UX Design', duration: '3 months', type: 'Stipend Based', description: 'Figma, design systems, user research, prototyping, and design thinking.', gradient: 'from-pink-500/20 to-teal-500/20', accent: '#EC4899' },
  { icon: TrendingUp, title: 'Digital Marketing', duration: '2 months', type: 'Stipend Based', description: 'SEO, Google Ads, social media strategy, analytics, and content marketing.', gradient: 'from-amber-500/20 to-teal-500/20', accent: '#F59E0B' },
  { icon: Zap, title: 'AI & Machine Learning', duration: '4 months', type: 'Paid', description: 'Python, ML frameworks, LLM integration, automation, and AI product development.', gradient: 'from-violet-500/20 to-teal-500/20', accent: '#7C3AED' },
];

const benefits = [
  'Real-world project experience',
  'Mentorship from industry professionals',
  'Internship certificate on completion',
  'Letter of recommendation',
  'Placement assistance',
  'Access to premium learning resources',
  'Flexible remote/hybrid options',
  'Networking opportunities',
];

const roadmap = [
  { phase: 'Week 1-2', title: 'Onboarding & Foundations', description: 'Environment setup, codebase walkthrough, team introductions, and foundations.' },
  { phase: 'Week 3-6', title: 'Core Learning', description: 'Structured learning with hands-on tasks, daily standups, and mentor reviews.' },
  { phase: 'Week 7-10', title: 'Project Assignment', description: 'Work on a real client-facing or internal project with increasing responsibility.' },
  { phase: 'Week 11-12', title: 'Delivery & Review', description: 'Present your work, receive feedback, complete evaluation, and get certified.' },
];

const initialForm = {
  full_name: '', email: '', phone: '', college: '', degree: '',
  year_of_study: '', skills: '', motivation: '', portfolio_url: '',
  internship: '',
};

export default function InternshipPage() {
  useLenis();
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*Internship Application*

*Name:* ${form.full_name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*College:* ${form.college}
*Degree:* ${form.degree}
*Year of Study:* ${form.year_of_study}
*Program:* ${form.internship}
*Skills:* ${form.skills}
*Motivation:* ${form.motivation}
*Portfolio:* ${form.portfolio_url || 'N/A'}`;
    const url = `https://wa.me/918838749824?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setForm(initialForm);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <PageHeroBanner className="pt-24 pb-16 bg-white">
        <div className="container-pad relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">
              <Sparkles size={12} />
              Internship Programs
            </span>
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mt-4 mb-4"
          >
            Launch Your <span className="text-gradient">Tech Career</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl"
          >
            Industry-aligned internship programs designed to bridge the gap between education and real-world tech careers.
          </m.p>
        </div>
      </PageHeroBanner>

      {/* Programs Cards */}
      <section className="pb-12 bg-white">
        <div className="container-pad">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(({ icon: Icon, title, duration, type, description, gradient, accent }, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="glass-card p-7 group"
              >
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  style={{ boxShadow: `0 4px 20px ${accent}20` }}
                >
                  <Icon size={24} className="text-teal-600" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1a1a2e] mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{description}</p>
                <div className="flex gap-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                    <Clock size={11} /> {duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    {type}
                  </span>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Roadmap */}
      <section className="section-pad bg-gradient-to-b from-[#fafbfc] to-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Benefits */}
            <div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="eyebrow">
                  <Sparkles size={12} />
                  Benefits
                </span>
              </m.div>
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="section-title mt-4 mb-8"
              >
                Why Intern at <span className="text-gradient">Arkevion</span>
              </m.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <m.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="glass-card p-3.5 flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors duration-300">
                      <CheckCircle2 size={15} className="text-teal-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </m.div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="eyebrow">Roadmap</span>
              </m.div>
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="section-title mt-4 mb-10"
              >
                Your <span className="text-gradient">Journey</span>
              </m.h2>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-teal-200 via-teal-100 to-transparent" />
                {roadmap.map(({ phase, title, description }, i) => (
                  <m.div
                    key={phase}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex gap-5 pb-8 relative group"
                  >
                    <div className="relative z-10">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen size={15} className="text-white" />
                      </div>
                      {i < roadmap.length - 1 && (
                        <div className="absolute left-[22px] top-[50px] w-[6px] h-[6px] rounded-full bg-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </div>
                    <div className="pt-0.5">
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{phase}</span>
                      <h4 className="font-display font-bold text-[#1a1a2e] mt-0.5 mb-1">{title}</h4>
                      <p className="text-sm text-gray-400">{description}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Form */}
      <section className="section-pad bg-gradient-to-b from-[#fafbfc] to-white" id="apply">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="eyebrow"><Sparkles size={12} /> Apply Now</span>
            <h2 className="section-title mt-4 mb-3">Start Your Application</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Fill in your details — we'll get back within 48 hours.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { name: 'full_name', label: 'Full Name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
                  { name: 'college', label: 'College / University', type: 'text', required: true },
                  { name: 'degree', label: 'Degree / Course', type: 'text', required: true },
                  { name: 'year_of_study', label: 'Year of Study', type: 'text', required: true },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange} required={required} className="input-premium" placeholder={`Enter your ${label.toLowerCase()}`} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Program of Interest</label>
                <select name="internship" value={form.internship} onChange={handleChange} required className="input-premium bg-white">
                  <option value="">Select a program</option>
                  {categories.map(({ title }) => <option key={title} value={title}>{title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills & Technologies</label>
                <textarea name="skills" value={form.skills} onChange={handleChange} rows={3} placeholder="List your relevant skills..." className="input-premium resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Why do you want to intern at Arkevion?</label>
                <textarea name="motivation" value={form.motivation} onChange={handleChange} required rows={3} placeholder="Tell us your motivation..." className="input-premium resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Portfolio / GitHub URL (optional)</label>
                <input type="url" name="portfolio_url" value={form.portfolio_url} onChange={handleChange} placeholder="https://github.com/yourprofile" className="input-premium" />
              </div>

              <button type="submit" className="btn-premium justify-center w-full py-4 text-base">
                <span className="flex items-center gap-2">Apply via WhatsApp <ArrowRight size={16} /></span>
              </button>
            </form>
          </m.div>
        </div>
      </section>
    </PageTransition>
  );
}