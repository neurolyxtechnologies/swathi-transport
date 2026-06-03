export interface Service {
  id: string;
  title: string;
  description: string;
  /** Inline SVG path data for the icon (24x24 viewBox). */
  icon: string;
}

export const services: Service[] = [
  {
    id: "plant-to-showroom",
    title: "Plant-to-Showroom Delivery",
    description:
      "We move new vehicles straight from manufacturing plants and stockyards to your dealership floor — on schedule, every batch.",
    icon: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h.01M15 11h.01",
  },
  {
    id: "multi-car",
    title: "Bulk Multi-Car Carriers",
    description:
      "Hydraulic multi-deck carriers move 8–12 vehicles per trip — built for dealer inventory runs and full-fleet dispatches.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "enclosed",
    title: "Enclosed Transport",
    description:
      "Fully enclosed trailers shield premium, EV, and luxury models from weather, dust, and the road — delivered showroom-ready.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    id: "intercity",
    title: "Intercity & Long-Haul",
    description:
      "Dedicated corridors linking plants, stockyards, and dealer networks across the country, with optimized batch scheduling.",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    id: "dealership",
    title: "Dealer Inventory Logistics",
    description:
      "End-to-end stock movement for showroom networks — bulk dispatch, per-unit condition reports, and on-time handover.",
    icon: "M3 3h18v4H3V3zm0 8h18v10H3V11zm6 4h6",
  },
  {
    id: "insured",
    title: "Insured & Live-Tracked",
    description:
      "Every consignment is comprehensively insured and GPS-tracked from the plant gate to the dealership bay.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4",
  },
];
