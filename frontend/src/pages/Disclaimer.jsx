import React from "react";
import Hero from "../components/common/Hero";
import LegalDisclaimerSection from "../components/pages/Disclaimer/LegalDisclaimerSection";

function Disclaimer() {
  return (
    <>
      <Hero title={"Disclaimer"} subtitle={"Disclaimer"} />
          <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
              <LegalDisclaimerSection/>
      </section>
    </>
  );
}

export default Disclaimer;
