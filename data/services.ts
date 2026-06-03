export interface Service {
  id: string;
  title: string;
  description: string;
  /** Inline SVG path data for the icon (24x24 viewBox). */
  icon: string;
}

export const services: Service[] = [
  {
    id: "car",
    title: "Car Transportation",
    description:
      "Finished-vehicle transport on multi-deck carriers — OEM and dealership dispatch, delivered showroom-ready.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "ftl",
    title: "Full-Truck-Load (FTL)",
    description:
      "Dedicated full truckloads for time-critical, high-value consignments — your cargo only, no transshipment, no delays.",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    id: "auto",
    title: "Auto Logistics & Parts",
    description:
      "Auto components and large-scale goods moved in 32-ft container trucks for OEM and tier-1 supply chains.",
    icon: "M3 3h18v4H3V3zm0 8h18v10H3V11zm6 4h6",
  },
  {
    id: "container",
    title: "Container Transport",
    description:
      "Stainless-steel close-body Eicher containers — weather-proof, secure, and seal-tracked end to end.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    id: "domestic",
    title: "Domestic Cargo & Express",
    description:
      "Door-to-door cargo across our Chennai, Bengaluru, Hyderabad and Pune hubs, with pan-India reach.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    id: "insured",
    title: "Insured & Live-Tracked",
    description:
      "Every load is comprehensively insured and GPS-tracked from pickup to delivery for total peace of mind.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
];
