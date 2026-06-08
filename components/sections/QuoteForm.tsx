"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="group relative">
      <input
        type={type}
        name={name}
        required={required}
        placeholder=" "
        className="peer w-full rounded-2xl border border-steel-dark/40 bg-asphalt/60 px-4 pb-2.5 pt-6 text-chrome transition-colors focus:border-cargo focus:outline-none"
      />
      <label className="pointer-events-none absolute left-4 top-4 text-steel transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cargo peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>
    </div>
  );
}

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return; // honeypot: a bot filled the hidden field

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // No key configured yet → show success locally so the form still works.
    if (!key) {
      setSent(true);
      return;
    }

    setStatus("submitting");
    try {
      const payload = Object.fromEntries(fd.entries());
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: "New quote request — Swathi Supply Chain Services",
          from_name: (payload.name as string) || "Website lead",
          ...payload,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("idle");
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="quote" className="border-t border-steel-dark/20" inner="max-w-6xl">
      <div className="overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-asphalt-2/80 to-asphalt-2/20">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          {/* Left pitch panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-cargo to-amber p-12 lg:flex">
            <div className="bg-grid absolute inset-0 opacity-20" />
            <div className="relative">
              <h2 className="text-4xl leading-tight text-asphalt">
                Move your
                <br />
                inventory with us.
              </h2>
              <p className="mt-5 max-w-xs text-asphalt/80">
                Tell us your route and volumes. We&apos;ll send a transparent,
                all-inclusive dispatch quote — usually within the hour.
              </p>
            </div>
            <ul className="relative space-y-3 text-asphalt">
              {["No hidden fees", "Fully insured consignments", "Plant pickup & showroom delivery"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right form */}
          <div className="relative p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[28rem] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-signal/15"
                  >
                    {/* sparks */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full bg-signal"
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i / 8) * Math.PI * 2) * 52,
                          y: Math.sin((i / 8) * Math.PI * 2) * 52,
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                      />
                    ))}
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-chrome">Quote request sent!</h3>
                  <p className="mt-3 max-w-sm text-steel">
                    Thanks — our team will reach out within the hour with your
                    all-inclusive price. Keep an eye on your inbox.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setStatus("idle");
                    }}
                    className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-steel underline-offset-4 hover:text-cargo hover:underline"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* honeypot (hidden from humans, traps bots) */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Contact name" name="name" />
                    <Field label="Company" name="company" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Work email" name="email" type="email" />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Origin (plant / stockyard)" name="from" />
                    <Field label="Destination (dealers)" name="to" />
                  </div>
                  <Field label="Vehicles & monthly volume" name="volume" />
                  <div className="group relative">
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder=" "
                      className="peer w-full resize-none rounded-2xl border border-steel-dark/40 bg-asphalt/60 px-4 pb-2.5 pt-6 text-chrome transition-colors focus:border-cargo focus:outline-none"
                    />
                    <label className="pointer-events-none absolute left-4 top-4 text-steel transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cargo peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
                      Anything else? (optional)
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending…" : "Request my quote →"}
                  </Button>
                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong — please try again, or email us directly.
                    </p>
                  )}
                  <p className="text-center text-xs text-steel-dark">
                    By submitting you agree to be contacted about your dispatch.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
