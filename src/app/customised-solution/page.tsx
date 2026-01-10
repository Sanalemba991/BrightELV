import { Metadata } from "next";
import Customized from "./Customized";

export const metadata: Metadata = {
  title: "Customized ELV Solutions Dubai | Tailored Security & Smart Systems | Bright ELV",
  description:
    "Fully customized ELV solutions in Dubai. We design and implement tailor-made security, CCTV, access control, audio visual, and smart building systems for unique residential, commercial, and industrial requirements across UAE.",
  keywords:
    "customized ELV solutions Dubai, tailor-made security systems UAE, bespoke ELV integration, project-specific ELV design, customized CCTV solutions, specialized access control systems, custom smart home automation, unique building technology solutions, ELV system customization Dubai, client-specific ELV solutions, hybrid ELV systems, custom security integration, tailored technology solutions UAE",
  openGraph: {
    title: "Customized ELV Solutions | Tailor-Made Technology Systems Dubai",
    description:
      "Get fully customized ELV solutions designed specifically for your unique requirements. Professional design and implementation of bespoke security, automation, and communication systems across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solutions",
    images: [
      {
        url: "/images/customized-elv-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "Customized ELV Solutions by Bright ELV Technology Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized ELV Solutions Dubai | Tailored Technology Systems",
    description:
      "Professional customized ELV solutions and tailor-made technology systems for unique project requirements across Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solutions",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Customized />;
}