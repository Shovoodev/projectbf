import FooterWithoutLinks from "../components/layouts/Footer/FooterWithoutLinks";
import About from "../components/pages/New_Attending_Cremation_Landing/About";
import AttendenceCrementionCom from "../components/pages/New_Attending_Cremation_Landing/AttendenceCrementionCom";
import CallToActionSection from "../components/pages/New_Attending_Cremation_Landing/CallToActionSection";
import FAQ from "../components/pages/New_Attending_Cremation_Landing/FAQ";
import Hero from "../components/pages/New_Attending_Cremation_Landing/Hero";
import ServiceProcessSection from "../components/pages/New_Attending_Cremation_Landing/ServiceProcessSection";
import TeamPreview from "../components/pages/New_Attending_Cremation_Landing/TeamPreview";
import TestimonialsSection from "../components/pages/New_Attending_Cremation_Landing/TestimonialsSection";
import ArrangementsIncludedSection from "../components/pages/New_Attending_Cremation_Landing/Uncommon_Components/ArrangementsIncludedSection";
import AttendingCremationDetailsSection from "../components/pages/New_Attending_Cremation_Landing/Uncommon_Components/AttendingCremationDetailsSection";
import CremationCostsSydneySection from "../components/pages/New_Attending_Cremation_Landing/Uncommon_Components/CremationCostsSydneySection";
import Introduction from "../components/pages/New_Attending_Cremation_Landing/Uncommon_Components/Introduction";
import WhyChooseAttendingCremation from "../components/pages/New_Attending_Cremation_Landing/Uncommon_Components/WhyChooseAttendingCremation";
import WhyChooseUsSection from "../components/pages/New_Attending_Cremation_Landing/WhyChooseUsSection";
import ServiceAreasSection from "../components/pages/Service-Area/Service-Area";

function New_Attending_Cremation_Landing() {
  return (
    <div className="">
      <Hero />
      <Introduction />
      <About />
      <AttendenceCrementionCom />
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
      <FooterWithoutLinks />
    </div>
  );
}

export default New_Attending_Cremation_Landing;
