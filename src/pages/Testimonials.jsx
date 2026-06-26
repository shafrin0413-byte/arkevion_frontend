import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Star, ArrowRight, MessageCircle, Send, X, ImagePlus } from 'lucide-react';
import { fadeUp, viewport } from '../utils/animations';
import { testimonialsAPI } from '../api';
import MobileConnectionBackground from '../components/ui/MobileConnectionBackground';
import PageHeroBanner from '../components/ui/PageHeroBanner';

const ease = [0.25, 0.46, 0.45, 0.94];

const REVIEW_STORAGE_KEY = 'arkevion_testimonial_reviews';

const defaultTestimonials = [
  { name: 'Ravi M.', role: 'Founder, Trichy', quote: 'Arkevion delivered our website on time and beyond expectations. Their attention to detail is remarkable.', avatar: '/were/hr1.jpg', rating: 5 },
  { name: 'Priya S.', role: 'CEO', quote: 'The app they built scaled to 10,000 users without any issues. Solid team, solid execution.', avatar: '/were/hr2.jpg', rating: 5 },
  { name: 'Arjun K.', role: 'Product Lead', quote: 'Fast, clean, and professional. Exactly what we needed, no drama, just results.', avatar: '/were/hr3.jpg', rating: 5 },
  { name: 'Meena R.', role: 'Startup Founder', quote: "Their UI/UX team completely transformed our product's user experience. Retention improved 40%.", avatar: '/were/hr4.jpg', rating: 5 },
  { name: 'Karthik V.', role: 'Intern Graduate', quote: 'Best internship experience. I learned more in 2 months here than in my entire final year.', avatar: '/were/hr5.jpg', rating: 5 },
  { name: 'Sundar P.', role: 'Operations Manager', quote: 'The AI automation they built saved us 10+ hours every single week. ROI was immediate.', avatar: '/were/hr6.jpg', rating: 5 },
  { name: 'Shafrin', role: 'Intern - Full Stack Developer, Arkevion', quote: 'Interning at Arkevion was a transformative experience. I worked on real client projects from day one, sharpened my React and Node.js skills, and received mentorship that genuinely accelerated my growth as a developer.', avatar: '/were/hr7.jpg', rating: 5 },
  { name: 'Shivasri', role: 'Intern - Full Stack Developer, Arkevion', quote: 'The learning curve was steep in the best way possible. The team at Arkevion pushed me to think beyond textbooks. I left with a solid portfolio, a certificate, and confidence to take on any full stack challenge.', avatar: '/were/hr8.jpg', rating: 5 },
];

const normalizeReview = (item) => ({
  id: item.id || `${item.name}-${item.created_at || item.quote || item.content}`,
  name: item.name || 'Client',
  role: item.role || [item.position, item.company].filter(Boolean).join(', ') || 'Client Review',
  quote: item.quote || item.content || item.message || '',
  rating: Number(item.rating) || 5,
  avatar: item.avatar || item.image || '/were/hr1.jpg',
});

