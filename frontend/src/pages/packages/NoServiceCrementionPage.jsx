import { useEffect } from "react";
import { List } from "../../components/common/Reusables";
import { useServiceApi } from "../../utility/SelectedServiceProvider";
import { useNavigate } from "react-router-dom";
import PopupEnquirey from "./_components/PopupEnquirey";

const CORE = import.meta.env.VITE_API_URL;
// Card Component matching the design (Light Gray Background)
export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-gray-50 rounded-xl p-8 border border-gray-100 ${className}`}
    >
      <h3 className="font-display font-bold uppercase text-2xl text-gray-900 mb-6 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}
const noServiceFunralData = [
  {
    id: 5,
    question: "Urn",
    type: "select",
    options: [
      {
        label: "BTF Preferred Adult Urn",
        value: "BTF Preferred Adult Urn",
        priceAdjustment: 0,
      },
      {
        label: "BTF Preferred Scattering Tube",
        value: "BTF Preferred Scattering Tube",
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
const NoServiceCrementionPage = () => {
  const {
    loading,
    error,
    setTotalPrice,
    totalPrice,
    setSelections,
    selections,
    setAmount,
    setTransferPrice,
    setTransferOption,
    transferPrice,
    openPopup,
    activePopup,
    closePopup,
  } = useServiceApi();
  const BASE_PRICE = 2290;
  // Transfer Dropdown State
  const navigate = useNavigate();

  useEffect(() => {
    if (noServiceFunralData.length > 0) {
      setSelections({
        urn: {
          value: noServiceFunralData[0]?.options[0]?.value || "",
          price: noServiceFunralData[0]?.options[0]?.priceImpact || 0,
        },
        collectionOfUrn: {
          value: noServiceFunralData[1]?.options[0]?.value || "",
          price: noServiceFunralData[1]?.options[0]?.priceImpact || 0,
        },
        transferOption: {
          value: noServiceFunralData[2]?.options[0]?.value || "",
          price: noServiceFunralData[2]?.options[0]?.priceImpact || 0,
        },
      });
    }
  }, [noServiceFunralData]);

  // --- Calculate Total Price ---
  useEffect(() => {
    const variableTotal = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0,
    );
    // Base + Variables + Transfer Cost
    setTotalPrice(BASE_PRICE + variableTotal + Number(transferPrice));
  }, [selections, transferPrice]);
  const handlePress = () => {
    try {
      navigate(`/prepay`);
    } catch (error) {
      console.log(error);
    }
  };

  // --- Handle Transfer Change ---
  const handleTransferChange = (e) => {
    const price = Number(e.target.value);
    const index = e.target.selectedIndex;
    const label = e.target.options[index].text;
    console.log("target", e.target.selectedIndex);
    setTransferPrice(price);
    setTransferOption(label);
  };

  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      transferOption: "Sydney Metro",
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
    const item = noServiceFunralData.find((data) => data.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find(
      (opt) => opt.value === selectedValue,
    );
    if (!selectedOption) return;

    // Make sure priceAdjustment is being used
    const price = selectedOption.priceAdjustment || 0;

    handleOptionChange(item.question, selectedValue, price);
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="section-container max-w-7xl mx-auto px-6 py-16">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              No Service Cremation
            </h1>
            <p className="text-gray-600 font-body text-base leading-relaxed text-justify">
              Black Tulip Funerals is a simple and unattended cremation option,
              with no formal service or viewing. It offers a dignified,
              straightforward farewell while allowing families to arrange a
              memorial or remembrance at a later time.
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center min-w-[200px]">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
              Price
            </span>
            <span className="text-5xl font-body font-bold text-gray-900">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* --- GRID CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 1. Required Services */}
          <Card
            title="Required Services"
            className="flex flex-col justify-between"
          >
            <List
              items={[
                "Phone or Zoom Consultation",
                "Administration Fees",
                "Registration of Death",
                "Cremation Fee",
              ]}
            />

            {/* Transfers Dropdown (Styled to match list) */}
            <div className=" flex flex-row items-center justify-between gap-4">
              <span className="flex items-center gap-3 text-gray-700 text-lg">
                • Transfers from Place of Passing
              </span>

              <select
                onChange={handleTransferChange}
                className="p-2  rounded bg-gray-100 text-left w-1/3"
              >
                <option value="0">Sydney Metro</option>
                <option value="220">Zone 2 (+ $220)</option>
                <option value="385">Zone 3 (+ $385)</option>
              </select>
            </div>
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

          {/* 3. Included Variables (Full Width) */}
          <div className="md:col-span-2">
            <Card title="Included Variables">
              <div className="space-y-4">
                {noServiceFunralData.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm py-2 border-b last:border-none"
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {item.question}
                    </label>
                    <select
                      className="p-1 border rounded bg-gray-100 text-right w-48"
                      onChange={(e) =>
                        handleSelectChange(item.id, e.target.value)
                      }
                      value={(() => {
                        const categoryKeyMap = {
                          Urn: "urn",
                          "Collection of Urn": "collectionOfUrn",
                        };
                        const key = categoryKeyMap[item.question];
                        return selections[key]?.value || "";
                      })()}
                    >
                      {item.options.map((option) => (
                        <option
                          className=""
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* --- ACTIONS FOOTER --- */}
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
            path="new-view-and-service-cremation"
            title="Register to complete your aggrement"
            subtitle="Register to save your selections and complete the process"
            onSuccess={(userData) => {
              console.log("User registered:", userData);
              closePopup();
              navigate("/fill-agreement-form");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoServiceCrementionPage;
