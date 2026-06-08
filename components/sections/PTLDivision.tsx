"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/animation/StatCounter";

const tier1 = ["Chennai", "Salem", "Madurai", "Trichy", "Coimbatore", "Cochin", "Thiruvananthapuram"];
const tier2 = ["Tanjavur", "Villupuram", "Alappey", "Palakkad", "Kollam", "Thrissur", "Kannur"];
const clients = ["Daimler", "TI Cycles"];

const usps = [
  {
    title: "Pay only for the space you use",
    icon: "M12 1v22M16 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7",
  },
  {
    title: "Pan-India network reach",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
  },
  {
    title: "Reduced transit time",
    icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
  {
    title: "Professional handling & support",
    icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  },
];

export default function PTLDivision() {
  return (
    <Section id="ptl" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Also from Swathi · PTL Division"
        title={
          <>
            Don&apos;t need a full truck?{" "}
            <span className="text-gradient">We move part-loads too.</span>
          </>
        }
        lede="Part-loads, warehousing & last-mile across Tamil Nadu & Kerala."
      />

      <Reveal>
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/70 to-asphalt/30">
          {/* Band 1 — value props */}
          <div className="grid gap-x-6 gap-y-5 p-8 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
            {usps.map((u) => (
              <div key={u.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-asphalt-3 ring-1 ring-steel-dark/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-cargo">
                    <path d={u.icon} />
                  </svg>
                </span>
                <h4 className="text-sm font-semibold leading-snug text-chrome">{u.title}</h4>
              </div>
            ))}
          </div>

          {/* Band 2 — proof / scale */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-steel-dark/20 px-8 py-8 sm:px-10 lg:grid-cols-4">
            <div>
              <div className="font-display text-3xl font-black text-gradient sm:text-4xl">
                <StatCounter value={32} suffix=" ft" />
              </div>
              <div className="mt-1.5 text-sm text-steel">Linehaul fleet</div>
            </div>
            <div>
              <div className="font-display text-3xl font-black text-gradient sm:text-4xl">
                <StatCounter value={100} suffix="%" />
              </div>
              <div className="mt-1.5 text-sm text-steel">Company-owned last-mile</div>
            </div>
            <div>
              <div className="font-display text-3xl font-black text-gradient sm:text-4xl">
                <StatCounter value={tier1.length + tier2.length} />
              </div>
              <div className="mt-1.5 text-sm text-steel">Hubs across TN &amp; Kerala</div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-dark">Trusted by</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {clients.map((c) => (
                  <span key={c} className="font-display text-lg font-bold leading-tight text-chrome">{c}</span>
                ))}
              </div>
              <div className="mt-1.5 text-sm text-steel">Anchor clients</div>
            </div>
          </div>

          {/* Band 3 — hub network */}
          <div className="relative border-t border-steel-dark/20 px-8 py-8 sm:px-10">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative flex flex-col gap-5 sm:flex-row">
              <div className="flex-1">
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-cargo">Tier 1</p>
                <div className="flex flex-wrap gap-2">
                  {tier1.map((c) => (
                    <span key={c} className="rounded-full border border-cargo/30 bg-cargo/10 px-3 py-1.5 text-sm font-medium text-chrome">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">Tier 2</p>
                <div className="flex flex-wrap gap-2">
                  {tier2.map((c) => (
                    <span key={c} className="rounded-full border border-steel-dark/40 bg-asphalt-3/60 px-3 py-1.5 text-sm font-medium text-steel">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
