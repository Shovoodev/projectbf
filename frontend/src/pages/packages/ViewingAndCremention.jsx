import React, { useEffect, useState } from "react";
import { Actions } from "./_components/Actions";
import CORE, { List, Select } from "../../components/common/Reusables";
import { useNavigate } from "react-router";

import RenderQuestion from "./_components/RenderQuestion";

export function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold uppercase text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}

const ViewingAndCrementionPage = () => {
  const BASE_PRICE = 3499;

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selections, setSelections] = useState({
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/noservicefunraldata",
          { credentials: "include" }
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
  useEffect(() => {
    const totalPriceImpact = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );

    setTotalPrice(BASE_PRICE + totalPriceImpact);
  }, [selections]);

  console.log(data);
  useEffect(() => {
    if (data.length > 0) {
      setSelections({
        urn: data[0]?.options[0]?.value || "No option selected",
        collectionOfUrn: data[1]?.options[0]?.value || "No option selected",
      });
    }
  }, [data]);

  const geNext = async (e) => {
    e.preventDefault();

    try {
      navigate(
        `/register?=${selections.urn}&collectionOfUrn=${selections.collectionOfUrn}`
      );
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" mx-20">
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start mb-10">
        <div>
          <h1 className="font-serif text-4xl mb-4">Viewing and Cremention</h1>
          <p className="text-gray-600 max-w-2xl">
            Black tulip Funerals probides families with the opportunity to spend
            time viewing their loved one before a diginified cremation service .
            This option allows for a personal and respectful farewell in a calm
            , supportive enviorment.
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
      </div>
      <Actions goNext={geNext} />
    </div>
  );
};

export default ViewingAndCrementionPage;
