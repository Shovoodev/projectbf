import React from "react";
import img from "./images/cmpttv_img.avif";
const MarketShareTable = () => (
  <div className="overflow-hidden rounded-xl shadow-sm border border-gray-100 mt-6">
    <table className="w-full text-left text-sm md:text-base font-body">
      <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider text-xs md:text-sm">
        <tr>
          <th className="px-6 py-4">Company</th>
          <th className="px-6 py-4 text-right">Market Share</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="bg-white hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 text-gray-700 font-medium">InvoCare</td>
          <td className="px-6 py-4 text-right text-gray-900 font-bold">
            26.4%
          </td>
        </tr>
        <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 text-gray-700 font-medium">
            Propel Funeral Partners
          </td>
          <td className="px-6 py-4 text-right text-gray-900 font-bold">6.4%</td>
        </tr>
        <tr className="bg-white hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 text-gray-700 font-medium">Other</td>
          <td className="px-6 py-4 text-right text-gray-900 font-bold">
            67.2%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const CompetitiveLandscapeSection = () => {
  return (
    <section id="competitive-landscape" className="py-16 bg-white scroll-mt-24">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* --- LEFT SIDE: CONTENT & TABLE --- */}
          <div className="order-2 md:order-1">
            <h2 className="heading-lg">Competitive Landscape</h2>
            <p className="text-gray-600 font-body mb-8 text-justify text-lg">
              The funeral industry is dominated by a few major players, yet a
              significant portion remains fragmented. Our strategic positioning
              allows us to capture market share by offering superior value and
              personalised care.
            </p>

            {/* Market Share Table Component */}
            <MarketShareTable />
          </div>

          {/* --- RIGHT SIDE: IMAGE --- */}
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
            <img
              src={img}
              alt="Competitive Landscape Analysis"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveLandscapeSection;
