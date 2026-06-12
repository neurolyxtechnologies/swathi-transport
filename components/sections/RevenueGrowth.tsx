"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/animation/StatCounter";

// Last three financial years (₹ crore). Most recent last so the bars climb
// left → right. Heights are scaled against a ₹100 Cr ceiling, so each bar's
// height in % literally reads as its crore figure (64% / 75% / 85%) — honest
// proportions with comfortable headroom above the tallest bar for its label.
const CEILING = 100;
const years = [
  { fy: "FY24", value: 64 },
  { fy: "FY25", value: 75, delta: 17 },
  { fy: "FY26", value: 85, delta: 13, latest: true },
];

export default function RevenueGrowth() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-80px" });

  return (
    <Section id="growth" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Track record"
        title={
          <>
            Growth you can <span className="text-gradient">bank on.</span>
          </>
        }
        lede="Three years, three records. Revenue has climbed every single year — built on repeat enterprise contracts and a fleet that keeps scaling."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/80 to-asphalt/30 p-6 sm:p-10"
      >
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cargo/15 blur-3xl" />

        {/* ---- Chart ---- */}
        <div className="relative">
          {/* fixed-height track: bar % heights resolve against this */}
          <div
            ref={chartRef}
            className="relative flex h-64 items-end justify-center gap-8 border-b border-steel-dark/40 sm:h-72 sm:gap-16"
          >
            {/* gridlines */}
            <div className="pointer-events-none absolute inset-0">
              {[25, 50, 75].map((g) => (
                <div
                  key={g}
                  className="absolute inset-x-0 border-t border-steel-dark/15"
                  style={{ bottom: `${g}%` }}
                />
              ))}
            </div>

            {years.map((y, i) => {
              const pct = (y.value / CEILING) * 100;
              const delay = 0.15 + i * 0.18;
              return (
                <div
                  key={y.fy}
                  className="relative h-full w-full max-w-[110px]"
                >
                  {/* bar — grows up from the baseline */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: `${pct}%`, transformOrigin: "bottom" }}
                    className={
                      y.latest
                        ? "absolute inset-x-0 bottom-0 rounded-t-xl bg-gradient-to-t from-cargo/40 to-cargo shadow-[0_0_40px_-4px_var(--cargo)]"
                        : "absolute inset-x-0 bottom-0 rounded-t-xl bg-gradient-to-t from-steel-dark/40 to-steel-dark/70"
                    }
                  />

                  {/* figure — parked just above the bar top */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: delay + 0.5, duration: 0.6 }}
                    style={{ bottom: `calc(${pct}% + 12px)` }}
                    className="absolute inset-x-0 text-center"
                  >
                    <div className="font-display text-2xl font-black leading-none text-gradient sm:text-3xl">
                      <StatCounter value={y.value} prefix="₹" suffix=" Cr" />
                    </div>
                    {y.delta && (
                      <div className="mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-signal">
                        <span aria-hidden>▲</span> {y.delta}% YoY
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* axis labels */}
          <div className="mt-4 flex justify-center gap-8 sm:gap-16">
            {years.map((y) => (
              <div
                key={y.fy}
                className="w-full max-w-[110px] text-center font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                <span className={y.latest ? "text-cargo" : "text-steel"}>
                  {y.fy}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Summary strip ---- */}
        <div className="relative mt-9 grid grid-cols-3 gap-4 border-t border-steel-dark/20 pt-7 text-center">
          {[
            { v: "+33%", l: "Two-year growth" },
            { v: "~15%", l: "Revenue CAGR" },
            { v: "3 yrs", l: "Up, every year" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-xl font-black text-chrome sm:text-2xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-steel">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
