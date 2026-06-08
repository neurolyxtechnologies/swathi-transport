"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { customers } from "@/data/content";

// Split the roster across two rows that drift in opposite directions.
const half = Math.ceil(customers.length / 2);
const rowA = customers.slice(0, half);
const rowB = customers.slice(half);

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div
      className="flex w-max animate-marquee hover:[animation-play-state:paused]"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {[...items, ...items].map((name, i) => (
        <span
          key={`${name}-${i}`}
          className="mx-8 whitespace-nowrap font-display text-2xl font-bold text-steel/55 transition-colors duration-300 hover:text-chrome sm:mx-12 sm:text-3xl"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function Customers() {
  return (
    <Section id="customers" className="overflow-hidden border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Our customer footprints"
        title={
          <>
            Trusted by <span className="text-gradient">industry leaders.</span>
          </>
        }
        lede="Global OEMs and leading logistics players trust us to move their freight."
      />

      <div className="mt-14 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </Section>
  );
}
