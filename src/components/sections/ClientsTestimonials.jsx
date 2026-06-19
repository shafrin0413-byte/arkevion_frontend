import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    position: 'CEO',
    company: 'TechVentures India',
    content: 'Arkevion delivered our platform ahead of schedule with exceptional quality. The end product exceeded every expectation. Their technical expertise truly sets them apart.',
    rating: 5,
    color: '#0d9488',
  },
  {
    name: 'Priya Nair',
    position: 'Founder',
    company: 'EduReach',
    content: 'The UI/UX redesign transformed our engagement metrics. Bounce rate dropped 40% within the first month. Our users consistently praise the new interface intuitiveness.',
    rating: 5,
    color: '#0891b2',
  },
  {
    name: 'Aditya Reddy',
    position: 'CTO',
    company: 'FinanceFlow',
    content: 'Top-notch full stack development. Seamless integrations and impressive performance optimization. The scalability has accommodated our rapid growth flawlessly.',
    rating: 5,
    color: '#7c3aed',
  },
  {
    name: 'Vikram Singh',
    position: 'Director',
    company: 'LogiTrack',
    content: 'The AI automation solution saved us 200+ hours of manual work every month. ROI was clear within weeks. Their innovative approach and commitment to excellence is remarkable.',
    rating: 5,
    color: '#0d9488',
  },
  {
    name: 'Sneha Patel',
    position: 'Marketing Head',
    company: 'BrandAxis',
    content: 'Our digital marketing campaigns with Arkevion tripled our leads in just two months. The team is proactive, creative, and genuinely invested in our success.',
    rating: 5,
    color: '#0891b2',
  },
  {
    name: 'Arjun Mehta',
    position: 'Co-Founder',
    company: 'StartupLaunch',
    content: 'From ideation to launch, Arkevion was a true partner. They built our MVP in record time and the quality was production-ready from day one. Highly recommended.',
    rating: 5,
    color: '#7c3aed',
  },
  {
    name: 'Shafrin',
    position: 'Intern - Full Stack Developer',
    company: 'Arkevion Technology',
    content: 'Interning at Arkevion was a transformative experience. I worked on real client projects from day one, sharpened my React and Node.js skills, and received mentorship that genuinely accelerated my growth as a developer.',
    rating: 5,
    color: '#0d9488',
  },
  {
    name: 'Shivasri',
    position: 'Intern - Full Stack Developer',
    company: 'Arkevion Technology',
    content: 'The learning curve was steep in the best way possible. The team at Arkevion pushed me to think beyond textbooks. I left with a solid portfolio, a certificate, and confidence to take on any full stack challenge.',
    rating: 5,
    color: '#0891b2',
  },
];

function TestimonialCard({ name, position, company, content, rating, color }) {
  return (
    <div
      className="relative flex-shrink-0 w-[78vw] sm:w-[340px] bg-white rounded-2xl border border-gray-100 p-5 mx-2"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-5 opacity-[0.08] pointer-events-none">
        <Quote size={36} style={{ color }} />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-4">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-charcoal leading-tight">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{position}, {company}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
      />
    </div>
  );
}

function MarqueeRow({ reverse }) {
  const cards = [...testimonials, ...testimonials];
  return (
    <div className="overflow-hidden">
      <div
        className="flex"
        style={{
          animation: reverse ? 'marqueeRev 32s linear infinite' : 'marqueeScroll 32s linear infinite',
          willChange: 'transform',
          width: 'max-content',
        }}
        onMouseEnter={e => { e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={e => { e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {cards.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsTestimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const ease   = [0.25, 0.46, 0.45, 0.94];

  return (
    <section ref={ref} className="py-6 md:py-10 bg-[#fafcfc] relative overflow-hidden">
      {/* Bg orbs */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.04) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="container-pad mb-6 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-center"
        >
          <span className="eyebrow">
            <Sparkles size={11} /> Our Clients
          </span>
          <h2 className="section-title mt-4">
            What our <span className="text-gradient">clients</span> say
          </h2>
          <p className="text-sm text-gray-400 mt-3 max-w-md mx-auto leading-relaxed">
            Real feedback from real partnerships that drive real results.
          </p>
        </m.div>
      </div>

      {/* Marquee rows */}
      <m.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="relative z-10"
      >
        <MarqueeRow reverse={false} />
      </m.div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-20"
        style={{ background: 'linear-gradient(to right, #fafcfc, transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-20"
        style={{ background: 'linear-gradient(to left, #fafcfc, transparent)' }} />

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0) translateZ(0); }
          100% { transform: translateX(-50%) translateZ(0); }
        }
        @keyframes marqueeRev {
          0%   { transform: translateX(-50%) translateZ(0); }
          100% { transform: translateX(0) translateZ(0); }
        }
      `}</style>
    </section>
  );
}
