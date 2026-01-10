import { Metadata } from "next";
import Pabx from "./Pabx";

export const metadata: Metadata = {
  title: "PABX Solutions Dubai | Business Phone Systems | ELV Communications",
  description:
    "Professional ELV PABX solutions in Dubai. We design, install, and maintain advanced business phone systems with VoIP integration, call routing, and unified communications for enterprises across UAE.",
  keywords:
    "ELV PABX Dubai, business phone systems UAE, VoIP solutions Dubai, PBX installation, office telephone systems, call center solutions, unified communications, IP telephony, telephone system maintenance, corporate phone systems, PABX repair Dubai, telephone cabling",
  openGraph: {
    title: "ELV PABX Solutions | Business Communication Systems Dubai",
    description:
      "Advanced PABX and business phone system solutions by Bright ELV Technology. Professional installation, maintenance, and support for enterprise communication networks in Dubai and UAE.",
    type: "website",
    url: "https://brightelv.com/elv-solution/pabx",
    images: [
      {
        url: "/images/elv-pabx-solutions.jpg",
        width: 1200,
        height: 630,
        alt: "ELV PABX Solutions by Bright ELV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PABX Solutions Dubai | Business Phone Systems",
    description:
      "Professional PABX and business telephone system solutions for offices, call centers, and enterprises across Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/elv-solution/pabx",
  },
  category: "ELV Solutions",
};

export default function Page() {
  return <Pabx />;
}