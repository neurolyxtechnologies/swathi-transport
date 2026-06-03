"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps } from "@/data/content";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

export default function HowItWorks() {
  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced }) => {
    if (reduced) {
      gsap.set(".road-fill", { width: "100%" });
      gsap.set(".road-lorry", { left: "100%" });
      gsap.set(".step-card", { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".road-track",
        start: "top 75%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    tl.fromTo(".road-fill", { width: "0%" }, { width: "100%", ease: "none" }, 0);
    tl.fromTo(".road-lorry", { left: "0%" }, { left: "100%", ease: "none" }, 0);

    // step cards reveal as the lorry rolls past their position
    gsap.utils.toArray<HTMLElement>(".step-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: { trigger: card, start: "top 85%" },
          delay: (i % 2) * 0.05,
        }
      );
    });
  }, []);

  return (
    <Section id="how" className="overflow-hidden">
      <div ref={scope}>
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              Four steps from <span className="text-gradient">plant to floor.</span>
            </>
          }
          lede="One transparent process for every dispatch. Your team watches each milestone happen — we do all the lifting."
        />

        {/* Road track with traveling lorry */}
        <div className="road-track relative mx-auto mt-20 hidden h-1.5 max-w-5xl lg:block">
          <div className="absolute inset-0 rounded-full bg-asphalt-3" />
          <div className="road-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cargo to-amber" />
          {/* milestone dots */}
          {steps.map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-asphalt bg-amber"
              style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
            />
          ))}
          {/* lorry glyph */}
          <div className="road-lorry absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-14 -translate-y-1 items-end justify-center rounded-md bg-cargo text-asphalt shadow-[0_8px_24px_-4px_rgba(255,122,24,0.6)]">
              <svg width="34" height="22" viewBox="0 0 34 22" fill="currentColor" aria-hidden>
                <rect x="1" y="6" width="20" height="9" rx="1" />
                <path d="M21 8h6l5 4v3H21z" />
                <circle cx="8" cy="17" r="3" fill="#0b0f1a" />
                <circle cx="26" cy="17" r="3" fill="#0b0f1a" />
              </svg>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="step-card rounded-3xl border border-steel-dark/30 bg-asphalt-2/50 p-7"
            >
              <span className="font-display text-5xl font-black text-asphalt-3 [-webkit-text-stroke:1px_var(--color-steel-dark)]">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-bold text-chrome">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
