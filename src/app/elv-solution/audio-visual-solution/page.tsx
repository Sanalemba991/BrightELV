import { Metadata } from "next";
import Audio from "./Audio";

export const metadata: Metadata = {
  title: "Audio Visual Solutions Dubai | AV Systems Integration | ELV AV Services",
  description:
    "Professional audio visual solutions in Dubai. We design and install complete AV systems for conference rooms, boardrooms, home theaters, hotels, and corporate spaces across UAE with expert integration and setup.",
  keywords:
    "audio visual solutions Dubai, AV systems UAE, conference room AV, boardroom audio visual, home theater installation, smart classroom AV, hotel AV systems, ELV audio visual, AV integration Dubai, sound system installation, video conferencing setup, projector installation, LED wall installation, digital signage solutions, multimedia systems",
  openGraph: {
    title: "Audio Visual Solutions | Professional AV Systems Dubai",
    description:
      "Complete audio visual solutions by Bright ELV Technology. Professional AV system design, installation, and integration for corporate, hospitality, education, and residential sectors across Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/elv-solution/audio-visual-solution",
    images: [
      {
        url: "/images/audio-visual-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "Audio Visual Solutions by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Visual Solutions Dubai | AV Systems Integration",
    description:
      "Professional audio visual system design, installation, and integration services for commercial and residential spaces in Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution/audio-visual-solution",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Audio />;
}