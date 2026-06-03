"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import CountUp from "react-countup";

/** Number that counts up once it scrolls into view. */
export default function StatCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className="tabular-nums">
      {inView ? (
        <CountUp end={value} duration={2.2} decimals={decimals} separator="," />
      ) : (
        (0).toFixed(decimals)
      )}
      {suffix}
    </span>
  );
}
