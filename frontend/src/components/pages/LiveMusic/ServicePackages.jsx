import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const ServicePackages = () => {
  const instruments = [
    "Vocals",
    "Piano",
    "Violin",
    "Cello",
    "Harp",
    "Guitar",
    "Trumpet",
  ];

  const packages = [
    {
      title: "Solo",
      price: "$400",
      desc: "A selection of one of the available instruments (vocals can be included by certain pianists)",
    },
    {
      title: "Duo",
      price: "$700",
      desc: "A selection of two of the available instruments",
    },
    {
      title: "Trio",
      price: "$900",
      desc: "A selection of three of the available instruments",
    },
  ];

  return (
    <section className="bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Instruments Column */}
          <div className="bg-black text-white rounded-lg p-8 shadow-lg h-full">
            <h2 className="text-3xl font-bold font-display mb-1">
              Available Instruments
            </h2>
            <p className="text-gray-400 text-sm mb-6 italic">
              (Pending availability)
            </p>
            <ul className="space-y-4 font-medium font-body">
              {instruments.map((inst, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCircleCheck className="text-sm mr-3 text-white" /> {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Packages Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm h-full flex flex-col justify-between">
            <h2 className="text-3xl font-bold font-display mb-6 text-gray-900">
              Packages
            </h2>
            <div className="space-y-6">
              {packages.map((pkg, idx) => (
                <div key={idx}>
                  <div className="bg-surface p-4 rounded mb-2 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 font-display">
                      {pkg.title}
                    </h3>
                    <span className="font-bold text-lg text-gray-900">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm font-body">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
