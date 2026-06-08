"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const phones = ["+91 96001 16086", "+91 98433 17335", "+91 88068 62191"];
const emails = [
  "hariprasad@swathigroups.com",
  "marketing@swathigroups.com",
  "prem@swathigroups.com",
  "sales@swathigroups.com",
  "enquiry@swathigroups.com",
];

function Row({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 border-b border-steel-dark/20 py-5 last:border-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-asphalt-3 ring-1 ring-steel-dark/40 text-cargo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dark">{label}</p>
        <div className="mt-1.5 space-y-1">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-steel-dark/20" inner="max-w-6xl">
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Let&apos;s move your <span className="text-gradient">freight.</span>
          </>
        }
        lede="Reach our team directly — we typically respond within the hour."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Details */}
        <Reveal>
          <div className="rounded-[2rem] border border-steel-dark/30 bg-asphalt-2/50 p-8 sm:p-10">
            <Row label="Contact" icon="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z">
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="font-medium text-chrome transition-colors hover:text-cargo">
                    {p}
                  </a>
                ))}
              </div>
            </Row>

            <Row label="Email" icon="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-5 9 5">
              <div className="flex flex-col gap-1">
                {emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="text-sm text-steel transition-colors hover:text-cargo">
                    {e}
                  </a>
                ))}
              </div>
            </Row>

            <Row label="Address" icon="M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8zM12 7a3 3 0 100 6 3 3 0 000-6z">
              <p className="text-sm leading-relaxed text-steel">
                M-420, KG Apartment, Pallanjuragraham,
                <br />
                Thiruvallur, Tamil Nadu – 602 105
              </p>
            </Row>
          </div>
        </Reveal>

        {/* CTA panel */}
        <Reveal index={1}>
          <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[2rem] border border-steel-dark/30 bg-gradient-to-br from-cargo to-amber p-8 sm:p-10">
            <div className="bg-grid absolute inset-0 opacity-20" />
            <div className="relative">
              <h3 className="text-3xl leading-tight text-asphalt">
                Ready to ship
                <br />
                with us?
              </h3>
              <p className="mt-4 max-w-xs text-asphalt/80">
                Send us your route and volumes — we&apos;ll get back with an
                all-inclusive quote, fast.
              </p>
            </div>
            <ButtonLink
              href="#quote"
              className="relative w-fit border border-asphalt/20 bg-asphalt text-chrome hover:shadow-none"
            >
              Request a Quote →
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
