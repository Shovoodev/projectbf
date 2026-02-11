import { Link } from "react-router-dom";
import heroimg from "../../common/Banner.jpg";

import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative bg-gray-200 h-[600px] flex items-center overflow-hidden p-3">
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
      <div className="relative z-10  section-container w-full">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h1 className="font-display text-5xl md:text-6xl font-medium text-black mb-6 leading-tight">
            Peaceful Chapels for <br />
            <span className="italic">Meaningful Farewells</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg leading-relaxed mx-auto md:mx-0">
            Our chapels provide a serene space where families can gather,
            reflect, and celebrate the lives of their loved ones with dignity
            and care.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="tel:1300110031" className="btn-primary">
              <FaPhone className="mr-2" /> 1300 11 0031
            </a>
            <Link to="/contact" className="btn-enquire">
              <span className="">Enquire Now</span>
              <FaLongArrowAltRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
