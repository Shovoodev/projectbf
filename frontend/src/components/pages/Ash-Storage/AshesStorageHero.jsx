import React from "react";
import { FaArrowRight, FaPhone } from "react-icons/fa6";
// Ensure this path matches your project structure
import img from "../../common/Banner.jpg";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const AshesStorageHero = () => {
  return (
    <header className="relative min-h-[500px] md:h-[600px] flex items-center justify-start overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Elegant floral background pattern"
          className="w-full h-full object-cover"
          src={img}
        />
        {/* Overlay ensures text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 section-container w-full py-12 md:py-0">
        <div className="max-w-3xl">
          {/* Responsive Heading */}
          <h1 className="heading-hero text-white">
            Secure Ashes Storage After Cremation
          </h1>

          {/* Responsive Description */}
          <div className="text-base md:text-lg lg:text-xl font-medium text-gray-100 tracking-wide mb-10 leading-relaxed">
            <p>
              We understand that every family’s journey through grief is
              different. We offer safe, discreet, and respectful storage for
              your loved one’s ashes — for as long as you need — giving you
              peace of mind until the time feels right.
            </p>
          </div>

          {/* Responsive Buttons (Stack on mobile, Row on Desktop) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:1300110031"
              className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase hover:bg-gray-200 transition-colors shadow-lg"
            >
              <FaPhone /> 1300 11 0031
            </a>
            <Link to="/contact" className="btn-enquire">
              <span className="">Enquire Now</span>
              <FaLongArrowAltRight />
            </Link>
            ;
          </div>
        </div>
      </div>
    </header>
  );
};

export default AshesStorageHero;
