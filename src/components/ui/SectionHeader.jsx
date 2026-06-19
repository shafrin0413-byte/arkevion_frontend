import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SectionHeader({ tag, title, subtitle, center = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {tag && (
        <span className="eyebrow mb-4 inline-flex">
          <Sparkles size={12} />
          {tag}
        </span>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle text-gray-500 ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </m.div>
  );
}