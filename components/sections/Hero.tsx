"use client";

import { motion, type Variants } from "motion/react";
import LorryScene from "@/components/animation/LorryScene";
import HeroBackdrop from "@/components/animation/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const trust = [
  { value: "18+", label: "Years on the road" },
  { value: "350+", label: "Fleet vehicles" },
  { value: "₹85 Cr", label: "Annual revenue" },
  { value: "100%", label: "GPS-tracked" },
];

// Headline split into words for a masked, word-by-word reveal.
const headline: { text: string; grad?: boolean; break?: boolean }[] = [
  { text: "From" },
  { text: "the" },
  { text: "plant", break: true },
  { text: "to" },
  { text: "the" },
  { text: "showroom", grad: true },
  { text: "floor.", grad: true },
];

const wordVariant: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  // The lorry scene self-animates (see LorryScene). Hero only owns the copy
  // entrance and the framing panel.
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_-10%,var(--asphalt-3)_0%,var(--asphalt)_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute right-[-10%] top-1/3 h-[36rem] w-[36rem] rounded-full bg-cargo/15 blur-[130px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1fr_1.15fr] lg:gap-8 lg:pt-28">
        {/* ---- Left: copy ---- */}
        <div className="max-w-xl">
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.075, delayChildren: 0.3 }}
            className="text-4xl leading-[1.05] text-chrome sm:text-5xl"
          >
            {headline.map((w, i) => (
              <span key={i}>
                <span className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    variants={wordVariant}
                    className={cn("inline-block", w.grad && "text-gradient")}
                  >
                    {w.text}
                  </motion.span>
                </span>
                {w.break ? <br /> : <span> </span>}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="mt-6 max-w-md text-base leading-relaxed text-steel"
          >
            Chennai&apos;s car-carrier pioneers since 2008 — moving automobiles, goods
            and part-loads across India on a 350+ vehicle, 100% GPS-tracked fleet,
            under a strict Zero-Damage policy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="#quote">Request a Quote →</ButtonLink>
            <ButtonLink href="#services" variant="outline">
              Explore Services
            </ButtonLink>
          </motion.div>

          {/* trust row */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-steel-dark/20 pt-7 sm:grid-cols-4"
          >
            {trust.map((t) => (
              <div key={t.label}>
                <dt className="font-display text-xl font-black text-chrome sm:text-2xl">
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
          {/* eyebrow chip sits above the lorry, using the right-side space */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-4 flex w-fit items-center gap-2 rounded-full border border-steel-dark/60 bg-asphalt-2/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.26em] text-steel backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            Auto Logistics · FTL &amp; PTL · Chennai
          </motion.span>

          <div className="hero-stage relative overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/70 to-asphalt/30 p-6 backdrop-blur-sm sm:p-10">
            <div className="bg-grid absolute inset-0 opacity-30" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cargo/20 blur-3xl" />

            {/* plant → showroom backdrop */}
            <HeroBackdrop />

            <LorryScene className="relative w-full" />

            {/* moving road strip */}
            <div
              className="road-move absolute inset-x-6 bottom-6 h-2 rounded-full sm:inset-x-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, var(--steel-dark) 0 22px, transparent 22px 44px)",
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
              className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-steel-dark/40 bg-asphalt/80 px-3.5 py-2 text-xs font-semibold text-chrome backdrop-blur sm:left-8 sm:top-8"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cargo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
