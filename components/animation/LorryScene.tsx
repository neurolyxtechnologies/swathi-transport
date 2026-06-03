"use client";

import { useState } from "react";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

/**
 * Realistic side-view car-carrier lorry, authored as inline SVG and animated
 * with GSAP. A loaded rig (cab + truss trailer + 6 cars) with a ground crew
 * loading vehicles up the rear ramp.
 *
 * Animated classes: `.wheel` (spin), `.rig` (suspension bob),
 * `.deck-car` (drive-in load), `.worker-arm` (wave), `.exhaust` (puff),
 * `.headbeam` (glow pulse). ViewBox: 1320 x 560.
 */

const carColors = [
  { body: "#19e3b1", win: "#0b2c25" }, // teal
  { body: "#ff7a18", win: "#3a1c05" }, // cargo
  { body: "#5b8def", win: "#0d1f3d" }, // blue
  { body: "#f4f7fb", win: "#1b2436" }, // white
  { body: "#ffb44d", win: "#3a2a0a" }, // amber
  { body: "#c66be3", win: "#2c0f33" }, // violet
];

/** A stylized sedan, front facing left. Local box ~250 x 122, wheels at y≈106. */
function Car({
  color,
  id,
  name,
}: {
  color: { body: string; win: string };
  id: number;
  name: string;
}) {
  return (
    <g className="deck-car" data-car={id}>
      <ellipse cx="125" cy="116" rx="118" ry="8" fill="#000" opacity="0.25" />
      {/* body */}
      <path
        d="M6 84 Q8 58 36 52 L74 30 Q86 22 108 22 L168 22 Q190 22 204 38 L232 58 Q246 62 246 84 L246 98 Q246 104 240 104 L12 104 Q6 104 6 98 Z"
        fill={color.body}
      />
      {/* greenhouse / windows */}
      <path
        d="M80 36 Q88 30 106 30 L160 30 Q176 30 188 44 L202 56 L74 56 Z"
        fill={color.win}
      />
      <line x1="138" y1="31" x2="138" y2="56" stroke={color.body} strokeWidth="3" />
      {/* belt-line highlight + door seam */}
      <path d="M14 74 L236 74" stroke="#fff" strokeWidth="2" opacity="0.16" />
      <line x1="120" y1="60" x2="120" y2="100" stroke="#000" strokeWidth="1.5" opacity="0.18" />
      {/* lights */}
      <rect x="8" y="78" width="10" height="10" rx="2" fill="#fff" opacity="0.85" />
      <rect x="236" y="80" width="8" height="8" rx="2" fill="#e23b3b" opacity="0.85" />
      {/* brand badge on the door */}
      <text
        x="128"
        y="90"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#0b0f1a"
        fillOpacity="0.72"
        className="font-display"
      >
        {name}
      </text>
      {/* wheels */}
      <Tire cx={64} cy={102} r={18} />
      <Tire cx={186} cy={102} r={18} />
    </g>
  );
}

/** Realistic tire: rubber, rim, hub, lug bolts. */
function Tire({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const lugs = 5;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0c111b" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#222c3e" strokeWidth={r * 0.18} />
      <circle cx={cx} cy={cy} r={r * 0.46} fill="#3a4456" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#1c2334" />
      {Array.from({ length: lugs }).map((_, i) => {
        const a = (i / lugs) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * r * 0.3}
            cy={cy + Math.sin(a) * r * 0.3}
            r={r * 0.07}
            fill="#1c2334"
          />
        );
      })}
    </g>
  );
}

/** A big truck wheel with visible spokes + accent mark so the spin reads clearly. */
function Wheel({ cx }: { cx: number }) {
  const cy = 498;
  const r = 40;
  const spokes = 6;
  return (
    <g className="wheel">
      {/* tire (largest element → defines bbox, keeps rotation centered) */}
      <circle cx={cx} cy={cy} r={r} fill="#0c111b" />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke="#222c3e" strokeWidth="7" />
      {/* rim disc */}
      <circle cx={cx} cy={cy} r={22} fill="#414b5e" />
      {/* spokes */}
      <g stroke="#6b7688" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: spokes }).map((_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * 7}
              y1={cy + Math.sin(a) * 7}
              x2={cx + Math.cos(a) * 20}
              y2={cy + Math.sin(a) * 20}
            />
          );
        })}
      </g>
      {/* hub */}
      <circle cx={cx} cy={cy} r={8} fill="#1c2334" />
      <circle cx={cx} cy={cy} r={3.5} fill="#6b7688" />
      {/* bright accent mark — makes rotation obvious */}
      <circle cx={cx} cy={cy - 28} r={4.5} fill="#ff7a18" />
    </g>
  );
}

