import { Metadata } from "next";
import CCTV from "./CCTV";

export const metadata: Metadata = {
  title: "Custom CCTV Consoles Dubai | Bespoke Security Monitoring Stations | Bright ELV",
  description:
    "Custom-designed CCTV consoles and security monitoring stations in Dubai. We build bespoke security operation centers, surveillance desks, and monitoring workstations with integrated cable management, ergonomic design, and professional aesthetics.",
  keywords:
    "custom CCTV consoles Dubai, bespoke security monitoring stations, surveillance control desks, security operation center furniture, monitoring workstations UAE, CCTV console design, security console fabrication, command center consoles, surveillance room furniture, integrated monitoring desks, ergonomic security consoles, multi-monitor CCTV stations, security room furniture design, custom surveillance desks, cable management consoles, wall-mounted CCTV monitors, security monitoring furniture, control room console solutions",
  openGraph: {
    title: "Custom CCTV Consoles | Security Monitoring Stations Dubai",
    description:
      "Get custom-designed CCTV consoles and security monitoring stations for control rooms, security operations centers, and surveillance facilities. Ergonomic design, professional cable management, and integrated solutions across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solution/cctv",
    images: [
      {
        url: "/images/custom-cctv-consoles-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom CCTV Consoles and Security Monitoring Stations by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom CCTV Consoles Dubai | Security Monitoring Stations",
    description:
      "Bespoke CCTV consoles and security monitoring stations with ergonomic design and professional cable management for control rooms and surveillance facilities in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/cctv",
  },
  category: "Security Solutions",
};

export default function Page() {
  return <CCTV />;
}