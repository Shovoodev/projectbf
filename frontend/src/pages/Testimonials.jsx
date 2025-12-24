import Hero from "../components/common/Hero";
import TestimonialsGridSection from "../components/pages/Testimonials/TestimonialsGridSection";

function Testimonials() {
  return (
    <>
      <Hero title={"Testimonials"} subtitle={"Testimonials"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <TestimonialsGridSection />
      </section>
    </>
  );
}

export default Testimonials;
