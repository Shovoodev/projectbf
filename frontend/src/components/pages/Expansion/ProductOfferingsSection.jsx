import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Using a check icon for the list
import afterLifeLogo from "./images/ProductOfferingsSection/after_life_logo-scaled.png";
import award2024 from "./images/ProductOfferingsSection/award_2024.png";
import funeraLogo from "./images/ProductOfferingsSection/funera_logo_img.png";
import image2023 from "./images/ProductOfferingsSection/image_2023_06_29T06_02_34_102Z.png";

const ProductOfferingsSection = () => {
  const brandList = [
    "Black Tulip Funerals",
    "Afterlife Funerals (founding brand)",
    "Ayara Funerals (Buddhist)",
    "Antyesti Funeral Services (Indian/Hindu)",
    "LGBTI Funerals",
    "Indigenous Ceremonies",
  ];

  const logos = [afterLifeLogo, award2024, funeraLogo, image2023];

  return (
    <section id="product-offerings" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- HEADER --- */}
        <div className="mb-12">
          <h2 className="heading-lg">BTF's Innovative Product Offerings</h2>
          <p className="text-gray-600  text-lg max-w-3xl">
            Leveraging our established infrastructure and in-house services,
            we’re launching a new brand focused on technology, personalisation,
            and social impact.
          </p>
        </div>

        {/* --- FEATURE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <h5 className="font-display font-bold text-gray-900 text-2xl mb-4  inline-block pb-1">
              BTF: Eco-Friendly Funerals
            </h5>
            <p className="text-gray-600 font-body leading-relaxed">
              BTF offers sustainable, environmentally-conscious funeral options.
              We utilise green technologies and ethical practices to reduce
              families’ carbon footprint while honouring their loved ones with
              care and reverence.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <h5 className="font-display font-bold text-gray-900 text-2xl mb-4  inline-block pb-1">
              BTF Bespoke: Premium Experiences
            </h5>
            <p className="text-gray-600 font-body leading-relaxed">
              To lead the funeral service industry by exceeding client
              expectations, providing transparent and pressure-free experiences,
              and making a positive social impact through highly personalised
              services.
            </p>
          </div>
        </div>

        {/* --- LOGO CAROUSEL --- */}
        <div className="mb-16 overflow-hidden relative w-full">
          <div className="flex w-max animate-scroll gap-12 items-center">
            {/* Original Set */}
            {logos.map((src, idx) => (
              <div
                key={`orig-${idx}`}
                className="w-32 h-20 flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <img
                  src={src}
                  alt="Award or Partner Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate Set for Loop */}
            {logos.map((src, idx) => (
              <div
                key={`dup-${idx}`}
                className="w-32 h-20 flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <img
                  src={src}
                  alt="Award or Partner Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            {/* Triplicate Set to ensure seamless on wide screens */}
            {logos.map((src, idx) => (
              <div
                key={`trip-${idx}`}
                className="w-32 h-20 flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <img
                  src={src}
                  alt="Award or Partner Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- BRANDS LIST --- */}
        <div className="bg-black text-white p-10 rounded-2xl">
          <h2 className="text-2xl font-display font-bold mb-8 pl-4">
            Our Brands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandList.map((brand, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <FaCheckCircle className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="font-body text-sm md:text-base font-medium text-gray-300 group-hover:text-white transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProductOfferingsSection;
