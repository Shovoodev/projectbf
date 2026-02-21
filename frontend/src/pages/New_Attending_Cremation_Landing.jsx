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
import { useEffect, useState } from "react";
import { packagePricesDetail } from "../utility/config";
import { FaTimes } from "react-icons/fa";
import LandingAgreement from "./LandingAgreement";
function New_Attending_Cremation_Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const BASE_PRICE = packagePricesDetail.attendingLanding

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const [selections, setSelections] = useState({
    transferOption: { value: "Sydney Metro", price: 0 },
    stationery: { value: "50 Memoriam Cards", price: 0 },
    coffin: { value: "contract-raw", price: 0 },
  });
  useEffect(() => {
    const payload = {
      selections,
      totalPrice
    }
    sessionStorage.setItem("agreementDraft", JSON.stringify(payload));
  }, [setSelections, setTotalPrice, totalPrice, selections])


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
      {isOpen && (
        <div className="fixed inset-0 z-[1400] bg-white flex flex-col">
          <div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-gray-500 hover:text-red-600 transition"
              aria-label="Close"
            >
              <FaTimes size={36} />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {selections && Object.keys(selections).length > 0 ? (
              <div className="flex justify-center px-2 sm:px-4 lg:px-8">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">

                  {/* Table */}
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-black text-white">
                      <tr >
                        <th className="px-4 py-2 text-sm font-semibold uppercase tracking-wide">
                          Option
                        </th>
                        <th className="px-4 py-2 text-sm font-semibold uppercase tracking-wide">
                          Selections
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.entries(selections).map(([key, item]) => (
                        <tr
                          key={key}
                          className="border-b last:border-none hover:bg-gray-50 transition "
                        >
                          <td className="px-4 py-2 font-medium text-gray-800">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (c) => c.toUpperCase())}
                          </td>

                          <td className="px-4 py-2 text-gray-700">
                            {item?.value || "Not selected"}
                          </td>
                        </tr>
                      ))}

                      {/* Total Row */}
                      <tr className="bg-gray-100">
                        <td className="px-4 py-3 font-semibold text-gray-900">
                          Total
                        </td>
                        <td className="px-4 py-3 font-bold text-[#2c5aa0]">
                          ${Number(totalPrice || 0).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500 text-lg">
                No selections found.
              </div>
            )}

            <div className="mt-8">
              <LandingAgreement />
            </div>
          </div>
        </div>
      )}
      <Hero />
      <Introduction />
      <About />
      <AttendenceCrementionCom setIsOpen={setIsOpen} selections={selections} setSelections={setSelections} totalPrice={totalPrice} />
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
