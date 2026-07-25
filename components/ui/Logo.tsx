import { cn } from "@/lib/cn";

/**
 * Swathi brand lockup — the infinity mark + "SWATHI" wordmark + tagline, from
 * `/public/swathi-logo-mark.png` (the full-colour artwork with its white
 * background removed to transparent). The full-colour logo reads cleanly on
 * both the dark header and the light themes, so no backing chip is needed.
 * `compact` trims the image for tight chrome.
 */
export default function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <a href="#top" className={cn("group inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand asset from /public */}
      <img
        src="/swathi-logo-mark.png"
        alt="Swathi Logistics & Supply Chain Services"
        className={cn(
          "w-auto transition-transform group-hover:scale-[1.02]",
          compact ? "h-11" : "h-10 sm:h-14 lg:h-16",
        )}
      />
    </a>
  );
}
