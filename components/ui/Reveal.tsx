"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** In-view reveal wrapper. Stagger siblings with the `index` prop. */
export default function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
