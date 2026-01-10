import { Metadata } from "next";
import Structure from "./Structure";

export const metadata: Metadata = {
  title: "Structured Cabling Solutions Dubai | ELV Systems | Bright ELV Technology",
  description:
    "Professional ELV structured cabling solutions in Dubai. We design and install reliable network infrastructure, data cabling, and fiber optic systems as part of comprehensive ELV solutions across UAE.",
  keywords:
    "ELV structured cabling Dubai, ELV network infrastructure, ELV data cabling, ELV fiber optic solutions, ELV cabling contractors UAE, ELV system integration, Extra Low Voltage cabling, ELV backbone infrastructure, ELV CAT6 installation, ELV cabling standards UAE",
  openGraph: {
    title: "ELV Structured Cabling Solutions | Bright ELV Technology Dubai",
    description:
      "Expert ELV structured cabling and network infrastructure solutions for seamless connectivity in commercial buildings, offices, and data centers across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/elv-solution/structure-cabling",
    images: [
      {
        url: "/images/elv-structured-cabling.jpg",
        width: 1200,
        height: 630,
        alt: "ELV Structured Cabling Solutions by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELV Structured Cabling Dubai | Network Infrastructure",
    description:
      "Professional ELV structured cabling services for reliable network performance in commercial and industrial environments across Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution/structure-cabling",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Structure />;
}