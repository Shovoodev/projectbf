import React from "react";

const InclusionCard = ({ imageSrc, title, description }) => (
  <div className="flex flex-col items-center text-center group">
    {/* Image Container with Hover Effect */}
    <div className="w-full aspect-square overflow-hidden rounded-xl mb-6 shadow-sm border border-gray-100">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <h3 className="font-display font-bold text-3xl text-gray-900 mb-3 group-hover:text-black transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed max-w-xs mx-auto">
      {description}
    </p>
  </div>
);

const InclusionsSection = () => {
  const inclusions = [
    {
      title: "Chapels",
      imageSrc:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/inclsn_1-1-1.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      title: "Live Streaming",
      imageSrc:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/inclsn_3.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      title: "Urns",
      imageSrc:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/inclsn_1.avif",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      title: "Stationary",
      imageSrc:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/inclsn_4.avif",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
  ];

  return (
    <section id="inclusions-section" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- HEADING --- */}
        <div className="text-center mb-16">
          <h2 className="heading-lg">Inclusions</h2>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {inclusions.map((item, idx) => (
            <InclusionCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InclusionsSection;
