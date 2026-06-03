"use client";

import { cn } from "@/lib/cn";

/**
 * Card with a static steel border and a subtle lift on hover. No background or
 * border colour change on hover.
 */
export default function SpotlightCard({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl border border-steel-dark/30 transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-asphalt-2/70",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
