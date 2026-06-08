"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services, type Service } from "@/data/services";

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
});

function IconBadge({ icon }: { icon: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-asphalt-3 ring-1 ring-steel-dark/40 transition-colors group-hover:ring-cargo/50">
      <svg
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cargo"
      >
        <path d={icon} />
      </svg>
    </div>
  );
}

function LearnMore() {
  return (
    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dark transition-colors group-hover:text-cargo">
      Learn more
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <SpotlightCard className="h-full" innerClassName="flex h-full flex-col p-7">
      <IconBadge icon={s.icon} />
      <h3 className="mb-3 mt-6 text-xl font-bold text-chrome">{s.title}</h3>
      <p className="text-[15px] leading-relaxed text-steel">{s.description}</p>
      <div className="mt-auto">
        <LearnMore />
      </div>
    </SpotlightCard>
  );
}

export default function Services() {
  return (
    <Section id="services" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="What we move"
        title={
          <>
            Built for volume, <span className="text-gradient">tuned for dealers.</span>
          </>
        }
        lede="Part-loads, full truckloads, or a nationwide plant dispatch — we have the carriers and corridors to move it."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {services.map((s, i) => (
          <motion.div key={s.id} className="h-full" {...reveal(i)}>
            <ServiceCard s={s} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
