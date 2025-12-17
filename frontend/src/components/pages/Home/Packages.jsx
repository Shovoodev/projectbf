import React from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa6";

const PackageCard = ({ img, title, desc, price }) => (
  <div className="bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
    <div className="h-48 overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
      />
    </div>
    <div className="p-8 flex-1 flex flex-col items-center text-center">
      <h3
        className="font-display text-xl font-bold mb-4 text-gray-900"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-1">
        {desc}
      </p>
      <div className="mt-auto w-full flex flex-col items-center">
        <div className="text-3xl font-display font-bold mb-4 text-gray-900">
          ${price}
        </div>
        <button className="btn-primary btn-sm">Learn More</button>
      </div>
    </div>
  </div>
);

const Packages = () => {
  const packages = [
    {
      title: "No Service<br/>Direct Cremation",
      desc: "If you prefer a farewell without a formal viewing or ceremony, consider this streamlined package that focuses solely on the cremation process. We handle your loved one’s remains with the utmost respect and dignity.",
      price: "2299",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4RiPMRsmpNihyDsXb9lg0y-CgEjICTXpbghonk2F4boK8ZrCcrOcVnjlJ9TkwoHH3wgl9sfuWJUSUC1GL3iBWi_I5l0-54MriEmj7OMQo3xs4fE5sRc7qpDI9OjshTQVgH_oDJrnWueUwYK2YbupAn87vxAaRwkXzzkA4TFvdHtaJUG3Rugh4KqClsn-3X1yX04hO24owdECnOFSYA0tAxOjFrBrSJAlrmLhyy65F0bnh4YEbZilWEZqfbJ5bhTdzjtpOWSgJTM0",
    },
    {
      title: "Private Viewing &<br/>Cremation",
      desc: "The Black Tulip Private Viewing & Cremation Package provides families with a dignified, compassionate, and cost-effective option during a difficult time. This package allows for a respectful farewell in a private setting.",
      price: "3599",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz4RAuKv8zbAM3JhjGBh_-Tb6LykPbBeHdKBBnEjlyuqIhqK1R2AX0crLhZGacSr4rG-p9wxjwcytc2IAnfb5WFg2K8kpakynQJhSAsqac6fWQfuL_-C6Oy4pNx9nUWZSjLXifRzuIakY1BZ7FtlPmbx2bsHzuyYI40sk0gzPyFFtm1ITpnNcAISpTfRmR-q9aN7U4Gfb8KPKG9FKp5bvJP2Bzewho40m0CIOGs9JR53SHihtiHEMQk1bsYp-mJc16fEL1OjycPSc",
    },
    {
      title: "Attending Service<br/>& Cremation",
      desc: "A lavish, all-inclusive cremation package in our exclusive 288-seat auditorium chapel. Includes quality coffin, flowers, celebrant, audio-visual tribute, livestream, printed stationery, all cremation costs, death certificate.",
      price: "4899",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfbMuwLbtUlnkSMobr29NpztFAl8Cf1SAEADHTiuiaOJL6HxOvFsaChiLoZ7r1IHqVX1xzvWbqFGs_xaqAGJqdTS_pYGx2RUm1H-25QaSJFtSGexSSPs3XaXBsPI290UAzGRFwrEjGc05RNznplkfeMnrAUm-KMAjdVVee_dOmr8AxlDX6YckKHJ5wbYdFvFIGss-1y8a6IA1zA4_5eQqaw6X-98R87z3RnmN0O96H8ZAIsVQWw1QiNcbU07pUK6Sv8B3MM_Ipxa0",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="badge mb-6">Our Packages</span>
          <h2 className="heading-lg">
            BLACK TULIP FUNERALS
            <br />
            CREMATION PACKAGES
          </h2>
          <p className="max-w-3xl mx-auto text-body-light">
            We offer a range of thoughtfully designed funeral packages to suit
            different needs, preferences, and budgets. Each option is delivered
            with care, transparency, and respect — ensuring your loved one’s
            farewell is both meaningful and affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <a href="tel:1300110031" className="btn-primary">
            <FaPhone className="mr-2" /> 1300 11 0031
          </a>
          <a
            href="#"
            className="btn-primary bg-white text-black border border-black hover:bg-gray-100"
          >
            ENQUIRE NOW <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;
