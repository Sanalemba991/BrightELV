import { Metadata } from "next";
import Maintenance from "./Maintenance";

export const metadata: Metadata = {
  title: "CCTV Maintenance Dubai | Camera System Support & Repair | ELV Services",
  description:
    "Professional CCTV maintenance and support services in Dubai. We provide regular maintenance, troubleshooting, and repair for all CCTV camera systems, ensuring 24/7 security surveillance reliability.",
  keywords:
    "CCTV maintenance Dubai, security camera repair UAE, CCTV system support, camera maintenance services, surveillance system troubleshooting, ELV maintenance Dubai, CCTV preventive maintenance, security system repair, camera cleaning Dubai, DVR/NVR maintenance, CCTV annual maintenance contract, security system upgrades",
  openGraph: {
    title: "CCTV Maintenance Services | ELV Security Support Dubai",
    description:
      "Comprehensive CCTV maintenance and support services by Bright ELV Technology. Professional maintenance contracts, emergency repairs, and system upgrades for security cameras across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/elv-solution/cctv-maintenance",
    images: [
      {
        url: "/images/cctv-maintenance-services.jpg",
        width: 1200,
        height: 630,
        alt: "CCTV Maintenance Services by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV Maintenance Dubai | Security System Support",
    description:
      "Professional CCTV maintenance, repair, and support services for security camera systems in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution/cctv-maintenance",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Maintenance />;
}