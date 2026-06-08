"use client";

import { useRef, useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import JourneyScene, { type JourneyTimeline } from "@/components/animation/JourneyScene";
import { steps } from "@/data/content";
import { cn } from "@/lib/cn";

const labels = ["plan", "load", "transit", "deliver"];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const tlRef = useRef<JourneyTimeline | null>(null);

  const jumpTo = (i: number) => {
    setActive(i);
    tlRef.current?.play(labels[i]);
  };

  return (
    <Section id="how" className="overflow-hidden">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title={
          <>
            Four steps from <span className="text-gradient">plant to floor.</span>
          </>
        }
        lede="From planning to delivery — one transparent process, on every dispatch."
      />

      {/* Animated journey stage */}
      <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/70 to-asphalt/30 p-3 sm:p-5">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative">
          <JourneyScene onPhase={setActive} tlRef={tlRef} />

          {/* phase progress segments */}
          <div className="mx-auto mt-6 flex max-w-xl gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i <= active ? "bg-gradient-to-r from-cargo to-amber" : "bg-asphalt-3"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Synced, clickable step cards */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <button
              key={step.n}
              onClick={() => jumpTo(i)}
              className={cn(
                "group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300",
                isActive
                  ? "border-cargo/60 bg-asphalt-2 shadow-[0_0_40px_-12px_rgba(255,122,24,0.5)]"
                  : "border-steel-dark/30 bg-asphalt-2/40 hover:border-steel-dark/60"
              )}
            >
              {/* active accent bar */}
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-cargo to-amber transition-transform duration-500",
                  isActive ? "scale-x-100" : "scale-x-0"
                )}
              />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-display text-4xl font-black transition-colors duration-300",
                    isActive
                      ? "text-gradient"
                      : "text-asphalt-3 [-webkit-text-stroke:1px_var(--steel-dark)]"
                  )}
                >
                  {step.n}
                </span>
                {isActive && (
                  <span className="flex items-center gap-1.5 rounded-full bg-cargo/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cargo">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cargo" />
                    Now
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-bold text-chrome">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{step.description}</p>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
