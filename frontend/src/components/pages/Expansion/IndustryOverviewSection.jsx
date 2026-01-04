import chart from "./images/indstr_chart-1024x498.avif";
import img from "./images/industry-overview.avif";
// Helper component for the text cards
const InfoCard = ({ title, text }) => (
  <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
    <h5 className="font-display font-bold text-gray-900 text-3xl mb-2">
      {title}
    </h5>
    <p className="text-gray-600 font-body text-lg leading-relaxed">{text}</p>
  </div>
);

const IndustryOverviewSection = () => {
  return (
    <section id="industry-overview" className="section-padding bg-white">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* --- LEFT SIDE: FEATURE IMAGE --- */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-full">
            <img
              src={img}
              alt="Funeral Industry Overview"
              className="w-full h-full object-cover min-h-[500px] transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* --- RIGHT SIDE: CONTENT & CHART --- */}
          <div className="flex flex-col h-full space-y-8">
            {/* Heading */}
            <h2 className="heading-lg">Industry Overview</h2>

            {/* Info Cards Stack */}
            <div className="space-y-4">
              <InfoCard
                title="Industry Definition"
                text="Encompasses businesses operating funeral homes, crematoria, and cemeteries, providing services related to funerals, cremations, and burials."
              />
              <InfoCard
                title="Shifting Preferences"
                text="Increasing preference for lower-cost cremations and basic funeral packages over expensive burials."
              />
              <InfoCard
                title="Industry Growth"
                text="Driven by factors such as the number of deaths, average spend per funeral/cremation, and changes in household disposable incomes."
              />
            </div>

            {/* Chart Image */}
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mt-auto">
              <img
                src={chart}
                alt="Industry Growth Chart"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryOverviewSection;
