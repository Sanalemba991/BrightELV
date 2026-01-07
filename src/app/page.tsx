import Image from "next/image";
import Banner from "./component/Banner";
import Link from "./component/Link";
import Slider from "./component/Silider";
import LinkSec from "./component/LinkSec";
import OurCompanies from "./component/OurCompanies";
import Client from "./component/Client";
import Testimonial from "./component/Testimonal";
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
