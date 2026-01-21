import { useEffect, useState } from "react";
import { List, Select } from "../../components/common/Reusables";
import { useServiceApi } from "../../utility/SelectedServiceProvider";
import { useNavigate } from "react-router-dom";
import PopupEnquirey from "./_components/PopupEnquirey";

// --- Reusable Card Component ---
export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-gray-50 rounded-xl p-8 border border-gray-100 h-full ${className}`}
    >
      <h3 className="font-display font-bold uppercase text-sm md:text-base text-gray-900 mb-6 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}
const attendenceData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
        label: "Contract- Red Stain (Included)",
        value: "contract-red-stain",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Contract- Brown Stain (Included)",
        value: "contract-brown-stain",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Basic - Deluxe Teak (Included)",
        value: "basic-deluxe-teak",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Basic - Country Oak (Included)",
        value: "basic-country-oak",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Basic - Teak (Included)",
        value: "basic-teak",
        priceAdjustment: 0,
        includedInBase: true,
      },
      {
        label: "Basic - Sapelle (Included)",
        value: "basic-sapelle",
        priceAdjustment: 0,
        includedInBase: true,
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
        label: "Blaxland - White + $576.35",
        value: "blaxland-white",
        priceAdjustment: 576.35,
      },
      {
        label: "Wicker + $1092.92",
        value: "wicker",
        priceAdjustment: 1092.92,
      },
      {
        label: "Calvary - walnut + $1,205.05",
        value: "calvary-walnut",
        priceAdjustment: 1205.05,
      },
      {
        label: "Calvary - Rosewood + $1,205.05",
        value: "calvary-rosewood",
        priceAdjustment: 1205.05,
      },
      {
        label: "Wentworth - Walnut + $1218.75",
        value: "wentworth-walnut",
        priceAdjustment: 1218.75,
      },
      {
        label: "Wentworth – Rosewood + $1,218.75",
        value: "wentworth-rosewood",
        priceAdjustment: 1218.75,
      },
      {
        label: "Portland – Creme Pearl Metallic + $1,534.55",
        value: "portland-creme-pearl",
        priceAdjustment: 1534.55,
      },
      {
        label: "Portland – White + $1,384.72",
        value: "portland-white",
        priceAdjustment: 1384.72,
      },
      {
        label: "Creswick – Deluxe Teak + $1,423.75",
        value: "creswick-deluxe-teak",
        priceAdjustment: 1423.75,
      },
      {
        label: "Denman – Rosewood + $1,659.60",
        value: "denman-rosewood",
        priceAdjustment: 1659.6,
      },
      {
        label: "Denman – Rose Mahogany + $1,659.60",
        value: "denman-rose-mahogany",
        priceAdjustment: 1659.6,
      },
      {
        label: "Goldline – Light Oak + $1,687.85",
        value: "goldline-light-oak",
        priceAdjustment: 1687.85,
      },
      {
        label: "Dome Regal – Rosewood + $1,756.45",
        value: "dome-regal-rosewood",
        priceAdjustment: 1756.45,
      },
      {
        label: "Enviro – Raw Pine + $1,327.95",
        value: "enviro-raw-pine",
        priceAdjustment: 1327.95,
      },
      {
        label: "White Rose – Clear + $2,022.89",
        value: "white-rose-clear",
        priceAdjustment: 2022.89,
      },
      {
        label: "White Rose – Limewash + $2,022.89",
        value: "white-rose-limewash",
        priceAdjustment: 2022.89,
      },
      {
        label: "White Rose – White + $2,022.89",
        value: "white-rose-white",
        priceAdjustment: 2022.89,
      },
      {
        label: "Dome Regal Deluxe + $1,869.94",
        value: "dome-regal-deluxe",
        priceAdjustment: 1869.94,
      },
      {
        label: "Brentwood – Cedar + $2,079.96",
        value: "brentwood-cedar",
        priceAdjustment: 2079.96,
      },
      {
        label: "Brentwood – Rosewood + $2,079.96",
        value: "brentwood-rosewood",
        priceAdjustment: 2079.96,
      },
      {
        label: "Denman Cedar – Cedar + $2,475.96",
        value: "denman-cedar-cedar",
        priceAdjustment: 2475.96,
      },
    ],
  },
  {
    id: 4,
    question: "Flowers:",
    type: "select",
    options: [
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
    id: 5,
    question: "Urn",
    type: "select",
    options: [
      {
        label: "Funera Preferred Adult Urn",
        value: "Funera Preferred Adult Urn",
        priceAdjustment: 0,
      },
      {
        label: "Funera Preferred Scattering Tube",
        value: "Funera Preferred Scattering Tube",
        priceAdjustment: 0,
      },
    ],
  },
  {
    id: 6,
    question: "Collection of Urn",
    type: "select",
    options: [
      {
        label: "Collect in Person",
        value: "Collect in Person",
        priceAdjustment: 0,
      },
      {
        label: "Australia Post Registered Mail",
        value: "Australia Post Registered Mail",
        priceAdjustment: 0,
      },
    ],
  },
];

// --- Reusable Row Select Component ---
const RowSelect = ({ label, value, onChange, options, placeholder }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-b border-gray-200/60 last:border-0 pb-4 last:pb-0">
    <label className="font-body font-medium text-gray-700 text-sm">
      {label}:
    </label>
    <select
      value={value}
      onChange={onChange}
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
  </div>
);

const AttendenceCrementionPage = () => {
  const {
    selections,
    loading,
    error,
    openPopup,
    activePopup,
    closePopup,
    setAmount,
    message,
    setTotalPrice,
    totalPrice,
    BASE_PRICE,
    setSelections,
  } = useServiceApi();

  // Static Options State
  const [water, setWater] = useState("Not Required");
  const [tissues, setTissues] = useState("Not Required");
  const navigate = useNavigate();
  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      Stationery: "stationery",
      "Body Preparation": "bodyPreparation",
      Coffin: "coffin",
      "Flowers:": "flowers",
      Urn: "urn",
      "Collection of Urn": "collectionOfUrn",
    };

    const key = categoryKeyMap[category];

    setSelections((prev) => {
      const updated = { ...prev, [key]: { value, price: priceAdjustment } };

      // Calculate total price impact
      const totalPriceImpact = Object.values(updated).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0,
      );

      setTotalPrice(BASE_PRICE + totalPriceImpact);
      setAmount(BASE_PRICE + totalPriceImpact);

      return updated;
    });
  };

  const handleSelectChange = (itemId, selectedValue) => {
    const item = attendenceData.find((data) => data.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find(
      (opt) => opt.value === selectedValue,
    );
    if (!selectedOption) return;

    // Make sure priceAdjustment is being used
    const price = selectedOption.priceAdjustment || 0;

    handleOptionChange(item.question, selectedValue, price);
  };
  // Recalculate price when selections change
  useEffect(() => {
    const totalPriceImpact = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0,
    );
    // Add any static option costs here if needed
    const finalTotal = BASE_PRICE + totalPriceImpact;

    setTotalPrice(finalTotal);
    setAmount(finalTotal);
  }, [selections, BASE_PRICE, setTotalPrice, setAmount]);

  const handlePress = () => {
    try {
      navigate(`/prepay`);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="section-container max-w-7xl mx-auto px-6 py-16">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Attending Service Cremation
            </h1>
            <p className="text-gray-600 font-body text-base leading-relaxed text-justify">
              Black Tulip Funerals offers a respectful and simple farewell,
              allowing family and close friends to be present during the
              cremation service. It provides a meaningful opportunity to honor
              your loved one in a calm, dignified, and supportive setting.
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center min-w-[220px] self-start">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
              Price
            </span>
            <span className="text-6xl font-body font-bold text-gray-900">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* --- TOP ROW: 3 COLUMNS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 1. Required Services */}
          <Card title="Required Services">
            <List
              items={[
                "Phone or Zoom Consultation",
                "Administration Fees",
                "Registration of Death",
                "Celebrant or Host",
                "Cremation Fee",
                "Transfers from Place of Passing (Sydney Metro 24/7)",
              ]}
            />
          </Card>

          {/* 2. Disbursements */}
          <Card title="Disbursements">
            <List
              items={[
                "Medical Referee Certificate",
                "Cremation Risk Advice",
                "NSW Government Services Levy",
                "Official Death Certificate Issued by BDM",
              ]}
            />
          </Card>

          {/* 3. Included Services */}
          <Card title="Included Services">
            <List
              items={[
                "Live Video Streaming",
                "SMS Photo Invitation",
                "Photo Slideshow",
                "Photo for Screens in Chapel",
              ]}
            />
          </Card>
        </div>

        {/* --- BOTTOM ROW: 2 COLUMNS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Included Variables (Dynamic) */}
          <Card title="Included Variables">
            <div className="flex flex-col gap-4">
              {attendenceData.map((item) => {
                // Determine current value based on your mapping logic
                const categoryKeyMap = {
                  "Funeral Stationery": "stationery", // Fixed typo in key map if needed
                  Stationery: "stationery",
                  "Body Preparation": "bodyPreparation",
                  Coffin: "coffin",
                  Flowers: "flowers", // Removed colon for safer matching
                  "Flowers:": "flowers",
                  Urn: "urn",
                  "Collection of Urn": "collectionOfUrn",
                };
                const key = categoryKeyMap[item.question] || item.question; // Fallback
                const currentValue = selections[key]?.value || "";

                return (
                  <RowSelect
                    key={item.id}
                    label={item.question}
                    value={currentValue}
                    onChange={(e) =>
                      handleSelectChange(item.id, e.target.value)
                    }
                    options={item.options}
                    placeholder="Select an option"
                  />
                );
              })}
            </div>
          </Card>

          {/* Right: Options (Static) */}
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

        {/* --- ACTIONS --- */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
          {/* Make Agreement button */}
          <div>
            <button
              className="btn-primary normal"
              onClick={() => openPopup("agreement")}
            >
              Make Agreement Now
            </button>
          </div>

          {/* Enquiry button */}
          <div>
            <button
              className="btn-primary normal"
              onClick={() => navigate("/contact")}
            >
              Enquire Now
            </button>
          </div>

          {/* PrePay button */}
          <button className="btn-primary normal" onClick={handlePress}>
            Prepay
          </button>
          {/* Agreement Popup */}
          <PopupEnquirey
            isOpen={activePopup === "agreement"}
            onClose={closePopup}
            // mode={() => (activePopup ? "registartion" : "login")}
            mode="registration"
            path="newattendingservicecremationanswers"
            title="Register to complete your aggrement"
            subtitle="Register to save your selections and complete the process"
            onSuccess={(userData) => {
              console.log("User registered:", userData);
              closePopup();
              navigate("/fill-agreement-form");
            }}
          />
        </div>

        {/* Message Display */}
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

export default AttendenceCrementionPage;
