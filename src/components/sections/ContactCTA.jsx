import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];

export default function ContactCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-14 md:py-36 overflow-hidden">
      {/* Static dark gradient background — no animated orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a2a3a] to-[#0f172a]" />
      {/* Static colour accent — no animation, no filter change per frame */}
      <div
        aria-hidden="true"
        className="absolute top-[-15%] right-[-8%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,138,158,0.18) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-15%] left-[-8%] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42,175,202,0.12) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />

      <div className="container-pad relative z-10">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full"
              style={{
                color: '#7de8f8',
                background: 'rgba(42,175,202,0.12)',
                border: '1px solid rgba(42,175,202,0.2)',
              }}
            >
              <Phone size={11} />
              Let's Build Together
            </span>
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl xl:text-6xl text-white leading-tight mb-4 md:mb-6">
            Have a project<br />
            <span className="text-gradient">in mind?</span>
          </h2>

          <p className="text-white text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-8 md:mb-10">
            Share your website, software, automation, design, marketing, or internship requirement with Arkevion Technology and our team will guide the next step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-2xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #1F8A9E 0%, #2AAFCA 100%)',
                boxShadow: '0 8px 28px rgba(31,138,158,0.28)',
              }}
            >
              <span className="relative z-10 text-white flex items-center gap-2">
                Start a conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>

            <a
              href="mailto:arkeviontech@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-2xl transition-opacity duration-200 hover:opacity-75"
              style={{
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              arkeviontech@gmail.com
            </a>
          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-12 pt-6 border-t border-white/10"
          >
            <p className="text-sm text-white">No commitment. Just a conversation.</p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
