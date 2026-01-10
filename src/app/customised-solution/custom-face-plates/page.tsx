import { Metadata } from "next";
import Face from "./Face";

export const metadata: Metadata = {
  title: "Custom Face Plates Dubai | Bespoke Switch Plates & Wall Covers | Bright ELV",
  description:
    "Custom-designed face plates, switch plates, and wall cover solutions in Dubai. We create bespoke electrical face plates, outlet covers, and wall plates with premium materials, finishes, and engraving for residential and commercial projects.",
  keywords:
    "custom face plates Dubai, bespoke switch plates UAE, personalized outlet covers, engraved wall plates, custom electrical face plates, decorative switch covers, premium wall plate solutions, custom engraved plates, brass switch plates, aluminum face plates, acrylic wall covers, smart home face plates, luxury electrical fittings, hotel switch plates, commercial face plate design, branded outlet covers, custom hotel room plates, engraved face plates Dubai",
  openGraph: {
    title: "Custom Face Plates & Switch Plates | Premium Wall Covers Dubai",
    description:
      "Get custom-designed face plates, switch plates, and outlet covers with premium materials and finishes. Bespoke engraving, branding, and design for residential, commercial, and hospitality projects across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/customised-solution/custom-face-plates",
    images: [
      {
        url: "/images/custom-face-plates-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Face Plates and Switch Plates by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Face Plates Dubai | Premium Switch Plates & Wall Covers",
    description:
      "Bespoke face plates, switch plates, and outlet covers with custom engraving and premium finishes for residential, commercial, and hospitality projects in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/custom-face-plates",
  },
  category: "Electrical & Finishing Solutions",
};

export default function Page() {
  return <Face />;
}