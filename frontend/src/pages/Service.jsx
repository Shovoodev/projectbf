import CTAStrip from "../components/pages/Service/CTAStrip";
import HelpButton from "../components/pages/Service/HelpButton";
import Hero from "../components/pages/Service/Hero";
import Services from "../components/pages/Service/Service";
import Team from "../components/pages/Service/Team";
import Testimonials from "../components/pages/Service/Testimonials";
import WhyChoose from "../components/pages/Service/WhyChoose";

function Service() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <Team />
      <Testimonials />
      <CTAStrip />
      <HelpButton />
    </>
  );
}

export default Service;