/** Hi-vis ground-crew worker. Feet at local y≈76. `wave` animates the arm. */
function Worker({ wave = false, flip = false }: { wave?: boolean; flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      <ellipse cx="24" cy="78" rx="20" ry="4" fill="#000" opacity="0.25" />
      {/* legs */}
      <path d="M19 48 L13 76" stroke="#1b2436" strokeWidth="7" strokeLinecap="round" />
      <path d="M29 48 L36 76" stroke="#222d42" strokeWidth="7" strokeLinecap="round" />
      {/* hi-vis vest */}
      <path d="M12 22 Q12 18 16 18 L32 18 Q36 18 36 22 L36 50 L12 50 Z" fill="#ff7a18" />
      <rect x="12" y="32" width="24" height="4" fill="#ffe0a8" />
      <line x1="24" y1="18" x2="24" y2="50" stroke="#d8620c" strokeWidth="1.5" />
      {/* arm */}
      {wave ? (
        <line
          className="worker-arm"
          x1="34"
          y1="24"
          x2="48"
          y2="10"
          stroke="#ff7a18"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ) : (
        <line x1="34" y1="24" x2="46" y2="34" stroke="#ff7a18" strokeWidth="6" strokeLinecap="round" />
      )}
      {/* head + hard hat */}
      <circle cx="24" cy="11" r="8" fill="#e8b48c" />
      <path d="M14 11 Q24 -2 34 11 Z" fill="#ffd23f" />
      <rect x="13" y="10" width="22" height="3" rx="1.5" fill="#e6b800" />
    </g>
  );
}

/** Deck slots: position, colour, and brand for each loaded car. */
const deckLayout = [
  { id: 0, x: 345, y: 140, color: carColors[0], name: "TATA" },
  { id: 1, x: 610, y: 140, color: carColors[1], name: "MAHINDRA" },
  { id: 4, x: 875, y: 140, color: carColors[4], name: "KIA" },
  { id: 2, x: 345, y: 330, color: carColors[2], name: "HYUNDAI" },
  { id: 3, x: 610, y: 330, color: carColors[3], name: "MARUTI" },
  { id: 5, x: 875, y: 330, color: carColors[5], name: "TOYOTA" },
];

/** Hover tooltip shown above a car. */
function CarTip({ name }: { name: string }) {
  return (
    <g pointerEvents="none">
      <rect x="33" y="-50" width="184" height="33" rx="9" fill="#0b0f1a" stroke="#2a3650" strokeWidth="1.5" />
      <circle cx="55" cy="-33" r="4" fill="#19e3b1" />
      <text x="68" y="-28" fontSize="13" fontWeight="700" fill="#f4f7fb" className="font-display">
        {name} · loaded
      </text>
      <path d="M117 -17 L125 -8 L133 -17 Z" fill="#0b0f1a" />
    </g>
  );
}

