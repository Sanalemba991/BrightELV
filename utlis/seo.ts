import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://brightelv.com/"),
  title: {
    default: "Bright ELV - ELV & Smart Solutions Dubai | Security Systems UAE",
    template: "%s | Bright ELV Dubai",
  },
  description:
    "Contact +971 55 292 9644 | Bright ELV - Leading provider of ELV systems, smart solutions, security systems, and integrated technologies in UAE. Professional installation and support.",
  keywords: [
    "Bright ELV Dubai",
    "ELV systems UAE",
    "Extra Low Voltage solutions",
    "Smart home automation Dubai",
    "Building Management Systems",
    "Security systems Dubai",
    "CCTV cameras UAE",
    "Access Control Systems",
    "Fire Alarm Systems",
    "Public Address Systems",
    "Structured Cabling",
    "Audio Visual Systems",
    "Home Theater Installation",
    "Smart lighting control",
    "KNX systems UAE",
    "Hotel automation systems",
    "Commercial ELV solutions",
    "Residential smart systems",
    "Network infrastructure",
    "Data center solutions",
    "Video conferencing systems",
    "Digital signage solutions",
    "Perimeter security systems",
    "Intrusion detection systems",
    "Intercom systems Dubai",
    "Energy management systems",
    "IoT solutions UAE",
    "Integrated building systems",
    "Smart office solutions",
    "Hospitality technology solutions",
  ],
  authors: [{ name: "Bright ELV Dubai" }],
  creator: "Bright ELV Dubai",
  publisher: "Bright ELV Dubai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#0052FF",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Bright ELV Dubai",
    locale: "en_US",
    url: "https://brightelv.com",
    title: "Bright ELV - ELV & Smart Solutions Dubai | Security Systems UAE",
    description:
      "Leading provider of ELV systems, smart solutions, security systems, and integrated technologies in UAE. Professional installation and support.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@brightelv",
    creator: "@brightelv",
    title: "Bright ELV - ELV & Smart Solutions Dubai | Security Systems UAE",
    description:
      "Leading provider of ELV systems, smart solutions, security systems, and integrated technologies in UAE. Professional installation and support.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://brightelv.com",
    languages: {
      "en-US": "https://brightelv.com/",
      "ar-AE": "https://brightelv.com/ar/",
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
  generator: "Bright ELV Dubai Website",
  applicationName: "Bright ELV Dubai",
  referrer: "origin-when-cross-origin",
  manifest: "/site.webmanifest",
};

// ✅ Organization Schema (JSON-LD)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bright ELV Dubai",
  description:
    "Leading provider of ELV systems, smart solutions, security systems, and integrated technologies in UAE. Professional installation and support.",
  url: "https://brightelv.com",
  logo: "/logo.png",
  foundingDate: "2010-01-01",
  founder: [{ "@type": "Person", name: "Bright ELV Management" }],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971 55 292 9644",
    contactType: "customer service",
    email: "info@brightelv.com",
    areaServed: "AE",
    availableLanguage: ["English", "Arabic"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dubai - United Arab Emirates",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "XXXXX",
    addressCountry: "AE",
  },
  sameAs: [
    "https://www.instagram.com/brightelv",
    "https://www.facebook.com/brightelv",
    "https://www.linkedin.com/company/bright-elv",
    "https://twitter.com/brightelv",
    "https://brightelv.com/",
  ],
  areaServed: {
    "@type": "Country",
    name: "United Arab Emirates",
    alternateName: "UAE",
  },
  knowsAbout: [
    "ELV Systems",
    "Extra Low Voltage Solutions",
    "Smart Home Automation",
    "Building Management Systems",
    "Security Systems",
    "CCTV Surveillance",
    "Access Control Systems",
    "Fire Alarm Systems",
    "Public Address Systems",
    "Structured Cabling",
    "Audio Visual Systems",
    "KNX Automation",
    "IoT Solutions",
    "Network Infrastructure",
    "Digital Signage",
    "Hotel Automation",
    "Energy Management Systems",
  ],
};

// ✅ Dynamic Content Schema (JSON-LD)
export const dynamicContentSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "WebPage",
        "@id": "https://brightelv.com",
        name: "Home",
        description:
          "Comprehensive ELV, security, and smart technology solutions delivering integrated services for residential and commercial projects.",
        url: "https://brightelv.com",
      },
    },

    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "WebPage",
        "@id": "https://brightelv.com/customised-solutions",
        name: "Customised Solutions",
        description:
          "Tailor-made smart and ELV solutions designed to meet specific residential and commercial requirements, including automation, security, and integrated systems.",
        url: "https://brightelv.com/customised-solutions",
      },
    },

    {
      "@type": "WebPage",
      position: 3,
      item: {
        "@type": "CollectionPage",
        "@id": "https://brightelv.com/elv-solution",
        name: "ELV Solutions",
        description:
          "Advanced Extra Low Voltage (ELV) solutions including security systems, surveillance, access control, networking, and smart building technologies for commercial and residential projects.",
        url: "https://brightelv.com/elv-solution",
      },
    },

    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "AboutPage",
        "@id": "https://brightelv.com/about",
        name: "About Bright ELV",
        description: "Learn about our expertise in ELV and smart solutions",
        url: "https://brightelv.com/about",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "ContactPage",
        "@id": "https://brightelv.com/contact",
        name: "Contact Us",
        description:
          "Get in touch for professional ELV system consultation and installation",
        url: "https://brightelv.com/contact",
      },
    },
  ],
};

// Helper function to generate dynamic metadata
export interface DynamicMetaData {
  title: string;
  description?: string;
  images?: string[];
  slug: string;
}

export const generateDynamicMetadata = (
  type: "contact" | "elv-solution" | "customised-solution"| "about",
  data: DynamicMetaData,
): Metadata => {
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images:
        data.images && data.images.length > 0 ? data.images : ["/logo.png"],
    },
    alternates: {
      canonical: `https://brightelv.com/products`,
    },
  };
};
