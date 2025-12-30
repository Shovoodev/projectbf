import Hero from "../components/common/Hero";
import FAQ from "../components/pages/FAQ/FAQA";

function Faq() {
  return (
    <>
      <Hero title={"FAQ"} subtitle={"FAQ"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        {/* <CovidPrecautionsSection />
        <FirstStepsSection />
        <FuneralGuideSection /> */}
        <FAQ />
      </section>
    </>
  );
}

export default Faq;
