import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, description, path, index = 0, gradient = 'from-teal-500/20 to-teal-500/20', accent = '#1F8A9E' }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-5% 0px' });

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass-card group"
    >
      <Link to={path || '/services'} className="block p-6 md:p-7 h-full">
        <div className="relative mb-5 inline-flex">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
            style={{ boxShadow: `0 4px 16px ${accent}20` }}
          >
            {Icon && <Icon size={22} className="text-teal-600" />}
          </div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
        </div>

        <h3 className="font-display font-bold text-base text-[#1a1a2e] mb-2 group-hover:text-teal-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">{description}</p>

        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-500 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300">
          Learn more
          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${accent}15, transparent 70%)`,
          }}
        />
      </Link>
    </m.div>
  );
}