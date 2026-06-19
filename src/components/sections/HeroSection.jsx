import { m } from 'framer-motion';
import {
  MessageCircle, Phone, Zap,
  Database, Smartphone, Bot, Cloud, Code2, Cpu,
} from 'lucide-react';
import MobileConnectionBackground from '../ui/MobileConnectionBackground';

const stats = [
  { value: '150+', label: 'Projects' },
  { value: '50+',  label: 'Clients'  },
  { value: '5+',   label: 'Years'    },
  { value: '98%',  label: 'Satisfaction' },
];

const ease = [0.25, 0.46, 0.45, 0.94];

const floatingIcons = [
  { Icon: Database,   label: 'Database',        color: '#0d9488', pos: { top: '4%',    left: '2%'  }, delay: '0s',   dur: '4.8s' },
  { Icon: Smartphone, label: 'Mobile Apps',     color: '#0891b2', pos: { top: '4%',    right: '2%' }, delay: '0.7s', dur: '5.2s' },
  { Icon: Bot,        label: 'Automation',      color: '#7c3aed', pos: { bottom: '4%', right: '2%' }, delay: '1.4s', dur: '4.5s' },
  { Icon: Cloud,      label: 'Cloud Solutions', color: '#0891b2', pos: { bottom: '4%', left: '2%'  }, delay: '0.4s', dur: '5.8s' },
  { Icon: Code2,      label: 'Web Dev',         color: '#0d9488', pos: { top: '44%',   left: '0%'  }, delay: '1.0s', dur: '5.0s' },
  { Icon: Cpu,        label: 'AI Integration',  color: '#0d9488', pos: { top: '44%',   right: '0%' }, delay: '1.8s', dur: '4.2s' },
];

