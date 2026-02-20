import React from "react";
import ceo from "./images/team/ceo.png";
import team1 from "./images/team/team1.png";
import team2 from "./images/team/team2.png";
import team3 from "./images/team/team3.png";
import team4 from "./images/team/team4.png";
import team5 from "./images/team/team5.png";
import team6 from "./images/team/team6.png";
import team7 from "./images/team/team7.png";

// Individual Team Card Component (Vertical Layout)
const TeamMemberCard = ({ name, role, bio, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="text-center flex-1 flex flex-col">
        <h3 className="text-xl font-display font-bold text-gray-900 uppercase tracking-wide mb-2">
          {name}
        </h3>
        <div className="w-12 h-0.5 bg-black mx-auto mb-3 opacity-20"></div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 min-h-[3rem]">
          {role}
        </p>
        <p className="text-gray-600 font-body text-center text-lg leading-relaxed ">
          {bio}
        </p>
      </div>
    </div>
  );
};

const MeetYourCareTeamSection = () => {
  const teamMembers = [
    {
      name: "SCOTT HARRIS",
      role: "Chief Executive Director & Founder",
      bio: "With 25+ years in funeral services and over 6,000 funerals managed, Scott leads BLACK TULIP FUNERALS with unwavering integrity, transparency and compassion. He combines IT and logistics expertise to deliver personalised, high-quality funeral solutions.",
      image: ceo,
    },
    {
      name: "SARA PHIROMNAK",
      role: "Development Manager & Personal Assistant To CEO",
      bio: "A ten-year operations specialist holding a Bachelor of Business in Operations Management. Sara oversees BLACK TULIP FUNERALS’s daily workflows and provides dedicated support to the CEO. Fluent in Thai and English, she brings reliability and warmth.",
      image: team1,
    },
    {
      name: "ARIEL ALONSAGAY",
      role: "Design Team Co-Ordinator",
      bio: "Ariel organises and prioritises all creative tasks, ensuring the design team meets every deadline. With a background in Industrial Electronics, AutoCAD and graphic arts, he blends technical precision with a can-do attitude.",
      image: team2,
    },
    {
      name: "ERICA VIVERO",
      role: "Senior Social Media Specialist",
      bio: "Soft-spoken yet fiercely detail-oriented, Erica drives BLACK TULIP FUNERALS’s social channels with her Marketing and Business Management expertise. She crafts targeted campaigns and engaging posts that build meaningful connections.",
      image: team3,
    },
    {
      name: "DAVID HARMON",
      role: "Pastoral Care & Master of Ceremonies",
      bio: "With a deep commitment to serving others, David Harrison has dedicated his career to providing compassionate and meaningful support to grieving families. As a chaplain with extensive experience in prisons, hospitals, and aged care facilities, David has developed a unique ability to connect with individuals from diverse backgrounds and faith traditions. Holding a degree in theology, David is well-equipped to provide a prayerful Christian service.",
      image: team4,
    },
    {
      name: "GELYN PESCUELA",
      role: "Senior SEO Strategist & Development Coordinator",
      bio: "Bringing an analytical edge from Accounting Technology, Gelyn drives BLACK TULIP FUNERALS’s online growth through SEO and front-end WordPress design. She crafts search-friendly content and user-centric interfaces.",
      image: team5,
    },
    {
      name: "PATRICK HARRISON",
      role: "Pianist & Live Music Coordinator",
      bio: "A classically trained pianist with nearly 20 years’ performance experience, Patrick sets the tone at funerals, weddings and corporate events. Versatile across jazz, blues and contemporary genres, his live music provides comfort.",
      image: team6,
    },
    {
      name: "EMMA HOLLINGSWORTH",
      role: "Digital Receptionist & Family Adviser",
      bio: "Emma is the welcoming digital face of BLACK TULIP FUNERALS—available 24/7 to guide families through their first steps. Combining cutting-edge responsiveness with genuine empathy, she ensures every inquiry feels personal.",
      image: team7,
    },
  ];

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="section-container">
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-display text-sm text-gray-500 uppercase tracking-widest block mb-2">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
            MEET YOUR CARE TEAM
          </h2>
        </div>

        {/* --- TEAM GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <TeamMemberCard key={idx} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetYourCareTeamSection;
