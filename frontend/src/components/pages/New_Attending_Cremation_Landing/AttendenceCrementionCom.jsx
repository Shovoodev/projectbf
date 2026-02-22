import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RowSelect from "../../../pages/packages/_components/RowSelect";
import TransferZonesBox from "../../../pages/packages/_components/TransferZonesBox";
import { FaLongArrowAltRight } from "react-icons/fa";

// --- Reusable Card Component ---
export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-gray-50 rounded-xl p-8 border border-gray-100 h-full ${className}`}
    >
      <h3 className="font-body font-lato font-bold uppercase text-body-light md:text-base text-gray-900 mb-6 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

const attendenceData = [
  {
    id: 1,
    question: "Transfers from Place of Passing",
    type: "select",
    options: [
      { label: "Sydney Metro", value: "Sydney Metro", priceAdjustment: 0 },
      {
        label: "Zone 2 (+ $495)",
        value: "Zone 2 (+ $495)",
        priceAdjustment: 495,
      },
      {
        label: "Zone 3 (+ $795)",
        value: "Zone 3 (+ $795)",
        priceAdjustment: 795,
      },
    ],
  },
  {
    id: 2,
    question: "Stationery",
    type: "select",
    options: [
      {
        label: "50 Memoriam Cards",
        value: "50-memoriam-cards",
        priceAdjustment: 0,
      },
      {
        label: "100 Memoriam Cards + $60",
        value: "100-memoriam-cards",
        priceAdjustment: 60,
      },
      {
        label: "150 Memoriam Cards + $120",
        value: "150-memoriam-cards",
        priceAdjustment: 120,
      },
      {
        label: "200 Memoriam Cards + $180",
        value: "200-memoriam-cards",
        priceAdjustment: 180,
      },
      {
        label: "50 Bookmarks + $60",
        value: "50-bookmarks",
        priceAdjustment: 60,
      },
      {
        label: "100 Bookmarks + $120",
        value: "100-bookmarks",
        priceAdjustment: 120,
      },
      {
        label: "150 Bookmarks + $180",
        value: "150-bookmarks",
        priceAdjustment: 180,
      },
      {
        label: "200 Bookmarks + $240",
        value: "200-bookmarks",
        priceAdjustment: 240,
      },
      {
        label: "50 Order of Service Booklets + $120",
        value: "50-booklets",
        priceAdjustment: 120,
      },
      {
        label: "100 Order of Service Booklets + $180",
        value: "100-booklets",
        priceAdjustment: 180,
      },
      {
        label: "150 Order of Service Booklets + $240",
        value: "150-booklets",
        priceAdjustment: 240,
      },
      {
        label: "200 Order of Service Booklets + $300",
        value: "200-booklets",
        priceAdjustment: 300,
      },
    ],
  },
  {
    id: 3,
    question: "Body Preparation",
    type: "select",
    options: [
      {
        label: "General Wash | Dress | Makeup",
        priceAdjustment: 0,
        value: "General Wash | Dress | Makeup",
        includedInBase: true,
      },
      {
        label: "Aesthetic Embalming | Dress | Makeup + $315",
        value: "Aesthetic Embalming | Dress | Makeup + $315",
        priceAdjustment: 315,
      },
    ],
  },
  {
    id: 4,
    question: "Coffin",
    type: "select",
    options: [
      {
        label: "Contract - Raw (Included)",
        value: "contract-raw",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Contract - Red Stain (Included)",
        value: "contract-red-stain",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Contract - Brown Stain (Included)",
        value: "contract-brown-stain",
        priceAdjustment: 0,
        includedInBase: true,
      },

      {
        label: "Basic - Deluxe Teak + $336.70",
        value: "basic-deluxe-teak",
        priceAdjustment: 336.7,
      },
      {
        label: "Basic - Country Oak + $336.70",
        value: "basic-country-oak",
        priceAdjustment: 336.7,
      },
      {
        label: "Basic - Teak + $336.70",
        value: "basic-teak",
        priceAdjustment: 336.7,
      },
      {
        label: "Basic - Sapelle + $336.70",
        value: "basic-sapelle",
        priceAdjustment: 336.7,
      },

      {
        label: "Blaxland - Deluxe Teak + $576.35",
        value: "blaxland-deluxe-teak",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Country Oak + $576.35",
        value: "blaxland-country-oak",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Teak + $576.35",
        value: "blaxland-teak",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Sapelle + $576.35",
        value: "blaxland-sapelle",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Cedar + $576.35",
        value: "blaxland-cedar",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Rosewood + $576.35",
        value: "blaxland-rosewood",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Rose Mahogany + $576.35",
        value: "blaxland-rose-mahogany",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - Walnut + $576.35",
        value: "blaxland-walnut",
        priceAdjustment: 576.35,
      },
      {
        label: "Blaxland - White + $796.35",
        value: "blaxland-white",
        priceAdjustment: 796.35,
      },

      {
        label: "Wicker + $1,092.92",
        value: "wicker",
        priceAdjustment: 1092.92,
      },
      {
        label: "Calvary - Walnut + $1,205.05",
        value: "calvary-walnut",
        priceAdjustment: 1205.05,
      },
      {
        label: "Calvary - Rosewood + $1,205.05",
        value: "calvary-rosewood",
        priceAdjustment: 1205.05,
      },

      {
        label: "Wentworth - Walnut + $1,218.75",
        value: "wentworth-walnut",
        priceAdjustment: 1218.75,
      },
      {
        label: "Wentworth - Rosewood + $1,218.75",
        value: "wentworth-rosewood",
        priceAdjustment: 1218.75,
      },
      {
        label: "Wentworth - White + $1,438.75",
        value: "wentworth-white",
        priceAdjustment: 1438.75,
      },

      {
        label: "Portland - Creme Pearl Metallic + $1,534.55",
        value: "portland-creme-pearl",
        priceAdjustment: 1534.55,
      },
      {
        label: "Portland - White + $1,384.72",
        value: "portland-white",
        priceAdjustment: 1384.72,
      },

      {
        label: "Creswick - Deluxe Teak + $1,423.75",
        value: "creswick-deluxe-teak",
        priceAdjustment: 1423.75,
      },
      {
        label: "Denman - Rosewood + $1,659.60",
        value: "denman-rosewood",
        priceAdjustment: 1659.6,
      },
      {
        label: "Denman - Rose Mahogany + $1,659.60",
        value: "denman-rose-mahogany",
        priceAdjustment: 1659.6,
      },
      {
        label: "Goldline - Light Oak + $1,687.85",
        value: "goldline-light-oak",
        priceAdjustment: 1687.85,
      },
      {
        label: "Dome Regal - Rosewood + $1,756.45",
        value: "dome-regal-rosewood",
        priceAdjustment: 1756.45,
      },
      {
        label: "Enviro - Raw Pine + $1,327.95",
        value: "enviro-raw-pine",
        priceAdjustment: 1327.95,
      },

      {
        label: "White Rose - Clear + $2,022.89",
        value: "white-rose-clear",
        priceAdjustment: 2022.89,
      },
      {
        label: "White Rose - Limewash + $2,022.89",
        value: "white-rose-limewash",
        priceAdjustment: 2022.89,
      },
      {
        label: "White Rose - White + $2,022.89",
        value: "white-rose-white",
        priceAdjustment: 2022.89,
      },

      {
        label: "Dome Regal Deluxe + $1,869.94",
        value: "dome-regal-deluxe",
        priceAdjustment: 1869.94,
      },
      {
        label: "Brentwood - Cedar + $2,079.96",
        value: "brentwood-cedar",
        priceAdjustment: 2079.96,
      },
      {
        label: "Brentwood - Rosewood + $2,079.96",
        value: "brentwood-rosewood",
        priceAdjustment: 2079.96,
      },
      {
        label: "Denman Cedar - Cedar + $2,475.96",
        value: "denman-cedar-cedar",
        priceAdjustment: 2475.96,
      },
    ],
  },
  {
    id: 5,
    question: "Flowers",
    type: "select",
    options: [
      {
        label: "Select an Option",
        value: "Select an Option",
        priceAdjustment: 0,
      },
      {
        label: "100cm Mixed Seasonal Coffin Cover - White",
        value: "100cm Mixed Seasonal Coffin Cover - White",
        priceAdjustment: 0,
      },
      {
        label: "100cm Mixed Seasonal Coffin Cover - Pastel",
        value: "100cm Mixed Seasonal Coffin Cover - Pastel",
        priceAdjustment: 0,
      },
      {
        label: "100cm Mixed Seasonal Coffin Cover - Colourful",
        value: "100cm Mixed Seasonal Coffin Cover - Colourful",
        priceAdjustment: 0,
      },
    ],
  },
  {
    id: 6,
    question: "Urn",
    type: "select",
    options: [
      {
        label: "BTF Scattering Tube",
        value: "BTF Scattering Tube",
        priceAdjustment: 0,
      },
      {
        label: "BTF Adult Urn (+$100)",
        value: "BTF Adult Urn",
        priceAdjustment: 100,
      },
    ],
  },
  {
    id: 7,
    question: "Collection of Urn",
    type: "select",
    options: [
      {
        label: "Collect in Person",
        value: "Collect in Person",
        priceAdjustment: 0,
      },
      {
        label: "Australia Post Registered Mail (+$65)",
        value: "Australia Post Registered Mail",
        priceAdjustment: 65,
      },
    ],
  },
];

const landingCoffins = [
  {
    label: "Richmond Gloss Teak",
    value: "Richmond Gloss Teak",
    priceAdjustment: 0,
  },
  {
    label: "Richmond Gloss Red Cedar",
    value: "Richmond Gloss Red Cedar",
    priceAdjustment: 0,
  },
  {
    label: "Richmond Gloss Rosewood",
    value: "Richmond Gloss Rosewood",
    priceAdjustment: 0,
  },
  {
    label: "Richmond Gloss White",
    value: "Richmond Gloss White",
    priceAdjustment: 0,
  },
];

const AttendenceCrementionCom = ({
  setIsOpen,
  selections,
  setSelections,
  totalPrice,
}) => {
  useEffect(() => {
    sessionStorage.setItem("agreementDraft", JSON.stringify(selections));
  }, [setSelections]);
  const location = useLocation();
  const isAttendingLanding =
    location.pathname === "/attending-cremation-landing";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [water, setWater] = useState("Not Required");
  const [tissues, setTissues] = useState("Not Required");

  const navigate = useNavigate();

  const displayData = useMemo(() => {
    return attendenceData.map((item) => {
      if (item.question === "Coffin" && isAttendingLanding) {
        return { ...item, options: landingCoffins };
      }
      return item;
    });
  }, [isAttendingLanding, landingCoffins]);

  useEffect(() => {
    if (!isAttendingLanding) return;

    const allowed = landingCoffins.map((c) => c.value);
    const current = selections?.coffin?.value;

    if (!allowed.includes(current)) {
      setSelections((prev) => ({
        ...prev,
        coffin: { value: allowed[0], price: 0 },
      }));
    } else if (Number(selections?.coffin?.price) !== 0) {
      setSelections((prev) => ({
        ...prev,
        coffin: { value: prev.coffin.value, price: 0 },
      }));
    }
  }, [isAttendingLanding, landingCoffins, selections?.coffin?.value]);

  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      "Transfers from Place of Passing": "transferOption",
      Stationery: "stationery",
      "Body Preparation": "bodyPreparation",
      Coffin: "coffin",
      Flowers: "flowers",
      Urn: "urn",
      "Collection of Urn": "collectionOfUrn",
    };

    const key = categoryKeyMap[category];
    if (!key) return;

    const safePrice =
      isAttendingLanding && key === "coffin" ? 0 : Number(priceAdjustment) || 0;

    setSelections((prev) => ({
      ...prev,
      [key]: { value, price: safePrice },
    }));
  };

  useEffect(() => {
    if (!isAttendingLanding) return;

    // landing-only coffin options (values must match the options you show)
    const landingDefault = {
      value: "richmond-gloss-teak",
      price: 0,
    };

    setSelections((prev) => {
      // if already one of the landing values, don't override user choice
      const allowed = new Set([
        "richmond-gloss-teak",
        "richmond-gloss-red-cedar",
        "richmond-gloss-rosewood",
        "richmond-gloss-white",
      ]);

      if (allowed.has(prev?.coffin?.value)) return prev;

      return {
        ...prev,
        coffin: landingDefault,
      };
    });
  }, [isAttendingLanding]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectChange = (itemId, selectedValue) => {
    const item = displayData.find((d) => d.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find(
      (opt) => opt.value === selectedValue,
    );
    if (!selectedOption) return;

    const price =
      isAttendingLanding && item.question === "Coffin"
        ? 0
        : Number(selectedOption.priceAdjustment) || 0;

    handleOptionChange(item.question, selectedValue, price);
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white pb-2">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center mb-10 sm:mb-16 gap-8 md:gap-10">
          <div className="w-full md:max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center md:text-left font-display font-bold text-gray-900 mb-4 sm:mb-6">
              Attending Service Cremation
            </h1>
            <p className="text-body-light sm:text-body-light leading-relaxed text-left sm:text-justify">
              Black Tulip Funerals offers a respectful and simple farewell,
              allowing family and close friends to be present during the
              cremation service. It provides a meaningful opportunity to honor
              your loved one in a calm, dignified, and supportive setting.
            </p>
          </div>

          {/* PRICE */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-end text-center md:text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
              Price
            </span>
            <span className="text-5xl sm:text-6xl text-body-light font-bold text-gray-900">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="lg:col-span-8">
            <Card title="Included Variables">
              <div className="flex flex-col gap-3 sm:gap-2">
                {displayData.map((item) => {
                  // hide urn + collection on landing
                  if (
                    isAttendingLanding &&
                    (item.question === "Urn" ||
                      item.question === "Collection of Urn")
                  ) {
                    return null;
                  }

                  const categoryKeyMap = {
                    "Transfers from Place of Passing": "transferOption",
                    Stationery: "stationery",
                    "Body Preparation": "bodyPreparation",
                    Coffin: "coffin",
                    Flowers: "flowers",
                    Urn: "urn",
                    "Collection of Urn": "collectionOfUrn",
                  };

                  const key = categoryKeyMap[item.question] || item.question;
                  const currentValue = selections[key]?.value || "";

                  return (
                    <div key={item.id} className="flex flex-col gap-2">
                      <RowSelect
                        label={
                          item.question === "Stationery" ? (
                            <a
                              href="https://funeralstationery.com.au/"
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-primary"
                            >
                              Stationery
                            </a>
                          ) : item.question === "Coffin" ? (
                            <a
                              href="/coffins"
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-primary"
                            >
                              Coffin
                            </a>
                          ) : (
                            item.question
                          )
                        }
                        value={currentValue}
                        onChange={(e) =>
                          handleSelectChange(item.id, e.target.value)
                        }
                        options={item.options}
                        placeholder="Select an option"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card title="Options">
              <div className="flex flex-col gap-4">
                <RowSelect
                  label="Bottled Water 600ml"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  options={["Not Required", "10 Bottles", "20 Bottles"]}
                />
                <RowSelect
                  label="Personalised Tissue Packs"
                  value={tissues}
                  onChange={(e) => setTissues(e.target.value)}
                  options={["Not Required", "50 Packs", "100 Packs"]}
                />
              </div>
            </Card>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center">
          <div className="">
            <button className="btn-enquire" onClick={() => setIsOpen(true)}>
              <span className="">Make Agreement</span>
              <FaLongArrowAltRight />
            </button>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <TransferZonesBox />
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded text-center font-medium ${
              message.includes("Error")
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-green-50 text-green-600 border border-green-100"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendenceCrementionCom;
