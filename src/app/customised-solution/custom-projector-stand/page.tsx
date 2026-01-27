import { Metadata } from "next";
import Projector from "./Projector";

export const metadata: Metadata = {
  title: "Custom Projector Stands & Mounts Dubai | Bespoke AV Furniture Solutions | Bright ELV",
  description:
    "Custom-designed projector stands, mounts, and AV furniture solutions in Dubai. We create tailor-made projector installations for homes, offices, theaters, and commercial spaces with precise positioning and aesthetic integration.",
  keywords:
    "custom projector stands Dubai, bespoke projector mounts UAE, tailor-made AV furniture, custom projector installations, specialized projector housing solutions, projector stand design Dubai, custom media console design, projector ceiling mounts, motorized projector lifts, built-in projector solutions, custom home theater furniture, commercial projector installations, projector positioning solutions, AV equipment stands Dubai, professional projector mounting",
  openGraph: {
    title: "Custom Projector Stands & Mounts | Bespoke AV Furniture Dubai",
    description:
      "Get custom-designed projector stands, mounts, and AV furniture solutions tailored to your space and equipment. Professional design and installation for perfect projector positioning and aesthetic integration.",
    type: "website",
    url: "https://brightelv.com/customised-solution/custom-projector-stand",
    images: [
      {
        url: "/images/custom-projector-stands-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Projector Stands and Mounts by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Projector Stands Dubai | Bespoke AV Furniture Solutions",
    description:
      "Tailor-made projector stands, mounts, and AV furniture solutions designed specifically for your space and equipment requirements in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/custom-projector-stand",
  },
  category: "Audio Visual Solutions",
};

export default function Page() {
  return <Projector />;
}