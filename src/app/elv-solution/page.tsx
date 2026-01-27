import { Metadata } from "next";
import Solution from "./Solution";

export const metadata: Metadata = {
  title: "Our ELV Solutions | Bright ELV Technology - Dubai UAE",
  description:
    "Discover comprehensive ELV solutions by Bright ELV Technology. We provide innovative, reliable, and customized ELV systems for residential, commercial, and industrial projects across Dubai and UAE.",
  keywords:
    "ELV solutions Dubai, Extra Low Voltage systems, smart home solutions UAE, building automation, CCTV installation Dubai, access control systems, structured cabling, audio visual solutions, ELV contractors UAE",
  openGraph: {
    title: "Complete ELV Solutions | Bright ELV Technology Dubai",
    description:
      "Professional ELV solutions including CCTV, access control, structured cabling, and smart building systems. Serving Dubai and the UAE with cutting-edge technology.",
    type: "website",
    url: "https://brightelv.com/elv-solutiondi ",
    images: [
      {
        url: "/images/elv-solutions-banner.png",
        width: 1200,
        height: 630,
        alt: "Bright ELV Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELV Solutions by Bright ELV Technology",
    description:
      "Explore our range of ELV solutions designed to enhance security, efficiency, and connectivity for your property in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution",
  },
};

export default function Page() {
  return <Solution />;
}