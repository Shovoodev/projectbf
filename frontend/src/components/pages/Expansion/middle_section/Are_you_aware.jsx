import img from "./images/awr_img-e1761109580847.avif";
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

const Are_you_aware = () => {
  const initiatives = [
    {
      number: "01",
      title: "Grief Support PlatformFuneral Industry Consolidation",
      description:
        "The funeral industry has seen significant consolidation in recent years, with major players like InvoCare being acquired by large private equity firms. This trend towards industry consolidation raises concerns about the potential for reduced competition and increased prices for consumers.",
    },
    {
      number: "02",
      title: "Rising Costs and Affordability Concerns",
      description:
        "As the funeral industry becomes more concentrated, there are growing worries that the costs of funerals will continue to rise, making them increasingly unaffordable for many families. This could limit access to meaningful end-of-life services and ceremonies, especially for lower-income communities.",
    },
    {
      number: "03",
      title: "Sustainability Challenges", // Keeping duplicate title as per your snippet/image text
      description:
        "Traditional funeral practices can have a significant environmental impact, from the use of embalming fluids to the energy-intensive cremation process. As awareness of sustainability issues grows, there is a need for the funeral industry to adopt more eco-friendly and sustainable approaches to better serve the needs of both families and the planet.",
    },
  ];

  return (
    <section id="are-you-aware" className="py-16 bg-white scroll-mt-24">
      <div className="mx-auto">
        {/* --- HEADING --- */}
        <h2 className="heading-lg">Are you aware?</h2>

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

export default Are_you_aware;
