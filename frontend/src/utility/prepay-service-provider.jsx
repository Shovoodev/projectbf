/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useRef, useState } from "react";
import base64ToFile from ".";

const PrePayServiceProviderContext = createContext();

export const PrePayServiceProvider = ({ children }) => {
  const [investors, setInvestors] = useState({
    investorOne: {
      investor: "",
      saturation: "",
      title: "",
      surname: "",
      givenNames: "",
      dob: "",
      gender: "",

      unit: "",
      streetNo: "",
      streetName: "",
      suburb: "",
      state: "",
      postcode: "",
      country: "AUSTRALIA",

      mailunit: "",
      mailstreetNo: "",
      mailstreetName: "",
      mailsuburb: "",
      mailstate: "",
      mailpostcode: "",
      mailcountry: "AUSTRALIA",

      daytimeTelephone: "",
      mobile: "",
      daytimeAddress: "",
      email: "",
    },

    investorTwo: {
      investor: "",
      saturation: "",
      title: "",
      surname: "",
      givenNames: "",
      dob: "",
      gender: "",
      unit: "",
      streetNo: "",
      streetName: "",
      suburb: "",
      state: "",
      postcode: "",
      country: "AUSTRALIA",
      mailunit: "",
      mailstreetNo: "",
      mailstreetName: "",
      mailsuburb: "",
      mailstate: "",
      mailpostcode: "",
      mailcountry: "AUSTRALIA",
      daytimeTelephone: "",
      mobile: "",
      daytimeAddress: "",
      email: "",
    },
  });

  const nowDate = new Date();
  const [directDebitForm, setDirectDebitForm] = useState({
    accountHolders: {
      holderOne: {
        title: "", // "Mr" | "Mrs" | "Ms" | "Miss" | "Dr" | "Other"
        surnameOrEntityName: "",
        givenNames: "",
      },

      holderTwo: {
        title: "",
        surnameOrEntityName: "",
        givenNames: "",
      },

      addressabn: "",
      suburbabn: "",
      stateabn: "",
      postcodeabn: "",
      countryabn: "AUSTRALIA",
      institutionName: "",
      branch: "",
      accountName: "",
      bsbNumber: "",
      accountNumber: "",
      formType: "KEYINVEST_DIRECT_DEBIT_REQUEST",
      version: "July 2025",
      submittedAt: null, // set on submit
    },
  });

  const [deptRequest, setDeptRequest] = useState({
    lumpSum: {
      selected: false,
      amount: "",
    },
    regularSavingsPlan: {
      selected: false,
      amount: "",
    },
    rspEndCondition: "",
    accountHolder1: {
      signature: "",
      signatureDate: nowDate,
    },
    accountHolder2: {
      signature: "",
      signatureDate: nowDate,
    },
  });

  const [contact, setContact] = useState({
    daytimeTelephone: "",
    mobile: "",
    daytimeAdress: "",
    email: ""
  })
  const [contributionamount, setContributionamount] = useState(0);
  const paymentMethod = ["direct_debit", "cheque", "EFT", "BPAY"];
  const [aspFrequency, setAspFrequency] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState("");
  const sigCanvasRef = useRef(null);
  const [signature, setSignature] = useState("");

  const saveSignature = async () => {
    if (!sigCanvasRef.current) return;
    console.log("getting hear");

    const dataUrl = await sigCanvasRef.current.exportImage("png");
    const file = base64ToFile(dataUrl, "signature.png");
    console.log({ dataUrl, file });

    setSignature(file); // ✅ File object
    setSignaturePreview(dataUrl)
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) sigCanvasRef.current.clearCanvas();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitInvestment();
      alert("Investment saved successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const updateDeptRequest = (path, value) => {
    setDeptRequest((prev) => {
      const updated = structuredClone(prev); // deep clone to avoid mutation

      let current = updated;
      for (let i = 0; i < path.length - 1; i++) {
        if (!(path[i] in current)) {
          console.warn(
            `Path "${path.slice(0, i + 1).join(".")}" does not exist`
          );
          return prev; // prevent errors if path is invalid
        }
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  const updateDirectDebitForm = (path, value) => {
    setDirectDebitForm((prev) => {
      const updated = structuredClone(prev); // deep clone

      let current = updated;
      for (let i = 0; i < path.length - 1; i++) {
        if (!(path[i] in current)) {
          console.warn(
            `Path "${path.slice(0, i + 1).join(".")}" does not exist`
          );
          return prev; // prevent crashes
        }
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return updated;
    });
  };
  const submitInvestment = async () => {
    const payload = {
      investors,
      directDebitForm,
      deptRequest,
      contributionAmount: contributionamount,
      aspFrequency,
      paymentMethod,
    };

    const res = await fetch("http://localhost:4000/save-investment-prepay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Submission failed");
    }

    return data;
  };

  const updateInvestor = (investorKey, path, value) => {
    setInvestors((prev) => {
      const updated = { ...prev[investorKey] };
      let current = updated;

      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;

      return {
        ...prev,
        [investorKey]: updated,
      };
    });
  };

  const ctxValue = useMemo(
    () => ({
      investors,
      updateInvestor,
      submitInvestment,
      handleSubmit,
      contributionamount,
      setContributionamount,
      paymentMethod,
      aspFrequency,
      directDebitForm,
      deptRequest,
      sigCanvasRef,
      saveSignature,
      clearSignature,
      signature,
      setAspFrequency, signaturePreview, contact, setContact
    }),
    [
      investors,
      contributionamount,
      paymentMethod,
      aspFrequency,
      directDebitForm,
      deptRequest,
      signature,
      setAspFrequency, signaturePreview, contact, setContact
    ]
  );

  return (
    <PrePayServiceProviderContext.Provider value={ctxValue}>
      {children}
    </PrePayServiceProviderContext.Provider>
  );
};

export function usePrePayServiceApi() {
  const context = useContext(PrePayServiceProviderContext);

  if (context === null) {
    throw new Error(
      "The component must be rendered as child of Home component"
    );
  }

  return context;
}
