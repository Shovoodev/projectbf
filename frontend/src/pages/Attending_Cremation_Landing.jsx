import ArrangementsIncludedSection from "../components/pages/Attending_Cremation_Landing/ArrangementsIncludedSection";
import AttendingCremationDetailsSection from "../components/pages/Attending_Cremation_Landing/AttendingCremationDetailsSection";
import CremationCostsSydneySection from "../components/pages/Attending_Cremation_Landing/CremationCostsSydneySection";
import Introduction from "../components/pages/Attending_Cremation_Landing/Introduction";
import WhyChooseAttendingCremation from "../components/pages/Attending_Cremation_Landing/WhyChooseAttendingCremation";
import About from "../components/pages/LandingPage/About";
import CallToActionSection from "../components/pages/LandingPage/CallToActionSection";
import FAQ from "../components/pages/LandingPage/FAQ";
import Hero from "../components/pages/LandingPage/Hero";
import ServiceProcessSection from "../components/pages/LandingPage/ServiceProcessSection";
import TeamPreview from "../components/pages/LandingPage/TeamPreview";
import TestimonialsSection from "../components/pages/LandingPage/TestimonialsSection";
import WhyChooseUsSection from "../components/pages/LandingPage/WhyChooseUsSection";
import ServiceAreasSection from "../components/pages/Service-Area/Service-Area";
import AttendenceCrementionPage from "./packages/AttendenceCrementionPage";
function Attending_Cremation_Landing() {
  return (
    <div className="">
      <Hero />
      <Introduction />
      <About />
      <AttendenceCrementionPage isLanding={true} />
      <AttendingCremationDetailsSection />
      <WhyChooseUsSection />
      <CallToActionSection />
      <ArrangementsIncludedSection />
      <ServiceProcessSection />
      <CremationCostsSydneySection />
      <TestimonialsSection />
      <WhyChooseAttendingCremation />
      <ServiceAreasSection />
      <TeamPreview />
      <FAQ />
    </div>
  );
}

export default Attending_Cremation_Landing;
