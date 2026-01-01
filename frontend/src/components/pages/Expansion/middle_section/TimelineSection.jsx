import React from "react";

const TimelineCard = ({ number, title, description }) => (
  <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all duration-300 h-full group hover:-translate-y-1">
    {/* Number */}
    <div className="text-5xl font-display font-bold  mb-4 group-hover:text-black transition-colors duration-300">
      {number}
    </div>

    {/* Content */}
    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 h-14 flex items-center">
      {title}
    </h3>
    <p className="font-montserrat text-gray-600 text-lg leading-relaxed text-justify">
      {description}
    </p>
  </div>
);

const TimelineSection = () => {
  const milestones = [
    {
      number: "01",
      title: "Launch of AI Chatbot and Personalised Video Platform",
      description:
        "Enhancing customer experience through innovative technology while leveraging AI and video, we are able to provide a more personalised and engaging experience for our customers, addressing their needs with greater efficiency and empathy.",
    },
    {
      number: "02",
      title: "Expansion into New Geographic Markets",
      description:
        "Increasing our reach and serving more communities. Through strategic partnerships and targeted marketing efforts, we are expanding our footprint to bring our exceptional services to a wider audience, ensuring that more families can benefit from our compassionate approach.",
    },
    {
      number: "03",
      title: "Development of Grief Support Platform",
      description:
        "Providing accessible emotional support to those in need. Recognising the profound impact that the loss of a loved one can have, we have developed a comprehensive grief support platform that offers a range of resources, from professional counselling to peer-to-peer support groups.",
    },
    {
      number: "04",
      title: "Key Hires to Support Growth",
      description:
        "Attracting top talent to execute our expansion plans. To ensure the successful implementation of our growth strategy, we have made strategic hires across various departments, bringing on board industry experts and visionaries who share our commitment to innovation.",
    },
    {
      number: "05",
      title: "Launching Sustainable Cremation Solutions",
      description:
        "Offering eco-friendly alternatives to traditional cremation. In response to the growing demand for more environmentally responsible end-of-life options, we have developed a range of sustainable cremation solutions that minimize the carbon footprint and use of resources.",
    },
    {
      number: "06",
      title: "Expanding Prepaid Funeral Plans",
      description:
        "Empowering families to plan ahead with confidence. Recognizing the importance of financial preparedness, we have expanded our prepaid funeral plan offerings, making it easier for individuals to pre-arrange and pre-pay for their final arrangements.",
    },
  ];

  return (
    <section id="timeline-section" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- HEADING --- */}
        <div className="text-center mb-16">
          <h2 className="heading-lg">Timeline & Growth Strategy</h2>
        </div>

        {/* --- GRID (2 Rows of 3 Columns) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((item, idx) => (
            <TimelineCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
