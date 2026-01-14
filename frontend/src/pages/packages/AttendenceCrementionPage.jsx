import { useEffect, useState } from "react";
import { List, Select } from "../../components/common/Reusables";
import { Actions } from "./_components/Actions";
import InvoicePDF from "./_components/InvoicePdf";
import { useServiceApi } from "../../utility/SelectedServiceProvider";

export function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold uppercase text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

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
  const [hearse, setHearse] = useState("");

  useEffect(() => {
    const totalPriceImpact = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );
    setTotalPrice(BASE_PRICE + totalPriceImpact);
    setAmount(BASE_PRICE + totalPriceImpact);
  }, [selections]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" mx-20">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-10">
        <div>
          <h1 className="font-serif text-4xl mb-4">
            Attending Service Cremation
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Black Tulip Funerals offers a respectful and simple farewell,
            allowing family and close friends to be present during the cremation
            service. It provides a meaningful opportunity to honor your loved
            one in a calm, dignified, and supportive setting.
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg px-8 py-6 text-center sticky top-6">
          <div className="text-sm text-gray-500">Price</div>
          <div className="text-4xl font-bold">${totalPrice}</div>
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
