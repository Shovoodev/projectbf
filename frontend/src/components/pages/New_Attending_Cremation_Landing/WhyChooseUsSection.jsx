import { FaLongArrowAltRight } from "react-icons/fa";
import {
  FaHeart,
  FaPhone,
  FaTrophy,
  FaUserGroup,
  FaUserPen,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import HelpButton from "../Service/HelpButton";
import img from "./images/image-1.png";
import MakeAgreementBtn from "./common/MakeAgreementBtn";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <FaUserGroup />,
      title: "Experienced And Compassionate Team",
      desc: "Our dedicated staff bring years of expertise combined with genuine empathy to support your family through every step with kindness and respect.",
    },
    {
      icon: <FaHeart />,
      title: "Trusted By Thousands Of Families",
      desc: "We’ve served over 8,000 families with care and professionalism, earning a reputation as Sydney’s trusted choice for meaningful farewells.",
    },
    {
      icon: <FaTrophy />,
      title: "Award-Winning Service Excellence",
      desc: "Recognized for our compassionate approach and outstanding service, our team continually strives to provide the highest standards of care.",
    },
    {
      icon: <FaUserPen />,
      title: "Personalised, Tailored Support",
      desc: "We listen to your needs and honour your loved one’s unique story with customised services designed to create heartfelt, memorable tributes.",
    },
  ];

  return (
    <section className="bg-white py-8 mt-10 md:py-3 p-2">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="font-display text-sm text-gray-500 uppercase tracking-widest">
              WHY CHOOSE BLACK TULIP FUNERALS?
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
              Compassionate Expertise
            </h2>
            <p className="text-gray-600 font-body text-lg leading-relaxed text-center lg:text-left md:mx-0 mx-auto max-w-md">
              We’re committed to providing personalised, respectful care that
              honours your loved one’s legacy while supporting your family with
              compassion and professionalism.
            </p>

            {/* Feature Grid inside the Right Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 w-full">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start  sm:justify-start"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-black text-white rounded-full flex items-center justify-center text-xl mx-auto sm:mx-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-body leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 items-center justify-center lg:justify-start w-full">
              <a
                href="tel:1300110031"
                className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                <FaPhone className="text-sm" /> 1300 11 0031
              </a>
              <MakeAgreementBtn />
            </div>
          </div>
          <div className="rounded-xl overflow-hidden  h-full flex justify-center">
            <img
              src={img}
              alt="Compassionate Funeral Team"
              className="w-full h-auto object-cover  lg:max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
HelpButton;
