import Image from "next/image";
import Banner from "./Banner";
import Link from "./Link";
import Slider from "./Silider";
import LinkSec from "./LinkSec";
import OurCompanies from "./OurCompanies";
import Client from "./Client";
import Testimonial from "./Testimonal";
export default function Home() {
  return (
    <>
      <Banner />
      <Link />
      <Slider />
      <LinkSec />
      <OurCompanies />
      <Client />
      <Testimonial />
    </>
  );
}
