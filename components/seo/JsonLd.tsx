/**
 * Organization + WebSite structured data (schema.org JSON-LD).
 * Rendered server-side in the document so crawlers and AI search engines
 * can read company, contact, and location signals directly from the HTML.
 */
const SITE_URL = "https://swathigroups.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Swathi Supply Chain Services Pvt. Ltd.",
      alternateName: "Swathi Transports",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Chennai-based auto-logistics carrier and car-carrier pioneer since 2008, offering full-truck-load (FTL) and part-truck-load (PTL) services across India on a 350+ vehicle, 100% GPS-tracked fleet.",
      slogan: "Live the experience, feel the experience",
      foundingDate: "2008",
      email: "enquiry@swathigroups.com",
      telephone: "+91-96001-16086",
      areaServed: { "@type": "Country", name: "India" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "M-420, KG Apartment, Pallanjuragraham",
        addressLocality: "Thiruvallur",
        addressRegion: "Tamil Nadu",
        postalCode: "602105",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-96001-16086",
          contactType: "sales",
          email: "sales@swathigroups.com",
          areaServed: "IN",
          availableLanguage: ["en", "ta", "hi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-98433-17335",
          contactType: "customer service",
          email: "enquiry@swathigroups.com",
          areaServed: "IN",
          availableLanguage: ["en", "ta", "hi"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Swathi Supply Chain Services",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
