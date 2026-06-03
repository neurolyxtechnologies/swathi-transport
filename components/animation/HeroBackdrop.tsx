/**
 * Background for the hero lorry stage: a manufacturing plant on the left and a
 * dealership showroom on the right, with the loaded carrier travelling between
 * them — telling the plant→showroom story. A faint skyline drifts behind for
 * a sense of motion. All low-contrast so the lorry stays the hero.
 */
export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* drifting distant skyline */}
      <div className="absolute inset-x-0 bottom-12 h-28 overflow-hidden opacity-[0.18]">
        <div className="hero-drift flex w-[200%]">
          {[0, 1].map((k) => (
            <svg key={k} viewBox="0 0 800 120" preserveAspectRatio="none" className="h-28 w-1/2 shrink-0">
              {Array.from({ length: 18 }).map((_, i) => {
                const w = 22 + ((i * 29) % 34);
                const h = 30 + ((i * 47) % 80);
                return <rect key={i} x={i * 45} y={120 - h} width={w} height={h} fill="#3a4456" />;
              })}
            </svg>
          ))}
        </div>
      </div>

      {/* labels making the plant → showroom story explicit */}
      <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-steel-dark sm:text-[10px]">
        Plant
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.25em] text-steel-dark sm:text-[10px]">
        Showroom
      </span>

      {/* ---- Plant (left) ---- */}
      <svg className="absolute bottom-9 left-0 w-36 opacity-60 sm:w-44" viewBox="0 0 200 150">
        {/* chimney + smoke */}
        <rect x="20" y="36" width="16" height="100" fill="#2a3346" />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="smoke"
            cx="28"
            cy="34"
            r="9"
            fill="#5b6678"
            style={{ animationDelay: `${i * 1.05}s` }}
          />
        ))}
        {/* sawtooth-roof factory body */}
        <path
          d="M48 136 L48 96 L70 78 L70 96 L92 78 L92 96 L114 78 L114 96 L136 78 L136 136 Z"
          fill="#222c3e"
        />
        <rect x="48" y="110" width="88" height="26" fill="#1a2230" />
        {/* lit windows */}
        {[56, 74, 92, 110, 128].map((x) => (
          <rect key={x} x={x} y="116" width="8" height="10" fill="#ffb44d" opacity="0.7" />
        ))}
        {/* sign */}
        <rect x="60" y="100" width="64" height="6" rx="3" fill="#ff7a18" opacity="0.6" />
      </svg>

      {/* ---- Showroom (right) ---- */}
      <svg className="absolute bottom-9 right-0 w-40 opacity-60 sm:w-48" viewBox="0 0 220 150">
        {/* glass building */}
        <path d="M40 136 L40 54 Q40 44 50 44 L190 44 Q200 44 200 54 L200 136 Z" fill="#1b2436" />
        {/* roof band + SWATHI MOTORS sign */}
        <rect x="36" y="40" width="168" height="14" rx="3" fill="#19e3b1" opacity="0.35" />
        {/* glass mullions + lit interior */}
        <g fill="#19e3b1" opacity="0.22">
          {[52, 80, 108, 136, 164].map((x) => (
            <rect key={x} x={x} y="60" width="24" height="68" />
          ))}
        </g>
        <g stroke="#0b0f1a" strokeWidth="3">
          {[48, 76, 104, 132, 160, 188].map((x) => (
            <line key={x} x1={x} y1="58" x2={x} y2="132" />
          ))}
        </g>
        {/* a car on display inside */}
        <path d="M70 124 Q72 110 88 108 L104 100 Q112 96 124 100 L140 110 Q150 112 150 124 Z" fill="#ff7a18" opacity="0.55" />
        <circle cx="92" cy="124" r="6" fill="#0b0f1a" opacity="0.6" />
        <circle cx="134" cy="124" r="6" fill="#0b0f1a" opacity="0.6" />
      </svg>
    </div>
  );
}
