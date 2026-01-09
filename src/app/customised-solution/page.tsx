import { Metadata } from "next";
import Customized from "./Customized";

export const metadata: Metadata = {
  title: "Customized ELV Solutions Dubai | Tailored Technology by Bright ELV",
  description:
    "Bright ELV Technology offers customized ELV solutions in Dubai, delivering tailor-made CCTV, security, and smart technology systems for residential, corporate, retail, and hotel projects across the UAE.",
  keywords:
    "Customized ELV solutions Dubai, tailor made ELV systems, CCTV customized solutions UAE, Bright ELV Technology, smart security solutions Dubai, ELV company UAE",
  openGraph: {
    title: "Customized ELV Solutions – Tailor-Made Technology in Dubai",
    description:
      "Get fully customized ELV solutions from Bright ELV Technology, designed to meet unique project requirements with precision, reliability, and scalability across the UAE.",
    type: "website",
    url: "https://brightelv.com/customized-solutions",
    images: [
      {
        url: "/images/bright-elv-logo.png",
        width: 1200,
        height: 630,
        alt: "Customized ELV Solutions by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized ELV Solutions Dubai | Bright ELV Technology",
    description:
      "Bright ELV Technology provides customized ELV solutions including CCTV, security, and smart systems for projects across Dubai and the UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Customized />
    </>
  );
}
