import { useEffect, useState } from "react";
import FooterWithoutLinks from "../components/layouts/Footer/FooterWithoutLinks";
import About from "../components/pages/New_Attending_Cremation_Landing/About";
import AttendenceCrementionCom from "../components/pages/New_Attending_Cremation_Landing/AttendenceCrementionCom";
import CallToActionSection from "../components/pages/New_Attending_Cremation_Landing/CallToActionSection";
import FAQ from "../components/pages/New_Attending_Cremation_Landing/FAQ";
import Hero from "../components/pages/New_Attending_Cremation_Landing/Hero";
import SelectionSummaryModal from "../components/pages/New_Attending_Cremation_Landing/SelectionSummaryModal";
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
import { packagePricesDetail } from "../utility/config";
function New_Attending_Cremation_Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const BASE_PRICE = packagePricesDetail.attendingLanding;

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const [selections, setSelections] = useState({
    transferOption: { value: "Sydney Metro", price: 0 },
    stationery: { value: "50 Memoriam Cards", price: 0 },
    bodyPreparation: { value: "General Wash | Dress | Makeup", price: 0 },
    flowers: { value: "Not Selected", price: 0 },
    coffin: { value: "contract-raw", price: 0 },
  });
  useEffect(() => {
    const payload = {
      selections,
      totalPrice,
    };
    sessionStorage.setItem("agreementDraft", JSON.stringify(payload));
  }, [setSelections, setTotalPrice, totalPrice, selections]);

  useEffect(() => {
    const extras = Object.values(selections || {}).reduce(
      (sum, opt) => sum + Number(opt?.price || 0),
      0,
    );

    const finalPrice = BASE_PRICE + extras;
    setTotalPrice(finalPrice);
  }, [selections, BASE_PRICE]);

  return (
    <div className="">
      {/* Selection Summary Modal */}
      <SelectionSummaryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selections={selections}
        totalPrice={totalPrice}
      />
      <Hero />
      <Introduction />
      <About />
      <AttendenceCrementionCom
        setIsOpen={setIsOpen}
        selections={selections}
        setSelections={setSelections}
        totalPrice={totalPrice}
      />
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
