import { Metadata } from "next";
import CCTV from "./CCTV";

export const metadata: Metadata = {
  title: "CCTV Installation Dubai | Security Camera Systems | ELV Security Solutions",
  description:
    "Professional CCTV installation services in Dubai. We design, supply, and install complete security camera systems for homes, businesses, and industries across UAE with expert consultation and setup.",
  keywords:
    "CCTV installation Dubai, security camera installation UAE, CCTV camera setup, surveillance system installation, IP camera installation, ELV CCTV solutions, security system installation Dubai, camera installation services, CCTV system design Dubai, Hikvision installation, Dahua installation, home security cameras, commercial CCTV installation, wireless CCTV Dubai",
  openGraph: {
    title: "CCTV Installation Services | Professional Security Systems Dubai",
    description:
      "Complete CCTV installation solutions by Bright ELV Technology. Professional design and installation of security camera systems for residential, commercial, and industrial properties across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/elv-solution/cctv-installation",
    images: [
      {
        url: "/images/cctv-installation-services.jpg",
        width: 1200,
        height: 630,
        alt: "CCTV Installation Services by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCTV Installation Dubai | Security Camera Systems",
    description:
      "Professional CCTV and security camera installation services for homes and businesses in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution/cctv-installation",
  },
  category: "ELV Solutions",
};

export default function CCTVInstallation() {
  return <CCTV />;
}