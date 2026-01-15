import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { List, Select } from "../../components/common/Reusables";
import { useUser } from "../../components/hooks/useUser";
// import InvoicePDF from "./_components/InvoicePdf";
import RenderQuestion from "./_components/RenderQuestion";
import AdditionalInfoSection from "./service-component/AdditionalInfoSection";
import FloralGallerySection from "./service-component/FloralGallerySection";

// Reusable Card Component matching the design
// export function Card({ title, children, className = "" }) {

const CORE = import.meta.env.VITE_API_URL;

import { pdf } from "@react-pdf/renderer";
import { Actions } from "./_components/Actions";
export function Card({ title, children, className = "" }) {
  return (
    <div
      className={`bg-gray-50 rounded-xl p-8 border border-gray-100 ${className}`}
    >
      <h3 className="font-body font-bold uppercase text-2xl md:3xl text-gray-900 mb-6 tracking-wide">
        {title}
      </h3>
      {children}
    </div>
  );
}

const AttendenceCrementionPage = () => {
  const BASE_PRICE = 4899;
  const navigate = useNavigate();
  const { user } = useUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selections State

  const [amount, setAmount] = useState(0);

  const [message, setMessage] = useState("");

  const [selections, setSelections] = useState({
    stationery: { value: "", price: 0 },
    bodyPreparation: { value: "", price: 0 },
    coffin: { value: "", price: 0 },
    flowers: { value: "", price: 0 },
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });

  // Static Options State
  const [hearse, setHearse] = useState("No Hearse - Coffin in place");
  const [water, setWater] = useState("Not Required");
  const [tissues, setTissues] = useState("Not Required");

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const handleOptionChange = (index, value, priceImpact) => {
    const keys = ["stationery", "bodypreparation", "coffin", "flowers", "urn"][
      index
    ];

    const key = keys[index];

    setSelections((prev) => {
      const updated = { ...prev, [key]: { value, price: priceImpact } };
      const totalPriceImpact = Object.values(updated).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0
      );
      setTotalPrice(BASE_PRICE + totalPriceImpact);

      return updated;
    });
  };

  const geNext = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${CORE}/newattendingservicecremationanswers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selections,
          totalPriceImpact: Object.values(setSelections).reduce(
            (sum, opt) => sum + (opt.price || 0),
            0
          ),
        }),
      });

      if (!res.ok) {
        const text = await res.text();

        console.error("Server Error:", text);
        return;
      }

      const blob = await pdf(<InvoicePDF invoiceData={selections} />).toBlob();

      // 2. Convert blob to base64 for email attachment
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        // 3. Send to backend API
        const response = await fetch("http://localhost:4000/api/send-invoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...selections,
            pdfAttachment: base64data,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setMessage("Invoice sent successfully!");
          // Reset form if needed
          // setFormData({...initialState});
        } else {
          setMessage(`Error: ${result.error || "Failed to send invoice"}`);
        }
      };
      setLoading(false);
      navigate(`/${user._id}/deceasedpersondetails`);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setSelections({
        stationery: data[0].options[0]?.value || "No option selected",
        bodypreparation: data[1]?.options[0]?.value || "No option selected",
        coffin: data[2]?.options[0]?.value || "No opiton selected",
        flowers: data[3]?.options[0]?.value || "No option selected",
        urn: data[4]?.options[0]?.value || "No option selected",
        collectionOfUrn: data[5]?.options[0]?.value || "No option selected",
      });
    }
  }, [data]);

  // --- Fetch Options Data ---
  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const response = await fetch(`${CORE}/newattendingservicecremation`, {
          credentials: "include",
        });

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

  // --- Initialize Selections when Data Loads ---
  useEffect(() => {
    if (data.length > 0) {
      setSelections({
        stationery: {
          value: data[0]?.options[0]?.value || "",
          price: data[0]?.options[0]?.priceImpact || 0,
        },
        bodypreparation: {
          value: data[1]?.options[0]?.value || "",
          price: data[1]?.options[0]?.priceImpact || 0,
        },
        coffin: {
          value: data[2]?.options[0]?.value || "",
          price: data[2]?.options[0]?.priceImpact || 0,
        },
        flowers: {
          value: data[3]?.options[0]?.value || "",
          price: data[3]?.options[0]?.priceImpact || 0,
        },
        urn: {
          value: data[4]?.options[0]?.value || "",
          price: data[4]?.options[0]?.priceImpact || 0,
        },
        collectionOfUrn: {
          value: data[5]?.options[0]?.value || "",
          price: data[5]?.options[0]?.priceImpact || 0,
        },
      });
    }
  }, [data]);

  // --- Recalculate Total Price ---
  useEffect(() => {
    const variableTotal = Object.values(selections).reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );
    // Add logic here if Hearse/Water etc have prices
    setTotalPrice(BASE_PRICE + variableTotal);
  }, [selections]);

  // --- Handle Next Step ---
  const goNext = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...selections,
        options: { hearse, water, tissues },
        totalPrice,
      };

      const res = await fetch(
        "http://localhost:4000/newattendingservicecremationanswers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        console.error("Server Error");
        return;
      }

      // Navigate to next page
      navigate(`/${user?._id}/deceasedpersondetails`);
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
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-2xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
        {/* my */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 4. Included Variables (Dynamic) */}
          {/* Spanning 2 columns visually if needed, but keeping grid uniform for now */}
          <Card title="Included Variables" className="">
            <div className="space-y-1">
              {/* Ensure RenderQuestion renders a label and a select box styled simply.
                 Pass down props to handle updates.
               */}
              {data.map((item) => (
                <RenderQuestion
                  key={item.id}
                  item={item}
                  selections={selections}
                  setSelections={setSelections}
                  setTotalPrice={setTotalPrice} // Optional if handled in effect
                  BASE_PRICE={BASE_PRICE} // Optional
                />
              ))}
            </div>
          </Card>

          {/* 5. Options (Static) */}
          <Card title="Options" className="">
            <div className="space-y-1">
              <Select
                label="Hearse"
                value={hearse}
                onChange={(e) => setHearse(e.target.value)}
                options={[
                  "No Hearse - Coffin in place",
                  "Standard Hearse",
                  "Premium Hearse",
                ]}
              />
              <Select
                label="Bottled Water 600ml"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                options={["Not Required", "10 Bottles", "20 Bottles"]}
              />
              <Select
                label="Personalised Tissue Packs"
                value={tissues}
                onChange={(e) => setTissues(e.target.value)}
                options={["Not Required", "50 Packs", "100 Packs"]}
              />
            </div>
          </Card>
        </div>

        {/* --- ACTIONS FOOTER --- */}
        {message && (
          <div
            className={`message ${
              message.includes("Error") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}
        <Actions />
      </div>
      <FloralGallerySection />
      <AdditionalInfoSection />
    </div>
  );
};

export default AttendenceCrementionPage;
