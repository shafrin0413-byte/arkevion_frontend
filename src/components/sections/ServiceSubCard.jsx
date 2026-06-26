import { m } from 'framer-motion';
import { fadeUp, viewport } from '../../utils/animations';

export default function ServiceSubCard({ Icon, title, body, color, index = 0 }) {
  return (
    <m.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="glass-card group relative flex flex-col gap-4 p-5 sm:p-6"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* icon */}
      <div
        className="inline-flex w-11 h-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 shrink-0"
        style={{ background: `${color}12`, color }}
      >
        <Icon size={20} />
      </div>

      {/* text */}
      <div>
        <h3 className="mb-1.5 text-sm font-bold leading-snug text-charcoal transition-colors duration-200 group-hover:text-teal-600 sm:text-base">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">{body}</p>
      </div>

      {/* teal accent top-right glow on hover */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-tr-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at top right, ${color}18, transparent 70%)` }}
      />
    </m.div>
  );
}
