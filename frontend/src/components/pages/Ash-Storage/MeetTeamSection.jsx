import { FaArrowRight } from "react-icons/fa6";

import team1 from "./images/team_images/team1.png";
import team2 from "./images/team_images/team2.png";
import team3 from "./images/team_images/team3.png";
import team4 from "./images/team_images/team4.png";
import team5 from "./images/team_images/team5.png";
import team6 from "./images/team_images/team6.png";
import team7 from "./images/team_images/team7.png";

const MeetTeamSection = () => {
  const teamImages = [team1, team2, team3, team4, team5, team6, team7];

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: INFINITE SCROLLING GALLERY --- */}
          <div className="relative w-full overflow-hidden mask-fade-sides">
            {/* The scrolling container */}
            <div className="flex w-max animate-scroll">
              {/* Original Set */}
              {teamImages.map((src, idx) => (
                <div
                  key={`orig-${idx}`}
                  className="w-48 h-64 mx-2 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={src}
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {teamImages.map((src, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="w-48 h-64 mx-2 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={src}
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="space-y-6">
            <div>
              <span className="font-display text-sm text-gray-500 uppercase tracking-widest">
                Meet Black Tulip Funerals Team
              </span>
              <h2 className="text-3xl md:text-4xl  font-bold text-gray-900 mt-2 leading-tight">
                Guiding You with Care
              </h2>
            </div>

            <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed text-justify">
              Our team is committed to respectful care and flexible arrangements
              to suit diverse needs and beliefs. If uncertain about immediate
              collection or final plans for ashes, families are welcome to
              contact us for guidance and support.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-transparent text-black border border-black hover:bg-black hover:text-white px-8 py-3 rounded-full uppercase font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Explore Our Team <FaArrowRight />
            </a>
          </div>
        </div>
      </div>

      {/* --- INLINE STYLES FOR ANIMATION --- */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        /* Optional: Fade effect on edges */
        .mask-fade-sides {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  );
};

export default MeetTeamSection;
