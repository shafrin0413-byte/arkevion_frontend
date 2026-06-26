import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star, MessageCircle } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Rahul Sharma', position: 'CEO', company: 'TechVentures India', content: 'Arkevion delivered our platform ahead of schedule with exceptional quality. The end product exceeded every expectation. Their technical expertise and attention to detail truly set them apart.', rating: 5, avatar: '/were/hr1.jpg' },
  { id: 2, name: 'Priya Nair', position: 'Founder', company: 'EduReach', content: "The UI/UX redesign transformed our engagement metrics completely. Bounce rate dropped 40% within the first month. Our users consistently praise the new interface's intuitiveness.", rating: 5, avatar: '/were/hr2.jpg' },
  { id: 3, name: 'Aditya Reddy', position: 'CTO', company: 'FinanceFlow', content: 'Top-notch full stack development. Seamless integrations and impressive performance optimization. The scalability of the solution has accommodated our rapid growth flawlessly.', rating: 5, avatar: '/were/hr3.jpg' },
  { id: 4, name: 'Vikram Singh', position: 'Director', company: 'LogiTrack', content: 'The AI automation solution saved us 200+ hours of manual work every month. ROI was clear within weeks. Their innovative approach and commitment to excellence is remarkable.', rating: 5, avatar: '/were/hr4.jpg' },
  { id: 5, name: 'Shafrin', position: 'Intern - Full Stack Developer', company: 'Arkevion Technology', content: 'Interning at Arkevion was a transformative experience. I worked on real client projects from day one, sharpened my React and Node.js skills, and received mentorship that genuinely accelerated my growth as a developer.', rating: 5, avatar: '/were/hr5.jpg' },
  { id: 6, name: 'Shivasri', position: 'Intern - Full Stack Developer', company: 'Arkevion Technology', content: 'The learning curve was steep in the best way possible. The team at Arkevion pushed me to think beyond textbooks. I left with a solid portfolio, a certificate, and confidence to take on any full stack challenge.', rating: 5, avatar: '/were/hr6.jpg' },
];

const ease = [0.25, 0.46, 0.45, 0.94];

const variants = {
  enter:  d => ({ x: d > 0 ? 56 : -56, opacity: 0, scale: 0.97 }),
  center: {   x: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
  exit:   d => ({ x: d < 0 ? 56 : -56, opacity: 0, scale: 0.97, transition: { duration: 0.35, ease } }),
};

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIdx(p => (p + 1) % testimonials.length); }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (d) => { setDir(d); setIdx(p => (p + d + testimonials.length) % testimonials.length); };
  const cur = testimonials[idx];

  return (
    <section ref={ref} className="section-pad bg-[#fafcfc] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[340px] h-[340px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[340px] h-[340px] opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)' }} />
      </div>

      <div className="container-pad relative z-10">
        <div className="text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="eyebrow"
          >
            <MessageCircle size={11} /> Testimonials
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13, ease }}
            className="section-title mt-4"
          >
            What Our Clients Say
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.21, ease }}
            className="text-gray-400 text-sm mt-3 max-w-md mx-auto"
          >
            Real feedback from real partnerships that drive real results.
          </m.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <m.div
              key={cur.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 text-center overflow-hidden"
            >
              <div className="absolute top-5 left-6 opacity-[0.07] pointer-events-none">
                <Quote size={56} className="text-teal-500" />
              </div>

              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: cur.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium mb-8 italic relative z-10">
                "{cur.content}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 shrink-0 ring-2 ring-white shadow-md">
                  <img src={cur.avatar} alt={cur.name} className="w-full h-full object-cover" onError={e => { e.currentTarget.style.display='none'; }} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-charcoal text-sm">{cur.name}</p>
                  <p className="text-xs text-gray-400">{cur.position}, {cur.company}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
            </m.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              aria-label="Previous"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === idx ? 'w-7 h-2 bg-teal-500' : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              aria-label="Next"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
