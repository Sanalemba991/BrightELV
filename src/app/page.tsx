import { Metadata } from "next";
import Home from "./component/Home";

export const metadata: Metadata = {
  title: "Bright ELV Technology Dubai | Trusted ELV Solutions Company in UAE",
  description:
    "Bright ELV Technology excels in providing innovative, trustworthy, and cost-efficient ELV solutions in Dubai and across the UAE. We enhance homes and businesses with cutting-edge technology, superior quality, and reliable services.",
  keywords:
    "Bright ELV Technology, ELV company Dubai, ELV solutions UAE, CCTV solutions Dubai, security systems UAE, smart home solutions Dubai, ELV installation Dubai, i-Link brand",
  openGraph: {
    title: "Bright ELV Technology Dubai – Innovative & Reliable ELV Solutions",
    description:
      "Bright ELV Technology is a leading ELV company in Dubai offering CCTV systems, customized ELV solutions, and smart technology for homes, businesses, hotels, and corporate projects across the UAE.",
    type: "website",
    url: "https://brightelv.com",
    images: [
      {
        url: "/images/bright-elv-logo.png",
        width: 1200,
        height: 630,
        alt: "Bright ELV Technology - Advanced ELV Solutions in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright ELV Technology Dubai – Advanced ELV & Security Solutions",
    description:
      "Bright ELV Technology provides cutting-edge ELV solutions, CCTV systems, and customized technology services across Dubai, Abu Dhabi, and the UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
