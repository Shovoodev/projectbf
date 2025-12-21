import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ChapelSection = ({
  title,
  image,
  children,
  background = "bg-white",
  hasSlider = false,
}) => {
  return (
    <section className={`section-padding ${background}`}>
      <div className="section-container">
        {/* Image Area */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg mb-12 group">
          <img
            alt={`${title} Interior`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
          />

          {/* Optional Slider Controls (Visual Only based on HTML) */}
          {hasSlider && (
            <>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors">
                <FaChevronLeft />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors">
                <FaChevronRight />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                <span className="block w-2 h-2 rounded-full bg-white"></span>
                <span className="block w-2 h-2 rounded-full bg-white/50"></span>
                <span className="block w-2 h-2 rounded-full bg-white/50"></span>
              </div>
            </>
          )}
        </div>

        {/* Text Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg uppercase tracking-wide">{title}</h2>
          <div className="space-y-6 text-gray-600 leading-loose font-light font-body text-justify md:text-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapelSection;
