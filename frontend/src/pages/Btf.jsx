import AboutUsSection from "../components/pages/Btf/AboutUsSection";
import CallToActionSection from "../components/pages/Btf/CallToActionSection";
import MeetTheTeamSection from "../components/pages/Btf/MeetTheTeamSection";
import MissionVisionSection from "../components/pages/Btf/MissionVisionSection";
import WhyChooseUsSection from "../components/pages/Btf/WhyChooseUsSection";
import CeoProfile from "../components/pages/Team/CeoProfile";

function Btf() {
  return (
    <>
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <AboutUsSection />
        <CeoProfile />
        <MeetTheTeamSection />
        <MissionVisionSection />
        <WhyChooseUsSection />
        <CallToActionSection />
      </section>
    </>
  );
}

export default Btf;
