import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { List } from "../../components/common/Reusables";
import { useUser } from "../../components/hooks/useUser";
import { Actions } from "./_components/Actions";
import RenderQuestion from "./_components/RenderQuestion";

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

const ViewingAndCrementionPage = () => {
  const BASE_PRICE = 3599;
  const navigate = useNavigate();
  const { user } = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variable Selections
  const [selections, setSelections] = useState({
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });

  // Transfer Dropdown State
  const [transferPrice, setTransferPrice] = useState(0);
  const [transferOption, setTransferOption] = useState("Sydney Metro");

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/noservicefunraldata",
          { credentials: "include" },
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStepData();
  }, []);

  // --- Initialize Selections ---
  useEffect(() => {
    if (data.length > 0) {
      setSelections({
        urn: {
          value: data[0]?.options[0]?.value || "",
          price: data[0]?.options[0]?.priceImpact || 0,
        },
        collectionOfUrn: {
          value: data[1]?.options[0]?.value || "",
          price: data[1]?.options[0]?.priceImpact || 0,
        },
      });
    }
  }, [data]);

  // --- Calculate Total Price ---
  useEffect(() => {
    const variableTotal = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0,
    );
    // Base + Variables + Transfer Cost
    setTotalPrice(BASE_PRICE + variableTotal + Number(transferPrice));
  }, [selections, transferPrice]);

  // --- Handle Transfer Change ---
  const handleTransferChange = (e) => {
    const price = Number(e.target.value);
    const index = e.target.selectedIndex;
    const label = e.target.options[index].text;
    console.log("target", e.target.selectedIndex);
    setTransferPrice(price);
    setTransferOption(label);
  };

  // --- Submit ---
  const goNext = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...selections,
        transfer: { option: transferOption, price: transferPrice },
        totalPrice,
      };

      // Navigate with data (or save to context/DB first)
      console.log("Submitting:", payload);
      navigate(`/register`); // Add params if needed
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (error)
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;

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
                {data.map((item) => (
                  <RenderQuestion
                    key={item.id}
                    item={item}
                    selections={selections}
                    setSelections={setSelections}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* --- ACTIONS FOOTER --- */}
        <Actions goNext={goNext} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default ViewingAndCrementionPage;
