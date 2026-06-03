"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

// Bento spans: two wide cards on top (featured + FTL), four compact below.
const spanMap: Record<string, string> = {
  car: "sm:col-span-2 lg:col-span-2",
  ftl: "sm:col-span-2 lg:col-span-2",
  auto: "",
  container: "",
  domestic: "",
  insured: "",
};

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
});

function IconBadge({ icon, big = false }: { icon: string; big?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-asphalt-3 ring-1 ring-steel-dark/40 transition-colors group-hover:ring-cargo/50",
        big ? "h-16 w-16" : "h-14 w-14"
      )}
    >
      <svg
        width={big ? 30 : 26}
        height={big ? 30 : 26}
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

/** Compact carrier illustration for the featured card. */
function MiniCarrier() {
  const cars = ["#19e3b1", "#ff7a18", "#5b8def", "#f4f7fb"];
  return (
    <svg viewBox="0 0 300 130" className="w-full">
      <rect x="14" y="96" width="270" height="8" rx="3" fill="#0d1320" />
      {/* posts + decks */}
      <rect x="92" y="20" width="6" height="80" fill="#222d42" />
      <rect x="270" y="20" width="6" height="80" fill="#222d42" />
      <rect x="92" y="52" width="186" height="7" rx="2" fill="#222d42" />
      <rect x="92" y="92" width="186" height="7" rx="2" fill="#222d42" />
      {/* cab */}
      <path d="M16 100 L16 60 Q16 50 26 50 L58 48 Q70 48 70 62 L70 100 Z" fill="#ff7a18" />
      <path d="M40 52 L40 76 L66 76 L66 60 Q66 52 58 52 Z" fill="#0b0f1a" opacity="0.85" />
      {/* cars */}
      {cars.map((c, i) => {
        const top = i < 2;
        const x = 104 + (i % 2) * 86;
        const y = top ? 24 : 64;
        return (
          <g key={i}>
            <path
              d={`M${x} ${y + 22} Q${x} ${y + 8} ${x + 14} ${y + 6} L${x + 26} ${y} Q${x + 34} ${y - 4} ${x + 46} ${y} L${x + 60} ${y + 8} Q${x + 70} ${y + 10} ${x + 70} ${y + 22} Z`}
              fill={c}
            />
            <circle cx={x + 18} cy={y + 22} r={5} fill="#10141f" />
            <circle cx={x + 54} cy={y + 22} r={5} fill="#10141f" />
          </g>
        );
      })}
      {/* wheels */}
      {[40, 120, 200, 252].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={104} r={11} fill="#10141f" />
          <circle cx={cx} cy={104} r={4} fill="#3a4456" />
        </g>
      ))}
    </svg>
  );
}

function FeaturedCard({ s }: { s: Service }) {
  return (
    <SpotlightCard
      className="h-full"
      innerClassName="flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center sm:gap-4 sm:p-8"
    >
      {/* left: copy + metric */}
      <div className="sm:flex-1">
        <div className="flex items-center gap-3">
          <IconBadge icon={s.icon} />
          <span className="rounded-full bg-cargo/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cargo">
            Most popular
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-bold text-chrome">{s.title}</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-steel">
          {s.description}
        </p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-display text-4xl font-black leading-none text-gradient">
            8&ndash;12
          </span>
          <span className="text-sm text-steel">vehicles / trip</span>
        </div>
      </div>

      {/* right: carrier visual */}
      <motion.div
        className="w-full self-end sm:w-2/5 sm:max-w-[240px] sm:self-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
      >
        <MiniCarrier />
      </motion.div>
    </SpotlightCard>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <SpotlightCard className="h-full" innerClassName="flex h-full flex-col p-7">
      <IconBadge icon={s.icon} />
      <h3 className="mb-3 mt-6 text-xl font-bold text-chrome">{s.title}</h3>
      <p className="text-[15px] leading-relaxed text-steel">{s.description}</p>
      <LearnMore />
    </SpotlightCard>
  );
}

export default function Services() {
  const featured = services.find((s) => s.id === "car")!;
  const rest = services.filter((s) => s.id !== "car");

  return (
    <Section id="services" className="border-t border-steel-dark/20">
      <SectionHeading
        eyebrow="What we move"
        title={
          <>
            Built for volume,
            <br />
            <span className="text-gradient">tuned for dealers.</span>
          </>
        }
        lede="From a single dealer top-up run to nationwide plant dispatches, we have the carriers, corridors, and process to move your inventory."
      />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div className={cn("h-full", spanMap[featured.id])} {...reveal(0)}>
          <FeaturedCard s={featured} />
        </motion.div>

        {rest.map((s, i) => (
          <motion.div key={s.id} className={cn("h-full", spanMap[s.id])} {...reveal(i + 1)}>
            <ServiceCard s={s} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
