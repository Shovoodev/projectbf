import { useEffect } from "react";
import Hero from "../components/common/Hero";
import GoogleReviews from "../components/pages/Testimonials/GoogleReviews";
import TestimonialsGridSection from "../components/pages/Testimonials/TestimonialsGridSection";

function Testimonials() {
  useEffect(() => {
    // Load Trustpilot script only once
    const script = document.createElement("script");
    script.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Hero title={"Testimonials"} subtitle={"Testimonials"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <GoogleReviews />

        <div
          class="trustpilot-widget"
          data-locale="en-US"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="6988382e52b30924cefa223f"
          data-style-height="52px"
          data-style-width="100%"
          data-token="73252029-05a5-4f58-b619-38a9f6f5819d"
        >
          <a
            href="https://www.trustpilot.com/review/blacktulipfunerals.com.au"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>

        <TestimonialsGridSection />
      </section>
    </>
  );
}

export default Testimonials;
