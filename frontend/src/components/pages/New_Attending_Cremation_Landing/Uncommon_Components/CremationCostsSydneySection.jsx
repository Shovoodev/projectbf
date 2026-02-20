import React from "react";
import { FaCheck } from "react-icons/fa";

const CremationCostsSydneySection = () => {
  const coveredItems = [
    "All professional services and coordination",
    "A quality coffin with choice of colours",
    "Chapel hire and facilities",
    "Celebrant fees",
    "Crematorium fees",
    "Death registration processing",
    "24/7 support throughout the arrangement process",
  ];

  return (
    <section className="py-10 bg-white">
      <div className="section-container mx-auto px-6 text-center">
        {/* --- HEADING --- */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
          Understanding Cremation Costs in Sydney
        </h2>

        {/* --- INTRODUCTORY BODY TEXT --- */}
        <div className="space-y-6 font-body text-gray-600 text-lg leading-relaxed mb-12">
          <p className="text-lg text-center text-black">
            One of the most common questions we receive is, "How much does
            cremation cost?" The answer varies widely across funeral homes, with
            cost of cremation in Sydney ranging from{" "}
            <span className="font-bold text-gray-900">$2,200</span> for basic
            direct cremation to
            <span className="font-bold text-gray-900">$15,000+</span> for
            elaborate traditional services.
          </p>
          <p className="text-lg text-center text-black">
            Our attending service sits below the middle—offering exceptional
            value without compromising on ceremony or care. At{" "}
            <span className="font-bold text-gray-900">$6,600</span>, this
            package represents an affordable pathway to a dignified farewell
            that doesn't strain family finances during an already difficult
            time.
          </p>
        </div>

        {/* --- INVESTMENT BREAKDOWN BOX --- */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 text-left max-w-4xl mx-auto shadow-sm">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
            What's Covered in Your $6,600 Investment:
          </h3>

          <ul className="space-y-4">
            {coveredItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <FaCheck className="text-black mt-1.5 text-sm flex-shrink-0" />
                <span className="font-body text-gray-700 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- CLOSING COMMITMENT --- */}
        <div className="mt-12 max-w-3xl mx-auto">
          <p className="font-body text-gray-600 text-lg leading-relaxed">
            For families comparing cremation prices or concerned about funeral
            expenses, we provide written estimates upfront with no obligation.
            We believe funeral costs should never be a source of additional
            stress.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CremationCostsSydneySection;
