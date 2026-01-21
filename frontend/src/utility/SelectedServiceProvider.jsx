/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState } from "react";
const SelectedServiceProviderContext = createContext();
const CORE = import.meta.env.VITE_API_URL;

export const SelectedServiceProvider = ({ children }) => {
  const BASE_PRICE = 4899;

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

  const [transferPrice, setTransferPrice] = useState(0);
  const [transferOption, setTransferOption] = useState("Sydney Metro");
  //popup
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [enquireyData, setEnquireyData] = useState({
    enquireEmail: "",
    enquiryMessage: "",
    name: "",
    phone: "",
  });

  const [activePopup, setActivePopup] = useState(null);
  const handleTransferChange = (e) => {
    const price = Number(e.target.value);
    const index = e.target.selectedIndex;
    const label = e.target.options[index].text;

    setTransferPrice(price);
    setTransferOption(label);

    const variableTotal = Object.values(selections).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    );

    const total = BASE_PRICE + variableTotal + price;

    setTotalPrice(total);
    setAmount(total);
  };
  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const goNext = async (path) => {
    try {
      const totalPriceImpact = Object.values(selections).reduce(
        (sum, opt) => sum + (opt.price || 0),
        0
      );

      const finalTotalPrice = BASE_PRICE + totalPriceImpact;

      const res = await fetch(`${CORE}/${path}`, {
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
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
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
      BASE_PRICE,
      transferPrice,
      setTransferPrice,
      transferOption,
      setTransferOption,
      userData,
      setUserData,
      enquireyData,
      setEnquireyData,
      internalIsOpen,
      setInternalIsOpen,
      openPopup,
      activePopup,
      setActivePopup,
      closePopup,
      goNext,
      handleTransferChange,
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
      setTotalPrice,
      BASE_PRICE,
      transferPrice,
      setTransferPrice,
      transferOption,
      userData,
      setUserData,
      enquireyData,
      setEnquireyData,
      setTransferOption,
      internalIsOpen,
      setInternalIsOpen,
      openPopup,
      activePopup,
      setActivePopup,
      closePopup,
      goNext,
      handleTransferChange,
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
