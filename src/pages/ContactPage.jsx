import { useState } from 'react';
import { m } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLenis } from '../hooks';
import PageTransition from '../components/ui/PageTransition';
import PageHeroBanner from '../components/ui/PageHeroBanner';
import { contactAPI } from '../api';
import { slideInLeft, slideInRight } from '../utils/animations';

const initialForm = { name: '', email: '', phone: '', company: '', subject: '', message: '', service_interest: '' };
const services = ['Web Development', 'Full Stack Development', 'UI/UX Design', 'Digital Marketing', 'AI Automation', 'Software Solutions'];

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 outline-none transition-all text-sm bg-white text-gray-800 placeholder:text-gray-300";

export default function ContactPage() {
  useLenis();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactAPI.submit(form);
      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeroBanner className="pt-24 pb-24 bg-white">
        <div className="container-pad">
          <div className="grid lg:grid-cols-5 gap-16">
            <m.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <span className="text-xs font-semibold text-teal-primary uppercase tracking-widest mb-4 block">Contact</span>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 leading-tight mb-6">
                Let's work<br />together
              </h1>
              <p className="text-gray-400 leading-relaxed mb-12">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: 'Email', value: 'arkeviontech@gmail.com', href: 'mailto:arkeviontech@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 88387 49824', href: 'tel:+918838749824' },
                  { icon: MapPin, label: 'Location', value: 'Trichy, Tamilnadu , India' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-teal-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-gray-700 hover:text-teal-primary transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={15} />
                Chat on WhatsApp
              </a>
            </m.div>

            <m.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              {success ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 rounded-2xl bg-teal-50 border border-teal-100"
                >
                  <CheckCircle2 size={48} className="text-teal-primary mb-4" />
                  <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">Message Sent</h3>
                  <p className="text-gray-400 text-sm max-w-xs">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="btn-outline mt-8 text-sm py-2.5 px-6">
                    Send Another
                  </button>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5">Company</label>
                      <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company name" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Service</label>
                    <select name="service_interest" value={form.service_interest} onChange={handleChange} className={inputClass}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your project..." className={`${inputClass} resize-none`} />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-4">
                    <Send size={15} />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </m.div>
          </div>
        </div>
      </PageHeroBanner>
    </PageTransition>
  );
}
