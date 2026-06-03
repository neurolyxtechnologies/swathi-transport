"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const t = testimonials[index];

  return (
    <Section className="border-t border-steel-dark/20" inner="max-w-4xl">
      <div className="relative">
        <span className="pointer-events-none absolute -left-2 -top-10 font-display text-[10rem] leading-none text-asphalt-3 select-none">
          &ldquo;
        </span>

        <div className="relative min-h-[16rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <p className="text-2xl font-medium leading-snug text-chrome sm:text-3xl">
                {t.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cargo to-amber font-display text-lg font-black text-asphalt">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-chrome">{t.name}</div>
                  <div className="text-sm text-steel">{t.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-cargo" : "w-4 bg-steel-dark hover:bg-steel"
                }`}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <CarouselButton dir="prev" onClick={() => go(-1)} />
            <CarouselButton dir="next" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CarouselButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-steel-dark/50 text-steel transition-colors hover:border-cargo hover:text-cargo"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
