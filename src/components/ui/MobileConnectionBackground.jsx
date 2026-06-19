export default function MobileConnectionBackground({ globe = false }) {
  const nodes = [
    ['8%', '18%'], ['28%', '34%'], ['58%', '20%'], ['88%', '38%'],
    ['18%', '70%'], ['48%', '56%'], ['78%', '76%'], ['38%', '86%'],
  ];

  const lines = [
    [0, 1], [1, 2], [2, 3], [1, 5], [5, 6], [4, 5], [0, 4], [2, 6], [5, 7],
  ];

  return (
    <div className={`mobile-connection-bg ${globe ? 'mobile-connection-bg--globe' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="mobileConnectionGlow" x="-80%" y="-80%" width="360%" height="360%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="mobileConnectionLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2AAFCA" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {lines.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from][0]}
            y1={nodes[from][1]}
            x2={nodes[to][0]}
            y2={nodes[to][1]}
            className="mobile-connection-line"
            style={{ animationDelay: `${index * 0.22}s` }}
          />
        ))}
        {nodes.map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={globe ? 1.55 : 1.1}
            className="mobile-connection-node"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
