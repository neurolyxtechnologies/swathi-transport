import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

/** Eyebrow + large display title + optional lede, used to open each section. */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cargo">
            <span className="h-px w-8 bg-cargo" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="text-balance text-[1.7rem] leading-[1.1] text-chrome sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal index={2}>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-steel data-[center=true]:mx-auto" data-center={align === "center"}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
