const NODES = [
  ['4%',  '15%'], ['18%', '8%'],  ['32%', '22%'], ['14%', '45%'],
  ['28%', '60%'], ['8%',  '72%'], ['42%', '12%'], ['50%', '38%'],
  ['38%', '68%'], ['22%', '82%'], ['56%', '18%'], ['64%', '42%'],
  ['52%', '70%'], ['44%', '88%'], ['70%', '10%'], ['78%', '30%'],
  ['66%', '55%'], ['58%', '80%'], ['84%', '18%'], ['92%', '40%'],
  ['80%', '62%'], ['72%', '85%'], ['96%', '20%'], ['88%', '72%'],
];

const LINES = [
  [0,1],[1,2],[2,3],[0,3],[1,6],[2,7],[3,4],[4,5],[3,7],
  [6,7],[6,10],[7,11],[8,9],[4,8],[7,8],[10,11],[10,14],
  [11,15],[12,13],[8,12],[11,16],[14,15],[14,18],[15,19],
  [16,17],[12,16],[15,16],[18,19],[18,22],[19,20],[20,21],
  [16,20],[17,21],[19,23],[20,23],[1,7],[6,11],[10,15],[14,19],
];

export default function PageHeroBanner({ children, className = '', style = {} }) {
  return (
    <section
      className={`relative ${className}`}
      style={{ overflow: 'hidden', ...style }}
    >
      {/* Network background — desktop/tablet only */}
      <span
        className="page-hero-net-bg"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="desktopNetGlow" x="-80%" y="-80%" width="360%" height="360%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="desktopNetLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#2AAFCA" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {LINES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a][0]} y1={NODES[a][1]}
              x2={NODES[b][0]} y2={NODES[b][1]}
              stroke="url(#desktopNetLine)"
              strokeWidth="0.3"
              strokeLinecap="round"
              strokeDasharray="7 9"
              className="desktop-net-line"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}

          {NODES.map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r="1.0"
              fill="#2AAFCA"
              className="desktop-net-node"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>
      </span>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
