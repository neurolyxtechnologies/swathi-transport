"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const stages = [
  { label: "Dispatch confirmed", at: "Chennai Plant · 12 May, 09:24" },
  { label: "Loaded at plant", at: "8 units · condition logged · 12 May, 14:10" },
  { label: "In transit", at: "NH-44 near Hosur · live", live: true },
  { label: "Out for delivery", at: "Bengaluru dealers · est. 15 May" },
  { label: "Delivered to showroom", at: "Whitefield, Bengaluru" },
];

// the shipment is currently at the "In transit" stage (index 2)
const CURRENT = 2;

export default function TrackingDemo() {
  const [tracked, setTracked] = useState(false);
  const [value, setValue] = useState("SWT-48217");

  return (
    <Section id="track" className="border-t border-steel-dark/20" inner="max-w-5xl">
      <SectionHeading
        align="center"
        eyebrow="Live tracking"
        title={
          <>
            Always know where <span className="text-gradient">every unit is.</span>
          </>
        }
        lede="Enter a consignment ID to see the dispatch unfold — every batch updates in real time."
      />

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTracked(true);
        }}
        className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-sm text-steel-dark">
            #
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter consignment ID"
            className="w-full rounded-full border border-steel-dark/40 bg-asphalt-2/60 py-4 pl-10 pr-5 font-mono text-sm text-chrome placeholder:text-steel-dark focus:border-cargo focus:outline-none"
          />
        </div>
        <Button type="submit">Track shipment</Button>
      </form>

      <AnimatePresence>
        {tracked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-steel-dark/30 bg-asphalt-2/50 p-8 sm:p-10">
              {/* route header */}
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-steel-dark">
                    Shipment {value || "SWT-48217"}
                  </div>
                  <div className="mt-1 flex items-center gap-3 font-display text-2xl font-bold text-chrome">
                    Chennai Plant
                    <svg width="40" height="14" viewBox="0 0 40 14" fill="none" className="text-cargo">
                      <path d="M0 7h34M30 2l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Bengaluru
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-signal/10 px-4 py-2 text-sm font-semibold text-signal">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
                  In Transit
                </span>
              </div>

              {/* timeline */}
              <ol className="relative">
                {/* vertical track */}
                <div className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-0.5 bg-asphalt-3" />
                <motion.div
                  className="absolute left-[11px] top-2 w-0.5 bg-gradient-to-b from-cargo to-signal"
                  initial={{ height: 0 }}
                  animate={{ height: `${(CURRENT / (stages.length - 1)) * 100}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                />

                {stages.map((s, i) => {
                  const done = i < CURRENT;
                  const active = i === CURRENT;
                  return (
                    <motion.li
                      key={s.label}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
                      <span
                        className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                          done
                            ? "border-cargo bg-cargo"
                            : active
                              ? "border-signal bg-asphalt"
                              : "border-steel-dark bg-asphalt"
                        }`}
                      >
                        {done && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0b0f1a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                        {active && <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-signal" />}
                      </span>
                      <div className="pt-0.5">
                        <div
                          className={`font-semibold ${
                            active ? "text-signal" : done ? "text-chrome" : "text-steel"
                          }`}
                        >
                          {s.label}
                        </div>
                        <div className="mt-0.5 font-mono text-xs text-steel-dark">
                          {s.at}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
