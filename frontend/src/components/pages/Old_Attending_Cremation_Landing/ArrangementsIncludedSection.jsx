import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ArrangementsIncludedSection = ({ price = "6,600" }) => {
  const inclusions = [
    {
      label: "Professional Transfer of Care",
      desc: "24/7 collection from home, hospital, or nursing facility",
    },
    {
      label: "Quality Coffin Selection",
      desc: "Choose from four elegant timber options included in your package",
    },
    {
      label: "Chapel Venue",
      desc: "Access to peaceful, modern chapels accommodating intimate gatherings or larger congregations",
    },
    {
      label: "Experienced Celebrant",
      desc: "Personalised ceremony guidance reflecting your loved one's unique story",
    },
    {
      label: "Mortuary Preparation",
      desc: "Respectful dressing and presentation with dignity",
    },
    {
      label: "Administrative Support",
      desc: "Complete assistance with death certificates, medical paperwork, and cremation permits",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="section-container mx-auto px-6 text-center">
        {/* --- MAIN HEADING --- */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
          Complete Funeral Arrangements Included
        </h2>

        <p className="font-body text-gray-600 text-lg leading-relaxed mb-12">
          Navigating funeral arrangements during grief should not add to your
          burden. Our all-inclusive cremation packages cover every essential
          element, ensuring nothing is overlooked while keeping cremation prices
          transparent and manageable.
        </p>

        {/* --- INCLUSIONS BOX --- */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 text-left">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-8 text-center border-b border-gray-200 pb-4">
            Your Attending Service Includes:
          </h3>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <FaCheckCircle className="text-black mt-1 flex-shrink-0" />
                <p className="font-body text-gray-700 leading-relaxed text-lg">
                  <strong className="text-gray-900 text-lg">
                    {item.label}:
                  </strong>{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- CLOSING SUMMARY --- */}
        <div className="mt-12">
          <p className="font-body text-gray-600 text-lg leading-relaxed italic">
            By bundling these funeral arrangements into one clear price, we
            eliminate the uncertainty of funeral costs that spiral with hidden
            extras. You know exactly what to expect: comprehensive care for{" "}
            <span className="font-bold text-gray-900">${price}</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArrangementsIncludedSection;
