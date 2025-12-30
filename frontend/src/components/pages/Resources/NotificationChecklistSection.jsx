import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const NotificationChecklistSection = () => {
  const checklistItems = [
    "Executor of Will",
    "Employer",
    "Department of Veteran’s Affairs",
    "Solicitor and / or public trustee",
    "Insurance companies (life, accident, home / contents, vehicle etc)",
    "Church or religious groups",
    "Home nursing service",
    "Medical or Hospital Benefits Fund",
    "Doctor",
    "Associated health professionals – dentist, physiotherapist, social worker",
    "Household help such as Meals on Wheels",
    "Home delivery services such as newspapers or milk",
    "Centrelink",
    "Landlord / housing authority",
    "Banks, building societies, credit unions, financial institutions, and credit card providers",
    "Clubs (RSL, Community, Sporting)",
    "Utilities and suppliers – electricity, gas, phone etc.",
    "Motor Transport Authority – licence and registration",
    "Digital monetary accounts such as PayPal and eBay",
    "Medicare",
    "Electoral office",
    "Tax office and accountant",
    "Post office (mail redirection)",
    "Digital social media accounts (Facebook, Twitter, Instagram and e-mail accounts)",
    "Superannuation providers",
    "Home appliance rental, medical aids rental company",
    "Local Government for Rates, fire levy, etc.",
    "Ambulance Service",
    "School or college",
    "Chamber of Commerce",
    "Service organisations – e.g. Rotary, Lions, Apex, Red Cross, and Blood bank",
  ];

  return (
    <section className="bg-surface py-16 md:py-24 border-t border-gray-200">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide mb-6">
            Who Needs to be Informed of a Death
          </h2>
          <p className="text-gray-600 font-body leading-relaxed">
            Once you receive the death certificate, numerous people and
            organisations may need to be informed. These include:
          </p>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-white rounded shadow-sm border border-transparent hover:border-gray-300 transition-all duration-200"
            >
              <FaCircleCheck className="text-black flex-shrink-0 mt-1" />
              <span className="text-sm md:text-base text-gray-700 font-body leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotificationChecklistSection;
