import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { List, Select } from "../../components/common/Reusables";
import { Actions } from "./_components/Actions";
import InvoicePDF from "./_components/InvoicePdf";
import RenderQuestion from "./_components/RenderQuestion";
import { useUser } from "../../components/hooks/useUser";

const CORE = import.meta.env.VITE_API_URL;

import { pdf } from "@react-pdf/renderer";
export function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold uppercase text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

const AttendenceCrementionPage = () => {
  const BASE_PRICE = 4400;

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [selections, setSelections] = useState({
    stationery: { value: "", price: 0 },
    bodyPreparation: { value: "", price: 0 },
    coffin: { value: "", price: 0 },
    flowers: { value: "", price: 0 },
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });

  const [hearse, setHearse] = useState();
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
  useEffect(() => {
    const totalPriceImpact = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );

    const price = setTotalPrice(BASE_PRICE + totalPriceImpact);
    setAmount(price);
  }, [selections]);

  console.log(data);
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

  // const geNext = async (e) => {
  //   e.preventDefault();

  //   try {
  //     navigate(
  //       `/register?stationery=${selections.stationery}&bodypreparation=${selections.bodypreparation}&coffin=${selections.coffin}&flowers=${selections.flowers}&urn=${selections.urn}&collectionOfUrn=${selections.collectionOfUrn}`
  //     );
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //   }
  // };

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
        ok
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
          {data.map((item) => (
            <RenderQuestion
              key={item.id}
              item={item}
              selections={selections}
              setSelections={setSelections}
              setTotalPrice={setTotalPrice}
              BASE_PRICE={BASE_PRICE}
            />
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
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AttendenceCrementionPage;
