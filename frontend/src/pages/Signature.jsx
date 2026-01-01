import Hero from "../components/common/Hero";
import SignatureFormPage from "../components/pages/SignatureFormPage/SignatureFormPage";

function Signature() {
  return (
    <>
      <Hero title={"Additional Next of Kin"} subtitle={"Signiture"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <SignatureFormPage />
      </section>
    </>
  );
}

export default Signature;
