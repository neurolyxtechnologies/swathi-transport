"use client";

import { motion } from "motion/react";
import LorryScene from "@/components/animation/LorryScene";
import { ButtonLink } from "@/components/ui/Button";
import { useGsapContext } from "@/lib/hooks/useGsapContext";

const trust = [
  { value: "48,000+", label: "Vehicles moved" },
  { value: "220+", label: "Cities served" },
  { value: "99.4%", label: "On-time" },
];

export default function Hero() {
  // Scene animation is self-contained in the right panel — it plays once when
  // in view, then idles with subtle ambient motion. No pinning, no scroll overlap.
  const scope = useGsapContext<HTMLDivElement>(({ gsap, reduced }) => {
    if (reduced) {
      gsap.set(".deck-car", { opacity: 1, y: 0 });
      return;
    }

    // Cars load onto the decks, one by one (lower deck first, then upper).
    gsap.set(".deck-car", { opacity: 0, y: 150 });
    const order = [2, 3, 0, 1];
    order.forEach((id, i) =>
      gsap.to(`.deck-car[data-car="${id}"]`, {
        opacity: 1,
        y: 0,
        ease: "back.out(1.4)",
        duration: 0.7,
        delay: 0.5 + i * 0.22,
      })
    );

    // Wheels spin slowly, forever.
    gsap.to(".wheel", { rotate: 360, repeat: -1, ease: "none", duration: 6, transformOrigin: "center" });

    // Whole rig floats gently.
    gsap.to(".lorry-truck", {
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 3.2,
    });
  }, []);

  return (
    <section id="top" ref={scope} className="relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_-10%,#1b2436_0%,#0b0f1a_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute right-[-10%] top-1/3 h-[36rem] w-[36rem] rounded-full bg-cargo/15 blur-[130px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:pt-28">
        {/* ---- Left: copy ---- */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-steel-dark/60 bg-asphalt-2/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-steel backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            B2B Car Carrier · OEM &amp; Dealership
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-5xl leading-[0.95] text-chrome sm:text-6xl"
          >
            From the plant
            <br />
            to the <span className="text-gradient">showroom floor.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-steel"
          >
            Swathi moves manufacturer and dealer vehicles in bulk — factory to
            forecourt. Multi-car carriers, full insurance, and live tracking that
            deliver every unit showroom-ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="#quote">Request a Quote →</ButtonLink>
            <ButtonLink href="#track" variant="outline">
              Track a Consignment
            </ButtonLink>
          </motion.div>

          {/* trust row */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex gap-8 border-t border-steel-dark/20 pt-7"
          >
            {trust.map((t) => (
              <div key={t.label}>
                <dt className="font-display text-2xl font-black text-chrome sm:text-3xl">
                  {t.value}
                </dt>
                <dd className="mt-1 text-xs text-steel">{t.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- Right: contained lorry stage ---- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="hero-stage relative overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/70 to-asphalt/30 p-6 backdrop-blur-sm sm:p-10">
            <div className="bg-grid absolute inset-0 opacity-30" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cargo/20 blur-3xl" />

            <LorryScene className="relative w-full" />

            {/* road strip */}
            <div
              className="absolute inset-x-6 bottom-6 h-2 rounded-full sm:inset-x-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--color-steel-dark) 0 22px, transparent 22px 44px)",
                opacity: 0.5,
              }}
            />

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-signal/30 bg-asphalt/80 px-3.5 py-2 text-xs font-semibold text-signal backdrop-blur sm:right-8 sm:top-8"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
              99.4% on-time
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-16 left-5 flex items-center gap-2 rounded-full border border-steel-dark/40 bg-asphalt/80 px-3.5 py-2 text-xs font-semibold text-chrome backdrop-blur sm:left-8"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-cargo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              </svg>
              Fully insured fleet
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
