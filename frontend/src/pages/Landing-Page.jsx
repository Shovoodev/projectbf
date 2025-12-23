import About from "../components/pages/LandingPage/About";
import CallToActionSection from "../components/pages/LandingPage/CallToActionSection";
import FAQ from "../components/pages/LandingPage/FAQ";
import Hero from "../components/pages/LandingPage/Hero";
import OurServicesSection from "../components/pages/LandingPage/OurServicesSection";
import PackagesPreview from "../components/pages/LandingPage/PackagesPreview";
import ServiceProcessSection from "../components/pages/LandingPage/ServiceProcessSection";
import TeamPreview from "../components/pages/LandingPage/TeamPreview";
import TestimonialsSection from "../components/pages/LandingPage/TestimonialsSection";
import WhyChooseUsSection from "../components/pages/LandingPage/WhyChooseUsSection";
import ServiceAreasSection from "../components/pages/Service-Area/Service-Area";
import ServiceArea from "./Service-Area";

const LandingPage = () => {
  return (
    <div className="">
      <Hero />
      <OurServicesSection />
      <About />
      <CallToActionSection />
      <WhyChooseUsSection />
      <PackagesPreview />
      <ServiceProcessSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <TeamPreview />
      <FAQ />
    </div>
  );
};

export default LandingPage;
