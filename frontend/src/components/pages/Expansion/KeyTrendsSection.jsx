import img from "./images/key-trends.jpg";
const TrendCard = ({ title, text }) => (
  <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow duration-300 h-full flex flex-col justify-center">
    <h5 className="font-display font-bold text-gray-900 text-2xl mb-3  pb-2 inline-block">
      {title}
    </h5>
    <p className="text-gray-600 font-body text-lg leading-relaxed">{text}</p>
  </div>
);

const KeyTrendsSection = () => {
  const trends = [
    {
      title: "Demographic Shifts",
      text: "The aging population is driving increased demand for funeral services. Providers must cater to the unique needs of this demographic.",
    },
    {
      title: "Rising Death Rates in NSW",
      text: "Projected increase in deaths in NSW puts pressure on funeral service providers to scale their operations.",
    },
    {
      title: "Evolving Consumer Trends",
      text: "Consumers desire more diverse, affordable, and technology-integrated funeral experiences.",
    },
    {
      title: "Sustainability and Green Funerals",
      text: "Growing demand for eco-friendly and sustainable funeral options, driven by environmental consciousness.",
    },
  ];

  return (
    <section id="trend-impact-section" className="section-padding bg-white ">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: IMAGE --- */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px] lg:min-h-full">
            <img
              src={img}
              alt="Key Trends Impacting the Funeral Industry"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="flex flex-col h-full">
            <h2 className="heading-lg">
              Key Trends Impacting the Funeral Industry
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
              {trends.map((trend, idx) => (
                <TrendCard key={idx} {...trend} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyTrendsSection;
