import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const AccordionItem = ({ title, content, isOpen, onToggle }) => (
  <div className="bg-white rounded-lg mb-4 border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 text-left focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <span className="font-display font-bold text-gray-900 text-lg">
        {title}
      </span>
      <span className="ml-4 flex-shrink-0 text-gray-500">
        {isOpen ? <FaMinus /> : <FaPlus />}
      </span>
    </button>

    <div
      className={`px-5 font-body text-gray-600 leading-relaxed text-sm md:text-base text-justify transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[600px] opacity-100 py-5" : "max-h-0 opacity-0 py-0"
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>
);

const FirstStepsSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const steps = [
    {
      title: "First steps - Private Residence",
      content:
        "<p>When a person dies in a private residence, a medical certificate cause of death will usually be signed by the family doctor (providing the doctor has attended the patient during the preceding six months and has seen the patient within the last 3 weeks). We highly recommend especially for families choosing to cremate, that the attending doctor is your normal GP. This will avoid the deceased having to be transferred again the following day to be viewed by the normal GP and save on additional costs. <strong>All forms can be requested by calling our staff on 1300 11 0031.</strong></p><p class='mt-3'>Sometimes there is a need for Police involvement, especially for accidental, unexplained or unexpected death. The Police will notify the Coroner, who acts on behalf of the deceased to determine the cause of their death. An autopsy may be required.</p>",
    },
    {
      title: "First steps - Nursing Home",
      content:
        "<p>When a person dies in a nursing home, a medical certificate cause of death is issued by the normal nursing home GP. Sadly though, most nursing homes push the families to have the deceased transferred immediately and have an afterhours GP or Registered Nurse sign an interim certificate. This certificate is fine for burial requirements as your chosen funeral director can chase up the official medical certificate cause of death afterwards. If you are deciding on a cremation, the normal GP might request to see the body after death as stated on the attending practitioners cremation certificate, though a newly appointed form called the Cremation Risk Advise doesn’t require a GP to attend. You as the next of kin have every right to demand the normal GP attends and issues the certificate before you call a funeral director, or the body is transferred. We have this form available and are more than happy to forward to you so the GP can complete the form. Most GP’s charge for this form as it isn’t covered under the Medicare scheme. An estimate cost is $110. If this is paid by the family to the doctor, we are happy to refund or deduct the amount from the funeral cost. <strong>All forms can be requested by calling our staff on 1300 11 0031.</strong></p>",
    },
    {
      title: "First steps - Hospital",
      content:
        "<p>When a person dies in a private hospital or public hospital the hospital doctor will usually sign the medical certificate cause of death. Once a death has been verified, the family is able to contact a funeral director of their choice to request transfer of the deceased. It is now mandatory in NSW, that all hospital transfers require written permission from the next of kin.</p>",
    },
  ];

  return (
    <section className="py-16 md:py-8">
      <div className="section-container max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide mb-4">
            When a death has occurred
          </h2>
          <div className="w-20 h-1 bg-black mx-auto opacity-20"></div>
        </div>

        {/* Accordion Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <AccordionItem
              key={idx}
              title={step.title}
              content={step.content}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstStepsSection;
