import { useState } from "react";
import BrownStain from "./MDF_RANGE/Contract/Brown-Stain.jpg";
import Raw from "./MDF_RANGE/Contract/Raw.jpg";
import RedStain from "./MDF_RANGE/Contract/Red-Stain.jpg";
import BasicCountryOak from "./MDF_RANGE/Basic/Country-Oak.jpg";
import BasicDeluxeTeak from "./MDF_RANGE/Basic/Deluxe-Teak.jpg";
import BasicSapelle from "./MDF_RANGE/Basic/Sapelle.jpg";
import BasicTeak from "./MDF_RANGE/Basic/Teak.jpg";
import BlaxlandCedar from "./MDF_RANGE/Blaxland/Cedar.jpg";
import BlaxlandCountryOak2 from "./MDF_RANGE/Blaxland/Country-Oak-2.jpg";
import BlaxlandDeluxeTeak2 from "./MDF_RANGE/Blaxland/Deluxe-Teak-2.jpg";
import BlaxlandRoseMahogany from "./MDF_RANGE/Blaxland/Rose-Mahogany.jpg";
import CalvaryNewCoffin from "./MDF_RANGE/Calvary/new-coffin.jpg";
import CalvaryRosewood2 from "./MDF_RANGE/Calvary/Rosewood-2.jpg";
import CreswickDeluxeTeak3 from "./MDF_RANGE/Creswick/Deluxe-Teak-3.jpg";
import DenmanRoseMahogany2 from "./MDF_RANGE/Denman/Rose-Mahogany-2.jpg";
import DenmanRosewood4 from "./MDF_RANGE/Denman/Rosewood-4.jpg";
import DomeRegal1 from "./MDF_RANGE/Dome Regal/dome-regal-1.png";
import GoldlineLightOak from "./MDF_RANGE/Goldline/Light-Oak.jpg";
import PortlandCreamPearl1 from "./MDF_RANGE/Portland/portland-cream-pearl-1.png";
import PortlandWhite3 from "./MDF_RANGE/Portland/White-3.jpg";
import WentworthRosewood3 from "./MDF_RANGE/Wentworth/Rosewood-3.jpg";
import WentworthWalnut3 from "./MDF_RANGE/Wentworth/Walnut-3.jpg";
import WickerCasketWICKER from "./MDF_RANGE/Wicker Casket/WICKER.jpeg";
import BrentwoodCedar1 from "./SOLID_TIMBER_RANGE/Brentwood/Cedar-1.jpg";
import BrentwoodRosewood21 from "./SOLID_TIMBER_RANGE/Brentwood/Rosewood-2-1.jpg";
import DenmanCedar2 from "./SOLID_TIMBER_RANGE/Denman Cedar/Cedar-2.jpg";
import DomeRegalDeluxe from "./SOLID_TIMBER_RANGE/Dome Regal Deluxe/dome-regal-deluxe.png";
import EnviroRawPine from "./SOLID_TIMBER_RANGE/Enviro/Raw-Pine.jpg";
import WhiteRoseClear from "./SOLID_TIMBER_RANGE/White Rose/Clear.jpg";
import WhiteRoseLimewash from "./SOLID_TIMBER_RANGE/White Rose/Limewash.jpg";
import WhiteRoseWhite1 from "./SOLID_TIMBER_RANGE/White Rose/White-1.jpg";

