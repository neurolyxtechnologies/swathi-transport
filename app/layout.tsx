import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import JsonLd from "@/components/seo/JsonLd";

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

const SITE_URL = "https://swathigroups.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Swathi Supply Chain Services | FTL, PTL & Auto Logistics",
    template: "%s · Swathi Supply Chain Services",
  },
  description:
    "Chennai's car-carrier pioneers since 2008. FTL & PTL auto logistics across India on a 350+ vehicle, 100% GPS-tracked Tata Signa & Eicher fleet — zero-damage.",
  applicationName: "Swathi Supply Chain Services",
  authors: [{ name: "Swathi Supply Chain Services Pvt. Ltd." }],
  creator: "Swathi Supply Chain Services Pvt. Ltd.",
  publisher: "Swathi Supply Chain Services Pvt. Ltd.",
  category: "Logistics",
  keywords: [
    "Swathi Supply Chain Services",
    "Swathi Transports",
    "auto logistics Chennai",
    "car carrier transport India",
    "full truck load FTL",
    "part truck load PTL",
    "FTL PTL transport Chennai",
    "vehicle logistics Tamil Nadu",
    "car transportation India",
    "GPS-tracked fleet",
    "Tata Signa Eicher fleet",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Swathi Supply Chain Services",
    title: "Swathi Supply Chain Services | FTL, PTL & Auto Logistics",
    description:
      "Auto logistics, FTL & PTL from Chennai — a 350+ vehicle, 100% GPS-tracked fleet, since 2008.",
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swathi Supply Chain Services | FTL, PTL & Auto Logistics",
    description:
      "Auto logistics, FTL & PTL from Chennai — a 350+ vehicle, 100% GPS-tracked fleet, since 2008.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      lang="en-IN"
      suppressHydrationWarning
      className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Apply saved preview theme before paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('swathi-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <JsonLd />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <ThemeSwitcher />
      </body>
    </html>
  );
}
