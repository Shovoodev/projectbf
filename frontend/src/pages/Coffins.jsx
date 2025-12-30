import React from "react";
import Hero from "./../components/common/Hero";
import CoffinCatalog from "../components/pages/Coffins/images/CoffinCatalog";

function Coffins() {
  return (
    <>
      <Hero title={"Coffins"} subtitle={"Coffins"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <CoffinCatalog />
      </section>
    </>
  );
}

export default Coffins;
