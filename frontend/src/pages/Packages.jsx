import React from "react";
import Hero from "../components/common/Hero";
import OurPackagesSection from "../components/pages/OurPackagesSection/OurPackagesSection";

function Packages() {
  return (
    <>
      <Hero title={"Packages"} subtitle={"Packages"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <OurPackagesSection />
      </section>
    </>
  );
}

export default Packages;
