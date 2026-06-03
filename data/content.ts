export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 48000, suffix: "+", label: "Vehicles dispatched" },
  { value: 220, suffix: "+", label: "Cities & dealer points" },
  { value: 99.4, suffix: "%", label: "On-time delivery", decimals: 1 },
  { value: 14, suffix: "yrs", label: "Serving OEMs & dealers" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Swathi runs our plant-to-dealer dispatches across four states. Every batch arrives on time with clean per-unit condition reports. They're an extension of our supply chain now.",
    name: "Rohan Mehta",
    role: "Logistics Manager, OEM Plant · Pune",
  },
  {
    quote:
      "We move 400+ units a month to our showrooms. Swathi's multi-car carriers and live tracking made our inbound logistics completely predictable.",
    name: "Priya Nair",
    role: "Operations Head, AutoLux Dealerships",
  },
  {
    quote:
      "Enclosed transport for our premium EV line — delivered to the launch showroom spotless and PDI-ready. Zero transit damage in two years.",
    name: "Vikram Singh",
    role: "Network Manager, Luxe Motors · Delhi",
  },
  {
    quote:
      "Bulk stock movement during festive season is brutal. Swathi scaled with us, hit every delivery window, and kept us fully insured throughout.",
    name: "Ananya Rao",
    role: "Regional Head, DriveNation · Hyderabad",
  },
];

export const partners: string[] = [
  "AutoLux",
  "DriveNation",
  "MotorHub",
  "ApexCars",
  "VelocityMotors",
  "PrimeAuto",
];

export interface Step {
  n: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    n: "01",
    title: "Plan the Dispatch",
    description:
      "Share your origin plant, destination dealers, volumes, and timelines. We schedule carriers and confirm an all-in rate.",
  },
  {
    n: "02",
    title: "Load at the Plant",
    description:
      "Our team loads at the plant or stockyard, logging a per-unit condition report for every vehicle on board.",
  },
  {
    n: "03",
    title: "In Transit",
    description:
      "Each consignment rides a dedicated carrier on optimized corridors — your team follows it live via GPS.",
  },
  {
    n: "04",
    title: "Deliver to Showroom",
    description:
      "We deliver to the dealership bay, run a joint condition check, and hand over showroom-ready units.",
  },
];
