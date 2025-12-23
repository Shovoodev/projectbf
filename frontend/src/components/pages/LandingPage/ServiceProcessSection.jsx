import React from "react";
import {
  FaAddressCard,
  FaRegHeart,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md"; // Using Material Design icon for Family concept

const ServiceProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: <FaAddressCard />,
      title: "GET IN TOUCH",
      desc: "We listen carefully to your wishes and provide guidance to help you choose the right service that honours your loved one’s life and legacy.",
    },
    {
      number: "02",
      icon: <FaRegHeart />,
      title: "PERSONALISING THE TRIBUTE",
      desc: "Together, we create meaningful details—from service elements to stationery—that reflect the unique story and personality of your loved one.",
    },
    {
      number: "03",
      icon: <MdFamilyRestroom />,
      title: "COMPASSIONATE FAREWELL",
      desc: "On the day of the service, our team ensures everything runs smoothly, allowing your family to focus on celebrating and remembering with love.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-sm text-gray-500 uppercase tracking-widest block mb-2">
            Service Process
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
            Guiding You Through Every Step With Care
          </h2>
        </div>

        {/* --- PROCESS STEPS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group relative z-10"
            >
              {/* Step Number Background */}
              <div className="text-6xl font-display font-bold text-gray-100 mb-4 select-none absolute -top-4 -z-10 opacity-50 scale-150 transform group-hover:text-gray-200 transition-colors duration-300">
                {step.number}
              </div>

              {/* Icon Circle */}
              <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center text-3xl text-black shadow-sm mb-6 mt-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-lg uppercase mb-3 text-gray-900 tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 font-body leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-gray-100">
          {/* Phone Box */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-black rounded-full shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-300">
              <FaPhone className="text-lg group-hover:animate-pulse" />
            </div>
            <a
              href="tel:1300110031"
              className="text-2xl font-display font-bold text-gray-900 group-hover:text-black transition-colors"
            >
              1300 11 0031
            </a>
          </div>

          {/* Button */}
          <a
            href="https://blacktulipfunerals.com.au/contact-us/"
            className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Enquire Now <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection;