// Data Structure (Same as before)
const coffinData = {
  mdf: {
    title: "MDF RANGE",
    models: [
      {
        name: "Contract",
        images: [
          { src: Raw, title: "Raw" },
          { src: RedStain, title: "Red Stain" },
          { src: BrownStain, title: "Brown Stain" },
        ],
      },
      {
        name: "Basic",
        images: [
          { src: BasicDeluxeTeak, title: "Deluxe Teak" },
          { src: BasicCountryOak, title: "Country Oak" },
          { src: BasicSapelle, title: "Sapelle" },
          { src: BasicTeak, title: "Teak" },
        ],
      },
      {
        name: "Blaxland",
        images: [
          { src: BlaxlandCedar, title: "Cedar" },
          { src: BlaxlandCountryOak2, title: "Country Oak" },
          { src: BlaxlandDeluxeTeak2, title: "Deluxe Teak" },
          { src: BlaxlandRoseMahogany, title: "Rose Mahogany" },
        ],
      },
      {
        name: "Calvary",
        images: [
          { src: CalvaryRosewood2, title: "Rosewood" },
          { src: CalvaryNewCoffin, title: "Walnut" },
        ],
      },
      {
        name: "Wentworth",
        images: [
          { src: WentworthWalnut3, title: "Walnut" },
          { src: WentworthRosewood3, title: "Rosewood" },
        ],
      },
      {
        name: "Portland",
        images: [
          { src: PortlandWhite3, title: "White" },
          { src: PortlandCreamPearl1, title: "Cream" },
        ],
      },
      {
        name: "Creswick",
        images: [{ src: CreswickDeluxeTeak3, title: "Deluxe Teak" }],
      },
      {
        name: "Denman",
        images: [
          { src: DenmanRosewood4, title: "Rosewood" },
          { src: DenmanRoseMahogany2, title: "Rose Mahogany" },
        ],
      },
      {
        name: "Goldline",
        images: [{ src: GoldlineLightOak, title: "Light Oak" }],
      },
      {
        name: "Dome Regal",
        images: [{ src: DomeRegal1, title: "Rosewood" }],
      },
      {
        name: "Wicker Casket",
        images: [{ src: WickerCasketWICKER, title: "Wicker" }],
      },
    ],
  },
  timber: {
    title: "SOLID TIMBER RANGE",
    models: [
      {
        name: "Enviro",
        images: [{ src: EnviroRawPine, title: "Raw Pine" }],
      },
      {
        name: "White Rose",
        images: [
          { src: WhiteRoseClear, title: "Clear" },
          { src: WhiteRoseLimewash, title: "Limewash" },
          { src: WhiteRoseWhite1, title: "White" },
        ],
      },
      {
        name: "Dome Regal Deluxe",
        images: [{ src: DomeRegalDeluxe, title: "Rosewood" }],
      },
      {
        name: "Brentwood",
        images: [
          { src: BrentwoodCedar1, title: "Cedar" },
          { src: BrentwoodRosewood21, title: "Rosewood" },
        ],
      },
      {
        name: "Denman Cedar",
        images: [{ src: DenmanCedar2, title: "Cedar" }],
      },
    ],
  },
};

const CoffinCatalog = () => {
  const [activeRange, setActiveRange] = useState("mdf");
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  const handleRangeChange = (rangeKey) => {
    setActiveRange(rangeKey);
    setActiveModelIndex(0);
  };

  const currentModels = coffinData[activeRange].models;
  const activeModel = currentModels[activeModelIndex];

  return (
    <section className="bg-white py-16">
      <div className="section-container">
        {/* --- MAIN TABS (Range Selection) --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <button
            onClick={() => handleRangeChange("mdf")}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 border text-sm md:text-base ${
              activeRange === "mdf"
                ? "bg-black text-white border-black shadow-lg"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {coffinData.mdf.title}
          </button>
          <button
            onClick={() => handleRangeChange("timber")}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 border text-sm md:text-base ${
              activeRange === "timber"
                ? "bg-black text-white border-black shadow-lg"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {coffinData.timber.title}
          </button>
        </div>

        {/* --- SUB TABS (Pill Style - Wrapped Layout) --- */}
        {/* 'flex-wrap' ensures items drop to the next line on mobile instead of cutting off */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {currentModels.map((model, idx) => (
              <button
                key={idx}
                onClick={() => setActiveModelIndex(idx)}
                className={`px-6 py-2.5 rounded-full text-lg font-medium transition-all duration-200 border-none ${
                  activeModelIndex === idx
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* --- GALLERY DISPLAY --- */}
        <div className="animate-fadeIn max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="2xl font-display font-bold text-gray-900 uppercase tracking-widest">
              {activeModel.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeModel.images.map((img, idx) => (
              <div key={idx} className="group">
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center border-t border-gray-50">
                    <p className="font-display font-bold text-gray-800 uppercase tracking-wide text-sm">
                      {img.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffinCatalog;
