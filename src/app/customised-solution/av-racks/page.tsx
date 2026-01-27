import { Metadata } from "next";
import AV from "./AV";

export const metadata: Metadata = {
  title: "Custom Portable Mixer & AV Racks Dubai | Bespoke Audio Equipment Solutions | Bright ELV",
  description:
    "Custom-designed portable mixers and AV racks in Dubai. We build bespoke audio mixing consoles, portable DJ setups, and professional equipment racks with integrated cable management, mobility features, and premium durability for events, studios, and commercial use.",
  keywords:
    "custom portable mixer Dubai, bespoke AV racks UAE, portable audio mixer design, DJ mixer customization, event mixing consoles, mobile sound equipment racks, custom DJ setup Dubai, portable PA system racks, audio equipment cases, flight case fabrication, custom mixer enclosures, mobile production racks, event equipment carts, studio rack systems, portable recording consoles, custom audio furniture, equipment transportation solutions, touring rack systems, mobile broadcast consoles, custom sound engineering equipment",
  openGraph: {
    title: "Custom Portable Mixers & AV Racks | Mobile Audio Equipment Dubai",
    description:
      "Get custom-designed portable mixers and AV racks for mobile events, DJ setups, touring productions, and studio applications. Professional fabrication with mobility features, durability, and integrated cable management across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solution/av-racks",
    images: [
      {
        url: "/images/custom-portable-mixer-av-racks-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Portable Mixers and AV Racks for Mobile Audio Solutions by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Portable Mixers & AV Racks Dubai | Mobile Audio Solutions",
    description:
      "Bespoke portable mixers and AV racks designed for mobile events, touring, and professional audio applications. Durable construction with integrated features for Dubai and UAE markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/av-racks",
  },
  category: "Audio & Professional AV Solutions",
};

export default function Page() {
  return <AV />;
}