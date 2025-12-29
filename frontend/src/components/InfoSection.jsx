import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { FaBox, FaUser, FaCalendar } from "react-icons/fa";
const infoCards = [
  {
    title: "CREMATION RISK ADVICE",
    description:
      "This is generally a free document issued by NSW Hospitals and the NSW Coroners, however most external doctors charge between $110 and $295 for this document.",
    icon: TbAlertTriangle,
  },
  {
    title: "COFFIN",
    description:
      "Coffin sizing is based on a person 6 foot and 85kgs. Height and weight above these will incur an oversized coffin at an addition cost.",
    icon: FaBox,
  },
  {
    title: "BODY PREPARATION",
    description:
      "Embalming maybe required subject to the persons condition and viewing requirements. Aesthetic Embalming slows the decomposition and temporally preserves the body. Some bodies may require to be bio-sealed to contain odours.",
    icon: FaUser,
  },
  {
    title: "PUBLIC HOLIDAY SURCHARGE",
    description:
      "Transfers required on a Public Holiday will incur an additional charge of $195",
    icon: FaCalendar,
  },
];

const InfoSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="border border-slate-300 rounded-xl p-6 bg-white"
            >
              <div className="w-12 h-12 rounded-full border-3 border-black flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wide">
                {card.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfoSection;