export default function Testimonials() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [apiReviews, setApiReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', quote: '', rating: 5, avatar: '' });

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(REVIEW_STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setUserReviews(saved.map(normalizeReview).filter((item) => item.quote));
    } catch {
      setUserReviews([]);
    }
  }, []);

  useEffect(() => {
    let active = true;

    testimonialsAPI.getAll()
      .then(({ data }) => {
        const reviews = Array.isArray(data) ? data : data?.results;
        if (active && Array.isArray(reviews)) {
          setApiReviews(reviews.map(normalizeReview).filter((item) => item.quote));
        }
      })
      .catch(() => {
        if (active) setApiReviews([]);
      });

    return () => {
      active = false;
    };
  }, []);

  const testimonials = useMemo(() => {
    const userOnly = userReviews.filter((review) => !apiReviews.some((apiReview) => apiReview.id === review.id));
    return [...userOnly, ...apiReviews, ...defaultTestimonials];
  }, [apiReviews, userReviews]);
  const averageRating = useMemo(() => {
    const total = testimonials.reduce((sum, item) => sum + item.rating, 0);
    return (total / testimonials.length).toFixed(1);
  }, [testimonials]);
  const visibleTestimonials = testimonials.slice(0, 10);
  const hasMoreTestimonials = testimonials.length > 10;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const review = {
      name: form.name.trim(),
      role: form.role.trim() || 'Client Review',
      quote: form.quote.trim(),
      rating: form.rating,
      avatar: form.avatar || '/were/hr1.jpg',
      id: Date.now(),
    };

    if (!review.name || !review.quote) return;

    setSubmitting(true);

    try {
      const { data } = await testimonialsAPI.submit(review);
      const savedReview = normalizeReview(data || review);
      setApiReviews((prev) => [savedReview, ...prev]);
    } catch {
      const nextReviews = [review, ...userReviews];
      setUserReviews(nextReviews);
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(nextReviews));
    } finally {
      setSubmitting(false);
      setForm({ name: '', role: '', quote: '', rating: 5, avatar: '' });
      setShowReviewForm(false);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const closeReviewForm = () => setShowReviewForm(false);

  return (
    <div className="w-full bg-white">
      <PageHeroBanner className="bg-white py-6 sm:py-10">
        <MobileConnectionBackground />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />
        <div className="container-pad relative z-10">
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <span className="eyebrow"><MessageCircle size={11} /> Client Stories</span>
          </m.div>
          <m.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.09, ease }} className="mt-5 section-title">
            What Our Clients Say
          </m.h1>
          <m.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.17, ease }} className="mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Real feedback from clients, interns, and partners who trusted Arkevion Technology to design, build, automate, market, and deliver practical digital outcomes.
          </m.p>
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.21, ease }} className="mt-5 max-w-2xl">
            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="btn-primary"
            >
              Write a review <Star size={15} fill="currentColor" />
            </button>
          </m.div>
          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24, ease }} className="mt-6 inline-flex items-center gap-3 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-sm font-bold text-charcoal">{averageRating}</span>
            <span className="text-xs text-gray-400">from {testimonials.length} reviews</span>
          </m.div>
        </div>
      </PageHeroBanner>

      <AnimatePresence>
        {showReviewForm && (
          <m.div
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeReviewForm}
            data-lenis-prevent
          >
            <m.form
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.25, ease }}
              onSubmit={handleSubmit}
              onMouseDown={(event) => event.stopPropagation()}
              className="modal-scroll relative my-2 max-h-[calc(100svh-3rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-2xl sm:p-7"
              data-lenis-prevent
            >
              <button
                type="button"
                onClick={closeReviewForm}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-white text-black transition hover:bg-gray-50"
                aria-label="Close review form"
              >
                <X size={17} />
              </button>

              <div className="pr-10">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600">Share your experience</p>
                <h2 className="mt-2 text-2xl font-extrabold text-black">Write a review</h2>
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-teal-50 ring-2 ring-white shadow-md">
                  <img src={form.avatar || '/were/hr1.jpg'} alt="Review profile preview" className="h-full w-full object-cover" />
                </div>
                <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-teal-100 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50">
                  <ImagePlus size={16} />
                  Add profile photo
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
                </label>
              </div>

              <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, rating: value }))}
                      className="rounded-lg p-1 text-yellow-400 transition-transform hover:scale-110"
                      aria-label={`${value} star review`}
                    >
                      <Star size={25} fill={value <= form.rating ? 'currentColor' : 'none'} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-black">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-black">Role</span>
                  <input
                    value={form.role}
                    onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                    className="input-field"
                    placeholder="Founder, Client, Intern..."
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-black">Review</span>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm((prev) => ({ ...prev, quote: e.target.value }))}
                  className="input-field resize-none"
                  placeholder="Type your review..."
                />
              </label>

              <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
                {submitting ? 'Posting...' : 'Post review'} <Send size={15} />
              </button>
            </m.form>
          </m.div>
        )}
      </AnimatePresence>

      <section className="py-8 sm:py-14">
        <div className="container-pad grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map(({ id, name, role, quote, avatar, rating }, i) => (
            <m.article
              key={id || name}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              whileHover={{ y: -5 }}
              className="svc-card relative flex flex-col rounded-2xl border border-gray-100 bg-white p-7 cursor-default"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="absolute right-5 top-4 select-none text-6xl font-black leading-none text-teal-500/[0.07]">"</span>
              <div className="mb-4 flex gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} fill={j < rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-gray-500">"{quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-teal-600 ring-2 ring-white shadow-md">
                  <img src={avatar} alt={name} className="h-full w-full object-cover" onError={e => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </m.article>
          ))}
        </div>
        {hasMoreTestimonials && (
          <div className="container-pad mt-8 flex flex-col items-center gap-3 text-center">
            <div className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
              {testimonials.length}+ client and intern stories
            </div>
            <button type="button" onClick={() => setShowAllTestimonials(true)} className="btn-outline">
              View All Testimonials <ArrowRight size={14} />
            </button>
          </div>
        )}
      </section>

      <AnimatePresence>
        {showAllTestimonials && (
          <m.div
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setShowAllTestimonials(false)}
            data-lenis-prevent
          >
            <m.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.25, ease }}
              onMouseDown={(event) => event.stopPropagation()}
              className="modal-scroll relative my-2 max-h-[calc(100svh-3rem)] w-full max-w-6xl overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-7"
              data-lenis-prevent
            >
              <button
                type="button"
                onClick={() => setShowAllTestimonials(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-white text-black transition hover:bg-gray-50"
                aria-label="Close testimonials"
              >
                <X size={17} />
              </button>
              <div className="pr-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">All Testimonials</p>
                <h2 className="mt-2 text-2xl font-bold text-black">{testimonials.length}+ Arkevion stories</h2>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {testimonials.map(({ id, name, role, quote, avatar, rating }, i) => (
                  <article key={id || `${name}-${i}`} className="svc-card p-5">
                    <div className="mb-3 flex gap-0.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} fill={j < rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">"{quote}"</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-teal-600">
                        <img src={avatar} alt={name} className="h-full w-full object-cover" onError={e => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{name}</p>
                        <p className="text-xs text-gray-400">{role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <section className="bg-[#fafcfc] py-6 sm:py-14">
        <div className="container-pad">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease }}
            className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl p-10 sm:flex-row sm:items-center sm:p-14"
            style={{ background: 'linear-gradient(135deg, #0c1a29 0%, #0d4a42 60%, #0c1a29 100%)', boxShadow: '0 24px 72px rgba(13,148,136,0.20)' }}
          >
            <div className="glow-orb h-56 w-56" style={{ top: '-50px', right: '-30px', background: 'rgba(20,184,166,0.15)' }} />
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Become our next success story.</h2>
              <p className="mt-2 text-sm text-white/70">Join the businesses that chose Arkevion and saw real results.</p>
            </div>
            <Link to="/contact" className="btn-primary relative z-10 shrink-0">
              Start a project <ArrowRight size={15} />
            </Link>
          </m.div>
        </div>
      </section>
    </div>
  );
}
