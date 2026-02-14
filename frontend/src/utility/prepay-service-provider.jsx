/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import base64ToFile from ".";
import { showToast } from "./toast";
import { pdf } from "@react-pdf/renderer";
import RendererPDF from "../pages/prepay/_components/generatedPdf/RendererPdf";

const CORE = import.meta.env.VITE_API_URL;
const PrePayServiceProviderContext = createContext(null);

// ✅ helper: timeout wrapper (move outside component so it isn't recreated)
function withTimeout(promise, ms = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("PDF render timeout")), ms),
    ),
  ]);
}

export const PrePayServiceProvider = ({ children }) => {
  // ✅ Default investor (reusable)
  const defaultInvestor = {
    investor: "",
    saturation: "",
    title: "",
    surname: "",
    givenNames: "",
    dob: "",
    gender: "",

    // residential
    unit: "",
    streetNo: "",
    streetName: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "AUSTRALIA",

    // mailing
    mailunit: "",
    mailstreetNo: "",
    mailstreetName: "",
    mailsuburb: "",
    mailstate: "",
    mailpostcode: "",
    mailcountry: "AUSTRALIA",

    // contact
    daytimeTelephone: "",
    mobile: "",
    daytimeAddress: "",
    email: "",
  };

  // ✅ Single state that matches simplified backend schema
  const [application, setApplication] = useState({
    investorOne: { ...defaultInvestor },
    investorTwo: { ...defaultInvestor },

    accountHolders: {},
    lumpSum: { selected: false, amount: 0 },
    regularSavingsPlan: { selected: false, amount: 0 },
    rspEndCondition: "",
    contributionAmount: 0,
    aspFrequency: "",
    paymentMethod: "",
    signatures: {},
  });

  const nowDate = useMemo(() => new Date(), []);
  const [directDebitForm, setDirectDebitForm] = useState({
    accountHolders: {
      holderOne: { title: "", surnameOrEntityName: "", givenNames: "" },
      holderTwo: { title: "", surnameOrEntityName: "", givenNames: "" },

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
      submittedAt: null,
    },
  });

  const [deptRequest, setDeptRequest] = useState({
    lumpSum: { selected: false, amount: 0 },
    regularSavingsPlan: { selected: false, amount: 0 },
    rspEndCondition: "",
    accountHolder1: { signature: "", signatureDate: nowDate },
    accountHolder2: { signature: "", signatureDate: nowDate },
  });

  const [contributionamount, setContributionamount] = useState(0);
  const [aspFrequency, setAspFrequency] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loadingText, setLoadingText] = useState("Preparing your documents…");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false); // ✅ missing in your code

  // ------------------- Signature -------------------
  const sigCanvasRef = useRef(null);
  const [signature, setSignature] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const saveSignature = async () => {
    if (!sigCanvasRef.current) return;

    const dataUrl = await sigCanvasRef.current.exportImage("png");
    const file = base64ToFile(dataUrl, "signature.png");

    showToast.success("Signature is Being Saved", {
      duration: 800,
      options: { position: "bottom-right" },
    });

    setSignature(file);
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) sigCanvasRef.current.clearCanvas();
  };

  const getCurrentDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  // ------------------- Update helpers -------------------
  const updateInvestor = (investorKey, field, value) => {
    setApplication((prev) => ({
      ...prev,
      [investorKey]: {
        ...prev[investorKey],
        [field]: value,
      },
    }));
  };

  const updateApplication = (field, value) => {
    setApplication((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDeptRequest = (path, value) => {
    setDeptRequest((prev) => {
      const updated = structuredClone(prev);
      let current = updated;

      for (let i = 0; i < path.length - 1; i++) {
        if (!(path[i] in current)) return prev;
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  const updateDirectDebitForm = (path, value) => {
    setDirectDebitForm((prev) => {
      const updated = structuredClone(prev);
      let current = updated;

      for (let i = 0; i < path.length - 1; i++) {
        if (!(path[i] in current)) return prev;
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  const submitInvestment = async () => {
    if (isGeneratingPdf) return;

    try {
      setIsGeneratingPdf(true);

      // 1) Register
      const registerPayload = {
        email: application?.investorOne?.email || "",
        password:
          (application?.investorOne?.givenNames || "") +
          (application?.investorOne?.surname || ""),
      };

      const responseUser = await fetch(`${CORE}/blacktulipauth/newuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
      });

      if (!responseUser.ok) {
        const errorText = await responseUser.text();
        let msg = "Registration failed";
        try {
          msg = JSON.parse(errorText)?.message || msg;
        } catch { /* empty */ }
        throw new Error(msg);
      }

      // 2) Login
      const loginRes = await fetch(`${CORE}/blacktulipauth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerPayload),
        credentials: "include",
      });

      if (!loginRes.ok) {
        const errorText = await loginRes.text();
        throw new Error(errorText || "Login failed");
      }
      // ✅ Build a plain JS object first (we'll send as JSON or FormData)
      const payload = {
        investorOne: application?.investorOne || {},
        investorTwo: application?.investorTwo || {},
        accountHolders: directDebitForm?.accountHolders || {},
        lumpSum: deptRequest?.lumpSum || { selected: false, amount: 0 },
        regularSavingsPlan:
          deptRequest?.regularSavingsPlan || { selected: false, amount: 0 },
        signatures: {
          accountHolder1: deptRequest?.accountHolder1 || {},
          accountHolder2: deptRequest?.accountHolder2 || {},
        },
        rspEndCondition: deptRequest?.rspEndCondition || "",
        contributionAmount: contributionamount ?? 0,
        aspFrequency: aspFrequency || "",
        paymentMethod: paymentMethod || "",
      };

      // 3) Save investment prepay
      let resPrePay;

      // ✅ If you have a file -> use FormData
      if (signature instanceof File) {
        const fd = new FormData();
        fd.append("investorOne", JSON.stringify(payload.investorOne));
        fd.append("investorTwo", JSON.stringify(payload.investorTwo));
        fd.append("accountHolders", JSON.stringify(payload.accountHolders));
        fd.append("lumpSum", JSON.stringify(payload.lumpSum));
        fd.append("regularSavingsPlan", JSON.stringify(payload.regularSavingsPlan));
        fd.append("signatures", JSON.stringify(payload.signatures));
        fd.append("rspEndCondition", payload.rspEndCondition);
        fd.append("contributionAmount", String(payload.contributionAmount));
        fd.append("aspFrequency", payload.aspFrequency);
        fd.append("paymentMethod", payload.paymentMethod);

        // ✅ file field name must match backend multer: upload.single("prePaySign")
        fd.append("prePaySign", signature);

        resPrePay = await fetch("http://localhost:4000/save-investment-prepay", {
          method: "POST",
          credentials: "include",
          body: fd,
        });
      } else {
        // ✅ No file -> send JSON (works with express.json())
        resPrePay = await fetch("http://localhost:4000/save-investment-prepay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }

      if (!resPrePay.ok) {
        const errorText = await resPrePay.text();
        let msg = "Failed to save application";
        try {
          msg = JSON.parse(errorText)?.message || msg;
        } catch {
          msg = errorText || msg;
        }
        throw new Error(msg);
      }

      // 4) Fetch application data (this route uses req.identity, so userId not needed)
      setLoadingText("Fetching application data…");

      const res = await fetch(
        "http://localhost:4000/get-investment-appplication-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({}), // ✅ not required, route reads req.identity
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch application data");
      }

      const json = await res.json().catch(() => ({}));
      const investorDataLocal = json?.data ?? json ?? {};

      // 5) Generate PDF
      setLoadingText("Rendering application (RendererPDF)…");

      const blob = await withTimeout(
        pdf(<RendererPDF investorData={investorDataLocal} />).toBlob(),
        30000
      );

      // 6) Send email
      setLoadingText("Sending PDF to your email…");

      const formData = new FormData();
      formData.append(
        "file",
        new File([blob], "KeyInvest-Application-Form.pdf", {
          type: "application/pdf",
        })
      );

      const emailRes = await fetch(`${CORE}/send-pdf-on-email`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const text = await emailRes.text();
      let out;
      try {
        out = JSON.parse(text);
      } catch {
        throw new Error(text || "Server error");
      }

      if (!out?.success) throw new Error(out?.error || "Email failed");

      setLoadingText("Completed successfully 🎉");
      return out;
    } catch (err) {
      console.error("submitInvestment error:", err);
      setLoadingText(err?.message || "Something went wrong");
      throw err;
    } finally {
      setIsGeneratingPdf(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitInvestment();
      alert("Investment saved & emailed successfully");
    } catch (error) {
      console.error(error);
      alert(error?.message || "Something went wrong");
    }
  };

  const ctxValue = useMemo(
    () => ({
      application,
      setApplication,
      updateInvestor,
      updateApplication,

      directDebitForm,
      updateDirectDebitForm,

      deptRequest,
      updateDeptRequest,

      submitInvestment,
      handleSubmit,

      contributionamount,
      setContributionamount,

      aspFrequency,
      setAspFrequency,

      paymentMethod,
      setPaymentMethod,

      sigCanvasRef,
      saveSignature,
      clearSignature,
      signature,
      setSignature,

      date,
      setDate,
      currentDate,

      loadingText,
      isGeneratingPdf,
    }),
    [
      application,
      directDebitForm,
      deptRequest,
      contributionamount,
      aspFrequency,
      paymentMethod,
      signature,
      date,
      currentDate,
      loadingText,
      isGeneratingPdf,
    ],
  );

  return (
    <PrePayServiceProviderContext.Provider value={ctxValue}>
      {children}
    </PrePayServiceProviderContext.Provider>
  );
};

export function usePrePayServiceApi() {
  const context = useContext(PrePayServiceProviderContext);
  if (!context) {
    throw new Error(
      "usePrePayServiceApi must be used within PrePayServiceProvider",
    );
  }
  return context;
}
