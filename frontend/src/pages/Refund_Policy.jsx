import Hero from "../components/common/Hero";
import LegalDisclaimerSection from "../components/pages/Refund-Policy/LegalDisclaimerSection";

function Refund_Policy() {
  return (
    <>
      <Hero title={"Refund Policy"} subtitle={"Refund Policy"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <LegalDisclaimerSection />
      </section>
    </>
  );
}

export default Refund_Policy;
