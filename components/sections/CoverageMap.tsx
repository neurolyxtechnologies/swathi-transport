"use client";

import { useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/animation/StatCounter";
import { cities, routes } from "@/data/cities";
import { stats } from "@/data/content";
import { useGsapContext } from "@/lib/hooks/useGsapContext";
import indiaGeometry from "@/data/india-geo.json";

// ── Project the real India geometry into the SVG viewBox (once) ───────────────
const W = 112;
const H = 122;
const indiaFeature = {
  type: "Feature" as const,
  geometry: indiaGeometry as GeoJSON.Geometry,
  properties: {},
};
const projection = geoMercator().fitExtent(
  [
    [8, 6],
    [78, H - 8],
  ],
  indiaFeature
);
const pathGen = geoPath(projection);
const COUNTRY_D = pathGen(indiaFeature) ?? "";

/**
 * Round coordinates to a fixed precision before they reach an SVG attribute.
 *
 * `Math.hypot` and float-to-string formatting differ in the final bits between
 * Node and the browser, so the server and client serialised subtly different
 * `d` strings ("…2286845" vs "…22868451") and React reported a hydration
 * mismatch on every route arc. Three decimals is far finer than a 100-unit
 * viewBox can display, and it is identical in both runtimes.
 */
const px = (n: number) => Math.round(n * 1000) / 1000;

function project(lng: number, lat: number) {
  const p = projection([lng, lat]);
  return { x: px(p?.[0] ?? 0), y: px(p?.[1] ?? 0) };
}

// Pre-project every city to SVG coordinates.
const pts = cities.map((c) => ({ ...c, ...project(c.lng, c.lat) }));

// Per-city label placement to avoid collisions.
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  Delhi: { dx: 2.6, dy: 1, anchor: "start" },
  Jaipur: { dx: -2.6, dy: 1, anchor: "end" },
  Ahmedabad: { dx: -2.6, dy: 1, anchor: "end" },
  Mumbai: { dx: -2.6, dy: 0.4, anchor: "end" },
  Pune: { dx: -2.6, dy: 2.8, anchor: "end" },
  Hyderabad: { dx: 2.6, dy: 1, anchor: "start" },
  Nagpur: { dx: 2.6, dy: 1, anchor: "start" },
  Kolkata: { dx: 2.6, dy: 1, anchor: "start" },
  Bengaluru: { dx: -2.6, dy: 2.4, anchor: "end" },
  Chennai: { dx: 2.6, dy: 1.6, anchor: "start" },
};

/** Quadratic arc between two projected points, bowed for a flight-path feel. */
function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ox = (-dy / dist) * dist * 0.16;
  const oy = (dx / dist) * dist * 0.16;
  return `M${px(a.x)} ${px(a.y)} Q${px(mx + ox)} ${px(my + oy)} ${px(b.x)} ${px(b.y)}`;
}

export default function CoverageMap() {
  const [hover, setHover] = useState<number | null>(null);

  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced }) => {
    const trigger = { trigger: ".map-wrap", start: "top 75%" };

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

    gsap.fromTo(
      ".city-pin",
      { scale: 0, opacity: 0, transformOrigin: "center" },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.07, delay: 0.3, scrollTrigger: trigger }
    );

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
          <svg viewBox={`0 0 ${W} ${H}`} className="relative w-full max-w-lg">
            <defs>
              <linearGradient id="mapFill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="var(--asphalt-3)" />
                <stop offset="1" stopColor="var(--asphalt-2)" />
              </linearGradient>
              <linearGradient id="routeGrad" x1="0" y1="0" x2={W} y2={H} gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--cargo)" />
                <stop offset="1" stopColor="var(--signal)" />
              </linearGradient>
              <pattern id="mapDots" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.34" fill="var(--steel)" opacity="0.4" />
              </pattern>
              <clipPath id="indiaClip">
                <path d={COUNTRY_D} />
              </clipPath>
            </defs>

            {/* accurate landmass + territory dots */}
            <path d={COUNTRY_D} fill="url(#mapFill)" />
            <g clipPath="url(#indiaClip)">
              <rect x="0" y="0" width={W} height={H} fill="url(#mapDots)" />
            </g>
            <path d={COUNTRY_D} fill="none" stroke="var(--steel-dark)" strokeWidth="0.5" strokeLinejoin="round" />

            {/* routes */}
            {routes.map(([a, b], i) => {
              const d = arc(pts[a], pts[b]);
              const connected = hover !== null && (a === hover || b === hover);
              const dim = hover !== null && !connected;
              return (
                <g key={i} style={{ opacity: dim ? 0.12 : 1, transition: "opacity 0.3s" }}>
                  <path className="route-arc" d={d} fill="none" stroke="url(#routeGrad)" strokeWidth={connected ? 1 : 0.7} strokeLinecap="round" />
                  <path className="route-pulse" d={d} fill="none" stroke="#5cf2cf" strokeWidth="1.3" strokeLinecap="round" opacity="0" />
                </g>
              );
            })}

            {/* cities */}
            {pts.map((c, idx) => {
              const isHover = hover === idx;
              const r = c.hub ? (isHover ? 2.4 : 1.7) : isHover ? 1.7 : 1;
              const lab = LABEL[c.name] ?? { dx: 2.6, dy: 1, anchor: "start" as const };
              return (
                <g
                  key={c.name}
                  className="city-pin"
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  {isHover && <circle cx={c.x} cy={c.y} r={r + 2} fill="none" stroke="var(--cargo)" strokeWidth="0.4" opacity="0.5" />}
                  {c.hub && (
                    <circle cx={c.x} cy={c.y} r="2.4" fill="var(--cargo)" opacity="0.22">
                      <animate attributeName="r" values="2;3.4;2" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.28;0;0.28" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={c.x} cy={c.y} r={r} fill={c.hub ? "var(--cargo)" : "var(--amber)"} style={{ transition: "r 0.2s" }} />
                  <text
                    x={c.x + lab.dx}
                    y={c.y + lab.dy}
                    fontSize="2.5"
                    textAnchor={lab.anchor}
                    fill={isHover ? "var(--chrome)" : "#8a97ac"}
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

          {/* legend — distinguish real hubs from served-corridor cities */}
          <div className="relative mt-5 flex items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cargo" />
              Operating hub
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber" />
              Served city
            </span>
          </div>
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
            lede="Headquartered in Chennai with hubs in Bengaluru, Hyderabad and Pune — the density to dispatch and deliver across India."
          />

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-black text-chrome lg:text-5xl">
                  <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
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
