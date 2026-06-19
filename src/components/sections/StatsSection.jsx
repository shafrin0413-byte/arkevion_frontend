import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useCounter } from '../../hooks';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed', color: '#0d9488' },
  { value: 50,  suffix: '+', label: 'Happy Clients',      color: '#0891b2' },
  { value: 5,   suffix: '+', label: 'Years Experience',   color: '#0d9488' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', color: '#0891b2' },
];

const ease = [0.25, 0.46, 0.45, 0.94];

function StatCounter({ value, suffix, label, index }) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="relative text-center">
      <div className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-charcoal mb-1.5 leading-none">
        {count}<span className="text-gradient">{suffix}</span>
      </div>
      <p className="text-sm text-gray-400 font-medium tracking-wide">{label}</p>
      {index < stats.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gray-200" />
      )}
    </div>
  );
}

export default function StatsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-6 md:py-12 bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.04) 0%, transparent 70%)' }}
      />

      <div className="container-pad relative z-10">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="eyebrow">Our Numbers</span>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-4"
        >
          {stats.map((s, i) => (
            <StatCounter key={s.label} {...s} index={i} />
          ))}
        </m.div>

        {/* Static divider — no scaleX animation */}
        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35, ease }}
          className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-12"
        />
      </div>
    </section>
  );
}
