"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Theme = { id: string; name: string; swatch: string[] };

// id "swathi" = brand default. id "" = the original dark "Cargo" palette.
const THEMES: Theme[] = [
  { id: "swathi", name: "Swathi Carrier (default)", swatch: ["#f6efe2", "#c0561d", "#1f7aa8"] },
  { id: "", name: "Cargo (dark)", swatch: ["#0b0f1a", "#ff7a18", "#ffb44d"] },
  { id: "ocean-light", name: "White & Blue", swatch: ["#ffffff", "#2563eb", "#60a5fa"] },
  { id: "midnight", name: "Midnight", swatch: ["#070d1c", "#38bdf8", "#818cf8"] },
  { id: "royal", name: "Royal Violet", swatch: ["#0c0a1f", "#a855f7", "#f0abfc"] },
];

const STORAGE_KEY = "swathi-theme";

function applyTheme(id: string) {
  const root = document.documentElement;
  if (id) root.dataset.theme = id;
  else delete root.dataset.theme;
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY) ?? "swathi"
      : "swathi"
  );

  // Keep the <html data-theme> in sync (the head script applies it pre-paint).
  useEffect(() => {
    applyTheme(active);
  }, [active]);

  const choose = (id: string) => {
    setActive(id);
    applyTheme(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-60 overflow-hidden rounded-2xl border border-steel-dark/40 bg-asphalt-2/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-steel-dark">
              Preview theme
            </p>
            {THEMES.map((t) => (
              <button
                key={t.id || "default"}
                onClick={() => choose(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  active === t.id ? "bg-asphalt-3 text-chrome" : "text-steel hover:bg-asphalt-3/60 hover:text-chrome"
                )}
              >
                <span className="flex shrink-0 overflow-hidden rounded-full ring-1 ring-steel-dark/50">
                  {t.swatch.map((c, i) => (
                    <span key={i} className="h-5 w-3.5" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="flex-1 font-medium">{t.name}</span>
                {active === t.id && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--cargo)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Preview color themes"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-steel-dark/40 bg-asphalt-2/90 text-cargo shadow-2xl backdrop-blur-xl"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 2a10 10 0 100 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.7 1.8-1.7H16a6 6 0 006-6c0-4.4-4.5-8-10-8z" />
        </svg>
      </motion.button>
    </div>
  );
}