export default function LorryScene({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced, self }) => {
    if (reduced) {
      gsap.set(".deck-car", { opacity: 1, x: 0 });
      return;
    }

    // Cars drive in from the rear ramp, lower deck first, then upper.
    gsap.set(".deck-car", { opacity: 0, x: 320 });
    const order = [2, 3, 4, 0, 1, 5];
    order.forEach((id, i) =>
      gsap.to(`.deck-car[data-car="${id}"]`, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.85,
        delay: 0.4 + i * 0.32,
      })
    );

    // Wheels spin — fast enough to clearly read the motion.
    gsap.to(".wheel", {
      rotation: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "none",
      duration: 1.8,
    });

    // Suspension bob.
    gsap.to(".rig", { y: -8, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 3 });

    // Crew waving.
    gsap.fromTo(
      ".worker-arm",
      { rotation: -18, transformOrigin: "0% 100%" },
      { rotation: 16, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 0.6 }
    );

    // Exhaust puffs.
    gsap.fromTo(
      ".exhaust",
      { opacity: 0.5, y: 0, scale: 0.6, transformOrigin: "50% 50%" },
      {
        opacity: 0,
        y: -34,
        scale: 1.5,
        repeat: -1,
        ease: "power1.out",
        duration: 2,
        stagger: { each: 0.66, repeat: -1 },
      }
    );

    // Headlight: slow breathing glow, fast subtle flicker, pulsing flare.
    gsap.to(".headbeam", { opacity: 0.7, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 1.9 });
    gsap.to(".beam-inner", { opacity: 0.45, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 0.13 });
    gsap.to(".headflare", {
      scale: 1.2,
      opacity: 0.8,
      transformOrigin: "50% 50%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.05,
    });

    // Driver idles with a tiny engine vibration.
    gsap.to(".driver", {
      y: 1.4,
      rotation: 0.9,
      transformOrigin: "50% 100%",
      repeat: -1,
      yoyo: true,
      ease: "none",
      duration: 0.1,
    });

    // Dust puffs at the tires.
    gsap.fromTo(
      ".dust",
      { opacity: 0, x: 0, scale: 0.5, transformOrigin: "0% 100%" },
      {
        keyframes: { opacity: [0, 0.4, 0], x: [0, 16, 34], scale: [0.5, 1.2, 1.9] },
        duration: 1.5,
        ease: "power1.out",
        repeat: -1,
        stagger: 0.22,
      }
    );

    // Subtle mouse-parallax tilt for a 3D feel.
    const el = self;
    const svg = el.querySelector("svg");
    if (svg) {
      const xTo = gsap.quickTo(svg, "rotationY", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(svg, "rotationX", { duration: 0.6, ease: "power2.out" });
      gsap.set(svg, { transformPerspective: 1200, transformOrigin: "50% 50%" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 7);
        yTo(((e.clientY - r.top) / r.height - 0.5) * -5);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }
  }, []);

  return (
    <div ref={scope} className={className}>
      <svg
        viewBox="0 0 1320 560"
        className="w-full"
        aria-label="Car carrier lorry loaded with six vehicles and a ground crew"
        role="img"
      >
        <defs>
          <linearGradient id="cab" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ff9445" />
            <stop offset="1" stopColor="#f06f0c" />
          </linearGradient>
          <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#222d42" />
            <stop offset="1" stopColor="#141b2a" />
          </linearGradient>
          <linearGradient id="beamCone" x1="74" y1="0" x2="-150" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe6b0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffe6b0" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="flareGrad">
            <stop stopColor="#fff6dc" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse cx="690" cy="528" rx="610" ry="14" fill="#000" opacity="0.3" />

        {/* headlight beam (behind rig) — layered cone + flare */}
        <g className="headbeam">
          <path d="M74 402 L-150 338 L-150 492 L74 426 Z" fill="url(#beamCone)" />
          <path className="beam-inner" d="M74 406 L-150 380 L-150 450 L74 422 Z" fill="url(#beamCone)" />
          <circle className="headflare" cx="73" cy="414" r="28" fill="url(#flareGrad)" />
        </g>

        <g className="rig">
          {/* ---- chassis beam ---- */}
          <rect x="150" y="468" width="1110" height="16" rx="4" fill="#0d1320" />

          {/* ---- trailer truss frame ---- */}
          {/* vertical posts */}
          <rect x="324" y="196" width="14" height="280" rx="3" fill="url(#frame)" />
          <rect x="772" y="196" width="14" height="280" rx="3" fill="url(#frame)" />
          <rect x="1244" y="196" width="14" height="280" rx="3" fill="url(#frame)" />
          {/* cross braces */}
          <g stroke="#2a3650" strokeWidth="4" opacity="0.5">
            <line x1="338" y1="250" x2="772" y2="440" />
            <line x1="786" y1="250" x2="1244" y2="440" />
            <line x1="338" y1="440" x2="772" y2="250" />
          </g>
          {/* upper deck */}
          <rect x="320" y="250" width="940" height="16" rx="4" fill="url(#frame)" />
          {/* lower deck */}
          <rect x="300" y="440" width="960" height="18" rx="4" fill="url(#frame)" />
          {/* rear loading ramp */}
          <path d="M1258 458 L1330 512 L1258 512 Z" fill="#0d1320" />
          {/* side skirt with branding */}
          <rect x="300" y="458" width="470" height="22" rx="3" fill="#10182a" />
          <text x="328" y="474" fontSize="15" fontWeight="800" letterSpacing="3" fill="#3a4456" className="font-display">
            SWATHI
          </text>

          {/* ---- Cab (conventional) ---- */}
          {/* exhaust stack */}
          <rect x="300" y="170" width="12" height="90" rx="3" fill="#1c2334" />
          {[0, 1, 2].map((i) => (
            <circle key={i} className="exhaust" cx="306" cy="168" r="7" fill="#6b7688" fillOpacity="0.5" />
          ))}
          {/* cab body */}
          <path
            d="M150 476 L150 300 Q150 280 172 278 L250 274 L292 274 Q312 274 312 296 L312 476 Z"
            fill="url(#cab)"
          />
          {/* hood */}
          <path d="M70 476 L70 392 Q70 376 88 376 L172 376 L172 476 Z" fill="url(#cab)" />
          {/* grille + bumper */}
          <rect x="70" y="430" width="8" height="34" rx="2" fill="#10141f" />
          <rect x="66" y="464" width="20" height="10" rx="2" fill="#0d1320" />
          {/* windshield + door */}
          <path d="M180 296 L180 360 Q180 366 186 366 L300 366 Q306 366 306 360 L306 296 Q306 290 300 290 L186 290 Q180 290 180 296 Z" fill="#0b0f1a" opacity="0.92" />
          {/* driver silhouette through the glass (idles with engine shake) */}
          <g className="driver" opacity="0.62">
            <path d="M204 366 Q204 338 224 338 Q244 338 244 366 Z" fill="#ff7a18" />
            <circle cx="224" cy="326" r="11" fill="#caa078" />
          </g>
          <path d="M182 294 L304 294" stroke="#19e3b1" strokeWidth="2.5" opacity="0.45" />
          <line x1="244" y1="370" x2="244" y2="470" stroke="#0b0f1a" strokeWidth="2" opacity="0.4" />
          {/* mirror */}
          <rect x="166" y="316" width="10" height="22" rx="2" fill="#10141f" />
          {/* headlight */}
          <rect x="70" y="404" width="12" height="20" rx="3" fill="#ffe9b8" />

          {/* ---- Wheels ---- */}
          <Wheel cx={185} />
          <Wheel cx={815} />
          <Wheel cx={905} />
          <Wheel cx={1090} />
          <Wheel cx={1170} />
          <Wheel cx={1248} />

          {/* ---- Cars on decks (3 per deck) — hover to inspect ---- */}
          {deckLayout.map((c) => (
            <g
              key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transform: `translate(${c.x}px, ${c.y - (hovered === c.id ? 16 : 0)}px)`,
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                cursor: "pointer",
              }}
            >
              <Car color={c.color} id={c.id} name={c.name} />
              {hovered === c.id && <CarTip name={c.name} />}
            </g>
          ))}

          {/* worker up on the lower deck, directing the load */}
          <g transform="translate(1185 364) scale(0.78)"><Worker wave /></g>
        </g>

        {/* ---- Ground crew (loading from the rear) ---- */}
        <g className="crew">
          <g transform="translate(1278 446)"><Worker wave /></g>
          <g transform="translate(1212 448) scale(0.92)"><Worker flip /></g>
        </g>

        {/* ground dust kicked up at the tires */}
        <g fill="#3a4456">
          {[185, 905, 1090, 1248].map((x, i) => (
            <ellipse key={i} className="dust" cx={x + 14} cy={534} rx={11} ry={5} opacity={0} />
          ))}
        </g>
      </svg>
    </div>
  );
}
