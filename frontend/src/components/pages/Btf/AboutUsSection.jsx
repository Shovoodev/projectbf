import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaLongArrowAltRight, FaPhoneAlt } from "react-icons/fa";
import img from "./images/about-us-photo-1.jpg";

const StatItem = ({ number, label }) => (
  <div className="mb-6 w-full">
    <div className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-1">
      {number}
    </div>
    <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
      {label}
    </div>
  </div>
);

const AboutUsSection = () => {
  return (
    <section id="about-us" className="py-10 bg-white">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* --- COLUMN 1: MAIN TEXT --- */}
          <div className="flex flex-col items-center lg:items-start h-full text-center lg:text-left">
            <h5 className="font-body rounded-lg border-gray-200 font-bold text-gray-500 text-sm uppercase tracking-widest mb-4">
              About Us
            </h5>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight">
              Honoring Every Life with Grace and Respect
            </h2>
            <p className="text-gray-600  leading-relaxed mb-8 text-center lg:text-left">
              We believe every life deserves to be remembered with dignity and
              compassion. Our dedicated team provides personalized funeral
              services that reflect the unique journey of each individual. With
              care, understanding, and attention to detail, we help families
              honor their loved ones with grace and respect — creating
              meaningful farewells that bring comfort and peace.
            </p>

            {/* UPDATED: Using Link Component */}
            <Link to="/contact" className="btn-enquire">
              <span className="">Enquire Now</span>
              <FaLongArrowAltRight />
            </Link>
          </div>

          {/* --- COLUMN 2: IMAGE --- */}
          <div className="h-full w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <img
                src={img}
                alt="Black Tulip Funerals Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* --- COLUMN 3: STATS & SECONDARY TEXT --- */}
          <div className="flex flex-col items-center lg:items-start h-full justify-between text-center lg:text-left">
            <div className="mb-8">
              <p className="font-body text-gray-600 text-base leading-relaxed text-center lg:text-left">
                Our commitment to compassion and excellence is reflected in
                every service we provide. With years of experience, countless
                families served, and a reputation built on trust, we take pride
                in offering meaningful farewells that honor every life with
                grace and respect.
              </p>
            </div>
             
            {/* Stats */}
            <div className="flex flex-col items-center lg:items-start w-full mb-8 space-y-4">
              <StatItem number="25+" label="Years of experience" />
              <StatItem number="10,000+" label="Families Served" />
              <StatItem number="99.9%" label="Client Satisfaction" />
            </div>

            <a href="tel:1300110031" className="btn-enquire">
              <FaPhoneAlt className="text-sm" />
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
