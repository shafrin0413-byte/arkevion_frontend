import { m } from 'framer-motion';
import { useCounter } from '../../hooks';
import { scaleIn } from '../../utils/animations';

export default function StatCard({ value, label, suffix = '+', delay = 0 }) {
  const { count, ref } = useCounter(value);

  return (
    <m.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center p-6"
    >
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-500 font-medium text-sm">{label}</p>
    </m.div>
  );
}
