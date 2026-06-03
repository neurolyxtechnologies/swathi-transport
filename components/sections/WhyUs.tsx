"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { partners } from "@/data/content";

const pillars = [
  {
    title: "Insured, plant to bay",
    body: "Every consignment carries comprehensive transit insurance from the moment it leaves the plant gate.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
  {
    title: "Live GPS tracking",
    body: "Your team follows every batch in real time, with status updates at each milestone of the route.",
    icon: "M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8z M12 7a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    title: "Per-unit condition reports",
    body: "Documented inspection at load and delivery for every vehicle — full accountability, zero disputes.",
    icon: "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  },
  {
    title: "On-time, at scale",
    body: "Optimized corridors and a 99.4% on-time record — even through festive-season volume spikes.",
    icon: "M12 6v6l4 2 M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
];

export default function WhyUs() {
  return (
    <Section id="why" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Why Swathi"
        title={
          <>
            Built on trust,
            <br />
            <span className="text-gradient">measured in care.</span>
          </>
        }
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} index={i}>
            <div className="h-full rounded-3xl border border-steel-dark/30 bg-gradient-to-b from-asphalt-2/70 to-asphalt-2/20 p-7">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-5 text-signal"
              >
                <path d={p.icon} />
              </svg>
              <h3 className="mb-2 text-lg font-bold text-chrome">{p.title}</h3>
              <p className="text-sm leading-relaxed text-steel">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Partner marquee */}
      <div className="relative mt-20 overflow-hidden">
        <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-steel-dark">
          Trusted by dealerships & fleets nationwide
        </p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-16 pr-16">
            {[...partners, ...partners].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-steel-dark/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
