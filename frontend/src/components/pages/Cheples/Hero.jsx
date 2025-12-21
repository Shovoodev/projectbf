import heroimg from "../../common/Banner.jpg";

import { FaArrowRight, FaPhone } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative bg-gray-200 h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Abstract serene floral background"
          className="w-full h-full object-cover opacity-80"
          src={heroimg}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-6xl font-medium text-black mb-6 leading-tight">
            Peaceful Chapels for <br />
            <span className="italic">Meaningful Farewells</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg leading-relaxed font-body">
            Our chapels provide a serene space where families can gather,
            reflect, and celebrate the lives of their loved ones with dignity
            and care.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="tel:1300110031" className="btn-primary">
              <FaPhone className="mr-2" /> 1300 11 0031
            </a>
            <a
              href="#"
              className="inline-flex items-center px-8 py-3 border border-black text-base font-medium rounded-full text-black bg-transparent hover:bg-black hover:text-white transition-all"
            >
              ENQUIRE NOW
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
