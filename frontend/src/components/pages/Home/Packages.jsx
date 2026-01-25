import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import img3 from "./images/Attending-Service-Cremation.png";
import img1 from "./images/No-Service-Direct-Cremation.png";
import img2 from "./images/Viewing-Cremation.png";
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
        className="text-4xl font-bold mb-4 text-gray-900"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-1">
        {desc}
      </p>
      <div className="mt-auto w-full flex flex-col items-center">
        <div className="text-5xl  font-display font-semibold mb-4 text-gray-900">
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
      img: img1,
    },
    {
      title: "Private Viewing &<br/>Cremation",
      desc: "The Black Tulip Private Viewing & Cremation Package provides families with a dignified, compassionate, and cost-effective option during a difficult time. This package allows for a respectful farewell in a private setting.",
      price: "3399",
      img: img2,
    },
    {
      title: "Attending Service<br/>& Cremation",
      desc: "A lavish, all-inclusive cremation package in our exclusive 288-seat auditorium chapel. Includes quality coffin, flowers, celebrant, audio-visual tribute, livestream, printed stationery, all cremation costs, death certificate.",
      price: "4499",
      img: img3,
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
          <Link to="/contact" className="btn-enquire">
            <span className="">Enquire Now</span>
            <FaLongArrowAltRight />
          </Link>
          ;
        </div>
      </div>
    </section>
  );
};

export default Packages;
