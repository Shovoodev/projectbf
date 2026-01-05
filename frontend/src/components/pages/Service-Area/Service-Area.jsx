import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ServiceAreasSection = () => {
  const transferLocations = [
    "Palm Beach",
    "Penrith",
    "Hornsby",
    "Campbelltown",
    "Cronulla",
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1 border border-black rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Locations
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Service Areas
          </h2>
          <p className="text-gray-600 font-body leading-relaxed">
            We offer a range of thoughtfully designed funeral packages to suit
            different needs, preferences, and budgets. Each option is delivered
            with care, transparency, and respect — ensuring your loved one’s
            farewell is both meaningful and affordable.
          </p>
        </div>

        {/* --- INFO BOXES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Box: Our Service Areas */}
          <div className="lg:col-span-4 border border-gray-800 rounded-xl p-6 flex flex-col justify-center">
            <h3 className="font-display font-bold text-lg mb-4">
              Our Service Areas
            </h3>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <FaLocationDot className="text-black text-lg" />
              <span>GREATER SYDNEY</span>
            </div>
          </div>

          {/* Right Box: Transfer Services */}
          <div className="lg:col-span-8 border border-gray-800 rounded-xl p-6 flex flex-col justify-center">
            <h3 className="font-display font-bold text-lg mb-4">
              Transfer Services Available from:
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {transferLocations.map((loc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-600 text-sm"
                >
                  <FaLocationDot className="text-black" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- MAP EMBED --- */}
        <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.1029806443!2d150.6517894950346!3d-33.84740399698504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW!5e0!3m2!1sen!2sau!4v1645494444444!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Service Area Map"
            className="w-full h-full grayscale-[20%]"
          ></iframe>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:1300110031"
            className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <FaPhone className="text-sm" /> 1300 11 0031
          </a>
          <Link to="/contact" className="btn-enquire">
            <span className="">Enquire Now</span>
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
