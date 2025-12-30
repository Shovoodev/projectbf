import img from "./images/scl_img.jpg";
const ImpactCard = ({ number, title, description }) => (
  <div className="bg-white border border-gray-400 rounded-xl p-6 flex flex-col items-start transition-shadow duration-300 relative overflow-hidden group h-full justify-center">
    {/* Number Circle */}
    <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-4xl font-bold font-display mb-4 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
      {number}
    </div>

    <h3 className="font-display font-bold text-3xl text-gray-900 mb-2">
      {title}
    </h3>

    <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
  </div>
);

const SocialImpactSection = () => {
  const initiatives = [
    {
      number: "01",
      title: "Grief Support Platform",
      description:
        "AI-powered platform offering personalised grief counselling and resources, accessible to anyone regardless of their ability to pay for Funera's services.",
    },
    {
      number: "02",
      title: "End-of-Life Planning Tools",
      description:
        "Free online tools and resources to help individuals and families navigate end-of-life decisions and create personalised legacy projects.",
    },
    {
      number: "03",
      title: "End-of-Life Planning Tools", // Keeping duplicate title as per your snippet/image text
      description:
        "Free online tools and resources to help individuals and families navigate end-of-life decisions and create personalised legacy projects.",
    },
  ];

  return (
    <section id="social-impact" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- HEADING --- */}
        <h2 className="heading-lg">Social Impact Initiatives</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* --- LEFT SIDE: CARDS STACK --- */}
          <div className="space-y-6 flex flex-col justify-between h-full">
            {initiatives.map((item, idx) => (
              <ImpactCard key={idx} {...item} />
            ))}
          </div>

          {/* --- RIGHT SIDE: LOGO + IMAGE PANEL --- */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-50 rounded-2xl overflow-hidden h-full min-h-[600px] flex flex-col relative">
              {/* Top White Area with Logo */}

              {/* Bottom Image Area */}
              <div className="flex-grow relative h-2/3">
                <img
                  src={img}
                  alt="Social Impact Meeting"
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpactSection;
