"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Swathi wordmark with a forward "motion streak" chevron mark that draws
 * itself in on mount — suggesting speed and forward movement.
 */
export default function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a href="#top" className={cn("group flex items-center gap-3", className)}>
      {/* Motion-streak mark */}
      <svg
        width="38"
        height="28"
        viewBox="0 0 38 28"
        fill="none"
        className="shrink-0"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M${2 + i * 6} ${20 - i * 4} L${14 + i * 6} ${20 - i * 4}`}
            stroke="url(#streak)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          />
        ))}
        {/* Chevron arrow head */}
        <motion.path
          d="M24 6 L34 14 L24 22"
          stroke="var(--cargo)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="streak" x1="0" y1="0" x2="38" y2="0">
            <stop stopColor="var(--amber)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--cargo)" />
          </linearGradient>
        </defs>
      </svg>

      <span className="leading-none">
        <span className="block font-display text-lg font-black tracking-tight text-chrome">
          SWATHI
        </span>
        {!compact && (
          <span className="block font-mono text-[9px] font-medium tracking-[0.18em] text-steel">
            SUPPLY&nbsp;CHAIN&nbsp;SERVICES
          </span>
        )}
      </span>
    </a>
  );
}
