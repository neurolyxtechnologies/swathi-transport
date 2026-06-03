"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/animation/StatCounter";
import { cities, routes } from "@/data/cities";
import { stats } from "@/data/content";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

// Smoother, more recognisable India silhouette (coords match data/cities.ts).
const INDIA =
  "M40 5 Q50 6 58 12 Q68 15 70 19 Q63 24 61 31 Q62 38 60 46 Q57 56 52 65 Q48 75 44 83 Q42 92 41 99 Q38 90 35 80 Q31 70 27 60 Q24 54 22 50 Q15 49 13 44 Q18 41 21 40 Q21 34 20 30 Q24 22 30 17 Q35 10 40 5 Z";

// Per-city label placement to avoid collisions.
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  Delhi: { dx: 2.6, dy: 0.9, anchor: "start" },
  Jaipur: { dx: 2.6, dy: 0.9, anchor: "start" },
  Ahmedabad: { dx: -2.6, dy: 0.9, anchor: "end" },
  Mumbai: { dx: -2.6, dy: 0.2, anchor: "end" },
  Pune: { dx: 2.6, dy: 2.6, anchor: "start" },
  Hyderabad: { dx: 2.6, dy: 0.9, anchor: "start" },
  Nagpur: { dx: 2.6, dy: 0.9, anchor: "start" },
  Kolkata: { dx: 2.6, dy: 0.9, anchor: "start" },
  Bengaluru: { dx: -2.6, dy: 1.8, anchor: "end" },
  Chennai: { dx: 2.6, dy: 1.8, anchor: "start" },
};

/** Quadratic arc between two cities, bowed outward for a flight-path feel. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const ox = (-dy / dist) * dist * 0.18;
  const oy = (dx / dist) * dist * 0.18;
  return `M${a.x} ${a.y} Q${mx + ox} ${my + oy} ${b.x} ${b.y}`;
}

export default function CoverageMap() {
  const [hover, setHover] = useState<number | null>(null);

  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced }) => {
    const trigger = { trigger: ".map-wrap", start: "top 75%" };

    // Draw route arcs.
    gsap.utils.toArray<SVGPathElement>(".route-arc").forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduced ? 0 : len });
      if (!reduced) {
        gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: i * 0.1, scrollTrigger: trigger });
      }
    });

    if (reduced) {
      gsap.set(".city-pin", { scale: 1, opacity: 1 });
      gsap.set(".route-pulse", { opacity: 0 });
      return;
    }

    // Pop city pins in.
    gsap.fromTo(
      ".city-pin",
      { scale: 0, opacity: 0, transformOrigin: "center" },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.07, delay: 0.3, scrollTrigger: trigger }
    );

    // Pulses travelling along each route — the "live network".
    gsap.utils.toArray<SVGPathElement>(".route-pulse").forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: `3 ${len + 3}`, strokeDashoffset: 0, opacity: 0.95 });
      gsap.to(path, {
        strokeDashoffset: -(len + 3),
        duration: Math.max(2.4, len * 0.16),
        ease: "none",
        repeat: -1,
        delay: 0.6 + i * 0.22,
      });
    });
  }, []);

  return (
    <Section id="coverage" className="border-t border-steel-dark/20">
      <div ref={scope} className="grid items-center gap-14 lg:grid-cols-2">
        {/* Map */}
        <div className="map-wrap relative order-2 lg:order-1">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cargo/10 blur-3xl" />
          <svg viewBox="6 0 80 106" className="relative w-full max-w-lg">
            <defs>
              <linearGradient id="mapFill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#1b2436" />
                <stop offset="1" stopColor="#10182a" />
              </linearGradient>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-cargo)" />
                <stop offset="1" stopColor="var(--color-signal)" />
              </linearGradient>
              <pattern id="mapDots" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.34" fill="#33415c" />
              </pattern>
              <clipPath id="indiaClip">
                <path d={INDIA} />
              </clipPath>
            </defs>

            {/* landmass + territory dots */}
            <path d={INDIA} fill="url(#mapFill)" />
            <g clipPath="url(#indiaClip)">
              <rect x="6" y="0" width="80" height="106" fill="url(#mapDots)" />
            </g>
            <path d={INDIA} fill="none" stroke="#3b4a66" strokeWidth="0.5" strokeLinejoin="round" />

            {/* routes (base draw + travelling pulse) */}
            {routes.map(([a, b], i) => {
              const d = arc(cities[a], cities[b]);
              const connected = hover !== null && (a === hover || b === hover);
              const dim = hover !== null && !connected;
              return (
                <g key={i} style={{ opacity: dim ? 0.12 : 1, transition: "opacity 0.3s" }}>
                  <path
                    className="route-arc"
                    d={d}
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth={connected ? 1 : 0.7}
                    strokeLinecap="round"
                  />
                  <path
                    className="route-pulse"
                    d={d}
                    fill="none"
                    stroke="#5cf2cf"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    opacity="0"
                  />
                </g>
              );
            })}

            {/* cities */}
            {cities.map((c, idx) => {
              const isHover = hover === idx;
              const r = c.hub ? (isHover ? 2.4 : 1.7) : isHover ? 1.7 : 1;
              const lab = LABEL[c.name] ?? { dx: 2.6, dy: 0.9, anchor: "start" as const };
              return (
                <g
                  key={c.name}
                  className="city-pin"
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* hover halo */}
                  {isHover && <circle cx={c.x} cy={c.y} r={r + 2} fill="none" stroke="var(--color-cargo)" strokeWidth="0.4" opacity="0.5" />}
                  {/* hub pulse */}
                  {c.hub && (
                    <circle cx={c.x} cy={c.y} r="2.4" fill="var(--color-cargo)" opacity="0.22">
                      <animate attributeName="r" values="2;3.4;2" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.28;0;0.28" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={c.x} cy={c.y} r={r} fill={c.hub ? "var(--color-cargo)" : "var(--color-amber)"} style={{ transition: "r 0.2s" }} />
                  <text
                    x={c.x + lab.dx}
                    y={c.y + lab.dy}
                    fontSize="2.5"
                    textAnchor={lab.anchor}
                    fill={isHover ? "var(--color-chrome)" : "#8a97ac"}
                    fontWeight={isHover ? 700 : 400}
                    className="font-mono"
                    style={{ transition: "fill 0.2s" }}
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Copy + stats */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Coverage"
            title={
              <>
                One network.
                <br />
                <span className="text-gradient">Every major route.</span>
              </>
            }
            lede="From plant hubs to tier-2 dealer towns, our carriers run the corridors that matter — with the density to dispatch and deliver fast."
          />

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-black text-chrome lg:text-5xl">
                  <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-2 text-sm text-steel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
