"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/animation/StatCounter";
import { cities, routes } from "@/data/cities";
import { stats } from "@/data/content";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

// Stylized India silhouette (0..100 viewBox).
const INDIA =
  "M40 6 L48 8 L55 13 L63 16 Q71 24 70 30 L63 32 L60 39 L58 50 L51 63 L46 78 L41 95 L36 85 L33 71 L27 57 L21 47 L15 42 Q18 35 24 30 L26 21 Q31 12 40 6 Z";

/** Quadratic arc path between two cities, bowed outward for a flight-path feel. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  // perpendicular offset for the curve control point
  const ox = (-dy / dist) * dist * 0.18;
  const oy = (dx / dist) * dist * 0.18;
  return `M${a.x} ${a.y} Q${mx + ox} ${my + oy} ${b.x} ${b.y}`;
}

export default function CoverageMap() {
  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced }) => {
    if (reduced) {
      gsap.set(".route-arc", { strokeDashoffset: 0 });
      gsap.set(".city-pin", { scale: 1, opacity: 1 });
      return;
    }

    const trigger = {
      trigger: ".map-wrap",
      start: "top 70%",
    };

    // draw each route arc
    gsap.utils.toArray<SVGPathElement>(".route-arc").forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.inOut",
        delay: i * 0.12,
        scrollTrigger: trigger,
      });
    });

    // pop the city pins in
    gsap.fromTo(
      ".city-pin",
      { scale: 0, opacity: 0, transformOrigin: "center" },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.08,
        delay: 0.3,
        scrollTrigger: trigger,
      }
    );
  }, []);

  return (
    <Section id="coverage" className="border-t border-steel-dark/20">
      <div ref={scope} className="grid items-center gap-14 lg:grid-cols-2">
        {/* Map */}
        <div className="map-wrap relative order-2 lg:order-1">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cargo/10 blur-3xl" />
          <svg viewBox="0 0 100 105" className="relative w-full max-w-lg">
            <path
              d={INDIA}
              fill="#131a2a"
              stroke="#2a3346"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            {/* routes */}
            <g fill="none" stroke="url(#routeGrad)" strokeWidth="0.7" strokeLinecap="round">
              {routes.map(([a, b], i) => (
                <path key={i} className="route-arc" d={arc(cities[a], cities[b])} />
              ))}
            </g>
            {/* city pins */}
            {cities.map((c) => (
              <g key={c.name} className="city-pin">
                {c.hub && (
                  <circle cx={c.x} cy={c.y} r="2.6" fill="var(--color-cargo)" opacity="0.25">
                    <animate attributeName="r" values="2.2;3.4;2.2" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={c.hub ? 1.5 : 1}
                  fill={c.hub ? "var(--color-cargo)" : "var(--color-amber)"}
                />
                <text
                  x={c.x + 2}
                  y={c.y + 0.6}
                  fontSize="2.3"
                  fill="#8a97ac"
                  className="font-mono"
                >
                  {c.name}
                </text>
              </g>
            ))}
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-cargo)" />
                <stop offset="1" stopColor="var(--color-signal)" />
              </linearGradient>
            </defs>
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