/* Network overlay — scaled to 406×406 viewBox (~78% of original 520×520) */
function NetworkOverlay() {
  // Scale helper: (orig - 260) * 0.78 + 203
  const s = v => Math.round((v - 260) * 0.78 + 203);
  const L = (x1,y1,x2,y2,c,w,op,dur,del) => ({ x1:s(x1),y1:s(y1),x2:s(x2),y2:s(y2),c,w,op,dur,del });
  const lines = [
    L(130,100,260, 60,'#2AAFCA',1.6,0.9,'1.4s','0s'   ),
    L(260, 60,390,100,'#2AAFCA',1.6,0.9,'1.4s','0.25s' ),
    L(390,100,440,260,'#0d9488',1.4,0.8,'1.8s','0.5s'  ),
    L(440,260,390,420,'#2AAFCA',1.5,0.85,'1.4s','0.2s' ),
    L(390,420,260,460,'#0d9488',1.4,0.8,'1.8s','0.75s' ),
    L(260,460,130,420,'#2AAFCA',1.5,0.85,'1.4s','0.45s'),
    L(130,420, 80,260,'#0d9488',1.4,0.8,'1.8s','1.0s'  ),
    L( 80,260,130,100,'#2AAFCA',1.5,0.85,'1.4s','0.1s' ),
    // inner web
    L(175,160,345,190,'#2AAFCA',1.2,0.7,'1.6s','0.6s'  ),
    L(345,190,370,330,'#0d9488',1.2,0.7,'1.8s','1.1s'  ),
    L(370,330,230,375,'#2AAFCA',1.2,0.7,'1.6s','0.35s' ),
    L(230,375,155,320,'#0d9488',1.1,0.65,'1.8s','0.85s'),
    L(155,320,175,160,'#2AAFCA',1.1,0.65,'1.6s','0.55s'),
    // cross
    L(130,100,390,420,'#0891b2',0.9,0.5,'2.2s','1.3s'  ),
    L(390,100,130,420,'#0891b2',0.9,0.5,'2.2s','0.7s'  ),
    L(260, 60,260,460,'#0d9488',0.9,0.45,'2.2s','0.9s' ),
    L( 80,260,440,260,'#2AAFCA',0.9,0.5,'1.8s','0.35s' ),
  ];

  const main = [
    {cx:s(130),cy:s(100),r:7,  fill:'#2AAFCA',del:'0s'   },
    {cx:s(260),cy:s( 60),r:8,  fill:'#2AAFCA',del:'0.3s' },
    {cx:s(390),cy:s(100),r:7,  fill:'#0d9488',del:'0.7s' },
    {cx:s(440),cy:s(260),r:8,  fill:'#2AAFCA',del:'0.2s' },
    {cx:s(390),cy:s(420),r:7,  fill:'#0d9488',del:'1.0s' },
    {cx:s(260),cy:s(460),r:7,  fill:'#2AAFCA',del:'0.5s' },
    {cx:s(130),cy:s(420),r:7,  fill:'#0d9488',del:'0.8s' },
    {cx:s( 80),cy:s(260),r:8,  fill:'#2AAFCA',del:'1.3s' },
  ];

  const inner = [
    {cx:s(175),cy:s(160),r:5.5,fill:'#2AAFCA',del:'0.6s' },
    {cx:s(345),cy:s(190),r:5.5,fill:'#0d9488',del:'1.1s' },
    {cx:s(370),cy:s(330),r:5.5,fill:'#2AAFCA',del:'0.4s' },
    {cx:s(230),cy:s(375),r:5,  fill:'#0d9488',del:'0.9s' },
    {cx:s(155),cy:s(320),r:5,  fill:'#2AAFCA',del:'1.5s' },
    {cx:s(260),cy:s(260),r:6,  fill:'#2AAFCA',del:'0.2s' },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 406 406"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:15 }}
    >
      {lines.map((l,i) => (
        <line key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={l.c} strokeWidth={l.w} opacity={l.op}
          style={{
            strokeDasharray:'10,7',
            animation:`dashFlow ${l.dur} linear infinite`,
            animationDelay: l.del,
          }}
        />
      ))}

      {main.map((n,i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
          style={{
            animation:'nodePulse 2.2s ease-in-out infinite',
            animationDelay: n.del,
            transformOrigin:`${n.cx}px ${n.cy}px`,
          }}
        />
      ))}

      {inner.map((n,i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill}
          style={{
            animation:'nodePulseSm 2.6s ease-in-out infinite',
            animationDelay: n.del,
            transformOrigin:`${n.cx}px ${n.cy}px`,
          }}
        />
      ))}

      {/* Ripple rings */}
      {[
        {cx:s(260),cy:s( 60),r:13,del:'0.3s'},
        {cx:s(440),cy:s(260),r:13,del:'0.9s'},
        {cx:s( 80),cy:s(260),r:13,del:'0.5s'},
        {cx:s(260),cy:s(460),r:13,del:'1.2s'},
      ].map((n,i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="none"
          stroke="#2AAFCA" strokeWidth="1.5" opacity="0.55"
          style={{
            animation:'nodePulseSm 2s ease-in-out infinite',
            animationDelay: n.del,
            transformOrigin:`${n.cx}px ${n.cy}px`,
          }}
        />
      ))}
    </svg>
  );
}

