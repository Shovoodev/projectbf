import React from "react";
import { FaFileInvoiceDollar, FaHollyBerry, FaUserNurse } from "react-icons/fa";
import { GiCoffin } from "react-icons/gi"; // You may need to install: npm install react-icons

const InfoCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 h-full hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
    {/* Icon Container */}
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-3xl text-black mb-6 border border-gray-200">
      {icon}
    </div>

    {/* Content */}
    <h3 className="font-display font-bold text-gray-900 text-xl uppercase tracking-wide mb-4">
      {title}
    </h3>
    <p className="font-body text-gray-600 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const AdditionalInfoSection = () => {
  const infoItems = [
    {
      icon: <FaFileInvoiceDollar />,
      title: "Cremation Risk Advice",
      description:
        "This is generally a free document issued by NSW Hospitals and the NSW Coroners, however most external doctors charge between $110 and $295 for this document.",
    },
    {
      icon: <GiCoffin />,
      title: "Coffin",
      description:
        "Coffin sizing is based on a person 6 foot and 85kgs. Height and weight above these will incur an oversized coffin at an addition cost.",
    },
    {
      icon: <FaUserNurse />, // Representing care/preparation
      title: "Body Preparation",
      description:
        "Embalming maybe required subject to the persons condition and viewing requirements. Aesthetic Embalming slows the decomposition and temporally preserves the body. Some bodies may require to be bio-sealed to contain odours.",
    },
    {
      icon: <FaHollyBerry />,
      title: "Public Holiday Surcharge",
      description:
        "Transfers required on a Public Holiday will incur an additional charge of $195",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="section-container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoItems.map((item, idx) => (
            <InfoCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalInfoSection;
