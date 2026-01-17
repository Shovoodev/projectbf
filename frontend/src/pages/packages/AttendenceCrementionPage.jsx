/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { List } from "../../components/common/Reusables";
import { useServiceApi } from "../../utility/SelectedServiceProvider";
import { Actions } from "./_components/Actions";
import InvoicePDF from "./_components/InvoicePdf";
import { useServiceApi } from "../../utility/SelectedServiceProvider";

export function Card({ title, children }) {

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
      0
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
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
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
        <Card title="Included Variables">
          {attendenceData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-2 border-b last:border-none"
            >
              <label className="block text-sm font-medium text-gray-700">
                {item.question}
              </label>
              <select
                className="p-1 border rounded bg-gray-100 text-right w-48"
                onChange={(e) => handleSelectChange(item.id, e.target.value)}
                value={(() => {
                  const categoryKeyMap = {
                    Stationery: "stationery",
                    "Body Preparation": "bodyPreparation",
                    Coffin: "coffin",
                    "Flowers:": "flowers",
                    Urn: "urn",
                    "Collection of Urn": "collectionOfUrn",
                  };
                  const key = categoryKeyMap[item.question];
                  return selections[key]?.value || "";
                })()}
              >
                {item.options.map((option) => (
                  <option className="" key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </Card>
        <Card title="Options">
          <Select
            label="Hearse"
            value={hearse}
            onChange={setHearse}
            options={[
              "No Hearse - Coffin in place",
              "Standard Hearse",
              "Premium Hearse",
            ]}
          />

          <Select
            label="Bottled Water 600ml"
            value="Not Required"
            options={["Not Required"]}
          />
          <Select
            label="Personalised Tissue Packs"
            value="Not Required"
            options={["Not Required"]}
          />
        </Card>
      </div>
      <Actions goNext={geNext} totalPrice={amount} />
      {message && (
        <div
          className={`p-4 mb-4 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AttendenceCrementionPage;
