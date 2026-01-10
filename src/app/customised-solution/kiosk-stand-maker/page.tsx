import { Metadata } from "next";
import Kiosk from "./Kiosk";

export const metadata: Metadata = {
  title: "Kiosk Solutions Dubai | Interactive Kiosk Design & Manufacturing | ELV Technology",
  description:
    "Professional kiosk design, manufacturing, and installation in Dubai. We create custom interactive kiosks for information, ticketing, payment, and self-service applications with integrated ELV technology for various industries across UAE.",
  keywords:
    "kiosk solutions Dubai, interactive kiosk design UAE, custom kiosk manufacturing, digital kiosk installation, self-service kiosks, information kiosks Dubai, payment kiosks UAE, ticketing kiosks, ELV kiosk integration, kiosk enclosure design, touch screen kiosks, outdoor kiosks, indoor kiosks, kiosk software development, kiosk maintenance Dubai",
  openGraph: {
    title: "Custom Kiosk Solutions | Design & Manufacturing Dubai",
    description:
      "Professional custom kiosk design, manufacturing, and integration services by Bright ELV Technology. Complete interactive kiosk solutions for retail, hospitality, healthcare, and government sectors across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solution/kiosk-stand-maker",
    images: [
      {
        url: "/images/kiosk-solutions-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Kiosk Solutions by Bright ELV Technology Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiosk Solutions Dubai | Custom Interactive Kiosks",
    description:
      "Professional custom kiosk design, manufacturing, and installation services for various applications across Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/kiosk-stand-maker",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Kiosk />;
}