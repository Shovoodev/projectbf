import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import img2 from "./images/about-us-photo-4.jpg";
import img1 from "./images/image-1.png";
// --- Styled Accordion Item Component ---
const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="mb-4">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${
        isOpen
          ? "bg-black text-white rounded-t-xl"
          : "bg-black text-white rounded-xl hover:bg-gray-900"
      }`}
    >
      <span className="font-body text-center font-bold text-base md:text-lg pr-4 leading-tight">
        {title}
      </span>
      <span className="flex-shrink-0">
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 shadow-sm ${
        isOpen ? "max-h-[500px] opacity-100 rounded-b-xl" : "max-h-0 opacity-0"
      }`}
    >
      <div className="p-6">
        <p className="text-center text-gray-600 text-lg md:text-base leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  </div>
);

const WhyChooseUsSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    {
      title:
        "What makes Black Tulip Funerals different from other funeral providers?",
      content:
        "We combine compassion with professionalism to deliver personalized and dignified farewells. Our team takes the time to understand each family’s wishes, ensuring every service reflects the life and values of your loved one.",
    },
    {
      title: "Are your funeral services affordable?",
      content:
        "Yes. We believe everyone deserves a respectful farewell. That’s why we offer transparent, affordable pricing and flexible packages that cater to different needs and budgets.",
    },
    {
      title: "Can you help us plan a funeral in advance?",
      content:
        "Absolutely. We offer pre-planning services that allow you to make arrangements ahead of time. This helps ease emotional and financial stress for your loved ones.",
    },
    {
      title: "Do you provide both cremation and burial services?",
      content:
        "Yes. We offer a full range of funeral options, including viewing, cremation, and burial services. Our team will guide you through each choice.",
    },
    {
      title: "How do you support families during the grieving process?",
      content:
        "Our care doesn’t end with the service. We provide compassionate guidance, emotional support, and resources to help families find peace and comfort.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-10 bg-white">
      <div className="px-6">
        {/* --- 3-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* --- COL 1: TEXT CONTENT --- */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            {/* Pill Tag */}
            <div className="border  border-gray-800 rounded-full px-4 py-1 mb-6 inline-block">
              <span className="text-sm text-center md:text-left font-medium  text-gray-800 uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-[1.15]">
              Supporting You Through Every Step — Trusted Partner in Farewell
              Services
            </h2>

            {/* Description */}
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              We walk beside you through every step of the farewell journey.
              With compassion, professionalism, and genuine care, we ensure
              every detail is handled with dignity—making us your trusted
              partner in creating meaningful and respectful goodbyes.
            </p>

            {/* Black Pill Button */}
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
            >
              <span>Enquire Now</span>
              <FaLongArrowAltRight />
            </Link>
          </div>

          {/* --- COL 2: CENTER IMAGES (Stacked) --- */}
          <div className="flex flex-col gap-6">
            {/* Top Image (Coffin Scene) */}
            <div className="w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-md">
              <img
                src={img1}
                alt="Funeral Service"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Bottom Image (Urn & Flowers) */}
            <div className="w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-md">
              <img
                src={img2}
                alt="Urn and Roses"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* --- COL 3: ACCORDION (Black Blocks) --- */}
          <div className="w-full">
            {faqData.map((item, idx) => (
              <AccordionItem
                key={idx}
                title={item.title}
                content={item.content}
                isOpen={openIndex === idx}
                onClick={() => toggleAccordion(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