function EarthVisual() {
  return (
    /* overflow:visible so network lines extend beyond container */
    <div className="relative flex items-center justify-center select-none"
      style={{ width: 460, height: 460, overflow: 'visible' }}>

      {/* Outer ambient glow */}
      <div aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{
          width: 450, height: 450,
          background: 'radial-gradient(circle, rgba(42,175,202,0.14) 0%, rgba(31,138,158,0.06) 45%, transparent 70%)',
          filter: 'blur(24px)',
          animation: 'floatYSlow 9s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Neon orbit ring */}
      <div aria-hidden="true" className="absolute rounded-full pointer-events-none"
        style={{
          width: 390, height: 390,
          border: '1.5px solid rgba(42,175,202,0.25)',
          boxShadow: '0 0 36px 6px rgba(42,175,202,0.10), inset 0 0 36px 6px rgba(42,175,202,0.06)',
          animation: 'floatYSlow 9s ease-in-out infinite',
          willChange: 'transform',
        }}
      />

      {/* Earth image */}
      <div className="relative" style={{ width: 390, height: 390, animation: 'floatYSlow 9s ease-in-out infinite', willChange: 'transform', zIndex: 10 }}>
        <img
          src="/earth.png"
          alt="Earth"
          className="w-full h-full object-contain"
          style={{
            filter:
              'drop-shadow(0 0 36px rgba(42,175,202,0.55)) ' +
              'drop-shadow(0 0 72px rgba(31,138,158,0.28)) ' +
              'drop-shadow(0 28px 48px rgba(0,0,0,0.22))',
          }}
          draggable={false}
        />
        {/* Neon edge ring */}
        <div aria-hidden="true" className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow:
              '0 0 0 2px rgba(42,175,202,0.45), ' +
              '0 0 0 5px rgba(42,175,202,0.10), ' +
              '0 0 30px 8px rgba(42,175,202,0.20)',
          }}
        />
      </div>

      {/* Network overlay — covers full 406×406, sits above Earth */}
      <NetworkOverlay />

      {/* Bottom shadow */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          bottom: -16, left: '50%', transform: 'translateX(-50%)',
          width: 220, height: 24,
          background: 'radial-gradient(ellipse, rgba(42,175,202,0.28) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Floating icon chips */}
      {floatingIcons.map(({ Icon, label, color, pos, delay, dur }) => (
        <div key={label}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl pointer-events-none"
          style={{
            ...pos,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(42,175,202,0.20)',
            boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 0 12px 2px ${color}20`,
            animation: `floatY ${dur} ease-in-out infinite`,
            animationDelay: delay,
            willChange: 'transform',
            zIndex: 25,
          }}
        >
          <div className="flex items-center justify-center rounded-xl shrink-0"
            style={{ width: 28, height: 28, background: `${color}14`, boxShadow: `0 0 8px 2px ${color}28` }}>
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
    <section className="relative flex min-h-[calc(70svh-5rem)] items-center overflow-hidden bg-white sm:min-h-[calc(100svh-88px)] lg:min-h-[calc(100svh-6rem)]">

      {/* Mobile network BG */}
      <div className="lg:hidden absolute inset-0 pointer-events-none">
        <MobileConnectionBackground />
      </div>

      {/* Desktop connecting lines — full hero background */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <defs>
          <linearGradient id="heroNetLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#2AAFCA" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {[
          ['2%','8%'],  ['10%','3%'], ['18%','14%'],['6%','28%'],
          ['14%','42%'],['4%','58%'], ['10%','72%'], ['2%','86%'],
          ['20%','6%'], ['28%','20%'],['22%','36%'], ['16%','55%'],
          ['24%','68%'],['18%','82%'],['28%','92%'], ['36%','10%'],
          ['42%','2%'], ['50%','12%'],['38%','28%'], ['44%','44%'],
          ['34%','58%'],['40%','72%'],['32%','86%'], ['50%','96%'],
          ['56%','6%'], ['62%','18%'],['54%','32%'], ['60%','48%'],
          ['52%','62%'],['58%','78%'],['64%','92%'], ['70%','4%'],
          ['78%','14%'],['68%','26%'],['74%','42%'], ['66%','56%'],
          ['72%','70%'],['64%','84%'],['80%','8%'],  ['88%','2%'],
          ['84%','20%'],['92%','12%'],['96%','28%'], ['86%','38%'],
          ['94%','50%'],['88%','62%'],['96%','74%'], ['82%','82%'],
          ['90%','90%'],['98%','88%'],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.75" fill="#2AAFCA" opacity="0.45" />
        ))}
        {(() => {
          const ns = [
            ['2%','8%'],  ['10%','3%'], ['18%','14%'],['6%','28%'],
            ['14%','42%'],['4%','58%'], ['10%','72%'], ['2%','86%'],
            ['20%','6%'], ['28%','20%'],['22%','36%'], ['16%','55%'],
            ['24%','68%'],['18%','82%'],['28%','92%'], ['36%','10%'],
            ['42%','2%'], ['50%','12%'],['38%','28%'], ['44%','44%'],
            ['34%','58%'],['40%','72%'],['32%','86%'], ['50%','96%'],
            ['56%','6%'], ['62%','18%'],['54%','32%'], ['60%','48%'],
            ['52%','62%'],['58%','78%'],['64%','92%'], ['70%','4%'],
            ['78%','14%'],['68%','26%'],['74%','42%'], ['66%','56%'],
            ['72%','70%'],['64%','84%'],['80%','8%'],  ['88%','2%'],
            ['84%','20%'],['92%','12%'],['96%','28%'], ['86%','38%'],
            ['94%','50%'],['88%','62%'],['96%','74%'], ['82%','82%'],
            ['90%','90%'],['98%','88%'],
          ];
          return [
            [0,1],[1,2],[0,3],[2,3],[1,8],[2,9],[3,4],[4,5],[5,6],[6,7],
            [3,10],[4,11],[5,12],[6,13],[7,14],[8,9],[9,10],[10,11],[11,12],
            [12,13],[13,14],[8,15],[9,18],[15,16],[16,17],[17,18],[18,19],
            [19,20],[20,21],[21,22],[22,23],[15,24],[17,25],[24,25],[25,26],
            [26,27],[27,28],[28,29],[29,30],[24,31],[25,32],[31,32],[32,33],
            [33,34],[34,35],[35,36],[36,37],[31,38],[32,39],[38,39],[39,40],
            [40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,47],[47,48],
            [48,49],[38,40],[33,43],[27,35],[19,27],[10,18],[2,10],[1,9],
            [4,12],[11,20],[18,26],[25,33],[32,40],[39,44],[43,47],
          ].map(([a, b], i) => (
            <line key={i}
              x1={ns[a][0]} y1={ns[a][1]}
              x2={ns[b][0]} y2={ns[b][1]}
              stroke="url(#heroNetLine)"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeDasharray="6 8"
              opacity="0.4"
            />
          ));
        })()}
      </svg>

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,148,136,0.025) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(13,148,136,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient glow orbs */}
      <div aria-hidden="true" className="absolute top-[-10%] right-[-4%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(42,175,202,0.07) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="absolute bottom-[-8%] left-[-4%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 65%)' }} />

      <div className="container-pad relative z-10 w-full py-8 sm:py-6 lg:py-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">

          {/* Left: hero text */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="mb-4 flex items-center gap-2.5 md:mb-5"
            >
              <span className="eyebrow">
                <Zap size={10} className="text-teal-500" />
                Premium Digital Agency
              </span>
            </m.div>

            <div className="mb-3 md:mb-5">
              {[
                { text: 'Arkevion',          gradient: false, small: false },
                { text: 'Technology',        gradient: true,  small: false },
                { text: 'beyond limits.', gradient: false, small: true  },
              ].map(({ text, gradient, small }, i) => (
                <div key={i} className="overflow-hidden">
                  <m.h1
                    initial={{ y: 44, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`font-display font-extrabold leading-[1.07] tracking-tight ${
                      small
                        ? 'text-[clamp(0.85rem,2.2vw,1.5rem)] font-bold mt-1'
                        : 'text-[clamp(2.2rem,5vw,3.5rem)]'
                    } ${
                      gradient ? 'text-gradient' : 'text-charcoal'
                    }`}
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
              className="mb-5 max-w-[460px] text-sm leading-relaxed text-gray-500 md:mb-7 md:text-base"
            >
              Web development, UI/UX design, AI automation, and digital marketing —
              all under one roof in Trichy.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.4, ease }}
              className="mb-6 flex flex-wrap items-center gap-3 md:mb-8"
            >
              <a href="tel:+918838749824" className="btn-primary text-sm">
                Contact Us <Phone size={15} />
              </a>
              <a
                href="https://wa.me/918838749824?text=Im%20interested%20in%20your%20projects"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors duration-150"
              >
                WhatsApp
                <MessageCircle size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </a>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.4, ease }}
              className="grid grid-cols-4 gap-2 border-t border-gray-100 pt-4 md:gap-4 md:pt-5"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display text-lg font-extrabold leading-none text-charcoal md:text-2xl">{value}</div>
                  <div className="mt-1 text-[9px] font-medium leading-tight text-gray-400 md:text-xs">{label}</div>
                </div>
              ))}
            </m.div>
          </div>

          {/* Right: Earth — desktop only */}
          <m.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.65, ease }}
            className="hidden lg:flex items-center justify-center -mt-14"
            style={{ overflow: 'visible' }}
          >
            <EarthVisual />
          </m.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-5 md:bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-gray-200 flex justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full bg-teal-400"
            style={{ animation: 'scrollDot 1.6s ease-in-out infinite', willChange: 'transform' }}
          />
        </div>
      </m.div>
    </section>
  );
}
