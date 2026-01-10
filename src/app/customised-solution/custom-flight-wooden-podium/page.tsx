import { Metadata } from "next";
import Custom from "./Custom";

export const metadata: Metadata = {
  title: "Custom Flight Wooden Podiums Dubai | Bespoke Aviation & Presentation Furniture | Bright ELV",
  description:
    "Custom-designed flight wooden podiums for aviation displays, presentations, and exhibitions in Dubai. We create bespoke wooden podiums for aircraft models, presentations, and display stands with premium craftsmanship and finishing.",
  keywords:
    "custom flight wooden podium Dubai, aviation display podiums UAE, bespoke aircraft model stands, wooden presentation podiums, exhibition display stands, custom wooden podiums for models, aviation exhibition furniture, flight display pedestals, wooden aircraft stands, custom museum display podiums, aviation memorabilia stands, presentation podium design Dubai, premium wooden display furniture, flight school display stands, aviation event podiums, custom woodwork for aviation displays",
  openGraph: {
    title: "Custom Flight Wooden Podiums | Aviation Display Furniture Dubai",
    description:
      "Get custom-designed wooden podiums for flight displays, aircraft models, and aviation presentations. Bespoke craftsmanship and premium wood finishes for museums, exhibitions, flight schools, and corporate displays in Dubai.",
    type: "website",
    url: "https://brightelv.com/customised-solution/custom-flight-wooden-podium",
    images: [
      {
        url: "/images/custom-flight-wooden-podiums-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Flight Wooden Podiums and Aviation Display Stands by Bright ELV Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Flight Wooden Podiums Dubai | Aviation Display Furniture",
    description:
      "Bespoke wooden podiums and display stands for aircraft models, aviation presentations, and exhibitions. Premium craftsmanship for aviation displays across Dubai and UAE.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://brightelv.com/customised-solution/custom-flight-wooden-podium",
  },
  category: "Custom Furniture Solutions",
};

export default function Page() {
  return <Custom />;
}