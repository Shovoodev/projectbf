import React from "react";
import img from "./images/Secure-Storage-scaled.jpg";
const WhyDelayCollectionSection = () => {
  return (
    <section className="bg-surface py-16 md:py-24 border-t border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: IMAGE --- */}
          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                Why Families May Delay Collection
              </h2>
              <div className="w-20 h-1 bg-black opacity-10"></div>
            </div>

            <div className="space-y-6 font-body text-gray-600 text-base md:text-lg leading-relaxed text-justify">
              <div>
                <span className="font-bold text-gray-900 italic block mb-1">
                  Cultural Beliefs and Superstitions:
                </span>
                <p>
                  Some cultures advise against keeping ashes at home or urge
                  waiting before moving remains, believing this helps the spirit
                  transition peacefully or avoids negative energy in the
                  household.
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-900 italic block mb-1">
                  Personal Circumstances:
                </span>
                <p>
                  Families may need more time to plan a memorial, coordinate
                  travel, or arrange scattering or interment at a later date.
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-900 italic block mb-1">
                  Respect and Care:
                </span>
                <p>
                  Storing ashes securely ensures dignity and safety for the
                  remains until the family feels ready for collection or
                  ceremony.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[300px] group">
            <img
              src={img}
              alt="Secure Storage of Ashes"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDelayCollectionSection;
