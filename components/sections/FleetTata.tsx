"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const strengths = [
  {
    title: "Smart technology",
    body: "Telematics and GPS keep every truck connected, tracked, and on-plan.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7z",
  },
  {
    title: "Fuel-efficient",
    body: "Tata Signa efficiency keeps running costs down and our rates competitive.",
    icon: "M3 22h12M5 22V4a1 1 0 011-1h7a1 1 0 011 1v18M14 8h3l3 3v8a2 2 0 01-4 0v-7 M8 7h4",
  },
  {
    title: "Safe & reliable",
    body: "Modern safety on every truck — protecting your cargo and our crew.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
  {
    title: "Strong service support",
    body: "Tata's nationwide service network keeps our fleet road-ready, always.",
    icon: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.6-2.6 2.6-2.6z",
  },
];

export default function FleetTata() {
  return (
    <Section id="fleet" className="border-t border-steel-dark/20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading + strengths */}
        <div>
          <SectionHeading
            eyebrow="Our fleet"
            title={
              <>
                Powered by <span className="text-gradient">Tata.</span>
              </>
            }
            lede="Our business runs on a 400+ strong fleet of Tata Signa trucks and Eicher containers — chosen for the four things that move our profits and our promises."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal key={s.title} index={i}>
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-asphalt-3 ring-1 ring-steel-dark/40">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cargo"
                    >
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-chrome">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-steel">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: Managing Director quote */}
        <Reveal index={2}>
          <figure className="relative overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/80 to-asphalt/30 p-8 sm:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cargo/15 blur-3xl" />
            <span className="pointer-events-none absolute -left-1 -top-6 font-display text-[8rem] leading-none text-asphalt-3 select-none">
              &ldquo;
            </span>

            <blockquote className="relative text-xl font-medium leading-snug text-chrome sm:text-2xl">
              Our Tata trucks are the backbone of the business. The technology, fuel
              efficiency and safety keep our costs down and our deliveries on time —
              and Tata&apos;s service support means our fleet is always road-ready.
              That&apos;s how we keep every promise to our customers.
            </blockquote>

            <figcaption className="relative mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cargo to-amber font-display text-xl font-black text-asphalt">
                HP
              </div>
              <div>
                <div className="font-bold text-chrome">Hari Prasad</div>
                <div className="text-sm text-steel">Managing Director, Swathi Transports</div>
              </div>
            </figcaption>

            <div className="relative mt-7 inline-flex items-center gap-2 rounded-full border border-steel-dark/40 bg-asphalt/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              <span className="h-1.5 w-1.5 rounded-full bg-cargo" />
              Tata Signa · Fleet Partner
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
