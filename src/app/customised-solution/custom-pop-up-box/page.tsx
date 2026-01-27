import { Metadata } from "next";
import Pop from "./Pop";

export const metadata: Metadata = {
  title: "Custom Pop-Up Box Solutions Dubai | Bespoke Displays & Interactive Kiosks | Bright ELV",
  description:
    "Custom-designed pop-up boxes, interactive displays, and modular kiosk solutions in Dubai. We create innovative pop-up experiences for retail, exhibitions, events, and commercial spaces with integrated technology.",
  keywords:
    "custom pop-up box Dubai, bespoke pop-up displays UAE, interactive kiosk solutions, modular pop-up systems, event pop-up installations, retail pop-up displays, exhibition pop-up boxes, custom digital kiosks, interactive touch screen displays, pop-up experience design Dubai, branded pop-up installations, temporary display solutions, pop-up retail technology, immersive pop-up experiences, commercial pop-up displays UAE",
  openGraph: {
    title: "Custom Pop-Up Box Solutions | Interactive Displays & Kiosks Dubai",
    description:
      "Get custom-designed pop-up box solutions and interactive displays for retail, events, exhibitions, and commercial applications. Professional design, technology integration, and installation across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solution/custom-pop-up-box",
    images: [
      {
        url: "/images/custom-pop-up-box-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Pop-Up Box Solutions and Interactive Displays by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Pop-Up Box Solutions Dubai | Interactive Display Systems",
    description:
      "Bespoke pop-up box solutions and interactive display systems designed for retail, events, exhibitions, and commercial applications in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/custom-pop-up-box",
  },
  category: "Digital Solutions",
};

export default function Page() {
  return <Pop />;
}