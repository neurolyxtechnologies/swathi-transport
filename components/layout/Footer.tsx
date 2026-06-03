"use client";

import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "#services" },
      { label: "How it works", href: "#how" },
      { label: "Coverage", href: "#coverage" },
      { label: "Fleet", href: "#fleet" },
      { label: "Why us", href: "#why" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Track shipment", href: "#track" },
      { label: "Get a quote", href: "#quote" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-steel-dark/20 bg-asphalt">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              Chennai-based auto logistics & full-truck-load carrier. Car transport,
              auto parts, and container freight across India on a modern Tata Signa
              &amp; Eicher fleet — insured and on time.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel transition-colors hover:text-cargo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
              Back to top
            </button>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-chrome">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-steel transition-colors hover:text-chrome"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-steel-dark/20 pt-7 text-xs text-steel-dark sm:flex-row sm:items-center">
          <span>© {2026} Swathi Lorry Transport. All rights reserved.</span>
          <span className="font-mono tracking-wider">
            MADE FOR THE ROAD · PAN-INDIA NETWORK
          </span>
        </div>
      </div>
    </footer>
  );
}
