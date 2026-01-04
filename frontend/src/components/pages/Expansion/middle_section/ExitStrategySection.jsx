import img1 from "./images/ExitStrategySection/ext_strtg_1.avif";
import img2 from "./images/ExitStrategySection/ext_strtg_2.avif";
import img3 from "./images/ExitStrategySection/ext_strtg_3.avif";
// Transformed from a Row to a Vertical Card
const StrategyCard = ({ imageSrc, title, text }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full group">
    {/* Image on Top */}
    <div className="w-full mb-5">
      <div className="rounded-xl overflow-hidden aspect-[4/3] border border-gray-50">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    {/* Content Below */}
    <div className="flex-grow flex flex-col">
      <h3 className="text-lg md:text-2xl font-display font-bold text-gray-900 mb-3 leading-tight">
        {title}
      </h3>
      <div
        className="text-gray-600 font-montserrat text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }} // Renders bold tags in data
      />
    </div>
  </div>
);

const ExitStrategySection = () => {
  const strategies = [
    {
      imageSrc: img1,
      title: "Target Valuation: $77M",
      text: "<strong>Black Tulip Funerals</strong> aims for an IPO, targeting $7M EBITDA and an 11x multiple.",
    },
    {
      imageSrc: img2,
      title: "Industry Average: 18.43x",
      text: "Industry EV/EBITDA avg is 18.43x ($120M valuation). We apply a conservative 35% liquidity discount resulting in a $78M valuation.",
    },
    {
      imageSrc: img3,
      title: "IPO Multiple: 11x",
      text: "We intend to utilise the same 11x multiple used by Propel Funeral Partners in their successful IPO.",
    },

    // Note: A 4th item would go here to fill the grid completely.
    // Currently, it will show 3 items across a 4-column grid.
  ];

  return (
    <section id="exit-strategy" className="py-16 bg-gray-50 scroll-mt-24">
      <div className="section-container max-w-6xl mx-auto">
        {/* --- HEADING --- */}
        <div className="text-center mb-12">
          <h2 className="heading-lg">BTF's Exit Strategy</h2>
        </div>

        {/* --- FOUR COLUMN GRID --- */}
        {/* On large screens (lg), this defines 4 columns. Since we have 3 items, they will take up the first 3 slots. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-center">
          {strategies.map((strategy, idx) => (
            <StrategyCard key={idx} {...strategy} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExitStrategySection;
