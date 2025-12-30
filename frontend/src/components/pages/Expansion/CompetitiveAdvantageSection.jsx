import React from "react";

import img1 from "./images/CompetitiveAdvantageSection/advntg_1.avif";
import img2 from "./images/CompetitiveAdvantageSection/advntg_2.avif";
import img3 from "./images/CompetitiveAdvantageSection/advntg_3.avif";
import img4 from "./images/CompetitiveAdvantageSection/advntg_4.avif";
const AdvantageCard = ({ imageSrc, title, text }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full group">
    <div className=" mb-6  overflow-hidden  border-4 border-gray-50  transition-colors duration-300">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover rounded-sm transform  transition-transform duration-500"
      />
    </div>
    <h3 className="font-display font-bold text-3xl text-gray-900 mb-3 ">
      {title}
    </h3>
    <p className="font-body text-gray-600 text-lg leading-relaxed max-w-xs">
      {text}
    </p>
  </div>
);

const CompetitiveAdvantageSection = () => {
  const advantages = [
    {
      imageSrc: img1,

      title: "Unique Value Proposition",
      text: "Comprehensive in-house services at competitive prices, reducing logistical burden on bereaved families.",
    },
    {
      imageSrc: img2,
      title: "Customer-Centric Approach",
      text: "Focus on affordability, transparency, and personalisation.",
    },
    {
      imageSrc: img3,
      title: "Technology Integration",
      text: "AI-powered solutions for enhanced customer experience and operational efficiency.",
    },
    {
      imageSrc: img4,
      title: "Sustainable Moat",
      text: "Created by unique services, technology integration, and strategic planning.",
    },
  ];

  return (
    <section
      id="competitive-advantage-section"
      className="py-16 px-4 bg-gray-50 scroll-mt-24"
    >
      <div className="">
        {/* --- HEADING --- */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-center">
            BTF's Competitive Advantage
          </h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, idx) => (
            <AdvantageCard key={idx} {...adv} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantageSection;
