import { Metadata } from "next";
import Image from "next/image";
import Contact from "../component/Contact";

export const metadata: Metadata = {
  title: "Contact Bright ELV Technology Dubai | ELV Solutions & Support UAE",
  description:
    "Contact Bright ELV Technology for reliable ELV solutions, CCTV systems, and smart technology services in Dubai and across the UAE. Get expert consultation and installation support today.",
  keywords:
    "Contact Bright ELV Technology, ELV company Dubai contact, CCTV suppliers Dubai, ELV solutions UAE, smart security systems Dubai, ELV installation support",
  openGraph: {
    title: "Contact Bright ELV Technology – ELV Solutions Company in Dubai",
    description:
      "Get in touch with Bright ELV Technology for advanced ELV solutions, CCTV systems, and customized security technology services across Dubai, Abu Dhabi, and the UAE.",
    type: "website",
    url: "https://brightelv.com/contact",
    images: [
      {
        url: "/images/bright-elv-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Bright ELV Technology Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Bright ELV Technology Dubai",
    description:
      "Reach Bright ELV Technology for professional ELV solutions, CCTV installation, and smart technology services across the UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Contact />
    </>
  );
}
