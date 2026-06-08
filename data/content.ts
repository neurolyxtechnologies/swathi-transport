export interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 350, suffix: "+", label: "Vehicles in our fleet" },
  { value: 100, prefix: "₹", suffix: " Cr+", label: "Annual revenue" },
  { value: 100, suffix: "%", label: "GPS-tracked fleet" },
  { value: 20, suffix: "+", label: "Enterprise customers" },
];

/** Real customers from the company deck (shown as styled names; logos can be swapped in later). */
export const customers: string[] = [
  "Hyundai Glovis",
  "Mahindra Logistics",
  "Tata",
  "Hwashin",
  "TLK",
  "Stellantis",
  "CEVA Logistics",
  "Samsung",
  "TCI",
  "Amber",
  "Kia",
  "MRF",
  "Resolute",
  "TGI Packaging",
  "Stellar Plastics",
  "Hyundai",
  "Toyota Logistics",
  "APL Logistics / Vascor",
  "Mando",
  "Hyundai Mobis",
  "Webasto",
  "HTNS",
  "Amara Raja",
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
      "Share your origin, destinations, volumes, and timelines. We schedule carriers and confirm an all-in rate.",
  },
  {
    n: "02",
    title: "Load & Document",
    description:
      "Our team loads at the plant or stockyard, logging a per-unit condition report under our Zero-Damage policy.",
  },
  {
    n: "03",
    title: "In Transit",
    description:
      "Each consignment rides a dedicated, 100% GPS-enabled carrier on optimized corridors — tracked live.",
  },
  {
    n: "04",
    title: "Safe Delivery",
    description:
      "We deliver to the destination, run a joint condition check, and capture proof-of-delivery on the spot.",
  },
];
