/**
 * Side-view car-carrier lorry, authored as inline SVG so every part can be
 * targeted by GSAP: `.lorry-truck` (whole rig), `.wheel` (spin), and
 * `.deck-car` (the four cars that load onto the decks on scroll).
 *
 * Coordinate system: 1180 x 480 viewBox.
 */

const carColors = ["#19e3b1", "#ff7a18", "#5b8def", "#f4f7fb"];

/** A stylized car. Origin is top-left of its ~230x110 bounding box. */
function Car({ color, id }: { color: string; id: number }) {
  return (
    <g className="deck-car" data-car={id}>
      {/* shadow */}
      <ellipse cx="115" cy="104" rx="105" ry="9" fill="#000" opacity="0.22" />
      {/* body */}
      <path
        d="M6 78 Q10 54 40 50 L70 30 Q80 22 100 22 L150 22 Q170 22 182 36 L210 52 Q226 56 226 78 L226 92 Q226 98 220 98 L12 98 Q6 98 6 92 Z"
        fill={color}
      />
      {/* windows */}
      <path
        d="M74 34 Q82 28 98 28 L146 28 Q160 28 170 40 L184 52 L70 52 Z"
        fill="#0b0f1a"
        opacity="0.85"
      />
      <line x1="126" y1="29" x2="126" y2="52" stroke={color} strokeWidth="3" />
      {/* highlight */}
      <path d="M12 70 L220 70" stroke="#fff" strokeWidth="2" opacity="0.18" />
      {/* wheels */}
      <g>
        <circle cx="58" cy="96" r="18" fill="#10141f" />
        <circle cx="58" cy="96" r="8" fill="#3a4456" />
        <circle cx="172" cy="96" r="18" fill="#10141f" />
        <circle cx="172" cy="96" r="8" fill="#3a4456" />
      </g>
    </g>
  );
}

export default function LorryScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1180 480"
      className={className}
      aria-label="Car carrier lorry loaded with vehicles"
      role="img"
    >
      <defs>
        <linearGradient id="cab" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ff8f3d" />
          <stop offset="1" stopColor="#ff7a18" />
        </linearGradient>
        <linearGradient id="trailer" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1b2436" />
          <stop offset="1" stopColor="#131a2a" />
        </linearGradient>
      </defs>

      {/* ground shadow under the whole rig */}
      <ellipse cx="600" cy="452" rx="540" ry="16" fill="#000" opacity="0.28" />

      <g className="lorry-truck">
        {/* ---- Trailer structure ---- */}
        {/* vertical posts */}
        <rect x="300" y="70" width="14" height="320" rx="4" fill="#0d1320" />
        <rect x="700" y="70" width="14" height="320" rx="4" fill="#0d1320" />
        <rect x="1090" y="70" width="14" height="320" rx="4" fill="#0d1320" />
        {/* upper deck surface */}
        <rect x="300" y="150" width="810" height="16" rx="4" fill="url(#trailer)" />
        {/* lower deck / chassis */}
        <rect x="300" y="330" width="810" height="22" rx="4" fill="url(#trailer)" />
        <rect x="300" y="352" width="810" height="40" rx="4" fill="#0d1320" />
        {/* loading ramp at the rear */}
        <path d="M1104 392 L1168 392 L1104 330 Z" fill="#0d1320" />

        {/* ---- Cab (truck front) ---- */}
        <path
          d="M70 392 L70 250 Q70 232 90 230 L150 226 L196 150 Q204 138 222 138 L250 138 Q268 138 268 158 L268 392 Z"
          fill="url(#cab)"
        />
        {/* windshield */}
        <path
          d="M156 226 L198 162 Q204 152 218 152 L244 152 Q252 152 252 162 L252 222 Q252 228 246 228 L160 228 Z"
          fill="#0b0f1a"
          opacity="0.9"
        />
        <path d="M156 226 L198 162" stroke="#19e3b1" strokeWidth="3" opacity="0.5" />
        {/* headlight */}
        <rect x="70" y="262" width="12" height="30" rx="3" fill="#ffe9c2" />
        {/* cab trim */}
        <rect x="92" y="300" width="168" height="6" rx="3" fill="#0b0f1a" opacity="0.4" />

        {/* ---- Wheels (spin via GSAP) ---- */}
        {[150, 360, 470, 800, 920, 1040].map((cx, i) => (
          <g key={i} className="wheel" style={{ transformOrigin: `${cx}px 400px` }}>
            <circle cx={cx} cy="400" r="46" fill="#10141f" />
            <circle cx={cx} cy="400" r="44" fill="none" stroke="#272f3f" strokeWidth="4" />
            <circle cx={cx} cy="400" r="18" fill="#3a4456" />
            {/* spokes make the spin visible */}
            <rect x={cx - 2.5} y={360} width="5" height="80" rx="2" fill="#222a39" />
            <rect x={cx - 40} y={397.5} width="80" height="5" rx="2" fill="#222a39" />
          </g>
        ))}

        {/* ---- Cars on decks (start hidden, GSAP loads them on) ---- */}
        {/* Upper deck */}
        <g transform="translate(330 40)">
          <Car color={carColors[0]} id={0} />
        </g>
        <g transform="translate(590 40)">
          <Car color={carColors[1]} id={1} />
        </g>
        {/* Lower deck */}
        <g transform="translate(330 232)">
          <Car color={carColors[2]} id={2} />
        </g>
        <g transform="translate(590 232)">
          <Car color={carColors[3]} id={3} />
        </g>
      </g>
    </svg>
  );
}
