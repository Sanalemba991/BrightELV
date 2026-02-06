import Image from "next/image";
import Banner from "./Banner";
import Link from "./Link";
import OurCompanies from "./OurCompanies";
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
