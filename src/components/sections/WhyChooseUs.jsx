import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { ShieldCheck, Rocket, Clock, Award, Info, Check } from 'lucide-react';

const reasons = [
  { icon: ShieldCheck, title: 'Quality First',    description: 'Rigorous QA and code reviews on every project. We never compromise on quality.',             color: '#0d9488' },
  { icon: Rocket,      title: 'On-Time Delivery', description: 'Agile process that respects your deadlines. We deliver what we promise, when we promise.',   color: '#0891b2' },
  { icon: Clock,       title: '24/7 Support',     description: "Post-launch support so you never hit a wall. We're always here when you need us.",           color: '#0d9488' },
  { icon: Award,       title: 'Proven Results',   description: 'Track record across 50+ completed projects with practical delivery, clean communication, and measurable outcomes.', color: '#0891b2' },
];

const features = [
  'Transparent communication', 'Agile development',
  'Modern tech stack',         'Performance optimized',
  'SEO friendly',              'Mobile-first approach',
  'Scalable architecture',     'Ongoing maintenance',
];

const ease = [0.25, 0.46, 0.45, 0.94];

export default function WhyChooseUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className="py-6 md:py-12 bg-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.03) 0%, transparent 70%)' }}
      />

      <div className="container-pad relative z-10">
        <div className="mx-auto max-w-5xl">

          {/* Left */}
          <div>
            <m.span
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease }}
              className="eyebrow"
            >
              <Info size={11} /> Why Us
            </m.span>

            <m.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08, ease }}
              className="section-title mt-4 mb-5"
            >
              Built <span className="text-gradient">different.</span><br />
              Delivered better.
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.14, ease }}
              className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md"
            >
              We don't just build — we partner. Every engagement is backed by transparent
              communication, technical excellence, and a commitment to your success.
            </m.p>

            {/* Checklist — single fade-in block, no per-item stagger */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2, ease }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-6 sm:mb-8"
            >
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-teal-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 leading-tight">{f}</span>
                </div>
              ))}
            </m.div>

            {/* Reason cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {reasons.map(({ icon: Icon, title, description, color }, i) => (
                <m.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease }}
                  className="glass-card p-3.5 sm:p-5 group cursor-default"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-250 group-hover:scale-110"
                    style={{ background: `${color}10`, color }}
                  >
                    <Icon size={18} />
                  </div>
                  <h4 className="font-bold text-sm text-charcoal mb-1">{title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                </m.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
