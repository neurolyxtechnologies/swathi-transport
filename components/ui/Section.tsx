import { cn } from "@/lib/cn";

/** Standard padded section shell with an optional id anchor. */
export default function Section({
  id,
  children,
  className,
  inner = "max-w-7xl",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-6 py-24 lg:py-32", className)}
    >
      <div className={cn("mx-auto", inner)}>{children}</div>
    </section>
  );
}
