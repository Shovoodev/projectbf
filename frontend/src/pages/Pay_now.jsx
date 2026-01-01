import Hero from "../components/common/Hero";
import InvoicePaymentSection from "../components/pages/pay-now/InvoicePaymentSection";

function Pay_now() {
  return (
    <>
      <Hero title={"Pay Now"} subtitle={"Pay Now"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <InvoicePaymentSection />
      </section>
    </>
  );
}

export default Pay_now;
