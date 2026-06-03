"use client";

import { motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function Services() {
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

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-steel-dark/30 bg-asphalt-2/60 p-7 transition-colors duration-300 hover:border-cargo/50"
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cargo/0 blur-3xl transition-colors duration-500 group-hover:bg-cargo/20" />

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-asphalt-3 ring-1 ring-steel-dark/40 transition-colors group-hover:ring-cargo/50">
              <svg
                width="26"
                height="26"
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

            <h3 className="mb-3 text-xl font-bold text-chrome">{s.title}</h3>
            <p className="text-[15px] leading-relaxed text-steel">
              {s.description}
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dark transition-colors group-hover:text-cargo">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
