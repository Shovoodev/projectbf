import React from "react";
import { FaCheckCircle } from "react-icons/fa";

// Card Component for each category
const WotCard = ({ title, items, dark }) => (
  <div
    className={`p-8 rounded-xl border h-full flex flex-col
      ${
        dark
          ? "bg-black border-black text-white"
          : "bg-white border-black text-gray-900"
      }`}
  >
    <h3 className="font-display font-bold text-3xl mb-6">{title}</h3>
    <ul className="space-y-4 font-body text-sm leading-relaxed">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <FaCheckCircle
            className={`mt-1 flex-shrink-0 text-lg ${
              dark ? "text-white" : "text-black"
            }`}
          />
          <span className="text-lg">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SwotWotSection = () => {
  // Data strictly from the image
  const wotData = [
    {
      title: "Weaknesses",
      dark: true, // Black Card
      items: ["High Customer Class Concentration", "High Capital Requirements"],
    },
    {
      title: "Opportunities",
      dark: false, // White Card
      items: [
        "Growing aging population",
        "Low revenue growth in the industry (2018-2025), indicating room for disruption",
        "Expanding AI applications to address unmet needs",
      ],
    },
    {
      title: "Threats",
      dark: true, // Black Card
      items: [
        "High-Performance Drivers (e.g., competition, economic conditions)",
        "Potential regulatory changes",
        "Market saturation and control by larger entities",
      ],
    },
  ];

  return (
    <section id="weaknesses-section" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h2 className="heading-lg">Weaknesses, Opportunities, and Threats</h2>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {wotData.map((data, idx) => (
            <WotCard key={idx} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwotWotSection;
