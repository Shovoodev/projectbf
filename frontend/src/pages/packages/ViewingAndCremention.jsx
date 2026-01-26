/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { List } from "../../components/common/Reusables";
import PopupEnquirey from "./_components/PopupEnquirey";
import { useNavigate } from "react-router-dom";
import RowSelect from "./_components/RowSelect";
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
export const viewingAndCremention = [
  {
    id: 1,
    question: "Transfers from Place of Passing",
    type: "select",
    options: [
      {
        label: "Sydney Metro",
        value: "Sydney Metro",
        priceAdjustment: 0,
      },
      {
        label: "Zone 2 (+ $220)",
        value: "Zone 2 (+ $220)",
        priceAdjustment: 220,
      },
      {
        label: "Zone 3 (+ $385)",
        value: "Zone 3 (+ $385",
        priceAdjustment: 385,
      },
    ],
  },
  {

    id: 2,
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
    id: 3,
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

const ViewingAndCrementionPage = () => {

  const BASE_PRICE = 3599;

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    transformOption: { value: "", price: 0 },
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  //   const { user } = useUserFront();
  const [message, setMessage] = useState("");
  // --- Calculate Total Price ---
  const [activePopup, setActivePopup] = useState(null);
  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };
  useEffect(() => {
    const variableTotal = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );
    // Base + Variables + Transfer Cost
    setTotalPrice(BASE_PRICE + variableTotal);
  }, [selections]);



  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;


  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      "Transfers from Place of Passing": "transferOption",
      Urn: "urn",
      "Collection of Urn": "collectionOfUrn",
    };

    const key = categoryKeyMap[category];

    setSelections((prev) => {
      const updated = { ...prev, [key]: { value, price: priceAdjustment } };

      // Calculate total price impact
      const totalPriceImpact = Object.values(updated).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0
      );

      setTotalPrice(BASE_PRICE + totalPriceImpact);
      setAmount(BASE_PRICE + totalPriceImpact);

      return updated;
    });
  }
  const handleSelectChange = (itemId, selectedValue) => {
    const item = viewingAndCremention.find((data) => data.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find(
      (opt) => opt.value === selectedValue
    );
    if (!selectedOption) return;

    // Make sure priceAdjustment is being used
    const price = selectedOption.priceAdjustment || 0;

    handleOptionChange(item.question, selectedValue, price);
  };


  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setTimeout(() => {
        navigate("/fill-agreement-form", {
          state: {
            selections,
            path: "new-view-and-service-cremation",
          },
        });
      }, 1000);

    } catch (err) {
      setMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };



  const handlePrepaySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      // Register
      const registerRes = await fetch(`${CORE}/blacktulipauth/guest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!registerRes.ok) {
        const err = await registerRes.json();
        throw new Error(err.message || "Registration failed");
      }

      // Save selections
      await fetch(`${CORE}/newattendingservicecremationanswers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
        credentials: "include",
      });
      setTimeout(() => {
        navigate(`/prepay`);
      }, 1500);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="section-container  mx-auto px-6 py-16">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Viewing & Cremation
            </h1>
            <p className="text-gray-600 font-body text-base leading-relaxed text-justify">
              Black Tulip Funerals provides families with the opportunity to
              spend private time viewing their loved one before a dignified
              cremation service. This option allows for a personal and
              respectful farewell in a calm, supportive environment.
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
                "Celebrant or Host",
                "Cremation Fee",
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

          {/* 3. Included Variables (Full Width) */}
          <div className="md:col-span-2">
            <Card title="Included Variables">
              <div className="flex flex-col gap-2">
                {viewingAndCremention.map((item) => {
                  const categoryKeyMap = {
                    "Transfers from Place of Passing": "transferOption",
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
          </div>
        </div>

        {/* --- ACTIONS FOOTER --- */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
          {/* Make Agreement button */}
          <div>
            <button
              className="btn-primary normal"
              onClick={handleRegistrationSubmit}
            >
              Make Agreement Now
            </button>
          </div>

          {/* Enquiry button */}
          <div>
            <button
              className="btn-primary normal"
              onClick={() => openPopup("enquirey")}
            >
              Enquire Now
            </button>
            <PopupEnquirey
              isOpen={activePopup === "enquirey"}
              onClose={closePopup}
              mode="enquirey"
              mainTitle="Please tell us what you whant to know about us"
              description="We'll get back to you shortly"
              title="Make an Enquiry"
              subtitle="We'll get back to you shortly"
              onSuccess={(userData) => {
                console.log("Enquiry submitted:", userData);
                closePopup();
                // Handle enquiry submission
              }}
            />
          </div>

          {/* PrePay button */}
          <button className="btn-primary normal" onClick={handlePrepaySubmit}>
            Prepay
          </button>

        </div>
      </div>
    </div>
  );
};

export default ViewingAndCrementionPage;
