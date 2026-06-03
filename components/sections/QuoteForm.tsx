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
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--color-signal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-chrome">Quote request sent!</h3>
                  <p className="mt-3 max-w-sm text-steel">
                    Thanks — our team will reach out within the hour with your
                    all-inclusive price. Keep an eye on your inbox.
                  </p>
                  <button
                    onClick={() => setSent(false)}
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-4"
                >
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
                  <Button type="submit" className="w-full">
                    Request my quote →
                  </Button>
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
