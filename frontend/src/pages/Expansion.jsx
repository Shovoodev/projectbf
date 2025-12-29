import Hero from "../components/common/Hero";
import InvestorInfoPage from "../components/pages/Expansion/InvestorInfoPage";

function Expansion() {
  return (
    <>
      <Hero title={"BTF : Disrupting Death"} subtitle={"expansion"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <InvestorInfoPage />
      </section>
    </>
  );
}

export default Expansion;
