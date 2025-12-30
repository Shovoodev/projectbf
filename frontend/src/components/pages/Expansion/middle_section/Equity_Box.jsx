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

const Equity_Box = () => {
  // Data strictly from the image
  const wotData = [
    {
      title: "Discounted Cash Flow Model",
      dark: true, // Black Card
      items: [
        "Estimated valuation based on projected cash flows and discount rate.",
      ],
    },
    {
      title: "Comparable Transactions",
      dark: false, // White Card
      items: [
        "Valuation based on recent transactions in the funeral industry, using EV/EBITDA multiples.",
      ],
    },
    {
      title: "Transparency Premium & Liquidity Discount",
      dark: true, // Black Card
      items: ["Adjusted valuation considering these factors."],
    },
    {
      title: "Comparable Deals",
      dark: false, // White Card
      items: [
        "Alignment with comparable deals in the space, such as Propel Funeral Partners’ IPO at an 11x multiple.",
      ],
    },
  ];

  return (
    <section id="weaknesses-section" className="py-16 bg-white scroll-mt-24">
      <div className="">
        {/* Section Heading */}

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

export default Equity_Box;
