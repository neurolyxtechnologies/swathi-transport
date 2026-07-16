import { cn } from "@/lib/cn";

/**
 * Swathi brand lockup — the infinity mark + "SWATHI" wordmark + tagline, from
 * `/public/swathi-logo.png` (the same asset the Saradhi app uses). The client
 * is attached to the logo's colours, so we keep the full-colour artwork.
 *
 * The lockup has DARK ink, so it needs a light backing to read on the site's
 * near-black header. Instead of a cold white box we use a warm ivory badge —
 * tuned to the logo's own paper tone + brown — so it feels branded, not
 * bolted-on. `compact` trims the badge + image for tight chrome.
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
      <span
        className={cn(
          // `logo-badge` paints a light chip on dark themes and collapses to
          // nothing on light themes (see globals.css). No inline styles so the
          // theme cascade fully controls it.
          "logo-badge inline-flex items-center rounded-2xl transition-transform group-hover:scale-[1.02]",
          compact ? "px-3 py-2" : "px-5 py-3",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static brand asset from /public */}
        <img
          src="/swathi-logo.png"
          alt="Swathi Logistics & Supply Chain Services"
          className={cn(compact ? "h-12" : "h-20", "w-auto")}
        />
      </span>
    </a>
  );
}
