export interface Stat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 400, suffix: "+", label: "Fleet vehicles" },
  { value: 8, suffix: "+", label: "Years on the road" },
  { value: 4, suffix: "", label: "Logistics hubs" },
  { value: 100, suffix: "%", label: "Insured & GPS-tracked" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Swathi runs our auto-parts FTL out of Chennai across South India. Full truckloads, on-time, and their Tata fleet means we rarely see a breakdown delay. A dependable partner.",
    name: "Rajesh Kumar",
    role: "Supply Chain Lead, Auto OEM · Chennai",
  },
  {
    quote:
      "We move finished cars and components to dealers in Bengaluru and Hyderabad. Swathi's containers and live tracking made our inbound logistics genuinely predictable.",
    name: "Priya Nair",
    role: "Operations Head, Dealer Network",
  },
  {
    quote:
      "Their 32-ft container trucks and close-body Eicher fleet keep our cargo dry and secure. Whatever we load in Chennai reaches Pune exactly as it left.",
    name: "Vikram Singh",
    role: "Plant Logistics Manager · Tamil Nadu",
  },
  {
    quote:
      "Festive-season volumes are brutal, but Swathi scaled with us, hit every delivery window, and kept every consignment fully insured. Highly recommend.",
    name: "Ananya Rao",
    role: "Regional Head, Auto Distribution · Hyderabad",
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
