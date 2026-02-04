import Image from "next/image";
import Banner from "./Banner";
import Link from "./Link";
import Slider from "./Silider";
import LinkSec from "./LinkSec";
import OurCompanies from "./OurCompanies";
import Testimonial from "./Testimonal";
import CompanyOverview from "./CompanyOverview";
import Client from "./Client";
export default function Home() {
  return (
    <>
      <Banner />
      <Link />
      <OurCompanies />
      <CompanyOverview />
      <Client />
    </>
  );
}
