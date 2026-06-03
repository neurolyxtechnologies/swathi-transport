"use client";

import type { MutableRefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

export type JourneyTimeline = ReturnType<typeof gsap.timeline>;

/**
 * Looping "plant → showroom" journey. A single carrier cycles through four
 * phases forever — Plan, Load, Transit, Deliver — calling `onPhase(i)` at each
 * so the parent can sync the step cards. The timeline is exposed via `tlRef`
 * so the parent can jump phases on click. Pauses while scrolled off-screen.
 */

// Carrier-local slot positions + brand colours for the 4 cars.
const SLOTS = [
  { x: 118, y: 2, color: "#19e3b1", win: "#0b2c25" },
  { x: 236, y: 2, color: "#ff7a18", win: "#3a1c05" },
  { x: 118, y: 60, color: "#5b8def", win: "#0d1f3d" },
  { x: 236, y: 60, color: "#f4f7fb", win: "#1b2436" },
];

const PLANT_X = 40;
const SHOW_X = 560;
const CARRIER_Y = 128;

function JCar({ slot }: { slot: number }) {
  const c = SLOTS[slot];
  return (
    <g className="jcar" data-slot={slot}>
      <ellipse cx="55" cy="50" rx="52" ry="4" fill="#000" opacity="0.25" />
      <path
        d="M2 38 Q3 26 15 24 L29 14 Q35 9 47 9 L70 9 Q82 9 90 18 L102 26 Q108 28 108 38 L108 44 Q108 48 104 48 L6 48 Q2 48 2 44 Z"
        fill={c.color}
      />
      <path d="M31 16 Q37 11 47 11 L68 11 Q78 11 86 20 L94 26 L30 26 Z" fill={c.win} />
      <circle cx="26" cy="46" r="8" fill="#0c111b" />
      <circle cx="26" cy="46" r="3" fill="#39424f" />
      <circle cx="82" cy="46" r="8" fill="#0c111b" />
      <circle cx="82" cy="46" r="3" fill="#39424f" />
    </g>
  );
}

function JWheel({ cx }: { cx: number }) {
  return (
    <g className="jwheel">
      <circle cx={cx} cy={120} r={15} fill="#0c111b" />
      <circle cx={cx} cy={120} r={6} fill="#39424f" />
      <circle cx={cx} cy={106} r={2.5} fill="#ff7a18" />
    </g>
  );
}

export default function JourneyScene({
  onPhase,
  tlRef,
}: {
  onPhase: (i: number) => void;
  tlRef: MutableRefObject<JourneyTimeline | null>;
}) {
  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced, self }) => {
    if (reduced) {
      gsap.set(".carrier", { x: 300, y: CARRIER_Y });
      gsap.set(".jcar", { opacity: 1, x: 0, y: 0 });
      gsap.set(".ghosts", { opacity: 0 });
      gsap.set(".route", { strokeDashoffset: 0, opacity: 1 });
      onPhase(2);
      return;
    }

    // Plan-start state.
    gsap.set(".carrier", { x: PLANT_X, y: CARRIER_Y, opacity: 1 });
    gsap.set(".jcar", { opacity: 0, x: -70, y: 8 });
    gsap.set(".ghost", { opacity: 0 });
    gsap.set(".check", { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
    gsap.set(".route", { strokeDasharray: 640, strokeDashoffset: 640, opacity: 1 });

    const loadOrder = [2, 3, 0, 1];
    const offOrder = [0, 1, 2, 3];

    const tl = gsap.timeline({ repeat: -1, paused: true });
    tlRef.current = tl;

    // ---- 1. PLAN ----
    tl.addLabel("plan")
      .call(() => onPhase(0))
      .to(".route", { strokeDashoffset: 0, duration: 1.4, ease: "power1.inOut" }, "plan")
      .to(".ghost", { opacity: 1, duration: 0.4, stagger: 0.08 }, "plan+=0.2")
      .to(".check", { opacity: 1, scale: 1, duration: 0.3, stagger: 0.16, ease: "back.out(2)" }, "plan+=0.8")
      .to({}, { duration: 0.5 });

    // ---- 2. LOAD ----
    tl.addLabel("load")
      .call(() => onPhase(1))
      .to(".ghost", { opacity: 0, duration: 0.3 }, "load")
      .to(".check", { opacity: 0, duration: 0.3 }, "load");
    loadOrder.forEach((slot, i) => {
      tl.fromTo(
        `.jcar[data-slot="${slot}"]`,
        { opacity: 0, x: -70, y: 8 },
        { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power2.out" },
        `load+=${0.3 + i * 0.5}`
      );
    });
    tl.to({}, { duration: 0.4 });

    // ---- 3. TRANSIT ----
    tl.addLabel("transit")
      .call(() => onPhase(2))
      .to(".carrier", { x: SHOW_X, duration: 3.2, ease: "power1.inOut" }, "transit")
      .to(".jwheel", { rotation: "+=1440", transformOrigin: "50% 50%", duration: 3.2, ease: "none" }, "transit")
      .to(".route", { opacity: 0, duration: 0.4 }, "transit");

    // ---- 4. DELIVER ----
    tl.addLabel("deliver").call(() => onPhase(3));
    offOrder.forEach((slot, i) => {
      tl.to(
        `.jcar[data-slot="${slot}"]`,
        { x: 240, opacity: 0, duration: 0.7, ease: "power1.in" },
        `deliver+=${0.2 + i * 0.45}`
      );
    });
    tl.to({}, { duration: 0.4 });

    // ---- RESET (fade, reposition while invisible, fade back) ----
    tl.addLabel("reset")
      .to(".carrier", { opacity: 0, duration: 0.4 })
      .set(".carrier", { x: PLANT_X })
      .set(".jcar", { opacity: 0, x: -70, y: 8 })
      .set(".route", { strokeDashoffset: 640, opacity: 1 })
      .to(".carrier", { opacity: 1, duration: 0.4 })
      .to({}, { duration: 0.3 });

    // Only run while the section is on screen.
    ScrollTrigger.create({
      trigger: self,
      start: "top 90%",
      end: "bottom 10%",
      onToggle: (st) => (st.isActive ? tl.play() : tl.pause()),
    });
  }, []);

  return (
    <div ref={scope} className="w-full">
      <svg viewBox="0 116 1000 182" className="w-full" role="img" aria-label="Plant to showroom delivery journey">
        <defs>
          <linearGradient id="jcab" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ff9445" />
            <stop offset="1" stopColor="#f06f0c" />
          </linearGradient>
          <linearGradient id="jroute" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff7a18" />
            <stop offset="1" stopColor="#19e3b1" />
          </linearGradient>
          <linearGradient id="jframe" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#222d42" />
            <stop offset="1" stopColor="#141b2a" />
          </linearGradient>
        </defs>

        {/* ---- Plant (left) ---- */}
        <g opacity="0.9">
          <rect x="18" y="150" width="156" height="102" fill="#1b2436" />
          <path d="M18 150 L46 130 L46 150 L74 130 L74 150 L102 130 L102 150 L130 130 L130 150 L158 130 L158 150 Z" fill="#222d42" />
          <rect x="150" y="124" width="14" height="28" fill="#2a3346" />
          {[0, 1, 2].map((i) => (
            <circle key={i} className="smoke" cx="157" cy="122" r="6" fill="#5b6678" style={{ animationDelay: `${i * 1.05}s` }} />
          ))}
          <rect x="54" y="200" width="46" height="52" fill="#0d1320" />
          {[28, 92, 116].map((x) => (
            <rect key={x} x={x} y="164" width="10" height="12" fill="#ffb44d" opacity="0.6" />
          ))}
        </g>
        <text x="20" y="276" fontSize="13" fontWeight="700" letterSpacing="2" fill="#4a5468" className="font-mono">
          PLANT
        </text>

        {/* ---- Showroom (right) ---- */}
        <g opacity="0.9">
          <path d="M812 252 L812 150 Q812 140 822 140 L972 140 Q982 140 982 150 L982 252 Z" fill="#1b2436" />
          <rect x="808" y="136" width="178" height="12" rx="3" fill="#19e3b1" opacity="0.4" />
          <g fill="#19e3b1" opacity="0.16">
            {[824, 854, 884, 914, 944].map((x) => (
              <rect key={x} x={x} y="156" width="26" height="86" />
            ))}
          </g>
          <g stroke="#0b0f1a" strokeWidth="3">
            {[820, 850, 880, 910, 940, 970].map((x) => (
              <line key={x} x1={x} y1="154" x2={x} y2="250" />
            ))}
          </g>
          <path d="M848 244 Q850 230 866 228 L880 220 Q890 216 902 220 L916 230 Q926 232 926 244 Z" fill="#ff7a18" opacity="0.5" />
        </g>
        <text x="906" y="276" fontSize="13" fontWeight="700" letterSpacing="2" fill="#4a5468" className="font-mono">
          SHOWROOM
        </text>

        {/* ---- Road ---- */}
        <rect x="0" y="252" width="1000" height="7" fill="#0d1320" />
        <line x1="180" y1="262" x2="820" y2="262" stroke="#2a3650" strokeWidth="3" strokeDasharray="22 20" opacity="0.6" />

        {/* planned route */}
        <path className="route" d="M200 246 Q500 232 800 246" fill="none" stroke="url(#jroute)" strokeWidth="3.5" strokeLinecap="round" />

        {/* ---- Carrier (the actor) ---- */}
        <g className="carrier">
          {/* chassis + frame */}
          <rect x="20" y="116" width="338" height="9" rx="3" fill="#0d1320" />
          <rect x="110" y="30" width="6" height="86" fill="url(#jframe)" />
          <rect x="250" y="30" width="6" height="86" fill="url(#jframe)" />
          <rect x="352" y="30" width="6" height="86" fill="url(#jframe)" />
          <rect x="104" y="54" width="254" height="6" rx="2" fill="url(#jframe)" />
          <rect x="100" y="108" width="258" height="7" rx="2" fill="url(#jframe)" />
          <path d="M358 116 L386 138 L358 138 Z" fill="#0d1320" />
          {/* cab */}
          <path d="M18 116 L18 70 Q18 60 30 60 L60 58 Q74 58 74 74 L74 116 Z" fill="url(#jcab)" />
          <path d="M40 64 L40 86 L70 86 L70 74 Q70 64 60 64 Z" fill="#0b0f1a" opacity="0.88" />
          <rect x="18" y="92" width="8" height="14" rx="2" fill="#ffe9b8" />
          {/* wheels */}
          <JWheel cx={48} />
          <JWheel cx={150} />
          <JWheel cx={250} />
          <JWheel cx={330} />

          {/* ghost slots (planning) */}
          <g className="ghosts">
            {SLOTS.map((s, i) => (
              <g key={i} transform={`translate(${s.x} ${s.y})`}>
                <rect className="ghost" x="2" y="6" width="104" height="44" rx="8" fill="none" stroke="#8a97ac" strokeWidth="2" strokeDasharray="6 6" opacity="0" />
                <g className="check" opacity="0">
                  <circle cx="54" cy="28" r="10" fill="#19e3b1" />
                  <path d="M49 28 l4 4 l7 -8" stroke="#0b0f1a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            ))}
          </g>

          {/* cars */}
          {SLOTS.map((s, i) => (
            <g key={i} transform={`translate(${s.x} ${s.y})`}>
              <JCar slot={i} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
