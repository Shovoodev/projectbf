import Hero from "../components/common/Hero";
import CompetitiveAdvantageSection from "../components/pages/Expansion/CompetitiveAdvantageSection";
import CompetitiveLandscapeSection from "../components/pages/Expansion/CompetitiveLandscapeSection";
import IndustryOverviewSection from "../components/pages/Expansion/IndustryOverviewSection";
import InvestorInfoPage from "../components/pages/Expansion/InvestorInfoPage";
import KeyFeaturesSection from "../components/pages/Expansion/KeyFeaturesSection";
import KeyTrendsSection from "../components/pages/Expansion/KeyTrendsSection";

import ProductOfferingsSection from "../components/pages/Expansion/ProductOfferingsSection";
import SwotStrengthsSection from "../components/pages/Expansion/SwotStrengthsSection";
// import Index from "../components/pages/Expansion/middle_section/Index";
function Expansion() {
  return (
    <>
      <Hero title={"BTF : Disrupting Death"} subtitle={"expansion"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16 text-center md:text-left">
        <InvestorInfoPage />
        <ProductOfferingsSection />
        <KeyFeaturesSection />
        <CompetitiveLandscapeSection />
        <IndustryOverviewSection />
        <KeyTrendsSection />
        <CompetitiveAdvantageSection />
        <SwotStrengthsSection />
        {/* <Index /> */}
      </section>
    </>
  );
}

export default Expansion;
