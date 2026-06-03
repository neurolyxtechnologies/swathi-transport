import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swathi Transports — Auto Logistics & Full-Truck-Load, Chennai",
  description:
    "Swathi Transports is a Chennai-based auto-logistics and full-truck-load (FTL) carrier. Car transport, auto parts, and container freight across India on a modern Tata Signa & Eicher fleet — insured and GPS-tracked.",
  keywords: [
    "Swathi Transports",
    "auto logistics Chennai",
    "full truck load FTL",
    "car transportation India",
    "container transport Tamil Nadu",
    "Tata Signa fleet",
  ],
  openGraph: {
    title: "Swathi Transports",
    description:
      "Auto logistics & full-truck-load from Chennai — on a Tata Signa & Eicher fleet.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="grain antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
