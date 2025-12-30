import React from "react";
import { FaCheckCircle } from "react-icons/fa";

// Card Component for each category
const WotCard = ({ title, items, dark }) => (
  <div
    className={`p-4 rounded-xl border  flex flex-col text-center
      ${
        dark
          ? "bg-black border-black text-white"
          : "bg-white border-black text-gray-900"
      }`}
  >
    <h3 className="font-display font-bold text-2xl mb-6">{title}</h3>
    <ul className="space-y-4 font-body text-sm leading-relaxed">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-lg">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Prepaid_Funeral_Plans = () => {
  // Data strictly from the image
  const wotData = [
    {
      title: "Market Size",
      dark: true, // Black Card
      items: ["Over $1.3 billion in prepaid funeral plans/bonds in Australia."],
    },
    {
      title: "InvoCare's Dominance",
      dark: false, // White Card
      items: ["Holds over $900 million in prepaid plans/bonds"],
    },
    {
      title: "Benefits for Clients",
      dark: true, // Black Card
      items: ["Peace of mind, cost certainty, protection against inflation."],
    },
    {
      title: "Benefits for Funera",
      dark: false, // White Card
      items: [
        "Future revenue stream, community security, simple online application process.",
      ],
    },
  ];

  return (
    <section id="prepaid-plans" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}
        <h1 className="heading-lg"> Prepaid Funeral Plans</h1>
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {wotData.map((data, idx) => (
            <WotCard key={idx} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prepaid_Funeral_Plans;
