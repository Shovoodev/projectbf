import React from "react";
import img1 from "./images/service/Attending-Service-Cremation.png";
import img2 from "./images/service/Viewing-Cremation.png";
import img3 from "./images/service/No-Service-Direct-Cremation.png";

import { FaPhone, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const OurServicesSection = () => {
  const services = [
    {
      title: "No Service Direct Cremation",
      image: img1,
      alt: "Wicker coffin with flowers for direct cremation",
    },
    {
      title: "Viewing & Cremation",
      image: img2,
      alt: "Floral arrangement on top of the coffin for viewing and cremation",
    },
    {
      title: "Attending Service Cremation",
      image: img3,

      alt: "Coffin with floral arrangement in a cremation service",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-sm text-gray-500 uppercase tracking-widest block mb-2">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight mb-6">
            Compassionate Farewells,
            <br />
            Tailored For You
          </h2>
          <p className="text-gray-600 font-body text-lg leading-relaxed">
            Whether you prefer a simple farewell or a traditional ceremony, our
            packages provide meaningful options to suit every family’s wishes
            and budget.
          </p>
        </div>

        {/* --- SERVICE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="rounded-xl overflow-hidden shadow-lg mb-6 relative">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-display font-bold text-gray-900 text-center uppercase tracking-wide group-hover:text-black transition-colors">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-gray-100">
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
          <Link to="/contact" className="btn-enquire">
            <span className="">Enquire Now</span>
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
