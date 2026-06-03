"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const links = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Coverage", href: "#coverage" },
  { label: "Fleet", href: "#fleet" },
  { label: "Why us", href: "#why" },
  { label: "Track", href: "#track" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-steel-dark/30 bg-asphalt/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-steel transition-colors hover:text-chrome"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cargo transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ButtonLink href="#quote" className="hidden px-5 py-2.5 text-xs sm:inline-flex">
            Get a Quote
          </ButtonLink>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-steel-dark/50 text-chrome lg:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-steel transition-colors hover:bg-asphalt-2 hover:text-chrome"
                >
                  {l.label}
                </a>
              ))}
              <ButtonLink
                href="#quote"
                onClick={() => setOpen(false)}
                className="mt-3 w-full"
              >
                Get a Quote
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
