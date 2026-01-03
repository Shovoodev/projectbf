import img from "./images/swot_img.jpg";
// Card Component with "dark" mode support
const StrengthCard = ({ title, text, dark }) => (
  <div
    className={`p-3 rounded-xl border transition-shadow duration-300 h-full flex flex-col justify-center
      ${
        dark
          ? "bg-black border-black text-white"
          : "bg-white border-gray-200 text-gray-900 hover:shadow-md"
      }`}
  >
    <h5
      className={`font-display font-bold text-3xl mb-4  pb-2 inline-block ${
        dark ? "border-gray-600" : "border-gray-200"
      }`}
    >
      {title}
    </h5>
    <p
      className={`font-body text-lg leading-relaxed ${
        dark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {text}
    </p>
  </div>
);

const SwotStrengthsSection = () => {
  const strengths = [
    {
      title: "Financial Performance",
      text: "High profitability compared to sector average, low product/service concentration, and high revenue per employee.",
      dark: true, // Black Box
    },
    {
      title: "Innovation",
      text: "Innovative use of AI and technology, comprehensive suite of services at competitive prices.",
      dark: false, // White Box
    },
    {
      title: "Business Model",
      text: "All-encompassing, in-house service model with a focus on transparency and affordability.",
      dark: false, // White Box
    },
    {
      title: "Social Impact",
      text: "Commitment to social impact and eco-friendly options.",
      dark: true, // Black Box
    },
  ];

  return (
    <section
      id="swot-strengths"
      className="section-padding bg-white"
    >
      <div className="mx-auto">
        {/* Section Heading */}
        <h2 className="heading-lg">SWOT Analysis: Strengths</h2>

        {/* CHANGED: Grid layout adjusted to make Image narrower.
            lg:grid-cols-5 creates 5 slots.
            Content takes 3 slots (60%).
            Image takes 2 slots (40%).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* --- LEFT SIDE: 2x2 GRID (Takes 3/5 width) --- */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {strengths.map((item, idx) => (
              <StrengthCard key={idx} {...item} />
            ))}
          </div>

          {/* --- RIGHT SIDE: IMAGE (Takes 2/5 width - Narrower) --- */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl h-full min-h-[500px]">
            <img
              src={img}
              alt="Black Tulip Funerals Team"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwotStrengthsSection;
