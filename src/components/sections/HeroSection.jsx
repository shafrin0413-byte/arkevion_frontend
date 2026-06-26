import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
  ArrowRight, Zap,
  Database, Smartphone, Cloud, Code2, Bot, Megaphone,
} from 'lucide-react';
import MobileConnectionBackground from '../ui/MobileConnectionBackground';

const ease = [0.25, 0.46, 0.45, 0.94];

const floatingIcons = [
  { Icon: Database, label: 'Database', pos: { top: '10%', left: '0%' }, color: '#0d9488' },
  { Icon: Smartphone, label: 'Mobile Apps', pos: { top: '44%', left: '0%' }, color: '#0891b2' },
  { Icon: Cloud, label: 'Cloud', pos: { bottom: '10%', left: '0%' }, color: '#1F8A9E' },
  { Icon: Code2, label: 'Web Dev', pos: { top: '10%', right: '0%' }, color: '#0d9488' },
  { Icon: Bot, label: 'AI Automation', pos: { top: '44%', right: '0%' }, color: '#0891b2' },
  { Icon: Megaphone, label: 'Marketing', pos: { bottom: '10%', right: '0%' }, color: '#1F8A9E' },
];

const globeParticles = [
  { top: '4%', left: '28%', size: 8, delay: '0s', dur: '5.5s' },
  { top: '11%', left: '76%', size: 6, delay: '0.8s', dur: '6.2s' },
  { top: '34%', left: '2%', size: 7, delay: '1.4s', dur: '5.8s' },
  { top: '54%', left: '96%', size: 9, delay: '0.4s', dur: '6.6s' },
  { top: '84%', left: '18%', size: 6, delay: '1.9s', dur: '5.9s' },
  { top: '92%', left: '70%', size: 7, delay: '1s', dur: '6.4s' },
  { top: '-2%', left: '56%', size: 5, delay: '2.2s', dur: '5.2s' },
  { top: '70%', left: '-2%', size: 5, delay: '2.7s', dur: '6.8s' },
  { top: '26%', left: '92%', size: 5, delay: '1.1s', dur: '5.7s' },
  { top: '96%', left: '44%', size: 4, delay: '3s', dur: '6.1s' },
];

function EarthVisual() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 0.45;
  }, []);

  return (
    <div className="relative flex h-[480px] w-[480px] select-none items-center justify-center xl:h-[540px] xl:w-[540px]" style={{ overflow: 'visible' }}>
      <div className="globe-particle-field" aria-hidden="true">
        {globeParticles.map(({ top, left, size, delay, dur }) => (
          <span
            key={`${top}-${left}`}
            className="globe-particle"
            style={{
              top,
              left,
              width: size,
              height: size,
              animationDelay: delay,
              animationDuration: dur,
            }}
          />
        ))}
      </div>
      <div className="earth-video-shell">
        <div className="earth-video-glow" aria-hidden="true" />
        <video
          ref={videoRef}
          src="/globe1.mp4"
          className="earth-video-frame"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-label="Rotating Earth animation"
        />
        <MobileConnectionBackground globe />
      </div>

      {floatingIcons.map(({ Icon, label, color, pos }) => (
        <div
          key={label}
          className="absolute flex min-w-[122px] items-center gap-2 rounded-2xl px-3 py-2 pointer-events-none"
          style={{
            ...pos,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(42,175,202,0.18)',
            boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 0 12px 2px ${color}20`,
            animation: 'none',
            zIndex: 25,
          }}
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-xl"
            style={{ width: 28, height: 28, background: `${color}14`, boxShadow: `0 0 8px 2px ${color}28` }}
          >
            <Icon size={13} style={{ color }} />
          </div>
          <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: '#1a2e35' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(70svh-5rem)] items-start overflow-hidden bg-white sm:min-h-[calc(100svh-88px)] lg:min-h-[calc(100svh-6rem)]">
      <MobileConnectionBackground />
      <div className="container-pad relative z-10 w-full pb-8 pt-3 sm:pb-6 sm:pt-4 lg:pb-6 lg:pt-0">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="mb-4 flex items-center gap-2.5 md:mb-5"
            >
              <span className="eyebrow">
                <Zap size={10} className="text-teal-500" />
                Arkevion Technology - Beyond Limits
              </span>
            </m.div>

            <div className="mb-3 md:mb-5">
              {[
                { text: 'Arkevion', gradient: false, small: false },
                { text: 'Technology', gradient: true, small: false },
                { text: 'beyond limits.', gradient: false, small: true },
              ].map(({ text, gradient, small }, i) => (
                <div key={text} className="overflow-hidden">
                  <m.h1
                    initial={{ y: 44, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`font-display font-extrabold leading-[1.07] tracking-tight ${
                      small ? 'mt-1 text-xl font-bold sm:text-2xl lg:text-[1.7rem]' : 'text-5xl sm:text-6xl lg:text-[4rem]'
                    } ${gradient ? 'text-gradient' : 'text-charcoal'}`}
                  >
                    {text}
                  </m.h1>
                </div>
              ))}
            </div>

            <m.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease }}
              className="mb-5 max-w-[520px] text-base leading-relaxed text-gray-500 md:mb-7 md:text-lg"
            >
              Arkevion Technology builds websites, applications, automation systems, design experiences,
              and growth campaigns that help businesses move beyond limits with clarity and confidence.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.4, ease }}
              className="mb-6 flex flex-wrap items-center gap-3 md:mb-8"
            >
              <Link to="/services" className="btn-primary text-sm">
                Explore Services <ArrowRight size={15} />
              </Link>
            </m.div>

          </div>

          <div
            className="hidden items-center justify-center lg:flex"
            style={{ overflow: 'visible' }}
          >
            <EarthVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
