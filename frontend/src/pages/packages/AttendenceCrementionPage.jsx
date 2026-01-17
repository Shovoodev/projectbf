/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { List, Select } from "../../components/common/Reusables";
import { Actions } from "./_components/Actions";
import { useServiceApi } from "../../utility/SelectedServiceProvider";

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
    amount,
    setAmount,
    message,
    geNext,
    setTotalPrice,
    totalPrice,
    handleSelectChange,
    BASE_PRICE,
    attendenceData,
  } = useServiceApi();

  // Static Options State
  const [hearse, setHearse] = useState("No Hearse - Coffin in place");
  const [water, setWater] = useState("Not Required");
  const [tissues, setTissues] = useState("Not Required");

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
                label="Hearse"
                value={hearse}
                onChange={(e) => setHearse(e.target.value)}
                options={[
                  "No Hearse - Coffin in place",
                  "Standard Hearse",
                  "Premium Hearse",
                ]}
              />
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
        <Actions goNext={geNext} totalPrice={amount} />

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
