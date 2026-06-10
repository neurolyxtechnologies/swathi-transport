"use client";

import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

// One value for every letter of SWATHI — read the big initials top-to-bottom.
const values = [
  {
    letter: "S",
    title: "Safety Above All",
    body: "Every person returns home safely. No delivery is worth a life — we never compromise on safety for speed or profit.",
    hi: "सुरक्षा सर्वोपरि",
    roman: "Suraksha Sarvopari",
  },
  {
    letter: "W",
    title: "Word is Bond",
    body: "When we commit, we deliver. Our handshake is our contract — we don't overpromise, we overdeliver.",
    hi: "वादा निभाना",
    roman: "Vaada Nibhana",
  },
  {
    letter: "A",
    title: "Accountability at Every Level",
    body: "Everyone owns their role. No excuses, only solutions. Problems are solved, not passed along.",
    hi: "ज़िम्मेदारी",
    roman: "Zimmedaari",
  },
  {
    letter: "T",
    title: "Treat People with Dignity",
    body: "Drivers, customers, vendors — everyone deserves respect. We don't tolerate disrespect from anyone toward anyone.",
    hi: "सम्मान",
    roman: "Sammaan",
  },
  {
    letter: "H",
    title: "Hunger to Improve",
    body: "Good enough today is not good enough tomorrow. We learn from every mistake and constantly raise the bar.",
    hi: "सुधार की भूख",
    roman: "Sudhar ki Bhookh",
  },
  {
    letter: "I",
    title: "Integrity in Everything",
    body: "We do the right thing even when no one is watching. No bribes, no shortcuts, no false documentation.",
    hi: "ईमानदारी",
    roman: "Imaandaari",
  },
];

export default function CoreValues() {
  return (
    <Section id="values" className="border-t border-steel-dark/20">
      <SectionHeading
        align="center"
        eyebrow="Core values"
        title={
          <>
            What <span className="text-gradient">SWATHI</span> stands for.
          </>
        }
        lede="Six values — one for every letter of our name."
      />

      <div className="mx-auto mt-12 max-w-4xl divide-y divide-steel-dark/20 border-y border-steel-dark/20">
        {values.map((v, i) => (
          <Reveal key={v.letter} index={i}>
            <div className="flex items-start gap-5 py-5 sm:gap-8 sm:py-6">
              <span className="text-gradient w-10 shrink-0 font-display text-5xl font-black leading-none sm:w-16 sm:text-6xl">
                {v.letter}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-bold text-chrome sm:text-xl">
                    {v.title}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cargo">
                    {v.hi} · {v.roman}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-steel">{v.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Closing brand line from the values deck */}
      <Reveal index={6}>
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="font-display text-base font-bold tracking-wide text-chrome sm:text-xl">
            Moving vehicles. Moving parts.{" "}
            <span className="text-gradient">Moving lives forward.</span>
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
            Our driver, our pride · Hamara driver, hamara gaurav
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
