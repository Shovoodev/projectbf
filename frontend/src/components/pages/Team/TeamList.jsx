import team1 from "./images/team1.png";
import team2 from "./images/team2.png";
import team3 from "./images/team3.png";
import team4 from "./images/team4.png";
import team5 from "./images/team5.png";
import team6 from "./images/team6.png";
import team7 from "./images/team7.png";

const TeamCard = ({ member }) => {
  const isDark = member.theme === "dark";

  return (
    <div
      className={`
      p-8 rounded-lg shadow-sm flex flex-col gap-6
      ${
        isDark
          ? "bg-primary text-white shadow-xl"
          : "bg-card-light text-gray-900 border border-gray-100"
      }
    `}
    >
      {/* 1. Header: Name & Role centered at the top */}
      <div className="text-center w-full">
        <h3
          className={`font-display text-5xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {member.name}
        </h3>
        <p
          className={`text-xl font-bold  tracking-wide opacity-80 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {member.role}
        </p>
      </div>

      {/* 2. Body: Image Left, Text Right */}
      {/* 2. Body: Image Left (40%), Text Right (60%) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image Section - Takes 40% width on desktop */}
        <div className="w-full md:w-[40%] flex-shrink-0">
          <img
            alt={member.name}
            className={`w-full  object-cover rounded shadow-md ${
              isDark ? "border border-gray-700" : ""
            }`}
            src={member.imgLarge}
          />
        </div>

        <div
          className={`w-full md:w-[60%] h-90 overflow-y-auto pr-2 text-xs leading-relaxed text-justify ${
            isDark ? "text-gray-300" : "text-white"
          }`}
        >
          <p className={`bold-paragraph ${isDark ? "text-white" : ""}`}>
            {member.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamList = () => {
  const teamMembers = [
    {
      name: "Sara Phiromnak",
      role: "(Development Manager, Personal Assistant to CEO)",
      desc: "The quiet achiever of the team with a warm approach and that friendly Thai smile, Sara oversees the daily business operations offering more than 10 years' experience as a General Manager. Sara shows extreme reliability and is a very cooperative team member. Sara also brings to BLACK TULIP FUNERALS a Bachelor of Business Administration in Operations Management. Native Thai spoken, Sara also is a public speaker and former promotional model for several international brands & products.",
      imgLarge: team1,
      theme: "dark",
    },
    {
      name: "Ariel Alonsagay",
      role: "(Design Team Co-Ordinator)",
      desc: "With a background in Industrial Electronics Technology, AutoCAD, Photogrammetric Correction and Graphic Arts, Ariel has been placed in charge of the design team. Ariel assigns the workload based on the urgency of tasks required with the can-do attitude of late nights, weekends etc. Having worked closely with Scott on the BLACK TULIP FUNERALS branding and roll out, Ariel understands the importance of getting things done then and now.",
      imgLarge: team2,
      theme: "light",
    },
    {
      name: "Erica Vivero",
      role: "(Senior Social Media Specialist)",
      desc: "The baby of the team, softly spoken Erica is a social media enthusiast with a keen eye for detail. With a background in Marketing and Business Management, she's the driving force behind our team's social media presence and keeps the design team on their toes. As our appointed Social Media Specialist, Erica takes the reins of digital marketing, ensuring every post, blog, campaign, and strategy is executed with precision.",
      imgLarge: team3,
      theme: "light",
    },
    {
      name: "David Harrison",
      role: "(Pastoral Care & Master of Ceremonies)",
      desc: "With a deep commitment to serving others, David Harrison has dedicated his career to providing compassionate and meaningful support to grieving families. As a chaplain with extensive experience in prisons, hospitals, and aged care facilities, David has developed a unique ability to connect with individuals from diverse backgrounds and faith traditions. Holding a degree in theology, David is well-equipped to provide a prayerful Christian service.",
      imgLarge: team4,
      theme: "dark",
    },
    {
      name: "Gelyn Pescuela",
      role: "(Senior SEO Strategist & Development Co-Ordinator)",
      desc: "Gelyn is a versatile digital professional specializing in SEO, front-end WordPress design, and content optimization. With a background in Accounting Technology, Gelyn brings a unique analytical perspective to her work in the digital realm. Her two-year tenure as an SEO writer honed her skills in creating engaging, search-engine-friendly content. Committed to continuous growth, Gelyn has pursued specialised training as an SEO Specialist.",
      imgLarge: team5,
      theme: "dark",
    },
    {
      name: "Patrick Harrison",
      role: "(Pianist & Live Music Coordinator)",
      desc: "Patrick Harrison is a highly skilled pianist with nearly two decades of experience. He holds a Diploma of Music Performance and a Bachelor of Music Performance, specialising in Classical, Jazz, Blues, and Contemporary piano. Since completing his studies, Patrick has showcased his talent at a wide range of events, including weddings, funerals, private functions, corporate events, bars, festivals, and on cruise ships.",
      imgLarge: team6,
      theme: "light",
    },
    {
      name: "Emma Hollingsworth",
      role: "(Digital Receptionist & Family Adviser)",
      desc: "Emma Hollingsworth is the friendly and efficient digital face of BLACK TULIP FUNERALS, seamlessly blending modern technology with compassionate support. As our Digital Receptionist and Family Adviser, Emma is available around the clock to assist families during their most challenging times. Her role ensures that every interaction is personal and meaningful. Emma's expertise lies in streamlining communication.",
      imgLarge: team7,
      theme: "light",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {teamMembers.map((member, index) => (
        <TeamCard key={index} member={member} />
      ))}
    </div>
  );
};

export default TeamList;
