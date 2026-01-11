import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import team1 from "./images/team1.png";
import team2 from "./images/team2.png";
import team3 from "./images/team3.png";
import team4 from "./images/team4.png";
import team5 from "./images/team5.png";
import team6 from "./images/team6.png";
const MeetTheTeamSection = () => {
  // Image data
  const teamImages = [team1, team2, team3, team4, team5, team6];

  // Duplicate the array to create the seamless infinite loop
  const scrollingImages = [...teamImages, ...teamImages];

  return (
    <section id="meet-the-team" className="py-20 bg-gray-50 overflow-hidden">
      {/* --- Internal Styles for Keyframes --- */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-custom {
          animation: scroll-left 30s linear infinite;
        }
        /* Pause animation on hover */
        .group:hover .animate-scroll-custom {
          animation-play-state: paused;
        }
      `}</style>

      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- COLUMN 1: INFINITE SCROLL CAROUSEL --- */}
          {/* Added 'group' class to handle hover state for children */}
          <div className="w-full relative overflow-hidden group">
            {/* Gradient Masks (Fade edges) */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l  pointer-events-none"></div>

            {/* Scrolling Track */}
            {/* Using the custom class defined in the <style> tag above */}
            <div className="flex w-max animate-scroll-custom">
              {scrollingImages.map((src, idx) => (
                <div
                  key={idx}
                  className="w-[200px] mx-4  transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="rounded-xl overflow-hidden bg-white ">
                    <img
                      src={src}
                      alt={`Team Member ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLUMN 2: TEXT CONTENT --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h5 className="font-body font-bold text-gray-500 text-sm uppercase tracking-widest mb-2">
              Meet Black Tulip Funerals Team
            </h5>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Guiding You with Care
            </h2>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              Our team at Black Tulip Funerals is dedicated to providing
              compassionate support and personalized care, helping families
              honor their loved ones with dignity and respect.
            </p>

            <Link to="/team" className="btn-primary">
              <span>Explore Our Team</span>
              <FaLongArrowAltRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
