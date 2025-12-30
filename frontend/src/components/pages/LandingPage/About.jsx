import React from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa6";

const About = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/About-us-image-1-e1760255666343.png"
              alt="Black funeral hearse"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 border border-black rounded-full text-xs font-bold uppercase tracking-widest">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
              A Legacy Of Compassion
              <br />
              And Care
            </h2>
            <p className="text-gray-600 font-body leading-relaxed text-justify">
              At Black Tulip Funerals, we believe every life deserves to be
              honored with dignity, compassion, and care. With over 10,000
              families served and a 5-star customer rating, our dedicated team
              offers personalized funeral services that celebrate the unique
              legacy of your loved one. We’re here to guide you with empathy and
              professionalism-every step of the way.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="tel:1300110031"
                className="flex items-center gap-2 font-bold text-black border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-colors"
              >
                <FaPhone /> 1300 11 0031
              </a>
              <a
                href="#"
                className="flex items-center gap-2 font-bold text-white bg-black rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
              >
                Enquire Now <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
