import { FaArrowRight, FaEye } from "react-icons/fa6";
import { MdOutlineChurch } from "react-icons/md"; // Example icon for 'Attending Service'
import img1 from "../Home/images/Attending-Service-Cremation.png";
import img2 from "../Home/images/No-Service-Direct-Cremation.png";
import img3 from "../Home/images/Viewing-Cremation.png";

const PackageCard = ({
  title,
  price,
  description,
  image,
  link,
  isPopular,
  isTopRated,
}) => (
  <div
    className={`relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border 
        
    `}
  >
    {/* Popular Badge */}
    {isPopular && (
      <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest shadow-md">
        Most Popular
      </div>
    )}
    {isTopRated && (
      <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-widest shadow-md">
        Top Rated
      </div>
    )}

    {/* Image Header */}
    <div className="h-48 overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
    </div>

    {/* Content Body */}
    <div className="p-8 flex flex-col flex-grow">
      {/* Icon (Optional Visual Cue) */}
      <div className="mb-4 text-3xl  group-hover:text-black transition-colors">
        {isPopular ? (
          <MdOutlineChurch />
        ) : title.includes("Viewing") ? (
          <FaEye />
        ) : null}
      </div>

      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2 leading-tight min-h-[3.5rem]">
        {title}
      </h3>

      <p className="text-gray-600 font-body text-sm leading-relaxed mb-8 flex-grow text-justify">
        {description}
      </p>
      <div className=" flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
        <p className="text-lg font-bold text-black uppercase tracking-wider mb-1">
          Starts At
        </p>
        <p className="text-4xl font-body font-bold text-black">{price}</p>
      </div>
      {/* CTA Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 bg-black text-white hover:bg-gray-800"
          
        }`}
      >
        More Information <FaArrowRight />
      </a>
    </div>
  </div>
);

const OurPackagesSection = () => {
  const packages = [
    {
      title: "No Service Direct Cremation",
      price: "$2299",
      description:
        "If you prefer a farewell without a formal viewing or ceremony, consider this streamlined package that focuses solely on the cremation process. We handle your loved one’s remains with the utmost respect and dignity, offering a simplified farewell that honours your wishes.",
      image: img1,
      link: "https://blacktulipfunerals.com.au/no-service-cremation/",
      isTopRated: true,
    },
    {
      title: "Private Viewing & Cremation",
      price: "$3599",
      description:
        "The Black Tulip Private Viewing & Cremation Package provides families with a dignified, compassionate, and cost-effective option during a difficult time. This package allows for a respectful farewell in a private setting that brings comfort to family and friends. Maximum 30 Guests.",
      image: img2,
      link: "https://blacktulipfunerals.com.au/viewing-cremation/",
      isPopular: false,
    },
    {
      title: "Attending Service & Cremation",
      price: "$4899",
      description:
        "A lavish, all‑inclusive cremation package in our exclusive 288‑seat auditorium chapel. Includes quality coffin, flowers, celebrant, audio‑visual tribute, livestream, printed stationery, all cremation costs, death certificate and preparation of your loved one. Every detail is handled for a truly memorable farewell.",
      image: img3,
      link: "https://blacktulipfunerals.com.au/attending-service-cremation/",
      isPopular: true,
    },
  ];

  return (
    <section id="our-packages" className="py-20 scroll-mt-24">
      <div className="section-container max-w-7xl mx-auto px-6">
        {/* --- SECTION HEADER --- */}

        {/* --- PACKAGES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPackagesSection;
