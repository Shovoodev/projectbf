import React from "react";

const PackageCard = ({ title, price, image, desc }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
    <div className="h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6 flex flex-col flex-1 text-center">
      <span className="text-sm text-gray-500 uppercase tracking-widest mb-1">
        Starting at
      </span>
      <div className="text-3xl font-display font-bold text-gray-900 mb-2">
        {price}
      </div>
      <h3
        className="text-xl font-bold font-display mb-4 text-gray-900"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h3>
      <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
      <p className="text-sm text-gray-600 mb-6 font-body flex-1">{desc}</p>
      <a href="#" className="btn-primary text-xs py-2 w-full mt-auto">
        Read More
      </a>
    </div>
  </div>
);

const PackagesPreview = () => {
  const packages = [
    {
      title: "No Service<br/>Direct Cremation",
      price: "$ 2200",
      image:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/No-Service-Direct-Cremation.png",
      desc: "If you prefer a farewell without a formal viewing or ceremony, consider this streamlined package that focuses solely on the cremation process.",
    },
    {
      title: "Viewing &<br/>Cremation",
      price: "$ 3300",
      image:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/Viewing-Cremation.png",
      desc: "Our Viewing & Cremation Package provides families in Sydney with a dignified, compassionate, and cost effective option during a difficult time.",
    },
    {
      title: "Attending Service<br/>Cremation",
      price: "$ 4400",
      image:
        "https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/Attending-Service-Cremation.png",
      desc: "This package offers a compassionate and affordable way to say goodbye, allowing families to gather with loved ones for a meaningful ceremony.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
            Our Packages
          </h2>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Funeral Packages and Pricing
          </h2>
          <p className="text-gray-600 font-body">
            We offer a range of thoughtfully designed funeral packages to suit
            different needs, preferences, and budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
