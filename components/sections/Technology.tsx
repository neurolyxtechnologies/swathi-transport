"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const capabilities = [
  {
    title: "Route optimization & geofencing",
    body: "Smart routing and geofenced corridors for efficient, monitored movement.",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    title: "Real-time track & trace",
    body: "Live online tracking of every consignment, anytime.",
    icon: "M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8zM12 7a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    title: "Integrated barcode + POD",
    body: "Barcode management with proof-of-delivery capture at the delivery point.",
    icon: "M4 5h2v14H4zM8 5h1v14H8zM11 5h2v14h-2zM15 5h1v14h-1zM18 5h2v14h-2z",
  },
  {
    title: "Cross-dock automation",
    body: "Process automation for error-free activities at cross-docks.",
    icon: "M3 7h18M3 12h18M3 17h18M7 7v10M17 7v10",
  },
  {
    title: "Auto SMS / email alerts",
    body: "Automatic alerts for shipments, pendency, and out-for-delivery.",
    icon: "M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8l9-5 9 5",
  },
  {
    title: "Daily MIS reports",
    body: "Stock reports and pending-waybill MIS to all stakeholders, daily.",
    icon: "M9 17v-6M12 17v-10M15 17v-3M5 21h14a1 1 0 001-1V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1z",
  },
  {
    title: "24/7 war-room",
    body: "End-to-end coordination with immediate issue resolution.",
    icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
  {
    title: "One-Touch IT",
    body: "Every capability, unified in a single integrated platform.",
    icon: "M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z",
  },
];

export default function Technology() {
  return (
    <Section id="technology" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Management Information System"
        title={
          <>
            One-touch <span className="text-gradient">IT solutions.</span>
          </>
        }
        lede="From booking to proof-of-delivery — complete visibility on every shipment."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} index={i}>
            <div className="h-full rounded-3xl border border-steel-dark/30 bg-asphalt-2/50 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-asphalt-3 ring-1 ring-steel-dark/40">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-cargo">
                  <path d={c.icon} />
                </svg>
              </div>
              <h3 className="mb-1.5 font-bold text-chrome">{c.title}</h3>
              <p className="text-sm leading-relaxed text-steel">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
