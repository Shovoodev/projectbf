/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from "react";
const SelectedServiceProviderContext = createContext();
const CORE = import.meta.env.VITE_API_URL;

export const SelectedServiceProvider = ({ children }) => {
  const BASE_PRICE = 4400;
  const attendenceData = [
    {
      id: 1,
      question: "Stationery",
      type: "select",
      options: [
        {
          label: "50 Memoriam Cards",
          value: "50-memoriam-cards",
          priceAdjustment: 0,
        },
        {
          label: "100 Memoriam Cards + $60",
          value: "100-memoriam-cards",
          priceAdjustment: 60,
        },
        {
          label: "150 Memoriam Cards + $120",
          value: "150-memoriam-cards",
          priceAdjustment: 120,
        },
        {
          label: "200 Memoriam Cards + $180",
          value: "200-memoriam-cards",
          priceAdjustment: 180,
        },
        {
          label: "50 Bookmarks + $60",
          value: "50-bookmarks",
          priceAdjustment: 60,
        },
        {
          label: "100 Bookmarks + $120",
          value: "100-bookmarks",
          priceAdjustment: 120,
        },
        {
          label: "150 Bookmarks + $180",
          value: "150-bookmarks",
          priceAdjustment: 180,
        },
        {
          label: "200 Bookmarks + $240",
          value: "200-bookmarks",
          priceAdjustment: 240,
        },
        {
          label: "50 Order of Service Booklets + $120",
          value: "50-booklets",
          priceAdjustment: 120,
        },
        {
          label: "100 Order of Service Booklets + $180",
          value: "100-booklets",
          priceAdjustment: 180,
        },
        {
          label: "150 Order of Service Booklets + $240",
          value: "150-booklets",
          priceAdjustment: 240,
        },
        {
          label: "200 Order of Service Booklets + $300",
          value: "200-booklets",
          priceAdjustment: 300,
        },
      ],
    },
    {
      id: 2,
      question: "Body Preparation",
      type: "select",
      options: [
        {
          label: "General Wash | Dress | Makeup",
          priceAdjustment: 0,
          value: "General Wash | Dress | Makeup",
          includedInBase: true,
        },
        {
          label: "Aesthetic Embalming | Dress | Makeup + $315",
          value: "Aesthetic Embalming | Dress | Makeup + $315",
          priceAdjustment: 315,
        },
      ],
    },
    {
      id: 3,
      question: "Coffin",
      type: "select",
      options: [
        {
          label: "Contract - Raw (Included)",
          value: "contract-raw",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Contract- Red Stain (Included)",
          value: "contract-red-stain",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Contract- Brown Stain (Included)",
          value: "contract-brown-stain",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Basic - Deluxe Teak (Included)",
          value: "basic-deluxe-teak",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Basic - Country Oak (Included)",
          value: "basic-country-oak",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Basic - Teak (Included)",
          value: "basic-teak",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Basic - Sapelle (Included)",
          value: "basic-sapelle",
          priceAdjustment: 0,
          includedInBase: true,
        },
        {
          label: "Blaxland - Deluxe Teak + $576.35",
          value: "blaxland-deluxe-teak",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Country Oak + $576.35",
          value: "blaxland-country-oak",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Teak + $576.35",
          value: "blaxland-teak",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Sapelle + $576.35",
          value: "blaxland-sapelle",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Cedar + $576.35",
          value: "blaxland-cedar",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Rosewood + $576.35",
          value: "blaxland-rosewood",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Rose Mahogany + $576.35",
          value: "blaxland-rose-mahogany",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - Walnut + $576.35",
          value: "blaxland-walnut",
          priceAdjustment: 576.35,
        },
        {
          label: "Blaxland - White + $576.35",
          value: "blaxland-white",
          priceAdjustment: 576.35,
        },
        {
          label: "Wicker + $1092.92",
          value: "wicker",
          priceAdjustment: 1092.92,
        },
        {
          label: "Calvary - walnut + $1,205.05",
          value: "calvary-walnut",
          priceAdjustment: 1205.05,
        },
        {
          label: "Calvary - Rosewood + $1,205.05",
          value: "calvary-rosewood",
          priceAdjustment: 1205.05,
        },
        {
          label: "Wentworth - Walnut + $1218.75",
          value: "wentworth-walnut",
          priceAdjustment: 1218.75,
        },
        {
          label: "Wentworth – Rosewood + $1,218.75",
          value: "wentworth-rosewood",
          priceAdjustment: 1218.75,
        },
        {
          label: "Portland – Creme Pearl Metallic + $1,534.55",
          value: "portland-creme-pearl",
          priceAdjustment: 1534.55,
        },
        {
          label: "Portland – White + $1,384.72",
          value: "portland-white",
          priceAdjustment: 1384.72,
        },
        {
          label: "Creswick – Deluxe Teak + $1,423.75",
          value: "creswick-deluxe-teak",
          priceAdjustment: 1423.75,
        },
        {
          label: "Denman – Rosewood + $1,659.60",
          value: "denman-rosewood",
          priceAdjustment: 1659.6,
        },
        {
          label: "Denman – Rose Mahogany + $1,659.60",
          value: "denman-rose-mahogany",
          priceAdjustment: 1659.6,
        },
        {
          label: "Goldline – Light Oak + $1,687.85",
          value: "goldline-light-oak",
          priceAdjustment: 1687.85,
        },
        {
          label: "Dome Regal – Rosewood + $1,756.45",
          value: "dome-regal-rosewood",
          priceAdjustment: 1756.45,
        },
        {
          label: "Enviro – Raw Pine + $1,327.95",
          value: "enviro-raw-pine",
          priceAdjustment: 1327.95,
        },
        {
          label: "White Rose – Clear + $2,022.89",
          value: "white-rose-clear",
          priceAdjustment: 2022.89,
        },
        {
          label: "White Rose – Limewash + $2,022.89",
          value: "white-rose-limewash",
          priceAdjustment: 2022.89,
        },
        {
          label: "White Rose – White + $2,022.89",
          value: "white-rose-white",
          priceAdjustment: 2022.89,
        },
        {
          label: "Dome Regal Deluxe + $1,869.94",
          value: "dome-regal-deluxe",
          priceAdjustment: 1869.94,
        },
        {
          label: "Brentwood – Cedar + $2,079.96",
          value: "brentwood-cedar",
          priceAdjustment: 2079.96,
        },
        {
          label: "Brentwood – Rosewood + $2,079.96",
          value: "brentwood-rosewood",
          priceAdjustment: 2079.96,
        },
        {
          label: "Denman Cedar – Cedar + $2,475.96",
          value: "denman-cedar-cedar",
          priceAdjustment: 2475.96,
        },
      ],
    },
    {
      id: 4,
      question: "Flowers:",
      type: "select",
      options: [
        {
          label: "100cm Mixed Seasonal Coffin Cover - White",
          value: "100cm Mixed Seasonal Coffin Cover - White",
          priceAdjustment: 0,
        },
        {
          label: "100cm Mixed Seasonal Coffin Cover - Pastel",
          value: "100cm Mixed Seasonal Coffin Cover - Pastel",
          priceAdjustment: 0,
        },
        {
          label: "100cm Mixed Seasonal Coffin Cover - Colourful",
          value: "100cm Mixed Seasonal Coffin Cover - Colourful",
          priceAdjustment: 0,
        },
      ],
    },
    {
      id: 5,
      question: "Urn",
      type: "select",
      options: [
        {
          label: "Funera Preferred Adult Urn",
          value: "Funera Preferred Adult Urn",
          priceAdjustment: 0,
        },
        {
          label: "Funera Preferred Scattering Tube",
          value: "Funera Preferred Scattering Tube",
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

  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const [selections, setSelections] = useState({
    stationery: { value: "", price: 0 },
    bodyPreparation: { value: "", price: 0 },
    coffin: { value: "", price: 0 },
    flowers: { value: "", price: 0 },
    urn: { value: "", price: 0 },
    collectionOfUrn: { value: "", price: 0 },
  });
  const [loading, setLoading] = useState(false); // Changed to false since no initial fetch
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  //   const { user } = useUserFront();
  const [message, setMessage] = useState("");

  const geNext = async (e) => {
    e.preventDefault();

    try {
      const totalPriceImpact = Object.values(selections).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0
      );

      const finalTotalPrice = BASE_PRICE + totalPriceImpact;

      console.log("Sending to backend:", {
        selections,
        totalPrice: finalTotalPrice,
        totalPriceImpact,
        basePrice: BASE_PRICE,
      });
      const res = await fetch(`${CORE}/newattendingservicecremationanswers`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selections,
          totalPrice: finalTotalPrice,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server Error:", text);
        return;
      }

      //   // PDF generation code...
      //   const blob = await pdf(<InvoicePDF invoiceData={selections} />).toBlob();

      //   const reader = new FileReader();
      //   reader.readAsDataURL(blob);

      //   reader.onloadend = async () => {
      //     const base64data = reader.result.split(",")[1];

      //     const response = await fetch("http://localhost:4000/api/send-invoice", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         ...selections,
      //         pdfAttachment: base64data,
      //       }),
      //     });

      //     const result = await response.json();

      //     if (response.ok) {
      //       setMessage("Invoice sent successfully!");
      //     } else {
      //       setMessage(`Error: ${result.error || "Failed to send invoice"}`);
      //     }
      //   };

      //   setLoading(false);
      //   navigate(`/${user._id}/deceasedpersondetails`);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  const handleOptionChange = (category, value, priceAdjustment) => {
    const categoryKeyMap = {
      Stationery: "stationery",
      "Body Preparation": "bodyPreparation",
      Coffin: "coffin",
      "Flowers:": "flowers",
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
  };

  const handleSelectChange = (itemId, selectedValue) => {
    const item = attendenceData.find((data) => data.id === itemId);
    if (!item) return;

    const selectedOption = item.options.find(
      (opt) => opt.value === selectedValue
    );
    if (!selectedOption) return;

    // Make sure priceAdjustment is being used
    const price = selectedOption.priceAdjustment || 0;

    handleOptionChange(item.question, selectedValue, price);
  };

  const ctxValue = useMemo(
    () => ({
      selections,
      setSelections,
      totalPrice,
      setTotalPrice,
      loading,
      setLoading,
      error,
      setError,
      amount,
      setAmount,
      message,
      setMessage,
      geNext,
      handleOptionChange,
      handleSelectChange,
      BASE_PRICE,
      attendenceData,
      noServiceFunralData,
    }),
    [
      selections,
      setSelections,
      loading,
      setLoading,
      error,
      setError,
      amount,
      setAmount,
      message,
      setMessage,
      totalPrice,
      setTotalPrice,
      geNext,
      setTotalPrice,
      handleOptionChange,
      handleSelectChange,
      BASE_PRICE,
      attendenceData,
      noServiceFunralData,
    ]
  );

  return (
    <SelectedServiceProviderContext.Provider value={ctxValue}>
      {children}
    </SelectedServiceProviderContext.Provider>
  );
};

export function useServiceApi() {
  const context = useContext(SelectedServiceProviderContext);

  if (context === null) {
    throw new Error(
      "The component must be rendered as child of Home component"
    );
  }

  return context;
}
