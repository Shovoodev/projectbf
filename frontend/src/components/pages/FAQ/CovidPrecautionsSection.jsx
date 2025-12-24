import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="bg-white rounded-lg mb-4 border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 text-left focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <span className="font-display font-bold text-gray-900 text-lg">
        {question}
      </span>
      <span className="ml-4 flex-shrink-0 text-gray-500">
        {isOpen ? <FaMinus /> : <FaPlus />}
      </span>
    </button>

    <div
      className={`px-5 font-body text-gray-600 leading-relaxed text-sm md:text-base text-justify transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-[500px] opacity-100 py-5" : "max-h-0 opacity-0 py-0"
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  </div>
);

const CovidPrecautionsSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first item open

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const precautions = [
    {
      q: "Our statement",
      a: "<p>COVID-19 Precaution. In the interest of public health and our staff, for all new appointments and confirmation of existing bookings please contact us via phone on <b>1300 11 0031</b> or email.</p><p class='mt-2'>If you are attending one of our chapel services, for the health and safety of everyone you must adhere to Australian Government Department of Health for guidelines and recommendations regarding COVID-19.</p>",
    },
    {
      q: "How is social distancing being implemented at funerals?",
      a: "All chapels within the Sydney region have restrictions on the number of mourners that can enter the facility. Any additional mourners will be required to remain outside and should still practice social distancing and good hygiene by maintaining a distance of 1.5 metres between people where possible.",
    },
    {
      q: "Is live streaming available?",
      a: "Most cemetery/crematorium chapels in Sydney now offer FREE live streaming during COVID-19. Venues such as churches and halls don’t offer this service, though there are external companies that offer the service at an additional charge.",
    },
    {
      q: "Are condolences still allowed?",
      a: "Physical touch is always important especially during a time of loss, thought to keep everyone safe you should avoid contact where possible. Though it is not compulsory in NSW to wear a mask, we suggest wearing a mask when close to others and use our complimentary hand sanitizer after contact.",
    },
    {
      q: "What if I am feeling unwell?",
      a: "If you are unwell with flu-like symptoms or have been in contact with a person diagnosed with COVID-19 within the last 14 days, we ask for your cooperation in not attending the funeral.",
    },
    {
      q: "Why do I need to give you my personal details when attending a funeral?",
      a: "The Government guidelines require us to keep a register of all attendees at funeral services. This register is to be held securely by Black Tulip Funerals and the attending venue for 30 days and only released if requested by the Department of Health for contact tracing.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide mb-4">
            COVID-19 & Precautions
          </h2>
          <div className="w-20 h-1 bg-black mx-auto opacity-20"></div>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {precautions.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CovidPrecautionsSection;
