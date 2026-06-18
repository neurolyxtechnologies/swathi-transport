"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const leaders = [
  {
    name: "Swathi",
    title: "Executive Director, Swathi Supply Chain Services",
    photo: "/swathi.png",
    initials: "SW",
    quote:
      "We started with a single truck and a simple promise — move every load safely, on time, and in full view. Today that promise runs a pan-India network, and I'm proud it's a women-led enterprise proving Indian logistics can lead on trust and technology.",
  },
  {
    name: "Hari Prasad",
    title: "Chief Executive Officer, Swathi Supply Chain Services",
    photo: null,
    initials: "HP",
    quote:
      "From a single transport operation in 2008 to a pan-India supply-chain partner, our promise hasn't changed — move every consignment safely, on time, and with complete transparency. Zero damage isn't a target, it's the standard.",
  },
];

const strengths = [
  {
    title: "Pioneer since 2008",
    body: "Among the first in organized car-carrier operations in India — built into a supply-chain company in 2013.",
    icon: "M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z",
  },
  {
    title: "350+ vehicle fleet",
    body: "150 car carriers and 200+ containerized goods carriers — flexible capacity for any volume.",
    icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 19a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM18 19a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z",
  },
  {
    title: "100% GPS-enabled",
    body: "Live track & trace on every vehicle for real-time updates and full operational transparency.",
    icon: "M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8zM12 7a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    title: "Zero-Damage policy",
    body: "Stringent damage-prevention programs and continuous driver training, end to end.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
];

export default function Strengths() {
  return (
    <Section id="strengths" className="border-t border-steel-dark/20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading + strengths */}
        <div>
          <SectionHeading
            eyebrow="Our edge"
            title={
              <>
                Built to deliver, <span className="text-gradient">since 2008.</span>
              </>
            }
            lede="From a single transport operation to a pan-India supply-chain partner."
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

        {/* Right: Leadership */}
        <div className="space-y-6">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} index={i + 2}>
              <figure className="relative overflow-hidden rounded-[1.75rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/80 to-asphalt/30 p-7 sm:p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cargo/15 blur-3xl" />

                <figcaption className="relative flex items-center gap-4">
                  {leader.photo ? (
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-cargo/50">
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        sizes="56px"
                        className="object-cover object-[center_22%]"
                      />
                    </div>
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cargo to-amber font-display text-xl font-black text-asphalt">
                      {leader.initials}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-chrome">{leader.name}</div>
                    <div className="text-sm text-steel">{leader.title}</div>
                  </div>
                </figcaption>

                <span className="pointer-events-none absolute right-6 top-2 font-display text-[5rem] leading-none text-asphalt-3 select-none">
                  &rdquo;
                </span>

                <blockquote className="relative mt-5 text-base leading-relaxed text-steel sm:text-lg">
                  {leader.quote}
                </blockquote>
              </figure>
            </Reveal>
          ))}

          <div className="inline-flex items-center gap-2 rounded-full border border-steel-dark/40 bg-asphalt/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
            <span className="h-1.5 w-1.5 rounded-full bg-cargo" />
            Live the experience · Feel the experience
          </div>
        </div>
      </div>
    </Section>
  );
}
