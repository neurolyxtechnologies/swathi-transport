"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cargo/70 disabled:opacity-50 cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cargo to-amber text-asphalt hover:shadow-[0_10px_40px_-8px_rgba(255,122,24,0.6)]",
  outline:
    "border border-steel-dark/70 text-chrome hover:border-cargo hover:text-cargo",
  ghost: "text-steel hover:text-chrome",
};

const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
} as const;

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: Variant } & HTMLMotionProps<"button">) {
  return (
    <motion.button
      {...motionProps}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: Variant } & HTMLMotionProps<"a">) {
  return (
    <motion.a
      {...motionProps}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default Button;
