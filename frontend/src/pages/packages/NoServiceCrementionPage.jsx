import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "../../components/common/Reusables";
import { showToast } from "../../utility/toast";
import PopupEnquirey from "./_components/PopupEnquirey";
import RowSelect from "./_components/RowSelect";
import TransferZonesBox from "./_components/TransferZonesBox";

// Card Component matching the design (Light Gray Background)
export function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-gray-50 rounded-xl p-8 border border-gray-100 ${className}`}>
      <h3 className="font-display font-lato font-bold uppercase text-2xl text-gray-900 mb-6 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

const noServiceFunralData = [
  {
    id: 1,
    question: "Transfers from Place of Passing",
    type: "select",
    options: [
      { label: "Sydney Metro", value: "Sydney Metro", priceAdjustment: 0 },
      {
        label: "Zone 2 (+ $220)",
        value: "Zone 2 (+ $220)",
        priceAdjustment: 220,

      },
      {
        label: "Zone 3 (+ $385)",
        value: "Zone 3 (+ $385)",
        priceAdjustment: 385,

      },
    ],
  },
  {
    id: 2,
    question: "Urn",
    type: "select",
    options: [
      { label: "BTF Scattering Tube", value: "BTF Scattering Tube", priceAdjustment: 0 },
      { label: "BTF Adult Urn (+$100)", value: "BTF Adult Urn", priceAdjustment: 100 },
    ],
  },
  {
    id: 3,
    question: "Collection of Urn",
    type: "select",
    options: [
      { label: "Collect in Person", value: "Collect in Person", priceAdjustment: 0 },
      { label: "Australia Post Registered Mail (+$65)", value: "Australia Post Registered Mail", priceAdjustment: 65 },
    ],
  },
];

const NoServiceCrementionPage = () => {
  const BASE_PRICE = 2295;

  const [selections, setSelections] = useState({
    transferOption: { value: "Sydney Metro", price: 0 },
    urn: { value: "BTF Scattering Tube", price: 0 },
    collectionOfUrn: { value: "Collect in Person", price: 0 },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  const [activePopup, setActivePopup] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {

    const extras = Object.values(selections || {}).reduce(
      (sum, opt) => sum + Number(opt?.price || 0),
      0
    );
    setTotalPrice(BASE_PRICE + extras);
  }, [selections, BASE_PRICE]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  const openPopup = (popupType) => setActivePopup(popupType);
  const closePopup = () => setActivePopup(null);

  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      "Transfers from Place of Passing": "transferOption",
      Urn: "urn",
      "Collection of Urn": "collectionOfUrn",
    };

    const key = categoryKeyMap[category];
    if (!key) return; // ✅ guard

    setSelections((prev) => ({
      ...prev,
      [key]: { value, price: Number(priceAdjustment) || 0 },
    }));
  };

  const handleSelectChange = (itemId, selectedValue) => {
    const item = noServiceFunralData.find((data) => data.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find((opt) => opt.value === selectedValue);
    if (!selectedOption) return;

    const price = Number(selectedOption.priceAdjustment) || 0;
    handleOptionChange(item.question, selectedValue, price);

    // ✅ Transfer nested zone places
    if (itemId === 1) {

      setSelections((prev) => ({
        ...prev,
        transferZonePlace: { value: "", price: 0 },
      }));
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        navigate("/fill-agreement-form", {
          state: { selections, path: "new-no-service-cremation" },
        });
      }, 1000);
    } catch (err) {
      setMessage(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePrepaySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(() => {
        showToast.info("Getting PrePay document Ready for your Selections", {
          duration: 3000,
          options: { position: "bottom-right" },
        });

        navigate("/prepay", {
          state: {
            selections,
            path: "new-no-service-cremation",
            totalPrice,
          },
        });
      }, 100);
    } catch (err) {
      setMessage(err?.message || "Something went wrong");
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen pb-10">
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
          <Card title="Required Services" className="flex flex-col justify-between">
            <List
              items={[
                "Phone or Zoom Consultation",
                "Administration Fees",
                "Registration of Death",
                "Cremation Fee",
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

          <div className="md:col-span-2">
            <Card title="Included Variables">
              <div className="flex flex-col gap-2">
                {noServiceFunralData.map((item) => {
                  const categoryKeyMap = {
                    "Transfers from Place of Passing": "transferOption",
                    Urn: "urn",
                    "Collection of Urn": "collectionOfUrn",
                  };

                  const key = categoryKeyMap[item.question] || item.question;
                  const currentValue = selections[key]?.value || "";
                  return (
                    <div key={item.id} className="flex flex-col gap-2">
                      <RowSelect
                        label={item.question}
                        value={currentValue}
                        onChange={(e) => handleSelectChange(item.id, e.target.value)}
                        options={item.options}
                        placeholder="Select an option"
                      />


                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* --- ACTIONS FOOTER --- */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 pb-10">
          <button className="btn-primary normal" onClick={handleRegistrationSubmit}>
            Make Agreement Now
          </button>

          <button className="btn-primary normal" onClick={() => openPopup("enquirey")}>
            Enquire Now
          </button>

          <button className="btn-primary normal" onClick={handlePrepaySubmit}>
            Prepay
          </button>

          <PopupEnquirey
            isOpen={activePopup === "enquirey"}
            onClose={closePopup}
            mode="enquirey"
            mainTitle="Please tell us what you whant to know about us"
            description="We'll get back to you shortly"
            title="Make an Enquiry"
            subtitle="We'll get back to you shortly"
            onSuccess={() => {
              closePopup();
            }}
          />
        </div>
        <div className="mt-10">
          <TransferZonesBox />
        </div>

        {message && (
          <div className="mt-6 p-4 rounded text-center font-medium bg-red-50 text-red-600 border border-red-100">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoServiceCrementionPage;
