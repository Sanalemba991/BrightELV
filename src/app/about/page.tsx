import { Metadata } from "next";
import Image from "next/image";
import AboutUs from "../component/AboutUs";

export const metadata: Metadata = {
  title: "About Bright ELV Technology | Leading ELV Company in Dubai UAE",
  description:
    "Learn about Bright ELV Technology, a trusted ELV company in Dubai delivering innovative, reliable, and cost-effective ELV solutions. Serving residential, corporate, retail, and hotel projects across the UAE.",
  keywords:
    "About Bright ELV Technology, ELV company Dubai, ELV solutions UAE, CCTV suppliers Dubai, smart building solutions UAE, i-Link brand",
  openGraph: {
    title: "About Bright ELV Technology – Trusted ELV Solutions Provider",
    description:
      "Bright ELV Technology specializes in advanced ELV solutions, CCTV systems, and customized technology services for homes and businesses across Dubai and the UAE.",
    type: "website",
    url: "https://brightelv.com/about",
    images: [
      {
        url: "/images/bright-elv-logo.png",
        width: 1200,
        height: 630,
        alt: "About Bright ELV Technology Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bright ELV Technology Dubai",
    description:
      "Discover Bright ELV Technology, a leading ELV solutions company in Dubai offering smart, secure, and scalable technology solutions across the UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <AboutUs />
    </>
  );
}
