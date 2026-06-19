import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ name, position, company, content, rating = 5, avatar, gradient = 'from-teal-500 to-teal-400' }) {
  return (
    <div className="glass-card p-6 md:p-7 h-full flex flex-col group relative overflow-hidden">
      {/* Background gradient decorator */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, rgba(31,138,158,0.08), transparent 70%)`,
        }}
      />

      {/* Quote icon */}
      <Quote size={24} className="text-teal-100 mb-4" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 italic">"{content}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        {avatar ? (
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-100" />
        ) : (
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 ring-2 ring-teal-100/50`}>
            <span className="text-white font-bold text-sm">{name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-sm text-[#1a1a2e]">{name}</p>
          <p className="text-xs text-gray-400">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
}