import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const AwarenessCard = ({ title, items }) => (
  <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:shadow-md transition-shadow duration-300 h-full">
    <h5 className="font-display font-bold text-gray-900 text-3xl mb-6 border-b border-gray-300 pb-3">
      {title}
    </h5>
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <FaCheckCircle className="mt-1 text-black flex-shrink-0" />
          <span className="font-montserrat text-gray-700 text-lg md:text-base leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const Solar = () => {
  const industryAwarenessData = [
    "Recent acquisition of InvoCare by US private equity firm TPG Capital.",
    "Potential consequences: Market saturation, price increases, reduced affordability.",
    "BTF's stance: Educate communities, offer prepaid funerals, disruptive mode.",
  ];

  const sustainableEnergyData = [
    "Australia's first fully eco-friendly, solar-powered funeral home with UPS battery solution.",
    "Demonstrates commitment to sustainability.",
    "Potential for long-term cost savings.",
  ];

  return (
    <section id="are-you-aware" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- TWO COLUMN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Industry Awareness */}
          <AwarenessCard
            title="Industry Awareness"
            items={industryAwarenessData}
          />

          {/* Column 2: Sustainable Energy */}
          <AwarenessCard
            title="Sustainable Energy"
            items={sustainableEnergyData}
          />
        </div>
      </div>
    </section>
  );
};

export default Solar;
